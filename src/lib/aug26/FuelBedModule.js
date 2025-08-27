import { Dag, FuelBedEquations as Bed } from '../index.js'
import { ModuleBase, U } from './index.js'

export class FuelBedModule extends ModuleBase {
    /**
     * Creates the fire fuel bed module nodes.
     * @param {string} path Prefix for this module's fully qualified node names ('site/surface/{primary|secondary}/bed/')
     */
    constructor(path){
        super(path)

        // fully qualified node keys
        this.depth = path + 'depth'
        this.wsrf  = path + 'wind speed reduction factor'

    /**
     * Note that:
     * - 'wind speed reduction factor' is added to this path by the WindSpeedReductionModule
     * - 'wind speed at midflame' is added to this path by the MidflameWindSpeedModule
     */
    this.genome = [
            [this.depth, 1, U.fuelDepth, 0, [
                [this.any, Dag.input, []]]],
            [this.wsrf, 1, U.factor, 0, [
                [this.any, Bed.openWindSpeedAdjustmentFactor, [this.depth]]]]
        ]
    }
}
