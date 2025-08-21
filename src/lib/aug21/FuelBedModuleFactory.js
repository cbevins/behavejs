import { Calc, Dag, P, U, ModuleFactory } from './index.js'
import { FuelBedEquations as Bed} from './index.js'

export class FuelBedModuleFactory {
    constructor(){}

    static configs() {
        return []
    }

    // Returns an array of all the module nodes with fully qualified path/leaf names
    static pathNodes(path=P.bed1) {
        const any = ModuleFactory.any
        const cfg = FuelBedModuleFactory.configs()
        const nodes = [
            [path+'depth', 1, U.fuelDepth, [[any, any, Dag.input, []]]],

            [path+'fuel bed wind reduction factor', 1, U.factor, [
                [any, any, Bed.openWindSpeedAdjustmentFactor, [path+'depth']]]]
        ]
        return nodes
    }
    /**
     * 
     * @param {string} path 
     * @param {array} configs Elements are array of [<cfgName>, <cfgValue>]
     * @param {array} bindings Elements are array of [nodeKey, boundNodeFullKey]
     */
    static configure(path, configs=[], bindings=[]) {
        const nodes = FuelBedModuleFactory.pathNodes(path)
        return ModuleFactory.select(path, nodes, configs, bindings).sort()
    }
}
