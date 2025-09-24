/**
 * @file Site Map genome
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
*/
import { Dag } from '../index.js'
import { ModuleBase } from './ModuleBase.js'
import { Paths as P} from './Paths.js'
import { Units as U} from './Units.js'
import { Calc, CompassEquations as Compass } from '../index.js'

export class MapModule extends ModuleBase {
    /**
     * Creates the map module.
     * @param {string} prefix Prefix for this module instance's fully qualified node names
     * something like '/' or '' to prefix the 'ellipse/<node>' keys.
     * @param {Config} cfg Config reference to FireEllipseConfig.js
     */
    constructor(prefix='') {
        super(prefix, P.mapSelf, P.mapMod, null)
        const path = this.path  // P.mapSelf

        this.nodes = [
            [path+P.mapScale, 0, U.mapScale , null, [
                ['', Dag.input, []]]],

            [path+P.mapContours, 0, U.posint, null, [
                ['', Dag.input, []]]],

            [path+P.mapDist, 0, U.mapDist , null, [
                ['', Dag.input, []]]],

            [path+P.mapFactor, 0, U.factor, null, [
                ['', Calc.divide, [P.one, path+P.mapScale]]]],

            [path+P.mapInterval, 0, U.fireDist, null, [
                ['', Dag.input, []]]],

            [path+P.mapReach, 0, U.fireDist, null, [
                ['', Calc.multiply, [path+P.mapScale, path+P.mapDist]]]],

            [path+P.mapRise, 0, U.fireDist, null, [
                ['', Calc.multiply, [path+P.mapInterval, path+P.mapContours]]]],

            [path+P.mapSlopeRatio, 0, U.posratio, null, [
                ['', Compass.slopeRatioMap, [
                    path+P.mapScale,
                    path+P.mapInterval,
                    path+P.mapContours,
                    path+P.mapDist]]]],

            [path+P.mapSlopeDeg, 0., U.degrees, null, [
                ['', Compass.slopeDegreesMap, [
                    path+P.mapScale,
                    path+P.mapInterval,
                    path+P.mapContours,
                    path+P.mapDist]]]]
        ]
    }
}
