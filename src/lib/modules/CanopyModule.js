import { Dag, C, P, ModuleBase, U } from '../index.js'
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
            [path+P.canopyCover, 0, U.fraction, 0, [[this.any, Dag.input, []]]],
            [path+P.canopyBulk,  0, U.fraction, 0, [[this.any, Dag.input, []]]],
            [path+P.canopyHeat,  0, U.fuelHeat, 0, [[this.any, Dag.input, []]]],
            
            // configured by 'canopy height input'
            [path+P.canopyBase, 0, U.treeLeng, 0, [
                [C.ratioHeight, Canopy.baseFromRatioHeight, [path+P.canopyRatio, path+P.canopyHeight]],
                [C.ratioBase, Dag.input, []],
                [C.ratioLength, Canopy.baseFromRatioLength, [path+P.canopyRatio, path+P.canopyLength]],
                [C.heightLength, Canopy.baseFromHeightLength, [path+P.canopyHeight, path+P.canopyLength]],
                [C.heightBase, Dag.input, []],
                [C.lengthBase, Dag.input, []]]
            ],
            [path+P.canopyLength, 0, U.treeLeng, 0, [
                [C.ratioHeight, Canopy.lengthFromRatioHeight, [path+P.canopyRatio, path+P.canopyHeight]],
                [C.ratioBase, Canopy.lengthFromRatioBase, [path+P.canopyRatio, path+P.canopyBase]],
                [C.ratioLength, Dag.input, []],
                [C.heightLength, Dag.input, []],
                [C.heightBase, Canopy.lengthFromHeightBase, [path+P.canopyHeight, path+P.canopyBase]],
                [C.lengthBase, Dag.input, []]],
            ],
            [path+P.canopyHeight, 0, U.treeLeng, 0, [
                [C.ratioHeight, Dag.input, []],
                [C.ratioBase, Canopy.heightFromRatioBase, [path+P.canopyRatio, path+P.canopyBase]],
                [C.ratioLength, Canopy.heightFromRatioLength, [path+P.canopyRatio, path+P.canopyLength]],
                [C.heightLength, Dag.input, []],
                [C.heightBase, Dag.input, []],
                [C.lengthBase, Canopy.heightFromLengthBase, [path+P.canopyLength, path+P.canopyBase]]],
            ],
            [path+P.canopyRatio, 0, U.fraction, 0, [
                [C.ratioHeight, Dag.input, []],
                [C.ratioBase, Dag.input, []],
                [C.ratioLength, Dag.input, []],
                [C.heightLength, Canopy.ratioFromHeightLength, [path+P.canopyHeight, path+P.canopyLength]],
                [C.heightBase, Canopy.ratioFromHeightBase, [path+P.canopyHeight, path+P.canopyBase]],
                [C.lengthBase, Canopy.ratioFromLengthBase, [path+P.canopyLength, path+P.canopyBase]]],
            ],
            // derived from above
            [path+P.canopyVol, 0, U.fraction, 0, [
                [this.any, Canopy.crownFill,
                    [path+P.canopyCover, path+P.canopyRatio]]]],
            [path+P.canopyLoad, 0, U.fuelLoad, 0, [
                [this.any, Canopy.fuelLoad,
                    [path+P.canopyBulk, path+P.canopyLength]]]],
            [path+P.canopyHpua, 0, U.fireHpua, 0, [
                [this.any, Canopy.heatPerUnitArea,
                    [path+P.canopyLoad, path+P.canopyHeat]]]],
            [path+P.canopyShelters, 0, U.yesno, 0, [
                [this.any, Canopy.sheltersFuelFromWind,
                    [path+P.canopyCover, path+P.canopyHeight, path+P.canopyVol]]]],
            [path+P.canopyWsrf, 0, U.fraction, 0, [
                [this.any, Canopy.windSpeedAdjustmentFactor,
                    [path+P.canopyCover, path+P.canopyHeight, path+P.canopyVol]]]],
        ]
    }
}