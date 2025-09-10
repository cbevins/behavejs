import { C, Dag, L, P } from './index.js'
import { CanopyModule } from './index.js'
import { ConstantsModule } from './index.js'
import { DeadFuelMoistureModule } from './index.js'
import { LiveFuelCuringModule } from './index.js'
import { LiveFuelMoistureModule } from './index.js'
import { MidflameWindSpeedModule } from './index.js'
import { SlopeSteepnessModule } from './index.js'
import { StandardFuelModelModule } from './index.js'
// import { SurfaceFireModule } from './index.js'
import { SurfaceFuelModule } from './index.js'
import { WindDirectionModule } from './index.js'
import { WindSpeedModule } from './index.js'
import { WindSpeedReductionModule } from './index.js'
import { Util } from './index.js'

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
// Step 1 - construct a genome of all possible nodes
// Note: only used P.* keys in this section to avoid circular deps
//------------------------------------------------------------------------------

const constants = new ConstantsModule(P.constants)
const canopy = new CanopyModule('')

// Need wind speed and slope for surface fire model
const winddir = new WindDirectionModule(P.weather)
const windspeed = new WindSpeedModule(P.weather)
const slopeSteep = new SlopeSteepnessModule(P.terrain)

// Need fuel particle moisture contents for surface fuel models
const deadmois = new DeadFuelMoistureModule(P.weather)
const livemois = new LiveFuelMoistureModule(P.weather)

// Need a LiveFuelCuringModule for the StandardFuelModelModule
const curing1 = new LiveFuelCuringModule(
    P.standard1,                // module's parent path
    P.weather+P.moisLiveHerb)   // live herb moisture node key
const standard1 = new StandardFuelModelModule(
    P.model1,                   // path to module's parent
    P.weather+P.moisDead1,      // dead 1-h fuel moisture node key
    P.weather+P.moisDead10,
    P.weather+P.moisDead100,
    P.weather+P.moisLiveHerb,
    P.weather+P.moisLiveStem,
    P.standard1+P.curingApplied)

// Need a WindSpeedReductionModule and a MidflameWindSpeedModule for surface fire
const wsrf1 = new WindSpeedReductionModule(
    P.bed1,                 // module's parent path
    P.canopyWsrf,           // canopy wind speed reduction factor node key
    P.bed1+L.wsrfFuel)      // fuel bed wind speed reduction node key
const midflame1 = new MidflameWindSpeedModule(
    P.bed1,                 // module's parent path
    P.weather+P.wspd20ft,   // wind speed at 20-ft node key
    P.bed1+P.wsrfMidflame)  // wind speed reduction at midflame node key
const bed1 = new SurfaceFuelModule(
    P.surf1,                    // module's parent path
    P.terrain+P.slopeRatio,     // slope steepness ratio node key
    P.bed1+P.midflame,          // midflame wind speed node key
    P.weather+P.wdirHeadUp,     // wind heading degrees from upslope node key
    P.model1, P.chaparral1, P.palmetto1, P.aspen1)

//------------------------------------------------------------------------------
// Step 2 - Configure and combine all the module genomes
//------------------------------------------------------------------------------

const nodes = [
    ...constants.configure(),
    ...canopy.configure(C.heightLength),
    ...deadmois.configure(C.moisParticle),
    ...livemois.configure(C.moisParticle),
    ...slopeSteep.configure(C.slopeRatio),
    ...windspeed.configure(C.wspd20ft),
    ...winddir.configure(C.wdirHeadUp),

    ...curing1.configure(C.curingEstimated),
    ...standard1.configure(C.stdCatalog),
    ...wsrf1.configure(C.wsrfObserved),
    ...midflame1.configure(C.midflameObserved),
    ...bed1.configure(C.fuelStd)
].sort()
// logNodes(nodes)

//------------------------------------------------------------------------------
// Step 3 - construct the directed acyclical graph
//------------------------------------------------------------------------------

const dag = new Dag(nodes)

//------------------------------------------------------------------------------
// Step 4 - select nodes of interest
//------------------------------------------------------------------------------

const select = [
    P.bed1+L.rosNwns,
    P.bed1+L.fuelPhiW,
    P.bed1+L.fuelPhiS,
    P.bed1+L.fuelPhiE,
    P.bed1+L.rosUpsl,
    P.bed1+L.rosXcomp,
    P.bed1+L.rosYcomp,
    P.bed1+L.rosHead
]
dag.select(select)
// Util.logDagNodes(dag.selected(), 'Selected Nodes')

//------------------------------------------------------------------------------
// Step 5 - determine/confirm active configurations (informational)
//------------------------------------------------------------------------------

listActiveConfigs(dag)

// RECONFIGURE HERE?

//------------------------------------------------------------------------------
// Step 6 - determine/confirm active inputs (informational)
//------------------------------------------------------------------------------

const inputs = dag.activeInputs()
Util.logDagNodes(dag.activeInputs(), 'Active Input Nodes')

//------------------------------------------------------------------------------
// Step 7 - Set input values
//------------------------------------------------------------------------------

dag.set(P.model1+P.stdKey, '10')
dag.set(P.weather+P.moisDead1, 0.05)
dag.set(P.weather+P.moisDead10, 0.07)
dag.set(P.weather+P.moisDead100, 0.09)
dag.set(P.weather+P.moisLiveHerb, 0.5)
dag.set(P.weather+P.moisLiveStem, 1.5)
dag.set(P.terrain+P.slopeRatio, 0.25)
dag.set(P.bed1+P.midflame, 10*88)
dag.set(P.weather+P.wdirHeadUp, 90)
Util.logDagNodes(dag.activeInputs(), 'Active Input Values')

//------------------------------------------------------------------------------
// Step 8 - Get output values
//------------------------------------------------------------------------------

dag.updateAll()
Util.logDagNodes(dag.selected(), 'Selected Node Values')
// Util.logDagNodes(dag.nodes(), 'All Nodes')

function showNode(node) {
    console.log(`\nNode "${node.key}" has ${node.suppliers.length} suppliers:`)
    for(let n of node.suppliers) console.log('  ', n.key, '=', n.value)
    console.log(`Node "${node.key}" has ${node.consumers.length} consumers:`)
    for(let n of node.consumers) console.log('  ', n.key)
}