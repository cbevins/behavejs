import { Dag, WindEquations as Wind } from '../index.js'
import { P, U } from './names.js'
import { ModuleBase } from './ModuleBase.js'

export class WindSpeedModule extends ModuleBase {
    /**
     * 
     * @param {string} path Prefix for this module's fully qualified node names ('site/weather/wind/speed/')
     */
    constructor(path){
        super(path)
        // node keys
        this.at20ft = 'at 20-ft'
        this.at10m = 'at 10-m'
        // config keys
        this.config = 'wind speed input'
        this.options = [this.at20ft, this.at10m]
    }

    genome() {
        const path = this.path
        return [
            [path+this.at20ft, 0, U.windSpeed, [
                [this.config, this.at20ft, Dag.input, []],
                [this.config, this.at10m, Wind.at20ftFrom10m, [path+this.at10m]],
            ]],
            [path+this.at10m, 0, U.windSpeed, [
                [this.config, this.at10m, Dag.input, []],
                [this.config, this.at20ft, Wind.at10mFrom20ft, [path+this.at20ft]],
            ]],
        ]
    }
}
