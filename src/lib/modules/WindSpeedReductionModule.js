import { Dag, C, P, ModuleBase, U } from '../index.js'

export class WindSpeedReductionModule extends ModuleBase {
    /**
     * @param {string} path Prefix for this module instance's fully qualified node names
     * (something like 'primary/surface/bed/') to prefix this module's 'wind speed reduction/<node>' keys.
     * @param {string} canopyWsrf Fully qualified node name, something like 'canopy/wind speed reduction factor'.
     * @param {string} fuelWsrf Fully qualified node name, something like 'primary/surface/bed/wind speed reduction factor'.
     */
    constructor(path, canopyWsrf, fuelWsrf){
        super(path, 'WindSpeedReductionModule')

        // config keys
        this.config = 'midflame wind speed reduction factor'
        this.options = [C.wsrfObserved, C.wsrfEstimated]

        this.nodes = [
            [path+P.wsrfMidflame, 1, U.fraction, 0, [
                [C.wsrfObserved, Dag.input, []],
                [C.wsrfEstimated, Math.min, [canopyWsrf, fuelWsrf]],
            ]],
        ]
    }
}
