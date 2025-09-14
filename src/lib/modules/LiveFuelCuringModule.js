import { Dag, P, U, ModuleBase } from '../index.js'
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
        const cfg = this.setConfig()
        this.nodes = [
            [path+P.curingObserved, 0, U.fraction, 0, [
                [this.any, Dag.input, []]]],
            [path+P.curingEstimated, 0, U.fraction, 0, [
                [this.any, Bed.curedHerbFraction, [herbMoisKey]]]],
            [path+P.curingApplied, 0, U.fraction, 0, [
                [cfg.observed, Dag.assign, [path+P.curingObserved]],
                [cfg.estimated, Dag.assign, [path+P.curingEstimated]],
            ]],
        ]
    }
    setConfig() {
        const observed = 'observed'
        const estimated = 'estimated'
        this.config = {
            observed, estimated,    // individual key for outside reference
            options: [observed, estimated],
            prompt: 'live fuel curing fraction is',
            prompts: [
                [observed, 'input parameter'],
                [estimated, 'estimated from herb moisture content'],
            ],
        }
        return this.config
    }
}
