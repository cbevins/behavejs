import { Dag, C, ModuleBase, U } from './index.js'
import { CanopyEquations as Canopy} from '../index.js'

export class CanopyModule extends ModuleBase {
    /**
     * Creates the canopy module nodes.
     * @param {string} path Prefix for this module instance's fully qualified node names
     * something like 'site/' or '' to prefix the 'canopy/' keys.
     */
    constructor(path) {
        super(path, 'CanopyModule')

        // configs
        this.config = 'canopy height input'
        this.options = [C.ratioHeight, C.ratioBase, C.ratioLength,
            C.heightLength, C.heightBase, C.lengthBase]

        this.nodes = [
            // inputs or link
            [path+C.canopyCover, 0, U.fraction, 0, [[this.any, Dag.input, []]]],
            [path+C.canopyBulk,  0, U.fraction, 0, [[this.any, Dag.input, []]]],
            [path+C.canopyHeat,  0, U.heat, 0, [[this.any, Dag.input, []]]],
            
            // configured by 'canopy height input'
            [path+C.canopyBase, 0, U.treeLeng, 0, [
                [C.ratioHeight, Canopy.baseFromRatioHeight, [path+C.canopyRatio, path+C.canopyHeight]],
                [C.ratioBase, Dag.input, []],
                [C.ratioLength, Canopy.baseFromRatioLength, [path+C.canopyRatio, path+C.canopyLength]],
                [C.heightLength, Canopy.baseFromHeightLength, [path+C.canopyHeight, path+C.canopyLength]],
                [C.heightBase, Dag.input, []],
                [C.lengthBase, Dag.input, []]]
            ],
            [path+C.canopyLength, 0, U.treeLeng, 0, [
                [C.ratioHeight, Canopy.lengthFromRatioHeight, [path+C.canopyRatio, path+C.canopyHeight]],
                [C.ratioBase, Canopy.lengthFromRatioBase, [path+C.canopyRatio, path+C.canopyBase]],
                [C.ratioLength, Dag.input, []],
                [C.heightLength, Dag.input, []],
                [C.heightBase, Canopy.lengthFromHeightBase, [path+C.canopyHeight, path+C.canopyBase]],
                [C.lengthBase, Dag.input, []]],
            ],
            [path+C.canopyHeight, 0, U.treeLeng, 0, [
                [C.ratioHeight, Dag.input, []],
                [C.ratioBase, Canopy.heightFromRatioBase, [path+C.canopyRatio, path+C.canopyBase]],
                [C.ratioLength, Canopy.heightFromRatioLength, [path+C.canopyRatio, path+C.canopyLength]],
                [C.heightLength, Dag.input, []],
                [C.heightBase, Dag.input, []],
                [C.lengthBase, Canopy.heightFromLengthBase, [path+C.canopyLength, path+C.canopyBase]]],
            ],
            [path+C.canopyRatio, 0, U.fraction, 0, [
                [C.ratioHeight, Dag.input, []],
                [C.ratioBase, Dag.input, []],
                [C.ratioLength, Dag.input, []],
                [C.heightLength, Canopy.ratioFromHeightLength, [path+C.canopyHeight, path+C.canopyLength]],
                [C.heightBase, Canopy.ratioFromHeightBase, [path+C.canopyHeight, path+C.canopyBase]],
                [C.lengthBase, Canopy.ratioFromLengthBase, [path+C.canopyLength, path+C.canopyBase]]],
            ],
            // derived from above
            [path+C.canopyVol, 0, U.fraction, 0, [
                [this.any, Canopy.crownFill,
                    [path+C.canopyCover, path+C.canopyRatio]]]],
            [path+C.canopyLoad, 0, U.fuelLoad, 0, [
                [this.any, Canopy.fuelLoad,
                    [path+C.canopyBulk, path+C.canopyLength]]]],
            [path+C.canopyHpua, 0, U.hpua, 0, [
                [this.any, Canopy.heatPerUnitArea,
                    [path+C.canopyLoad, path+C.canopyHeat]]]],
            [path+C.canopyShelters, 0, U.yesno, 0, [
                [this.any, Canopy.sheltersFuelFromWind,
                    [path+C.canopyCover, path+C.canopyHeight, path+C.canopyVol]]]],
            [path+C.canopyWsrf, 0, U.fraction, 0, [
                [this.any, Canopy.windSpeedAdjustmentFactor,
                    [path+C.canopyCover, path+C.canopyHeight, path+C.canopyVol]]]],
        ]
    }
}