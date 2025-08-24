import { Dag, Util } from '../index.js'
import { P, U, Genome } from './index.js'
import { CanopyModule } from './index.js'
import { FuelBedModule } from './index.js'
import { MidflameWindSpeedModule } from './index.js'
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
const canopy = new CanopyModule(P.canopy)
const wind = new WindSpeedModule(P.windSpeed)
const bed1 = new FuelBedModule(P.bed1)

// WindSpeedReductionModule extends the FuelBedModule named in arg 1 by
// linking the surface fuel-induced wrf and the canopy-indiced wrf
// to derive the midflame wrf for the fuel bed
const wsrf1 = new WindSpeedReductionModule(P.bed1, canopy.wsrf, bed1.wsrf)

// MidflameWindSpeedModule extends the FuelBedModule named in arg 1 by
// linking the wind at 20-ft and midflame reduction factor
// to estimate the wind speed at midflame height for the fuel bed
const midflame1 = new MidflameWindSpeedModule(P.bed1, wind.at20ft, wsrf1.mwsrf)

// Combine all the module genomes
const genome = new Genome([
    // site
    ...canopy.genome(),
    ...wind.genome(),
    // surface/primary
    ...bed1.genome(),
    ...midflame1.genome(),
    ...wsrf1.genome()
].sort())
// genome.logGenome()

//------------------------------------------------------------------------------
// Step 2 - configure the genome as desired
//------------------------------------------------------------------------------

const configs = [
    [midflame1.config, 'estimated'],       // 'wind speed at midflame' = 'estimated'
    [canopy.config, canopy.heightBase],     // 'canopy height input' = 'height-base'
    [wind.config, wind.input20ft],          // 'wind speed input' = 'at 20-ft'
    [wsrf1.config, wsrf1.options[1]],     // 'wind speed reduction factor' = 'input' or 'estimated'
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

const at10m = P.windSpeed+'at 10-m'
const at20ft = P.windSpeed+'at 20-ft'
const atMidflame = P.bed1+'wind speed at midflame'
const factor = P.bed1+'wind speed reduction factor'
const bedWsrf = P.bed1+'fuel bed wind reduction factor'
const bedDepth = P.bed1+'depth'
const canopyWsrf = P.canopy+'wind speed reduction factor'
const baseHt = P.canopy+'base height'
const totalHt = P.canopy+'total height'
const canopyCover = P.canopy+'coverage'
const canopyShelters = P.canopy+'shelters fuel from wind'

const select = [atMidflame] //, bedWsrf, canopyWsrf, canopyShelters]
dag.select(select)
Util.logDagNodes(dag.selected(), 'Selected Nodes')

//------------------------------------------------------------------------------
// Step 5 - determine active configurations (informational)
//------------------------------------------------------------------------------

listActiveConfigs(dag)

//------------------------------------------------------------------------------
// Step 6 - determine active inputs (informational)
//------------------------------------------------------------------------------

const inputs = dag.activeInputs()
Util.logDagNodes(dag.activeInputs(), 'Active Input Nodes')

// Util.logDagNodes(dag.nodes, 'All')