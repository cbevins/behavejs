import { Dag, FuelBedEquations as Bed } from '../index.js'
import { P, U } from './names.js'
import { ModuleBase } from './ModuleBase.js'

export class FuelBedModule extends ModuleBase {
    constructor(path){
        super(path)
        // node keys
        this.depth = 'depth'
        this.fwrf = 'fuel bed wind reduction factor'
        this.wrf 
    }

    /**
     * Note that:
     * - 'wind speed reduction factor' is added to this path by WindSpeedReductionModule
     * - 'wind speed at midflame' is added to this path by MidflameWindSpeedModule
     */
    genome() {
        const path = this.path
        return [
            [path+this.depth, 1, U.fuelDepth, [[this.any, this.any, Dag.input, []]]],
            [path+this.fwrf, 1, U.factor, [
                [this.any, this.any, Bed.openWindSpeedAdjustmentFactor, [path+this.depth]]]]
        ]
    }
}
