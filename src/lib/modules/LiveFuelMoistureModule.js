import { Dag, C, P, U, ModuleBase } from '../index.js'

export class LiveFuelMoistureModule extends ModuleBase {
    /**
     * Creates the fuel moisture module.
     * @param {string} path Prefix for this module instance's fully qualified node names
     * something like 'weather' or 'station/1' to prefix the 'moisture/live/<node>' keys.
     */
    constructor(path){
        super(path, 'LiveFuelMoistureModule')
        
        // config keys
        this.config = 'live fuel moisture input by'
        this.options = [C.moisParticle, C.moisCategory]

        this.nodes = [
            [path+P.moisLiveCat, 0, U.fuelMois, 0, [
                [C.moisParticle, Dag.constant, []],
                [C.moisCategory, Dag.input, []]]],
            [path+P.moisLiveHerb, 0, U.fuelMois, 0, [
                [C.moisParticle, Dag.input, []],
                [C.moisCategory, Dag.assign, [path+P.moisLiveCat]]]],
            [path+P.moisLiveStem, 0, U.fuelMois, 0, [
                [C.moisParticle, Dag.input, []],
                [C.moisCategory, Dag.assign, [path+P.moisLiveCat]]]],
        ]
    }
}
