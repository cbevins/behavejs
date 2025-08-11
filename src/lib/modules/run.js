import { Util } from './index.js'
import { curingNodes, CuringConfig } from './index.js'
import { moistureNodes, MoistureConfig } from './index.js'
import { slopeNodes, SlopeConfig } from './index.js'
import { standardFuelModelNodes, StandardFuelConfig } from './index.js'
import { standardFuelSurfaceNodes } from './index.js'
import { surfaceBedNodes, surfaceLifeNodes } from './index.js'
import { windNodes, WindConfig } from './index.js'

function showModule(nodes, cols=4) {
    const map = Util.nodesToMap(nodes)
    console.log(Util.listNodeMap(map, cols))
}

console.log(new Date())

// Weather and terrain provider modules
const moisture = moistureNodes('moisture/', MoistureConfig)
const slope = slopeNodes('slope/', SlopeConfig)
const wind = windNodes('wind/', WindConfig)

// const midwind = midflameWindNodes('midflame wind/', MidflameConfig)
const curing = curingNodes('curing/', 'moisture/', CuringConfig)
// const rosWtg = rosWeightingNodes('ros weight/', RosWtgCOnfig)

// Various fuel provider modules
const standard = standardFuelModelNodes('standard/', StandardFuelConfig)
// const aspen = aspenModelNodes('chaparral')
// const chaparral = chaparralModelNodes('chaparral')
// const rough = roughModelNodes('chaparral')

// Surface fire and fuel bed linked to the above providers as configured
const bed = surfaceBedNodes('surface fire/', 'surface/bed/', 'slope/')
const dead = surfaceLifeNodes('surface/bed/', 'dead', 'standard/', 'moisture/')
const live = surfaceLifeNodes('surface/bed/', 'live', 'standard/', 'moisture/')
const elements = standardFuelSurfaceNodes('surface/bed/', 'standard/', 'moisture/')

// showModule(bed)
const nodes = [...wind, ...slope, ...moisture, ...standard, ...bed,
    ...dead, ...live, ...elements]
    const map = Util.nodesToMap(nodes)
Util.checkNodeKeys(map)