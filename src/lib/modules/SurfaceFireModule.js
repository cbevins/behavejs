import { Dag, L, P, ModuleBase, U } from '../index.js'
import { FuelElementEquations as Fuel } from '../index.js'
import { CompassEquations as Compass } from '../index.js'
import { FuelBedEquations as Bed } from '../index.js'
import { SurfaceFireEquations as Fire } from '../index.js'

export class SurfaceFireModule extends ModuleBase {
    /**
     * 
     * @param {string} path Prefix for this module's fully qualified node names
     * (something like `primary/surface/`) to append this module's 'fire/<node>' node keys
     * MUST  BE THE SAME 'path' THAT WAS PASSED TO SurfaceFuelModel()
     * @param {string} slopeRatio Fully qualified path to slope steepness ratio node,
     * something like 'terrain/slope/steepness/ratio'
     * @param {string} upslope Fully qualified path to the upslope direction node,
     * something like 'terrain/slope/direction/up-slope'
     * @param {string} midflame Fully qualified path to the midflame wind speed,
     * something like 'primary/surface/wind/midflame'
     * @param {string} wdirHeadUp Fully qualified path to wind heading direction from upslope node,
     * something like 'wind/direction/heading/from up-slope'.
*/
    constructor(path, slopeRatio, upslope, midflameWspd, wdirHeadUp) {
        super(path, 'SurfaceFireModule')
        const cfg = this.setConfig()

        const fire1 = path + P.firep1   // 'fire/1 no-wind no-slope/'
        const fire2 = path + P.firep2   // 'fire/2 wind-slope additional/'
        const fire3 = path + P.firep3   // 'fire/3 cross-slope wind/'
        const fire4 = path + P.firep4   // 'fire/4 effective limit
        const fire5 = path + P.firep5   // 'fire/5 eff wind limit applied/'
        const fire6 = path + P.firep6   // 'fire/6 ros limit applied/'
        const fire7 = path + P.firep7   // 'fire/7 both limits applied/'
        const fire  = path + P.fire     // 'fire/' final applied values
        const bed   = path + 'bed/'

        this.nodes = [
            // Wind and slope factors
            [fire+L.fuelSlpk,   0, U.factor, 0, [
                [this.any, Bed.slopeK, [bed+L.fuelBeta]]]],
            [fire+L.windB,      1, U.factor, 0, [
                [this.any, Bed.windB, [bed+L.fuelSavr]]]],
            [fire+L.windC,      0, U.factor, 0, [
                [this.any, Bed.windC, [bed+L.fuelSavr]]]],
            [fire+L.windE,      1, U.factor, 0, [
                [this.any, Bed.windE, [bed+L.fuelSavr]]]],
            [fire+L.windI,      0, U.factor, 0, [
                [this.any, Bed.windI, [bed+L.fuelBrat, fire+L.windE, fire+L.windC]]]],
            [fire+L.windK,      0, U.factor, 0, [
                [this.any, Bed.windK, [bed+L.fuelBrat, fire+L.windE, fire+L.windC]]]],

            // Part 1 - No-wind, no-slope fire spread rate and effective wind
            [fire1+L.firePhiW,   0, U.factor, 0, [
                [this.any, Fire.phiWind, [midflameWspd, fire+L.windB, fire+L.windK]]]],
            [fire1+L.firePhiS,   0, U.factor, 0, [
                [this.any, Fire.phiSlope, [slopeRatio, fire+L.fuelSlpk]]]],
            [fire1+L.fireRos,    0, U.fireRos, 0, [
                [this.any, Bed.noWindNoSlopeSpreadRate, [bed+L.fuelSource, bed+L.fuelSink]]]],
            [fire1+L.firePhiE,   0, U.factor, 0, [
                [this.any, Fire.effectiveWindSpeedCoefficient, [fire1+L.firePhiW, fire1+L.firePhiS]]]],
            [fire1+L.fireWeff,   0, U.windSpeed, 0, [
                [this.any, Fire.effectiveWindSpeed, [fire1+L.firePhiE, fire+L.windB, fire+L.windI]]]],

            // Part 2 - *ADDITIONAL* fire spread rate due to wind and slope ADDED to no-wind, no-slope case
            [fire2+L.rosSlope,  0, U.fireRos, 0, [
                [this.any, Fire.maximumDirectionSlopeSpreadRate, [fire1+L.fireRos, fire1+L.firePhiS]]]],
            [fire2+L.rosWind,   0, U.fireRos, 0, [
                [this.any, Fire.maximumDirectionWindSpreadRate, [fire1+L.fireRos, fire1+L.firePhiW]]]],
            [fire2+L.rosXcomp,  0, U.factor, 0, [
                [this.any, Fire.maximumDirectionXComponent, [fire2+L.rosWind, fire2+L.rosSlope, wdirHeadUp]]]],
            [fire2+L.rosYcomp,  0, U.factor, 0, [
                [this.any, Fire.maximumDirectionYComponent, [fire2+L.rosWind, wdirHeadUp]]]],
            [fire2+L.fireRos,   0, U.fireRos, 0, [
                [this.any, Fire.maximumDirectionSpreadRate, [fire2+L.rosXcomp, fire2+L.rosYcomp]]]],

            // Part 3 - (was step 2) fire spread rate and effective wind for the cross-slope wind condition
            // NO Rothermel's limit applied (effective wind speed < 0.9 Rxi)
            // NO Andrew's limit applied (spread rate < effective wind speed)
            [fire3+L.fireRos,   0, U.fireRos, 0, [
                [this.any, Fire.spreadRateWithCrossSlopeWind, [fire1+L.fireRos, fire2+L.fireRos]]]],
            [fire3+L.firePhiE,  0, U.factor, 0, [
                [this.any, Fire.effectiveWindSpeedCoefficientInferred, [fire1+L.fireRos, fire3+L.fireRos]]]],
            [fire3+L.fireWeff,  0, U.windSpeed, 0, [
                [this.any, Fire.effectiveWindSpeed, [fire3+L.firePhiE, fire+L.windB, fire+L.windI]]]],

            // Part 4 - fire spread rate and effective wind at the *effective wind speed limit*
            [fire4+L.fireWeff, 0, U.windSpeed, 0, [
                [this.any, Fire.effectiveWindSpeedLimit, [bed+L.fireRxi]]]],
            [fire4+L.firePhiE, 0, U.factor, 0, [
                [this.any, Fire.phiEwFromEws, [fire4+L.fireWeff, fire+L.windB, fire+L.windK]]]],
            [fire4+L.fireRos,  0, U.fireRos, 0, [
                [this.any, Fire.maximumSpreadRate, [fire1+L.fireRos, fire4+L.firePhiE]]]],

            // Part 5 (was 3a) - fire spread rate and effective wind after applying Rothermel's effective wind speed limit
            // YES Rothermel's limit applied (effective wind speed < 0.9 Rxi)
            // NO  Andrew's limit applied (spread rate < effective wind speed)
            [fire5+L.fireWeff, 0, U.windSpeed, 0, [
                [this.any, Math.min, [fire3+L.fireWeff, fire4+L.fireWeff]]]],
            [fire5+L.firePhiE, 0, U.factor, 0, [
                [this.any, Math.min, [fire3+L.firePhiE, fire4+L.firePhiE]]]],
            [fire5+L.fireRos,  0, U.fireRos, 0, [
                [this.any, Math.min, [fire3+L.fireRos, fire4+L.fireRos]]]],

            // Part 6 (was 3b) - fire spread rate and effective wind after applying Andrews' RoS limit
            // NO  Rothermel's limit applied (effective wind speed < 0.9 Rxi)
            // YES Andrew's limit applied (spread rate < effective wind speed)
            [fire6+L.fireRos, 0, U.fireRos, 0, [
                [this.any, Fire.spreadRateWithRosLimitApplied, [fire3+L.fireRos, fire3+L.fireWeff]]]],
            [fire6+L.firePhiE, 0, U.factor, 0, [
                [this.any, Fire.effectiveWindSpeedCoefficientInferred, [fire1+L.fireRos, fire6+L.fireRos]]]],
            [fire6+L.fireWeff, 0, U.windSpeed, 0, [
                [this.any, Fire.effectiveWindSpeed, [fire6+L.firePhiE, fire+L.windB, fire+L.windI]]]],

            // Part 7 (was 4)
            // YES  Rothermel's limit applied (effective wind speed < 0.9 Rxi)
            // YES Andrew's limit applied (spread rate < effective wind speed)
            [fire7+L.fireRos, 0, U.fireRos, 0, [
                [this.any, Fire.spreadRateWithRosLimitApplied, [fire5+L.fireRos, fire5+L.fireWeff]]]],
            [fire7+L.firePhiE, 0, U.factor, 0, [
                [this.any, Fire.effectiveWindSpeedCoefficientInferred, [fire1+L.fireRos, fire7+L.fireRos]]]],
            [fire7+L.fireWeff, 0, U.windSpeed, 0, [
                [this.any, Fire.effectiveWindSpeed, [fire7+L.firePhiE, fire+L.windB, fire+L.windI]]]],

            // Part 8 apply either Part 6 or Part 7 if EWS limit is applied
            [fire+L.fireHeadRos, 0, U.fireRos, 0, [
                [cfg.applied, Dag.assign, [fire7+L.fireRos]],
                [cfg.notApplied, Dag.assign, [fire6+L.fireRos]]]],
            [fire+L.firePhiE, 0, U.factor, 0, [
                [cfg.applied, Dag.assign, [fire7+L.firePhiE]],
                [cfg.notApplied, Dag.assign, [fire6+L.firePhiE]]]],
            [fire+L.fireWeff, 0, U.windSpeed, 0, [
                [cfg.applied, Dag.assign, [fire7+L.fireWeff]],
                [cfg.notApplied, Dag.assign, [fire6+L.fireWeff]]]],

            // Direction of maximum spread
            [fire+L.fireHeadDirUp, 0, U.compass, 0, [
                [this.any, Fire.spreadDirectionFromUpslope, [fire2+L.rosXcomp, fire2+L.rosYcomp, fire2+L.fireRos]]]], 
            [fire+L.fireHeadDirNo, 0, U.compass, 0, [
                [this.any, Compass.compassSum, [upslope, fire+L.fireHeadDirUp]]]],

            [fire+L.fireTaur,      0, U.fireTaur, 0, [
                [this.any, Bed.fireResidenceTime, [bed+L.fuelSavr]]]],
            [fire+L.fireHpua,      0, U.fireHpua, 0, [
                [this.any, Bed.heatPerUnitArea, [bed+L.fireRxi, fire+L.fireTaur]]]],
            [fire+L.fireLwr,       1, U.ratio, 0, [
                [this.any, Fire.lengthToWidthRatio, [fire+L.fireWeff]]]],
            [fire+L.fireHeadFli,   0, U.fireFli, 0, [
                [this.any, Fire.firelineIntensity, [fire+L.fireHeadRos, bed+L.fireRxi, fire+L.fireTaur]]]],
            [fire+L.fireHeadFlame, 0, U.fireFlame, 0, [
                [this.any, Fire.flameLength, [fire+L.fireHeadFli]]]],
        ]
    }
    setConfig() {
        const applied = 'applied'
        const notApplied = 'not applied'
        this.config =  {
            applied, notApplied,       // particle key for outside reference
            options: [applied, notApplied],
            prompt: 'effective wind speed limit is',
            prompts: [
                [applied, applied],
                [notApplied, notApplied],
            ],
        }
        return this.config
    }
}