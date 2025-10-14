/**
 * @file Surface weighted genome
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
*/
import { Units as U } from './Units.js'
import { DagModule, DagNode } from './DagItems.js'
import { Calc, CompassEquations as Compass } from '../index.js'
import { SurfaceFireEquations as Fire } from '../index.js'
import * as Config from './Configs.js'

/**
 * Defines the final surface module
 * NOTE that the FireEllipseModule links to the following nodes:
 *  fire.ros
 *  fire.dir.upslope
 *  fire.lwr
 *  fire.midflame (to calculate scorch height)
 *  fire.flame (to calculate fireline intensity)
 *  fire.hpua is used by Rothermel's crown fire
 * 
 * @param {DagModule} parentMod Reference to parent DagModule, usually site.surface
 * @param {string} parentProp Parent's property name for this DagItem ('fire')
 * @returns Reference to the new DagModule 
 */
export function defineSurfaceFireModule(parentMod, parentProp) {
    const mod = new DagModule(parentMod, parentProp)
    mod.dir = new DagModule(mod, 'direction')

    mod.one = new DagNode(mod, 'one', U.factor).constant(1)
    mod.cover1 = new DagNode(mod, 'cover1', U.fraction)
    mod.cover2 = new DagNode(mod, 'cover2', U.fraction)

    // The following are ALWAYS bound to the primary
    mod.weff = new DagNode(mod, 'weff', U.windSpeed)
    mod.dir.upslope = new DagNode(mod.dir, 'upslope', U.compass)
    mod.dir.north = new DagNode(mod.dir, 'north', U.compass)
    mod.lwr = new DagNode(mod, 'lwr', U.ratio)
    mod.midflame = new DagNode(mod, 'midflame', U.windSpeed)
    mod.wsrf = new DagNode(mod, 'wsrf', U.fraction)

    // The following 4 use the maximum of the primary or secondary fuel
    mod.rxi = new DagNode(mod, 'rxi', U.fireRxi)
    mod.hpua = new DagNode(mod, 'hpua', U.fireHpua)
    mod.fli = new DagNode(mod, 'fli', U.fireFli)
    mod.flame = new DagNode(mod, 'flame', U.fireFlame)
    // If either fuel bed's effective wind speed limit is exceeded
    mod.weffX = new DagNode(mod, 'weffX', U.bool)
    // The effective wind speed limit is the minimum of either
    mod.weffLim = new DagNode(mod, 'weffLim', U.windSpeed)
    // Arithmetic and harmonic means
    mod.rosArith = new DagNode(mod, 'rosArith', U.fireRos)
    mod.rosHarm = new DagNode(mod, 'rosHarm', U.fireRos)
    // Final
    mod.ros = new DagNode(mod, 'ros', U.fireRos)
    return mod
}

/**
 * Defines all the DagNodes within the Rothermel Fire and Fuel Model (1972)
 * @param {DagModule} mod Reference to this SurfaceFireModule
 * @param {DagModule} primary Reference to the sibling site.surface/primary
 * @param {DagModule} secondary Reference to the sibling site.surface/secondary
 */
export function configSurfaceFireModule(mod, primary, secondary) {
    const config = Config.surfaceFire
    const fire1 = primary.fire
    const wind1 = primary.wind
    const fire2 = secondary.fire
    mod.one.constant(1)

    // The following are ALWAYS bound to the primary
    mod.weff.bind(fire1.weff)
    mod.dir.upslope.bind(fire1.dir.upslope)
    mod.dir.north.bind(fire1.dir.north)
    mod.lwr.bind(fire1.lwr)
    mod.midflame.bind(wind1.midflame)
    mod.wsrf.bind(wind1.wsrf)

    if (config.value === config.onefuel) {
        mod.cover1.constant(1, config)
        mod.cover2.constant(0, config)
        mod.rxi.bind(fire1.rxi, config)
        mod.hpua.bind(fire1.hpua, config)
        mod.fli.bind(fire1.fli, config)
        mod.flame.bind(fire1.flame, config)
        mod.weffX.bind(fire1.weffX, config)
        mod.weffLim.bind(fire1.weffLim, config)
        mod.rosArith.bind(fire1.ros, config)
        mod.rosHarm.bind(fire1.ros, config)
        mod.ros.bind(fire1.ros, config)
    } else {
        mod.cover1.input(config)
        mod.cover2.use(Calc.subtract, [mod.one, mod.cover1], config)
        // The following 4 use the maximum of the primary or secondary fuel
        mod.rxi.use(Math.max, [fire1.rxi, fire2.rxi], config)
        mod.hpua.use(Math.max, [fire1.hpua, fire2.hpua], config)
        mod.fli.use(Math.max, [fire1.fli, fire2.fli], config)
        mod.flame.use(Math.max, [fire1.flame, fire2.flame], config)
        // If either fuel bed's effective wind speed limit is exceeded
        mod.weffX.use(Calc.or, [fire1.weffX, fire2.weffX], config)
        // The effective wind speed limit is the minimum of either
        mod.weffLim.use(Math.min, [fire1.weffLim, fire2.weffLim])
        // Arithmetic and harmonic means
        mod.rosArith.use(Fire.arithmeticMeanSpreadRate, [mod.cover1, fire1.ros, fire2.ros], config)
        mod.rosHarm.use(Fire.harmonicMeanSpreadRate, [mod.cover1, fire1.ros, fire2.ros], config)
        // Final ros
        const rosFinal = (config.value === config.harmonic) ? mod.rosHarm : mod.rosArith
        mod.ros.bind(rosFinal, config)
    }
}
