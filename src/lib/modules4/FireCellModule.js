import { DagModule } from './DagItems.js'
import { CommonNodes as Common } from './CommonNodes.js'
import { FireCharModule } from './FireCharModule.js'

import { Calc, CompassEquations as Compass } from '../index.js'
import { FuelBedEquations as Bed } from '../index.js'
import { SurfaceFireEquations as Fire } from '../index.js'

/**
 * FireCellModule extends FireCharModule by calculating the spread rate,
 * direction, and intensity for the fire behavior stack
 * from a set of fuel, wind, sterrain, canopy, and moisture modules.
 */
export class FireCellModule extends FireCharModule {
    /**
     * @param {DagModule} parentMod Reference to this DagItem's parent DagModule
     * @param {string} parentProp Parent's property name for this DagItem
     *  ('fire', 'primary', 'secondary', 'crown')
     * @param {Config} configs Module containing all current configuration objects
     * @param {FuelCellModule} fuelMod Reference to a Module with the following properties:
     *  - .beta used to determine the spread rate slope coefficient
     *  - .brat used to determine windI and windK
     *  - .rxi used to determine fireline intensity, effective wind speed limit, hpua
     *  - .savr used to determine windB, windC, windE, and taur
     *  - .sink used to determine spread rate
     *  - .source used to determine spread rate
     *  - .fuelWsrf used to determine wind speed reduction factor
     * @param {WeatherModule} weatherMod Reference to a Module with the following properties:
     *  - .air.temp to determine scorch height
     *  - .wind.dir.heading.fromUpslope to determine fire direction of maximum spread
     *  - .wind.speed.at20ft to determine wind speed at midflame height
     * @param {TerrainModule} terrainMod Reference to a Module with the following properties:
     *  - .upslope to determine fire direction of maximum spread
     *  - .slope.ratio to determine spread rate slope coefficient
     * @param {CanopyModule} canopyMod Reference to a Module with the following properties:
     *  - .wsrf to determine wind speed reduction factor
     */
    constructor(parentMod, parentProp, configs, fuelMod, weatherMod, terrainMod, canopyMod) {
        super(parentMod, parentProp)
        this._meta.configs = configs
        this._meta.modules = {canopyMod, fuelMod, terrainMod, weatherMod}

        // FireCellModules adds the following nodes to FireCharModule
        // The wind factors *could* be moved back into the FuelCellModule
        // if its results are used for memento pattern
        this.slopeK = Common.slopeK(this)
        this.windB = Common.windB(this)
        this.windC = Common.windC(this)
        this.windE = Common.windE(this)
        this.windI = Common.windI(this)
        this.windK = Common.windK(this)
        this.phiW = Common.phiW(this)
        this.phiS = Common.phiS(this)

        const p1 = this.part1 = new DagModule(this, 'part1', '1 no-wind no-slope')
        const p2 = this.part2 = new DagModule(this, 'part2', '2 wind-slope additional')
        const p3 = this.part3 = new DagModule(this, 'part3', '3 cross-slope wind')
        const p4 = this.part4 = new DagModule(this, 'part4', '4 effective limit')
        const p5 = this.part5 = new DagModule(this, 'part5', '5 eff wind limit applied')
        const p6 = this.part6 = new DagModule(this, 'part6', '6 ros limit applied')
        const p7 = this.part7 = new DagModule(this, 'part7', '7 both limits applied')
        for(let p of [p1, p3, p4, p5, p6, p7]) {
            p.ros = Common.ros(p)
            p.phiE = Common.phiE(p)
            p.weff = Common.weff(p)
        }
        // Scott & Reinhardt's rSa, surface ros when 20-ft wind is at critical speed for crown fire spread
        // p1.rsa = Common.ros(p1)

        p2.rosSlope = Common.rosSlope(p2)
        p2.rosWind = Common.rosWind(p2)
        p2.rosXcomp = Common.rosXcomp(p2)
        p2.rosYcomp = Common.rosYcomp(p2)
        p2.ros = Common.ros(p2)
    }

