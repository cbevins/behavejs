import { Dag, P, U, ModuleBase } from '../index.js'

export class DeadFuelMoistureModule extends ModuleBase {
    /**
     * Creates the fuel moisture module.
     * @param {string} path Prefix for this module instance's fully qualified node names
     * something like 'weather/' or 'station/1/' to prefix the 'moisture/dead/<node>' keys.
     */
    constructor(path) {
        super(path, 'DeadFuelMoistureModule')
        const cfg = this.setConfig()
        this.nodes = [
            [path+P.moisDeadCat, 0, U.fuelMois, 0, [
                [cfg.particle, Dag.constant, []],
                [cfg.category, Dag.input, []]]],
            [path+P.moisDead1, 0, U.fuelMois, 0, [
                [cfg.particle, Dag.input, []],
                [cfg.category, Dag.assign, [path+P.moisDeadCat]]]],
            [path+P.moisDead10, 0, U.fuelMois, 0, [
                [cfg.particle, Dag.input, []],
                [cfg.category, Dag.assign, [path+P.moisDeadCat]]]],
            [path+P.moisDead100, 0, U.fuelMois, 0, [
                [cfg.particle, Dag.input, []],
                [cfg.category, Dag.assign, [path+P.moisDeadCat]]]],
        ]
    }
    setConfig() {
        const particle = 'particle'
        const category = 'category'
        this.config =  {
            particle, category,       // particle key for outside reference
            options: [particle, category],
            prompt: 'dead fuel moisture content is entered',
            prompts: [
                [particle, 'individually for the 1-h, 10-h, and 100-h time-lag fuels'],
                [category, 'collectively for the dead category as a whole'],
            ],
        }
        return this.config
    }
}
