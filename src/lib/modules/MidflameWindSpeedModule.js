
import { Dag, P, ModuleBase, U } from '../index.js'
import { Calc } from '../index.js'

export class MidflameWindSpeedModule extends ModuleBase {
    /**
     * @param {string} path Prefix for this module instance's fully qualified node names,
     * (something like 'primary/surface/bed/') to refix this module's 'wind speed reduction factor/<node>' keys.
     * @param {string} wspd20ft Fully qualified name of the 20-ft wind speed node,
     * something like 'weather/wind/speed/at 20-ft'.
     * @param {string} wsrfMidflame Fully qualified name of the midflame wind speed reduction factor,
     * something like 'primary/surface/bed/wind speed reduction factor/midflame'.
     */
    constructor(path, wspd20ft, wsrf) {
        super(path, 'MidflameWindSpeedModule')
        const cfg = this.setConfig()
        this.nodes = [
            [path+P.midflame, 0, U.windSpeed, 0, [
                [cfg.observed, Dag.input, []],
                [cfg.estimated, Calc.multiply, [wspd20ft, wsrf]]
            ]]
        ]
    }
    setConfig() {
        const observed = 'observed'
        const estimated = 'estimated'
        this.config = {
            observed, estimated,    // individual key for outside reference
            options: [observed, estimated],
            prompt: 'wind speed at midflame height is',
            prompts: [
                [observed, 'input parameter'],
                [estimated, 'estimated from 20-ft wind speed and a reduction factor'],
            ],
        }
        return this.config
    }
}
