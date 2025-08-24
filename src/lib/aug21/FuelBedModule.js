import { Dag, FuelBedEquations as Bed } from '../index.js'
import { ModuleBase, U } from './index.js'

export class FuelBedModule extends ModuleBase {
    constructor(path){
        super(path)
        // fully qualified node keys
        this.depth = path + 'depth'
        this.wsrf  = path + 'wind speed reduction factor'
    }

    /**
     * Note that:
     * - 'wind speed reduction factor' is added to this path by WindSpeedReductionModule
     * - 'wind speed at midflame' is added to this path by MidflameWindSpeedModule
     */
    genome() {
        return [
            [this.depth, 1, U.fuelDepth, [[this.any, this.any, Dag.input, []]]],
            [this.wsrf, 1, U.factor, [
                [this.any, this.any, Bed.openWindSpeedAdjustmentFactor, [this.depth]]]]
        ]
    }
}
