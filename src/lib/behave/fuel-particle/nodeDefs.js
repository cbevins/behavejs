/**
 * @file Behave '/particle/' DagNode definitions and creator method.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 * 
 * The '/fuel/bed/{life}/particle' DagNodes define the characteristics
 * of a specific dead or live fuel particle type per Rothermel (1972) and BehavePlus V6.
 */
import {Calc, Dag, DagNode} from '../index.js'
import {Equations as Eq} from './equations.js'

// life must be 'dead' or 'live'
// 'n' must be '1', '2', '3', '4', or '5'
export function nodeTemplates(life, n) {
    const p = `/${life}/particle/class ${n}`
    return [
        // input characteristics
        [p+'/ovendry load/total', 0, '/fuel/ovendry load', null, []],

        [p+'/surface area to volume ratio', 1, '/fuel/surface area to volume ratio', null, []],

        [p+'/heat of combustion', 8000, '/fuel/heat of combustion', null, []],

        [p+'/fiber density', 32, '/fuel/fiber density', null, []],

        [p+'/mineral content/effective', 0.01, '/fuel/mineral content', null, []],

        [p+'/mineral content/total', 0.0555, '/fuel/mineral content', null, []],

        [p+'/moisture content', 1, '/fuel/moisture content', null, []],

        // derived characteristics
        [p+'/effective heating number', 0, '/fuel/effective heating number',
            Eq.effectiveHeatingNumber, [p+'/surface area to volume ratio']],

        [p+'/ovendry load/effective', 0, '/fuel/ovendry load',
            Eq.effectiveFuelLoad, [
                p+'/surface area to volume ratio',
                p+'/ovendry load/total',
                life]],

        [p+'/heeat of pre-ignition', 0, '/fuel/heat of pre-ignition',
            Eq.heatOfPreignition, [
                p+'/moisture content',
                p+'/effective heating number']],

        [p+'/ovendry load/net', 0, '/fuel/ovendry load',
            Eq.netOvendryLoad, [
                p+'/ovendry load/total',
                p+'/mineral content/total']],

        [p+'/size class', 0, '/fuel/size class',
            Eq.sizeClass, [p+'/surface area to volume ratio']],

        [p+'/size class/weighting factor', 0, '/fuel/weighting factor',
            Eq.sizeClassWeightingFactor, [
                p+'size class', // size class index
                `${life}/sizeClass/weightingFactor`]],  // into this array

        [p+'surface area', 0, 'fuel/surface area',
            Eq.surfaceArea, [
                p+'/ovendry load/total',
                p+'/surface area to volume ratio',
                p+'/fiber density']],

        [p+'/surface area/weighting factor', 0, '/fuel/weighting factor',
            Eq.surfaceAreaWeightingFactor, [
                p+'surface area',
                `${life}/surface area`]],   // total life surface area

        [p+'/volume', 0, '/fuel/volume',
            Eq.volume, [
                p+'/ovendry load/total',
                p+'/fiber density']],

        [p+'/effective fuel water load', 0, '/fuel/water load',
            Eq.effectiveFuelWaterLoad, [
                p+'/ovendry load/effective',
                p+'/moisture content']],
    ]
}
