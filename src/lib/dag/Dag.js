import { DagNode } from './DagNode.js'

export class Dag {
    constructor() {
        this.nodes = []             // Array of references to all DagNodes
        this.nodeMap = new Map()    // Map of DagNode key => reference
        this.dfsOrder = []          // DFS sort topological node order
        this.topoLevels = []        // Kahn sort topological levels
    }

    // Adds a DagNode to this Dag
    add(dagNode) {
        this.nodes.push(dagNode)
        this.nodeMap.set(dagNode.key, dagNode)
        return dagNode
    }

    // Dummy updater method for constant DagNodes
    constant() {}

    init() {
        this._setOutputs()
        this._dfsSort()
        this._kahnSort()
        this.update()
    }

    // Returns an array of references to client input DagNodes
    // Note that level 0 DagNodes with null 'updater' methods are considered to be
    // Dag domain inputs whose values are set by clients via Dag.setNodeValue()
    inputs() { return this.topoLevels[0].filter(node => node.updater === null) }

    // Returns a reference to the DagNode with 'key' prop
    node(key) { return this.nodeMap.get(key) }

    poke(refOrKey, value) {
        const node = (typeof refOrKey === 'string') ? this.nodeMap.get(refOrKey) : refOrKey
        node.value = value
        this._propagateDirty(node, true)
    }

    // Updates all the nodes in topological order
    update() {
        for(let i=1; i<this.topoLevels.length; i++) {
            for(let node of this.topoLevels[i]) {
                node.update()
                node.tmp = false    // clear the dirty flag
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
