/**
 * @file Behavejs '/fuel/bed' Dag node definitions.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 */
import {Calc, Dag, FuelBedEquations as Eq, Util, K} from '../index.js'

export function surfaceBedNodes(fireId, bedId) {
    const f = bedId
    const deadId = bedId + 'dead/'
    const liveId = bedId + 'live/'
    // -------------------------------------------------------------------------
    // External nodes
    // The following 9 nodes' update method should be changed from Dag.constant
    // by one or more external submodules:
    // -------------------------------------------------------------------------

    // a configurator should change this update method to Dag.input only for two-fuels case
    // if two-fuels, change 'primary' to Dag.input value=1, 'secondary' to Dag.input, value=0
    // otherwise, change 'primary' to Dag.constant value=1 and 'secondary' to Dag.constant value=0
    const coverNodes = [[bedId+K.covr, 0, K._fraction, Dag.constant, []]]

    // -------------------------------------------------------------------------
    // Internal nodes
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
    ]
    
    const fireNodes = [
        [fireId+K.hsink,  0, K._hsink, Eq.heatSink, [bedId+K.qig, bedId+K.bulk]],
        [fireId+K.hsrc,   0, K._rxi, Eq.heatSource, [fireId+K.rxi, bedId+K.qig]],
        [fireId+K.rxi,    0, K._rxi, Eq.reactionIntensity, [deadId+K.rxi, liveId+K.rxi]],
        [fireId+K.ros0,   0, K._ros, Eq.noWindNoSlopeSpreadRate, [fireId+K.hsrc, fireId+K.hsink]],
        [fireId+K.taur,   0, K._taur, Eq.fireResidenceTime, [bedId+K.savr]],
        [fireId+K.hpua,   0, K._hpua, Eq.heatPerUnitArea, [fireId+K.rxi, fireId+K.taur]]
    ]
    return [...coverNodes, ...bedNodes, ...fireNodes]
}
