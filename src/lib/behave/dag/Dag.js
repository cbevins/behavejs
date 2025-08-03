import { DagNode } from './DagNode.js'

/**
 * TO DO
 * 
 * - 1 CONSTANT is a root node with no suppliers, has consumers, cannot be set()
 * - 2 INPUT is a root node with no suppliers, has no consumers, can be set()
 * - 3 
 * DagNode.status SUPPLIERS   CONSUMERS     set()  updater
 *  1 CONSTANT        NO          YES         NO      Dag.constant()
 *  2 INPUT           NO          YES         YES     Dag.input()
 *  3 DERIVED         YES         YES         NO      some function()
 *  4 TERMINAL        YES         NO          NO      some function()
 *  0 ORPHAN*         NO          NO          YES     Dag.input()
 *  * Usually occurs only as an error in the Dag definition
 * 
 *  DagNode.selected In Pathway  SELECTED  TERMINAL
 *  0 INACTIVE            NO          NO      NA
 *  1 ACTIVE              YES         NO      NO
 *  2 SELECTED            YES         YES     NO
 *  3 LEAF                YES         YES     YES
 * 
 * top-most is the starting node for iterative inputs
 *  
 * 
 */
// DagNode.dirty values
const CLEAN = 'CLEAN'
const DIRTY = 'DIRTY'

// DagNode.status values
const INACTIVE = 'INACTIVE' // not in the suppliers stream of any OUTPUT node
const ACTIVE = 'ACTIVE'     // in the suppliers stream of at least one OUTPUT node
const OUTPUT = 'OUTPUT'     // OUTPUT node that is a supplier to at least one other OUTPUT node
const TERMINAL = 'TERMINAL' // OUTPUT node that supplies no other OUTPUT nodes

/**
 * 1 - Create the Dag via new Dag('My Dag')
 * 2 - Call dag.add() to add DagNodes
 * 3 - Call dag.init() after all DagNodes are added.
 * 4 - call dag.setOutputs() to declare output DagNodes
 * 5 - call dag.set() to set value on an input DagNodes
 * 6 - call dag.get() to return value of any DagNode after it is updated
 */
export class Dag {
    constructor(desc) {
        this.desc = desc
        this.nodes = []             // Array of references to all DagNodes
        this.nodeMap = new Map()    // Map of DagNode key => reference
        this.inputs = new Set()     // Set of references to all possible input DagNodes (whether active or not)
        this.outputs = new Set()    // Set of references to currently selected output DagNodes
    }

    // DagNode.updater method for DagNodes whose values are directly assigned from other nodes
    static assign(source) { return source.value }
    // DagNode.updater method for DagNode whose value is constant.
    static constant() {}
    // DagNode.updater method for DagNodes whose value is client input via Dag.set()
    static input() {}

    // Adds a DagNode to this Dag.
    // If a DagNode with the 'key' already exists in nodeMap, it is replaced.
    add(nodeOrArray) {
        const nodes = Array.isArray(nodeOrArray) ? nodeOrArray : [nodeOrArray]
        for(let node of nodes) {
            node.consumers = []
            node.inputs = []
            node.status = INACTIVE  // initialize all DagNode.status as INACTIVE
            node.dirty = CLEAN
            this.nodeMap.set(node.key, node)
        }
        return nodeOrArray
    }

    // Called by client after Dag.init() to add one or more DagNodes as 'outputs'.
    // Most efficient if only called once with the complete set of inputs in the arg array.
    // 'refOrKeyArray' may be an array of, or a single of, DagNode keys or references
    addOutputs(refOrKeyArray) {
        const ar = Array.isArray(refOrKeyArray) ? refOrKeyArray : [refOrKeyArray]
        for(let refOrKey of ar) {
            const node = this.nodeRef(refOrKey)
            this.outputs.add(node)  // add this to the Set() of output nodes
            this._propagateSuppliersToActive(node)
            node.status = TERMINAL  // for now, promote status from ACTIVE to TERMINAL
        }
        // Demote non-terminal output nodes to OUTPUT
        this._demoteNonTerminals()
        // this._setInputDepths()
    }

    // All OUTPUT DagNodes are initially set as TERMINAL.
    // This method checks the suppliers of every TERMINAL DagNode,
    // and if any are TERMINAL, they are demoted to OUTPUT.
    _demoteNonTerminals() {
        for(let output of this.outputs) {
            if (output.status===TERMINAL) {   // check only nodes not yet demoted to OUTPUT
                for(let supplier of output.suppliers)
                    this._demoteSupplierTerminals(supplier)
            }
        }
    }

