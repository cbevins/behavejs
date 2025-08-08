const _node = {key: '', value: null, units: '', updater: null,
    suppliers: [], consumers: [], status: null, dirty: false}

// node.dirty values
const CLEAN = 'CLEAN'
const DIRTY = 'DIRTY'

// node.status values
const INACTIVE = 'INACTIVE' // not in the suppliers stream of any OUTPUT node
const ACTIVE = 'ACTIVE'     // in the suppliers stream of at least one OUTPUT node
const OUTPUT = 'OUTPUT'     // OUTPUT node that is a supplier to at least one other OUTPUT node
const TERMINAL = 'TERMINAL' // OUTPUT node that supplies no other OUTPUT nodes

export class Dag {
    constructor(nodeDefsMap, desc='') {
        this.desc = desc
        this.inputs = new Set()
        this.nodeMap = null         // Map of DagNode key => reference
        this.nodes = []             // Array of node references
        this.reset(nodeDefsMap)
    }

    // DagNode.updater method for DagNodes whose values are directly assigned from other nodes
    static assign(source) { return source.value }
    // DagNode.updater method for DagNode whose value is constant.
    static constant() {}
    // DagNode.updater method for DagNodes whose value is client input via Dag.set()
    static input() {}

    // Returns a reference to the DagNode with 'key' prop
    nodeRef(refOrKey) { 
        if (typeof refOrKey === 'string') {
            if (! this.nodeMap.has(refOrKey))
                throw new Error(`Attempt to access Dag.nodeMap() with unknown key '${refOrKey}'.`)
            return this.nodeMap.get(refOrKey)
        }
        return refOrKey // otherwise assume it is a DagNode reference
    }

    reset(nodeDefsMap) {
        this.nodeMap = new Map()
        // convert nodeDefs to DagNodes
        for(let nodeDef of nodeDefsMap.values()) {
            const [key, value, units, updater, suppliers] = nodeDef
            const node = {..._node, key, value, units, updater, suppliers}
            this.nodeMap.set(key, node)
        }
        this.nodes = [...this.nodeMap.values()]
        this._initSuppliers()
        this._initNodes()
        this._initConsumers()
        return this
    }
    
    // Converts (in-place) any supplier elements that are keys into references
    _initSuppliers() {
        for(let node of this.nodes) {
            for (let i=0; i<node.suppliers.length; i++) {
                // console.log('resolve node', node.key, 'supplier', i, node.suppliers[i])
                node.suppliers[i] = this.nodeRef(node.suppliers[i])
            }
        }
    }
    _initNodes() {
        this.inputs = new Set()
        for(let node of this.nodes) {
            node.status = INACTIVE
            node.dirty = CLEAN
            // Any node without an updater() must be a Dag input
            if (!node.updater)
                node.updater = Dag.input
            if (node.updater === Dag.input)
                this.inputs.add(node)
        }
        
    }

    // Assigns DagNode's 'consumers' based upon the 'suppliers' that were
    // declared at DagNode definition time.
    _initConsumers() {
        for(let node of this.nodes)
            node.consumers = []
        for(let node of this.nodes)
            for(let supplier of node.suppliers)
                supplier.consumers.push(node)
    }

}