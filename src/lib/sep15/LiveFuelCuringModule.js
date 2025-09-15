import { Dag, U } from '../index.js'
import { Paths as P} from './Paths.js'
import { ModuleBase } from './ModuleBase.js'
import { FuelBedEquations as Bed } from '../index.js'

export class LiveFuelCuringModule extends ModuleBase {
    /**
     * 
     * @param {string} prefix Prefix for this module instance's fully qualified node names
     * something like 'primary/surface/model/standard/' to prefix the 'curing/<node>' keys.
     * @param {Config} cfg Config reference
     * @param {string} herbMoisKey Fully qualified path to the herb moisture content node
     * sonething like 'weather/moisture/live/herb'
     */
    constructor(prefix, cfg, herbMoisKey) {
        super(prefix, P.curingSelf, 'LiveFuelCuringModule', cfg)
        const path = prefix + this.self
        this.nodes = [
            [path+P.curingObserved, 0, U.fraction, '', [
                ['', Dag.input, []]]],
            [path+P.curingEstimated, 0, U.fraction, '', [
                ['', Bed.curedHerbFraction, [herbMoisKey]]]],
            [path+P.curingApplied, 0, U.fraction, cfg.key, [
                [cfg.observed, Dag.assign, [path+P.curingObserved]],
                [cfg.estimated, Dag.assign, [path+P.curingEstimated]],
            ]],
        ]
    }
}
