import { Dag } from '../index.js'
import { ModuleBase } from './ModuleBase.js'
import { Paths as P} from './Paths.js'
import { Units as U} from './Units.js'
import { CompassEquations as Compass } from '../index.js'

/*
 *                         vectorFromNorth --------
 *                                                 |---> vectorFromUpslope --------> vectorFromFireHead -------
 * aspectFromNorth ------> upslopeFromNorth -------                                                            |---> spreadRateAtVector
 *                                                 |---> windHeadingFromUpslope ---> fireHeadingFromUpslope ---
 * windSourceFromNorth --> windHeadingFromNorth ---
 */
export class DirectionsModule extends ModuleBase {
    /**
     * @param {string} prefix Prefix for this module's fully qualified node names
     * (something like 'weather/' or '') to preface this module's 'wind/direction/<node>' keys.
     * @param {Config} cfg Config reference
     * @param {string} upslope Fully qualified path to the upslope direction node,
     * something like 'terrain/slope/direction/up-slope/degrees/from north'
     */
    constructor(prefix, cfg, upslope){
        super(prefix, P.wdirSelf, P.wdirMod, cfg)
        const path = this.path

        // Every node must either (1) be input, or (2) depend on a previously defined node
        this.nodes = [
            // 2 slope direction nodes
            [path+P.slopeDown, 0, U.degrees, cfg, [
                [cfg.downslope, Dag.input, []],
                [cfg.upslope, Compass.compassOpposite, [path+P.slopeUp]],
            ]],
            [path+P.slopeUp, 0, U.compass, cfg, [
                [cfg.downslope, Compass.compassOpposite, [path+P.slopeDown]],
                [cfg.upslope, Dag.input, []],
            ]],

            // 3 wind direction nodes
            [path+P.wdirSourceFromNo, 0, U.compass, cfg, [
                [cfg.sourceFromNorth, Dag.input, []],
                // [cfg.headingFromUpslope, Compass.compassOpposite, [path+P.wdirHeadFromNo]],
                // [cfg.upslope, Compass.compassOpposite, [path+P.slopeUp]],
            ]],
            [path+P.wdirHeadFromNo, 0, U.compass, cfg, [
                [cfg.sourceFromNorth, Compass.compassOpposite, [path+P.wdirSourceFromNo]],
                // [cfg.headingFromUpslope, Compass.compassSum, [path+P.wdirHeadFromUp, path+P.slopeUp]],
                // [cfg.upslope, Dag.assign, [upslope]],
            ]],
            [path+P.wdirHeadFromUp, 0, U.compass, cfg, [
                [cfg.sourceFromNorth, Compass.compassDiff, [path+P.wdirHeadFromNo, path+P.slopeUp]],
                [cfg.headingFromUpslope, Dag.input, []],
                // [cfg.upslope, Dag.constant, []],
            ]],

            // 1 fire direction node
            [fire+P.fireFromUpslope, 0, U.compass, null, [
                ['', Fire.spreadDirectionFromUpslope, [fire2+P.fireRosXcomp, fire2+P.fireRosYcomp, fire2+P.fireRos]]]], 
            // [fire+P.fireFromNorth, 0, U.compass, null, [
            //     ['', Compass.compassSum, [path+P.slopeUp, fire+P.fireFromUpslope]]]],
            
            // 3 vector direction nodes
            [path+P.vectorFromNorth, 0, U.compass, cfgVectors, [
                [cfgVectors.fromNorth, Dag.input, []],
                // [cfgVectors.fromHead, Compass.sum, [
                //     path+P.vectorFromHead,
                //     path+P.fireFromNorth]],
                // [cfgVectors.fromUpslope, Compass.sum, [
                //     path+P.vectorFromUpslope,
                //     upslopeNode]],
            ]],
            [path+P.vectorFromUpslope, 0, U.compass, cfgVectors, [
                [cfgVectors.fromNorth, Compass.diff, [path+P.vectorFromNorth, path+P.slopeUp]],
                [cfgVectors.fromUpslope, Dag.input, []],
                // [cfgVectors.fromHead, Compass.sum, [path+P.vectorFromHead, path+P.fireFromUpslope]],
                // [cfgVectors.any, Compass.diff, [path+P.vectorFromNorth, path+P.slopeUp]],
            ]],
            [path+P.vectorFromHead, 0, U.compass, cfgVectors, [
                [cfgVectors.fromNorth, Compass.diff, [path+P.vectorFromNorth, path+P.fireFromNorth]],   // Uses uncalculated fireFromNorth
                [cfgVectors.fromUpslope, Compass.diff, [path+P.vectorFromUpslope, path+P.fireFromUpslope]],
                [cfgVectors.fromHead, Dag.input, []],
            ]],

        ]
    }
}
