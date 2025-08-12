/**
 * @file Behavejs '/fuel/bed' Dag node definitions.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 */
import { Dag, K, U } from '../index.js'
import { SurfaceFireEquations as Fire } from '../index.js'

export function surfaceFireNodes(fireId, bedId) {
    const deadId = bedId + 'dead/'
    const liveId = bedId + 'live/'

    const meta = [
        [bedId+K.mmod, 'surface fire', U.text, Dag.constant, []],
        [bedId+K.mver, '1', U.text, Dag.constant, []],
    ]

    const inputNodes = [
        [fireId+K.wlim, 'yes', U.wlim, Dag.input, []]
    ]
    
    const derivedNodes = [
        [fireId+K.hsink,  0, U.hsink, Eq.heatSink, [bedId+K.qig, bedId+K.bulk]],
        [fireId+K.hsrc,   0, U.rxi, Eq.heatSource, [fireId+K.rxi, bedId+K.qig]],
        [fireId+K.rxi,    0, U.rxi, Eq.reactionIntensity, [deadId+K.rxi, liveId+K.rxi]],
        [fireId+K.rosx,   0, U.ros, Fire.maximumSpreadRate, [fireId+K.ros0, bedId+K.phie]],
        [fireId+K.rosl,   0, U.ros, Fire.spreadRateWithRosLimitApplied, [fireId+K.ros, bedId+K.weff]],
        [fireId+K.ros,    0, U.ros, Fire.spreadRateFinal, [fireId+K.wlim, fireId+K.ros, fireId+K.rosa]],
        [fireId+K.ros0,   0, U.ros, Eq.noWindNoSlopeSpreadRate, [fireId+K.hsrc, fireId+K.hsink]],
        [fireId+K.taur,   0, U.taur, Eq.fireResidenceTime, [bedId+K.savr]],
        [fireId+K.hpua,   0, U.hpua, Eq.heatPerUnitArea, [fireId+K.rxi, fireId+K.taur]],
        [fireId+K.lwr,    1, U.ratio, Fire.lengthToWidthRatio, [bedId+K.weff]],
        [fireId+K.fli,    0, U.ratio, Fire.firelineIntensity, [fireId+K.ros, fireId+K.rxi, fireId+K.taur]],
        [fireId+K.flen,   0, U.flen, Fire.flameLength, [fireId+K.fli]],
        [fireId+K.weffl,  0, U.wnds, Fire.effectiveWindSpeedLimit, [fireId+K.rxi]],
        // [fireId+K.scor,   0, U.scor, Fire.scorchHeight, [fireId+K.fli, bedId+K.wmid, bed.Id+K.airt]],
    ]
    return [ ...meta, ...inputNodes, ...derivedNodes].sort
}
