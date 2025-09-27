/**
 * @file Surface weighted genome
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
*/
import { Dag } from '../index.js'
import { ModuleBase } from './ModuleBase.js'
import { Paths as P} from './Paths.js'
import { Units as U} from './Units.js'
import { Calc, CompassEquations as Compass } from '../index.js'
import { SurfaceFireEquations as Fire } from '../index.js'

export class SurfaceFireWtgModule extends ModuleBase {
    /**
     * @param {string} prefix Prefix for this module's fully qualified node names
     * (something like 'weather/' or '') to preface this module's 'wind/direction/<node>' keys.
     * @param {Config} cfg Refernce to a SurfaceFireWtgConfig
     * @param {string} fire1Path Fully qualified path to primary fuel fire,
     * something like `primary/fire'
     * @param {string} fire2Path Fully qualified path to primary fuel fire,
     * something like `secondary/fire'
     */
    constructor(prefix, cfg, fire1Path, fire2Path){
        super(prefix, P.wtgSelf, P.wtgMod, cfg)
        const path = this.path
        // NOTE that the FireEllipseModule links to the following nodes:
        // path+P.fireHeadRos
        // path+P.fireFromUpslope
        // path+P.fireLwr
        // path+P.fireMidf (used for scorch height)
        // path+P.fireHeadFlame    

        this.nodes = [
            [path+P.wtgCover1, 1, U.fraction, cfg, [
                [cfg.primary, Dag.assign, [P.one]],
                [cfg.any, Dag.input, []]]],
            [path+P.wtgCover2, 0, U.fraction, cfg, [
                [cfg.primary, Dag.assign, [P.zero]],
                [cfg.any, Calc.diff, [P.one, path+P.wtgCover1]]]],

            // The following 6 (or maybe 7) are ALWAYS bound to the primary fuel
            [path+P.fireWeff, 0, U.windSpeed, null, [
                [cfg.any, Dag.assign, [fire1Path+P.fireWeff]]]],
            [path+P.fireFromUpslope, 0, U.compass, null, [
                [cfg.any, Dag.assign, [fire1Path+P.fireFromUpslope]]]],
            [path+P.fireFromNorth, 0, U.compass, null, [
                [cfg.any, Dag.assign, [fire1Path+P.fireFromNorth]]]],
            [path+P.fireLwr,       1, U.ratio, null, [
                [cfg.any, Dag.assign, [fire1Path+P.fireLwr]]]],
            [path+P.fireMidf,      1, U.windSpeed, null, [
                [cfg.any, Dag.assign, [fire1Path+P.fireMidf]]]],
            // BP6 also saved the primary wind speed reduction factor,
            // but that's a pain to get from here, may not have ever been calculate,
            // and I'm not sure if its used by ellipse anywhere else?

            // The following 4 use the maximum of the primary or secondary fuel
            [path+P.fireRxi, 0, U.fireRxi, cfg, [
                [cfg.primary, Dag.assign, [fire1Path+P.fireRxi]],
                [cfg.any, Math.max, [fire1Path+P.fireRxi, fire2Path+P.fireRxi]]]],
            [path+P.fireHpua, 0, U.fireHpua, cfg, [
                [cfg.primary, Dag.assign, [fire1Path+P.fireHpua]],
                [cfg.any, Math.max, [fire1Path+P.fireHpua, fire2Path+P.fireHpua]]]],
            [path+P.fireHeadFli, 0, U.fireFli, cfg, [
                [cfg.primary, Dag.assign, [fire1Path+P.fireHeadFli]],
                [cfg.any, Math.max, [fire1Path+P.fireHeadFli, fire2Path+P.fireHeadFli]]]],
            [path+P.fireHeadFlame, 0, U.fireFlame, cfg, [
                [cfg.primary, Dag.assign, [fire1Path+P.fireHeadFlame]],
                [cfg.any, Math.max, [fire1Path+P.fireHeadFlame, fire2Path+P.fireHeadFlame]]]],

            // If either fuel bed's effective wind speed limit is exceeded
            [path+P.fireWeffX, false, U.bool, cfg, [
                [cfg.primary, Dag.assign, [fire1Path+P.fireWeffX]],
                [cfg.any, Calc.or, [fire1Path+P.fireWeffX, fire2Path+P.fireWeffX]]]],
            
            // The effective wind speed limit is the minimum of either
            [path+P.fireWeffLim, 0, U.windSpeed, cfg, [
                [cfg.primary, Dag.assign, [fire1Path+P.fireWeffLim]],
                [cfg.any, Math.min, [fire1Path+P.fireWeffLim, fire2Path+P.fireWeffLim]]]],

            // Arithmetic and harmonic means
            [path+P.wtgRosArith, 0, U.fireRos, cfg, [
                [cfg.primary, Dag.assign, [fire1Path+P.fireHeadRos]],
                [cfg.any, Fire.arithmeticMeanSpreadRate, [
                    path+P.wtgCover1, fire1Path+P.fireHeadRos, fire2Path+P.fireHeadRos]]]],
            [path+P.wtgRosHarm, 0, U.fireRos, cfg, [
                [cfg.primary, Dag.assign, [fire1Path+P.fireHeadRos]],
                [cfg.any, Fire.harmonicMeanSpreadRate, [
                    path+P.wtgCover1, fire1Path+P.fireHeadRos, fire2Path+P.fireHeadRos]]]],

            // Final
            [path+P.fireHeadRos, 0, U.fireRos, cfg, [
                [cfg.primary, Dag.assign, [fire1Path+P.fireHeadRos]],
                [cfg.harmonic, Dag.assign, [path+P.wtgRosHarm]],
                [cfg.arithmetic, Dag.assign, [path+P.wtgRosArith]]]]
            ]
        }
    }
