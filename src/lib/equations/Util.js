import { Dag } from '../index.js'

export class Util {

    //--------------------------------------------------------------------------
    // Lists/logs Genome node definitions
    static listNodeDefs(nodes, title='') {
        let str = `\n${title}\n`
        for(let node of nodes) {
            const [key, value, units, optidx, options] = node
            str += `node="${key}" value="${value}" units="${units}" cfg=${optidx}\n`
            for(let option of options) {
                const [cfgOpt, updater, args] = option
                if (!updater) throw new Error(`Node "${key}" has undefined updater`)
                str += `        cfg=["${cfgOpt}"] updater="${updater.name}(${args.join(', ')})"\n`
            }
        }
        return str + nodes.length + ' nodes'
    }
    static logNodeDefs(nodes, title='') {console.log(Util.listNodeDefs(nodes, title))}

    //--------------------------------------------------------------------------

    static listDagNodes(nodes, title='') {
        const w0 = nodes.reduce((w, node) => Math.max(node.key.length, w), 0)
        const w1 = nodes.reduce((w, node) => Math.max((''+node.value).length, w), 0)
        const w2 = nodes.reduce((w, node) => Math.max((''+node.units).length, w), 0)
        const w3 = nodes.reduce((w, node) => Math.max((''+node.updater.name).length, w), 0)
        const w6 = nodes.reduce((w, node) => Math.max((''+node.status).length, w), 0)
        const w7 = nodes.reduce((w, node) => Math.max((''+node.dirty).length, w), 0)
        let str = `\n${title}\n`
        for(let node of nodes) {
            const {key, value, units, cfg, options,
                updater, suppliers, consumers, dirty, status, cfgval} = node
            str += key.padEnd(w0+2)
            str += ('"'+value+'"').padEnd(w1+4)
            str += status.padEnd(w6+2)
            str += dirty.padEnd(w7+2)
            str += (updater.name).padEnd(w3+2)
            str += (''+suppliers.length).padStart(4)
            str += (''+consumers.length).padStart(4)
            const k = (! cfg || cfg==='') ? 'none' : cfg.key
            str += `  "${k}" = "${cfgval}"`
            str += '\n'
        }
        return str + nodes.length + ' nodes'
    }
    
    static logDagNodes(nodes, title='') {
        console.log(Util.listDagNodes(nodes, title))
    }
    
    //--------------------------------------------------------------------------

    static listDagConfigs(configs, title='Configurations') {
        let str = `\n${title}\n`
        const w0 = configs.reduce((w, cfg) => Math.max(cfg.key.length, w), 0)
        const w1 = configs.reduce((w, cfg) => Math.max(cfg.value.length, w), 0)
        for(let cfg of configs) {
            const {key, options, prompt, prompts, value} = cfg
            str += key.padEnd(w0+2)
            str += ('"'+value+'"').padEnd(w1+4)
            str += '\n'
        }
        return str + configs.length + ' nodes'
    }
    
    static logDagConfigs(nodes, title='') {
        console.log(Util.listDagConfigs(nodes, title))
    }
}