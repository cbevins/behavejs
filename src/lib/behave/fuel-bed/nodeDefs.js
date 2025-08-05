/**
 * @file Behave '/fuel/bed' DagNode definitions.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 */
import {Calc, Dag, DagNode} from '../index.js'
import {Equations as Eq} from './equations.js'

export function getSurfacePrimary() { return nodeTemplates('surface/primary') }
export function getSurfaceSecondary() { return nodeTemplates('surface/secondary') }

export function fuelBedNodeDefs(prefix='') {
    const bed = prefix + '/fuel/bed/'
    const beta = 'packing ratio'
    const dead = prefix + '/fuel/dead/'
    const live = prefix + '/fuel/live/'
    const heat = 'heat of combustion'
    const load = 'ovendry load'
    const qig  = 'heat of pre-ignition'
    const rxi  = 'fire/reaction intensity'
    const rxv  = 'fire/reaction velocity'
    const sa   = 'surface area'
    const savr = 'surface area to volume ratio'
    const savr15 = 'surface area to volume ratio/1.5'
    const sawf = 'surface area weighting factor'

    return [
    [bed+'bulk density', 0, '/fuel/bulk density', Eq.bulkDensity, [bed+load, bed+'depth']],
    
    [bed+'depth', 1, '/fuel/bed depth', null, []],

    [bed+qig, 0, '/fuel/'+qig,
        Eq.weightedHeatOfPreIgnition, [dead+sawf, dead+qig, live+sawf, live+qig]],

    [bed+'heat sink', 0, '/fuel/heat sink', Eq.heatSink, [bed+qig, bed+'bulk density']],

    [bed+'heat source', 0, '/fuel/heat source',
        Eq.heatSource, [bed+'fire/reaction intensity', bed+'propagating flux ratio']],

    [bed+'no-wind no-slope/spread rate', 0, '/fire/spread rate',
        Eq.noWindNoSlopeSpreadRate, [bed+'heat source', bed+'heat sink']],

    [bed+'open wind speed adjustment factor', 1, '/ratio', Eq.openWindSpeedAdjustmentFactor, [bed+'depth']],

    [bed+load, 0, '/fuel/'+load, Calc.sum, [dead+load, live+load]],

    [bed+beta, 0, '/ratio', Eq.packingRatio, [dead+'volume', live+'volume', bed+'depth']],

    [bed+beta+'/optimum', 0, '/ratio', Eq.optimumPackingRatio, [bed+savr]],

    [bed+beta+'/ratio', 0, '/ratio', Eq.optimumPackingRatio, [bed+beta, bed+beta+'/optimum']],
    
    [bed+'propagating flux ratio', 0, '/ratio', Eq.propagatingFluxRatio, [bed+savr, bed+'packing ratio']],

    [bed+rxi, 0, '/fire/reaction intensity', Eq.reactionIntensity, [dead+rxi, live+rxi]],

    [bed+rxv+'/exponent', 0, '/factor', Eq.reactionVelocityExponent, [bed+savr]],

    [bed+rxv+'/maximum', 0, '/fire/reaction velocity', Eq.reactionVelocityMaximum, [bed+savr15]],

    [bed+rxv+'/optimum', 0, '/fire/reaction velocity',
        Eq.reactionVelocityOptimum, [bed+beta+'/ratio', bed+rxv+'/maximum', bed+rxv+'/exponent']],

    [bed+'slope/K', 0, '/ratio', Eq.windB, [bed+'packing ratio']],

    [bed+sa, 0, '/fuel/'+sa, Calc.sum, [dead+sa, live+sa]],

    [bed+savr, 1, '/fuel/'+savr,
        Eq.weightedSurfaceAreaToVolumeRatio, [dead+sawf, dead+savr, live+sawf, live+savr]],

    [bed+savr15, 1, '/fuel/'+savr, Eq.savr15, [bed+savr]],

    [bed+'wind/B', 1, '/ratio', Eq.windB, [bed+savr]],

    [bed+'wind/C', 0, '/ratio', Eq.windC, [bed+savr]],

    [bed+'wind/E', 1, '/ratio', Eq.windC, [bed+savr]],

    [bed+'wind/I', 0, '/ratio', Eq.windI, [bed+beta+'/ratio', bed+'wind/E', bed+'wind/C']],

    [bed+'wind/K', 0, '/ratio', Eq.windK, [bed+beta+'/ratio', bed+'wind/E', bed+'wind/C']],
    ]
}
