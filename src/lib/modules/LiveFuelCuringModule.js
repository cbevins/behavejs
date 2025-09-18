import { Dag } from '../index.js'
import { ModuleBase } from './ModuleBase.js'
import { Paths as P} from './Paths.js'
import { Units as U} from './Units.js'
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
        super(prefix, P.curingSelf, P.curingMod, cfg)
        const path = this.path
        this.nodes = [
            [path+P.curingObserved, 0, U.fraction, null, [
                ['', Dag.input, []]]],
            [path+P.curingEstimated, 0, U.fraction, null, [
                ['', Bed.curedHerbFraction, [herbMoisKey]]]],
            [path+P.curingApplied, 0, U.fraction, cfg, [
                [cfg.observed, Dag.assign, [path+P.curingObserved]],
                [cfg.estimated, Dag.assign, [path+P.curingEstimated]],
            ]],
        ]
    }
}
