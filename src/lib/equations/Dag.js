const _dagnode = {key: '', value: null, units: '', updater: null,
    suppliers: [], consumers: [], status: null, dirty: false, cfgkey: '', cfgopt: ''}

const _tracker = {clean: 0, constant: 0, input: 0, assign: 0, calc: 0, stack: []}

/**
 * 1 - call constructor(nodeDefsMap) or reset(nodeDefsMap) to set the node definitions
 * 2 - call select([nodes]) to identify nodes of interest (i.e., outputs)
 * 3 - call activeInputs() to get an array of references to all active input nodes
 * 4 - call set(node, value) to set values on the input nodes
 * 5 - call get(node) to access freshly updated node values
 */
export class Dag {
    constructor(nodeDefsMap, desc='') {
        this.desc = desc
        this.activeInputsSet = new Set()// Set of all ACTIVE input nodes
        this.allInputsSet = new Set()   // Set of all possible input nodes
        this.nodeMap = null             // Map of DagNode key => reference
        this.nodes = []                 // Simple array of the node references
        this.selectSet = new Set()      // Set of references to all 'selected' nodes
        this.tracker = {..._tracker}
        this.reset(nodeDefsMap)
    }

    // DagNode.updater method for DagNodes whose values are directly assigned from other nodes
    static assign(source) { return source.value }
    // DagNode.updater method for DagNode whose value is constant.
    static constant() {}
    // DagNode.updater method for DagNodes whose value is client input via Dag.set()
    static input() {}

    // node.dirty values
    static dirty = 'DIRTY'
    static clean = 'CLEAN'
    // node.status values
    static ignored  = 'IGNORED' // not in the suppliers stream of any SELECTED node
    static active   = 'ACTIVE'  // in the suppliers stream of at least one SELECTED node
    static selected = 'SELECTED'// a 'selected' node that is a supplier to at least one other selected node
    static leaf     = 'LEAF'    // a 'selected' node that supplies no other selected nodes

    // Returns an array of config key strings
    activeConfigs() {
        const configs = new Set()
        for(let node of this.nodes) {
            if (node.status !== Dag.ignored)
                configs.add(`${node.cfgkey}=${node.cfgopt}`)
        }
        configs.delete("*=*")
        return [...configs.values()].sort()
    }

    activeInputs() { return [...this.activeInputsSet] }

    // Returns the DagNode value.
    // If the DagNode is dirty, get() is recursively called on all its suppliers,
    // and its dirty flag is cleared before returning its updated value.
    get(refOrKey, log=false) {
        this.tracker = {..._tracker}
        return this._get(refOrKey, log)
    }

    // Returns a reference to the DagNode with 'key' prop
    nodeRef(refOrKey, caller='unknown') { 
        if (typeof refOrKey === 'string') {
            if (! this.nodeMap.has(refOrKey))
                throw new Error(`Attempt to access Dag.nodeMap() with unknown key '${refOrKey}' from function ${caller}'.`)
            return this.nodeMap.get(refOrKey)
        }
        return refOrKey // otherwise assume it is a DagNode reference
    }

    reset(nodeDefsMap) {
        this._checkNodeDefSupplierKeys(nodeDefsMap)
        this._initDagNodeMap(nodeDefsMap)
        this._initSupplierRefs()
        this._initConsumerRefs()
        this._initAllInputsSet()
        this._initNodes()
        return this
    }
    
    // Called by client after Dag.reset() to set one or more DagNodes as 'selections'.
    // 'refOrKeyArray' may be an array of, or a single of, DagNode keys or references
    select(refOrKeyArray) {
        const ar = Array.isArray(refOrKeyArray) ? refOrKeyArray : [refOrKeyArray]
        this._initNodes()   // set all nodes to Dag.dirty and Dag.ignored
        this.selectSet = new Set()
        for(let refOrKey of ar) {
            const node = this.nodeRef(refOrKey, 'select()')
            this.selectSet.add(node)  // add/replace this to the Set() of selected nodes
            this._propagateActiveToSuppliers(node)
            node.status = Dag.leaf  // for now, promote this node's status from ACTIVE to LEAF
        }
        // Demote non-leaf selected nodes to SELECTED
        this._demoteNonLeafSelected()
        this._initActiveInputsSet()
        return this
    }

    selected() { return [...this.selectSet] }

    // Sets the DagNode value and propagates the dirty flags to its downstream consumers.
    // Only works for INPUT DagNodes and if value is different from current value.
    set(refOrKey, value) {
        const node = this.nodeRef(refOrKey, 'set()')
        if (node.updater===Dag.input && node.value!== value) {
            node.value = value
            this._propagateDirtyToConsumers(node)
        }
        return this
    }

    //--------------------------------------------------------------------------

