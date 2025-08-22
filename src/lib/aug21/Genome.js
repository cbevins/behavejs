import { ModuleBase } from './index.js'

export class Genome {
    constructor(genome) {
        this.genome = genome
        // Construct a map
        this.map = new Map()
        for (let gene of this.genome) this.map.set(gene[0], gene)

        // Ensure all method arg keys are defined gene keys
        this.checkGenomeKeys()
    }

    checkGenomeKeys() {
        for(let gene of this.genome) {
            const [key, value, units, options] = gene
            // console.log(`Gene "${key}"...`)
            for(let option of options) {
                const [cfgName, cfgOpt, method, supkeys] = option
                for(let i=0; i<supkeys.length; i++) {
                    // console.log(`    ${method.name} arg ${i+1} ${supkeys[i]}...`)
                    if(! this.map.has(supkeys[i])) {
                        throw new Error(`"${key}" "${cfgName}"="${cfgOpt}" "${method.name}" arg ${i+1} "${supkeys[i]}" is not in the genome`)
                    }
                }
            }
        }
    }

    listGenome(title='') {
        let str = `\n${title}\n`
        for(let gene of this.genome) {
            const [key, value, units, options] = gene
            str += `${key}    ${value}    ${units}\n`
            for(let option of options) {
                const [cfgName, cfgOpt, updater, args] = option
                str += `        ["${cfgName}", "${cfgOpt}"] ${updater.name}(${args.join(', ')}) ${cfgName}=${cfgOpt}\n`
            }
        }
        return str + this.genome.length + ' genes'
    }

    logGenome(title='') {console.log(this.listGenome(title))}

    /**
     * 
     * @param {array} config Array of [<configKey>, <selectedOption>]
     */
    applyConfig(config) {
        const cfg = new Set()
        for(let [key,opt] of config) cfg.add(`${key}=${opt}`)
    
        const mod = new ModuleBase()    // get access to Mod.any
        const nodes=[]
        for(let gene of this.genome) {
            const [key, value, units, options] = gene
            let found = false
            for(let i=0; i<options.length; i++) {
                const [cfgName, cfgOpt, method, supkeys] = options[i]
                if (cfgName===mod.any && cfgOpt===mod.any) {
                    nodes.push([key, value, units, method, supkeys, cfgName, cfgOpt])
                    found = true
                    break
                }
                if (cfg.has(`${cfgName}=${cfgOpt}`)) {
                    nodes.push([key, value, units, method, supkeys, cfgName, cfgOpt])
                    found = true
                    break
                }
            }
            if (! found) throw new Error(`"${key}" has no passing configuration sepc`)
        }
        if(nodes.length !== this.genome.length)
            throw new Error(`Configuration resulted in ${nodes.length} instead of ${this.genome.length} nodes.`)
        return nodes
    }
}
