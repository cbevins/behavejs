export class Util {

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