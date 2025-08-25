import { Dag} from '../index.js'
import { ModuleBase, U } from './index.js'

export class FuelMoistureModule extends ModuleBase {
    /**
     * Creates the fuel moisture module.
     * @param {string} path Prefix for this module's fully qualified node names ('site/weather/moisture/')
     */
    constructor(path){
        super(path)
        // fully qualified node keys
        this.dead = path + 'dead/category'
        this.dead1 = path + 'dead/1-h'
        this.dead10 = path + 'dead/10-h'
        this.dead100 = path + 'dead/100-h'
        this.live = path + 'live/category'
        this.herb = path + 'live/herb'
        this.stem = path + 'live/stem'
        // config keys
        this.config = 'fuel moisture inputs'
        this.individual = 'individual'
        this.liveCat = '3 dead classes and live category'
        this.categroiy = 'dead and live category'
        this.options = [this.individual, this.liveCat, this.category]
    }

    genome() {
        return [
            [this.dead, 1, U.fuelMois, [
                [this.config, this.individual, Dag.constant, []],
                [this.config, this.liveCat, Dag.constant, []],
                [this.config, this.category, Dag.input, []]]],
            [this.dead1, 1, U.fuelMois, [
                [this.config, this.individual, Dag.input, []],
                [this.config, this.liveCat, Dag.input, []],
                [this.config, this.category, Dag.assign, [this.dead]]]],
            [this.dead10, 1, U.fuelMois, [
                [this.config, this.individual, Dag.input, []],
                [this.config, this.liveCat, Dag.input, []],
                [this.config, this.category, Dag.assign, [this.dead]]]],
            [this.dead100, 1, U.fuelMois, [
                [this.config, this.individual, Dag.input, []],
                [this.config, this.liveCat, Dag.input, []],
                [this.config, this.category, Dag.assign, [this.dead]]]],
            [this.live, 3, U.fuelMois, [
                [this.config, this.individual, Dag.constant, []],
                [this.config, this.liveCat, Dag.input, []],
                [this.config, this.category, Dag.input, []]]],
            [this.herb, 3, U.fuelMois, [
                [this.config, this.individual, Dag.input, []],
                [this.config, this.liveCat, Dag.assign, [this.live]],
                [this.config, this.category, Dag.assign, [this.live]]]],
            [this.stem, 3, U.fuelMois, [
                [this.config, this.individual, Dag.input, []],
                [this.config, this.liveCat, Dag.assign, [this.live]],
                [this.config, this.category, Dag.assign, [this.live]]]],
        ]
    }
}
