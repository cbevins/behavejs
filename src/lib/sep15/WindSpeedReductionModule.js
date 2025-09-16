import { Dag, U } from '../index.js'
import { Paths as P} from './Paths.js'
import { ModuleBase } from './ModuleBase.js'
import { FuelBedEquations as Bed } from '../index.js'

export class WindSpeedReductionModule extends ModuleBase {
    /**
     * @param {string} prefix Prefix for this module instance's fully qualified node names
     * (something like 'primary/wind/speed/reduction factor/') to prefix this module's keys.
     * @param {Config} cfg Config reference
     * @param {string} canopyShelters Fully qualified node name, something like 'canopy/'shelters fuel from wind'
     * @param {string} canopyWsrf Fully qualified node name, something like 'canopy/wind/speed/reduction/factor'
     * @param {string} fuelWsrf Fully qualified node name, something like 'primary/surface/bed/wind speed reduction factor'.
     */
    constructor(prefix, cfg, canopyShelters, canopyWsrf, fuelWsrf){
        super(prefix, P.wsrfSelf, 'WindSpeedReductionModule', cfg)
        const path = this.path
        this.nodes = [
            [path+P.wsrfMidflame, 1, U.fraction, cfg.key, [
                [cfg.observed, Dag.input, []],
                [cfg.estimated, Bed.windSpeedAdjustmentFactor, [canopyShelters, canopyWsrf, fuelWsrf]],
            ]],
        ]
    }
}
