import { Calc, Dag } from '../index.js'
import { ModuleBase, U, WindSpeedModule as Wind, WindSpeedReductionModule as Wsrf } from './index.js'

export class MidflameWindSpeedModule extends ModuleBase {
    /**
     * 
     * @param {string} path Prefix for this module's fully qualified node names ('site/{primary|secondary}/bed/')
     * @param {string} ws20 Fully qualified node name ('site/weather/wind/speed/at 20-ft')
     * @param {string} wsrf Fully qualified node name ('site/{primary|secondary}/bed/wind speed reduction factor')
     */
    constructor(path, ws20, wsrf) {
        super(path)
        // fully qualified node keys
        this.wsmid = path + 'wind speed at midflame'
        // linked node keys referenced by genome()
        this.ws20 = ws20
        this.wsrf = wsrf
        // config keys
        this.config = 'wind speed at midflame'
        this.input = 'input'
        this.estimated = 'estimated'
        this.options = [this.input, this.estimated]
    }

    genome() {
        return [
            [this.wsmid, 0, U.windSpeed, [
                [this.config, this.input, Dag.input, []],
                [this.config, this.estimated, Calc.multiply, [this.ws20, this.wsrf]]
            ]],
        ]
    }
}
