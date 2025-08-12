import { Util } from './index.js'

// We have all these Modules at our disposal
import { canopyNodes, CanopyConfig } from './index.js'
import { curingNodes, CuringConfig } from './index.js'
import { fuelModelNodes, FuelModelConfig } from './index.js'
import { midflameWindNodes, MidflameWindConfig } from './index.js'
import { moistureNodes, MoistureConfig } from './index.js'
import { slopeNodes, SlopeConfig } from './index.js'
import { standardFuelModelNodes } from './index.js'
import { surfaceBedNodes } from './index.js'
import { windNodes, WindConfig } from './index.js'
import { windSpeedAdjustmentNodes, WindSpeedAdjustmentConfig } from './index.js'

function showModule(nodes, cols=4) {
    const map = Util.nodesToMap(nodes)
    console.log(Util.listNodeMap(map, cols))
}

console.log(new Date())

// Module ids
const bed1Id = 'surface/primary/Bed Module/'
const bed2Id = 'surface/secondary/Bed Module/'
const fire1Id = 'surface/primary/Fire Module/'
const fire2Id = 'surface/secondary/Fire Module/'
const fuel1Id = 'surface/primary/Fuel Module/'
const fuel2Id = 'surface/secondary/Fuel Module/'
const midflame1Id = 'surface/primary/Midflame Wind Module/'
const midflame2Id = 'surface/secondary/Midflame Wind Module/'
const waf1Id  = 'surface/primary/Waf Module/'
const waf2Id  = 'surface/secondary/Waf Module/'

const canopyId  = 'surface/shared/Canopy Module/'
const curingId = 'surface/shared/Curing Module/'
const moistureId = 'surface/shared/Moisture Module/'
const slopeId = 'surface/shared/Slope Module/'
const windId = 'surface/shared/Wind Module/'

const roswtgId = 'surface/weighted'
const fireId = 'surface/weighted/Fire Module'

// BehavePlus shares the following modules with both primary and secondary fuels
const canopyMod = canopyNodes(canopyId, CanopyConfig)
const moistureMod = moistureNodes(moistureId, MoistureConfig)
const slopeMod = slopeNodes(slopeId, SlopeConfig)
const windMod = windNodes(windId, WindConfig)
const curingMod = curingNodes(curingId, moistureId, CuringConfig)
// const rosWtg = rosWeightingNodes('ros weight/', RosWtgConfig)
const commonNodes = [...canopyMod, ...curingMod, ...moistureMod, ...slopeMod, ...windMod]

// Surface fire and fuel bed linked to the above modules as configured
const fuelMod1 = fuelModelNodes(fuel1Id, FuelModelConfig)   // may be standard, chaparral, aspen, or rough
const wafMod1 = windSpeedAdjustmentNodes(waf1Id, bed1Id, windId, canopyId, WindSpeedAdjustmentConfig)
const midflameWindMod1 = midflameWindNodes(midflame1Id, windId, waf1Id, MidflameWindConfig)
const bedMod1 = surfaceBedNodes(fire1Id, bed1Id, fuel1Id, moistureId, midflame1Id,
    slopeId, curingId, FuelModelConfig)
const primaryNodes = [...fuelMod1, ...wafMod1, ...midflameWindMod1, ...bedMod1]

// showModule(bed)
const nodes = [...commonNodes, ...primaryNodes]
const map = Util.nodesToMap(nodes)
Util.checkNodeKeys(map)