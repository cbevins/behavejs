import { Dag, C, P, U, ModuleBase } from './index.js'
import { FuelBedEquations as Bed } from '../index.js'

export class LiveFuelCuringModule extends ModuleBase {
    /**
     * 
     * @param {string} path Prefix for this module instance's fully qualified node names
     * something like 'primary/surface/model/standard/' to prefix the 'curing/<node>' keys.
     * @param {string} herbMoisKey Fully qualified path to the herb moisture content node
     * sonething like 'weather/moisture/live/herb'
     */
    constructor(path, herbMoisKey) {
        super(path, 'LiveFuelCuringModule')

        // config keys
        this.config = 'cured live fuel fraction'
        this.options = [C.curingObserved, C.curingEstimated]

        this.nodes = [
            [path+P.curingObserved, 0, U.fraction, 0, [
                [this.any, Dag.input, []]]],
            [path+P.curingEstimated, 0, U.fraction, 0, [
                [this.any, Bed.curedHerbFraction, [herbMoisKey]]]],
            [path+P.curingApplied, 0, U.fraction, 0, [
                [C.curingObserved, Dag.assign, [path+P.curingObserved]],
                [C.curingEstimated, Dag.assign, [path+P.curingEstimated]],
            ]],
        ]
    }
}
