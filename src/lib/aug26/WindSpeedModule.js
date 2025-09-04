import { Dag, ModuleBase, U } from './index.js'
import { WindEquations as Wind } from '../index.js'

export class WindSpeedModule extends ModuleBase {
    /**
     * Creates the wind speed module nodes.
     * @param {string} path Prefix for this module's fully qualified node names ('site/weather/wind/speed/')
     */
    constructor(path){
        super(path)

        // fully qualified node keys
        this.at20ft = path + 'at 20-ft'
        this.at10m  = path + 'at 10-m'

        // config keys
        this.config = 'wind speed input'
        this.input20ft = 'at 20-ft'
        this.input10m = 'at 10-m'
        this.options = [this.input20ft, this.input10m]

        this.genome = [
            [this.at20ft, 0, U.windSpeed, 0, [
                ['at 20-ft', Dag.input, []],
                ['at 10-m', Wind.at20ftFrom10m, [this.at10m]],
            ]],
            [this.at10m, 0, U.windSpeed, 0, [
                ['at 20-ft', Dag.input, []],
                ['at 10-m', Wind.at10mFrom20ft, [this.at20ft]],
            ]],
        ]
    }
}
