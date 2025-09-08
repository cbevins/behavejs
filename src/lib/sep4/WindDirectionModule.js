import { Dag, L, ModuleBase, U } from './index.js'
import { WindEquations as Wind } from '../index.js'

export class WindDirectionModule extends ModuleBase {
    /**
     * Creates the wind speed module nodes.
     * @param {string} path Prefix for this module's fully qualified node names
     *        something like 'weather/wind/direction/'
     */
    constructor(path){
        super(path)

        // configs
        this.config = 'wind direction input'
        // config options
        this.inpHeadUpsl = 'heading from upslope'
        this.inpHeadNorth = 'heading from north'
        this.options = [this.inpHeadUpsl]

        // fully qualified node keys
        const head = path + 'heading/'
        const source = path + 'source/'
        this.headUpsl = head + L.windHeadUpsl
console.log(`WIndDirectionModule named the wind heading key "${this.headUpsl}"`)

        this.nodes = [
            [this.headUpsl, 0, U.compass, 0, [
                [this.inpHeadUpsl, Dag.input, []],
            ]],
        ]
    }
}
