import { Dag, Util } from '../index.js'
import { P, U, Genome } from './index.js'
import { CanopyModule } from './index.js'
import { FuelBedModule } from './FuelBedModule.js'
import { MidflameWindSpeedModule } from './MidflameWindSpeedModule.js'
import { WindSpeedModule } from './WindSpeedModule.js'
import { WindSpeedReductionModule } from './WindSpeedReductionModule.js'

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

const canopy = new CanopyModule(P.canopy)
const wind = new WindSpeedModule(P.windSpeed)
const wsrf1 = new WindSpeedReductionModule(P.bed1,
    P.canopy+'wind speed reduction factor',
    P.bed1+'fuel bed wind reduction factor')
const midflame1 = new MidflameWindSpeedModule(P.bed1,
    P.windSpeed+'at 20-ft',
    P.bed1+'wind speed reduction factor')
const bed1 = new FuelBedModule(P.bed1)

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
    [midflame1.config, midflame1.options[1]],       // 'wind speed at midflame' = 'estimated'
    [canopy.config, canopy.options[4]], // 'canopy height input' = 'height-base'
    [wind.config, wind.options[0]],     // 'wind speed input' = 'at 20-ft'
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