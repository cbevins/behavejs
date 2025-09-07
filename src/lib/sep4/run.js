import { Dag, P } from './index.js'
import { CanopyModule } from './index.js'
import { ConstantsModule } from './index.js'
import { DeadFuelMoistureModule } from './index.js'
import { LiveCuringModule } from './index.js'
import { LiveFuelMoistureModule } from './index.js'
import { MidflameWindSpeedModule } from './index.js'
import { SlopeModule } from './index.js'
import { StandardFuelModelModule } from './index.js'
import { SurfaceFireModule } from './index.js'
import { SurfaceFuelModule } from './index.js'
import { WindSpeedModule } from './index.js'
import { WindSpeedReductionModule } from './index.js'
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
// Step 1 - construct a genome of all possible nodes
//------------------------------------------------------------------------------

const constants = new ConstantsModule(P.constants)
const canopy = new CanopyModule(P.canopy)
const deadmois = new DeadFuelMoistureModule(P.deadmois)
const livemois = new LiveFuelMoistureModule(P.livemois)
const windspeed = new WindSpeedModule(P.windSpeed)
const slope = new SlopeModule(P.slope)

// We need a LiveCuringModule for the StandardFuelModelModule
const curing1 = new LiveCuringModule(P.curing1, livemois.herb)
const standard1 = new StandardFuelModelModule(P.standard1,
    deadmois.dead1, deadmois.dead10, deadmois.dead100,
    livemois.herb, livemois.stem, curing1.applied)

const bed1 = new SurfaceFuelModule(P.bed1,
    P.standard1, P.chaparral1, P.palmetto1, P.aspen1)
const wsrf1 = new WindSpeedReductionModule(P.wsrf1, canopy.wsrf, bed1.fuelWsrf)
const midflame1 = new MidflameWindSpeedModule(P.midflame1, windspeed.at20ft, wsrf1.mwsrf)
const fire1 = new SurfaceFireModule(P.fire1, bed1.fuelNwns, bed1.fuelRxi,
    bed1.fuelSavr, bed1.fuelBeta, slope.slopeRatio, midflame1.wsmid)

//------------------------------------------------------------------------------
// Step 2 - Configure and combine all the module genomes
//------------------------------------------------------------------------------

const nodes = [
    ...constants.configure(),
    ...canopy.configure(canopy.heightLength),
    ...deadmois.configure(deadmois.individual),
    ...livemois.configure(livemois.individual),
    ...slope.configure(slope.observedRatio),
    ...windspeed.configure(windspeed.input20ft),

    ...curing1.configure(curing1.est),
    ...standard1.configure(standard1.catalog),
    ...wsrf1.configure(wsrf1.observed),
    ...midflame1.configure(midflame1.observed),
    ...bed1.configure(bed1.std)
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

dag.updateAll()
Util.logDagNodes(dag.selected(), 'Selected Node Values')
// Util.logDagNodes(dag.nodes(), 'All Nodes')
