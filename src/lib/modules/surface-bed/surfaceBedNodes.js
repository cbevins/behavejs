/**
 * @file Behavejs '/fuel/bed' Dag node definitions.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 */
import { Calc, Dag, K, U } from '../index.js'
import { SurfaceBedEquations as Eq } from '../index.js'
import { SurfaceFireEquations as Fire } from '../index.js'
import { standardFuelElementNodes } from "../index.js"
// import { chaparralFuelElementNodes } from "../index.js"
// import { southernRoughFuelElementNodes } from "../index.js"
// import { westernAspenFuelElementNodes } from "../index.js"
import { surfaceLifeNodes, surfaceDefaultElementNodes } from "../index.js"

/**
 * 
 * @param {*} fireId 
 * @param {*} bedId 
 * @param {*} fuelId 
 * @param {*} moisId 
 * @param {*} midflameId 
 * @param {*} slopeId 
 * @param {*} curingId 
 * @param {*} cfg Object with cfg.model.value (see FuelModelConfig)
 * @returns 
 */
export function surfaceBedNodes(fireId, bedId, fuelId, moisId, midflameId, slopeId, curingId, cfg) {
    const deadId = bedId + 'dead/'
    const liveId = bedId + 'live/'
    const cfgFuel = cfg.model.value

    const meta = [
        [bedId+K.mmod, 'surface bed', U.text, Dag.constant, []],
        [bedId+K.mver, '1', U.text, Dag.constant, []],
        [bedId+K.mcfg+'fuel', cfgFuel, U.text, Dag.constant, []],
    ]

    const assignedNodes  = [
        [bedId+K.cured, 0, U.fraction, Dag.assign, [curingId+K.curing]],
        [bedId+K.wmid, 0, U.wspd, Dag.assign, [midflameId+K.wmid]],
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

    const deadNodes = surfaceLifeNodes(bedId, 'dead')
    const liveNodes = surfaceLifeNodes(bedId, 'live')

    // The surface fuel elements are assigned to the configured fuelId parameters
    let elementNodes = []
    if (cfgFuel === 'standard catalog' || cfgFuel === 'standard input')
        elementNodes = standardFuelElementNodes(bedId, fuelId, moisId)
    else if (cfgFuel === 'chaparral') {
        // elementNodes = chaparralFuelElementNodes(bedId, fuelId, moisId)
    } else if (cfgFuel === 'southern rough') {
        // elementNodes = southernRoughFuelElementNodes(bedId, fuelId, moisId)
    } else if (cfgFuel === 'western aspen') {
        elementNodes = westernAspenFuelElementNodes(bedId, fuelId, moisId)
    } else // if (cfgFuel === 'none')
        elementNodes = surfaceDefaultElementNodes(bedId)

    return [ ...meta, ...assignedNodes,
        ...bedNodes, ...deadNodes, ...liveNodes, ...elementNodes].sort()
}
