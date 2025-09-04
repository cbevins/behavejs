import { Dag, ModuleBase, U } from './index.js'

// WindSpeedReductionModule extends the FuelBedModule (named in arg 1)
// by linking the canopy-indiced wrf (arg2 ) and the surface fuel-induced wrf (arg 3) 
// to derive the fuel bed's overall midflame wind reduction factor
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
        this.fwsrf = fwsrf  // probably 'site/{primary|secondary}/bed/wind speed reduction factor'

        // config keys
        this.config = 'midflame wind speed reduction factor'
        this.input = 'input'
        this.estimated = 'estimated'
        this.options = [this.input, this.estimated]

        this.genome = [
            [this.mwsrf, 1, U.fraction, 0, [
                [this.input, Dag.input, []],
                [this.estimated, Math.min, [this.cwsrf, this.fwsrf]],
            ]],
        ]
    }
}
