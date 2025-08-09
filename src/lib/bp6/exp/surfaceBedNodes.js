/**
 * @file Behavejs '/fuel/bed' Dag node definitions.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 */
import { Calc, Dag, K, Util } from '../index.js'
import { FuelBedEquations as Eq } from './FuelBedEquations.js'
import { SurfaceFireEquations as Fire } from './SurfaceFireEquations.js'

export function surfaceBedNodes(fireId, bedId, slopeId) {
    const f = bedId
    const deadId = bedId + 'dead/'
    const liveId = bedId + 'live/'
    // -------------------------------------------------------------------------
    // External nodes
    // The following 9 nodes' update method should be changed from Dag.constant
    // by one or more external submodules:
    // -------------------------------------------------------------------------

    // NEED TO CONFIFURE *WAF* for estimated:
    // Try a windAdjustmentNodes(wafId, cfg) with waf as input or estimated node
    // then pass wafId into this routine
    const inputNodes = [
        [bedId+K.covr, 0, K._fraction, Dag.constant, []],
        [bedId+K.cured, 0, K._fraction, Dag.input, []],
        [bedId+K.wmid, 0, K._wnds, Dag.input, []],
    ]

    // -------------------------------------------------------------------------
    // The following internal nodes need no further submodule modifications.
    // -------------------------------------------------------------------------

    const bedNodes = [
        [bedId+K.bulk,   0, K._beta, Eq.bulkDensity, [bedId+K.load, bedId+'depth']],
        [bedId+K.qig,    0, K._qig, Eq.weightedHeatOfPreIgnition, [deadId+K.sawf, deadId+K.qig, liveId+K.sawf, liveId+K.qig]],
        [bedId+K.owaf,   1, K._owaf, Eq.openWindSpeedAdjustmentFactor, [bedId+K.depth]],
        [bedId+K.load,   0, K._load, Calc.sum, [deadId+K.load, liveId+K.load]],
        [bedId+K.beta,   0, K._beta, Eq.packingRatio, [deadId+K.vol, liveId+K.vol, bedId+K.depth]],
        [bedId+K.bopt,   0, K._beta, Eq.optimumPackingRatio, [bedId+K.savr]],
        [bedId+K.brat,   0, K._ratio, Eq.optimumPackingRatio, [bedId+K.beta, bedId+K.bopt]],
        [bedId+K.xi,     0, K._ratio, Eq.propagatingFluxRatio, [bedId+K.savr, bedId+K.beta]],
        [bedId+K.rxve,   0, K._factor, Eq.reactionVelocityExponent, [bedId+K.savr]],
        [bedId+K.rxvm,   0, K._rxv, Eq.reactionVelocityMaximum, [bedId+K.savr15]],
        [bedId+K.rxvo,   0, K._rxv, Eq.reactionVelocityOptimum, [bedId+K.brat, bedId+K.rxvm, bedId+K.rxve]],
        [bedId+K.slpk,   0, K._factor, Eq.windB, [bedId+K.beta]],
        [bedId+K.sa,     0, K._sa, Calc.sum, [deadId+K.sa, liveId+K.sa]],
        [bedId+K.savr,   1, K._savr, Eq.weightedSavr, [deadId+K.sawf, deadId+K.savr, liveId+K.sawf, liveId+K.savr]],
        [bedId+K.savr15, 1, K._savr, Eq.savr15, [bedId+K.savr]],
        [bedId+K.wndb,   1, K._factor, Eq.windB, [bedId+K.savr]],
        [bedId+K.wndc,   0, K._factor, Eq.windC, [bedId+K.savr]],
        [bedId+K.wnde,   1, K._factor, Eq.windC, [bedId+K.savr]],
        [bedId+K.wndi,   0, K._factor, Eq.windI, [bedId+K.brat, bedId+K.wnde, bedId+K.wndc]],
        [bedId+K.wndk,   0, K._factor, Eq.windK, [bedId+K.brat, bedId+K.wnde, bedId+K.wndc]],
        [bedId+K.phiw,   0, K._factor, Fire.phiWind, [bedId+K.wmid, bedId+K.wndb, bedId+K.wndk]],
        [bedId+K.phis,   0, K._factor, Fire.phiSlope, [slopeId+'steepness/ratio', bedId+K.slpk]],
        [bedId+K.phie,   0, K._factor, Fire.phiEffectiveWind, [bedId+K.phiw, bedId+K.phis]],
        [bedId+K.weff,   0, K._wnds, Fire.effectiveWindSpeed, [bedId+K.phie, bedId+K.wndb, bedId+K.wndi]],
    ]
    
    const fireNodes = [
        [fireId+K.hsink,  0, K._hsink, Eq.heatSink, [bedId+K.qig, bedId+K.bulk]],
        [fireId+K.hsrc,   0, K._rxi, Eq.heatSource, [fireId+K.rxi, bedId+K.qig]],
        [fireId+K.rxi,    0, K._rxi, Eq.reactionIntensity, [deadId+K.rxi, liveId+K.rxi]],
        [fireId+K.ros,    0, K._ros, Fire.maximumSpreadRate, [fireId+K.ros0, bedId+K.phie]],
        [fireId+K.rosa,   0, K._ros, Fire.spreadRateWithRosLimitApplied, [fireId+K.ros, bedId+K.weff]],
        [fireId+K.ros0,   0, K._ros, Eq.noWindNoSlopeSpreadRate, [fireId+K.hsrc, fireId+K.hsink]],
        [fireId+K.taur,   0, K._taur, Eq.fireResidenceTime, [bedId+K.savr]],
        [fireId+K.hpua,   0, K._hpua, Eq.heatPerUnitArea, [fireId+K.rxi, fireId+K.taur]],
        [fireId+K.lwr,    1, K._ratio, Fire.lengthToWidthRatio, [bedId+K.weff]],
        [fireId+K.fli,    0, K._ratio, Fire.firelineIntensity, [fireId+K.ros, fireId+K.rxi, fireId+K.taur]],
        [fireId+K.flen,   0, K._flen, Fire.flameLength, [fireId+K.fli]],
        [fireId+K.weffl,  0, K._wnds, Fire.effectiveWindSpeedLimit, [fireId+K.rxi]],
        // [fireId+K.scor,   0, K._scor, Fire.scorchHeight, [fireId+K.fli, bedId+K.wmid, bed.Id+K.airt]],
    ]
    return [...inputNodes, ...bedNodes, ...fireNodes]
}
