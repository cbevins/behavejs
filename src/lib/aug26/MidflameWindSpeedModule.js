import { Calc, Dag } from '../index.js'
import { ModuleBase, U } from './index.js'

// MidflameWindSpeedModule extends the FuelBedModule (named in arg 1)
// by linking the wind at 20-ft (arg 2) and midflame reduction factor (arg 3)
// to estimate the fuel bed's wind speed at midflame height
export class MidflameWindSpeedModule extends ModuleBase {
    /**
     * @param {string} path Prefix for this module's fully qualified node names ('site/surface/{primary|secondary}/bed/')
     * @param {string} ws20 Fully qualified node name ('site/weather/wind/speed/at 20-ft')
     * @param {string} wsrf Fully qualified node name ('site/surface/{primary|secondary}/bed/wind speed reduction factor')
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

        this.genome = [
            [this.wsmid, 0, U.windSpeed, 0, [
                [this.input, Dag.input, []],
                [this.estimated, Calc.multiply, [this.ws20, this.wsrf]]
            ]],
        ]
    }
}
