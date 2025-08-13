import { P, Util } from '../index.js'
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

export function surfaceNodes() {
    // BehavePlus shares the following modules with both primary and secondary fuels
    const canopyMod = canopyNodes(P.canopy, CanopyConfig)
    const moistureMod = moistureNodes(P.moisture, MoistureConfig)
    const slopeMod = slopeNodes(P.slope, SlopeConfig)
    const windMod = windNodes(P.wind, WindConfig)
    const curingMod = curingNodes(P.curing, P.moisture, CuringConfig)
    // const rosWtg = rosWeightingNodes(P.fireWtg, RosWtgConfig)
    const commonNodes = [...canopyMod, ...curingMod, ...moistureMod, ...slopeMod, ...windMod]

    // Surface Primary fire and fuel bed linked to the above modules as configured
    const fuelMod1 = fuelModelNodes(P.fuel1, FuelModelConfig)   // may be standard, chaparral, aspen, or rough
    const windadjMod1 = windSpeedAdjustmentNodes(P.windadj1, P.bed1, P.wind, P.canopy, WindSpeedAdjustmentConfig)
    const midwindMod1 = midflameWindNodes(P.windmid1, P.wind, P.windadj1, MidflameWindConfig)
    const bedMod1 = surfaceBedNodes(P.bed1, P.fuel1, P.moisture, P.windmid1, P.slope, P.curing, FuelModelConfig)
    const primaryNodes = [...midwindMod1, ...windadjMod1, ...bedMod1, ...fuelMod1]

    // Surface Secondary fire and fuel bed linked to the above modules as configured
    const fuelMod2 = fuelModelNodes(P.fuel2, FuelModelConfig)   // may be standard, chaparral, aspen, or rough
    const windadjMod2 = windSpeedAdjustmentNodes(P.windadj2, P.bed2, P.wind, P.canopy, WindSpeedAdjustmentConfig)
    const midwindMod2 = midflameWindNodes(P.windmid2, P.wind, P.windadj2, MidflameWindConfig)
    const bedMod2 = surfaceBedNodes(P.bed2, P.fuel2, P.moisture, P.windmid2, P.slope, P.curing, FuelModelConfig)
    const secondaryNodes = [...midwindMod2, ...windadjMod2, ...bedMod2, ...fuelMod2]

    const nodes = [...commonNodes, ...primaryNodes, ...secondaryNodes].sort()
    for(let node of nodes) console.log(node)
    return nodes
}