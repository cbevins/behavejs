import { Dag, P, U, ModuleBase } from '../index.js'
import { CompassEquations as Compass} from '../index.js'

export class SlopeDirectionModule extends ModuleBase {
    /**
     * Creates the canopy module nodes.
     * @param {string} path Prefix for this module's fully qualified node names
     * something like 'terrain/' to prefix the 'slope/steepness/<node>' keys.
     */
    constructor(path) {
        super(path, 'SlopeDirectionModule')
        const cfg = this.setConfig()
        this.nodes = [
            [path+P.slopeUp, 0, U.compass, 0, [
                [cfg.upslope, Dag.input, []],
                [cfg.downslope, Compass.compassOpposite, [path+P.slopeDown]]]],
            [path+P.slopeDown, 0, U.degrees, 0, [
                [cfg.upslope, Compass.compassOpposite, [path+P.slopeUp]],
                [cfg.downslope, Dag.input, []]]],
        ]
    }
    setConfig() {
        const upslope = 'up-slope'
        const downslope = 'down-slope'
        this.config = {
            upslope, downslope,    // individual key for outside reference
            options: [upslope, downslope],
            prompt: 'slope direction is specified as',
            prompts: [
                [upslope, 'up-slope direction'],
                [downslope, 'down-slope direction (aspect)'],
            ],
        }
        return this.config
    }
}
