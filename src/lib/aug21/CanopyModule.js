import { Dag, CanopyEquations as Canopy} from '../index.js'
import { P, U } from './names.js'
import { ModuleBase } from './ModuleBase.js'

export class CanopyModule extends ModuleBase {
    constructor(path) {
        super(path)
        // node keys
        this.base = 'base height'
        this.bulk = 'bulk density'
        this.cover = 'coverage'
        this.heat = 'heat of combustion'
        this.height = 'total height'
        this.hpua = 'heat per unit area'
        this.length = 'crown length'
        this.load = 'fuel load'
        this.ratio = 'crown ratio'
        this.shelters = 'shelters fuel from wind'
        this.vol = 'volumetric fill ratio'
        this.wsrf = 'wind speed reduction factor'
        // configs
        this.config = 'canopy height input'
        this.options = [
            'ratio-height', 'ratio-base', 'ratio-length',
            'height-length', 'height-base', 'length-base'
        ]
    }

    genome() {
        const path = this.path
        const cfg = this.config
        return [
            // inputs or link
            [path+this.cover, 0, U.fraction, [[this.any, this.any, Dag.input, []]]],
            [path+this.bulk, 0, U.fraction, [[this.any, this.any, Dag.input, []]]],
            [path+this.heat, 0, U.heat, [[this.any, this.any, Dag.input, []]]],
            
            // configured by 'canopy height input'
            [path+this.base, 0, U.canopyHt, [
                [cfg, 'ratio-height', Canopy.baseFromRatioHeight, [path+this.ratio, path+this.height]],
                [cfg, 'ratio-base', Dag.input, []],
                [cfg, 'ratio-length', Canopy.baseFromRatioLength, [path+this.ratio, path+this.length]],
                [cfg, 'height-length', Canopy.baseFromHeightLength, [path+this.height, path+this.length]],
                [cfg, 'height-base', Dag.input, []],
                [cfg, 'length-base', Dag.input, []]]
            ],
            [path+this.length, 0, U.canopyHt, [
                [cfg, 'ratio-height', Canopy.lengthFromRatioHeight, [path+this.ratio, path+this.height]],
                [cfg, 'ratio-base', Canopy.lengthFromRatioBase, [path+this.ratio, path+this.base]],
                [cfg, 'ratio-length', Dag.input, []],
                [cfg, 'height-length', Dag.input, []],
                [cfg, 'height-base', Canopy.lengthFromHeightBase, [path+this.height, path+this.base]],
                [cfg, 'length-base', Dag.input, []]],
            ],
            [path+this.height, 0, U.canopyHt, [
                [cfg, 'ratio-height', Dag.input, []],
                [cfg, 'ratio-base', Canopy.heightFromRatioBase, [path+this.ratio, path+this.base]],
                [cfg, 'ratio-length', Canopy.heightFromRatioLength, [path+this.ratio, path+this.length]],
                [cfg, 'height-length', Dag.input, []],
                [cfg, 'height-base', Dag.input, []],
                [cfg, 'length-base', Canopy.heightFromLengthBase, [path+this.length, path+this.base]]],
            ],
            [path+this.ratio, 0, U.fraction, [
                [cfg, 'ratio-height', Dag.input, []],
                [cfg, 'ratio-base', Dag.input, []],
                [cfg, 'ratio-length', Dag.input, []],
                [cfg, 'height-length', Canopy.ratioFromHeightLength, [path+this.height, path+this.length]],
                [cfg, 'height-base', Canopy.ratioFromHeightBase, [path+this.height, path+this.base]],
                [cfg, 'length-base', Canopy.ratioFromLengthBase, [path+this.length, path+this.base]]],
            ],
            // derived from above
            [path+this.vol, 0, U.fraction, [
                [this.any, this.any, Canopy.crownFill, [path+this.cover, path+this.ratio]]]],
            [path+this.load, 0, U.fuelLoad, [
                [this.any, this.any, Canopy.fuelLoad, [path+this.bulk, path+this.length]]]],
            [path+this.hpua, 0, U.hpua, [
                [this.any, this.any, Canopy.heatPerUnitArea, [path+this.load, path+this.heat]]]],
            [path+this.shelters, 0, U.yesno, [
                [this.any, this.any, Canopy.sheltersFuelFromWind, [path+this.cover, path+this.height, path+this.vol]]]],
            [path+this.wsrf, 0, U.fraction, [
                [this.any, this.any, Canopy.windSpeedAdjustmentFactor, [path+this.cover, path+this.height, path+this.vol]]]],
        ]
    }
}