    _checkNodeDefSupplierKeys(map) {
        let n = 0
        for(let node of map.values()) {
            const [key, value, units, method, supkeys] = node
            for(let supkey of supkeys) {
                if(!map.has(supkey)) {
                    console.log(`*** Node "${key}" supplier "${supkey}" key is unknown`)
                    n++
                }
            }
        }
        if (n) throw new Error(`Map of ${map.size} node definitions has ${n} unknown supplier keys.`)
        return this
    }

    // All SELECTED DagNodes are initially set as LEAF.
    // This method checks all the the *suppliers* of every LEAF DagNode,
    // and if any suppliers are LEAF, they are demoted to SELECTED
    _demoteNonLeafSelected() {
        for(let node of this.selectSet) {
            if (node.status === Dag.leaf) {   // check only nodes not yet demoted to SELECTED
                for(let supplier of node.suppliers)
                    this._demoteSelectedSuppliers(supplier)
            }
        }
    }
    _demoteSelectedSuppliers(node) {
        if (node.status === Dag.leaf)
            node.status = Dag.selected
        for(let supplier of node.suppliers)
            this._demoteSelectedSuppliers(supplier)
    }

    _get(refOrKey, log) {
        const node = this.nodeRef(refOrKey, '_get()')
        if (node.updater === Dag.constant) {
            this.tracker.constant++
        } else if (node.updater === Dag.input) {
            this.tracker.input++
        } else if (node.dirty === Dag.clean) {
            this.tracker.clean++
        } else if (node.updater === Dag.assign) {
            this.tracker.assign++
            node.value = this._get(node.suppliers[0], log)
        } else { // get updated supplier values
            this.tracker.calc++
            const args = []
            for(let supplier of node.suppliers)
                args.push(this._get(supplier, log))
            // this.tracker.stack.push(node.updater.name)
            node.value = node.updater.apply(node, args)
            if(log) console.log(`_get(${node.key}) invoked ${node.updater.name}`)
        }
        node.dirty = Dag.clean
        return node.value
    }

    // Creates the this.activeInputsSet of all *active* input nodes
    _initActiveInputsSet() {
        this.activeInputsSet = new Set()
        for(let node of this.allInputsSet.values()) {
            if (node.status !== Dag.ignored)
                this.activeInputsSet.add(node)
        }
        return this
    }

    // Creates the this.allInputsSet of all possible input nodes, whether active or not
    _initAllInputsSet() {
        this.allInputsSet = new Set()
        for(let node of this.nodes) {
            if (!node.updater) // Any node without an updater() must be a Dag input
                node.updater = Dag.input
            if (node.updater === Dag.input)
                this.allInputsSet.add(node)
        }
        return this
    }

    // Assigns each dag node's 'consumers'
    _initConsumerRefs() {
        for(let node of this.nodes)
            node.consumers = []
        for(let node of this.nodes)
            for(let supplier of node.suppliers)
                supplier.consumers.push(node)
        return this
    }

    // Converts nodeDefs map arrays to dag node objects
    _initDagNodeMap(nodeDefsMap) {
        this.nodeMap = new Map()
        for(let nodeDef of nodeDefsMap.values()) {
            const [key, value, units, updater, suppliers, cfgkey, cfgopt] = nodeDef
            const node = {..._dagnode, key, value, units, updater, suppliers, cfgkey, cfgopt}
            this.nodeMap.set(key, node)
        }
        this.nodes = [...this.nodeMap.values()]
        return this
    }

    // Converts (in-place) any supplier elements that are keys into references
    _initSupplierRefs() {
        for(let node of this.nodes) {
            for (let i=0; i<node.suppliers.length; i++) {
                // console.log('resolve node', node.key, 'supplier', i, node.suppliers[i])
                node.suppliers[i] = this.nodeRef(node.suppliers[i], '_initSupplierRefs()')
            }
        }
        return this
    }

    // Sets all nodes to Dag.dirty and Dag.ignored
    _initNodes() {
        for(let node of this.nodes) {
            node.status = Dag.ignored
            node.dirty = Dag.dirty
        }
        return this
    }

    _propagateActiveToSuppliers(node) {
        node.status = Dag.active
        for(let supplier of node.suppliers) {
            if (supplier.status === Dag.ignored)
                this._propagateActiveToSuppliers(supplier)
        }
        return this
    }

    // Propagates the 'dirty' flag to all the node's consumers
    _propagateDirtyToConsumers(node) {
        node.dirty = Dag.dirty
        for(let next of node.consumers) {
            if (next.dirty !== Dag.dirty)
                this._propagateDirtyToConsumers(next)
        }
        return this
    }

    // Backdoor to peek at any node's value without causing an update chain reaction
    _peek(refOrKey) {
        const node = this.nodeRef(refOrKey, '_peek()')
        return node.value
    }

    // Backdoor to set any node's value, even non-input or constant nodes
    // But it *does* propagate the dirty flag
    _poke(refOrKey, value) {
        const node = this.nodeRef(refOrKe, '_poke')
        node.value = value
        this._propagateDirtyToConsumers(node)
        return node.value
    }

}