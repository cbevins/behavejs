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
}