import { P, Util } from '../index.js'
import { canopyNodes } from '../index.js'
import { curingNodes } from '../index.js'
import { fuelModelNodes } from '../index.js'
import { midflameWindNodes } from '../index.js'
import { moistureNodes } from '../index.js'
import { slopeNodes } from '../index.js'
import { standardFuelModelNodes } from '../index.js'
import { surfaceBedNodes } from '../index.js'
import { surfaceFireNodes } from '../index.js'
import { windSpeedNodes } from '../index.js'
import { windSpeedAdjustmentNodes } from '../index.js'

export function surfaceNodes() {
    // BehavePlus shares the following modules with both primary and secondary fuels
    const canopyMod = canopyNodes(P.canopy, 'ratio-height')
    const moistureMod = moistureNodes(P.moisture, 'individual')
    const slopeMod = slopeNodes(P.slope, 'ratio', 'aspect')
    const windMod = windSpeedNodes(P.wind, 'input 20-ft')
    const curingMod = curingNodes(P.curing, P.moisture, 'input')
    // const rosWtg = rosWeightingNodes(P.fireWtg, RosWtgConfig)
    const commonNodes = [...canopyMod, ...curingMod, ...moistureMod, ...slopeMod, ...windMod]

    // Surface Primary fire and fuel bed linked to the above modules as configured
    const fuelMod1 = fuelModelNodes(P.fuel1, 'standard catalog')   // may be standard, chaparral, aspen, or rough
    const windadjMod1 = windSpeedAdjustmentNodes(P.windadj1, P.bed1, P.canopy, 'input')
    const midwindMod1 = midflameWindNodes(P.windmid1, P.wind, P.windadj1, 'input')
    const bedMod1 = surfaceBedNodes(P.bed1, P.fuel1, P.moisture, P.windmid1, P.slope, P.curing, 'standard catalog')
    const fireMod1 = surfaceFireNodes(P.fire1, P.bed1)
    const primaryNodes = [...midwindMod1, ...windadjMod1, ...bedMod1, ...fuelMod1, ...fireMod1]

    // Surface Secondary fire and fuel bed linked to the above modules as configured
    const fuelMod2 = fuelModelNodes(P.fuel2, 'standard catalog')   // may be standard, chaparral, aspen, or rough
    const windadjMod2 = windSpeedAdjustmentNodes(P.windadj2, P.bed2, P.canopy, 'input')
    const midwindMod2 = midflameWindNodes(P.windmid2, P.wind, P.windadj2, 'input')
    const bedMod2 = surfaceBedNodes(P.bed2, P.fuel2, P.moisture, P.windmid2, P.slope, P.curing, 'standard catalog')
    const secondaryNodes = [...midwindMod2, ...windadjMod2, ...bedMod2, ...fuelMod2]

    const nodes = [...commonNodes, ...primaryNodes, ...secondaryNodes].sort()
    // for(let node of nodes) console.log(node)
    return nodes
}