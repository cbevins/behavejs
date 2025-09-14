import { Dag, P, ModuleBase, U } from '../index.js'
import { CanopyEquations as Canopy} from '../index.js'

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
                [cfg.ratioHeight, Canopy.baseFromRatioHeight, [path+P.canopyRatio, path+P.canopyHeight]],
                [cfg.ratioBase, Dag.input, []],
                [cfg.ratioLength, Canopy.baseFromRatioLength, [path+P.canopyRatio, path+P.canopyLength]],
                [cfg.heightLength, Canopy.baseFromHeightLength, [path+P.canopyHeight, path+P.canopyLength]],
                [cfg.heightBase, Dag.input, []],
                [cfg.lengthBase, Dag.input, []]]
            ],
            [path+P.canopyLength, 0, U.treeLeng, 0, [
                [cfg.ratioHeight, Canopy.lengthFromRatioHeight, [path+P.canopyRatio, path+P.canopyHeight]],
                [cfg.ratioBase, Canopy.lengthFromRatioBase, [path+P.canopyRatio, path+P.canopyBase]],
                [cfg.ratioLength, Dag.input, []],
                [cfg.heightLength, Dag.input, []],
                [cfg.heightBase, Canopy.lengthFromHeightBase, [path+P.canopyHeight, path+P.canopyBase]],
                [cfg.lengthBase, Dag.input, []]],
            ],
            [path+P.canopyHeight, 0, U.treeLeng, 0, [
                [cfg.ratioHeight, Dag.input, []],
                [cfg.ratioBase, Canopy.heightFromRatioBase, [path+P.canopyRatio, path+P.canopyBase]],
                [cfg.ratioLength, Canopy.heightFromRatioLength, [path+P.canopyRatio, path+P.canopyLength]],
                [cfg.heightLength, Dag.input, []],
                [cfg.heightBase, Dag.input, []],
                [cfg.lengthBase, Canopy.heightFromLengthBase, [path+P.canopyLength, path+P.canopyBase]]],
            ],
            [path+P.canopyRatio, 0, U.fraction, 0, [
                [cfg.ratioHeight, Dag.input, []],
                [cfg.ratioBase, Dag.input, []],
                [cfg.ratioLength, Dag.input, []],
                [cfg.heightLength, Canopy.ratioFromHeightLength, [path+P.canopyHeight, path+P.canopyLength]],
                [cfg.heightBase, Canopy.ratioFromHeightBase, [path+P.canopyHeight, path+P.canopyBase]],
                [cfg.lengthBase, Canopy.ratioFromLengthBase, [path+P.canopyLength, path+P.canopyBase]]],
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
            lengthRatio, lengthRatio,
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