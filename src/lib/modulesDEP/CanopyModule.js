import { Dag, P, ModuleBase, U } from '../index.js'
import { CanopyEquations as Lib} from '../index.js'

export class CanopyModule extends ModuleBase {
    /**
     * Creates the canopy module nodes.
     * @param {string} path Prefix for this module instance's fully qualified node names
     * something like 'site/' or '' to prefix the 'canopy/' keys.
     */
    constructor(path) {
        super(path, 'CanopyModule')
        const cfg = this.setConfig()
        this.nodes = [
            // input parameters (or linked)
            [path+P.canopyCover, 0, U.fraction, 0, [[this.any, Dag.input, []]]],
            [path+P.canopyBulk,  0, U.fraction, 0, [[this.any, Dag.input, []]]],
            [path+P.canopyHeat,  0, U.fuelHeat, 0, [[this.any, Dag.input, []]]],
            
            // configured by 'canopy height input'
            [path+P.canopyBase, 0, U.treeLeng, 0, [
                [cfg.ratioHeight, Lib.canopyBaseFromRatioHeight, [path+P.canopyRatio, path+P.canopyHeight]],
                [cfg.ratioBase, Dag.input, []],
                [cfg.ratioLength, Lib.canopyBaseFromRatioLength, [path+P.canopyRatio, path+P.canopyLength]],
                [cfg.heightLength, Lib.canopyBaseFromHeightLength, [path+P.canopyHeight, path+P.canopyLength]],
                [cfg.heightBase, Dag.input, []],
                [cfg.lengthBase, Dag.input, []]]
            ],
            [path+P.canopyLength, 0, U.treeLeng, 0, [
                [cfg.ratioHeight, Lib.crownLengthFromRatioHeight, [path+P.canopyRatio, path+P.canopyHeight]],
                [cfg.ratioBase, Lib.crownLengthFromRatioBase, [path+P.canopyRatio, path+P.canopyBase]],
                [cfg.ratioLength, Dag.input, []],
                [cfg.heightLength, Dag.input, []],
                [cfg.heightBase, Lib.crownLengthFromHeightBase, [path+P.canopyHeight, path+P.canopyBase]],
                [cfg.lengthBase, Dag.input, []]],
            ],
            [path+P.canopyHeight, 0, U.treeLeng, 0, [
                [cfg.ratioHeight, Dag.input, []],
                [cfg.ratioBase, Lib.canopyHeightFromRatioBase, [path+P.canopyRatio, path+P.canopyBase]],
                [cfg.ratioLength, Lib.canopyHeightFromRatioLength, [path+P.canopyRatio, path+P.canopyLength]],
                [cfg.heightLength, Dag.input, []],
                [cfg.heightBase, Dag.input, []],
                [cfg.lengthBase, Lib.canopyHeightFromLengthBase, [path+P.canopyLength, path+P.canopyBase]]],
            ],
            [path+P.canopyRatio, 0, U.fraction, 0, [
                [cfg.ratioHeight, Dag.input, []],
                [cfg.ratioBase, Dag.input, []],
                [cfg.ratioLength, Dag.input, []],
                [cfg.heightLength, Lib.crownRatioFromHeightLength, [path+P.canopyHeight, path+P.canopyLength]],
                [cfg.heightBase, Lib.crownRatioFromHeightBase, [path+P.canopyHeight, path+P.canopyBase]],
                [cfg.lengthBase, Lib.crownRatioFromLengthBase, [path+P.canopyLength, path+P.canopyBase]]],
            ],
            // derived from above
            [path+P.canopyVol, 0, U.fraction, 0, [
                [this.any, Lib.crownFill,
                    [path+P.canopyCover, path+P.canopyRatio]]]],
            [path+P.canopyLoad, 0, U.fuelLoad, 0, [
                [this.any, Lib.canopyFuelLoad,
                    [path+P.canopyBulk, path+P.canopyLength]]]],
            [path+P.canopyHpua, 0, U.fireHpua, 0, [
                [this.any, Lib.canopyHeatPerUnitArea,
                    [path+P.canopyLoad, path+P.canopyHeat]]]],
            [path+P.canopyShelters, 0, U.bool, 0, [
                [this.any, Lib.canopySheltersFuelFromWind,
                    [path+P.canopyCover, path+P.canopyHeight, path+P.canopyVol]]]],
            [path+P.canopyWsrf, 0, U.fraction, 0, [
                [this.any, Lib.canopyWindSpeedAdjustmentFactor,
                    [path+P.canopyCover, path+P.canopyHeight, path+P.canopyVol]]]],
        ]
    }
    setConfig() {
        const baseHeight   = 'height-base'
        const heightBase   = baseHeight
        const ratioHeight  = 'ratio-height'
        const heightRatio  = ratioHeight
        const lengthHeight = 'height-length'
        const heightLength = lengthHeight
        const ratioBase    = 'ratio-base'
        const baseRatio    = ratioBase
        const ratioLength  = 'ratio-length'
        const lengthRatio  = ratioLength
        const lengthBase   = 'length-base'
        const baseLength   = lengthBase
        this.config =  {
            // keys for outside reference
            baseHeight, heightBase,
            ratioHeight, heightRatio,
            lengthHeight, heightLength,
            ratioBase, baseRatio,
            lengthRatio, ratioLength,
            lengthBase, baseLength,
            options: [baseHeight, ratioHeight, lengthHeight, ratioBase, ratioLength, lengthBase],
            prompt: 'canopy height parameters are entered for',
            prompts: [
                [baseHeight, 'total and crown base heights'],
                [ratioHeight, 'total height and crown ratio'],
                [lengthHeight, 'total height and crown length'],
                [ratioBase, 'crown base height and crown ratio'],
                [ratioLength, 'crown length and crown ratio'],
                [lengthBase, 'crown length and base height'],
            ],
        }
        return this.config
    }
}