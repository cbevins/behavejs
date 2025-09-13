import { Dag, C, P, U, ModuleBase } from '../index.js'
import { CompassEquations as Compass} from '../index.js'

export class SlopeDirectionModule extends ModuleBase {
    /**
     * Creates the canopy module nodes.
     * @param {string} path Prefix for this module's fully qualified node names
     * something like 'terrain/' to prefix the 'slope/steepness/<node>' keys.
     */
    constructor(path) {
        super(path, 'SlopeDirectionModule')

        this.config = 'slope direction is'
        this.options = [C.sdirUp, C.sdirDn]

        this.nodes = [
            [path+P.slopeUp, 0, U.compass, 0, [
                [C.sdirUp, Dag.input, []],
                [C.sdirDn, Compass.opposite, [path+P.slopeDown]]]],
            [path+P.slopeDown, 0, U.degrees, 0, [
                [C.sdirUp, Compass.opposite, [path+P.slopeUp]],
                [C.sdirDn, Dag.input, []]]],
        ]
    }
}
