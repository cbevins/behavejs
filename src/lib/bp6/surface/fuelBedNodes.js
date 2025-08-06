/**
 * @file Behavejs '/fuel/bed' Dag node definitions.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 */
import {Calc, Dag, FuelBedEquations as Eq, Util, fuelLifeNodes} from '../index.js'
import {
    beta, load, covr, depth, qig, sawf, bulk, mext, nwns, ros, owaf, xi, rxi, rxv, rxvo,
    sa, savr, taur, vol, hpua,
    _beta, _load, _depth, _mois, _qig, _ros, _rxi, _rxv, _factor, _fraction, _owaf,
    _ratio, _hsink, _sa, _savr, _vol, _taur, _hpua, _wnds
} from './standardKeys.js'

/**
 * The following nodes update method should be changed from Dag.constant
 * by one or more external submodules:
 * - /fuel/bed/cover
 * - /fuel/bed/depth
 * 
 * @param {string} prefix 'surface/primary' or 'surface/secondary'
 * @returns 
 */
export function fuelBedNodes(prefix='') {
    const bed = prefix + '/fuel/bed/'
    const dead = prefix + '/fuel/dead/'
    const live = prefix + '/fuel/live/'
    const fire = prefix + '/fire/'
    const mois = prefix + '/moisture/'
    const slope = prefix + '/terrain/slope/'
    const wind = prefix + '/wind/'

    // The following keys are only used within this file
    const bopt = beta+'/optimum'
    const brat = beta+'/ratio'
    const hsink = 'heat sink'
    const hsrc = 'heat source'
    const mois1 = mois + 'dead/1-h'
    const mois10 = mois + 'dead/10-h'
    const mois100 = mois + 'dead/100-h'
    const moish = mois + 'live/herb'
    const moiss = mois + 'live/stem'
    const ros0 = nwns + ros
    const rxve  = rxv + '/exponent'
    const rxvm  = rxv + '/maximum'
    const savr15 = savr + '/1.5'
    const slpk = 'slope/K'
    const slpr = slope + 'rise to reach ratio'
    const wndb = 'wind/B'
    const wndc = 'wind/C'
    const wnde = 'wind/E'
    const wndk = 'wind/K'
    const wndi = 'wind/I'
    const wnds =  wind + 'speed at midflame height'

    // -------------------------------------------------------------------------
    // External nodes
    // The following 9 nodes' update method should be changed from Dag.constant
    // by one or more external submodules:
    // -------------------------------------------------------------------------

    // a configurator should change this update method to Dag.input only for two-fuels case
    // if two-fuels, change 'primary' to Dag.input value=1, 'secondary' to Dag.input, value=0
    // otherwise, change 'primary' to Dag.constant value=1 and 'secondary' to Dag.constant value=0
    const coverNodes = [[bed+covr, 0, _fraction, Dag.constant, []]]

    // a fuel submodule should change this update method to Dag.assign linked to its own internal node
    const fuelNodes = [
        [bed+depth, 1, _depth, Dag.constant, []],
        [dead+mext, 1, _mois, Dag.constant, []],
    ]

    // a moisture submodule should change these to Dag.assign to its own internal node
    const moistureNodes = [
        [mois1,   1, _mois, Dag.constant, []],
        [mois10,  1, _mois, Dag.constant, []],
        [mois100, 1, _mois, Dag.constant, []],
        [moish,   1, _mois, Dag.constant, []],
        [moiss,   1, _mois, Dag.constant, []],
    ]

    // a terrain submodule should change this update method to Dag.assign linked to its own internal node
    const terrainNodes = [[slpr, 0, _ratio, Dag.constant, []]]

    // a wind submodule should change this update method to Dag.assign linked to its own internal node
    const windNodes = [[wnds, 0, _wnds, Dag.constant, []]]

    // -------------------------------------------------------------------------
    // Internal nodes
    // The following internal nodes need no further submodule modifications.
    // -------------------------------------------------------------------------

    const bedNodes = [
        [bed+bulk,   0, _beta, Eq.bulkDensity, [bed+load, bed+'depth']],
        [bed+qig,    0, _qig, Eq.weightedHeatOfPreIgnition, [dead+sawf, dead+qig, live+sawf, live+qig]],
        [bed+owaf,   1, _owaf, Eq.openWindSpeedAdjustmentFactor, [bed+depth]],
        [bed+load,   0, _load, Calc.sum, [dead+load, live+load]],
        [bed+beta,   0, _beta, Eq.packingRatio, [dead+vol, live+vol, bed+depth]],
        [bed+bopt,   0, _beta, Eq.optimumPackingRatio, [bed+savr]],
        [bed+brat,   0, _ratio, Eq.optimumPackingRatio, [bed+beta, bed+bopt]],
        [bed+xi,     0, _ratio, Eq.propagatingFluxRatio, [bed+savr, bed+beta]],
        [bed+rxve,   0, _factor, Eq.reactionVelocityExponent, [bed+savr]],
        [bed+rxvm,   0, _rxv, Eq.reactionVelocityMaximum, [bed+savr15]],
        [bed+rxvo,   0, _rxv, Eq.reactionVelocityOptimum, [bed+brat, bed+rxvm, bed+rxve]],
        [bed+slpk,   0, _factor, Eq.windB, [bed+beta]],
        [bed+sa,     0, _sa, Calc.sum, [dead+sa, live+sa]],
        [bed+savr,   1, _savr, Eq.weightedSavr, [dead+sawf, dead+savr, live+sawf, live+savr]],
        [bed+savr15, 1, _savr, Eq.savr15, [bed+savr]],
        [bed+wndb,   1, _factor, Eq.windB, [bed+savr]],
        [bed+wndc,   0, _factor, Eq.windC, [bed+savr]],
        [bed+wnde,   1, _factor, Eq.windC, [bed+savr]],
        [bed+wndi,   0, _factor, Eq.windI, [bed+brat, bed+wnde, bed+wndc]],
        [bed+wndk,   0, _factor, Eq.windK, [bed+brat, bed+wnde, bed+wndc]],
    ]

    const deadNodes = fuelLifeNodes(prefix, 'dead')
    
    const liveNodes = fuelLifeNodes(prefix, 'live')
    
    const fireNodes = [
        [fire+hsink,  0, _hsink, Eq.heatSink, [bed+qig, bed+bulk]],
        [fire+hsrc,   0, _rxi, Eq.heatSource, [fire+rxi, bed+qig]],
        [fire+rxi,    0, _rxi, Eq.reactionIntensity, [dead+rxi, live+rxi]],
        [fire+ros0,   0, _ros, Eq.noWindNoSlopeSpreadRate, [fire+hsrc, fire+hsink]],
        [fire+taur,   0, _taur, Eq.fireResidenceTime, [bed+savr]],
        [fire+hpua,   0, _hpua, Eq.heatPerUnitArea, [fire+rxi, fire+taur]]
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
