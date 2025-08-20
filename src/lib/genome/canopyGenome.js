import { Calc, Dag, P, U } from './index.js'
import { CanopyEquations as Canopy} from './index.js'

export const CanopyHeightInputOptions = [
    'ratio-height', 'ratio-base', 'ratio-length',
    'height-length', 'height-base', 'length-base']

/**
 * @param {string} path Module pathway prefixed to all the returned nodes' keys
 * @param {Config} cfg cfg.input.value as defined above
 * @returns Array of canopy module node definitions
 */
export function canopyGenome(path=P.canopy) {
    const height = [
        [path+'base height', 0, U.canopyHt, [
            ['ratio-height', Canopy.baseFromRatioHeight, [path+'crown ratio', path+'total height']],
            ['ratio-base', Dag.input, []],
            ['ratio-length', Canopy.baseFromRatioLength, [path+'crown ratio', path+'crown length']],
            ['height-length', Canopy.baseFromHeightLength, [path+'total height', path+'crown length']],
            ['height-base', Dag.input, []],
            ['length-base', Dag.input, []]]
        ],
        [path+'crown length', 0, U.canopyHt, [
            ['ratio-height', Canopy.lengthFromRatioHeight, [path+'crown ratio', path+'total height']],
            ['ratio-base', Canopy.lengthFromRatioBase, [path+'crown ratio', path+'base height']],
            ['ratio-length', Dag.input, []],
            ['height-length', Dag.input, []],
            ['height-base', Canopy.lengthFromHeightBase, [path+'total height', path+'base height']],
            ['length-base', Dag.input, []]],
        ],
        [path+'total height', 0, U.canopyHt, [
            ['ratio-height', Dag.input, []],
            ['ratio-base', Canopy.heightFromRatioBase, [path+'crown ratio', path+'base height']],
            ['ratio-length', Canopy.heightFromRatioLength, [path+'crown ratio', path+'crown length']],
            ['height-length', Dag.input, []],
            ['height-base', Dag.input, []],
            ['length-base', Canopy.heightFromLengthBase, [path+'crown length', path+'base height']]],
        ],
        [path+'crown ratio', 0, U.fraction, [
            ['ratio-height', Dag.input, []],
            ['ratio-base', Dag.input, []],
            ['ratio-length', Dag.input, []],
            ['height-length', Canopy.ratioFromHeightLength, [path+'total height', path+'crown length']],
            ['height-base', Canopy.ratioFromHeightBase, [path+'total height', path+'base height']],
            ['length-base', Canopy.ratioFromLengthBase, [path+'crown length', path+'base height']]],
        ]
    ]

    const inputs = [
        [path+'coverage', 0, U.fraction, [['*', Dag.input, []]]],
        [path+'bulk density', 0, U.fraction, [['*', Dag.input, []]]],
        [path+'heat of combustion', 0, U.heat, [['*', Dag.input, []]]],
    ]

    const derived = [
        [path+'volumetric fill ratio', 0, U.fraction, [
            ['*', Canopy.crownFill, [path+'coverage', path+'crown ratio']]]],
        [path+'fuel load', 0, U.load, [
            ['*', Canopy.fuelLoad, [path+'bulk density', path+'crown length']]]],
        [path+'heat per unit area', 0, U.hpua, [
            ['*', Canopy.heatPerUnitArea, [path+'fuel load', path+'heat of combustion']]]],
        [path+'shelters fuel from wind', 0, U.yesno, [
            ['*', Canopy.sheltersFuelFromWind, [path+'coverage', path+'total height', path+'volumetric fill ratio']]]],
        [path+'wind reduction factor', 0, U.ratio, [
            ['*', Canopy.windSpeedAdjustmentFactor, [path+'coverage', path+'total height', path+'volumetric fill ratio']]]],
    ]
    
    return [...height, ...inputs, ...derived]
}
