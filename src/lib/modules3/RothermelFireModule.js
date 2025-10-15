import { Dag } from './Dag.js'
import { Units as U } from './Units.js'
import { DagModule, DagNode } from './DagItems.js'
import { FuelElementEquations as Fuel } from '../index.js'
import { Calc, CompassEquations as Compass } from '../index.js'
import { FuelBedEquations as Bed } from '../index.js'
import { SurfaceFireEquations as Fire } from '../index.js'

export class RothermelFireModule extends DagModule {
    /**
     * 
     * @param {RothermelFireModule} parentMod 
     * @param {string} parentProp 'fire'
     * @param {RothermelFuelModule} fuelMod 
     * @param {RothermelWindModule} midfMod 
     * @param {WindModule} windMod 
     * @param {SlopeModule} slopeMod 
     * @param {DagConfig} configWindLimit 
     */
    constructor(parentMod, parentProp, fuelMod, midfMod, windMod, slopeMod, configWindLimit) {
        super(parentMod, parentProp)
        this._meta.config = {configWindLimit}
        this._meta.mod = {fuelMod, midfMod, slopeMod, windMod}

        this.slopeK = new DagNode(this, 'slopeK', U.factor)
        this.windB = new DagNode(this, 'windB', U.factor)
        this.windC = new DagNode(this, 'windC', U.factor)
        this.windE = new DagNode(this, 'windE', U.factor)
        this.windI = new DagNode(this, 'windI', U.factor)
        this.windK = new DagNode(this, 'windK', U.factor)
        this.phiW = new DagNode(this, 'phiW', U.factor)
        this.phiS = new DagNode(this, 'phiS', U.factor)

        const p1 = this.part1 = new DagModule(this, 'part1')
        const p2 = this.part2 = new DagModule(this, 'part2')
        const p3 = this.part3 = new DagModule(this, 'part3')
        const p4 = this.part4 = new DagModule(this, 'part4')
        const p5 = this.part5 = new DagModule(this, 'part5')
        const p6 = this.part6 = new DagModule(this, 'part6')
        const p7 = this.part7 = new DagModule(this, 'part7')
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
        this.ros = new DagNode(this, 'ros', U.fireRos)
        this.phiE = new DagNode(this, 'phiE', U.factor)
        this.weff = new DagNode(this, 'weff', U.windSpeed)
        this.weffLim = new DagNode(this, 'weffLim', U.windSpeed)
        this.weffX = new DagNode(this, 'weffX', U.bool)
        // Direction of maximum spread
        this.dir = new DagModule(this, 'direction')
        this.dir.upslope = new DagNode(this.dir, 'upslope', U.compass)
        this.dir.north = new DagNode(this.dir, 'north', U.compass)
        this.taur = new DagNode(this, 'taur', U.fireTaur)
        this.hpua = new DagNode(this, 'hpua', U.fireHpua)
        this.lwr = new DagNode(this, 'lwr', U.ratio)
        this.fli = new DagNode(this, 'fli', U.fireFli)
        this.flame = new DagNode(this, 'flame', U.fireFlame)
        this.rxi = new DagNode(this, 'rxi', U.fireRxi)
        // // Scott & Reinhardt's rSa, surface ros when 20-ft wind is at critical speed for crown fire spread
        // p1.rsa = new DagNode(p1, 'rsa',U.fireRos)
    }

