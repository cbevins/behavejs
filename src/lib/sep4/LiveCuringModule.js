import { Dag, ModuleBase, U } from './index.js'
import { FuelBedEquations as Eq } from '../index.js'

// LiveCuringModule provides a cured live fuel fraction
// from either an observation (input) or estimated from a herb moisture
// content node specified in arg2.
// It is used only by the StandardFuelModelModule.
export class LiveCuringModule extends ModuleBase {
    /**
     * 
     * @param {string} path Prefix for this module's fully qualified node names ('site/surface/{primary|secondary}/curing/')
     * @param {string} herbMois Fully qualified node name ('site/weather/moisture/live/herb')
     */
    constructor(path, herbMois) {
        super(path)

        // fully qualified node keys
        const p = path + 'cured fraction/'
        this.observed = p + 'observed'
        this.estimated = p + 'estimated'
        this.applied = p + 'applied'
        // linked node keys referenced by nodes
        this.herbMois = herbMois

        // config keys
        this.config = 'cured live fuel fraction'
        this.obs = 'observed'
        this.est = 'estimated'
        this.options = [this.obs, this.est]

        this.nodes = [
            [this.observed, 0, U.fraction, 0, [
                [this.any, Dag.input, []]]],
            [this.estimated, 0, U.fraction, 0, [
                [this.any, Eq.curedHerbFraction, [this.herbMois]]]],
            [this.applied, 0, U.fraction, 0, [
                [this.obs, Dag.assign, [this.observed]],
                [this.est, Dag.assign, [this.estimated]],
            ]],
        ]
    }
}
