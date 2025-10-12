import { Dag } from '../index.js'
import { ModuleBase } from './ModuleBase.js'
import { Paths as P} from './Paths.js'
import { Units as U} from './Units.js'
import { CanopyEquations as Canopy} from '../index.js'

export class CanopyModule extends ModuleBase {
    /**
     * Creates the canopy module nodes.
     * @param {string} prefix Prefix for this module instance's fully qualified node names
     * something like 'site/' or '' to prefix the 'canopy/' keys.
     * @param {Config} cfg Config reference
     */
    constructor(prefix, cfg) {
        super(prefix, P.canopySelf, P.canopyMod, cfg)
        const path = this.path
        this.nodes = [
            // input parameters (or linked)
            [path+P.canopyCover, 0, U.fraction, null, [['', Dag.input, []]]],
            [path+P.canopyBulk,  0, U.fraction, null, [['', Dag.input, []]]],
            [path+P.canopyHeat,  0, U.fuelHeat, null, [['', Dag.input, []]]],
            [path+P.canopyMois,  0, U.fuelMois, null, [['', Dag.input, []]]],
            
            // configured by 'canopy height input'
            [path+P.canopyBase, 0, U.treeLeng, cfg, [
                [cfg.ratioHeight, Canopy.canopyBaseFromRatioHeight, [path+P.canopyRatio, path+P.canopyHeight]],
                [cfg.ratioBase, Dag.input, []],
                [cfg.ratioLength, Canopy.canopyBaseFromRatioLength, [path+P.canopyRatio, path+P.canopyLength]],
                [cfg.heightLength, Canopy.canopyBaseFromHeightLength, [path+P.canopyHeight, path+P.canopyLength]],
                [cfg.heightBase, Dag.input, []],
                [cfg.lengthBase, Dag.input, []]]
            ],
            [path+P.canopyLength, 0, U.treeLeng, cfg, [
                [cfg.ratioHeight, Canopy.crownLengthFromRatioHeight, [path+P.canopyRatio, path+P.canopyHeight]],
                [cfg.ratioBase, Canopy.crownLengthFromRatioBase, [path+P.canopyRatio, path+P.canopyBase]],
                [cfg.ratioLength, Dag.input, []],
                [cfg.heightLength, Dag.input, []],
                [cfg.heightBase, Canopy.crownLengthFromHeightBase, [path+P.canopyHeight, path+P.canopyBase]],
                [cfg.lengthBase, Dag.input, []]],
            ],
            [path+P.canopyHeight, 0, U.treeLeng, cfg, [
                [cfg.ratioHeight, Dag.input, []],
                [cfg.ratioBase, Canopy.canopyHeightFromRatioBase, [path+P.canopyRatio, path+P.canopyBase]],
                [cfg.ratioLength, Canopy.canopyHeightFromRatioLength, [path+P.canopyRatio, path+P.canopyLength]],
                [cfg.heightLength, Dag.input, []],
                [cfg.heightBase, Dag.input, []],
                [cfg.lengthBase, Canopy.canopyHeightFromLengthBase, [path+P.canopyLength, path+P.canopyBase]]],
            ],
            [path+P.canopyRatio, 0, U.fraction, cfg, [
                [cfg.ratioHeight, Dag.input, []],
                [cfg.ratioBase, Dag.input, []],
                [cfg.ratioLength, Dag.input, []],
                [cfg.heightLength, Canopy.crownRatioFromHeightLength, [path+P.canopyHeight, path+P.canopyLength]],
                [cfg.heightBase, Canopy.crownRatioFromHeightBase, [path+P.canopyHeight, path+P.canopyBase]],
                [cfg.lengthBase, Canopy.crownRatioFromLengthBase, [path+P.canopyLength, path+P.canopyBase]]],
            ],
            // derived from above
            [path+P.canopyVol, 0, U.fraction, null, [
                ['', Canopy.crownFill,
                    [path+P.canopyCover, path+P.canopyRatio]]]],
            [path+P.canopyLoad, 0, U.fuelLoad, null, [
                ['', Canopy.canopyFuelLoad,
                    [path+P.canopyBulk, path+P.canopyLength]]]],
            [path+P.canopyHpua, 0, U.fireHpua, null, [
                ['', Canopy.canopyHeatPerUnitArea,
                    [path+P.canopyLoad, path+P.canopyHeat]]]],
            [path+P.canopyShelters, 0, U.bool, null, [
                ['', Canopy.canopySheltersFuelFromWind,
                    [path+P.canopyCover, path+P.canopyHeight, path+P.canopyVol]]]],
            [path+P.canopyWsrf, 0, U.fraction, null, [
                ['', Canopy.canopyWindSpeedAdjustmentFactor,
                    [path+P.canopyCover, path+P.canopyHeight, path+P.canopyVol]]]],
        ]
    }
}