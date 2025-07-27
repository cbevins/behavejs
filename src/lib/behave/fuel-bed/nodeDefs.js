/**
 * Defines the DagNodes to calculate 'fuel/bed/...' DagNodes
 * from 'fuel/dead/...' and 'fuel/live/...' characteristics
 * per Rothermel (1972) and BehavePlus V6.
 * 
 * Naming Conventions
 * 'fuel/bed/...' DagNodes are for the combined contribution of the dead and live fuels
 * 'fuel/dead/...' DagNodes are for the dead fuels only and are inputs to this submodule
 * 'fuel/live/...' DagNodes are for the live fuels only and are inputs to this submodule
 */
import {Calc} from '../Calc.js'
import {Dag} from '../../dag/Dag.js'
import {DagNode} from '../../dag/DagNode.js'
import {Equations as Eq} from './equations.js'

export const nodeTemplates = [
    ['fuel/bed/bulk density', 0, 'fuel/bulk density',
        Eq.bulkDensity, [
            'fuel/bed/ovendry load',
            'fuel/bed/depth']
    ],
    ['fuel/bed/depth', 1, 'fuel/bed depth',
        null, []],
    ['fuel/bed/heat of pre-ignition', 0, 'fuel/heat of pre-ignition',
        Eq.weightedHeatOfPreIgnition, [
            'fuel/dead/weighting factor/surface area',
            'fuel/dead/heat of pre-ignition',
            'fuel/live/weighting factor/surface area',
            'fuel/live/heat of pre-ignition']
    ],
    ['fuel/bed/heat sink', 0, 'fuel/heat sink',
        Eq.heatSink, [
            'fuel/bed/heat of pre-ignition',
            'fuel/bed/bulk density']
    ],
    ['fuel/bed/heat source', 0, 'fuel/heat source',
        Eq.heatSource, [
            'fuel/bed/heat of pre-ignition',
            'fuel/bed/propagating flux ratio']
    ],
    ['fuel/bed/no-wind no-slope/spread rate', 0, 'fire/spread rate',
        Eq.noWindNoSlopeSpreadRate, [
            'fuel/bed/heat source',
            'fuel/bed/heat sink'],
    ],
    ['fuel/bed/open wind speed adjustment factor', 1, 'ratio',
        Eq.openWindSpeedAdjustmentFactor, ['fuel/bed/depth']
    ],
    ['fuel/bed/ovendry load', 0, 'fuel/ovendry load',
        Calc.sum, [
            'fuel/dead/ovendry load',
            'fuel/live/ovendry load']
    ],
    ['fuel/bed/packing ratio', 0, 'ratio',
        Eq.packingRatio, [
            'fuel/dead/volume',
            'fuel/live/volume',
            'fuel/bed/depth']
    ],
    ['fuel/bed/packing ratio/optimum', 0, 'ratio',
        Eq.optimumPackingRatio, ['fuel/bed/surface area to volume ratio']
    ],
    ['fuel/bed/packing ratio/ratio', 0, 'ratio',
        Eq.optimumPackingRatio, [
            'fuel/bed/packing ratio',
            'fuel/bed/packing ratio/optimum'],
    ],
    ['fuel/bed/propagating flux ratio', 0, 'ratio',
        Eq.propagatingFluxRatio, [
            'fuel/bed/surface area to volume ratio',
            'fuel/bed/packing ratio']
    ],
    ['fuel/bed/reaction intensity', 0, 'fire/reaction intensity',
        Eq.reactionIntensity, [
            'fuel/dead/reaction intensity',
            'fuel/live/reaction intensity']
    ],
    ['fuel/bed/reaction velocity/exponent', 0, 'factor',
        Eq.reactionVelocityExponent, ['fuel/bed/surface area to volume ratio']
    ],
    ['fuel/bed/reaction velocity/maximum', 0, 'fire/reaction velocity',
        Eq.reactionVelocityMaximum, ['fuel/bed/surface area to volume ratio/1.5']
    ],
    ['fuel/bed/reaction velocity/optimum', 0, 'fire/reaction velocity',
        Eq.reactionVelocityOptimum, [
            'fuel/bed/packing ratio/ratio',
            'fuel/bed/reaction velocity/maximum',
            'fuel/bed/reaction velocity/exponent']
    ],
    ['fuel/bed/slope/K', 0, 'ratio',
        Eq.windB, ['fuel/bed/packing ratio']
    ],
    ['fuel/bed/surface area', 0, 'fuel/surface area',
        Eq.surfaceArea, [
            'fuel/dead/surface area',
            'fuel/live/surface area'],
    ],
    ['fuel/bed/surface area to volume ratio', 1, 'fuel/surface area to volume ratio',
        Eq.weightedSurfaceAreaToVolumeRatio, [
            'fuel/dead/weighting factor/surface area',
            'fuel/dead/surface area to volume ratio',
            'fuel/live/weighting factor/surface area',
            'fuel/live/surface area to volume ratio']
    ],
    ['fuel/bed/surface area to volume ratio/1.5', 1, 'fuel/surface area to volume ratio',
        Eq.savr15, ['fuel/bed/surface area to volume ratio']
    ],
    ['fuel/bed/wind/B', 0, 'ratio',
        Eq.windB, ['fuel/bed/surface area to volume ratio']
    ],
    ['fuel/bed/wind/C', 0, 'ratio',
        Eq.windC, ['fuel/bed/surface area to volume ratio']
    ],
    ['fuel/bed/wind/E', 0, 'ratio',
        Eq.windC, ['fuel/bed/surface area to volume ratio']
    ],
    ['fuel/bed/wind/I', 0, 'ratio',
        Eq.windI, [
            'fuel/bed/packing ratio/ratio',
            'fuel/bed/wind/E',
            'fuel/bed/wind/C']
    ],
    ['fuel/bed/wind/K', 0, 'ratio',
        Eq.windI, [
            'fuel/bed/packing ratio/ratio',
            'fuel/bed/wind/E',
            'fuel/bed/wind/C']
    ],

    // -------------------------------
    ['fuel/dead/heat of pre-ignition', 0,  'fuel/heat of pre-ignition', Dag.input, []],
    ['fuel/dead/ovendry load', 0, 'fuel/ovendry load', null, []],
    ['fuel/dead/reaction intensity', 0, 'fire/reaction intensity', null, []],
    ['fuel/dead/surface area', 0, 'fuel/surface area', null, []],
    ['fuel/dead/surface area to volume ratio', 1, 'fuel/surface area to volume ratio', null, []],
    ['fuel/dead/volume', 0, 'fuel/volume', null, []],
    ['fuel/dead/weighting factor/surface area', 0, 'fraction', Dag.input, []],

    
    ['fuel/live/heat of pre-ignition', 0,  'fuel/heat of pre-ignition', Dag.input, []],
    ['fuel/live/ovendry load', 0, 'fuel/ovendry load', null, []],
    ['fuel/live/reaction intensity', 0, 'fire/reaction intensity', null, []],
    ['fuel/live/surface area', 0, 'fuel/surface area', null, []],
    ['fuel/live/surface area to volume ratio', 1, 'fuel/surface area to volume ratio', null, []],
    ['fuel/live/volume', 0, 'fuel/volume', null, []],
    ['fuel/live/weighting factor/surface area', 0, 'fraction', Dag.input, []],
]

/**
 * Returns an array of DagNodes for a stand-alone 'fuel/bed' Dag.
 * Usually this is linked to 'fuel/dead' and 'fuel/live' DagNodes
 * by calling /fuel-life/createNodes(deadOrLive) for 'dead' and 'live'.
 * @param {string} fuelPrefix 
 * @returns 
 */
export function createDagNodes(fuelPrefix='') {
    // Convert node templates into definition objects
    const defs = []
    for(let t of nodeTemplates)
        defs.push({key: t[0], value: t[1], units: t[2], updater: t[3], suppliers: t[4]})
    
    // Customize definitions with module prefix
    for(let def of defs) {
        def.key = fuelPrefix + def.key
        for (let i=0; i<def.suppliers.length; i++) {
            def.suppliers[i] = fuelPrefix + def.suppliers[i]
        }
    }

    // Create the DagNodes
    const nodes = []
    for(let def of defs) {
        nodes.push(new DagNode(def.key, def.value, def.units)
            .depends(def.updater, def.suppliers))
    }
    return nodes
}