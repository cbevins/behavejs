import { Calc, Dag, L, U } from '../index.js'
import { CanopyEquations as Canopy} from '../index.js'

export const CanopyConfig = {
    inputs: {
        prompt: 'Preferred canopy input parameters are',
        options: [
            {value: 'ratio-height', desc: 'crown ratio and canopy total height'},
            {value: 'ratio-base', desc: 'crown ratio and canopy base height'},
            {value: 'ratio-length', desc: 'crown ratio and crown length'},
            {value: 'height-length', desc: 'canopy total height and crown length'},
            {value: 'height-base', desc: 'canopy total height and canopy base height'},
            {value: 'length-base', desc: 'crown length, canopy base height'},
        ],
        value: 'ratio-height',
    },
}
/**
 * @param {string} path Module pathway prefixed to all the returned nodes' keys
 * @param {Config} cfg cfg.input.value as defined above
 * @returns Array of canopy module node definitions
 */
export function canopyNodes(path, cfg) {
    const cfgInputs = cfg.inputs.value

    const meta = [
        [path+L.mmod, 'canopy', U.text, Dag.constant, []],
        [path+L.mver, '1', U.text, Dag.constant, []],
        [path+L.mcfg+'inputs', cfgInputs, U.text, Dag.constant, []],
    ]
    const inputs = [
        [path+L.ccov, 0, U.fraction, Dag.input, []],
        [path+L.cbulk, 0, U.fraction, Dag.input, []],
        [path+L.cheat, 0, U.heat, Dag.input, []],
    ]
    const derived = [
        [path+L.cfill, 0, U.fraction, Canopy.crownFill, [
            path+L.ccov, path+L.crat]],
        [path+L.cload, 0, U.load, Canopy.fuelLoad, [
            path+L.cbulk, path+L.clen]],
        [path+L.chpua, 0, U.hpua, Canopy.heatPerUnitArea, [
            path+L.cload, path+L.cheat]],
        [path+L.cshelters, 0, U.yesno, Canopy.sheltersFuelFromWind, [
            path+L.ccov, path+L.ctht, path+L.cfill]],
        [path+L.cwaf, 0, U.ratio, Canopy.windSpeedAdjustmentFactor, [
            path+L.ccov, path+L.ctht, path+L.cfill]],
    ]
    const nodes = [...meta, ...inputs, ...derived]
    const ratioHeight = [
        [path+L.cbht, 0, U.clen, Canopy.baseFromRatioHeight, [
            path+L.crat, path+L.ctht]],
        [path+L.clen, 0, U.clen, Canopy.lengthFromRatioHeight, [
            path+L.crat, path+L.ctht]],
        [path+L.ctht, 0, U.clen, Dag.input, []],
        [path+L.crat, 0, U.fraction, Dag.input, []],
    ]
    const ratioBase = [
        [path+L.cbht, 0, U.clen, Dag.input, []],
        [path+L.clen, 0, U.clen, Canopy.lengthFromRatioBase, [
            path+L.crat, path+L.cbht]],
        [path+L.ctht, 0, U.clen, Canopy.heightFromRatioBase, [
            path+L.crat, path+L.cbht]],
        [path+L.crat, 0, U.fraction, Dag.input, []],
    ]
    const ratioLength = [
        [path+L.cbht, 0, U.clen, Canopy.baseFromRatioLength, [
            path+L.crat, path+L.clen]],
        [path+L.clen, 0, U.clen, Dag.input, []],
        [path+L.ctht, 0, U.clen, Canopy.heightFromRatioLength, [
            path+L.crat, path+L.clen]],
        [path+L.crat, 0, U.fraction, Dag.input, []],
    ]
    const heightLength = [
        [path+L.cbht, 0, U.clen, Canopy.baseFromHeightLength, [
            path+L.ctht, path+L.clen]],
        [path+L.clen, 0, U.clen, Dag.input, []],
        [path+L.ctht, 0, U.clen, Dag.input, []],
        [path+L.crat, 0, U.fraction, Canopy.ratioFromHeightLength, [
            path+L.ctht, path+L.clen]],
    ]
    const heightBase = [
        [path+L.cbht, 0, U.clen, Dag.input, []],
        [path+L.clen, 0, U.clen, Canopy.lengthFromHeightBase, [
            path+L.ctht, path+L.cbht]],
        [path+L.ctht, 0, U.clen, Dag.input, []],
        [path+L.crat, 0, U.fraction, Canopy.ratioFromHeightBase, [
            path+L.ctht, path+L.cbht]],
    ]
    const lengthBase = [
        [path+L.cbht, 0, U.clen, Dag.input, []],
        [path+L.clen, 0, U.clen, Dag.input, []],
        [path+L.ctht, 0, U.clen, Canopy.heightFromLengthBase, [
            path+L.ctht, path+L.cbht]],
        [path+L.crat, 0, U.fraction, Canopy.ratioFromLengthBase, [
            path+L.ctht, path+L.cbht]],
    ]

    if (cfgInputs === 'ratio-height') return [...nodes, ...ratioHeight].sort()
    if (cfgInputs === 'ratio-base') return [...nodes, ...ratioBase].sort()
    if (cfgInputs === 'ratio-length') return [...nodes, ...ratioLength].sort()
    if (cfgInputs === 'height-length') return [...nodes, ...heightLength].sort()
    if (cfgInputs === 'height-base') return [...nodes, ...heightBase].sort()
    if (cfgInputs === 'length-base') return [...nodes, ...lengthBase].sort()
}
