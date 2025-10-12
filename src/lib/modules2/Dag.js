export class Dag {
    // DagNode.updater method for DagNodes whose values are directly bound to another node
    static bind(source) { return source.value }
    // DagNode.updater method for DagNode whose value is constant.
    static constant() {}
    // DagNode.updater method for DagNodes whose value is client input via Dag.set()
    static input() {}
}