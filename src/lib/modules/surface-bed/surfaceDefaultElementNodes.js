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
 * 
 * @param {string} path Module pathway prefixed to all the returned nodes' keys
 * @returns Array of surface fuel bed module node definitions
*/
import {Calc, Dag, L, U} from '../index.js'
import { SurfaceElementEquations as Eq } from './SurfaceElementEquations.js'

export function surfaceDefaultElementNodes(path) {
    const meta = [
        [path+L.mmod, 'common fuel elements', U.text, Dag.constant, []],
        [path+L.mver, '1', U.text, Dag.constant, []],
    ]
    let nodes = [
        [path+L.depth, 1, U.depth, Dag.constant, []],
        [path+L.mext, 1, U.mext, Dag.constant, []],
    ]
    for(let life of [L.dead, L.live]) {
        for(let el of ['1', '2', '3', '4', '5']) {
            nodes = nodes.concat(surfaceDefaultElementNode(path, life, el))
        }
    }
    return [...meta, ...nodes].sort()
}
/**
 * @param {string} path
 * @param {string} life 'dead' or 'llive'
 * @param {string} n must be '1', '2', '3', '4', or '5'
 * @returns An array of 21 fuel element property nodes
*/
export function surfaceDefaultElementNode(path, life, n) {
    const lcat = path + life + '/'
    const p    = lcat + 'element/' + n + '/'

    const externalNodes = [
        // 8 root (input) characteristics
        [p+L.type, 'unused', U.ftype, Dag.constant, []],
        [p+L.load, 0, U.load, Dag.constant, []],
        [p+L.savr, 1, U.savr, Dag.constant, []],
        [p+L.heat, 0, U.heat, Dag.constant, []],
        [p+L.dens, 0, U.dens, Dag.constant, []],
        [p+L.seff, 0, U.seff, Dag.constant, []],
        [p+L.stot, 0, U.stot, Dag.constant, []],
        [p+L.mois, 1, U.mois, Dag.constant, []],
    ]

    const internalNodes = [
        // 1 constant node
        [p+L.life, life, U.life, Dag.constant, []],

        // 12 derived characteristics
        [p+L.ehn, 0, U.ehn, Eq.effectiveHeatingNumber, [p+L.savr]],

        [p+L.efol, 0, U.load, Eq.effectiveFuelLoad, [p+L.savr, p+L.load, p+L.life]],

        [p+L.qig, 0, U.qig, Eq.heatOfPreignition, [p+L.mois, p+L.ehn]],

        [p+L.net, 0, U.load, Eq.netOvendryLoad, [p+L.load, p+L.stot]],

        [p+L.size, 0, U.size, Eq.sizeClass, [p+L.savr]],

        [p+L.scwf, 0, U.scwf, Eq.sizeClassWeightingFactor, [
                p+L.size,             // element's size class index
                lcat+L.scar]],    // into this size class weighting array

        [p+L.sa, 0, U.sa, Eq.surfaceArea, [p+L.load, p+L.savr, p+L.dens]],

        [p+L.sawf, 0, U.sawf, Eq.surfaceAreaWeightingFactor, [p+L.sa, lcat+L.sa]],

        [p+L.vol, 0, U.vol, Eq.volume, [p+L.load, p+L.dens]],

        [p+L.efwl, 0, U.efwl, Eq.effectiveFuelWaterLoad, [p+L.efol, p+L.mois]],

        [p+L.diam, 0, U.fleng, Eq.cylindricalDiameter, [p+L.savr]],

        [p+L.leng, 0, U.fleng, Eq.cylindricalLength, [p+L.diam, p+L.vol]],
    ]
    return [...externalNodes, ...internalNodes]
}
