/**
 * @file Behavejs '/fuel/bed' Dag node definitions.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 */
import { Dag, K, L, ModuleBase, U } from './index.js'
import { FuelBedEquations as Bed } from '../index.js'
import { SurfaceFireEquations as Fire } from '../index.js'

export class SurfaceFireModule extends ModuleBase {
    /**
     * 
     * @param {string} path Fully qualified path to fire,
     *        something like `site/surface/primary/fire/`
     * @param {string} savr Fully qualified path to fuel bed savr,
     *        something like `site/surface/primary/bed/surface area to volume ratio`
     * @param {string} betaRatio Fully qualified path to fuel bed beta/bopt ratio,
     *        something like `site/surface/primary/bed/packing ratio/ratio'
     */
    constructor(path, savr, betaRatio, slope, midflame) {
        super(path)

        const deadId = bed + 'dead/'
        const liveId = bed + 'live/'

        const inputNodes = [
            [fire+L.wlim, 'yes', U.wlim, Dag.input, []]
        ]
        //----------------------------------------------------------------------
        // Fire nodes - requires:
        // - fuel bed SAVR
        // - fuel bed beta/bopt ratio
        // - slope steepness
        // - midflame wind speed
        //----------------------------------------------------------------------
    
    this.nodes2 = [
        [fire+L.hsink,  0, U.hsink, Bed.heatSink, [bed+L.bulk, bed+L.qig]],
        [fire+L.hsrc,   0, U.rxi, Bed.heatSource, [fire+L.rxi, bed+L.xi]],
        [fire+L.rxi,    0, U.rxi, Bed.reactionIntensity, [deadId+L.rxi, liveId+L.rxi]],
        // rename following to rosupup ?
        [fire+L.rosmax, 0, U.ros, Fire.maximumSpreadRate, [fire+L.ros0, bed+L.phie]],
        // this needs to be reviewed...need to recalc phiw, phie for it!!
        [fire+L.roseff, 0, U.ros, Fire.spreadRateWithRosLimitApplied, [fire+L.ros0, bed+L.weff]],
        [fire+L.ros,    0, U.ros, Fire.spreadRateFinal, [fire+L.wlim, fire+L.rosmax, fire+L.roseff]],
        [fire+L.ros0,   0, U.ros, Bed.noWindNoSlopeSpreadRate, [fire+L.hsrc, fire+L.hsink]],
        // rename following to rosnono?
        [fire+L.taur,   0, U.taur, Bed.fireResidenceTime, [bed+L.savr]],
        [fire+L.hpua,   0, U.hpua, Bed.heatPerUnitArea, [fire+L.rxi, fire+L.taur]],
        [fire+L.lwr,    1, U.ratio, Fire.lengthToWidthRatio, [bed+L.weff]],
        [fire+L.fli,    0, U.ratio, Fire.firelineIntensity, [fire+L.ros, fire+L.rxi, fire+L.taur]],
        [fire+L.flen,   0, U.flamelen, Fire.flameLength, [fire+L.fli]],
        [fire+L.weffl,  0, U.wspd, Fire.effectiveWindSpeedLimit, [fire+L.rxi]],
        [fire+L.weff1,  0, U.wspd, Fire.effectiveWindSpeed, [bed+L.phie, bed+L.wndb, bed+L.wndi]],
        // [fire+L.scor,   0, U.scor, Fire.scorchHeight, [fire+L.fli, bed+L.wmid, bed.Id+L.airt]],
    ]
    }
}

// EXPERIMENTAL!!

// Defines fuel bed-derived nodes up through no-wind, no-slope spread rate (nut no wind or slope effect)
export function fuelBedFireNodes(bed) {
    const nswRos = 'no-slope no-wind/spread rate'
    const nodes = [
        // ... lots of nodes here
        [bed+L.rxi,    0, U.rxi, Bed.reactionIntensity, [deadId+L.rxi, liveId+L.rxi]],
        [bed+L.hsink,  0, U.hsink, Bed.heatSink, [bed+L.bulk, bed+L.qig]],
        [bed+L.hsrc,   0, U.rxi, Bed.heatSource, [bed+L.rxi, bed+L.xi]],
        [bed+nswRos,   0, U.ros, Bed.noWindNoSlopeSpreadRate, [bed+L.hsrc, bed+L.hsink]],
    ]
}
// Determines fire spread rate properties under upslope wind conditions 
export function upSlopeWindFireNodes(fire, bed) {
    const uswPhiw = 'upslope wind/wind coefficient'
    const uswPhis = 'upslope wind/slope coefficient'
    const uswPhie = 'uplsope wind/effective wind coefficient'
    const uswWeff = 'upslope-wind/effective wind speed'
    const uswRos  = 'upslope-wind/fire spread rate'
    const nodes = [
        [fire+uswPhiw, 0, U.factor, Eq.phiWind, [bed+L.wmid, bed+L.wndb, bed+L.wndk]],
        [fire+uswPhis, 0, U.factor, Eq.phiSlope, [slope+L.srat, bed+L.slpk]],
        [fire+uswPhie, 0, U.factor, Fire.phiEffectiveWind, [fire+uswPhiw, fire+uswPhis]],
        [fire+uswWeff, 0, U.wspd, Fire.effectiveWindSpeed, [fire+uswWeff, bed+L.wndb, bed+L.wndi]], // ft/min
        [fire+uswRos,  0, U.ros, Fire.maximumSpreadRate, [fire+L.ros0, bed+L.phie]],
    ]
}
export function crossSlopeWindFireNodes(fire, bed) {
    const crossSlope = [
        [fire+'rosslope', 0, U.ros, Fire.maximumDirectionSlopeSpreadRate, [fire+L.ros0, bed+L.phis]],
        [fire+'roswind', 0, U.ros, Fire.maximumDirectionWindSpreadRate, [fire+L.ros0, bed+L.phiw]],
        [fire+'rosxcomp', 0, U.factor, Fire.maximumDirectionXComponent, [fire+'rosWind', fire+'rosSlope', P.wind+L.wupslope]],
        [fire+'rosycomp', 0, U.factor, Fire.maximumDirectionYComponent, [fire+'rosWind', P.wind+L.wupslope]],
        // rename following to rosxwxs ?
        [fire+'rosmaxdir', 0, U.factor, Fire.maximumDirectionSpreadRate, [fire+'rosxcomp', fire+'rosycomp']],
    ]
}
