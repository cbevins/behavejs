/**
 * @file Behavejs 'fuel/element n/' Dag node definitions.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 * 
 * The '/fuel/bed/{life}/element n/' DagNodes define the characteristics
 * of a specific dead or live fuel particle type per Rothermel (1972) and BehavePlus V6.
 */
import {Calc, Dag, StandardFuelModels as Eq, K, Util} from '../index.js'

/**
 * 
 * @param {string} f is 'surface/fuel/1', 'surface/fuel/1', or 'crown/canopy' 
 * @param {*} method 
 * @returns 
 */
export function fuelStandardModelNodes(f, method=null) {
    const bed = f + K.bed
    const dead = f + K.dead
    const live = f + K.live
    const fm = f+K.fm
    const key = fm + K.fmkey

    // -------------------------------------------------------------------------
    // The following internal nodes are for using Standard Fuel Models
    // and need no further submodule modifications.
    // -------------------------------------------------------------------------

    const standardNodes = [
        [key, '', K._fmkey, Dag.input, []],
        [f+K.fm+K.fmcured, 0, K._fraction, Dag.input, []],
        [f+K.fm+K.fmnumb, 0, K._fmnumb, Eq.code, [key]],
        [f+K.fm+K.fmcode, 'none', K._fmcode, Eq.number, [key]],
        [f+K.fm+K.fmlabel, '', K._fmlabel, Eq.label, [key]],
        [f+K.fm+K.depth, 1, K._depth, Eq.depth, [key]],
        [f+K.fm+K.mext, 0.25, K._mois, Eq.mext, [key]],
        [f+K.fmh1+K.load, 0, K._load, Eq.load1, [key]],
        [f+K.fmh10+K.load, 0, K._load, Eq.load10, [key]],
        [f+K.fmh100+K.load, 0, K._load, Eq.load100, [key]],
        [f+K.fmherbtot+K.load, 0, K._load, Eq.loadHerb, [key]],
        [f+K.fmlivestem+K.load, 0, K._load, Eq.loadStem, [key]],
        [f+K.fmh1+K.savr, 1, K._savr, Eq.savr1, [key]],
        [f+K.fmliveherb+K.savr, 1, K._savr, Eq.savrHerb, [key]],
        [f+K.fmlivestem+K.savr, 1, K._savr, Eq.savrStem, [key]],
        [f+K.fmdead+K.heat, 8000, K._heat, Eq.heatDead, [key]],
        [f+K.fmlive+K.heat, 8000, K._heat, Eq.heatLive, [key]],
    ]

    if (method) {   // make all nodes either Dag.input or Dag.constant
        for(let node of standardNodes) {
            node[3] = method
            node[4] = []
        }
    }

    const derivedNodes = [
        [f+K.fmdeadherb+K.load, 0, K._load, Eq.loadCured, [key, f+K.fm+K.fmcured]],
        [f+K.fmliveherb+K.load, 0, K._load, Eq.loadUncured, [key, f+K.fm+K.fmcured]]
    ]

    return Util.nodesToMap([...standardNodes, ...derivedNodes])
}

/**
 * Returns a subset Map() of {prefix}/fuel/{life}/element {n} nodes
 * that are now assigned to fuel model nodes and fuel/moisture nodes.
 * The returned subset Map must be merged with the larger Map.
 * @param {string} f is 'surface/fuel/1', 'surface/fuel/1', or 'crown/canopy' 
 * @returns 
 */
