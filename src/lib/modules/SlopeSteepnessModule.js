import { Dag, C, P, U, ModuleBase } from '../index.js'
import { CompassEquations as Compass} from '../index.js'

export class SlopeSteepnessModule extends ModuleBase {
    /**
     * Creates the canopy module nodes.
     * @param {string} path Prefix for this module's fully qualified node names
     * something like 'terrain/' to prefix the 'slope/steepness/<node>' keys.
     */
    constructor(path) {
        super(path, 'SlopeSteepnessModule')

        this.config = 'slope steepness is'
        this.options = [C.slopeRatio, C.slopeDegrees, C.slopeMap]

        this.nodes = [
            [path+P.slopeRatio, 0, U.ratio, 0, [
                [C.slopeRatio, Dag.input, []],
                [C.slopeDegrees, Compass.slopeRatio, [path+P.slopeDegrees]]]],
            [path+P.slopeDegrees, 0, U.degrees, 0, [
                [C.slopeRatio, Compass.slopeDegrees, [path+P.slopeRatio]],
                [C.slopeDegrees, Dag.input, []]]],
        ]
    }
}
