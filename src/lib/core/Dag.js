/**
 * USAGE
 * 1 - call constructor(nodeMap) to set the node definitions and default configuration
 * 2 - call configure([[key,value],...]) to set desired configuration
 * 3 - call select(node,...]) to identify nodes of interest (i.e., outputs)
 * 4 - call activeInputs() to get an array of references to all active input nodes
 *      for the selected outputs
 * 5 - call activeConfigs() to get an array of the current active configurations
 *      for the selected outputs
 * 6 - call set(node, value) for each of the input nodes as desired
 * 7 - call get(node) or updateAll() to access dynamically updated node values
 */
export class Dag {
    constructor(nodeMap, desc='') {
        this.nodeMap = nodeMap              // Map of node key => object reference
        this.desc = desc
        this.activeInputsSet = new Set()    // Set of all ACTIVE input nodes
        this.allInputsSet = new Set()       // Set of current configuration all possible input nodes
        this.messages = []
        this.selectSet = new Set()          // Set of references to all 'selected' nodes
        this.tracker = {...Dag._trackerTemplate}
        this.configure()
    }

    // Template for statistics tracker object
    static _trackerTemplate = {from: null, leaf: null, clean: 0, constant: 0, input: 0, assign: 0, calc: 0, stack: []}

    // DagNode.updater method for DagNodes whose values are directly assigned from other nodes
    static bind(other) { return other.value }
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

    //--------------------------------------------------------------------------
    // Dag property access methods
    //--------------------------------------------------------------------------

    // Returns an array of config *objects*
    activeConfigs() {
        const configs = new Set()
        for(let node of this.nodeMap.values()) {
            if (node.status !== Dag.ignored && node.config !== null) {
                configs.add(node.config)
            }
        }
        return [...configs]
    }
    activeConfigsByKey() { return this.activeConfigs().sort((a, b) => a.key().localeCompare(b.key()))}

    activeDirty() {
        const dirty = []
        for(let node of this.nodeMap.values()) {
            if (node.status !== Dag.ignored && node.dirty === Dag.dirty)
                dirty.push(node)
        }
        return dirty
    }
    activeDirtyCount() {
        let n = 0
        for(let node of this.nodeMap.values())
            if (node.status !== Dag.ignored && node.dirty === Dag.dirty) n++
        return n
    }

    activeInputs() { return [...this.activeInputsSet] }
    activeInputsByKey() { return this.activeInputs().sort((a, b) => a.key().localeCompare(b.key()))}

    activeNodes() {
        const active = []
        for(let node of this.nodeMap.values())
            if (node.status !== Dag.ignored) active.push(node)
        return active
    }
    activeNodesByKey() { return this.activeNodes().sort((a, b) => a.key().localeCompare(b.key()))}

    allInputs() { return [...this.allInputsSet] }
    allInputsByKey() { return this.allInputs().sort((a, b) => a.key().localeCompare(b.key()))}

    allPossibleInputs() {
        const results = new Set()
        for(let node of this.nodeMap.values()) {
            for(let opt of node.options) {
                if (opt.updater === Dag.input) results.add(node)
            }
        }
        return [...results]
    }
    allPossibleInputsByKey() { return this.allPossibleInputs().sort((a, b) => a.key().localeCompare(b.key()))}

    leafNodes() {
        const active = []
        for(let node of this.nodeMap.values())
            if (node.status === Dag.leaf) active.push(node)
        return active
    }
    leafNodesByKey() { return this.leafNodes().sort((a, b) => a.key().localeCompare(b.key()))}

    nodes() { return  [...this.nodeMap.values()] }
    nodesByKey() { return this.nodes().sort((a, b) => a.key().localeCompare(b.key()))}

    // Returns a reference to the DagNode with 'key' prop
    nodeRef(refOrKey, caller='unknown') { 
        if (typeof refOrKey === 'string') {
            if (! this.nodeMap.has(refOrKey))
                this._log(Dag.fatal, 'nodeRef',
                    `Attempt to access Dag.nodeMap() with unknown key '${refOrKey}' from function ${caller}'.`)
            return this.nodeMap.get(refOrKey)
        }
        return refOrKey // otherwise assume it is a DagNode reference
    }

    selected() { return [...this.selectSet] }
    selectedByKey() { return this.selected().sort((a, b) => a.key().localeCompare(b.key()))}

