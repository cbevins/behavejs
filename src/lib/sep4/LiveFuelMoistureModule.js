import { Dag, ModuleBase, U } from './index.js'

export class LiveFuelMoistureModule extends ModuleBase {
    /**
     * Creates the fuel moisture module.
     * @param {string} path Prefix for this module's fully qualified node names ('site/weather/moisture/live')
     */
    constructor(path){
        super(path)
        // fully qualified node keys
        this.live = path + 'category'
        this.herb = path + 'herb'
        this.stem = path + 'stem'

        // config keys
        this.config = 'live fuel moisture input by'
        this.individual = 'individual'
        this.category = 'category'
        this.options = [this.individual, this.category]

        this.nodes = [
            [this.live, 3, U.fuelMois, 0, [
                [this.individual, Dag.constant, []],
                [this.category, Dag.input, []]]],
            [this.herb, 3, U.fuelMois, 0, [
                [this.individual, Dag.input, []],
                [this.category, Dag.assign, [this.live]]]],
            [this.stem, 3, U.fuelMois, 0, [
                [this.individual, Dag.input, []],
                [this.category, Dag.assign, [this.live]]]],
        ]
    }
}
