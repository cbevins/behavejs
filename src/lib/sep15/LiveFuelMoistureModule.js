import { Dag, U } from '../index.js'
import { Paths as P} from './Paths.js'
import { ModuleBase } from './ModuleBase.js'

export class LiveFuelMoistureModule extends ModuleBase {
    /**
     * Creates the fuel moisture module.
     * @param {string} prefix Prefix for this module instance's fully qualified node names
     * something like 'weather' or 'station/1' to prefix the 'moisture/live/<node>' keys.
     * @param {Config} cfg Config reference
     */
    constructor(prefix, cfg){
        super(prefix, P.moisLiveSelf, P.moisLiveMod, cfg)
        const path = this.path
        this.nodes = [
            [path+P.moisLiveCat, 0, U.fuelMois, cfg.key, [
                [cfg.particle, Dag.constant, []],
                [cfg.category, Dag.input, []]]],
            [path+P.moisLiveHerb, 0, U.fuelMois, cfg.key, [
                [cfg.particle, Dag.input, []],
                [cfg.category, Dag.assign, [path+P.moisLiveCat]]]],
            [path+P.moisLiveStem, 0, U.fuelMois, cfg.key, [
                [cfg.particle, Dag.input, []],
                [cfg.category, Dag.assign, [path+P.moisLiveCat]]]],
        ]
    }
}
