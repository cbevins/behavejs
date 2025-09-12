import { Dag, C, P, ModuleBase, U } from '../index.js'
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

        // configs
        this.config = 'wind direction input'
        this.options = [C.wdirHeadFromUp, C.wdirSourceFromNo, C.wdirBlowsUpslope]

        this.nodes = [
            [path+P.wdirHeadFromUp, 0, U.compass, 0, [
                [C.wdirHeadFromUp,   Dag.input, []],
                [C.wdirSourceFromNo, Compass.diff, [path+P.wdirHeadFromNo, 'site.slope.direction.upslope']],
                [C.wdirBlowsUpslope, Dag.fixed, 0]]],

            [path+P.wdirSourceFromNo, 0, U.compass, 0, [
                [C.wdirHeadFromUp, Compass.opposite, [path+P.wdirHeadFromNo]],
                [C.wdirSourceFromNo, Dag.input, []],
                [C.wdirBlowsUpslope, Compass.opposite, ['site.slope.direction.upslope']]]],

            [path+P.wdirSourceFromUp, 0, U.compass, 0, [
                [this.any, Compass.opposite, [path+P.wdirHeadFromUp]]]],

            [path+P.wdirHeadFromNo, 0, U.compass, 0, [
                [C.wdirHeadFromUp, Compass.sum, [path+P.wdirHeadFromUp, upslope]],
                [C.wdirSourceFromNo, Compass.opposite, [path+P.wdirSourceFromNo]],
                [C.wdirBlowsUpslope, Dag.assign, [upslope]]]],
        ]
    }
}
