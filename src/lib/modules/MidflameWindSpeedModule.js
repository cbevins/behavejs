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
     * @param {string} wspd20ft Fully qualified name of the 20-ft wind speed node,
     * something like 'weather/wind/speed/at 20-ft'.
     * @param {string} wsrfMidflame Fully qualified name of the midflame wind speed reduction factor,
     * something like 'primary/surface/bed/wind speed reduction factor/midflame'.
     */
    constructor(prefix, cfg, wspd20ft, wsrfMidflame) {
        super(prefix, P.midflameSelf, P.midflameMod, cfg)
        const path = this.path
        this.nodes = [
            [path+P.midflame, 0, U.windSpeed, cfg, [
                [cfg.observed, Dag.input, []],
                [cfg.estimated, Calc.multiply, [wspd20ft, wsrfMidflame]]
            ]]
        ]
    }
}
