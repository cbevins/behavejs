/**
 * @file Behavejs '/fuel/bed' Dag node definitions.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 */
import {Calc, Dag, FuelBedEquations as Eq, Util, K} from '../index.js'
import { fuelLifeNodes } from './fuelLifeNodes.js'
/**
 * The following nodes update method should be changed from Dag.constant
 * by one or more external submodules:
 * - /surface/fuel/1/coverage
 * - /surface/fuel/1/bed/depth
 * 
 * @param {string} f is 'surface/fuel/1', 'surface/fuel/1', or 'crown/canopy'
 * @returns 
 */
export function fuelBedNodes(f='') {
    const bed = f + K.bed

    // -------------------------------------------------------------------------
    // External nodes
    // The following 9 nodes' update method should be changed from Dag.constant
    // by one or more external submodules:
    // -------------------------------------------------------------------------

    // a configurator should change this update method to Dag.input only for two-fuels case
    // if two-fuels, change 'primary' to Dag.input value=1, 'secondary' to Dag.input, value=0
    // otherwise, change 'primary' to Dag.constant value=1 and 'secondary' to Dag.constant value=0
    const coverNodes = [[f+K.covr, 0, K._fraction, Dag.constant, []]]
    // a fuel submodule should change this update method to Dag.assign linked to its own internal node
    const fuelNodes = [
        [f+K.bed+K.depth, 1, K._depth, Dag.constant, []],
        [f+K.bed+K.mext, 1, K._mois, Dag.constant, []],
    ]

    // a moisture submodule should change these to Dag.assign to its own internal node
    const moistureNodes = [
        [f+K.fuelmoisdead+K.h1,   1, K._mois, Dag.constant, []],
        [f+K.fuelmoisdead+K.h10,  1, K._mois, Dag.constant, []],
        [f+K.fuelmoisdead+K.h100, 1, K._mois, Dag.constant, []],
        [f+K.fuelmoislive+K.herb, 1, K._mois, Dag.constant, []],
        [f+K.fuelmoislive+K.stem, 1, K._mois, Dag.constant, []],
    ]

    // a terrain submodule should change this update method to Dag.assign linked to its own internal node
    const terrainNodes = [[f+K.fuelslope, 0, K._ratio, Dag.constant, []]]

    // a wind submodule should change this update method to Dag.assign linked to its own internal node
    const windNodes = [[f+K.fuelwindspeed, 0, K._wnds, Dag.constant, []]]

    // -------------------------------------------------------------------------
    // Internal nodes
    // The following internal nodes need no further submodule modifications.
    // -------------------------------------------------------------------------

    const bedNodes = [
        [bed+K.bulk,   0, K._beta, Eq.bulkDensity, [bed+K.load, bed+'depth']],
        [bed+K.qig,    0, K._qig, Eq.weightedHeatOfPreIgnition, [K.dead+K.sawf, K.dead+K.qig, K.live+K.sawf, K.live+K.qig]],
        [bed+K.owaf,   1, K._owaf, Eq.openWindSpeedAdjustmentFactor, [bed+K.depth]],
        [bed+K.load,   0, K._load, Calc.sum, [K.dead+K.load, K.live+K.load]],
        [bed+K.beta,   0, K._beta, Eq.packingRatio, [K.dead+K.vol, K.live+K.vol, bed+K.depth]],
        [bed+K.bopt,   0, K._beta, Eq.optimumPackingRatio, [bed+K.savr]],
        [bed+K.brat,   0, K._ratio, Eq.optimumPackingRatio, [bed+K.beta, bed+K.bopt]],
        [bed+K.xi,     0, K._ratio, Eq.propagatingFluxRatio, [bed+K.savr, bed+K.beta]],
        [bed+K.rxve,   0, K._factor, Eq.reactionVelocityExponent, [bed+K.savr]],
        [bed+K.rxvm,   0, K._rxv, Eq.reactionVelocityMaximum, [bed+K.savr15]],
        [bed+K.rxvo,   0, K._rxv, Eq.reactionVelocityOptimum, [bed+K.brat, bed+K.rxvm, bed+K.rxve]],
        [bed+K.slpk,   0, K._factor, Eq.windB, [bed+K.beta]],
        [bed+K.sa,     0, K._sa, Calc.sum, [K.dead+K.sa, K.live+K.sa]],
        [bed+K.savr,   1, K._savr, Eq.weightedSavr, [K.dead+K.sawf, K.dead+K.savr, K.live+K.sawf, K.live+K.savr]],
        [bed+K.savr15, 1, K._savr, Eq.savr15, [bed+K.savr]],
        [bed+K.wndb,   1, K._factor, Eq.windB, [bed+K.savr]],
        [bed+K.wndc,   0, K._factor, Eq.windC, [bed+K.savr]],
        [bed+K.wnde,   1, K._factor, Eq.windC, [bed+K.savr]],
        [bed+K.wndi,   0, K._factor, Eq.windI, [bed+K.brat, bed+K.wnde, bed+K.wndc]],
        [bed+K.wndk,   0, K._factor, Eq.windK, [bed+K.brat, bed+K.wnde, bed+K.wndc]],
    ]

    const deadNodes = fuelLifeNodes(f, 'dead')
    const liveNodes = fuelLifeNodes(f, 'live')
    
    const fire = f+K.fuelfire
    const fireNodes = [
        [fire+K.hsink,  0, K._hsink, Eq.heatSink, [bed+K.qig, bed+K.bulk]],
        [fire+K.hsrc,   0, K._rxi, Eq.heatSource, [fire+K.rxi, bed+K.qig]],
        [fire+K.rxi,    0, K._rxi, Eq.reactionIntensity, [K.dead+K.rxi, K.live+K.rxi]],
        [fire+K.ros0,   0, K._ros, Eq.noWindNoSlopeSpreadRate, [fire+K.hsrc, fire+K.hsink]],
        [fire+K.taur,   0, K._taur, Eq.fireResidenceTime, [bed+K.savr]],
        [fire+K.hpua,   0, K._hpua, Eq.heatPerUnitArea, [fire+K.rxi, fire+K.taur]]
    ]
    return Util.nodesToMap([
        ...coverNodes,
        ...fuelNodes,
        ...bedNodes,
        ...deadNodes,
        ...liveNodes,
        ...moistureNodes,
        ...terrainNodes,
        ...windNodes,
        ...fireNodes
    ])
}
fuelBedNodes(K.s1)
