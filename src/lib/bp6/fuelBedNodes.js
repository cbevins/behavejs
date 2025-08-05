/**
 * @file Behavejs '/fuel/bed' Dag node definitions.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 */
import {Calc} from './Calc.js'
import {FuelBedEquations as Eq} from './FuelBedEquations.js'
import { 
    beta, load, covr, depth, qig, sawf, bulk, nwns, ros, owaf, xi, rxi, rxv, rxvo, sa, savr, vol,
    _beta, _load, _depth, _qig, _ros, _rxi, _rxv, _factor, _fraction, _owaf, _ratio, _hsink, _sa, _savr, _vol
} from './standardKeys.js'

export function surfacePrimaryNodes() { return nodeTemplates('surface/primary') }
export function surfaceSecondaryNodes() { return nodeTemplates('surface/secondary') }

export function fuelBedNodes(prefix='') {
    const bed = prefix + '/fuel/bed/'
    const dead = prefix + '/fuel/dead/'
    const live = prefix + '/fuel/live/'
    // The following keys are only used by this file
    const bopt = beta+'/optimum'
    const brat = beta+'/ratio'
    const hsink = 'heat sink'
    const hsrc = 'heat source'
    const rxve  = rxv+'/exponent'
    const rxvm  = rxv+'/maximum'
    const savr15 = savr+'/1.5'
    const slpk = 'slope/K'
    const wndb = 'wind/B'
    const wndc = 'wind/C'
    const wnde = 'wind/E'
    const wndk = 'wind/K'
    const wndi = 'wind/I'

    return [
    [bed+beta, 0, _beta, Eq.bulkDensity, [bed+load, bed+'depth']],
    
    [bed+covr, 1, _fraction, null, []],

    [bed+depth, 1, _depth, null, []],

    [bed+qig, 0, _qig, Eq.weightedHeatOfPreIgnition, [dead+sawf, dead+qig, live+sawf, live+qig]],

    [bed+hsink, 0, _hsink, Eq.heatSink, [bed+qig, bed+bulk]],

    [bed+hsrc, 0, _rxi, Eq.heatSource, [bed+rxi, bed+qig]],

    [bed+nwns+ros, 0, _ros, Eq.noWindNoSlopeSpreadRate, [bed+hsrc, bed+hsink]],

    [bed+owaf, 1, _owaf, Eq.openWindSpeedAdjustmentFactor, [bed+depth]],

    [bed+load, 0, _load, Calc.sum, [dead+load, live+load]],

    [bed+beta, 0, _beta, Eq.packingRatio, [dead+vol, live+vol, bed+depth]],

    [bed+bopt, 0, _beta, Eq.optimumPackingRatio, [bed+savr]],

    [bed+brat, 0, _ratio, Eq.optimumPackingRatio, [bed+beta, bed+bopt]],
    
    [bed+xi, 0, _ratio, Eq.propagatingFluxRatio, [bed+savr, bed+beta]],

    [bed+rxi, 0, _rxi, Eq.reactionIntensity, [dead+rxi, live+rxi]],

    [bed+rxve, 0, _factor, Eq.reactionVelocityExponent, [bed+savr]],

    [bed+rxvm, 0, _rxv, Eq.reactionVelocityMaximum, [bed+savr15]],

    [bed+rxvo, 0, _rxv, Eq.reactionVelocityOptimum, [bed+brat, bed+rxvm, bed+rxve]],

    [bed+slpk, 0, _factor, Eq.windB, [bed+beta]],

    [bed+sa, 0, _sa, Calc.sum, [dead+sa, live+sa]],

    [bed+savr, 1, _savr,
        Eq.weightedSurfaceAreaToVolumeRatio, [dead+sawf, dead+savr, live+sawf, live+savr]],

    [bed+savr15, 1, _savr, Eq.savr15, [bed+savr]],

    [bed+wndb, 1, _factor, Eq.windB, [bed+savr]],

    [bed+wndc, 0, _factor, Eq.windC, [bed+savr]],

    [bed+wnde, 1, _factor, Eq.windC, [bed+savr]],

    [bed+wndi, 0, _factor, Eq.windI, [bed+brat, bed+wnde, bed+wndc]],

    [bed+wndk, 0, _factor, Eq.windK, [bed+brat, bed+wnde, bed+wndc]],
    ]
}

for(let [key, value, units, method, suppliers] of fuelBedNodes('surface/primary')) {
    console.log(key)
}