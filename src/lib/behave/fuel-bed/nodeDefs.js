/**
 * @file Behave '/fuel/bed' DagNode definitions and creator method.
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
    const dead = prefix + '/fuel/dead/'
    const live = prefix + '/fuel/live/'
    const heat = 'heat of combustion'
    const load = 'ovendry load'
    const qig  = 'heat of pre-ignition'
    const savr = 'surface area to volume ratio'
    const savr15 = 'surface area to volume ratio/1.5'
    const sawf = 'surface area weighting factor'

    return [
    [bed+'bulk density', 0, '/fuel/bulk density',
        Eq.bulkDensity, [bed+load, bed+'depth']],
    
    [bed+'depth', 1, '/fuel/bed depth', null, []],

    [bed+qig, 0, '/fuel/'+qig,
        Eq.weightedHeatOfPreIgnition, [
            dead+sawf, dead+qig, live+sawf, live+qig]],

    [bed+'heat sink', 0, '/fuel/heat sink',
        Eq.heatSink, [bed+qig, bed+'bulk density']],

    [bed+'heat source', 0, '/fuel/heat source',
        Eq.heatSource, [bed+'fire reaction intensity', bed+'propagating flux ratio']],

    [bed+'no-wind no-slope/spread rate', 0, '/fire/spread rate',
        Eq.noWindNoSlopeSpreadRate, [bed+'heat source', bed+'heat sink']],

    [bed+'open wind speed adjustment factor', 1, '/ratio',
        Eq.openWindSpeedAdjustmentFactor, [bed+'depth']],

    [bed+load, 0, '/fuel/'+load,
        Calc.sum, [dead+load, live+load]],

    [bed+'packing ratio', 0, '/ratio',
        Eq.packingRatio, [dead+'volume', live+'volume', bed+'depth']],

    [bed+'packing ratio/optimum', 0, '/ratio',
        Eq.optimumPackingRatio, [bed+savr]],

    [bed+'packing ratio/ratio', 0, '/ratio',
        Eq.optimumPackingRatio, [bed+'packing ratio', bed+'packing ratio/optimum']],
    
    [bed+'propagating flux ratio', 0, '/ratio',
        Eq.propagatingFluxRatio, [bed+savr, bed+'packing ratio']],

    [bed+'fire reaction intensity', 0, '/fire/reaction intensity',
        Eq.reactionIntensity, [dead+'fire reaction intensity', live+'fire reaction intensity']],

    [bed+'fire reaction velocity/exponent', 0, '/factor',
        Eq.reactionVelocityExponent, [bed+savr]],

    [bed+'fire reaction velocity/maximum', 0, '/fire/reaction velocity',
        Eq.reactionVelocityMaximum, [bed+savr15]],

    [bed+'fire reaction velocity/optimum', 0, '/fire/reaction velocity',
        Eq.reactionVelocityOptimum, [
            bed+'packing ratio/ratio',
            bed+'fire reaction velocity/maximum',
            bed+'fire reaction velocity/exponent']],

    [bed+'slope/K', 0, '/ratio', Eq.windB, [bed+'packing ratio']],

    [bed+'surface area', 0, '/fuel/surface area',
        Calc.sum, [dead+'surface area', live+'surface area']],

    [bed+savr, 1, '/fuel/'+savr,
        Eq.weightedSurfaceAreaToVolumeRatio, [dead+sawf, dead+savr, live+sawf, live+savr]],

    [bed+savr15, 1, '/fuel/'+savr, Eq.savr15, [bed+savr]],

    [bed+'wind/B', 1, '/ratio', Eq.windB, [bed+savr]],

    [bed+'wind/C', 0, '/ratio', Eq.windC, [bed+savr]],

    [bed+'wind/E', 1, '/ratio', Eq.windC, [bed+savr]],

    [bed+'wind/I', 0, '/ratio',
        Eq.windI, [bed+'packing ratio/ratio', bed+'wind/E', bed+'wind/C']],

    [bed+'wind/K', 0, '/ratio',
        Eq.windK, [bed+'packing ratio/ratio', bed+'wind/E', bed+'wind/C']],

    // -------------------------------

    // [dead+'heat of pre-ignition', 0,  '/fuel/heat of pre-ignition', Dag.input, []],
    // [dead+'ovendry load', 0, '/fuel/ovendry load', null, []],
    // [dead+'fire reaction intensity', 0, '/fire/reaction intensity', null, []],
    // [dead+'surface area', 0, '/fuel/surface area', null, []],
    // [dead+'surface area to volume ratio', 1, '/fuel/surface area to volume ratio', null, []],
    // [dead+'volume', 0, '/fuel/volume', null, []],
    // [dead+'surface area weighting factor', 0, '/fraction', Dag.input, []],

    // [live+'heat of pre-ignition', 0,  '/fuel/heat of pre-ignition', Dag.input, []],
    // [live+'ovendry load', 0, '/fuel/ovendry load', null, []],
    // [live+'fire reaction intensity', 0, '/fire/reaction intensity', null, []],
    // [live+'surface area', 0, '/fuel/surface area', null, []],
    // [live+'surface area to volume ratio', 1, '/fuel/surface area to volume ratio', null, []],
    // [live+'volume', 0, '/fuel/volume', null, []],
    // [live+'surface area weighting factor', 0, '/fraction', Dag.input, []],
    ]
}
