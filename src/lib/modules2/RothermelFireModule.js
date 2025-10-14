import { Dag } from './Dag.js'
import { Units as U } from './Units.js'
import { DagModule, DagNode } from './DagItems.js'
import { FuelElementEquations as Fuel } from '../index.js'
import { Calc, CompassEquations as Compass } from '../index.js'
import { FuelBedEquations as Bed } from '../index.js'
import { SurfaceFireEquations as Fire } from '../index.js'
/**
 * Defines all the DagNodes within the Rothermel Fire and Fuel Model (1972)
 * @param {DagModule} parentMod Reference to the parent DagModule,
 *  usually  site.surface.primary, site.surface.secondary, or site.crown.active
 * @param {string} parentProp Parent's property name for this DagItem
 * @returns Reference to the new DagModule 
 */
export function defineRothermelFireModule(parentMod, parentProp) {
    const mod = new DagModule(parentMod, parentProp)
    const fuel = parentMod.fuel
    const wind = parentMod.wind     // {midflame:, wsrf:}

    mod.slopeK = new DagNode(mod, 'slopeK', U.factor)
    mod.windB = new DagNode(mod, 'windB', U.factor)
    mod.windC = new DagNode(mod, 'windC', U.factor)
    mod.windE = new DagNode(mod, 'windE', U.factor)
    mod.windI = new DagNode(mod, 'windI', U.factor)
    mod.windK = new DagNode(mod, 'windK', U.factor)
    mod.phiW = new DagNode(mod, 'phiW', U.factor)
    mod.phiS = new DagNode(mod, 'phiS', U.factor)

    const p1 = mod.part1 = new DagModule(mod, 'part1')
    const p2 = mod.part2 = new DagModule(mod, 'part2')
    const p3 = mod.part3 = new DagModule(mod, 'part3')
    const p4 = mod.part4 = new DagModule(mod, 'part4')
    const p5 = mod.part5 = new DagModule(mod, 'part5')
    const p6 = mod.part6 = new DagModule(mod, 'part6')
    const p7 = mod.part7 = new DagModule(mod, 'part7')
    for(let p of [p1, p3, p4, p5, p6, p7]) {
        p.ros = new DagNode(p, 'ros', U.fireRos)
        p.phiE = new DagNode(p, 'phiE', U.factor)
        p.weff = new DagNode(p, 'weff', U.windSpeed)
    }

    p2.rosSlope = new DagNode(p2, 'rosSlope', U.fireRos)
    p2.rosWind = new DagNode(p2, 'rosWind', U.fireRos)
    p2.rosXcomp = new DagNode(p2, 'roxXcomp', U.factor)
    p2.rosYcomp = new DagNode(p2, 'rosYcomp', U.factor)
    p2.ros = new DagNode(p2, 'ros', U.fireRos)

    // Final fire parameters
    mod.ros = new DagNode(mod, 'ros', U.fireRos)
    mod.phiE = new DagNode(mod, 'phiE', U.factor)
    mod.weff = new DagNode(mod, 'weff', U.windSpeed)
    mod.weffLim = new DagNode(mod, 'weffLim', U.windSpeed)
    mod.weffX = new DagNode(mod, 'weffX', U.bool)
    // Direction of maximum spread
    mod.dir = new DagModule(mod, 'direction')
    mod.dir.upslope = new DagNode(mod.dir, 'upslope', U.compass)
    mod.dir.north = new DagNode(mod.dir, 'north', U.compass)
    mod.taur = new DagNode(mod, 'taur', U.fireTaur)
    mod.hpua = new DagNode(mod, 'hpua', U.fireHpua)
    mod.lwr = new DagNode(mod, 'lwr', U.ratio)
    mod.fli = new DagNode(mod, 'fli', U.fireFli)
    mod.flame = new DagNode(mod, 'flame', U.fireFlame)
    mod.rxi = new DagNode(mod, 'rxi', U.fireRxi)
    // // Scott & Reinhardt's rSa, surface ros when 20-ft wind is at critical speed for crown fire spread
    // p1.rsa = new DagNode(p1, 'rsa',U.fireRos)
    return mod
}

