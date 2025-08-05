/**
 * @file Behave '/particle/' DagNode definitions and creator method.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 * 
 * The '/fuel/bed/{life}/particle' DagNodes define the characteristics
 * of a specific dead or live fuel particle type per Rothermel (1972) and BehavePlus V6.
 */
import {Calc} from './Calc.js'
import {FuelElementEquations as Eq} from './FuelElementEquations.js'
import {
    dens, efol, efwl, ehn, heat, qig, load, mois, net, sa, savr, sawf, scar,
    scwf, size, seff, stot, vol,
    _dens, _efol, _efwl, _ehn, _heat, _qig, _load, _mois, _net, _sa, _savr,
    _sawf, _scwf, _size, _seff, _stot, _vol,
} from './standardKeys.js'

// 'prefix' is 'surface/primary', 'surface/secondary', or 'crown/canopy'
// life must be 'dead' or 'live'
// 'n' must be '1', '2', '3', '4', or '5'
export function fuelElementNodes(prefix, deadOrLive, n) {
    const bed  = prefix + '/fuel/bed/'
    const dead = prefix + '/fuel/dead/'
    const live = prefix + '/fuel/live/'
    const life = prefix + '/fuel/'+deadOrLive
    const p    = life + '/element ' + n + '/'
    // The following keys are only used by this file
    const diam = 'cylindrical diameter'
    const leng = 'cylindrical length'
    const _diam = 'fuel/diameter'            // ft
    const _leng = 'fuel/length'             // ft

    return [
        // input characteristics
        [p+'type', '', '/fuel/element type', null, []],
        [p+'life', 'dead', '/fuel/life', null, []],
        [p+load, 0, _load, null, []],
        [p+savr, 1, _savr, null, []],
        [p+heat, 8000, _heat, null, []],
        [p+dens, 32, _dens, null, []],
        [p+seff, 0.01, _seff, null, []],
        [p+stot, 0.0555, _stot, null, []],
        [p+mois, 1, _mois, null, []],
        // derived characteristics
        [p+ehn, 0, _ehn, Eq.effectiveHeatingNumber, [p+savr]],

        [p+efol, 0, _load, Eq.effectiveFuelLoad, [p+savr, p+load, p+'life']],

        [p+qig, 0, _qig, Eq.heatOfPreignition, [p+mois, p+ehn]],

        [p+net, 0, _load, Eq.netOvendryLoad, [p+load, p+stot]],

        [p+size, 0, _size, Eq.sizeClass, [p+savr]],

        [p+scwf, 0, _scwf, Eq.sizeClassWeightingFactor, [
                p+size,             // element's size class index
                life+'/'+scar]],    // into this size class weighting array

        [p+sa, 0, _sa, Eq.surfaceArea, [p+load, p+savr, p+dens]],

        [p+sawf, 0, _sawf, Eq.surfaceAreaWeightingFactor, [p+sa, life+'/'+sa]],

        [p+vol, 0, _vol, Eq.volume, [p+load, p+dens]],

        [p+efwl, 0, _efwl, Eq.effectiveFuelWaterLoad, [p+efol, p+mois]],

        [p+diam, 0, _diam, Eq.cylindricalDiameter, [p+savr]],
        [p+leng, 0, _leng, Eq.cylindricalLength, [p+diam, p+vol]],
    ]
}
