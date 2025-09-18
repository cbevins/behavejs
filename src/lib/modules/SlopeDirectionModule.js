import { Dag } from '../index.js'
import { ModuleBase } from './ModuleBase.js'
import { Paths as P} from './Paths.js'
import { Units as U} from './Units.js'
import { CompassEquations as Compass} from '../index.js'

export class SlopeDirectionModule extends ModuleBase {
    /**
     * Creates the canopy module nodes.
     * @param {string} prefix Prefix for this module's fully qualified node names
     * something like 'terrain/' to prefix the 'slope/steepness/<node>' keys.
     * @param {Config} cfg Config reference
     */
    constructor(prefix, cfg) {
        super(prefix, P.slopeDirSelf, P.slopeDirMod, cfg)
        const path = this.path
        this.nodes = [
            [path+P.slopeUp, 0, U.compass, cfg, [
                [cfg.upslope, Dag.input, []],
                [cfg.downslope, Compass.compassOpposite, [path+P.slopeDown]]]],
            [path+P.slopeDown, 0, U.degrees, cfg, [
                [cfg.upslope, Compass.compassOpposite, [path+P.slopeUp]],
                [cfg.downslope, Dag.input, []]]],
        ]
    }
}
