import { Dag, U } from '../index.js'
import { Paths as P} from './Paths.js'
import { ModuleBase } from './ModuleBase.js'
import { CompassEquations as Compass} from '../index.js'

export class SlopeSteepnessModule extends ModuleBase {
    /**
     * Creates the canopy module nodes.
     * @param {string} prefix Prefix for this module's fully qualified node names
     * something like 'terrain/' to prefix the 'slope/steepness/<node>' keys.
     * @param {Config} cfg Config reference
     */
    constructor(prefix, cfg) {
        super(prefix, P.slopeSteepSelf, 'SlopeSteepnessModule', cfg)
        const path = prefix + this.self
        this.nodes = [
            [path+P.slopeRatio, 0, U.ratio, cfg.key, [
                [cfg.ratio, Dag.input, []],
                [cfg.degrees, Compass.compassSlopeRatio, [path+P.slopeDegrees]]]],
            [path+P.slopeDegrees, 0, U.degrees, cfg.key, [
                [cfg.ratio, Compass.compassSlopeDegrees, [path+P.slopeRatio]],
                [cfg.degrees, Dag.input, []]]],
        ]
    }
}
