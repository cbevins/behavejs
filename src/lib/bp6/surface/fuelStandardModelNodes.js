/**
 * @file Behavejs 'fuel/element n/' Dag node definitions.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 * 
 * The '/fuel/bed/{life}/element n/' DagNodes define the characteristics
 * of a specific dead or live fuel particle type per Rothermel (1972) and BehavePlus V6.
 */
import {Calc, Dag, StandardFuelModels as Eq, Util} from '../index.js'
import {
    depth, mext, dens, load, savr, heat, seff, stot, mois,
    _depth, _dens, _load, _savr, _heat, _seff, _stot, _mois,
} from './standardKeys.js'

export function fuelStandardModelNodes(prefix, custom=false) {
    const dead = prefix + '/fuel/dead/'
    const live = prefix + '/fuel/live/'

    const fm = prefix+'/fuel model/'
    const key = fm + 'key'
    const cured = fm + 'cured'

    // -------------------------------------------------------------------------
    // The following internal nodes are for using Standard Fuel Models
    // and need no further submodule modifications.
    // -------------------------------------------------------------------------

    const standardNodes = [
        [key, '', '/fuel/model key', Dag.input, []],
        [cured, 0, '/fraction', Dag.input, []],
        [fm+'number', 0, '/fuel/model number', Eq.code, [key]],
        [fm+'code', 'none', '/fuel/model code', Eq.number, [key]],
        [fm+'label', '', '/fuel/model label', Eq.label, [key]],
        [fm+depth, 1, _depth, Eq.depth, [key]],
        [fm+mext, 0.25, _mois, Eq.mext, [key]],
        [fm+'dead/1-h/'+load, 0, _load, Eq.load1, [key]],
        [fm+'dead/10-h/'+load, 0, _load, Eq.load10, [key]],
        [fm+'dead/100-h/'+load, 0, _load, Eq.load100, [key]],
        [fm+'live/total herb/'+load, 0, _load, Eq.loadHerb, [key]],
        [fm+'live/stem/'+load, 0, _load, Eq.loadStem, [key]],
        [fm+'dead/1-h/'+savr, 1, _savr, Eq.savr1, [key]],
        [fm+'live/herb/'+savr, 1, _savr, Eq.savrHerb, [key]],
        [fm+'live/stem/'+savr, 1, _savr, Eq.savrStem, [key]],
        [fm+'dead/'+heat, 8000, _heat, Eq.heatDead, [key]],
        [fm+'live/'+heat, 8000, _heat, Eq.heatLive, [key]],
    ]

    if (custom) {
        for(let node of customNodes) {
        node[3] = Dag.input
        node[4] = []
        }
    }

    const derivedNodes = [
        [fm+'dead/cured herb/'+load, 0, _load, Eq.loadCured, [key, cured]],
        [fm+'live/uncured herb/'+load, 0, _load, Eq.loadUncured, [key, cured]]
    ]

    return Util.nodesToMap([...standardNodes, ...derivedNodes])
}

/**
 * Returns a subset Map() of {prefix}/fuel/{life}/element {n} nodes
 * that are now assigned to fuel model nodes and fuel/moisture nodes.
 * The returned subset Map must be merged with the larger Map.
 * @param {*} prefix 
 * @returns 
 */
