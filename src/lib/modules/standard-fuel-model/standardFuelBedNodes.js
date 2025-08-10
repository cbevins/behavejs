/**
 * Returns nodes for a surface-bed module whose inbput elements are assigned
 * from a standard fuel model module.
 * 
 * @param {string} modId 
 * @param {string} fuelId 
 */
import { Dag, K, U, Util } from '../index.js'
import { fuelElementNodes } from "../fuel-common/fuelElementNodes.js"

export function standardFuelBedNodes(modId, fuelId, moisId) {

    // Get the common nodes with default constant value
    const common = fuelElementNodes(modId)

    const dead = modId + K.dead + '/'
    const live = modId + K.live + '/'
    const d1 = dead+'element/1/'
    const d2 = dead+'element/2/'
    const d3 = dead+'element/3/'
    const d4 = dead+'element/4/'
    const l1 = live+'element/1/'
    const l2 = live+'element/2/'

    // modified nodes
    const mods = [
        [modId+K.depth, 1, U.depth, Dag.assign, [fuelId+K.fmdepth]],
        [modId+K.mext, 1, U.mois, Dag.assign, [fuelId+K.fmmext]],

        [d1+K.type, 'dead 1-h', K.ftype, Dag.constant, []],
        [d1+K.load, 0, U.load, Dag.assign, [fuelId+K.fmload1]],
        [d1+K.savr, 1, U.savr, Dag.assign, [fuelId+K.fmsavr1]],
        [d1+K.mois, 1, U.mois, Dag.assign, [moisId+K.md1]],
    
        [d2+K.type, 'dead 10-h', U.type, Dag.constant, []],
        [d2+K.load, 0, U.load, Dag.assign, [fuelId+K.fmload10]],
        [d2+K.savr, 109, U.load, Dag.constant, []],
        [d2+K.mois, 1, U.mois, Dag.assign, [moisId+K.md10]],

        [d3+K.type, 'dead 100-h', U.type, Dag.constant, []],
        [d3+K.load, 0, U.load, Dag.assign, [fuelId+K.fmload100]],
        [d3+K.savr, 30, U.load, Dag.constant, []],
        [d3+K.mois, 1, U.mois, Dag.assign, [moisId+K.md100]],

        [d4+K.type, 'cured herb', U.type, Dag.constant, []],
        [d4+K.load, 0, U.load, Dag.assign, [fuelId+K.fmdloadherb]], // NOTE - use cured herb load
        [d4+K.savr, 1, U.savr, Dag.assign, [fuelId+K.fmsavrherb]],  // NOTE - retain live savr value
        [d4+K.mois, 1, U.mois, Dag.assign, [moisId+K.md1]],         // NOTE - use fuel's dead 1-h moisture

        [l1+K.type, 'live herb', U.type, Dag.constant, []],
        [l1+K.load, 0, U.load, Dag.assign, [fuelId+K.fmliveherb]],  // NOTE - used uncured herb load f+K.fmliveherb+K.load
        [l1+K.savr, 1, U.savr, Dag.assign, [fuelId+K.savrherb]],
        [l1+K.mois, 1, U.mois, Dag.assign, [moisId+K.mherb]],

        [l2+K.type, 'live stem', U.type, Dag.constant, []],
        [l2+K.load, 0, U.load, Dag.assign, [fuelId+K.fmloadstem]],
        [l2+K.savr, 1, U.savr, Dag.assign, [fuelId+K.fmsavrstem]],
        [l2+K.mois, 1, U.mois, Dag.assign, [moisId+K.mstem]]
    ]
    // Dead element life and heat
    for(let p of [d1, d2, d3, d4]) {
        mods.push(
            [p+K.life, K.dead, U.life, Dag.constant, []],
            [p+K.heat, 0, U.heat, Dag.assign, [fuelId+K.fmheatdead]])
    }
    // Live element life and heat
    for(let p of [l1, l2]) {
        mods.push(
            [p+K.life, K.live, U.life, Dag.constant, []],
            [p+K.heat, 0, U.heat, Dag.assign, [fuelId+K.fmheatlive]])
    }
    // All element density, seff, and stot
    for(let p of [d1, d2, d3, d4, l1, l2]) {
        mods.push(
            [p+K.dens, 32, U.dens, Dag.constant, []],
            [p+K.seff, 0.01, U.seff, Dag.constant, []],
            [p+K.stot, 0.0555, U.stot, Dag.constant, []])
    }
    const set = new Set([...common, ...mods])
    return set.values()
}

const nodes = standardFuelBedNodes('bed/', 'standard/', 'moisture/')
const map = Util.nodesToMap(nodes)
console.log(Util.listNodeMap(map))
