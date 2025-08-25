import { Dag } from '../index.js'
import { ModuleBase, U } from './index.js'

export class WindSpeedReductionModule extends ModuleBase {
    /**
     * Adds wind speed reduction factor node to a fuel bed.
     * @param {string} path Prefix for this module's fully qualified node names ('site/surface/{primary|secondary}/bed/')
     * @param {string} cwsrf Fully qualified node name ('site/canopy/wind speed reduction factor')
     * @param {string} fwsrf Fully qualified node name ('site/surface/{primary|secondary}/bed/fuel bed reduction factor')
     */
    constructor(path, cwsrf, fwsrf){
        super(path)
        // fully qualified node keys
        this.mwsrf = path + 'midflame wind speed reduction factor'
        // linked node keys referenced by genome()
        this.cwsrf = cwsrf  // probably 'site/canopy/wind speed reduction factor'
        this.fwsrf = fwsrf  // probably 'site/{primary|secondary}/bed/fuel bed reduction factor'
        // config keys
        this.config = 'midflame wind speed reduction factor'
        this.input = 'input'
        this.estimated = 'estimated'
        this.options = [this.input, this.estimated]
    }

    genome() {
        return [
            [this.mwsrf, 1, U.fraction, [
                [this.config, this.input, Dag.input, []],
                [this.config, this.estimated, Math.min, [this.cwsrf, this.fwsrf]],
            ]],
        ]
    }
}
