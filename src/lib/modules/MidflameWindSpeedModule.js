import { Dag } from '../index.js'
import { ModuleBase } from './ModuleBase.js'
import { Paths as P} from './Paths.js'
import { Units as U} from './Units.js'
import { Calc } from '../index.js'

export class MidflameWindSpeedModule extends ModuleBase {
    /**
     * @param {string} prefix Prefix for this module instance's fully qualified node names,
     * (something like 'primary/surface/bed/') to refix this module's 'wind speed reduction factor/<node>' keys.
     * @param {Config} cfg Config reference
     * @param {string} windSpeedPath Path to the WindSpeedModule, something like 'weather/wind/speed/'.
     * @param {string} wsrfPath Path to the WindSpeedReductionModule, something like 'primary/wind/speed/reduction/factor'.
     */
    constructor(prefix, cfg, windSpeedPath, wsrfPath) {
        super(prefix, P.midflameSelf, P.midflameMod, cfg)
        const path = this.path
        const wspd20ftNode = windSpeedPath + P.wspd20ft
        const wsrfNode = wsrfPath + P.wsrfMidflame

        this.nodes = [
            [path+P.midflame, 0, U.windSpeed, cfg, [
                [cfg.observed, Dag.input, []],
                [cfg.estimated, Calc.multiply, [wspd20ftNode, wsrfNode]]
            ]]
        ]
    }
}