export function linkSurfaceFuel2StandardModel(prefix) {
    const fm = prefix+'/fuel model/'
    const key = fm + 'key'
    const d1 = prefix+'/fuel/dead/element 1/'
    const d2 = prefix+'/fuel/dead/element 2/'
    const d3 = prefix+'/fuel/dead/element 3/'
    const d4 = prefix+'/fuel/dead/element 4/'
    const l1 = prefix+'/fuel/live/element 1/'
    const l2 = prefix+'/fuel/live/element 2/'
    const type = 'type'
    const life = 'life'
    const dead = 'dead'
    const live = 'live'
    const _life = 'fuel/life'
    const _type = 'fuel/type'

    const p1 = [    // dead 1-h
        [d1+type, 'dead 1-h', _type, Dag.constant, []],
        [d1+life, dead, _life, Dag.constant, []],
        [d1+load, 0, _load, Dag.assign, [fm+'dead/1-h/'+load]],
        [d1+savr, 1, _savr, Dag.assign, [fm+'dead/1-h/'+savr]],
        [d1+heat, 8000, _heat, Dag.assign, [fm+'dead/'+heat]],
        [d1+mois, 1, _mois, Dag.assign, [prefix+'/moisture/dead/1-h']],
        [d1+dens, 32, _dens, Dag.constant, []],
        [d1+seff, 0.01, _seff, Dag.constant, []],
        [d1+stot, 0.0555, _stot, Dag.constant, []]
    ]
    const p2 = [    // dead 10-h
        [d2+type, 'dead 10-h', _type, Dag.constant, []],
        [d2+life, dead, _life, Dag.constant, []],
        [d2+load, 0, _load, Dag.assign, [fm+'dead/10-h/'+load]],
        [d2+savr, 109, _load, Dag.constant, []],
        [d2+heat, 8000, _heat, Dag.assign, [fm+'dead/'+heat]],
        [d2+mois, 1, _mois, Dag.assign, [prefix+'/moisture/dead/10-h']],
        [d2+dens, 32, _dens, Dag.constant, []],
        [d2+seff, 0.01, _seff, Dag.constant, []],
        [d2+stot, 0.0555, _stot, Dag.constant, []]
    ]
    const p3 = [    // dead 100-h
        [d3+type, 'dead 100-h', _type, Dag.constant, []],
        [d3+life, dead, _life, Dag.constant, []],
        [d3+load, 0, _load, Dag.assign, [fm+'dead/100-h/'+load]],
        [d3+savr, 30, _load, Dag.constant, []],
        [d3+heat, 8000, _heat, Dag.assign, [fm+'dead/'+heat]],
        [d3+mois, 1, _mois, Dag.assign, [prefix+'/moisture/dead/100-h']],
        [d3+dens, 32, _dens, Dag.constant, []],
        [d3+seff, 0.01, _seff, Dag.constant, []],
        [d3+stot, 0.0555, _stot, Dag.constant, []]
    ]
    const p4 = [    // special derived class for cured herb
        [d4+type, 'cured herb', _type, Dag.constant, []],
        [d4+life, dead, _life, Dag.constant, []],
        [d4+load, 0, _load, Dag.assign, [fm+'dead/cured herb/'+load]],
        [d4+savr, 1, _savr, Dag.assign, [fm+'live/herb/'+savr]], // NOTE - retains live SAVR value
        [d4+heat, 8000, _heat, Dag.assign, [fm+'dead/'+heat]],
        [d4+mois, 1, _mois, Dag.assign, [prefix+'/moisture/dead/1-h']],
        [d4+dens, 32, _dens, Dag.constant, []],
        [d4+seff, 0.01, _seff, Dag.constant, []],
        [d4+stot, 0.0555, _stot, Dag.constant, []]
    ]
    const p5 = [    // special derived class for uncured herb
        [l1+type, 'live herb', _type, Dag.constant, []],
        [l1+life, 'live', _life, Dag.constant, []],
        [l1+load,     0, _load, Dag.assign, [fm+'live/uncured herb/'+load]],
        [l1+savr,     1, _savr, Dag.assign, [fm+'live/herb/'+savr]],
        [l1+heat,  8000, _heat, Dag.assign, [fm+'live/'+heat]],
        [l1+mois, 1, _mois, Dag.assign, [prefix+'/moisture/live/herb']],
        [l1+dens, 32, _dens, Dag.constant, []],
        [l1+seff, 0.01, _seff, Dag.constant, []],
        [l1+stot, 0.0555, _stot, Dag.constant, []]
    ]
    const p6 = [    // Live stem
        [l2+type, 'live stem', _type, Dag.constant, []],
        [l2+life, live, _life, Dag.constant, []],
        [l2+load, 0, _load, Dag.assign, [fm+'live/stem/'+load]],
        [l2+savr, 1, _savr, Dag.assign, [fm+'live/stem/'+savr]],
        [l2+heat, 8000, _heat, Dag.assign, [fm+'live/'+heat]],
        [l2+mois, 1, _mois, Dag.assign, [prefix+'/moisture/live/stem']],
        [l2+dens, 32, _dens, Dag.constant, []],
        [l2+seff, 0.01, _seff, Dag.constant, []],
        [l2+stot, 0.0555, _stot, Dag.constant, []]
    ]
    return Util.nodesToMap([...p1, ...p2, ...p3, ...p4, ...p5, ...p6])
}