export function linkSurfaceFuel2StandardModel(f) {
    const bed = f + K.bed
    const dead = f + K.dead
    const live = f + K.live
    const key = fm + K.fmkey

    let p = f + K.dead1
    const p1 = [    // dead 1-h
        [p+K.type, 'dead 1-h', K._type, Dag.constant, []],
        [p+K.life, dead, K._life, Dag.constant, []],
        [p+K.load, 0, K._load, Dag.assign, [f+K.fmh1+K.load]],
        [p+K.savr, 1, K._savr, Dag.assign, [f+K.fmh1+K.savr]],
        [p+K.heat, 8000, K._heat, Dag.assign, [f+K.fmdead+K.heat]],
        [p+K.mois, 1, K._mois, Dag.assign, [f+K.fuelmoisdead+K.h1]],
        [p+K.dens, 32, K._dens, Dag.constant, []],
        [p+K.seff, 0.01, K._seff, Dag.constant, []],
        [p+K.stot, 0.0555, K._stot, Dag.constant, []]
    ]
    p = f + K.dead2
    const p2 = [    // dead 10-h
        [p+K.type, 'dead 10-h', K._type, Dag.constant, []],
        [p+K.life, dead, K._life, Dag.constant, []],
        [p+K.load, 0, K._load, Dag.assign, [f+K.fmh10+K.load]],
        [p+K.savr, 109, K._load, Dag.constant, []],
        [p+K.heat, 8000, K._heat, Dag.assign, [f+K.fmdead+K.heat]],
        [p+K.mois, 1, K._mois, Dag.assign, [f+K.fuelmoisdead+K.h10]],
        [p+K.dens, 32, K._dens, Dag.constant, []],
        [p+K.seff, 0.01, K._seff, Dag.constant, []],
        [p+K.stot, 0.0555, K._stot, Dag.constant, []]
    ]
    p = f + K.dead3
    const p3 = [    // dead 100-h
        [p+K.type, 'dead 100-h', K._type, Dag.constant, []],
        [p+K.life, dead, K._life, Dag.constant, []],
        [p+K.load, 0, K._load, Dag.assign, [f+K.fmh100+K.load]],
        [p+K.savr, 30, K._load, Dag.constant, []],
        [p+K.heat, 8000, K._heat, Dag.assign, [f+K.fmdead+K.heat]],
        [p+K.mois, 1, K._mois, Dag.assign, [f+K.fuelmoisdead+K.h100]],
        [p+K.dens, 32, K._dens, Dag.constant, []],
        [p+K.seff, 0.01, K._seff, Dag.constant, []],
        [p+K.stot, 0.0555, K._stot, Dag.constant, []]
    ]
    p = f + K.dead4
    const p4 = [    // special derived class for cured herb
        [p+K.type, 'cured herb', K._type, Dag.constant, []],
        [p+K.life, dead, K._life, Dag.constant, []],
        [p+K.load, 0, K._load, Dag.assign, [f+K.fmdeadherb+K.load]],   // NOTE - use cured herb load
        [p+K.savr, 1, K._savr, Dag.assign, [f+K.fmliveherb+K.savr]],   // NOTE - retain live savr value
        [p+K.heat, 8000, K._heat, Dag.assign, [f+K.dead+K.heat]],      // NOTE - use dead heat
        [p+K.mois, 1, K._mois, Dag.assign, [f+K.fuelmoisdead+K.h1]],     // NOTE - use fuel's dead 1-h moisture
        [p+K.dens, 32, K._dens, Dag.constant, []],
        [p+K.seff, 0.01, K._seff, Dag.constant, []],
        [p+K.stot, 0.0555, K._stot, Dag.constant, []]
    ]
    p = f + K.live1
    const p5 = [    // special derived class for uncured herb
        [p+K.type, 'live herb', K._type, Dag.constant, []],
        [p+K.life, 'live', K._life, Dag.constant, []],
        [p+K.load,     0, K._load, Dag.assign, [f+K.fmliveherb+K.load]],   // NOTE - used uncured herb load f+K.fmliveherb+K.load
        [p+K.savr,     1, K._savr, Dag.assign, [f+K.fmliveherb+K.savr]],
        [p+K.heat,  8000, K._heat, Dag.assign, [f+K.live+K.heat]],
        [p+K.mois, 1, K._mois, Dag.assign, [f+K.fuelmoislive+K.herb]],
        [p+K.dens, 32, K._dens, Dag.constant, []],
        [p+K.seff, 0.01, K._seff, Dag.constant, []],
        [p+K.stot, 0.0555, K._stot, Dag.constant, []]
    ]
    p = f + K.live2
    const p6 = [    // Live stem
        [p+K.type, 'live stem', K._type, Dag.constant, []],
        [p+K.life, live, K._life, Dag.constant, []],
        [p+K.load, 0, K._load, Dag.assign, [f+K.fmlivestem+K.load]],
        [p+K.savr, 1, K._savr, Dag.assign, [f+K.fmlivestem+K.savr]],
        [p+K.heat, 8000, K._heat, Dag.assign, [f+K.live+K.heat]],
        [p+K.mois, 1, K._mois, Dag.assign, [f+K.fuelmoislive+K.stem]],
        [p+K.dens, 32, K._dens, Dag.constant, []],
        [p+K.seff, 0.01, K._seff, Dag.constant, []],
        [p+K.stot, 0.0555, K._stot, Dag.constant, []]
    ]

    const b = [
        [f+K.bed+K.depth, 1, K._depth, Dag.assign, [f+K.fm+K.depth]],
        [f+K.dead+K.mext, 1, K._mois, Dag.assign, [f+K.fm+K.mext]],
    ]

    return Util.nodesToMap([...p1, ...p2, ...p3, ...p4, ...p5, ...p6, ...b])
}
