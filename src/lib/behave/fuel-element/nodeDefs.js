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

// 'prefix' is 'surface/primary', 'surface/secondary', or 'crown/canopy'
// life must be 'dead' or 'live'
// 'n' must be '1', '2', '3', '4', or '5'
export function fuelElementNodeDefs(prefix, deadOrLive, n) {
    console.log(prefix)
    const bed = prefix + '/fuel/bed/'
    const dead = prefix + '/fuel/dead/'
    const live = prefix + '/fuel/live/'
    const life = prefix + '/fuel/'+deadOrLive
    const p = life + '/element ' + n + '/'
    const dens = 'fiber density'
    const diam = 'cylindrical diameter'
    const efol = 'effective fuel ovendry load'
    const efwl = 'effective fuel water load'
    const ehn  = 'effective heating  number'
    const heat = 'heat of combustion'
    const qig  = 'heat of pre-ignition'
    const load = 'ovendry load'
    const mois = 'moisture content'
    const net  = 'net ovendry load'
    const sa   = 'surface area'
    const savr = 'surface area to volume ratio'
    const sawf = 'surface area weighting factor'
    const scwf = 'size class weighting factor'
    const size = 'size class'
    const seff = 'effective mineral content'
    const stot = 'total mineral content'
    const vol  = 'volume'

    return [
        // input characteristics

        // 'dead woody', 'live herb', 'live stem', 'cured', 'duff', 'litter'
        // used to get correct moisture content and curing method
        [p+'type', 'dead woody', '/fuel/element type', null, []],

        [p+'life', 'dead', '/fuel/life', null, []],

        [p+load, 0, '/fuel/'+load, null, []],

        [p+savr, 1, '/fuel/'+savr, null, []],

        [p+heat, 8000, '/fuel/'+heat, null, []],

        [p+dens, 32, '/fuel/'+dens, null, []],

        [p+seff, 0.01, '/fuel/mineral content', null, []],

        [p+stot, 0.0555, '/fuel/mineral content', null, []],

        [p+mois, 1, '/fuel/'+mois, null, []],

        // derived characteristics
        [p+ehn, 0, '/fuel/'+ehn, Eq.effectiveHeatingNumber, [p+savr]],

        [p+efol, 0, '/fuel/'+load, Eq.effectiveFuelLoad, [p+savr, p+load, p+'life']],

        [p+qig, 0, '/fuel/'+qig, Eq.heatOfPreignition, [p+mois, p+ehn]],

        [p+net, 0, '/fuel/'+load, Eq.netOvendryLoad, [p+load, p+stot]],

        [p+size, 0, '/fuel/'+size, Eq.sizeClass, [p+savr]],

        [p+scwf, 0, '/fuel/weighting factor',
            Eq.sizeClassWeightingFactor, [
                p+size, // size class index
                life+'/size class weighting factor array']], // into this array

        [p+sa, 0, 'fuel/'+sa, Eq.surfaceArea, [p+load, p+savr, p+dens]],

        [p+sawf, 0, '/fuel/weighting factor', Eq.surfaceAreaWeightingFactor, [p+sa, life+'/'+sa]],

        [p+vol, 0, '/fuel/volume', Eq.volume, [p+load, p+dens]],

        [p+efwl, 0, '/fuel/water load',
            Eq.effectiveFuelWaterLoad, [p+efol, p+mois]],

        // [p+diam, 0, '/fuel/diameter', Eq.cylindricalDiameter, [p.savr]],
        // [p+'cylindricalLength', 0, '/fuel/length', Eq.cylindricalLength, [p.diam, p.vol]],
    ]
}
