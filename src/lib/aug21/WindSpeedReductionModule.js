import { Dag, WindEquations as Wind} from '../index.js'
import { P, U} from './names.js'
import { ModuleBase } from './ModuleBase.js'
import { CanopyModule as C } from './CanopyModule.js'
import { FuelBedModule as F } from './FuelBedModule.js'

/**
 * Adds wind speed reduction factor node to a fuel bed.
 * @param {string} path Prefix for this module's fully qualified node names ('site/{primary|secondary}/bed/')
 * @param {string} cwsrf Fully qualified node name ('site/canopy/wind speed reduction factor')
 * @param {string} fwsrf Fully qualified node name ('site/{primary|secondary}/bed/fuel bed reduction factor')
 */
export class WindSpeedReductionModule extends ModuleBase {
    constructor(path=P.bed1, cwsrf=P.canopy+C.wsrf, fwsrf=P.bed1+F.fwsrf){
        super(path)
        // node keys
        this.wsrf = 'wind speed reduction factor'
        // link keys
        this.cwsrf = cwsrf
        this.fwsrf = fwsrf
        // config keys
        this.config = this.wsrf
        this.input = 'input'
        this.estimated = 'estimated'
        this.options = [this.input, this.estimated]
    }

    genome() {
        const path = this.path
        return [
            [path+this.wsrf, 1, U.fraction, [
                [this.config, this.input, Dag.input, []],
                [this.config, this.estimated, Math.min, [this.cwsrf, this.fwsrf]],
            ]],
        ]
    }
}