    //--------------------------------------------------------------------------
    // Dag configuration methods
    //--------------------------------------------------------------------------

    configure(cfgPairs=[]) {
        const method = 'configure'
        this.messages = []
        // Reinitialize all the nodes
        for(let node of this.nodeMap.values()) {
            node.dirty   = Dag.dirty
            node.status  = Dag.ignored  // will be updated by _reselect()
            node.consumers = []         // will be filled while reconfiguring
        }
        // Add node suppliers to each of its suppliers' consumers array.
        for(let node of this.nodeMap.values()) {
            // console.log('Processing suppliers for', node.key())
            for(let supplier of node.suppliers) {
                // console.log('    supplier', supplier.key(), )
                supplier.consumers.push(node)
            }
        }
        this._updateAllInputsSet()
        this._reselect()
        return this
    }

    // Creates the this.allInputsSet of all the current configuration possible input nodes, whether active or not
    _updateAllInputsSet() {
        this.allInputsSet = new Set()
        for(let node of this.nodeMap.values()) {
            if (!node.updater) {        // Any node without an updater() must be a Dag input or an Error
                node.updater = Dag.input
                this._log(Dag.fatal, '_updateAllInputSets',
                    `Node "${node.key()}" is not matched with an updater.`)
            }
            if (node.updater === Dag.input)
                this.allInputsSet.add(node)
        }
        return this
    }

    //--------------------------------------------------------------------------
    // Node selection methods
    //--------------------------------------------------------------------------

    clearSelect() {
        this.selectSet = new Set()
        return this._reselect()
    }

    select(whatever) {
        const args = [...arguments].flat()
        for(let refOrKey of args) {
            const node = this.nodeRef(refOrKey, 'select()')
            if (node === undefined)
                throw new Error('select() was passed an undefined node')
            this.selectSet.add(node)
        }
        return this._reselect()
    }

    unselect(node) {
        const args = [...arguments].flat()
        for(let refOrKey of args) {
            const node = this.nodeRef(refOrKey, 'select()')
            this.selectSet.delete(node)
        }
        return this._reselect()
    }

    _reselect() {
        for(let node of this.nodeMap.values()) {
            node.dirty  = Dag.dirty
            node.status = Dag.ignored
        }
        for(let node of this.selectSet.values())
            this._selectNode(node)
        return this._createActiveInputsSet()
    }

    _selectNode(node) {
        if (node.status === Dag.leaf || node.status === Dag.selected) {
            // nothing more to do, return to previous level
        } else if (node.status === Dag.active) {
            node.status = Dag.selected  // upgrade to selected and return to previous level
        } else { // (node.status === Dag.ignored)
            node.status = Dag.leaf  // set to leaf and descend to next level
            for(let supplier of node.suppliers)
                this._propagateStatusToSupplier(supplier)
        }
        return this
    }

    _propagateStatusToSupplier(node) {
        if (node.status === Dag.leaf || node.status === Dag.selected) {
            node.status = Dag.selected  // descendant nodes can no longer be a LEAF
        } else if (node.status === Dag.active) {
            // no need to descend further, return to previous level
        } else if (node.status === Dag.ignored) {
            node.status = Dag.active    // set to active and descend to next supplier
            for(let supplier of node.suppliers)
                this._propagateStatusToSupplier(supplier)
        }
    }

    // Creates the this.activeInputsSet of all *active* input nodes
    _createActiveInputsSet() {
        this.activeInputsSet = new Set()
        for(let node of this.allInputsSet.values()) {
            if (node.status !== Dag.ignored)
                this.activeInputsSet.add(node)
        }
        return this
    }

    //--------------------------------------------------------------------------
    // Methods for setting node values
    //--------------------------------------------------------------------------

    // Sets the DagNode value and propagates the dirty flags to its downstream consumers.
    // Only works for INPUT DagNodes and if value is different from current value.
    set(refOrKey, value, unequalOnly=true) {
        const node = this.nodeRef(refOrKey, 'set()')
        if (node === undefined)
            throw new Error('set() was passed an undefined node')

        // Need to implement the following
        this.validate(node, value)
        // Log warning if this is a constant or non-input node??
        if (node.updater !== Dag.input) {
            this._log(Dag.warn, 'set',
                `attempt to set the value of *non-input* node "${node.key()}" to "${value}" was denied`)
        } else if (node.updater === Dag.constant) {
            this._log(Dag.error, 'set',
                `attempt to set the value of *constant* node "${node.key()}" to "${value}" was denied`)
        }
        if (unequalOnly && node.value === value) return this
        node.value = value
        node.dirty = Dag.dirty
        this._propagateDirtyToConsumers(node)
        let n = 0
        // console.log(this.activeDirtyCount(), 'dirty active nodes after set', node.key())
        return this
    }