export function configRothermelFireModule(mod, windMod, slopeMod, configWeff) {
    const fuel = mod.parent().fuel
    const wind = mod.parent().wind
    const {part1:p1, part2:p2, part3:p3, part4:p4, part5:p5, part6:p6, part7:p7} = mod

    // Wind and slope factors
    mod.slopeK.use(Bed.slopeK, [fuel.beta])
    mod.windB.use(Bed.windB, [fuel.savr])
    mod.windC.use(Bed.windC, [fuel.savr])
    mod.windE.use(Bed.windE, [fuel.savr])
    mod.windI.use(Bed.windI, [fuel.brat, mod.windE, mod.windC])
    mod.windK.use(Bed.windK, [fuel.brat, mod.windE, mod.windC])

    mod.phiW.use(Fire.phiWind, [wind.midflame, mod.windB, mod.windK])
    mod.phiS.use(Fire.phiSlope, [slopeMod.steep.ratio, mod.slopeK])

    // Part 1 - No-wind, no-slope fire spread rate and effective wind
    p1.ros.use(Bed.noWindNoSlopeSpreadRate, [fuel.source, fuel.sink])
    p1.phiE.use(Fire.effectiveWindSpeedCoefficient, [mod.phiW, mod.phiS])
    p1.weff.use(Fire.effectiveWindSpeed, [p1.phiE, mod.windB, mod.windI])

    // Part 2 - *ADDITIONAL* fire spread rate due to wind and slope ADDED to no-wind, no-slope case
    p2.rosSlope.use(Fire.maximumDirectionSlopeSpreadRate, [p1.ros, mod.phiS])
    p2.rosWind.use(Fire.maximumDirectionWindSpreadRate, [p1.ros, mod.phiW])
    p2.rosXcomp.use(Fire.maximumDirectionXComponent, [p2.rosWind, p2.rosSlope, windMod.dir.heading.wrtUp])
    p2.rosYcomp.use(Fire.maximumDirectionYComponent, [p2.rosWind, windMod.dir.heading.wrtUp])
    p2.ros.use(Fire.maximumDirectionSpreadRate, [p2.rosXcomp, p2.rosYcomp])

    // Part 3 - (was step 2) fire spread rate and effective wind for the cross-slope wind condition
    // NO Rothermel's limit applied (effective wind speed < 0.9 Rxi)
    // NO Andrew's limit applied (spread rate < effective wind speed)
    p3.ros.use(Fire.spreadRateWithCrossSlopeWind, [p1.ros, p2.ros])
    p3.phiE.use(Fire.effectiveWindSpeedCoefficientInferred, [p1.ros, p3.ros])
    p3.weff.use(Fire.effectiveWindSpeed, [p3.phiE, mod.windB, mod.windI])

    // Part 4 - fire spread rate and effective wind at the *effective wind speed limit*
    p4.weff.use(Fire.effectiveWindSpeedLimit, [fuel.rxi])
    p4.phiE.use(Fire.phiEwFromEws, [p4.weff, mod.windB, mod.windK])
    p4.ros.use(Fire.maximumSpreadRate, [p1.ros, p4.phiE])

    // Part 5 (was 3a) - fire spread rate and effective wind after applying Rothermel's effective wind speed limit
    // YES Rothermel's limit applied (effective wind speed < 0.9 Rxi)
    // NO  Andrew's limit applied (spread rate < effective wind speed)
    p5.weff.use(Math.min, [p3.weff, p4.weff])
    p5.phiE.use(Math.min, [p3.phiE, p4.phiE])
    p5.ros.use(Math.min, [p3.ros, p4.ros])

    // Part 6 (was 3b) - fire spread rate and effective wind after applying Andrews' RoS limit
    // NO  Rothermel's limit applied (effective wind speed < 0.9 Rxi)
    // YES Andrew's limit applied (spread rate < effective wind speed)
    p6.ros.use(Fire.spreadRateWithRosLimitApplied, [p3.ros, p3.weff])
    p6.phiE.use(Fire.effectiveWindSpeedCoefficientInferred, [p1.ros, p6.ros])
    p6.weff.use(Fire.effectiveWindSpeed, [p6.phiE, mod.windB, mod.windI])

    // Part 7 (was 4)
    // YES  Rothermel's limit applied (effective wind speed < 0.9 Rxi)
    // YES Andrew's limit applied (spread rate < effective wind speed)
    p7.ros.use(Fire.spreadRateWithRosLimitApplied, [p5.ros, p5.weff])
    p7.phiE.use(Fire.effectiveWindSpeedCoefficientInferred, [p1.ros, p7.ros])
    p7.weff.use(Fire.effectiveWindSpeed, [p7.phiE, mod.windB, mod.windI])

    // Part 8 apply either Part 6 or Part 7 if EWS limit is applied
    if (configWeff.value === configWeff.applied) {
        mod.ros.bind(p7.ros, configWeff)
        mod.phiE.bind(p7.phiE, configWeff)
        mod.weff.bind(p7.weff, configWeff)
    } else {
        mod.ros.bind(p6.ros, configWeff)
        mod.phiE.bind(p6.phiE, configWeff)
        mod.weff.bind(p6.weff, configWeff)
    }
    // Direction of maximum spread
    mod.dir.upslope.use(Fire.spreadDirectionFromUpslope, [p2.rosXcomp, p2.rosYcomp, p2.ros])
    mod.dir.north.use(Compass.compassSum, [slopeMod.dir.upslope, mod.dir.upslope])
    mod.hpua.use(Bed.heatPerUnitArea, [fuel.rxi, mod.taur])
    mod.lwr.use(Fire.lengthToWidthRatio, [mod.weff])
    mod.fli.use(Fire.firelineIntensity, [mod.ros, fuel.rxi, mod.taur])
    mod.flame.use(Fire.flameLength, [mod.fli])
    mod.rxi.use(Dag.bind, [fuel.rxi])
    mod.taur.use(Bed.fireResidenceTime, [fuel.savr])

    mod.weffLim.use(Dag.bind, [p4.weff])
    mod.weffX.use(Calc.greaterThan, [p3.weff, p4.weff])

    // // Scott & Reinhardt's rSa, surface ros when 20-ft wind is at critical speed for crown fire spread
    // p1.rsa.use(CrownFire.rSa, [oActive, p1.ros, midflameWspdNo, mod.windB, mod.windK, mod.phiS])
}