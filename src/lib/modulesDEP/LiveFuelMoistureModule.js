import { Dag, P, U, ModuleBase } from '../index.js'

export class LiveFuelMoistureModule extends ModuleBase {
    /**
     * Creates the fuel moisture module.
     * @param {string} path Prefix for this module instance's fully qualified node names
     * something like 'weather' or 'station/1' to prefix the 'moisture/live/<node>' keys.
     */
    constructor(path){
        super(path, 'LiveFuelMoistureModule')
        const cfg = this.setConfig()
        this.nodes = [
            [path+P.moisLiveCat, 0, U.fuelMois, 0, [
                [cfg.particle, Dag.constant, []],
                [cfg.category, Dag.input, []]]],
            [path+P.moisLiveHerb, 0, U.fuelMois, 0, [
                [cfg.particle, Dag.input, []],
                [cfg.category, Dag.assign, [path+P.moisLiveCat]]]],
            [path+P.moisLiveStem, 0, U.fuelMois, 0, [
                [cfg.particle, Dag.input, []],
                [cfg.category, Dag.assign, [path+P.moisLiveCat]]]],
        ]
    }
    setConfig() {
        const particle = 'particle'
        const category = 'category'
        this.config =  {
            particle, category,       // particle key for outside reference
            options: [particle, category],
            prompt: 'live fuel moisture content is entered',
            prompts: [
                [particle, 'individually for the herb and stem fuels'],
                [category, 'collectively for the live category as a whole'],
            ],
        }
        return this.config
    }

}
