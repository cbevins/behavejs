import { Dag, L, ModuleBase, U } from './index.js'
import { CanopyEquations as Canopy} from '../index.js'

export class CanopyModule extends ModuleBase {
    /**
     * Creates the canopy module nodes.
     * @param {string} path Prefix for this module's fully qualified node names ('site/canopy/')
     */
    constructor(path) {
        super(path)

        // fully qualified node keys
        this.base     = path + 'base height'
        this.bulk     = path + L.fuelBulk
        this.cover    = path + 'coverage'
        this.heat     = path + L.fuelHeat
        this.height   = path + 'total height'
        this.hpua     = path + L.fireHpua
        this.length   = path + 'crown length'
        this.load     = path + L.fuelLoad
        this.ratio    = path + 'crown ratio'
        this.shelters = path + 'shelters fuel from wind'
        this.vol      = path + 'volumetric fill ratio'
        this.wsrf     = path + L.wsrfCanopy

        // configs
        this.config = 'canopy height input'
        // combinations of inputs
        this.baseHeight = 'height-base'
        this.heightBase = this.baseHeight
        this.ratioHeight = 'ratio-height'
        this.heightRatio = this.ratioHeight
        this.lengthHeight = 'height-length'
        this.heightLength = this.lengthHeight
        this.ratioBase = 'ratio-base'
        this.baseRatio = this.ratioBase
        this.ratioLength = 'ratio-length'
        this.lengthRatio = this.ratioLength
        this.lengthBase = 'length-base'
        this.baseLength = this.baseLength

        this.options = [
            this.ratioHeight, this.ratioBase, this.ratioLength,
            this.heightLength, this.heightBase, this.lengthBase]

        this.nodes = [
            // inputs or link
            [this.cover, 0, U.fraction, 0, [[this.any, Dag.input, []]]],
            [this.bulk, 0, U.fraction, 0, [[this.any, Dag.input, []]]],
            [this.heat, 0, U.heat, 0, [[this.any, Dag.input, []]]],
            
            // configured by 'canopy height input'
            [this.base, 0, U.treeLeng, 0, [
                ['ratio-height', Canopy.baseFromRatioHeight, [this.ratio, this.height]],
                ['ratio-base', Dag.input, []],
                ['ratio-length', Canopy.baseFromRatioLength, [this.ratio, this.length]],
                ['height-length', Canopy.baseFromHeightLength, [this.height, this.length]],
                ['height-base', Dag.input, []],
                ['length-base', Dag.input, []]]
            ],
            [this.length, 0, U.treeLeng, 0, [
                ['ratio-height', Canopy.lengthFromRatioHeight, [this.ratio, this.height]],
                ['ratio-base', Canopy.lengthFromRatioBase, [this.ratio, this.base]],
                ['ratio-length', Dag.input, []],
                ['height-length', Dag.input, []],
                ['height-base', Canopy.lengthFromHeightBase, [this.height, this.base]],
                ['length-base', Dag.input, []]],
            ],
            [this.height, 0, U.treeLeng, 0, [
                ['ratio-height', Dag.input, []],
                ['ratio-base', Canopy.heightFromRatioBase, [this.ratio, this.base]],
                ['ratio-length', Canopy.heightFromRatioLength, [this.ratio, this.length]],
                ['height-length', Dag.input, []],
                ['height-base', Dag.input, []],
                ['length-base', Canopy.heightFromLengthBase, [this.length, this.base]]],
            ],
            [this.ratio, 0, U.fraction, 0, [
                ['ratio-height', Dag.input, []],
                ['ratio-base', Dag.input, []],
                ['ratio-length', Dag.input, []],
                ['height-length', Canopy.ratioFromHeightLength, [this.height, this.length]],
                ['height-base', Canopy.ratioFromHeightBase, [this.height, this.base]],
                ['length-base', Canopy.ratioFromLengthBase, [this.length, this.base]]],
            ],
            // derived from above
            [this.vol, 0, U.fraction, 0, [
                [this.any, Canopy.crownFill, [this.cover, this.ratio]]]],
            [this.load, 0, U.fuelLoad, 0, [
                [this.any, Canopy.fuelLoad, [this.bulk, this.length]]]],
            [this.hpua, 0, U.hpua, 0, [
                [this.any, Canopy.heatPerUnitArea, [this.load, this.heat]]]],
            [this.shelters, 0, U.yesno, 0, [
                [this.any, Canopy.sheltersFuelFromWind, [this.cover, this.height, this.vol]]]],
            [this.wsrf, 0, U.fraction, 0, [
                [this.any, Canopy.windSpeedAdjustmentFactor, [this.cover, this.height, this.vol]]]],
        ]
    }
}