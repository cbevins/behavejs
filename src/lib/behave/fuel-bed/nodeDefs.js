/**
 * Defines the DagNodes to calculate surface head fire spread rate
 * from dead and live fuel bed characteristics
 * per Rothermel (1972) and BehavePlus.
 * 
 * Naming Conventions
 * fuel/bed variants are for the combined constribution of the dead and live fuels
 * fuel/dead variants are for the dead fuels only
 * fuel/live variants are for the live fuels only
 */
import {Calc} from '../Calc.js'
import {Dag} from '../../dag/Dag.js'
import {Equations as Eq} from './equations.js'

function tbd() {}

export const nodeDefs = [
    ['fuel/bed/no-wind no-slope/spread rate', 0, 'Fire Spread Rate',
        Eq.noWindNoSlopeSpreadRate, [
            'fuel/bed/heat source',
            'fuel/bed/heat sink'],
    ],
    ['fuel/bed/bulk density', 0, 'Bulk Density',
        Eq.bulkDensity, [
            'fuel/bed/ovendry load',
            'fuel/bed/depth']
    ],
    ['fuel/bed/depth', 1, 'Fuel Depth',
        null, []],
    ['fuel/bed/ovendry load', 0, 'Fuel Load',
        Calc.sum, [
            'fuel/dead/ovendry load',
            'fuel/live/ovendry load'
        ]
    ]
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
    ['fuel/bed/propagating flux ratio', 0, 'Ratio',
        Eq.propagatingFluxRatio, [
            'fuel/bed/surface area-to-volume ratio',
            'fuel/bed/packing ratio']
    ],

    // ---------------------------------------------------------
    ['fuel/bed/reaction velocity/maximum', 0, 'Reaction Velocity',
        tbd, [
            'fuel/bed/reaction velocity/maximum',
            'fuel/bed/reaction velocity/exponent']
    ],
    ['fuel/bed/surface area to volume ratio', 1, 'Surface Area to Volume Ratio',
        tbd, [
            'fuel/dead/weighting factor/surface area',
            'fuel/dead/surface area to volume ratio',
            'fuel/live/weighting factor/surface area',
            'fuel/live/surface area to volume ratio']
    ],
    ['fuel/bed/surface area to volume ratio/1.5', 1, 'Surface Area to Volume Ratio',
        tbd, ['fuel/bed/surface area to volume ratio']
    ],
    ['fuel/bed/surface area', 0, 'Surface Area',
        Eq.fuelBedSurfaceArea, [
            'fuel/dead/surface area',
            'fuel/live/surface area'],
    ]


    // -------------------------------
    ['fuel/dead/ovendry load', 0, 'Fuel Load', null, []],
    ['fuel/dead/weighting factor/surface area', 0, '', Dag.input, []],
    ['fuel/dead/heat of pre-ignition', 0, '', Dag.input, []],

    
    ['fuel/live/weighting factor/surface area', 0, '', Dag.input, []],
    ['fuel/live/heat of pre-ignition', 0, '', Dag.input, []],
    ['fuel/bed/surface area-to-volume ratio', 0, '', Dag.input, []],
    ['fuel/bed/packing ratio', 0, '', Dag.input, []],
]