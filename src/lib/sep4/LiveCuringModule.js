import { Dag, ModuleBase, U } from './index.js'
import { FuelBedEquations as Eq } from '../index.js'

// LiveCuringModule extends the FuelBedModule (named in arg1)
// by linking live herb moisture content (arg 2)
// to estimate the fuel bed fraction of cured live fuel.
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
            [this.observed, 0, U.curedLive, 0, [
                [this.any, Dag.input, []]]],
            [this.estimated, 0, U.curedLive, 0, [
                [this.any, Eq.curedHerbFraction, [this.herbMois]]]],
            [this.applied, 0, U.curedLive, 0, [
                [this.obs, Dag.assign, [this.observed]],
                [this.est, Dag.assign, [this.estimated]],
            ]],
        ]
    }
}
