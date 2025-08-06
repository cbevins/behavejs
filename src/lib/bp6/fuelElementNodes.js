/**
 * @file Behave '/particle/' DagNode definitions and creator method.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 */
import {Calc, Dag, FuelElementEquations as Eq, Util} from './index.js'
import {
    dens, efol, efwl, ehn, heat, qig, load, mois, net, sa, savr, sawf, scar,
    scwf, size, seff, stot, vol,
    _dens, _efol, _efwl, _ehn, _heat, _qig, _load, _mois, _net, _sa, _savr,
    _sawf, _scwf, _size, _seff, _stot, _vol,
} from './standardKeys.js'

// The following keys are only used by this file
const diam = 'cylindrical diameter'
const leng = 'cylindrical length'
const type = 'type'
const life = 'life'
const _diam = 'fuel/diameter'            // ft
const _leng = 'fuel/length'             // ft
const _type = 'fuel/type'
const _life = 'fuel/life'

/**
 * Returns a single fuel element definition using 0 load and default values.
 * @param {string} prefix 'surface/primary', 'surface/secondary', or 'crown/canopy'
 * @param {string} deadOrLive 'dead' or 'llive'
 * @param {string} n must be '1', '2', '3', '4', or '5'
 * @param {string} ftype is like 'dead 1-h' ,'dead 10-h', 'dead-100h', 'cured herb', 'live herb', 'live stem'
 * @param {function} method is either Dag.constant() or Dag.input()
 * @returns 
 */
export function fuelElementNodes(prefix, deadOrLive, n, ftype='', method=Dag.constant) {
    const bed  = prefix + '/fuel/bed/'
    const dead = prefix + '/fuel/dead/'
    const live = prefix + '/fuel/live/'
    const lcat = prefix + '/fuel/'+deadOrLive
    const p    = lcat + '/element ' + n + '/'
    const nodes = [
        // input characteristics
        [p+type, ftype, _type, method, []],
        [p+life, deadOrLive, _life, method, []],
        [p+load,      0, _load, method, []],
        [p+savr,      1, _savr, method, []],
        [p+heat,   8000, _heat, method, []],
        [p+dens,     32, _dens, method, []],
        [p+seff,   0.01, _seff, method, []],
        [p+stot, 0.0555, _stot, method, []],
        [p+mois,      1, _mois, method, []],

        // derived characteristics
        [p+ehn, 0, _ehn, Eq.effectiveHeatingNumber, [p+savr]],

        [p+efol, 0, _load, Eq.effectiveFuelLoad, [p+savr, p+load, p+life]],

        [p+qig, 0, _qig, Eq.heatOfPreignition, [p+mois, p+ehn]],

        [p+net, 0, _load, Eq.netOvendryLoad, [p+load, p+stot]],

        [p+size, 0, _size, Eq.sizeClass, [p+savr]],

        [p+scwf, 0, _scwf, Eq.sizeClassWeightingFactor, [
                p+size,             // element's size class index
                lcat+'/'+scar]],    // into this size class weighting array

        [p+sa, 0, _sa, Eq.surfaceArea, [p+load, p+savr, p+dens]],

        [p+sawf, 0, _sawf, Eq.surfaceAreaWeightingFactor, [p+sa, lcat+'/'+sa]],

        [p+vol, 0, _vol, Eq.volume, [p+load, p+dens]],

        [p+efwl, 0, _efwl, Eq.effectiveFuelWaterLoad, [p+efol, p+mois]],

        [p+diam, 0, _diam, Eq.cylindricalDiameter, [p+savr]],
        [p+leng, 0, _leng, Eq.cylindricalLength, [p+diam, p+vol]],
    ]
    return Util.nodesToMap(nodes)
}
