export class DagNode {
    constructor(key, value=null) {
        this.key = key
        this.value = value
        
        // Reference to the value update method called by Dag.peek()
        this.updater = null
        
        // References to DagNodes that supply parameters to *this* DagNode.
        // These are set externally by the client during Dag configuration
        // by calling DagNode.depends(method, [dagNodes]).
        this.suppliers = []

        // Remaining props are set and used by the Dag

        // References to DagNodes that consume *this* DagNode as a supplier.
        // These are set internally when Dag.init() is called.
        this.consumers = []

        // References to all Dag INPUT nodes that impact *this* DagNode
        // These are set internally when Dag.init() is called.
        this.inputs = []

        // Whether the DagNode is INACTIVE, ACTIVE, or OUTPUT
        this.status = null
        
        // Whether the DagNode is DIRTY or CLEAN
        this.dirty = null
    }

    // Declares the DagNode's updater method and supplier DagNodes
    // 'method' should be a reference to:
    //  - Dag.constant()
    //  - Dag.assign()
    //  - any other function that, when passed the values of *this* DagNode's
    //      suppliers, returns an updated value assigned to *this* DagNode
    //  - left null, in which case it becomes a Dag input node.
    // 'suppliers' elements may be a mix of DagNode keys and references
    depends(funcRef, suppliers=[]) {
        this.updater = funcRef
        this.suppliers = suppliers
        return this
    }
}