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

export function fuelStandardModelNodes(prefix) {
    const dead = prefix + '/fuel/dead/'
    const live = prefix + '/fuel/live/'

    const fm = prefix+'/fuel model/'
    const key = fm + 'key'
    const cured = fm + 'cured'
    const nodes = [
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

        [fm+'dead/cured herb/'+load, 0, _load, Eq.loadCured, [key, cured]],
        [fm+'live/uncured herb/'+load, 0, _load, Eq.loadUncured, [key, cured]],
    ]
    return Util.nodesToMap(nodes)
}

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

    const nodes = [
        // dead 1-h
        [d1+type, 'dead 1-h', _type, Dag.constant, []],
        [d1+life, dead, _life, Dag.constant, []],
        [d1+load, 0, _load, Dag.assign, [fm+'dead/1-h/'+load]],
        [d1+savr, 1, _savr, Dag.assign, [fm+'dead/1-h/'+savr]],
        [d1+heat, 8000, _heat, Dag.assign, [fm+'dead/'+heat]],
        // dead 10-h
        [d2+type, 'dead 10-h', _type, Dag.constant, []],
        [d2+life, dead, _life, Dag.constant, []],
        [d2+load, 0, _load, Dag.assign, [fm+'dead/10-h/'+load]],
        [d2+savr, 109, _load, Dag.constant, []],
        [d2+heat, 8000, _heat, Dag.assign, [fm+'dead/'+heat]],
        // dead 100-h
        [d3+type, 'dead 100-h', _type, Dag.constant, []],
        [d3+life, dead, _life, Dag.constant, []],
        [d3+load, 0, _load, Dag.assign, [fm+'dead/100-h/'+load]],
        [d3+savr, 30, _load, Dag.constant, []],
        [d3+heat, 8000, _heat, Dag.assign, [fm+'dead/'+heat]],
        // Special cured herb class
        [d4+type, 'cured herb', _type, Dag.constant, []],
        [d4+life, dead, _life, Dag.constant, []],
        [d4+load, 0, _load, Dag.assign, [fm+'dead/cured herb/'+load]],
        [d4+savr, 1, _savr, Dag.assign, [fm+'live/herb/'+savr]], // NOTE - retains live SAVR value
        [d4+heat, 8000, _heat, Dag.assign, [fm+'dead/'+heat]],
        // Live (uncured) herb
        [l1+type, 'live herb', _type, Dag.constant, []],
        [l1+life, 'live', _life, Dag.constant, []],
        [l1+load,     0, _load, Dag.assign, [fm+'live/uncured herb/'+load]],
        [l1+savr,     1, _savr, Dag.assign, [fm+'live/herb/'+savr]],
        [l1+heat,  8000, _heat, Dag.assign, [fm+'live/'+heat]],
        // Live stem
        [l2+type, 'live stem', _type, Dag.constant, []],
        [l2+life, live, _life, Dag.constant, []],
        [l2+load, 0, _load, Dag.assign, [fm+'live/stem/'+load]],
        [l2+savr, 1, _savr, Dag.assign, [fm+'live/stem/'+savr]],
        [l2+heat, 8000, _heat, Dag.assign, [fm+'live/'+heat]],
    ]
    for(let el of [d1, d2, d3, d4, l1, l1]) {
        nodes.push(
        [el+dens, 32, _dens, Dag.constant, []],
        [el+seff, 0.01, _seff, Dag.constant, []],
        [el+stot, 0.0555, _stot, Dag.constant, []])
    }
    return Util.nodesToMap(nodes)
}
