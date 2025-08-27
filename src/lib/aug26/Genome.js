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
            const [key, value, units, option, options] = gene
            // console.log(`Gene "${key}"...`)
            for(let opt of options) {
                const [cfgOpt, method, supkeys] = opt
                for(let i=0; i<supkeys.length; i++) {
                    // console.log(`    ${method.name} arg ${i+1} ${supkeys[i]}...`)
                    if(! this.map.has(supkeys[i])) {
                        throw new Error(`Node "${key}" option "${cfgOpt}" "${method.name}" arg ${i+1} "${supkeys[i]}" is not in the genome`)
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
}
