import { Util } from './index.js'

// We have all these Modules at our disposal
import { canopyNodes, CanopyConfig } from './index.js'
import { curingNodes, CuringConfig } from './index.js'
import { midflameWindNodes, MidflameWindConfig } from './index.js'
import { moistureNodes, MoistureConfig } from './index.js'
import { slopeNodes, SlopeConfig } from './index.js'
import { standardFuelModelNodes, StandardFuelConfig } from './index.js'
import { standardFuelSurfaceNodes } from './index.js'
import { surfaceBedNodes, surfaceLifeNodes } from './index.js'
// export {surfaceElementNodes, surfaceElementNode} from './index.js'   // used by surfaceBedNode
// export {surfaceLifeNodes} from './index.js'  // used only be surfaceBedNodes
import { windNodes, WindConfig } from './index.js'
import { windSpeedAdjustmentNodes, WindSpeedAdjustmentConfig } from './index.js'

function showModule(nodes, cols=4) {
    const map = Util.nodesToMap(nodes)
    console.log(Util.listNodeMap(map, cols))
}

console.log(new Date())

// Module ids
const bed1Id = 'surface/fuel 1/bed/'
const bed2Id = 'surface/fuel 2/bed/'
const fire1Id = 'surface/fuel 1/fire/'
const fire2Id = 'surface/fuel 2/fire/'
const canopyId  = 'canopy/'
const curingId = 'curing/'
const moistureId = 'moisture/'
const slopeId = 'slope/'
const wafId  = 'waf/'
const windId = 'wind/'
const midflameId = 'midflame wind/'

const standardId = 'standard/'
const chaparralId = 'chaparral/'
const aspenId = 'aspen/'
const roughId = 'rough/'

// BehavePlus shares the following modules with both primary and secondary fuels
// These do not depend on any other modules:
const canopyMod = canopyNodes(canopyId, CanopyConfig)
const moistureMod = moistureNodes(moistureId, MoistureConfig)
const slopeMod = slopeNodes(slopeId, SlopeConfig)
const windMod = windNodes(windId, WindConfig)
// These depend upon the above modules
const curingMod = curingNodes(curingId, moistureId, CuringConfig)
const midflameWindMod = midflameWindNodes(midflameId, windId, wafId, MidflameWindConfig)

// const rosWtg = rosWeightingNodes('ros weight/', RosWtgConfig)

// Various fuel provider modules
const standardMod = standardFuelModelNodes(standardId, StandardFuelConfig)
// const aspen = aspenModelNodes(aspenId)
// const chaparral = chaparralModelNodes(chaparralId)
// const rough = roughModelNodes(roughId)

// Surface fire and fuel bed linked to the above providers as configured
const bedMod1 = surfaceBedNodes(fire1Id, bed1Id, slopeId)
const deadMod1 = surfaceLifeNodes(bed1Id, 'dead', standardId, moistureId)
const liveMod1 = surfaceLifeNodes(bed1Id, 'live', standardId, moistureId)
const elementsMod1 = standardFuelSurfaceNodes(bed1Id, standardId, moistureId)
const wafMod1 = windSpeedAdjustmentNodes(wafId, bed1Id, windId, canopyId, WindSpeedAdjustmentConfig)
const surfaceMod1 = [...bedMod1, ...deadMod1, ...liveMod1, ...elementsMod1, ...wafMod1]

// showModule(bed)
const nodes = [
    // ...canopyMod,
    ...moistureMod,
    ...windMod,
    ...slopeMod,
    ...standardMod,
    ...surfaceMod1
]
    const map = Util.nodesToMap(nodes)
Util.checkNodeKeys(map)