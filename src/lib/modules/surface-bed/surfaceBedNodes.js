/**
 * @file Behavejs '/fuel/bed' Dag node definitions.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 */
import { Calc, Dag, L, U } from '../index.js'
import { SurfaceBedEquations as Eq } from '../index.js'
import { SurfaceFireEquations as Fire } from '../index.js'
import { SurfaceElementEquations as Fuel } from '../index.js'
import { standardFuelElementNodes } from "../index.js"
// import { chaparralFuelElementNodes } from "../index.js"
// import { southernRoughFuelElementNodes } from "../index.js"
// import { westernAspenFuelElementNodes } from "../index.js"
import { surfaceLifeNodes, surfaceDefaultElementNodes } from "../index.js"

/**
 * @param {string} bed Module pathway prefixed to all the returned nodes' keys
 * @param {string} fuel Path of the Fuel Model Module to be applied
 * @param {string} mois Path of the Moisture Module to be applied
 * @param {string} windmid Path of the Wind at Midflame Module to be applied
 * @param {string} slope Path of the Slope Module to be applied
 * @param {string} curing Path of the Curing Module to be applied
 * @param {object} cfg Object with cfg.model.value (see FuelModelConfig)
 * @returns Array of surface fuel bed module node definitions
 */
export function surfaceBedNodes(bed, fuel, mois, windmid, slope, curing, cfg) {
    const dead = bed + 'dead/'
    const live = bed + 'live/'
    const cfgFuel = cfg.model.value

    const meta = [
        [bed+L.mmod, 'surface bed', U.text, Dag.constant, []],
        [bed+L.mver, '1', U.text, Dag.constant, []],
        [bed+L.mcfg+'fuel', cfgFuel, U.text, Dag.constant, []],
    ]

    const assignedNodes  = [
        [bed+L.cured, 0, U.fraction, Dag.assign, [curing+L.cured]],
        [bed+L.wmid, 0, U.wspd, Dag.assign, [windmid+L.wmid]],
    ]

    const bedNodes = [
        [bed+L.bulk,   0, U.bulk, Eq.bulkDensity, [bed+L.load, bed+L.depth]],
        [bed+L.qig,    0, U.qig, Eq.weightedHeatOfPreIgnition, [dead+L.sawf, dead+L.qig, live+L.sawf, live+L.qig]],
        [bed+L.owaf,   1, U.fraction, Eq.openWindSpeedAdjustmentFactor, [bed+L.depth]],
        [bed+L.load,   0, U.load, Calc.sum, [dead+L.load, live+L.load]],
        [bed+L.beta,   0, U.ratio, Eq.packingRatio, [dead+L.vol, live+L.vol, bed+L.depth]],
        [bed+L.bopt,   0, U.ratio, Eq.optimumPackingRatio, [bed+L.savr]],
        [bed+L.bratio, 0, U.ratio, Eq.packingRatioRatio, [bed+L.beta, bed+L.bopt]],
        [bed+L.ehn,    0, U.ratio, Fuel.effectiveHeatingNumber, [bed+L.savr]],
        [bed+L.xi,     0, U.ratio, Eq.propagatingFluxRatio, [bed+L.savr, bed+L.beta]],
        [bed+L.rxve,   0, U.factor, Eq.reactionVelocityExponent, [bed+L.savr]],
        [bed+L.rxvm,   0, U.rxv, Eq.reactionVelocityMaximum, [bed+L.savr15]],
        [bed+L.rxvo,   0, U.rxv, Eq.reactionVelocityOptimum, [bed+L.bratio, bed+L.rxvm, bed+L.rxve]],
        [bed+L.slpk,   0, U.factor, Eq.slopeK, [bed+L.beta]],
        [bed+L.sa,     0, U.sa, Calc.sum, [dead+L.sa, live+L.sa]],
        [bed+L.savr,   1, U.savr, Eq.weightedSavr, [dead+L.sawf, dead+L.savr, live+L.sawf, live+L.savr]],
        [bed+L.savr15, 1, U.savr, Eq.savr15, [bed+L.savr]],
        [bed+L.wndb,   1, U.factor, Eq.windB, [bed+L.savr]],
        [bed+L.wndc,   0, U.factor, Eq.windC, [bed+L.savr]],
        [bed+L.wnde,   1, U.factor, Eq.windC, [bed+L.savr]],
        [bed+L.wndi,   0, U.factor, Eq.windI, [bed+L.bratio, bed+L.wnde, bed+L.wndc]],
        [bed+L.wndk,   0, U.factor, Eq.windK, [bed+L.bratio, bed+L.wnde, bed+L.wndc]],
        [bed+L.phiw,   0, U.factor, Eq.phiWind, [bed+L.wmid, bed+L.wndb, bed+L.wndk]],
        [bed+L.phis,   0, U.factor, Eq.phiSlope, [slope+L.srat, bed+L.slpk]],
        [bed+L.phie,   0, U.factor, Fire.phiEffectiveWind, [bed+L.phiw, bed+L.phis]],
        [bed+L.weff,   0, U.wspd, Fire.effectiveWindSpeed, [bed+L.phie, bed+L.wndb, bed+L.wndi]],
    ]

    const deadNodes = surfaceLifeNodes(bed, 'dead')
    const liveNodes = surfaceLifeNodes(bed, 'live')

    // The surface fuel elements are assigned to the configured fuel parameters
    let elementNodes = []
    if (cfgFuel === 'standard catalog' || cfgFuel === 'standard input')
        elementNodes = standardFuelElementNodes(bed, fuel, mois)
    else if (cfgFuel === 'chaparral') {
        // elementNodes = chaparralFuelElementNodes(bed, fuel, mois)
    } else if (cfgFuel === 'southern rough') {
        // elementNodes = southernRoughFuelElementNodes(bed, fuel, mois)
    } else if (cfgFuel === 'western aspen') {
        elementNodes = westernAspenFuelElementNodes(bed, fuel, mois)
    } else { // if (cfgFuel === 'none')
        elementNodes = surfaceDefaultElementNodes(bed)
    }
    return [ ...meta, ...assignedNodes,
        ...bedNodes, ...deadNodes, ...liveNodes, ...elementNodes].sort()
}
