import {Calc, Dag, FuelElementEquations as Eq, K} from '../index.js'
import { surfaceElementDerivedNodes } from "./surfaceElementDerivedNodes.js"

/**
 * 
 * @param {string} bedId Prefix id of the applied surface fire bed nodes
 * @param {string} fuelId Prefix id of the applied standard fuel model nodes
 * @param {string} moisId Prefix id of the applied fuel moisture nodes
 * @returns 
 */
export function surfaceElementNodesFromStandard(bedId, fuelId, moisId) {
    const bed = [
        [bedId+K.depth, 1, K._depth, Dag.assign, [fuelId+K.depth]],
        [bedId+'dead/'+K.mext, 1, K._mois, Dag.assign, [fuelId+K.mext]]
    ]

    let life = 'dead'
    let p = bedId + 'dead/element/1/'
    const d1 = [
        [p+K.type, 'dead 1-h', K._type, Dag.constant, []],
        [p+K.life, life, K._life, Dag.constant, []],
        [p+K.load, 0, K._load, Dag.assign, [fuelId+'dead/1-h/'+K.load]],
        [p+K.savr, 0, K._load, Dag.assign, [fuelId+'dead/1-h/'+K.savr]],
        [p+K.heat, 8000, K._heat, Dag.assign, [fuelId+'dead/'+K.heat]],
        [p+K.mois, 1, K._mois, Dag.assign, [moisId+'dead/1-h/'+K.mois]],
        [p+K.dens, 32, K._dens, Dag.constant, []],
        [p+K.seff, 0.01, K._seff, Dag.constant, []],
        [p+K.stot, 0.0555, K._stot, Dag.constant, []],
    ].concat(surfaceElementDerivedNodes(bedId, p, life))

    p = bedId + 'dead/element/2/'
    const d2 = [    // dead 10-h
        [p+K.type, 'dead 10-h', K._type, Dag.constant, []],
        [p+K.life, life, K._life, Dag.constant, []],
        [p+K.load, 0, K._load, Dag.assign, [fuelId+'dead/10-h/'+K.load]],
        [p+K.savr, 109, K._load, Dag.constant, []],
        [p+K.heat, 8000, K._heat, Dag.assign, [fuelId+'dead/'+K.heat]],
        [p+K.mois, 1, K._mois, Dag.assign, [moisId+'dead/10-h/'+K.mois]],
        [p+K.dens, 32, K._dens, Dag.constant, []],
        [p+K.seff, 0.01, K._seff, Dag.constant, []],
        [p+K.stot, 0.0555, K._stot, Dag.constant, []]
    ].concat(surfaceElementDerivedNodes(bedId, p, life))

    p = bedId + 'dead/element/3/'
    const d3 = [    // dead 100-h
        [p+K.type, 'dead 100-h', K._type, Dag.constant, []],
        [p+K.life, life, K._life, Dag.constant, []],
        [p+K.load, 0, K._load, Dag.assign, [fuelId+'dead/100-h/'+K.load]],
        [p+K.savr, 30, K._load, Dag.constant, []],
        [p+K.heat, 8000, K._heat, Dag.assign, [fuelId+'dead/'+K.heat]],
        [p+K.mois, 1, K._mois, Dag.assign, [moisId+'dead/100-h/'+K.mois]],
        [p+K.dens, 32, K._dens, Dag.constant, []],
        [p+K.seff, 0.01, K._seff, Dag.constant, []],
        [p+K.stot, 0.0555, K._stot, Dag.constant, []]
    ].concat(surfaceElementDerivedNodes(bedId, p, life))

    p = bedId + 'dead/element/4/'
    const d4 = [    // special derived class for cured herb
        [p+K.type, 'cured herb', K._type, Dag.constant, []],
        [p+K.life, life, K._life, Dag.constant, []],
        [p+K.load, 0, K._load, Dag.assign, [fuelId+'dead/cured herb/'+K.load]],   // NOTE - use cured herb load
        [p+K.savr, 1, K._savr, Dag.assign, [fuelId+'live/herb/'+K.savr]],   // NOTE - retain live savr value
        [p+K.heat, 8000, K._heat, Dag.assign, [fuelId+'dead/'+K.heat]],     // NOTE - use dead fuel heat of combustion
        [p+K.mois, 1, K._mois, Dag.assign, [moisId+'dead/1-h/'+K.mois]],     // NOTE - use dead fuel 1-h moisture
        [p+K.dens, 32, K._dens, Dag.constant, []],
        [p+K.seff, 0.01, K._seff, Dag.constant, []],
        [p+K.stot, 0.0555, K._stot, Dag.constant, []]
    ].concat(surfaceElementDerivedNodes(bedId, p, life))

    p = bedId + 'dead/element/5/'
    const d5 = unusedFuelElementNodes(p, life)
        .concat(surfaceElementDerivedNodes(bedId, p, life))

    life = 'live'
    // special derived class for uncured herb
    p = bedId + 'live/element/1/'
    const l1 = [
        [p+K.type, 'live herb', K._type, Dag.constant, []],
        [p+K.life, life, K._life, Dag.constant, []],
        [p+K.load, 0, K._load, Dag.assign, [fuelId+'live/herb/'+K.load]],   // NOTE - used uncured herb load f+K.fmliveherb+K.load
        [p+K.savr, 1, K._savr, Dag.assign, [fuelId+'live/herb/'+K.savr]],
        [p+K.heat, 8000, K._heat, Dag.assign, [fuelId+'live/'+K.heat]],
        [p+K.mois, 1, K._mois, Dag.assign, [moisId+'live/herb/'+K.mois]],
        [p+K.dens, 32, K._dens, Dag.constant, []],
        [p+K.seff, 0.01, K._seff, Dag.constant, []],
        [p+K.stot, 0.0555, K._stot, Dag.constant, []]
    ].concat(surfaceElementDerivedNodes(bedId, p, 'live'))

    // live stem
    p = bedId + 'live/element/2/'
    const l2 = [
        [p+K.type, 'live stem', K._type, Dag.constant, []],
        [p+K.life, life, K._life, Dag.constant, []],
        [p+K.load, 0, K._load, Dag.assign, [fuelId+'live/stem/'+K.load]],
        [p+K.savr, 1, K._savr, Dag.assign, [fuelId+'live/stem/'+K.savr]],
        [p+K.heat, 8000, K._heat, Dag.assign, [fuelId+'live/'+K.heat]],
        [p+K.mois, 1, K._mois, Dag.assign, [moisId+'live/stem/'+K.mois]],
        [p+K.dens, 32, K._dens, Dag.constant, []],
        [p+K.seff, 0.01, K._seff, Dag.constant, []],
        [p+K.stot, 0.0555, K._stot, Dag.constant, []]
    ].concat(surfaceElementDerivedNodes(bedId, p, 'live'))

    p = bedId + 'live/element/3/'
    const l3 = unusedFuelElementNodes(p, life)
        .concat(surfaceElementDerivedNodes(bedId, p, life))

    p = bedId + 'live/element/4/'
    const l4 = unusedFuelElementNodes(p, life)
        .concat(surfaceElementDerivedNodes(bedId, p, life))

    p = bedId + 'live/element/5/'
    const l5 = unusedFuelElementNodes(p, life)
        .concat(surfaceElementDerivedNodes(bedId, p, life))

    return [...bed, ...d1, ...d2, ...d3, ...d4, ...d5, ...l1, ...l2, ...l3, ...l4, ...l5]
}

function unusedFuelElementNodes(p, life) {
    return [
        [p+K.type, 'unused', K._type, Dag.constant, []],
        [p+K.life, life, K._life, Dag.constant, []],
        [p+K.load, 0, K._load, Dag.constant, []],
        [p+K.savr, 1, K._savr, Dag.constant, []],
        [p+K.heat, 0, K._heat, Dag.constant, []],
        [p+K.mois, 0, K._mois, Dag.constant, []],
        [p+K.dens, 0, K._dens, Dag.constant, []],
        [p+K.seff, 0, K._seff, Dag.constant, []],
        [p+K.stot, 0, K._stot, Dag.constant, []]
    ]
}
