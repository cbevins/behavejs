import { Dag, ModuleBase, U } from './index.js'
import { FuelBedEquations as Eq } from '../index.js'

// LiveCuringModule extends the FuelBedModule (named in arg1)
// by linking live herb moisture content (arg 2)
// to estimate the fuel bed fraction of cured live fuel.
export class LiveCuringModule extends ModuleBase {
    /**
     * 
     * @param {string} path Prefix for this module's fully qualified node names ('site/surface/{primary|secondary}/bed/')
     * @param {string} herbmois Fully qualified node name ('site/weather/moisture/live/herb')
     */
    constructor(path, herbmois) {
        super(path)

        // fully qualified node keys
        this.cured = path + 'cured live fuel fraction'
        // linked node keys referenced by genome()
        this.herbmois = herbmois

        // config keys
        this.config = 'cured live fuel fraction'
        this.input = 'input'
        this.estimated = 'estimated'
        this.options = [this.input, this.estimated]

        this.genome = [
            [this.cured, 0, U.fraction, 0, [
                [this.input, Dag.input, []],
                [this.estimated, Eq.curedHerbFraction, [this.herbmois]]
            ]]
        ]
    }
}
