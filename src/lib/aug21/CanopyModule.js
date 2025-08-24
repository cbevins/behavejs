import { Dag, CanopyEquations as Canopy} from '../index.js'
import { U } from './index.js'
import { ModuleBase } from './ModuleBase.js'

export class CanopyModule extends ModuleBase {
    constructor(path) {
        super(path)
        // fully qualified node keys
        this.base     = path + 'base height'
        this.bulk     = path + 'bulk density'
        this.cover    = path + 'coverage'
        this.heat     = path + 'heat of combustion'
        this.height   = path + 'total height'
        this.hpua     = path + 'heat per unit area'
        this.length   = path + 'crown length'
        this.load     = path + 'fuel load'
        this.ratio    = path + 'crown ratio'
        this.shelters = path + 'shelters fuel from wind'
        this.vol      = path + 'volumetric fill ratio'
        this.wsrf     = path + 'wind speed reduction factor'
        // configs
        this.config = 'canopy height input'
        // combinations of inputs
        this.baseHeight = 'height-base'
        this.heightBase = 'height-base'
        this.ratioHeight = 'ratio-height'
        this.heightRatio = 'ratio-height'
        this.lengthHeight = 'height-length'
        this.heightLength = 'height-length'
        this.ratioBase = 'ratio-base'
        this.baseRatio = 'ratio-base'
        this.ratioLength = 'ratio-length'
        this.lengthRatio = 'ratio-length'
        this.lengthBase = 'length-base'
        this.baseLength = 'length-base'

        this.options = [
            this.ratioHeight, this.ratioBase, this.ratioLength,
            this.heightLength, this.heightBase, this.lengthBase]
    }

    genome() {
        const cfg = this.config
        return [
            // inputs or link
            [this.cover, 0, U.fraction, [[this.any, this.any, Dag.input, []]]],
            [this.bulk, 0, U.fraction, [[this.any, this.any, Dag.input, []]]],
            [this.heat, 0, U.heat, [[this.any, this.any, Dag.input, []]]],
            
            // configured by 'canopy height input'
            [this.base, 0, U.canopyHt, [
                [cfg, 'ratio-height', Canopy.baseFromRatioHeight, [this.ratio, this.height]],
                [cfg, 'ratio-base', Dag.input, []],
                [cfg, 'ratio-length', Canopy.baseFromRatioLength, [this.ratio, this.length]],
                [cfg, 'height-length', Canopy.baseFromHeightLength, [this.height, this.length]],
                [cfg, 'height-base', Dag.input, []],
                [cfg, 'length-base', Dag.input, []]]
            ],
            [this.length, 0, U.canopyHt, [
                [cfg, 'ratio-height', Canopy.lengthFromRatioHeight, [this.ratio, this.height]],
                [cfg, 'ratio-base', Canopy.lengthFromRatioBase, [this.ratio, this.base]],
                [cfg, 'ratio-length', Dag.input, []],
                [cfg, 'height-length', Dag.input, []],
                [cfg, 'height-base', Canopy.lengthFromHeightBase, [this.height, this.base]],
                [cfg, 'length-base', Dag.input, []]],
            ],
            [this.height, 0, U.canopyHt, [
                [cfg, 'ratio-height', Dag.input, []],
                [cfg, 'ratio-base', Canopy.heightFromRatioBase, [this.ratio, this.base]],
                [cfg, 'ratio-length', Canopy.heightFromRatioLength, [this.ratio, this.length]],
                [cfg, 'height-length', Dag.input, []],
                [cfg, 'height-base', Dag.input, []],
                [cfg, 'length-base', Canopy.heightFromLengthBase, [this.length, this.base]]],
            ],
            [this.ratio, 0, U.fraction, [
                [cfg, 'ratio-height', Dag.input, []],
                [cfg, 'ratio-base', Dag.input, []],
                [cfg, 'ratio-length', Dag.input, []],
                [cfg, 'height-length', Canopy.ratioFromHeightLength, [this.height, this.length]],
                [cfg, 'height-base', Canopy.ratioFromHeightBase, [this.height, this.base]],
                [cfg, 'length-base', Canopy.ratioFromLengthBase, [this.length, this.base]]],
            ],
            // derived from above
            [this.vol, 0, U.fraction, [
                [this.any, this.any, Canopy.crownFill, [this.cover, this.ratio]]]],
            [this.load, 0, U.fuelLoad, [
                [this.any, this.any, Canopy.fuelLoad, [this.bulk, this.length]]]],
            [this.hpua, 0, U.hpua, [
                [this.any, this.any, Canopy.heatPerUnitArea, [this.load, this.heat]]]],
            [this.shelters, 0, U.yesno, [
                [this.any, this.any, Canopy.sheltersFuelFromWind, [this.cover, this.height, this.vol]]]],
            [this.wsrf, 0, U.fraction, [
                [this.any, this.any, Canopy.windSpeedAdjustmentFactor, [this.cover, this.height, this.vol]]]],
        ]
    }
}