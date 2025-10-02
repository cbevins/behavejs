import { Dag } from '../index.js'
import { ModuleBase } from './ModuleBase.js'
import { Paths as P} from './Paths.js'
import { Units as U} from './Units.js'
import { FuelBedEquations as Bed } from '../index.js'

export class WindSpeedReductionModule extends ModuleBase {
    /**
     * @param {string} prefix Prefix for this module instance's fully qualified node names
     * (something like 'primary/wind/speed/reduction factor/') to prefix this module's keys.
     * @param {Config} cfg Config reference
     * @param {string} canopyPath Path to the canopy module, something like 'canopy/'
     * @param {string} bedPath Path to the primary or secondary surface fuel module, something 'primary/surface/bed/wind speed reduction factor'.
     */
    constructor(prefix, cfg, canopyPath, bedPath) { //canopyShelters, canopyWsrf, fuelWsrf){
        super(prefix, P.wsrfSelf, P.wsrfMod, cfg)
        const path = this.path
        
        this.nodes = [
            [path+P.wsrfMidflame, 1, U.fraction, cfg, [
                [cfg.observed, Dag.input, []],
                [cfg.estimated, Bed.windSpeedAdjustmentFactor, [
                    canopyPath + P.canopyShelters,
                    canopyPath + P.canopyWsrf,
                    bedPath + P.fuelWsrf]],
            ]],
        ]
    }
}
