import { Dag, ModuleBase, U } from './index.js'

export class DeadFuelMoistureModule extends ModuleBase {
    /**
     * Creates the fuel moisture module.
     * @param {string} path Prefix for this module's fully qualified node names ('site/weather/moisture/dead')
     */
    constructor(path) {
        super(path)

        // fully qualified node keys
        this.dead = path + 'category'
        this.dead1 = path + '1-h'
        this.dead10 = path + '10-h'
        this.dead100 = path + '100-h'

        // config keys
        this.config = 'dead fuel moisture input by'
        this.individual = 'individual'
        this.category = 'category'
        this.options = [this.individual, this.category]

        this.nodes = [
            [this.dead, 1, U.fuelMois, 0, [
                [this.individual, Dag.constant, []],
                [this.category, Dag.input, []]]],
            [this.dead1, 1, U.fuelMois, 0, [
                [this.individual, Dag.input, []],
                [this.category, Dag.assign, [this.dead]]]],
            [this.dead10, 1, U.fuelMois, 0, [
                [this.individual, Dag.input, []],
                [this.category, Dag.assign, [this.dead]]]],
            [this.dead100, 1, U.fuelMois, 0, [
                [this.individual, Dag.input, []],
                [this.category, Dag.assign, [this.dead]]]],
        ]
    }
}