    config() {
        const {fireEffWindLimit:cfgWeffLimit, midflameWindSpeed:cfgMidflame} = this._meta.configs
        const {canopyMod, fuelMod:fuel, terrainMod, weatherMod} = this._meta.modules
        const {air, ppt, wind} = weatherMod
        const {part1:p1, part2:p2, part3:p3, part4:p4, part5:p5, part6:p6, part7:p7} = this

        // Wind and slope factors
        this.slopeK.use(Bed.slopeK, [fuel.beta])
        this.windB.use(Bed.windB, [fuel.savr])
        this.windC.use(Bed.windC, [fuel.savr])
        this.windE.use(Bed.windE, [fuel.savr])
        this.windI.use(Bed.windI, [fuel.brat, this.windE, this.windC])
        this.windK.use(Bed.windK, [fuel.brat, this.windE, this.windC])

        this.phiW.use(Fire.phiWind, [this.midflame, this.windB, this.windK])
        this.phiS.use(Fire.phiSlope, [terrainMod.slope.ratio, this.slopeK])

        // Part 1 - No-wind, no-slope fire spread rate and effective wind
        p1.ros.use(Bed.noWindNoSlopeSpreadRate, [fuel.source, fuel.sink])
        p1.phiE.use(Fire.effectiveWindSpeedCoefficient, [this.phiW, this.phiS])
        p1.weff.use(Fire.effectiveWindSpeed, [p1.phiE, this.windB, this.windI])

        // Part 2 - *ADDITIONAL* fire spread rate due to wind and slope ADDED to no-wind, no-slope case
        p2.rosSlope.use(Fire.maximumDirectionSlopeSpreadRate, [p1.ros, this.phiS])
        p2.rosWind.use(Fire.maximumDirectionWindSpreadRate, [p1.ros, this.phiW])
        p2.rosXcomp.use(Fire.maximumDirectionXComponent, [p2.rosWind, p2.rosSlope, wind.dir.heading.fromUpslope])
        p2.rosYcomp.use(Fire.maximumDirectionYComponent, [p2.rosWind, wind.dir.heading.fromUpslope])
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

        // Part 8 - Configure the base class fireCharModule nodes
        // apply either Part 6 or Part 7 if EWS limit is applied
        const p = (cfgWeffLimit.value === cfgWeffLimit.applied) ? p7 : p6
        this.ros.bind(p.ros, cfgWeffLimit)
        this.phiE.bind(p.phiE, cfgWeffLimit)
        this.weff.bind(p.weff, cfgWeffLimit)
        this.weffLimit.bind(p4.weff, cfgWeffLimit)
        this.weffExceeded.use(Calc.greaterThan, [p3.weff, p4.weff])

        // Direction of maximum spread
        this.dir.fromUpslope.use(Fire.spreadDirectionFromUpslope, [p2.rosXcomp, p2.rosYcomp, p2.ros])
        this.dir.fromNorth.use(Compass.compassSum, [terrainMod.upslope, this.dir.fromUpslope])
        this.hpua.use(Bed.heatPerUnitArea, [fuel.rxi, this.taur])
        this.lwr.use(Fire.lengthToWidthRatio, [this.weff])
        this.fli.use(Fire.firelineIntensity, [this.ros, fuel.rxi, this.taur])
        this.flame.use(Fire.flameLength, [this.fli])
        this.rxi.bind(fuel.rxi)
        this.scorch.use(Fire.scorchHeight, [this.fli, this.midflame, air.temp])
        this.taur.use(Bed.fireResidenceTime, [fuel.savr])

        if(cfgMidflame.value === cfgMidflame.input) {
            this.midflame.input(cfgMidflame)
            this.wsrf.constant(1, cfgMidflame)
        } else {
            if(cfgMidflame.value === cfgMidflame.wsrf) {
                this.wsrf.input(cfgMidflame)
            } else if(cfgMidflame.value === cfgMidflame.fuelbed) {
                this.wsrf.bind(fuel.fuelWsrf, cfgMidflame)
            } else if(cfgMidflame.value === cfgMidflame.canopy) {
                this.wsrf.bind(canopyMod.wsrf, cfgMidflame)
            }
            this.midflame.use(Calc.multiply, [this.wsrf, wind.speed.at20ft], cfgMidflame)
        }

        // Scott & Reinhardt's rSa, surface ros when 20-ft wind is at critical speed for crown fire spread
        // p1.rsa.use(CrownFire.rSa, [oActive, p1.ros, midflameWspdNo, this.windB, this.windK, this.phiS])
    }
}
