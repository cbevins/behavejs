import { Calc, Dag } from '../index.js'
import { P, U } from './names.js'
import { ModuleBase } from './ModuleBase.js'
import { WindSpeedModule as Wind } from './WindSpeedModule.js'
import { WindSpeedReductionModule as Wsrf } from './WindSpeedReductionModule.js'
/**
 * 
 * @param {string} path Prefix for this module's fully qualified node names ('site/{primary|secondary}/bed/')
 * @param {string} ws20 Fully qualified node name ('site/weather/wind/speed/at 20-ft')
 * @param {string} wsrf Fully qualified node name ('site/{primary|secondary}/bed/wind speed reduction factor')
 */
export class MidflameWindSpeedModule extends ModuleBase {
    constructor(path, ws20, wsrf) {
        super(path)
        // node keys
        this.wsmid = 'wind speed at midflame'
        // link keys
        this.ws20 = ws20
        this.wsrf = wsrf
        // config keys
        this.config = 'wind speed at midflame'
        this.input = 'input'
        this.estimated = 'estimated'
        this.options = [this.input, this.estimated]
    }

    genome() {
        const path = this.path
        return [
            [path+this.wsmid, 0, U.windSpeed, [
                [this.config, this.input, Dag.input, []],
                [this.config, this.estimated, Calc.multiply, [this.ws20, this.wsrf]]
            ]],
        ]
    }
}
