import { Dag, P } from './index.js'
import { ConstantsModule } from './index.js'
import { DeadFuelMoistureModule } from './index.js'
import { FuelParticleNodes } from './index.js'
import { LiveCuringModule } from './index.js'
import { LiveFuelMoistureModule } from './index.js'
import { StandardFuelModelModule } from './index.js'
import { Util } from '../index.js'

console.log(new Date())

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

const constants = new ConstantsModule(P.constants)
const deadmois = new DeadFuelMoistureModule(P.deadmois)
const livemois = new LiveFuelMoistureModule(P.livemois)

// We need a LiveCuringModule for the StandardFuelModelModule
const curing1 = new LiveCuringModule(P.curing1, livemois.herb)
const standard1 = new StandardFuelModelModule(P.standard1,
    deadmois.dead1, deadmois.dead10, deadmois.dead100,
    livemois.herb, livemois.stem, curing1.applied)

const fuelpart1 = new FuelParticleNodes(P.bed1, P.standard1)
// const fuelpartderived1 = new FuelParticleDerivedNodes(P.bed1)

//------------------------------------------------------------------------------
// Step 2 - Configure and combine all the module genomes
//------------------------------------------------------------------------------

const nodes = [
    ...constants.configure(),
    ...deadmois.configure(deadmois.individual),
    ...livemois.configure(livemois.individual),
    ...curing1.configure(curing1.est),
    ...standard1.configure(standard1.catalog),
    ...fuelpart1.configure(fuelpart1.std)
].sort()

// logNodes(nodes)

//------------------------------------------------------------------------------
// Step 3 - construct the directed acyclical graph
//------------------------------------------------------------------------------

const dag = new Dag(nodes)

//------------------------------------------------------------------------------
// Step 4 - select nodes of interest
//------------------------------------------------------------------------------

const select = ['totalLoad', standard1.curedFraction, standard1.totalHerbLoad, standard1.deadHerbLoad]
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
dag.set(standard1.key, '124')

//------------------------------------------------------------------------------
// Step 8 - Get output values
//------------------------------------------------------------------------------

const totalLoad = dag.get('totalLoad')
const totalHerb = dag.get(standard1.totalHerbLoad)
const curedEst = dag.get(curing1.estimated)
const cured = dag.get(standard1.curedFraction)
const deadHerb = dag.get(standard1.deadHerbLoad)
const liveHerb = dag.get(standard1.liveHerbLoad)
Util.logDagNodes(dag.selected(), 'Selected Node Values')
// Util.logDagNodes(dag.nodes(), 'All Nodes')
