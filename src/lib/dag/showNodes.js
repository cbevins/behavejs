export function showNodes(dag) {
    let width = 8
    for(let node of dag.nodes)  width = Math.max(width, node.key.length)
    console.log(['Node Key'.padEnd(width), 'CALC ', '  Status', '   Value',
        'Dirty', 'Sups', 'Cons'].join(' | '))
    for(let node of dag.nodes) {
        let updater = 'calc'
        updater = dag.isInputNode(node) ? 'INPUT' : updater
        updater = dag.isConstantNode(node) ? 'CONST' : updater
        let str = [
            node.key.padEnd(width),
            updater.padEnd(5),
            node.status.padEnd(8),
            (''+node.value).padStart(8),
            node.dirty,
            (''+node.suppliers.length).padStart(4),
            (''+node.consumers.length).padStart(4)
        ].join(' | ')
        console.log(str)
    }
}
