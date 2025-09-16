import { Dag, U } from '../index.js'
import { Paths as P} from './Paths.js'
import { ModuleBase } from './ModuleBase.js'
import { CompassEquations as Compass } from '../index.js'

export class WindDirectionModule extends ModuleBase {
    /**
     * @param {string} prefix Prefix for this module's fully qualified node names
     * (something like 'weather/' or '') to preface this module's 'wind/direction/<node>' keys.
     * @param {Config} cfg Config reference
     * @param {string} upslope Fully qualified path to the upslope direction node,
     * something like 'terrain/slope/direction/up-slope'
     */
    constructor(prefix, cfg, upslope){
        super(prefix, P.wdirSelf, P.wdirMod, cfg)
        const path = this.path
        this.nodes = [
            [path+P.wdirHeadFromUp, 0, U.compass, cfg.key, [
                [cfg.headingFromUpslope, Dag.input, []],
                [cfg.sourceFromNorth, Compass.compassDiff, [path+P.wdirHeadFromNo, upslope]],
                [cfg.upslope, Dag.constant, []]]],

            [path+P.wdirSourceFromNo, 0, U.compass, cfg.key, [
                [cfg.headingFromUpslope, Compass.compassOpposite, [path+P.wdirHeadFromNo]],
                [cfg.sourceFromNorth, Dag.input, []],
                [cfg.upslope, Compass.compassOpposite, [upslope]]]],

            [path+P.wdirSourceFromUp, 0, U.compass, '', [
                ['', Compass.compassOpposite, [path+P.wdirHeadFromUp]]]],

            [path+P.wdirHeadFromNo, 0, U.compass, cfg.key, [
                [cfg.headingFromUpslope, Compass.compassSum, [path+P.wdirHeadFromUp, upslope]],
                [cfg.sourceFromNorth, Compass.compassOpposite, [path+P.wdirSourceFromNo]],
                [cfg.upslope, Dag.assign, [upslope]]]],
        ]
    }
}
