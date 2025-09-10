import { Dag, C, P, U, ModuleBase } from './index.js'

export class DeadFuelMoistureModule extends ModuleBase {
    /**
     * Creates the fuel moisture module.
     * @param {string} path Prefix for this module instance's fully qualified node names
     * something like 'weather/' or 'station/1/' to prefix the 'moisture/dead/<node>' keys.
     */
    constructor(path) {
        super(path, 'DeadFuelMoistureModule')

        // config keys
        this.config = 'dead fuel moisture input by'
        this.options = [C.moisParticle, C.moisCategory]

        this.nodes = [
            [path+P.moisDeadCat, 0, U.fuelMois, 0, [
                [C.moisParticle, Dag.constant, []],
                [C.moisCategory, Dag.input, []]]],
            [path+P.moisDead1, 0, U.fuelMois, 0, [
                [C.moisParticle, Dag.input, []],
                [C.moisCategory, Dag.assign, [path+P.moisDeadCat]]]],
            [path+P.moisDead10, 0, U.fuelMois, 0, [
                [C.moisParticle, Dag.input, []],
                [C.moisCategory, Dag.assign, [path+P.moisDeadCat]]]],
            [path+P.moisDead100, 0, U.fuelMois, 0, [
                [C.moisParticle, Dag.input, []],
                [C.moisCategory, Dag.assign, [path+P.moisDeadCat]]]],
        ]
    }
}
