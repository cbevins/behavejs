/**
 * @file Site Map genome
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
*/
import { Units as U } from './Units.js'
import { DagModule, DagNode } from './DagItems.js'
import { Calc, CompassEquations as Compass } from '../index.js'
import { Calc, CompassEquations as Compass } from '../index.js'
import * as Config from './Configs.js'

export function defineSurfaceFireModule(parentMod, parentProp) {
    const mod = new DagModule(parentMod, parentProp)
    mod.one = new DagNode(mod, 'one', U.factor).constant(1)

    mod.scale = new DagNode(mod, 'scale', U.mapScale)
        .input()

    mod.contours = new DagNode(mod, 'contours', U.integer)
        .input()

    mod.dist = new DagNode(mod, 'dist', U.dist)
        .input()

    mod.factor = new DagNode(mod, 'factor', U.factor)
        .use(Calc.divide, [mod.one, mod.scale])

    mod.interval = new DagNode(mod, 'interval', U.fireDist)
        .input()

    mod.reach = new DagNode(mod, 'reach', U.fireDist,)
        .use(Calc.multiply, [mod.scale, mod.dist])

    mod.rise = new DagNode(mod, 'rise', U.fireDist,)
        .use(Calc.multiply, [mod.interval, mod.contours])

    mod.slope = new DagNode(mod, 'slope', U.ratio)
        .use(Compass.compassSlopeRatioMap, [
            mod.scale, mod.interval, mod.contours, mod.dist])

    mod.slopedeg = new DagNode(mod, 'slopedeg', U.degrees,)
        .use(Compass.compassSlopeDegreesMap, [
            mod.scale, mod.interval, mod.contours, mod.dist])
    return mod
}
