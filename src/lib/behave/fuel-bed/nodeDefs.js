/**
 * Defines the DagNodes to calculate 'fuel/bed/...' DagNodes
 * from 'fuel/dead/...' and 'fuel/live/...' characteristics
 * per Rothermel (1972) and BehavePlus V6.
 * 
 * Naming Conventions
 * fuel/bed variants are for the combined contribution of the dead and live fuels
 * fuel/dead variants are for the dead fuels only and are inputs to this submodule
 * fuel/live variants are for the live fuels only and are inputs to this submodule
 */
import {Calc} from '../Calc.js'
import {Dag} from '../../dag/Dag.js'
import {Equations as Eq} from './equations.js'

function tbd() {}

export const nodeDefs = [
    ['fuel/bed/bulk density', 0, 'Bulk Density',
        Eq.bulkDensity, [
            'fuel/bed/ovendry load',
            'fuel/bed/depth']
    ],
    ['fuel/bed/depth', 1, 'Fuel Depth',
        null, []],
    ['fuel/bed/heat of pre-ignition', 0, 'Heat of Pre-ignition',
        Eq.weightedHeatOfPreIgnition, [
            'fuel/dead/weighting factor/surface area',
            'fuel/dead/heat of pre-ignition',
            'fuel/live/weighting factor/surface area',
            'fuel/live/heat of pre-ignition']
    ],
    ['fuel/bed/heat sink', 0, 'Heat Sink',
        Eq.heatSink, [
            'fuel/bed/heat of pre-ignition',
            'fuel/bed/bulk density']
    ],
    ['fuel/bed/heat source', 0, 'Heat Source',
        Eq.heatSource, [
            'fuel/bed/heat of pre-ignition',
            'fuel/bed/propagating flux ratio']
    ],
    ['fuel/bed/no-wind no-slope/spread rate', 0, 'Fire Spread Rate',
        Eq.noWindNoSlopeSpreadRate, [
            'fuel/bed/heat source',
            'fuel/bed/heat sink'],
    ],
    ['fuel/bed/open wind speed adjustment factor', 1, 'Ratio',
        Eq.openWindSpeedAdjustmentFactor, ['fuel/bed/depth']
    ],
    ['fuel/bed/ovendry load', 0, 'Fuel Load',
        Calc.sum, [
            'fuel/dead/ovendry load',
            'fuel/live/ovendry load']
    ],
    ['fuel/bed/packing ratio', 0, 'Ratio',
        Eq.packingRatio, [
            'fuel/dead/volume',
            'fuel/live/volume',
            'fuel/bed/depth']
    ],
    ['fuel/bed/packing ratio/optimum', 0, 'Ratio',
        Eq.optimumPackingRatio, ['fuel/bed/surface area to volume ratio']
    ],
    ['fuel/bed/packing ratio/ratio', 0, 'Ratio',
        Eq.optimumPackingRatio, [
            'fuel/bed/packing ratio',
            'fuel/bed/packing ratio/optimum'],
    ],
    ['fuel/bed/propagating flux ratio', 0, 'Ratio',
        Eq.propagatingFluxRatio, [
            'fuel/bed/surface area to volume ratio',
            'fuel/bed/packing ratio']
    ],
    ['fuel/bed/reaction intensity', 0, 'Reaction Intensity',
        Eq.reactionIntensity, [
            'fuel/dead/reaction intensity',
            'fuel/live/reaction intensity']
    ],
    ['fuel/bed/reaction velocity/exponent', 0, 'Factor',
        Eq.reactionVelocityExponent, ['fuel/bed/surface area to volume ratio']
    ],
    ['fuel/bed/reaction velocity/maximum', 0, 'Fire Reaction Velocity',
        Eq.reactionVelocityMaximum, ['fuel/bed/surface area to volume ratio/1.5']
    ],
    ['fuel/bed/reaction velocity/optimum', 0, 'Fire Reaction Velocity',
        Eq.reactionVelocityOptimum, [
            'fuel/bed/packing ratio/ratio',
            'fuel/bed/reaction velocity/maximum',
            'fuel/bed/reaction velocity/exponent']
    ],
    ['fuel/bed/surface area to volume ratio', 1, 'Surface Area to Volume Ratio',
        Eq.weightedSurfaceAreaToVolumeRatio, [
            'fuel/dead/weighting factor/surface area',
            'fuel/dead/surface area to volume ratio',
            'fuel/live/weighting factor/surface area',
            'fuel/live/surface area to volume ratio']
    ],
    ['fuel/bed/surface area to volume ratio/1.5', 1, 'Surface Area to Volume Ratio',
        Eq.savr15, ['fuel/bed/surface area to volume ratio']
    ],

    ['fuel/bed/surface area', 0, 'Surface Area',
        Eq.surfaceArea, [
            'fuel/dead/surface area',
            'fuel/live/surface area'],
    ],


    // -------------------------------
    ['fuel/dead/heat of pre-ignition', 0, '', Dag.input, []],
    ['fuel/dead/ovendry load', 0, 'Fuel Load', null, []],
    ['fuel/dead/reaction intensity', 0, 'Fire Reaction Intensity', null, []],
    ['fuel/dead/surface area', 0, 'Surface Area', null, []],
    ['fuel/dead/surface area to volume ratio', 1, 'Surface Area to Volume Ratio', null, []],
    ['fuel/dead/volume', 0, 'Volume', null, []],
    ['fuel/dead/weighting factor/surface area', 0, '', Dag.input, []],

    
    ['fuel/live/heat of pre-ignition', 0, '', Dag.input, []],
    ['fuel/live/ovendry load', 0, 'Fuel Load', null, []],
    ['fuel/live/reaction intensity', 0, 'Fire Reaction Intensity', null, []],
    ['fuel/live/surface area', 0, 'Surface Area', null, []],
    ['fuel/live/surface area to volume ratio', 1, 'Surface Area to Volume Ratio', null, []],
    ['fuel/live/volume', 0, 'Volume', null, []],
    ['fuel/live/weighting factor/surface area', 0, '', Dag.input, []],
]