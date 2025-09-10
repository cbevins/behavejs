import { Dag, C, P, ModuleBase, U } from './index.js'
import { WindEquations as Wind } from './index.js'

export class WindSpeedModule extends ModuleBase {
    /**
     * Creates the wind speed module nodes.
     * @param {string} path Prefix for this module instance's fully qualified node names
     * (something like 'weather/' or '') to prefix this module's 'wind/speed/<node>' keys.
     */
    constructor(path){
        super(path, 'WindSpeedModule')

        // configs
        this.config = 'wind speed input'
        this.options = [C.wspd20ft, C.wspd10m]
        
        this.nodes = [
            [path+P.wspd20ft, 0, U.windSpeed, 0, [
                [C.wspd20ft, Dag.input, []],
                [C.wspd10m, Wind.at20ftFrom10m, [path+P.wspd10m]],
            ]],
            [path+P.wspd10m, 0, U.windSpeed, 0, [
                [C.wspd20ft, Dag.input, []],
                [C.wspd10m, Wind.at10mFrom20ft, [path+P.wspd20ft]],
            ]],
        ]
    }
}
