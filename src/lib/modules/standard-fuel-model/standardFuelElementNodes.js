/**
 * Returns nodes for a surface-bed module whose input elements are assigned
 * from a standard fuel model module and a moisture module.
 * 
 * @param {string} bed 
 * @param {string} fuel 
 */
import { Dag, L, U } from '../index.js'
import { surfaceDefaultElementNodes, SurfaceElementEquations as Eq } from "../index.js"

/**
 * @param {string} bed Module pathway prefixed to all the returned nodes' keys
 * @param {string} fuel Path of the Fuel Model Module to be applied
 * @param {string} mois Path of the Moisture Module to be applied
 * @returns Array of surface fuel bed module element property nodes
 * assigned to their *fuel* and *mois* counterparts
 */
export function standardFuelElementNodes(bed, fuel, mois) {
    // Get the common nodes with default constant value
    const common = surfaceDefaultElementNodes(bed)

    const dead = bed + L.dead + '/'
    const live = bed + L.live + '/'
    const d1 = dead+'element/1/'
    const d2 = dead+'element/2/'
    const d3 = dead+'element/3/'
    const d4 = dead+'element/4/'
    const l1 = live+'element/1/'
    const l2 = live+'element/2/'

    // modified nodes
    const mods = [
        [bed+L.depth, 1, U.depth, Dag.assign, [fuel+L.fmdepth]],
        [bed+L.mext, 1, U.mois, Dag.assign, [fuel+L.fmmext]],

        [d1+L.type, 'dead 1-h', U.ftype, Dag.constant, []],
        [d1+L.load, 0, U.load, Dag.assign, [fuel+L.fmload1]],
        [d1+L.savr, 1, U.savr, Dag.assign, [fuel+L.fmsavr1]],
        [d1+L.mois, 1, U.mois, Dag.assign, [mois+L.m1]],
    
        [d2+L.type, 'dead 10-h', U.ftype, Dag.constant, []],
        [d2+L.load, 0, U.load, Dag.assign, [fuel+L.fmload10]],
        [d2+L.savr, 109, U.load, Dag.constant, []],
        [d2+L.mois, 1, U.mois, Dag.assign, [mois+L.m10]],

        [d3+L.type, 'dead 100-h', U.ftype, Dag.constant, []],
        [d3+L.load, 0, U.load, Dag.assign, [fuel+L.fmload100]],
        [d3+L.savr, 30, U.load, Dag.constant, []],
        [d3+L.mois, 1, U.mois, Dag.assign, [mois+L.m100]],

        [d4+L.type, 'cured herb', U.ftype, Dag.constant, []],
        [d4+L.load, 0, U.load, Eq.curedHerbLoad, [fuel+L.fmloadherb, bed+L.cured]],
        [d4+L.savr, 1, U.savr, Dag.assign, [fuel+L.fmsavrherb]],  // NOTE - retain live savr value
        [d4+L.mois, 1, U.mois, Dag.assign, [mois+L.m1]],         // NOTE - use fuel's dead 1-h moisture

        [l1+L.type, 'live herb', U.ftype, Dag.constant, []],
        [l1+L.load, 0, U.load, Eq.uncuredHerbLoad, [fuel+L.fmloadherb, bed+L.cured]],
        [l1+L.savr, 1, U.savr, Dag.assign, [fuel+L.fmsavrherb]],
        [l1+L.mois, 1, U.mois, Dag.assign, [mois+L.mherb]],

        [l2+L.type, 'live stem', U.ftype, Dag.constant, []],
        [l2+L.load, 0, U.load, Dag.assign, [fuel+L.fmloadstem]],
        [l2+L.savr, 1, U.savr, Dag.assign, [fuel+L.fmsavrstem]],
        [l2+L.mois, 1, U.mois, Dag.assign, [mois+L.mstem]]
    ]

    // Dead element life and heat
    for(let p of [d1, d2, d3, d4]) {
        mods.push(
            [p+L.life, L.dead, U.life, Dag.constant, []],
            [p+L.heat, 0, U.heat, Dag.assign, [fuel+L.fmheatdead]])
    }
    // Live element life and heat
    for(let p of [l1, l2]) {
        mods.push(
            [p+L.life, L.live, U.life, Dag.constant, []],
            [p+L.heat, 0, U.heat, Dag.assign, [fuel+L.fmheatlive]])
    }
    // All element density, seff, and stot
    for(let p of [d1, d2, d3, d4, l1, l2]) {
        mods.push(
            [p+L.dens, 32, U.dens, Dag.constant, []],
            [p+L.seff, 0.01, U.seff, Dag.constant, []],
            [p+L.stot, 0.0555, U.stot, Dag.constant, []])
    }
    
    const map = new Map()
    for(let node of [...common, ...mods]) {
        map.set(node[0], node)
    }
    return map.values()
}
