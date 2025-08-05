/**
 * @file Behave '/particle/' DagNode definitions and creator method.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 * 
 * The '/fuel/bed/{life}/particle' DagNodes define the characteristics
 * of a specific dead or live fuel particle type per Rothermel (1972) and BehavePlus V6.
 */
import {Calc, Dag, DagNode} from '../index.js'
import { StandardFuelModels } from './StandardFuelModels.js'

const dens = 'fiber density'
const diam = 'cylindrical diameter'
const efol = 'effective fuel ovendry load'
const efwl = 'effective fuel water load'
const ehn  = 'effective heating number'
const heat = 'heat of combustion'
const qig  = 'heat of pre-ignition'
const load = 'ovendry load'
const mois = 'moisture content'
const net  = 'net ovendry load'
const sa   = 'surface area'
const savr = 'surface area to volume ratio'
const sawf = 'surface area weighting factor'
const scwf = 'size class weighting factor'
const size = 'size class'
const seff = 'effective mineral content'
const stot = 'total mineral content'
const vol  = 'volume'


export function fuelModelNodeDefs(prefix) {
    const dead = prefix + '/fuel/dead/'
    const live = prefix + '/fuel/live/'
    // const life = prefix + '/fuel/'+deadOrLive
    // const p    = life + '/element ' + n + '/'
    const fm = prefix+'/fuel model/'
    const key = fm + 'key'
    const cured = fm + 'cured'
    return [
            [key, '', '/fuel/model key', Dag.input, []],
            [cured, 0, '/fraction', Dag.input, []],
            [fm+'number', 0, '/fuel/model number', StandardFuelModels.code, [key]],
            [fm+'code', 'none', '/fuel/model code', StandardFuelModels.number, [key]],
            [fm+'label', '', '/fuel/model label', StandardFuelModels.label, [key]],
            [fm+'depth', 1, '/fuel/bed depth', StandardFuelModels.depth, [key]],
            [fm+'mext', 0.25, '/fuel/moisture content', StandardFuelModels.mext, [key]],
            [fm+'dead/1-h/'+load, 0, '/fuel/'+load, StandardFuelModels.load1, [key]],
            [fm+'dead/10-h/'+load, 0, '/fuel/'+load, StandardFuelModels.load10, [key]],
            [fm+'dead/100-h/'+load, 0, '/fuel/'+load, StandardFuelModels.load100, [key]],
            [fm+'live/total herb/'+load, 0, '/fuel/'+load, StandardFuelModels.loadHerb, [key]],
            [fm+'live/stem/'+load, 0, '/fuel/'+load, StandardFuelModels.loadStem, [key]],
            [fm+'dead/1-h/'+savr, 1, '/fuel/'+savr, StandardFuelModels.savr1, [key]],
            [fm+'live/herb/'+savr, 1, '/fuel/'+savr, StandardFuelModels.savrHerb, [key]],
            [fm+'live/stem/'+savr, 1, '/fuel/'+savr, StandardFuelModels.savrStem, [key]],
            [fm+'dead/'+heat, 8000, '/fuel/'+heat, StandardFuelModels.heatDead, [key]],
            [fm+'live/'+heat, 8000, '/fuel/'+heat, StandardFuelModels.heatLive, [key]],

            [fm+'live/cured herb/'+load, 0, '/fuel/'+load, StandardFuelModels.loadCured, [key, cured]],
            [fm+'live/live herb/'+load, 0, '/fuel/'+load, StandardFuelModels.loadUncured, [key, cured]],
//     ]
// }

// export function linkFuelBed2Model(prefix) {
//     const fm = prefix+'/fuel model/'
//     const key = fm + 'key'
//     return [
        // dead 1-h
        [prefix+'/fuel/dead/element 1/type', 'dead 1-h', '/fuel/element type', Dag.constant, []],
        [prefix+'/fuel/dead/element 1/life', 'dead', '/fuel/life'+load, Dag.constant, []],
        [prefix+'/fuel/dead/element 1/'+load, 0, '/fuel/'+load, Dag.assign, [fm+'dead/1-h/'+load]],
        [prefix+'/fuel/dead/element 1/'+savr, 0, '/fuel/'+savr, Dag.assign, [fm+'dead/1-h/'+savr]],
        [prefix+'/fuel/dead/element 1/'+heat, 0, '/fuel/'+heat, Dag.assign, [fm+'dead/'+heat]],
        [prefix+'/fuel/dead/element 1/'+dens, 32, '/fuel/'+dens, Dag.constant, []],
        [prefix+'/fuel/dead/element 1/'+seff, 0.01, '/fuel/mineral content', Dag.constant, []],
        [prefix+'/fuel/dead/element 1/'+stot, 0.0555, '/fuel/mineral content', Dag.constant, []],
        // dead 10-h
        [prefix+'/fuel/dead/element 2/type', 'dead 10-h', '/fuel/element type', Dag.constant, []],
        [prefix+'/fuel/dead/element 2/life', 'dead', '/fuel/life'+load, Dag.constant, []],
        [prefix+'/fuel/dead/element 2/'+load, 0, '/fuel/'+load, Dag.assign, [fm+'dead/10-h/'+load]],
        [prefix+'/fuel/dead/element 2/'+savr, 109, '/fuel/'+load, Dag.constant, []],
        [prefix+'/fuel/dead/element 2/'+heat, 0, '/fuel/'+heat, Dag.assign, [fm+'dead/'+heat]],
        [prefix+'/fuel/dead/element 2/'+dens, 32, '/fuel/'+dens, Dag.constant, []],
        [prefix+'/fuel/dead/element 2/'+seff, 0.01, '/fuel/mineral content', Dag.constant, []],
        [prefix+'/fuel/dead/element 2/'+stot, 0.0555, '/fuel/mineral content', Dag.constant, []],
        // dead 100-h
        [prefix+'/fuel/dead/element 3/type', 'dead 100-h', '/fuel/element type', Dag.constant, []],
        [prefix+'/fuel/dead/element 3/life', 'dead', '/fuel/life'+load, Dag.constant, []],
        [prefix+'/fuel/dead/element 3/'+load, 0, '/fuel/'+load, Dag.assign, [fm+'dead/100-h/'+load]],
        [prefix+'/fuel/dead/element 3/'+savr, 30, '/fuel/'+load, Dag.constant, []],
        [prefix+'/fuel/dead/element 3/'+heat, 0, '/fuel/'+heat, Dag.assign, [fm+'dead/'+heat]],
        [prefix+'/fuel/dead/element 3/'+dens, 32, '/fuel/'+dens, Dag.constant, []],
        [prefix+'/fuel/dead/element 3/'+seff, 0.01, '/fuel/mineral content', Dag.constant, []],
        [prefix+'/fuel/dead/element 3/'+stot, 0.0555, '/fuel/mineral content', Dag.constant, []],
        // Special cured herb class
        [prefix+'/fuel/dead/element 4/type', 'cured herb', '/fuel/element type', Dag.constant, []],
        [prefix+'/fuel/dead/element 4/life', 'dead', '/fuel/life'+load, Dag.constant, []],
        // [prefix+'/fuel/dead/element 4/'+load, 0, '/fuel/'+load, Dag.assign, [fm+'live/'+load]],
        [prefix+'/fuel/dead/element 4/'+savr, 1, '/fuel/'+savr, Dag.assign, [fm+'live/'+savr]],
        [prefix+'/fuel/dead/element 4/'+heat, 0, '/fuel/'+heat, Dag.assign, [fm+'dead/'+heat]],
        [prefix+'/fuel/dead/element 4/'+dens, 32, '/fuel/'+dens, Dag.constant, []],
        [prefix+'/fuel/dead/element 4/'+seff, 0.01, '/fuel/mineral content', Dag.constant, []],
        [prefix+'/fuel/dead/element 4/'+stot, 0.0555, '/fuel/mineral content', Dag.constant, []],
        // Live (uncured) herb
        [prefix+'/fuel/live/element 1/type', 'live herb', '/fuel/element type', Dag.constant, []],
        [prefix+'/fuel/live/element 1/life', 'live', '/fuel/life'+load, Dag.constant, []],
        [prefix+'/fuel/live/element 1/'+load, 0, '/fuel/'+load, Dag.assign, [fm+'live/total herb/'+load]],
        [prefix+'/fuel/live/element 1/'+savr, 0, '/fuel/'+savr, Dag.assign, [fm+'live/herb/'+savr]],
        [prefix+'/fuel/live/element 1/'+heat, 0, '/fuel/'+heat, Dag.assign, [fm+'live/'+heat]],
        [prefix+'/fuel/live/element 1/'+dens, 32, '/fuel/'+dens, Dag.constant, []],
        [prefix+'/fuel/live/element 1/'+seff, 0.01, '/fuel/mineral content', Dag.constant, []],
        [prefix+'/fuel/live/element 1/'+stot, 0.0555, '/fuel/mineral content', Dag.constant, []],
        // Live stem
        [prefix+'/fuel/live/element 2/type', 'live stem', '/fuel/element type', Dag.constant, []],
        [prefix+'/fuel/live/element 2/life', 'live', '/fuel/life'+load, Dag.constant, []],
        [prefix+'/fuel/live/element 2/'+load, 0, '/fuel/'+load, Dag.assign, [fm+'live/stem/'+load]],
        [prefix+'/fuel/live/element 2/'+savr, 0, '/fuel/'+savr, Dag.assign, [fm+'live/stem/'+savr]],
        [prefix+'/fuel/live/element 2/'+heat, 0, '/fuel/'+heat, Dag.assign, [fm+'live/'+heat]],
        [prefix+'/fuel/live/element 2/'+dens, 32, '/fuel/'+dens, Dag.constant, []],
        [prefix+'/fuel/live/element 2/'+seff, 0.01, '/fuel/mineral content', Dag.constant, []],
        [prefix+'/fuel/live/element 2/'+stot, 0.0555, '/fuel/mineral content', Dag.constant, []],
    ]
}