    config() {
        const config = this._meta.config.configWindLimit
        const {windMod, slopeMod, midfMod, fuelMod: fuel} = this._meta.mod
        const {part1:p1, part2:p2, part3:p3, part4:p4, part5:p5, part6:p6, part7:p7} = this

        // Wind and slope factors
        this.slopeK.use(Bed.slopeK, [fuel.beta])
        this.windB.use(Bed.windB, [fuel.savr])
        this.windC.use(Bed.windC, [fuel.savr])
        this.windE.use(Bed.windE, [fuel.savr])
        this.windI.use(Bed.windI, [fuel.brat, this.windE, this.windC])
        this.windK.use(Bed.windK, [fuel.brat, this.windE, this.windC])

        this.phiW.use(Fire.phiWind, [midfMod.midflame, this.windB, this.windK])
        this.phiS.use(Fire.phiSlope, [slopeMod.steep.ratio, this.slopeK])

        // Part 1 - No-wind, no-slope fire spread rate and effective wind
        p1.ros.use(Bed.noWindNoSlopeSpreadRate, [fuel.source, fuel.sink])
        p1.phiE.use(Fire.effectiveWindSpeedCoefficient, [this.phiW, this.phiS])
        p1.weff.use(Fire.effectiveWindSpeed, [p1.phiE, this.windB, this.windI])

        // Part 2 - *ADDITIONAL* fire spread rate due to wind and slope ADDED to no-wind, no-slope case
        p2.rosSlope.use(Fire.maximumDirectionSlopeSpreadRate, [p1.ros, this.phiS])
        p2.rosWind.use(Fire.maximumDirectionWindSpreadRate, [p1.ros, this.phiW])
        p2.rosXcomp.use(Fire.maximumDirectionXComponent, [p2.rosWind, p2.rosSlope, windMod.dir.heading.wrtUp])
        p2.rosYcomp.use(Fire.maximumDirectionYComponent, [p2.rosWind, windMod.dir.heading.wrtUp])
        p2.ros.use(Fire.maximumDirectionSpreadRate, [p2.rosXcomp, p2.rosYcomp])

        // Part 3 - (was step 2) fire spread rate and effective wind for the cross-slope wind condition
        // NO Rothermel's limit applied (effective wind speed < 0.9 Rxi)
        // NO Andrew's limit applied (spread rate < effective wind speed)
        p3.ros.use(Fire.spreadRateWithCrossSlopeWind, [p1.ros, p2.ros])
        p3.phiE.use(Fire.effectiveWindSpeedCoefficientInferred, [p1.ros, p3.ros])
        p3.weff.use(Fire.effectiveWindSpeed, [p3.phiE, this.windB, this.windI])

        // Part 4 - fire spread rate and effective wind at the *effective wind speed limit*
        p4.weff.use(Fire.effectiveWindSpeedLimit, [fuel.rxi])
        p4.phiE.use(Fire.phiEwFromEws, [p4.weff, this.windB, this.windK])
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
        p6.weff.use(Fire.effectiveWindSpeed, [p6.phiE, this.windB, this.windI])

        // Part 7 (was 4)
        // YES  Rothermel's limit applied (effective wind speed < 0.9 Rxi)
        // YES Andrew's limit applied (spread rate < effective wind speed)
        p7.ros.use(Fire.spreadRateWithRosLimitApplied, [p5.ros, p5.weff])
        p7.phiE.use(Fire.effectiveWindSpeedCoefficientInferred, [p1.ros, p7.ros])
        p7.weff.use(Fire.effectiveWindSpeed, [p7.phiE, this.windB, this.windI])

        // Part 8 apply either Part 6 or Part 7 if EWS limit is applied
        if (config.value === config.applied) {
            this.ros.bind(p7.ros, config)
            this.phiE.bind(p7.phiE, config)
            this.weff.bind(p7.weff, config)
        } else {
            this.ros.bind(p6.ros, config)
            this.phiE.bind(p6.phiE, config)
            this.weff.bind(p6.weff, config)
        }
        // Direction of maximum spread
        this.dir.upslope.use(Fire.spreadDirectionFromUpslope, [p2.rosXcomp, p2.rosYcomp, p2.ros])
        this.dir.north.use(Compass.compassSum, [slopeMod.dir.upslope, this.dir.upslope])
        this.hpua.use(Bed.heatPerUnitArea, [fuel.rxi, this.taur])
        this.lwr.use(Fire.lengthToWidthRatio, [this.weff])
        this.fli.use(Fire.firelineIntensity, [this.ros, fuel.rxi, this.taur])
        this.flame.use(Fire.flameLength, [this.fli])
        this.rxi.use(Dag.bind, [fuel.rxi])
        this.taur.use(Bed.fireResidenceTime, [fuel.savr])

        this.weffLim.use(Dag.bind, [p4.weff])
        this.weffX.use(Calc.greaterThan, [p3.weff, p4.weff])

        // // Scott & Reinhardt's rSa, surface ros when 20-ft wind is at critical speed for crown fire spread
        // p1.rsa.use(CrownFire.rSa, [oActive, p1.ros, midflameWspdNo, this.windB, this.windK, this.phiS])
    }
}
