/**
 * @file Behavejs '/fuel/bed' Dag node definitions.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 */
import { Calc, Dag, K, U, Util } from '../index.js'
import { SurfaceBedEquations as Eq } from '../index.js'
import { SurfaceFireEquations as Fire } from '../index.js'

export function surfaceBedNodes(fireId, bedId, slopeId) {
    const f = bedId
    const deadId = bedId + 'dead/'
    const liveId = bedId + 'live/'

    const meta = [
        [bedId+K.mmod, 'surface bed', U.text, Dag.constant, []],
        [bedId+K.mver, '1', U.text, Dag.constant, []],
    ]

    // Add curing module and waf modules!
    const inputNodes = [
        [bedId+K.cured, 0, U.fraction, Dag.input, []],
        [bedId+K.wmid, 0, U.wspd, Dag.input, []],
        [fireId+K.wlim, 'yes', U.wlim, Dag.input, []]
    ]

    const bedNodes = [
        [bedId+K.bulk,   0, U.beta, Eq.bulkDensity, [bedId+K.load, bedId+K.depth]],
        [bedId+K.qig,    0, U.qig, Eq.weightedHeatOfPreIgnition, [deadId+K.sawf, deadId+K.qig, liveId+K.sawf, liveId+K.qig]],
        [bedId+K.owaf,   1, U.owaf, Eq.openWindSpeedAdjustmentFactor, [bedId+K.depth]],
        [bedId+K.load,   0, U.load, Calc.sum, [deadId+K.load, liveId+K.load]],
        [bedId+K.beta,   0, U.beta, Eq.packingRatio, [deadId+K.vol, liveId+K.vol, bedId+K.depth]],
        [bedId+K.bopt,   0, U.beta, Eq.optimumPackingRatio, [bedId+K.savr]],
        [bedId+K.brat,   0, U.ratio, Eq.optimumPackingRatio, [bedId+K.beta, bedId+K.bopt]],
        [bedId+K.xi,     0, U.ratio, Eq.propagatingFluxRatio, [bedId+K.savr, bedId+K.beta]],
        [bedId+K.rxve,   0, U.factor, Eq.reactionVelocityExponent, [bedId+K.savr]],
        [bedId+K.rxvm,   0, U.rxv, Eq.reactionVelocityMaximum, [bedId+K.savr15]],
        [bedId+K.rxvo,   0, U.rxv, Eq.reactionVelocityOptimum, [bedId+K.brat, bedId+K.rxvm, bedId+K.rxve]],
        [bedId+K.slpk,   0, U.factor, Eq.slopeK, [bedId+K.beta]],
        [bedId+K.sa,     0, U.sa, Calc.sum, [deadId+K.sa, liveId+K.sa]],
        [bedId+K.savr,   1, U.savr, Eq.weightedSavr, [deadId+K.sawf, deadId+K.savr, liveId+K.sawf, liveId+K.savr]],
        [bedId+K.savr15, 1, U.savr, Eq.savr15, [bedId+K.savr]],
        [bedId+K.wndb,   1, U.factor, Eq.windB, [bedId+K.savr]],
        [bedId+K.wndc,   0, U.factor, Eq.windC, [bedId+K.savr]],
        [bedId+K.wnde,   1, U.factor, Eq.windC, [bedId+K.savr]],
        [bedId+K.wndi,   0, U.factor, Eq.windI, [bedId+K.brat, bedId+K.wnde, bedId+K.wndc]],
        [bedId+K.wndk,   0, U.factor, Eq.windK, [bedId+K.brat, bedId+K.wnde, bedId+K.wndc]],
        [bedId+K.phiw,   0, U.factor, Fire.phiWind, [bedId+K.wmid, bedId+K.wndb, bedId+K.wndk]],
        [bedId+K.phis,   0, U.factor, Fire.phiSlope, [slopeId+K.srat, bedId+K.slpk]],
        [bedId+K.phie,   0, U.factor, Fire.phiEffectiveWind, [bedId+K.phiw, bedId+K.phis]],
        [bedId+K.weff,   0, U.wnds, Fire.effectiveWindSpeed, [bedId+K.phie, bedId+K.wndb, bedId+K.wndi]],
    ]
    
    const fireNodes = [
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

    return [ ...meta, ...inputNodes, ...bedNodes]
}
