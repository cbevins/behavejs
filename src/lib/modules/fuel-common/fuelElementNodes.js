/**
 * @file 
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 * 
 * This module defines a common set of fuel element properties
 * across all fuel providers, including:
 * - standard fuel models
 * - dynamic chaparral fuels per Rothermel and Philpot
 * - dynamic southern rough fuels per Albini
 * - dynamic western aspen fuels per Brown and Simmerman
 * 
 * The properties are:
 * - fuel bed depth
 * - dead fuel extinction moisture content
 * - 5 dead fuel elements
 * - 5 live fuel elements
 * 
 * These node values are all set to default constants to be modified by adapters.
*/
import {Calc, Dag, K, U, Util} from '../index.js'
import { FuelElementEquations as Eq } from './FuelElementEquations.js'

export function fuelElementNodes(modId) {
    const meta = [
        [modId+K.mmod, 'common fuel elements', U.text, Dag.constant, []],
        [modId+K.mver, '1', U.text, Dag.constant, []],
    ]
    let nodes = [
        [modId+K.depth, 1, U.depth, Dag.constant, []],
        [modId+K.mext, 1, U.mext, Dag.constant, []],
    ]
    for(let life of ['dead', 'live']) {
        for(let el of ['1', '2', '3', '4', '5']) {
            nodes = nodes.concat(fuelElementNode(modId, life, el))
        }
    }
    return [...meta, ...nodes].sort()
}
/**
 * @param {string} modId
 * @param {string} life 'dead' or 'llive'
 * @param {string} n must be '1', '2', '3', '4', or '5'
 * @returns An array of 21 fuel element property nodes
*/
export function fuelElementNode(modId, life, n) {
    const lcat = modId + life + '/'
    const p    = lcat + 'element/' + n + '/'

    const externalNodes = [
        // 8 root (input) characteristics
        [p+K.ftype, 'unused', U.ftype, Dag.constant, []],
        [p+K.load, 0, U.load, Dag.constant, []],
        [p+K.savr, 1, U.savr, Dag.constant, []],
        [p+K.heat, 0, U.heat, Dag.constant, []],
        [p+K.dens, 0, U.dens, Dag.constant, []],
        [p+K.seff, 0, U.seff, Dag.constant, []],
        [p+K.stot, 0, U.stot, Dag.constant, []],
        [p+K.mois, 1, U.mois, Dag.constant, []],
    ]

    const internalNodes = [
        // 1 constant node
        [p+K.life, life, U.life, Dag.constant, []],

        // 12 derived characteristics
        [p+K.ehn, 0, U.ehn, Eq.effectiveHeatingNumber, [p+K.savr]],

        [p+K.efol, 0, U.load, Eq.effectiveFuelLoad, [p+K.savr, p+K.load, p+K.life]],

        [p+K.qig, 0, U.qig, Eq.heatOfPreignition, [p+K.mois, p+K.ehn]],

        [p+K.net, 0, U.load, Eq.netOvendryLoad, [p+K.load, p+K.stot]],

        [p+K.size, 0, U.size, Eq.sizeClass, [p+K.savr]],

        [p+K.scwf, 0, U.scwf, Eq.sizeClassWeightingFactor, [
                p+K.size,             // element's size class index
                lcat+K.scar]],    // into this size class weighting array

        [p+K.sa, 0, U.sa, Eq.surfaceArea, [p+K.load, p+K.savr, p+K.dens]],

        [p+K.sawf, 0, U.sawf, Eq.surfaceAreaWeightingFactor, [p+K.sa, lcat+K.sa]],

        [p+K.vol, 0, U.vol, Eq.volume, [p+K.load, p+K.dens]],

        [p+K.efwl, 0, U.efwl, Eq.effectiveFuelWaterLoad, [p+K.efol, p+K.mois]],

        [p+K.diam, 0, U.diam, Eq.cylindricalDiameter, [p+K.savr]],

        [p+K.leng, 0, U.leng, Eq.cylindricalLength, [p+K.diam, p+K.vol]],
    ]
    return [...externalNodes, ...internalNodes]
}

const nodes = fuelElementNodes('common/')
const map = Util.nodesToMap(nodes)
console.log(Util.listNodeMap(map))

