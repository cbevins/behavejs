import { Dag } from './index.js'

export class ModuleFactory {
    static any = '*'  // Matches any or all configuration names and options

    constructor(){}
/**
 * Returns an array of nodes with a single updater method selected according to
 * the configuration and binding specs.
 * First all the configurations are applied to all the nodes.
 * Then all bindings are applied, overwriting any previous methods.
 * 
 * @param {array} nodes [key, value, units, method, args, optName?, optValue?]
 * @param {array} configs Elements are array of [<cfgName>, <cfgValue>]
 * @param {array} bindings Elements are array of [nodeKey, boundNodeFullKey]
 * @returns 
 */
    static select(path, nodes, configs, bindings) {
        const configured = ModuleFactory.configure(nodes, configs)
        const results = ModuleFactory.bind(path, configured, bindings)
        if (results.length !== nodes.length)
            throw new Error(`***configure() "${path}" matched ${results.length} instead of ${nodes.length} nodes`)
        return results
    }

    static bind(path, nodes, bindings) {
        for(let i=0; i<nodes.length; i++) {
            const [key, value, units, method, args, optName, optValue] = nodes[i]
            for (let j=0; j<bindings.length; j++) {
                const [bindLeaf, bindNode] = bindings[j]
                if (key === path+bindLeaf) {
                    nodes[i] = [key, value, units, Dag.assign, [bindNode], 'bind', '']
                    break
                }
            }
        }
        return nodes
    }

    /**
     * Returns a NEW array
     * @param {array} nodes 
     * @param {*} configs 
     * @returns 
     */
    static configure(nodes, configs) {
        const results = []
        for(let node of nodes) {
            const [key, value, units, options] = node
            // Check each option until a match is found
            let found = false
            for (let i=0; i<options.length; i++) {
                if (found) break// out of the i loop
                const [optName, optValue, method, args] = options[i]
                // Check each configuration against this option
                for(let j=0; j<configs.length; j++) {
                    const [cfgName, cfgValue] = configs[j]
                    if (cfgName===optName || optName===this.any) {
                        if (cfgValue===optValue || optValue===this.any) {
                            // We have a match!
                            results.push([key, value, units, method, args, optName, optValue])
                            found = true
                            break   // out of the j loop
                        }
                    }
                }
            }
            if (! found) {
                const [optName, optValue, method, args] = options[0]
                results.push([key, value, units, method, args, optName, optValue])
            }
        }
        return results
    }
}
