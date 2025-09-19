import { Dag } from '../index.js'
import { ModuleBase } from './ModuleBase.js'
import { Paths as P} from './Paths.js'
import { Units as U} from './Units.js'
import { FuelElementEquations as Fuel } from '../index.js'
import { Calc, CompassEquations as Compass } from '../index.js'
import { FuelBedEquations as Bed } from '../index.js'
import { SurfaceFireEquations as Fire } from '../index.js'

export class SurfaceFireModule extends ModuleBase {
    /**
     * 
     * @param {string} prefix Prefix for this module's fully qualified node names
     * (something like `primary/surface/`) to append this module's 'fire/<node>' node keys
     * MUST  BE THE SAME 'path' THAT WAS PASSED TO SurfaceFuelModel()
     * @param {Config} cfg Config reference
     * @param {string} bedPath Fully qualified path to surface fuel bed for this fire,
     * something like `primary/bed/`
     * @param {string} slopeRatio Fully qualified path to slope steepness ratio node,
     * something like 'terrain/slope/steepness/ratio'
     * @param {string} upslope Fully qualified path to the upslope direction node,
     * something like 'terrain/slope/direction/up-slope'
     * @param {string} midflame Fully qualified path to the midflame wind speed,
     * something like 'primary/wind/speed/midflame'
     * @param {string} wdirHeadUp Fully qualified path to wind heading direction from upslope node,
     * something like 'wind/direction/heading/from up-slope'.
*/
    constructor(prefix, cfg, bedPath, slopeRatio, upslope, midflameWspd, wdirHeadUp) {
        super(prefix, P.fireSelf, P.fireMod, cfg)
        const path = this.path
        const fire  = path              // 'fire/' final applied values
        const fire1 = path + P.firep1   // 'fire/1 no-wind no-slope/'
        const fire2 = path + P.firep2   // 'fire/2 wind-slope additional/'
        const fire3 = path + P.firep3   // 'fire/3 cross-slope wind/'
        const fire4 = path + P.firep4   // 'fire/4 effective limit
        const fire5 = path + P.firep5   // 'fire/5 eff wind limit applied/'
        const fire6 = path + P.firep6   // 'fire/6 ros limit applied/'
        const fire7 = path + P.firep7   // 'fire/7 both limits applied/'
        const bed   = bedPath
        this.nodes = [
            // Wind and slope factors
            [fire+P.fireSlpk,   0, U.factor, null, [
                ['', Bed.slopeK, [bed+P.fuelBeta]]]],
            [fire+P.fireWindB,  1, U.factor, null, [
                ['', Bed.windB, [bed+P.fuelSavr]]]],
            [fire+P.fireWindC,  0, U.factor, null, [
                ['', Bed.windC, [bed+P.fuelSavr]]]],
            [fire+P.fireWindE,  1, U.factor, null, [
                ['', Bed.windE, [bed+P.fuelSavr]]]],
            [fire+P.fireWindI,  0, U.factor, null, [
                ['', Bed.windI, [bed+P.fuelBrat, fire+P.fireWindE, fire+P.fireWindC]]]],
            [fire+P.fireWindK,  0, U.factor, null, [
                ['', Bed.windK, [bed+P.fuelBrat, fire+P.fireWindE, fire+P.fireWindC]]]],

            // Part 1 - No-wind, no-slope fire spread rate and effective wind
            [fire1+P.firePhiW,   0, U.factor, null, [
                ['', Fire.phiWind, [midflameWspd, fire+P.fireWindB, fire+P.fireWindK]]]],
            [fire1+P.firePhiS,   0, U.factor, null, [
                ['', Fire.phiSlope, [slopeRatio, fire+P.fireSlpk]]]],
            [fire1+P.fireRos,    0, U.fireRos, null, [
                ['', Bed.noWindNoSlopeSpreadRate, [bed+P.fuelSource, bed+P.fuelSink]]]],
            [fire1+P.firePhiE,   0, U.factor, null, [
                ['', Fire.effectiveWindSpeedCoefficient, [fire1+P.firePhiW, fire1+P.firePhiS]]]],
            [fire1+P.fireWeff,   0, U.windSpeed, null, [
                ['', Fire.effectiveWindSpeed, [fire1+P.firePhiE, fire+P.fireWindB, fire+P.fireWindI]]]],

            // Part 2 - *ADDITIONAL* fire spread rate due to wind and slope ADDED to no-wind, no-slope case
            [fire2+P.fireRosSlope,  0, U.fireRos, null, [
                ['', Fire.maximumDirectionSlopeSpreadRate, [fire1+P.fireRos, fire1+P.firePhiS]]]],
            [fire2+P.fireRosWind,   0, U.fireRos, null, [
                ['', Fire.maximumDirectionWindSpreadRate, [fire1+P.fireRos, fire1+P.firePhiW]]]],
            [fire2+P.fireRosXcomp,  0, U.factor, null, [
                ['', Fire.maximumDirectionXComponent, [fire2+P.fireRosWind, fire2+P.fireRosSlope, wdirHeadUp]]]],
            [fire2+P.fireRosYcomp,  0, U.factor, null, [
                ['', Fire.maximumDirectionYComponent, [fire2+P.fireRosWind, wdirHeadUp]]]],
            [fire2+P.fireRos,   0, U.fireRos, null, [
                ['', Fire.maximumDirectionSpreadRate, [fire2+P.fireRosXcomp, fire2+P.fireRosYcomp]]]],

            // Part 3 - (was step 2) fire spread rate and effective wind for the cross-slope wind condition
            // NO Rothermel's limit applied (effective wind speed < 0.9 Rxi)
            // NO Andrew's limit applied (spread rate < effective wind speed)
            [fire3+P.fireRos,   0, U.fireRos, null, [
                ['', Fire.spreadRateWithCrossSlopeWind, [fire1+P.fireRos, fire2+P.fireRos]]]],
            [fire3+P.firePhiE,  0, U.factor, null, [
                ['', Fire.effectiveWindSpeedCoefficientInferred, [fire1+P.fireRos, fire3+P.fireRos]]]],
            [fire3+P.fireWeff,  0, U.windSpeed, null, [
                ['', Fire.effectiveWindSpeed, [fire3+P.firePhiE, fire+P.fireWindB, fire+P.fireWindI]]]],

            // Part 4 - fire spread rate and effective wind at the *effective wind speed limit*
            [fire4+P.fireWeff, 0, U.windSpeed, null, [
                ['', Fire.effectiveWindSpeedLimit, [bed+P.fireRxi]]]],
            [fire4+P.firePhiE, 0, U.factor, null, [
                ['', Fire.phiEwFromEws, [fire4+P.fireWeff, fire+P.fireWindB, fire+P.fireWindK]]]],
            [fire4+P.fireRos,  0, U.fireRos, null, [
                ['', Fire.maximumSpreadRate, [fire1+P.fireRos, fire4+P.firePhiE]]]],

            // Part 5 (was 3a) - fire spread rate and effective wind after applying Rothermel's effective wind speed limit
            // YES Rothermel's limit applied (effective wind speed < 0.9 Rxi)
            // NO  Andrew's limit applied (spread rate < effective wind speed)
            [fire5+P.fireWeff, 0, U.windSpeed, null, [
                ['', Math.min, [fire3+P.fireWeff, fire4+P.fireWeff]]]],
            [fire5+P.firePhiE, 0, U.factor, null, [
                ['', Math.min, [fire3+P.firePhiE, fire4+P.firePhiE]]]],
            [fire5+P.fireRos,  0, U.fireRos, null, [
                ['', Math.min, [fire3+P.fireRos, fire4+P.fireRos]]]],

            // Part 6 (was 3b) - fire spread rate and effective wind after applying Andrews' RoS limit
            // NO  Rothermel's limit applied (effective wind speed < 0.9 Rxi)
            // YES Andrew's limit applied (spread rate < effective wind speed)
            [fire6+P.fireRos, 0, U.fireRos, null, [
                ['', Fire.spreadRateWithRosLimitApplied, [fire3+P.fireRos, fire3+P.fireWeff]]]],
            [fire6+P.firePhiE, 0, U.factor, null, [
                ['', Fire.effectiveWindSpeedCoefficientInferred, [fire1+P.fireRos, fire6+P.fireRos]]]],
            [fire6+P.fireWeff, 0, U.windSpeed, null, [
                ['', Fire.effectiveWindSpeed, [fire6+P.firePhiE, fire+P.fireWindB, fire+P.fireWindI]]]],

            // Part 7 (was 4)
            // YES  Rothermel's limit applied (effective wind speed < 0.9 Rxi)
            // YES Andrew's limit applied (spread rate < effective wind speed)
            [fire7+P.fireRos, 0, U.fireRos, null, [
                ['', Fire.spreadRateWithRosLimitApplied, [fire5+P.fireRos, fire5+P.fireWeff]]]],
            [fire7+P.firePhiE, 0, U.factor, null, [
                ['', Fire.effectiveWindSpeedCoefficientInferred, [fire1+P.fireRos, fire7+P.fireRos]]]],
            [fire7+P.fireWeff, 0, U.windSpeed, null, [
                ['', Fire.effectiveWindSpeed, [fire7+P.firePhiE, fire+P.fireWindB, fire+P.fireWindI]]]],

            // Part 8 apply either Part 6 or Part 7 if EWS limit is applied
            [fire+P.fireHeadRos, 0, U.fireRos, cfg, [
                [cfg.applied, Dag.assign, [fire7+P.fireRos]],
                [cfg.notApplied, Dag.assign, [fire6+P.fireRos]]]],
            [fire+P.firePhiE, 0, U.factor, cfg, [
                [cfg.applied, Dag.assign, [fire7+P.firePhiE]],
                [cfg.notApplied, Dag.assign, [fire6+P.firePhiE]]]],
            [fire+P.fireWeff, 0, U.windSpeed, cfg, [
                [cfg.applied, Dag.assign, [fire7+P.fireWeff]],
                [cfg.notApplied, Dag.assign, [fire6+P.fireWeff]]]],

            [fire+P.fireWeffLim, 0, U.windSpeed, null, [
                ['', Dag.assign, [fire4+P.fireWeff]]]],
            [fire+P.fireWeffX, false, U.bool, null, [
                ['', Calc.greaterThan, [fire3+P.fireWeff, fire4+P.fireWeff]]]],

            // Direction of maximum spread
            [fire+P.fireHeadDirUp, 0, U.compass, null, [
                ['', Fire.spreadDirectionFromUpslope, [fire2+P.fireRosXcomp, fire2+P.fireRosYcomp, fire2+P.fireRos]]]], 
            [fire+P.fireHeadDirNo, 0, U.compass, null, [
                ['', Compass.compassSum, [upslope, fire+P.fireHeadDirUp]]]],

            [fire+P.fireTaur,      0, U.fireTaur, null, [
                ['', Bed.fireResidenceTime, [bed+P.fuelSavr]]]],
            [fire+P.fireHpua,      0, U.fireHpua, null, [
                ['', Bed.heatPerUnitArea, [bed+P.fireRxi, fire+P.fireTaur]]]],
            [fire+P.fireLwr,       1, U.ratio, null, [
                ['', Fire.lengthToWidthRatio, [fire+P.fireWeff]]]],
            [fire+P.fireHeadFli,   0, U.fireFli, null, [
                ['', Fire.firelineIntensity, [fire+P.fireHeadRos, bed+P.fireRxi, fire+P.fireTaur]]]],
            [fire+P.fireHeadFlame, 0, U.fireFlame, null, [
                ['', Fire.flameLength, [fire+P.fireHeadFli]]]],
            [fire+P.fireMidf, 0, U.windSpeed, null, [
                ['', Dag.assign, [midflameWspd]]]],
            [fire+P.fireRxi, 0, U.fireRxi, null, [
                ['', Dag.assign, [bed+P.fireRxi]]]]
        ]
    }
}