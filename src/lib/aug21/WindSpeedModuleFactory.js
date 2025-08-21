import { Dag, C, P, U, ModuleFactory } from './index.js'
import { WindEquations as Wind} from './index.js'

/**
 * 
 * @param {string} path 'site/weather/wind/speed/'
 * @param {string} wsrfPath 'site/weather/wind/reduction/'
 */
export class WindSpeedModuleFactory {
    constructor(){}

    static configs() {
        return [
            {name: 'wind speed input', options: [
                'at midflame height',
                'at 20-ft',
                'at 10-m']},
        ]
    }

    // Returns an array of all the module nodes with fully qualified path/leaf names
    static pathNodes(path) {
        const any = ModuleFactory.any
        const cfg = WindSpeedModuleFactory.configs()
        const cfgInp = cfg[0].name
        const nodes = [
            [path+'at 20-ft', 0, U.windSpeed, [
                [cfgInp, 'at 20-ft', Dag.input, []],
                [cfgInp, 'at 10-m', Wind.at20ftFrom10m, [path+'at 10-m']],
                [cfgInp, 'at midflame height', Wind.at20ftFromMidflame, [path+'at midflame height', path+'reduction factor']],
            ]],
            [path+'at 10-m', 0, U.windSpeed, [
                [cfgInp, 'at 10-m', Dag.input, []],
                [cfgInp, 'at 20-ft', Wind.at10mFrom20ft, [path+'at 20-ft']],
                [cfgInp, 'at midflame height', Wind.at10mFromMidflame, [path+'at midflame height', path+'reduction factor']],
            ]],
            [path+'at midflame height', 0, U.windSpeed, [
                [cfgInp, 'at midflame height', Dag.input, []],
                [cfgInp, 'at 20-ft', Wind.atMidflameFrom20ft, [path+'at 20-ft', path+'reduction factor']],
                [cfgInp, 'at 10-m', Wind.atMidflameFrom10m, [path+'at 10-m', path+'reduction factor']],
            ]],
            // These will be moved into other modules after testing the bind feature
            [path+'reduction factor', 0, U.fraction, [
                [any, any, Math.min, [path+'canopy reduction factor', path+'fuel bed reduction factor']],
            ]],
            [path+'canopy reduction factor', 0, U.fraction, [
                [any, any, Dag.input, []],
            ]],
            [path+'fuel bed reduction factor', 0, U.fraction, [
                [any, any, Dag.input, []],
            ]],
]
        return nodes
    }

    /**
     * 
     * @param {string} path 
     * @param {array} configs Elements are array of [<cfgName>, <cfgValue>]
     * @param {array} bindings Elements are array of [nodeKey, boundNodeFullKey]
     */
    static configure(path,
        configs=[['wind speed input', 'at midflame height']],
        bindings=[]) {
        const nodes = WindSpeedModuleFactory.pathNodes(path)
        return ModuleFactory.select(path, nodes, configs, bindings).sort()
    }
}
