import { Util } from '../index.js'
import { canopyNodes, CanopyConfig } from '../index.js'
import { curingNodes, CuringConfig } from '../index.js'
import { fuelModelNodes, FuelModelConfig } from '../index.js'
import { midflameWindNodes, MidflameWindConfig } from '../index.js'
import { moistureNodes, MoistureConfig } from '../index.js'
import { slopeNodes, SlopeConfig } from '../index.js'
import { standardFuelModelNodes } from '../index.js'
import { surfaceBedNodes } from '../index.js'
import { windNodes, WindConfig } from '../index.js'
import { windSpeedAdjustmentNodes, WindSpeedAdjustmentConfig } from '../index.js'

// Module ids
const surf = 'surface/'
const f1 = surf+'primary/'
const f2 = surf+'secondary'
const bed1Id = f1+'Bed/'
const bed2Id = f2+'Bed/'
const fire1Id = f1+'Fire/'
const fire2Id = f2+'Fire/'
const fuel1Id = f1+'Fuel/'
const fuel2Id = f2+'Fuel/'
const midflame1Id = f1+'Midflame Wind/'
const midflame2Id = f2+'Midflame Wind/'
const waf1Id  = f1+'Wind Adj/'
const waf2Id  = f2+'Wind Adj/'

const shared = surf+'shared/'
const canopyId  = shared+'Canopy/'
const curingId = shared+'Curing/'
const moistureId = shared+'Moisture/'
const slopeId = shared+'Slope/'
const windId = shared+'Wind/'

const roswtgId = 'surface/weighted'
const fireId = 'surface/weighted/Fire'

export function surfaceNodes() {
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

    // Surface fire and fuel bed linked to the above modules as configured
    const fuelMod2 = fuelModelNodes(fuel2Id, FuelModelConfig)   // may be standard, chaparral, aspen, or rough
    const wafMod2 = windSpeedAdjustmentNodes(waf2Id, bed2Id, windId, canopyId, WindSpeedAdjustmentConfig)
    const midflameWindMod2 = midflameWindNodes(midflame2Id, windId, waf2Id, MidflameWindConfig)
    const bedMod2 = surfaceBedNodes(fire2Id, bed2Id, fuel2Id, moistureId, midflame2Id,
        slopeId, curingId, FuelModelConfig)
    const secondaryNodes = [...fuelMod2, ...wafMod2, ...midflameWindMod2, ...bedMod2]

    return [...commonNodes, ...primaryNodes, ...secondaryNodes].sort()
}