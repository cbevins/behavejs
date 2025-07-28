export class DagNode {
    constructor(key, value=null, prop=null) {
        this.key = key
        this.value = value
        this.prop = prop
        
        // Reference to the value update method called by Dag.peek()
        // This is set externally by the client during Dag configuration
        // by calling DagNode.depends(method, [dagNodes]).
        this.updater = null
        
        // References to DagNodes that supply parameters to *this* DagNode.
        // These are set externally by the client during Dag configuration
        // by calling DagNode.depends(method, [dagNodes]).
        this.suppliers = []

        // ---------------------------------------------------------------------
        // Remaining props are set and used by the Dag

        // References to DagNodes that consume *this* DagNode as a supplier.
        // These are set internally when Dag.init() is called.
        this.consumers = []

        // References to all Dag INPUT DagNodes and that impact *this* DagNode
        // These are set internally when Dag.init() is called.
        // Note that Dag.constant and Dag.input updaters will have no inputs
        this.inputs = []
        this.dists = []     // distance from *this* DagNode to its nearest input

        // Whether the DagNode is INACTIVE, ACTIVE, or OUTPUT
        this.status = null
        
        // Whether the DagNode is DIRTY or CLEAN
        this.dirty = null
    }

    /**
     * Declares the DagNode's updater method and supplier DagNodes
     * @param {function} funcRef Reference to an updater function, which should be
     *  - Dag.aasing()
     *  - Dag.constant()
     *  - Dag.input()
     *  - any other function that, when passed the values of *this* DagNode's
     *      suppliers as args, returns an updated value assigned to *this* DagNode
     *  - left null, in which case it becomes a Dag input node.
     * @param {array} suppliers Array of DagNode keys and/or references
     * @returns 
     */
    depends(funcRef, suppliers=[]) {
        this.updater = funcRef
        this.suppliers = suppliers
        return this
    }
}