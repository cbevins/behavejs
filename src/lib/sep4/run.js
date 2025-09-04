import { Dag, P } from './index.js'
import { DeadFuelMoistureModule } from './index.js'
import { LiveCuringModule } from './index.js'
import { LiveFuelMoistureModule } from './index.js'
import { FuelParticleNodes } from './index.js'
import { Util } from '../index.js'

function listActiveConfigs(dag) {
    let str = '\nActive Configurations:\n'
    for(let config of dag.activeConfigs()) {
        const [key, opt] = config.split('=')
        str += `  ${key}  [${opt}]\n`
    }
    console.log(str)
}

function listNodes(nodes, title='') {
        let str = `\n${title}\n`
        for(let node of nodes) {
            const [key, value, units, optidx, options] = node
            str += `${key}    ${value}    ${units}    ${optidx}\n`
            for(let option of options) {
                const [cfgOpt, updater, args] = option
                str += `        ["${cfgOpt}"] ${updater.name}(${args.join(', ')})\n`
            }
        }
        return str + nodes.length + ' nodes'
    }

function logNodes(nodes, title='') {console.log(listNodes(nodes, title))}

//------------------------------------------------------------------------------
// Step 1 - construct a genome of all possible nodes and configurations
//------------------------------------------------------------------------------

const deadmois = new DeadFuelMoistureModule(P.deadmois)
const livemois = new LiveFuelMoistureModule(P.livemois)
const curing1 = new LiveCuringModule(P.curing1, livemois.herb)
const mod = new FuelParticleNodes('surface/primary/bed/')

//------------------------------------------------------------------------------
// Step 2 - Configure and combine all the module genomes
//------------------------------------------------------------------------------

const nodes = [
    ...deadmois.configure(deadmois.individual),
    ...livemois.configure(livemois.individual),
    ...curing1.configure(curing1.est),
].sort()

logNodes(nodes)

//------------------------------------------------------------------------------
// Step 3 - construct the directed acyclical graph
//------------------------------------------------------------------------------

const dag = new Dag(nodes)

//------------------------------------------------------------------------------
// Step 4 - select nodes of interest
//------------------------------------------------------------------------------

const select = [curing1.applied]
dag.select(select)
Util.logDagNodes(dag.selected(), 'Selected Nodes')

//------------------------------------------------------------------------------
// Step 5 - determine/confirm active configurations (informational)
//------------------------------------------------------------------------------

listActiveConfigs(dag)

//------------------------------------------------------------------------------
// Step 6 - determine/confirm active inputs (informational)
//------------------------------------------------------------------------------

const inputs = dag.activeInputs()
Util.logDagNodes(dag.activeInputs(), 'Active Input Nodes')

//------------------------------------------------------------------------------
// Step 7 - Set input values
//------------------------------------------------------------------------------

dag.set(livemois.herb, 0.5)

//------------------------------------------------------------------------------
// Step 8 - Get output values
//------------------------------------------------------------------------------

const curedEst = dag.get(curing1.estimated)
console.log('Estimate curing at 50% MC', curedEst)