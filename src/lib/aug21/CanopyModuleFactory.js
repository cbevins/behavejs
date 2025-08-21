import { Calc, Dag, P, U, ModuleFactory } from './index.js'
import { CanopyEquations as Canopy} from './index.js'

export class CanopyModuleFactory {
    constructor(){}

    static configs() {
        return [
            {name: 'canopy height input', options: [
                'ratio-height', 'ratio-base', 'ratio-length',
                'height-length', 'height-base', 'length-base']},
        ]
    }

    // Returns an array of all the module nodes with fully qualified path/leaf names
    static pathNodes(path) {
        const any = ModuleFactory.any
        const cfg = CanopyModuleFactory.configs()
        const cfgInp = cfg[0].name
        const nodes = [
            // inputs or link
            [path+'coverage', 0, U.fraction, [[any, any, Dag.input, []]]],
            [path+'bulk density', 0, U.fraction, [[any, any, Dag.input, []]]],
            [path+'heat of combustion', 0, U.heat, [[any, any, Dag.input, []]]],
            
            // configured by 'canopy height input'
            [path+'base height', 0, U.canopyHt, [
                [cfgInp, 'ratio-height', Canopy.baseFromRatioHeight, [path+'crown ratio', path+'total height']],
                [cfgInp, 'ratio-base', Dag.input, []],
                [cfgInp, 'ratio-length', Canopy.baseFromRatioLength, [path+'crown ratio', path+'crown length']],
                [cfgInp, 'height-length', Canopy.baseFromHeightLength, [path+'total height', path+'crown length']],
                [cfgInp, 'height-base', Dag.input, []],
                [cfgInp, 'length-base', Dag.input, []]]
            ],
            [path+'crown length', 0, U.canopyHt, [
                [cfgInp, 'ratio-height', Canopy.lengthFromRatioHeight, [path+'crown ratio', path+'total height']],
                [cfgInp, 'ratio-base', Canopy.lengthFromRatioBase, [path+'crown ratio', path+'base height']],
                [cfgInp, 'ratio-length', Dag.input, []],
                [cfgInp, 'height-length', Dag.input, []],
                [cfgInp, 'height-base', Canopy.lengthFromHeightBase, [path+'total height', path+'base height']],
                [cfgInp, 'length-base', Dag.input, []]],
            ],
            [path+'total height', 0, U.canopyHt, [
                [cfgInp, 'ratio-height', Dag.input, []],
                [cfgInp, 'ratio-base', Canopy.heightFromRatioBase, [path+'crown ratio', path+'base height']],
                [cfgInp, 'ratio-length', Canopy.heightFromRatioLength, [path+'crown ratio', path+'crown length']],
                [cfgInp, 'height-length', Dag.input, []],
                [cfgInp, 'height-base', Dag.input, []],
                [cfgInp, 'length-base', Canopy.heightFromLengthBase, [path+'crown length', path+'base height']]],
            ],
            [path+'crown ratio', 0, U.fraction, [
                [cfgInp, 'ratio-height', Dag.input, []],
                [cfgInp, 'ratio-base', Dag.input, []],
                [cfgInp, 'ratio-length', Dag.input, []],
                [cfgInp, 'height-length', Canopy.ratioFromHeightLength, [path+'total height', path+'crown length']],
                [cfgInp, 'height-base', Canopy.ratioFromHeightBase, [path+'total height', path+'base height']],
                [cfgInp, 'length-base', Canopy.ratioFromLengthBase, [path+'crown length', path+'base height']]],
            ],
            // derived from above
            [path+'volumetric fill ratio', 0, U.fraction, [
                [any, any, Canopy.crownFill, [path+'coverage', path+'crown ratio']]]],
            [path+'fuel load', 0, U.fuelLoad, [
                [any, any, Canopy.fuelLoad, [path+'bulk density', path+'crown length']]]],
            [path+'heat per unit area', 0, U.hpua, [
                [any, any, Canopy.heatPerUnitArea, [path+'fuel load', path+'heat of combustion']]]],
            [path+'shelters fuel from wind', 0, U.yesno, [
                [any, any, Canopy.sheltersFuelFromWind, [path+'coverage', path+'total height', path+'volumetric fill ratio']]]],
            [path+'wind reduction factor', 0, U.fraction, [
                [any, any, Canopy.windSpeedAdjustmentFactor, [path+'coverage', path+'total height', path+'volumetric fill ratio']]]],
        ]
        return nodes
    }

    /**
     * 
     * @param {string} path 
     * @param {array} configs Elements are array of [<cfgName>, <cfgValue>]
     * @param {array} bindings Elements are array of [nodeKey, boundNodeFullKey]
     */
    static configure(path, configs=[['canopy height input', 'height-base']],
        bindings=[]) {
        const nodes = CanopyModuleFactory.pathNodes(path)
        return ModuleFactory.select(path, nodes, configs, bindings).sort()
    }
}