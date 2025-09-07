import { Dag, L, ModuleBase, U } from './index.js'
import { CanopyEquations as Canopy} from '../index.js'

export class SlopeModule extends ModuleBase {
    /**
     * Creates the canopy module nodes.
     * @param {string} path Prefix for this module's fully qualified node names ('site/terrain/slope/')
     */
    constructor(path) {
        super(path)

        this.config = 'slope steepness is'
        this.observedRatio = 'observed ratio'
        this.observedDegrees = 'observed degrees'
        this.estimated = 'estimated from map'
        this.options = [this.observedRatio, this.observedDegrees, this.estimated]

        this.slopeRatio = path + L.slopeRat
        this.slopeDegrees = path + L.slopeDeg

        this.nodes = [
            [this.slopeRatio, 0, U.degrees, 0, [
                [this.any, Dag.input, []]]]
        ]
    }
}
