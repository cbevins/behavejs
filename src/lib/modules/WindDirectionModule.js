import { Dag } from '../index.js'
import { ModuleBase } from './ModuleBase.js'
import { Paths as P} from './Paths.js'
import { Units as U} from './Units.js'
import { CompassEquations as Compass } from '../index.js'

export class WindDirectionModule extends ModuleBase {
    /**
     * @param {string} prefix Prefix for this module's fully qualified node names
     * (something like 'weather/' or '') to preface this module's 'wind/direction/<node>' keys.
     * @param {Config} cfg Config reference
     * @param {string} slopeDirPath Path to the SlopeDirectionModule, something like 'terrain/slope/direction/'
     */
    constructor(prefix, cfg, slopeDirPath){
        super(prefix, P.wdirSelf, P.wdirMod, cfg)
        const path = this.path
        const upslopeNode = slopeDirPath + P.slopeUp

        this.nodes = [
            [path+P.wdirHeadFromUp, 0, U.compass, cfg, [
                [cfg.headingFromUpslope, Dag.input, []],
                [cfg.sourceFromNorth, Compass.compassDiff, [path+P.wdirHeadFromNo, upslopeNode]],
                [cfg.upslope, Dag.constant, []]]],

            [path+P.wdirSourceFromUp, 0, U.compass, null, [
                ['', Compass.compassOpposite, [path+P.wdirHeadFromUp]]]],

            [path+P.wdirSourceFromNo, 0, U.compass, cfg, [
                [cfg.headingFromUpslope, Compass.compassOpposite, [path+P.wdirHeadFromNo]],
                [cfg.sourceFromNorth, Dag.input, []],
                [cfg.upslope, Compass.compassOpposite, [upslopeNode]]]],

            [path+P.wdirHeadFromNo, 0, U.compass, cfg, [
                [cfg.headingFromUpslope, Compass.compassSum, [path+P.wdirHeadFromUp, upslopeNode]],
                [cfg.sourceFromNorth, Compass.compassOpposite, [path+P.wdirSourceFromNo]],
                [cfg.upslope, Dag.assign, [upslopeNode]]]],
        ]
    }
}
