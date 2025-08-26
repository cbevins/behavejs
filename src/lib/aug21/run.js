import { Dag, Util } from '../index.js'
import { P, U, Genome } from './index.js'
import { CanopyModule } from './index.js'
import { FuelBedModule } from './index.js'
import { DeadFuelMoistureModule } from './index.js'
import { LiveFuelMoistureModule } from './index.js'
import { LiveCuringModule } from './index.js'
import { MidflameWindSpeedModule } from './index.js'
import { StandardFuelModule } from './index.js'
import { WindSpeedModule } from './index.js'
import { WindSpeedReductionModule } from './index.js'

function listActiveConfigs(dag) {
    let str = '\nActive Configurations:\n'
    for(let config of dag.activeConfigs()) {
        const [key, opt] = config.split('=')
        str += `  ${key}  [${opt}]\n`
    }
    console.log(str)
}

//------------------------------------------------------------------------------
// Step 1 - construct a genome of all possible nodes and configurations
//------------------------------------------------------------------------------

// The following Modules require no external node links
const deadmois = new DeadFuelMoistureModule(P.deadmois)
const livemois = new LiveFuelMoistureModule(P.livemois)
const wind = new WindSpeedModule(P.windSpeed)
const canopy = new CanopyModule(P.canopy)

const bed1 = new FuelBedModule(P.bed1)

// WindSpeedReductionModule extends the FuelBedModule (named in arg 1)
// by linking the canopy-indiced wrf (arg2 ) and the surface fuel-induced wrf (arg 3) 
// to derive the fuel bed's midflame wind reduction factor
const wsrf1 = new WindSpeedReductionModule(P.bed1, canopy.wsrf, bed1.wsrf)

// MidflameWindSpeedModule extends the FuelBedModule (named in arg 1)
// by linking the wind at 20-ft (arg 2) and midflame reduction factor (arg 3)
// to estimate the fuel bed's wind speed at midflame height
const midflame1 = new MidflameWindSpeedModule(P.bed1, wind.at20ft, wsrf1.mwsrf)

// LiveCuringModule extends the FuelBedModule (named in arg1)
// by linking live herb moisture content (arg 2)
// to estimate the fuel bed fraction of cured live fuel.
const cured1 = new LiveCuringModule(bed1, livemois.herb)

// Adds standard fuel models to the fuel bed
const model1 = new StandardFuelModule(P.model1)

// Combine all the module genomes
const genome = new Genome([
    // site
    ...canopy.genome(),
    ...deadmois.genome(),
    ...livemois.genome(),
    ...wind.genome(),
    // surface/primary
    ...bed1.genome(),
    ...cured1.genome(),
    ...midflame1.genome(),
    ...wsrf1.genome(),
    ...model1.genome()
].sort())
// genome.logGenome()

//------------------------------------------------------------------------------
// Step 2 - configure the genome as desired
//------------------------------------------------------------------------------

const configs = [
    [midflame1.config, 'estimated'],       // 'wind speed at midflame' = 'estimated'
    [canopy.config, canopy.heightBase],     // 'canopy height input' = 'height-base'
    [wind.config, wind.input20ft],          // 'wind speed input' = 'at 20-ft'
    [wsrf1.config, wsrf1.estimated],     // 'wind speed reduction factor' = 'input' or 'estimated'
    [model1.config, model1.catalog],
    [cured1.config, cured1.estimated],
    [deadmois.config, deadmois.individual],
    [livemois.config, livemois.individual],

]
const nodes = genome.applyConfig(configs)

//------------------------------------------------------------------------------
// Step 3 - construct the directed acyclical graph
//------------------------------------------------------------------------------

const nodeMap = new Map()
for (let node of nodes) nodeMap.set(node[0], node)
const dag = new Dag(nodeMap)

//------------------------------------------------------------------------------
// Step 4 - select nodes of interest
//------------------------------------------------------------------------------

const select = [midflame1.wsmid, bed1.wsrf, canopy.wsrf , canopy.shelters]
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
// Step 6 - determine/confirm active inputs (informational)
//------------------------------------------------------------------------------

// Util.logDagNodes(dag.nodes, 'All')