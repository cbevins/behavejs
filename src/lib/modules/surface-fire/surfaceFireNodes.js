/**
 * @file Behavejs '/fuel/bed' Dag node definitions.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 */
import { Dag, L, U } from '../index.js'
import { SurfaceFireEquations as Fire } from '../index.js'
import { SurfaceBedEquations as Bed } from '../index.js'

export function surfaceFireNodes(fire, bed) {
    const deadId = bed + 'dead/'
    const liveId = bed + 'live/'

    const meta = [
        [bed+L.mmod, 'surface fire', U.text, Dag.constant, []],
        [bed+L.mver, '1', U.text, Dag.constant, []],
    ]

    const inputNodes = [
        [fire+L.wlim, 'yes', U.wlim, Dag.input, []]
    ]
    
    const derivedNodes = [
        [fire+L.hsink,  0, U.hsink, Bed.heatSink, [bed+L.qig, bed+L.bulk]],
        [fire+L.hsrc,   0, U.rxi, Bed.heatSource, [fire+L.rxi, bed+L.qig]],
        [fire+L.rxi,    0, U.rxi, Bed.reactionIntensity, [deadId+L.rxi, liveId+L.rxi]],
        [fire+L.rosmax, 0, U.ros, Fire.maximumSpreadRate, [fire+L.ros0, bed+L.phie]],
        // this needs to be reviewed...need to recalc phiw, phie for it!!
        [fire+L.roseff, 0, U.ros, Fire.spreadRateWithRosLimitApplied, [fire+L.ros0, bed+L.weff]],
        [fire+L.ros,    0, U.ros, Fire.spreadRateFinal, [fire+L.wlim, fire+L.rosmax, fire+L.roseff]],
        [fire+L.ros0,   0, U.ros, Bed.noWindNoSlopeSpreadRate, [fire+L.hsrc, fire+L.hsink]],
        [fire+L.taur,   0, U.taur, Bed.fireResidenceTime, [bed+L.savr]],
        [fire+L.hpua,   0, U.hpua, Bed.heatPerUnitArea, [fire+L.rxi, fire+L.taur]],
        [fire+L.lwr,    1, U.ratio, Fire.lengthToWidthRatio, [bed+L.weff]],
        [fire+L.fli,    0, U.ratio, Fire.firelineIntensity, [fire+L.ros, fire+L.rxi, fire+L.taur]],
        [fire+L.flen,   0, U.flamelen, Fire.flameLength, [fire+L.fli]],
        [fire+L.weffl,  0, U.wspd, Fire.effectiveWindSpeedLimit, [fire+L.rxi]],
        // [fire+L.scor,   0, U.scor, Fire.scorchHeight, [fire+L.fli, bed+L.wmid, bed.Id+L.airt]],
    ]
    return [ ...meta, ...inputNodes, ...derivedNodes].sort()
}
