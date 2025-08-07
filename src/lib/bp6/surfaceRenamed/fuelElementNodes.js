/**
 * @file Behave '/particle/' DagNode definitions and creator method.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 */
import {Calc, Dag, FuelElementEquations as Eq, K} from '../index.js'

/**
 * Returns a single fuel element definition whose root (input) nodes are
 * initialized as constants with default 'unused' element values.
 *
 * The following nodes' update method should be changed from Dag.constant
 * by one or more external submodules:
 * - /fuel/dead/mext
 * 
 * @param {string} f is 'surface/fuel/1', 'surface/fuel/1', or 'crown/canopy'
 * @param {string} deadOrLive 'dead' or 'llive'
 * @param {string} n must be '1', '2', '3', '4', or '5'
 * @param {string} ftype is like 'dead 1-h' ,'dead 10-h', 'dead-100h', 'cured herb', 'live herb', 'live stem'
 * @param {function} method is either Dag.constant() or Dag.input()
 * @returns An array of 21 fuel element property nodes
 */
export function fuelElementNodes(f, deadOrLive, n, ftype='unused', method=Dag.constant) {
    const bed = f + K.bed
    const dead = f + K.dead
    const live = f + K.live
    const lcat = deadOrLive === 'dead' ? f+K.dead : f+K.live
    const p    = lcat + 'element/' + n + '/'

    // The following node's update method should be changed from Dag.constant
    // by one or more external submodules:
    const externalNodes = [
        // 8 root (input) characteristics
        [p+K.type, ftype, K._type, method, []],
        [p+K.load, 0, K._load, method, []],
        [p+K.savr, 1, K._savr, method, []],
        [p+K.heat, 0, K._heat, method, []],
        [p+K.dens, 0, K._dens, method, []],
        [p+K.seff, 0, K._seff, method, []],
        [p+K.stot, 0, K._stot, method, []],
        [p+K.mois, 1, K._mois, method, []],
    ]

    const internalNodes = [
        // 1 constant node
        [p+K.life, deadOrLive, K._life, Dag.constant, []],

        // 12 derived characteristics
        [p+K.ehn, 0, K._ehn, Eq.effectiveHeatingNumber, [p+K.savr]],

        [p+K.efol, 0, K._load, Eq.effectiveFuelLoad, [p+K.savr, p+K.load, p+K.life]],

        [p+K.qig, 0, K._qig, Eq.heatOfPreignition, [p+K.mois, p+K.ehn]],

        [p+K.net, 0, K._load, Eq.netOvendryLoad, [p+K.load, p+K.stot]],

        [p+K.size, 0, K._size, Eq.sizeClass, [p+K.savr]],

        [p+K.scwf, 0, K._scwf, Eq.sizeClassWeightingFactor, [
                p+K.size,             // element's size class index
                lcat+K.scar]],    // into this size class weighting array

        [p+K.sa, 0, K._sa, Eq.surfaceArea, [p+K.load, p+K.savr, p+K.dens]],

        [p+K.sawf, 0, K._sawf, Eq.surfaceAreaWeightingFactor, [p+K.sa, lcat+K.sa]],

        [p+K.vol, 0, K._vol, Eq.volume, [p+K.load, p+K.dens]],

        [p+K.efwl, 0, K._efwl, Eq.effectiveFuelWaterLoad, [p+K.efol, p+K.mois]],

        [p+K.diam, 0, K._diam, Eq.cylindricalDiameter, [p+K.savr]],

        [p+K.leng, 0, K._leng, Eq.cylindricalLength, [p+K.diam, p+K.vol]],
    ]
    return [...externalNodes, ...internalNodes]
}