    // TO DO
    validate(node, value) {}

    // Propagates the 'dirty' flag to all the node's consumers
    _propagateDirtyToConsumers(node) {
        // console.log('propagateDirty() to node', node.key())
        for(let next of node.consumers) {
            if(next.dirty !== Dag.dirty) {
                next.dirty = Dag.dirty
                this._propagateDirtyToConsumers(next)
            }
        }
        return this
    }

    //--------------------------------------------------------------------------
    // Methods for getting node values
    //--------------------------------------------------------------------------

    // Returns the node value.
    // If the node is dirty, _get() is recursively called on all its suppliers,
    // and its dirty flag is cleared before returning its updated value.
    get(refOrKey, log=false) {
        const node = this.nodeRef(refOrKey)  // only use node references within _get()!!!
        if (node.status === Dag.ignored) {
            this._log(Dag.warn, 'get', `attempt to get value of INACTIVE node "${node.key()}"` )
            // node.dirty = Dag.clean   // is this necessary?
            return node.value
        }
        return this._get(node, log)
    }

    // Runs get() on all selected nodes to ensure they are all updaters are called
    updateAll() {
        for(let node of this.selected())
            this.get(node)
        return this
    }

    _get(node, log) {
        if (node.updater === Dag.constant) {
            // nothing to update, just return its value
        } else if (node.updater === Dag.input) {
            // nothing to update, just return its value
        } else if (node.dirty === Dag.clean) {
            // nothing to update, just return its value
        } else if (node.updater === Dag.bind) {
            // nothing to update, just return its assigned node's value
            node.value = this._get(node.suppliers[0], log)
        } else { // node is dirty and has an updater method
            // get updated supplier values to pass to the updater method
            const args = []
            for(let supplier of node.suppliers)
                args.push(this._get(supplier, log))
            if(log) this._log(Dag.info, 'get', `Updating node ${node.key()}) via ${node.updater.name}...`)
            node.value = node.updater.apply(node, args)
        }
        node.dirty = Dag.clean
        return node.value
    }

    // Backdoor to peek at any node's value without causing an update chain reaction
    _peek(refOrKey) {
        const node = this.nodeRef(refOrKey, '_peek()')
        return node.value
    }

    // Same as get(), but with tracking enabled
    track(fromRefOrKey, leafRefOrKey) {
        const from = this.nodeRef(fromRefOrKey)  // only use node references within _get()!!!
        const leaf = this.nodeRef(leafRefOrKey)  // only use node references within _get()!!!
        this.tracker = {...Dag._trackerTemplate, from, leaf}
        return this._track(leaf)
    }

    // Same as _get(), but with tracking enabled
    _track(node) {
        if (node.updater === Dag.constant) {
            this.tracker.constant++
        } else if (node.updater === Dag.input) {
            this.tracker.input++
        } else if (node.dirty === Dag.clean) {
            this.tracker.clean++
        } else if (node.updater === Dag.bind) {
            this.tracker.assign++
            node.value = this._track(node.suppliers[0])
        } else { // get updated supplier values
            this.tracker.calc++
            const args = []
            for(let supplier of node.suppliers)
                args.push(this._track(supplier))
            // this.tracker.stack.push(node.updater.name)
            node.value = node.updater.apply(node, args)
        }
        node.dirty = Dag.clean
        return node.value
    }
    
    //--------------------------------------------------------------------------
    // Logging methods
    //--------------------------------------------------------------------------
    /**
     * 
     * @param {string} method Name of the calling method
     * @param {integer} level Dag.info, Dag.warn, Dag.error, or Dag.fatal
     * @param {string} msg 
     */
    static info = 0
    static warn = 1
    static error = 2
    static fatal = 3
    _log(level, method, msg) {
        const m = ['INFO', 'WARN', 'ERROR', 'FATAL']
        this.messages.push({level: m[level], method, msg})
        if (level === Dag.fatal)
            throw new Error(`${level} from ${method}: ${msg}`)
    }
}