
import { Dag, C, P, ModuleBase, U } from '../index.js'
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

        // config keys
        this.config = 'wind speed at midflame'
        this.options = [C.midflameObserved, C.midflameEstimated]

        this.nodes = [
            [path+P.midflame, 0, U.windSpeed, 0, [
                [C.midflameObserved, Dag.input, []],
                [C.midflameEstimated, Calc.multiply, [wspd20ft, wsrf]]
            ]],
        ]
    }
}
