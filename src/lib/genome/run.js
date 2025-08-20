import { Dag, C, P, U, Util } from './index.js'
import { configureNodeDefs } from './index.js'
import { canopyGenome } from './index.js'
import { fuelBedGenome } from './index.js'
import { windReductionFactorGenome } from './index.js'
import { windSpeedGenome } from './index.js'

function showModule(nodes, cols=4) {
    const map = Util.nodesToMap(nodes)
    console.log(Util.listNodeMap(map, cols))
}

console.log(new Date())
const canopyNodes = configureNodeDefs(canopyGenome(), 'height-base')
const fuelBedNodes = configureNodeDefs(fuelBedGenome())
const windNodes = configureNodeDefs(windSpeedGenome(), 'at 20-ft')
const wsrfNodes = configureNodeDefs(windReductionFactorGenome(), 'estimated')
const nodeDefs = [...canopyNodes, ...fuelBedNodes, ...windNodes, ...wsrfNodes]
const nodeDefsMap = Util.nodesToMap(nodeDefs)
showModule(nodeDefs,4)

const at10m = P.windSpeed+'at 10-m'
const at20ft = P.windSpeed+'at 20-ft'
const atMidflame = P.windSpeed+'at midflame height'
const factor = P.windReduct+'factor'
const canopyWsrf = P.canopy+'wind reduction factor'
const bedWsrf = P.bed1+'unsheltered wind reduction factor'
const bedDepth = P.bed1+'depth'
const baseHt = P.canopy+'base height'
const totalHt = P.canopy+'total height'
const canopyCover = P.canopy+'coverage'
const canopyShelters = P.canopy+'shelters fuel from wind'

const dag = new Dag(nodeDefsMap)
const select = [atMidflame, bedWsrf, canopyWsrf, canopyShelters]
dag.select(select)

const inputs = dag.activeInputs()

dag.set(at20ft, 10*88)
dag.set(bedDepth, 1)
dag.set(canopyCover, 0.9)
dag.set(totalHt, 60)
dag.set(baseHt, 10)
console.log(`Selected outputs require ${inputs.length} inputs:`)
for(let node of dag.activeInputs()) console.log('  ', node.key, node.value)
console.log(`Selected outputs values:`)
for(let node of select) console.log('  ', node, dag.get(node))