import { Dag, U } from '../index.js'
import { Paths as P} from './Paths.js'
import { ModuleBase } from './ModuleBase.js'

export class DeadFuelMoistureModule extends ModuleBase {
    /**
     * Creates the fuel moisture module.
     * @param {string} prefix Prefix for this module instance's fully qualified node names
     * something like 'weather/' or 'station/1/' to prefix the 'moisture/dead/<node>' keys.
     * @param {Config} cfg Config reference
     */
    constructor(prefix, cfg) {
        super(prefix, P.moisDeadSelf, P.moisDeadMod, cfg)
        const path = this.path
        this.nodes = [
            [path+P.moisDeadCat, 0, U.fuelMois, cfg.key, [
                [cfg.particle, Dag.constant, []],
                [cfg.category, Dag.input, []]]],
            [path+P.moisDead1, 0, U.fuelMois, cfg.key, [
                [cfg.particle, Dag.input, []],
                [cfg.category, Dag.assign, [path+P.moisDeadCat]]]],
            [path+P.moisDead10, 0, U.fuelMois, cfg.key, [
                [cfg.particle, Dag.input, []],
                [cfg.category, Dag.assign, [path+P.moisDeadCat]]]],
            [path+P.moisDead100, 0, U.fuelMois, cfg.key, [
                [cfg.particle, Dag.input, []],
                [cfg.category, Dag.assign, [path+P.moisDeadCat]]]],
        ]
    }
}