    _demoteSupplierTerminals(node) {
        if (node.status===TERMINAL)
            node.status = OUTPUT
        for(let supplier of node.suppliers)
            this._demoteSupplierTerminals(supplier)
    }

    // TO DO
    clearOutputs() {
        this.outputs.clear()
        this.init()
    }

    // Returns the DagNode value.
    // If the DagNode is dirty, set() is recursively called on all its suppliers,
    // its dirty flag is cleared before returning its updated value.
    get(refOrKey) {
        const node = this.nodeRef(refOrKey)
        if (!node.dirty)
            return (node.value)
        if (node.updater !== Dag.constant && node.updater !== Dag.input) {
            if (node.updater===Dag.assign) {
                node.value = this.get(node.suppliers[0])
            } else {
                // get updated supplier values
                const args = []
                for(let supplier of node.suppliers)
                    args.push(this.get(supplier))
                node.value = node.updater.apply(node, args)
            }
        }
        node.dirty = CLEAN
        return node.value
    }

    // MUST BE CALLED AFTER ALL THE DagNodes HAVE BEEN ADDED TO THIS Dag
    init() {
        this.nodes = [...this.nodeMap.values()]
        this._resolveNodeSupplierKeys()
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
        this._setConsumers()
        // TO DO - ensure all Dag.assign() has exactly 1 supplier
    }

    isConstantNode(refOrKey) { return this.nodeRef(refOrKey).updater === Dag.constant }
    isInputNode(refOrKey) { return this.inputs.has(this.nodeRef(refOrKey)) }
    isOutputNode(refOrKey) { return this.outputs.has(this.nodeRef(refOrKey)) }

    // Returns a reference to the DagNode with 'key' prop
    nodeRef(refOrKey) { 
        if (typeof refOrKey === 'string') {
            if (! this.nodeMap.has(refOrKey))
                throw new Error(`Attempt to access Dag.nodeMap() with unknown key '${refOrKey}'.`)
            return this.nodeMap.get(refOrKey)
        }
        return refOrKey // otherwise assume it is a DagNode reference
    }

    // Sets the DagNode value and propagates the dirty flags to its downstream consumers.
    // Only works for INPUT DagNodes and if value is different from current value.
    set(refOrKey, value) {
        const node = this.nodeRef(refOrKey)
        if (node.updater===Dag.input && node.value!== value) {
            node.value = value
            this._propagateDirtyToConsumers(node)
        }
        return node.value
    }

    // -------------------------------------------------------------------------
    // Private methods
    // -------------------------------------------------------------------------

    // Propagates the 'dirty' flag to all the node's consumers
    _propagateDirtyToConsumers(node) {
        node.dirty = DIRTY
        for(let next of node.consumers)
            if (!next.dirty)
                this._propagateDirtyToConsumers(next)
    }

    _propagateSuppliersToActive(node) {
        node.status = ACTIVE
        for(let supplier of node.suppliers)
            if (supplier.status===INACTIVE)
                this._propagateSuppliersToActive(supplier)
    }

    // Converts (in-place) any supplier elements that are keys into references
    _resolveNodeSupplierKeys() {
        for(let node of this.nodes) {
            for (let i=0; i<node.suppliers.length; i++) {
                console.log('resolve node', node.key, 'supplier', i, node.suppliers[i])
                node.suppliers[i] = this.nodeRef(node.suppliers[i])
            }
        }
    }

    // Assigns DagNode's 'consumers' based upon the 'suppliers' that were
    // declared at DagNode definition time.
    _setConsumers() {
        for(let node of this.nodes)
            node.consumers = []
        for(let node of this.nodes)
            for(let supplier of node.suppliers)
                supplier.consumers.push(node)
    }

    // _setInputDepths(node) {
    //     for(let node of this.nodes) {
    //         node.inputs = []
    //         node.dists = []
    //     }
    //     // determine distances from each output to its inputs
    //     for(let node of this.outputs)
    //         this._setInputDepthsNext(node, node, 0)
    // }

    // _setInputDepthsNext(start, node, depth=0) {
    //     for(let next of node.suppliers) {
    //         if (next.updater===Dag.input) {
    //             start.inputs.push(next.key)
    //             start.dists.push(depth+1)
    //         }
    //         if (next.update!==Dag.constant)
    //             this._setInputDepthsNext(start, next, depth+1)
    //     }
    // }

    // Determines INACTIVE, ACTIVE, or OUTPUT status of ALL DagNodes given this.outputs
    _setStatus() {
        for(let node of this.nodes)
            node.status = INACTIVE
        for(let node of this.outputs) {
            this._propagateActive(node)
            node.status = OUTPUT
        }
    }
}