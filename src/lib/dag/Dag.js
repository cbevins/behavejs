import { DagNode } from './DagNode.js'

export class Dag {
    constructor() {
        this.nodes = []             // Array of references to all DagNodes
        this.nodeMap = new Map()    // Map of DagNode key => reference
        this.dfsOrder = []          // DFS sort topological node order
        this.topoLevels = []        // Kahn sort topological levels
    }

    // Adds a DagNode that initially is client input
    add(desc, value) {
        const node = new DagNode(desc, value, this.client)
        this.nodes.push(node)
        this.nodeMap.set(node.key, node)
        return node
    }

    clearSelected() { for(node of this.nodes) this.node.status = 'ignored' }

    // Dummy updater method for DagNodes that are constant or client input via poke()
    client() {}
    constant() {}

    // Sets DagNode.outputs[], performs topological sort
    // All DagNodes are clean and ignored
    init() {
        console.log('Running Dag.init()...')
        // Any node without an updater() must be client input
        for(let node of this.nodes) if (!node.updater) node.updater=this.client
        this._setOutputs()
        // this._dfsSort()
        this._kahnSort()
        this.update()
    }

    // Returns an array of references to client input DagNodes
    // Note that level 0 DagNodes have Dag.constant() or Dag.client() 'updater' methods
    clientNodes() { return this.topoLevels[0].filter(node => node.updater === this.client) }
    constantNodes() { return this.topoLevels[0].filter(node => node.updater === this.constant) }

    // Returns a reference to the DagNode with 'key' prop
    node(key) { 
        if (! this.nodeMap.has(key))
            throw new Error(`Attempt to access Dag.nodeMap() with unknown key '${key}'.`)
        return this.nodeMap.get(key)
    }

    // Returns a reference to a DagNode givene its reference or its key
    nodeRef(refOrKey) { return (typeof refOrKey === 'string') ? this.nodeMap.get(refOrKey) : refOrKey }

    // Updates the value of the DagNode by its key or reference
    poke(nodeRefOrKey, value) {
        const node = this.nodeRef(nodeRefOrKey)
        node.value = value
        this._propagateDirty(node, true)
    }

    // Returns an array of references to all the 'required' DagNodes
    requiredNodes() { 
        const ar = []
        for(let node of this.nodes) if (node.status === 'required') ar.push(node)
        return ar
    }

    // Sets a DagNode status to 'selected'
    // Called by clients to indicate a Dag output of interest
    select(nodeRefOrKey) {
        const node = this.nodeRef(nodeRefOrKey)
        node.status = 'selected'
        node.tmp = 'dirty'
    }

    // Returns an array of references to all the 'selected' DagNodes
    selectedNodes() {
        const ar = []
        for(let node of this.nodes) if (node.status==='selected') ar.push(node)
        return ar
    }

    // Updates all the DagNode values in topological order
    update() {
        console.log('\nRunning Dag.update() for', this.selectedNodes().length, 'output nodes:')
        for(let node of this.selectedNodes()) {
            // console.log(`update() - node ${node.key} is selected`)
            for(let input of node.inputs) this._propagateRequired(input)
        }
        for(let i=1; i<this.topoLevels.length; i++) {
            for(let node of this.topoLevels[i]) {
                if (node.status!=='ignored' && node.tmp) {
                    node.update()
                    node.tmp = false    // clear the dirty flag
                }
            }
        }
    }

    // -------------------------------------------------------------------------
    // Private methods
    // -------------------------------------------------------------------------

    _dfsSort() {
        this.dfsOrder = []
        // use DagNode.tmp to store 'visited' flag
        for (let node of this.nodes) node.tmp = false
        // Topological Sort starting from each unvisited node
        for (let node of this.nodes) if (!node.tmp) this._dfsSortNext(node)
        this.dfsOrder.reverse()
        return this.dfsOrder
    }

    _dfsSortNext(node) {
        node.tmp = true // Mark the current node as tmp
        for (let output of node.outputs) if (!output.tmp) this._dfsSortNext(output)
        this.dfsOrder.push(node) // Push current node to stack which stores the result
    }

    _kahnSort() {
        this.topoLevels = []
        // calculate indegrees for each node and store in node.tmp 
        for (let node of this.nodes) node.tmp = node.inputs.length
        // create Set of remaining nodes to be sorted
        const todo = new Set(this.nodes.values())
        while (todo.size) {
            const found = []    // holds 0 indegrees nodes found at this depth
            // first remove all nodes with 0 remaining indegrees
            for (let node of todo) {
                if (!node.tmp) {
                    found.push(node)
                    todo.delete(node)
                }
            }
            // for each found node, decrement indegrees of its output nodes
            for (let node of found) {
                for(let output of node.outputs) {
                    output.tmp--
                }
            }
            // store found nodes at this depth
            this.topoLevels.push(found)
        }
    }

    _propagateDirty(node, isDirty=true) {
        node.tmp = isDirty
        for(let next of node.outputs) this._propagateDirty(next, isDirty)
    }

    _propagateRequired(node) {
        if (node.status === 'ignored') {    // if NOT already 'selected' or 'required'
            node.status = 'required'
            node.tmp = 'dirty'
            // console.log(`update() - node ${node.key} is required`)
            for(let next of node.inputs) this._propagateRequired(next)
        }
    }

    // Sets each node's 'outputs' (users, consumers) based upon the
    // inputs (sources, providers) that were set at node definition time
    // MUST BE CALLED AFTER ALL THE DagNodes HAVE BEEN ADDED TO THIS Dag
    _setOutputs() {
        for (let node of this.nodes) node.outputs = []
        for (let target of this.nodes) {
            for (let source of target.inputs) source.outputs.push(target)
        }
    }
}
