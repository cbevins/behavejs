import { DagNode } from './DagNode.js'

const CLEAN = 'CLEAN'
const DIRTY = 'DIRTY'

const ACTIVE = 'ACTIVE'
const INACTIVE = 'INACTIVE'
const INPUT = 'INPUT'
const OUTPUT = 'OUTPUT'

export class Dag {
    constructor(desc) {
        this.desc = desc
        this.nodes = []             // Array of references to all DagNodes
        this.nodeMap = new Map()    // Map of DagNode key => reference
        this.inputs = []            // Array of references to all possible input DagNodes
        this.outputs = new Set()    // Set of references to currently selected output DagNodes
    }

    assign(source) { return source.value }
    constant() {}
    input() {}

    add(node) {
        node.consumers = []
        node.inputs = []
        node.status = INACTIVE
        node.dirty = CLEAN
        node.visited = false
        this.nodes.push(node)
        this.nodeMap.set(node.key, node)
        return node
    }

    // 'refOrKeyArray' may be an array of, or a single of, DagNode keys or references
    addOutputs(refOrKeyArray) {
        const ar = Array.isArray(refOrKeyArray) ? refOrKeyArray : [refOrKeyArray]
        for(let refOrKey of ar) {
            const node = this.nodeRef(refOrKey)
            this.outputs.add(node)
            this._propagateActive(node)
            node.status = OUTPUT    // promote status from ACTIVE to OUTPUTS
        }
    }

    // MUST BE CALLED AFTER ALL THE DagNodes HAVE BEEN ADDED TO THIS Dag
    init() {
        this._resolveSupplierKeys()
        this.inputs = []
        for(let node of this.nodes) {
            node.status = INACTIVE
            node.dirty = CLEAN
            // Any node without an updater() must be a Dag input
            if (!node.updater) node.updater = this.input
            if (node.updater === this.input) this.inputs.push(node)
        }
        this._setConsumers()
    }

    // Returns a reference to the DagNode with 'key' prop
    nodeRef(refOrKey) { 
        if (typeof refOrKey === 'string') {
            if (! this.nodeMap.has(refOrKey))
                throw new Error(`Attempt to access Dag.nodeMap() with unknown key '${refOrKey}'.`)
            return this.nodeMap.get(refOrKey)
        }
        return refOrKey // assume it is a DagNode reference
    }

    peek(refOrKey) {
        const node = this.nodeRef(refOrKey)
        if (!node.dirty) return (node.value)
        if (node.updater !== this.constant && node.updater !== this.input)
        {
            // get updated supplier values
            const args = []
            for(let supplier of node.suppliers) args.push(this.peek(supplier))
            node.value = node.updater.apply(node, args)
            // console.log(`${this.key}.update() => ${this.value}`)
        }
        node.dirty = CLEAN
        return node.value
    }

    // Sets the DagNode value and propagates the dirty flags.
    // Only works for INPUT DagNodes.
    poke(refOrKey, value) {
        const node = this.nodeRef(refOrKey)
        if (node.updater===this.input) {
            node.value = value
            this._propagateDirty(node)
        }
        return node.value
    }

    // -------------------------------------------------------------------------
    // Private methods
    // -------------------------------------------------------------------------

    _dfsSort() {
        this.dfsOrder = []
        // use DagNode.tmp to store 'visited' flag
        for (let node of this.nodes) node.visited = false
        // Topological Sort starting from each unvisited node
        for (let node of this.nodes) if (!node.visited) this._dfsSortNext(node)
        this.dfsOrder.reverse()
        return this.dfsOrder
    }

    _dfsSortNext(node) {
        node.visited = true // Mark the current node as tmp
        for (let consumer of node.consumers) if (!consumer.visited) this._dfsSortNext(consumer)
        this.dfsOrder.push(node) // Push current node to stack which stores the result
    }

    _propagateActive(node) {
        node.status = ACTIVE
        console.log('propagatActive', node.key)
        for(let supplier of node.suppliers) {
            if (supplier.status===INACTIVE) this._propagateActive(supplier)
        }
    }

    // Propagates the 'dirty' flag to all the node's consumers
    _propagateDirty(node) {
        node.dirty = DIRTY
        for(let next of node.consumers) this._propagateDirty(next)
    }

    // Converts (in-place) any supplier elements that are keys into references
    _resolveSupplierKeys() {
        // console.log('_resolveSupplierKeys()')
        for(let node of this.nodes) {
            // console.log('    Node', node.key)
            for (let i=0; i<node.suppliers.length; i++) {
                // console.log('        supplier', node.suppliers[i])
                node.suppliers[i] = this.nodeRef(node.suppliers[i])
            }
        }
    }

    // Sets each DagNode's 'consumers' based upon the 'suppliers' that were
    // declared at DagNode definition time.
    _setConsumers() {
        for(let node of this.nodes) node.consumers = []
        for(let node of this.nodes) {
            for(let supplier of node.suppliers) supplier.consumers.push(node)
        }
    }

    // Determines INACTIVE, ACTIVE, or OUTPUT status of ALL DagNodes given this.outputs
    _setStatus() {
        for(let node of this.nodes) node.status = INACTIVE
        for(let node of this.outputs) {
            this._propagateActive(node)
            node.status = OUTPUT
        }
    }
}