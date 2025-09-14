import { Dag, P, ModuleBase, U } from '../index.js'
import { CompassEquations as Compass } from '../index.js'

export class WindDirectionModule extends ModuleBase {
    /**
     * @param {string} path Prefix for this module's fully qualified node names
     * (something like 'weather/' or '') to preface this module's 'wind/direction/<node>' keys.
     * @param {string} upslope Fully qualified path to the upslope direction node,
     * something like 'terrain/slope/direction/up-slope'
     */
    constructor(path, upslope){
        super(path, 'WindDirectionModule')
        const cfg = this.setConfig()
        this.nodes = [
            [path+P.wdirHeadFromUp, 0, U.compass, 0, [
                [cfg.headingFromUpslope,   Dag.input, []],
                [cfg.sourceFromNorth, Compass.diff, [path+P.wdirHeadFromNo, 'site.slope.direction.upslope']],
                [cfg.upslope, Dag.fixed, 0]]],

            [path+P.wdirSourceFromNo, 0, U.compass, 0, [
                [cfg.headingFromUpslope, Compass.opposite, [path+P.wdirHeadFromNo]],
                [cfg.sourceFromNorth, Dag.input, []],
                [cfg.upslope, Compass.opposite, ['site.slope.direction.upslope']]]],

            [path+P.wdirSourceFromUp, 0, U.compass, 0, [
                [this.any, Compass.opposite, [path+P.wdirHeadFromUp]]]],

            [path+P.wdirHeadFromNo, 0, U.compass, 0, [
                [cfg.headingFromUpslope, Compass.sum, [path+P.wdirHeadFromUp, upslope]],
                [cfg.sourceFromNorth, Compass.opposite, [path+P.wdirSourceFromNo]],
                [cfg.upslope, Dag.assign, [upslope]]]],
        ]
    }
    setConfig() {
        const headingFromUpslope = 'heading from up-slope'
        const sourceFromNorth = 'source from north'
        const upslope = 'upslope'
        this.config = {
            headingFromUpslope, sourceFromNorth,    // individual key for outside reference
            options: [upslope, headingFromUpslope, sourceFromNorth],
            prompt: 'the wind direction is specified as',
            prompts: [
                [upslope, 'always up-slope'],
                [headingFromUpslope, 'heading degrees from up-slope'],
                [sourceFromNorth, 'source degrees from north'],
            ],
        }
        return this.config
    }
}
