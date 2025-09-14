import { Dag, P, U, ModuleBase } from '../index.js'
import { CompassEquations as Compass} from '../index.js'

export class SlopeSteepnessModule extends ModuleBase {
    /**
     * Creates the canopy module nodes.
     * @param {string} path Prefix for this module's fully qualified node names
     * something like 'terrain/' to prefix the 'slope/steepness/<node>' keys.
     */
    constructor(path) {
        super(path, 'SlopeSteepnessModule')
        const cfg = this.setConfig()
        this.nodes = [
            [path+P.slopeRatio, 0, U.ratio, 0, [
                [cfg.ratio, Dag.input, []],
                [cfg.degrees, Compass.slopeRatio, [path+P.slopeDegrees]]]],
            [path+P.slopeDegrees, 0, U.degrees, 0, [
                [cfg.ratio, Compass.slopeDegrees, [path+P.slopeRatio]],
                [cfg.degrees, Dag.input, []]]],
        ]
    }
    setConfig() {
        const ratio = 'observed ratio of rise-to-reach'
        const degrees = 'degrees'
        const map = 'map'
        this.config = {
            ratio, degrees, map,    // individual key for outside reference
            options: [ratio, degrees, map],
            prompt: 'slope steepness is specified as',
            prompts: [
                [ratio, 'ratio of vertical rise to horizontal reach'],
                [degrees, 'degrees'],
                [map, 'estimated from map parameters']
            ],
        }
        return this.config
    }
}
