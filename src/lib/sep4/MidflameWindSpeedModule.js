
import { Dag, ModuleBase, U } from './index.js'
import { Calc } from '../index.js'

// MidflameWindSpeedModule extends the FuelBedModule (named in arg 1)
// by linking the wind at 20-ft (arg 2) and midflame reduction factor (arg 3)
// to estimate the fuel bed's wind speed at midflame height
export class MidflameWindSpeedModule extends ModuleBase {
    /**
     * @param {string} path Prefix for this module's fully qualified node names
     *        something like 'site/surface/primary/wind/speed/midflame'
     * @param {string} ws20 Fully qualified name of the 20-ft wind speed node
     *        something like 'site/weather/wind/speed/at 20-ft'
     *        ('site/surface/{primary|secondary}/bed/wind speed reduction factor')
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
        this.observed = 'observed'
        this.estimated = 'estimated'
        this.options = [this.observed, this.estimated]

        this.nodes = [
            [this.wsmid, 0, U.windSpeed, 0, [
                [this.observed, Dag.input, []],
                [this.estimated, Calc.multiply, [this.ws20, this.wsrf]]
            ]],
        ]
    }
}
