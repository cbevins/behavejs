import { Dag, P, ModuleBase, U } from '../index.js'
import { FuelBedEquations as Bed } from '../index.js'

export class WindSpeedReductionModule extends ModuleBase {
    /**
     * @param {string} path Prefix for this module instance's fully qualified node names
     * (something like 'primary/surface/bed/') to prefix this module's 'wind speed reduction/<node>' keys.
     * @param {string} canopyWsrf Fully qualified node name, something like 'canopy/wind speed reduction factor'.
     * @param {string} fuelWsrf Fully qualified node name, something like 'primary/surface/bed/wind speed reduction factor'.
     */
    constructor(path, canopyShelters, canopyWsrf, fuelWsrf){
        super(path, 'WindSpeedReductionModule')
        const cfg = this.setConfig()
        this.nodes = [
            [path+P.wsrfMidflame, 1, U.fraction, 0, [
                [cfg.observed, Dag.input, []],
                [cfg.estimated, Bed.windSpeedAdjustmentFactor, [canopyShelters, canopyWsrf, fuelWsrf]],
            ]],
        ]
    }
    setConfig() {
        const observed = 'observed'
        const estimated = 'estimated'
        this.config = {
            observed, estimated,    // individual key for outside reference
            options: [observed, estimated],
            prompt: 'wind speed reduction factor (from 20-ft to midflame height) is',
            prompts: [
                [observed, 'an input parameter'],
                [estimated, 'estimated from fuel depth and canopy parameters'],
            ],
        }
        return this.config
    }
}
