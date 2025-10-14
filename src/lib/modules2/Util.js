export class Util {
    static listDagNode(node, title='') {
        const {_meta, value, units, updater, suppliers, config, consumers, dirty, status} = node
        const {key, parent, prop, label, isNode} = _meta
        let str = title + 'n'
        str += `key       : ${key}\n`
        str += `value     : ${value}\n`
        str += `status    : ${status}\n`
        str += `dirty     : ${dirty}\n`
        str += `config    : ` + (!config) ? `\n` : `${config.key}=${config.value}\n`
        str += `updater   : ${updater.name}\n`
        str += `suppliers : ${suppliers.length}\n`
        for(let supplier of suppliers)
            str+= `            ${supplier.key()}\n`
        str += `consumers : ${consumers.length}\n`
        for(let consumer of consumers)
            str+= `            ${consumer.key()}\n`
        return str
    }
    
    static logDagNode(node, title='') {
        console.log(Util.listDagNode(node, title))
    }

    static listDagNodes(nodes, title='') {
        // determine column widths
        const w0 = nodes.reduce((w, node) => Math.max(node._meta.key.length, w), 0)
        const w1 = nodes.reduce((w, node) => Math.max((''+node.value).length, w), 0)
        const w2 = nodes.reduce((w, node) => Math.max((''+node.units).length, w), 0)
        const w3 = nodes.reduce((w, node) => Math.max((''+node.updater.name).length, w), 0)
        const w6 = nodes.reduce((w, node) => Math.max((''+node.status).length, w), 0)
        let str = `\n${nodes.length} ${title}\n`
        for(let node of nodes) {
            // get all the node properties
            const {_meta, value, units, updater, suppliers, config, consumers, dirty, status} = node
            const {key, parent, prop, label, isNode} = _meta

            str += key.padEnd(w0+2)
            str += ('"'+value+'"').padEnd(w1+4)
            str += status.padEnd(w6+2)
            str += dirty ? 'DIRTY  ' : 'CLEAN  '
            str += (updater.name).padEnd(w3+2)
            str += (''+suppliers.length).padStart(4)
            str += (''+consumers.length).padStart(4)
            str += (!config) ? `  "no config"` : `  ${config.key}=${config.value}`
            str += '\n'
        }
        return str + nodes.length + ' nodes'
    }
    
    static logDagNodes(nodes, title='') {
        console.log(Util.listDagNodes(nodes, title))
    }

    /**
     * @param {DagModule} module 
     * @param {integer} indent 
     * @returns Indented multi-line string of decendants of *module*
     */
    static moduleTreeStr(topmod, indent=2) {
        let str = ''
        for(let [mod, depth] of Util.moduleTreeArray(topmod)) {
            str += ''.padStart(indent*depth) + mod._meta.prop.padEnd(12)
            if (mod.isNode()) {
                const cfg = mod.config ? `${mod.config.key}=${mod.config.value}` : 'no config'
                str += ` [${mod.value}], ${mod.updater.name}() "${cfg}"`
            }
            str += '\n'
        }
        return str
    }

    /**
     * Creates an array of all descendants of *module* and their depth
     * @param {DagModule} module Top-level DagModule to be traversed
     * @param {string} str Used only on recursive calls
     * @param {integer} depth Used only on recursive call
     * @returns An array of [prop, depth, modref] triplets.
     */
    static moduleTreeArray(module, ar=[], depth=0) {
        ar.push([module, depth])
        if (module.isNode()) return
        // NOTE: Object.entries() *DOES NOT* access non-enumerables such as 'module._meta'
        for(let [key, node] of Object.entries(module))
            Util.moduleTreeArray(node, ar, depth+1)
        return ar
    }
}