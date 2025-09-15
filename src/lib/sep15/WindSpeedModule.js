import { Dag, U } from '../index.js'
import { Paths as P} from './Paths.js'
import { ModuleBase } from './ModuleBase.js'
import { WindEquations as Wind } from '../index.js'

export class WindSpeedModule extends ModuleBase {
    /**
     * Creates the wind speed module nodes.
     * @param {string} prefix Prefix for this module instance's fully qualified node names
     * (something like 'weather/' or '') to prefix this module's 'wind/speed/<node>' keys.
     * @param {Config} cfg Config reference
     */
    constructor(prefix, cfg){
        super(prefix, P.wspdSelf, 'WindSpeedModule', cfg)
        const path = prefix + this.self
        this.nodes = [
            [path+P.wspd20ft, 0, U.windSpeed, this.cfg.key, [
                [cfg.at20ft, Dag.input, []],
                [cfg.at10m, Wind.windSpeedAt20ftFrom10m, [path+P.wspd10m]]]],
            [path+P.wspd10m, 0, U.windSpeed, this.cfg.key, [
                [cfg.at20ft, Dag.input, []],
                [cfg.at10m, Wind.windSpeedAt10mFrom20ft, [path+P.wspd20ft]]]],
        ]
    }
}
