import { Calc, Dag, K, U, Util } from '../index.js'
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

export function canopyNodes(modId, cfg) {
    const cfgInputs = cfg.inputs.value

    const meta = [
        [modId+K.mmod, 'canopy', U.text, Dag.constant, []],
        [modId+K.mver, '1', U.text, Dag.constant, []],
        [modId+K.mcfg+'source', cfgSource, U.text, Dag.constant, []],
    ]
    const inputs = [
        [modId+K.ccov, 0, U.fraction, Dag.input, []],
        [modId+K.cbulk, 0, U.fraction, Dag.input, []],
        [modId+K.cheat, 0, U.heat, Dag.input, []],
    ]
    const derived = [
        [modId+K.cfill, 0, U.fraction, Canopy.crownFill, [
            modId+K.ccov, modId+K.crat]],
        [modId+K.cload, 0, U.load, Canopy.fuelLoad, [
            modId+K.cbulk, modId+K.clen]],
        [modId+K.chpua, 0, U.hpua, Canopy.heatPerUnitArea, [
            modId+K.cload, modId+K.cheat]],
        [modId+K.cshelters, 0, U.yesno, Canopy.sheltersFuelFromWind, [
            modId+K.ccov, modId+K.ctht, modId+K.cfill]],
        [modId+K.cwaf, 0, U.ratio, Canopy.windSpeedAdjustmentFactor, [
            modId+K.ccov, modId+K.ctht, modId+K.cfill]],
    ]
    const nodes = [...meta, ...inputs, ...derived]
    const ratioHeight = [
        [modId+K.cbht, 0, U.clen, Canopy.baseFromRatioHeight, [
            modId+K.crat, modId+K.ctht]],
        [modId+K.clen, 0, U.clen, Canopy.lengthFromRatioHeight, [
            modId+K.crat, modId+K.ctht]],
        [modId+K.ctht, 0, U.clen, Dag.input, []],
        [modId+K.crat, 0, U.fraction, Dag.input, []],
    ]
    const ratioBase = [
        [modId+K.cbht, 0, U.clen, Dag.input, []],
        [modId+K.clen, 0, U.clen, Canopy.lengthFromRatioBase, [
            modId+K.crat, modId+K.cbht]],
        [modId+K.ctht, 0, U.clen, Canopy.heightFromRatioBase, [
            modId+K.crat, modId+K.cbht]],
        [modId+K.crat, 0, U.fraction, Dag.input, []],
    ]
    const ratioLength = [
        [modId+K.cbht, 0, U.clen, Canopy.baseFromRatioLength, [
            modId+K.crat, modId+K.clen]],
        [modId+K.clen, 0, U.clen, Dag.input, []],
        [modId+K.ctht, 0, U.clen, Canopy.heightFromRatioLength, [
            modId+K.crat, modId+K.clen]],
        [modId+K.crat, 0, U.fraction, Dag.input, []],
    ]
    const heightLength = [
        [modId+K.cbht, 0, U.clen, Canopy.baseFromHeightLength, [
            modId+K.ctht, modId+K.clen]],
        [modId+K.clen, 0, U.clen, Dag.input, []],
        [modId+K.ctht, 0, U.clen, Dag.input, []],
        [modId+K.crat, 0, U.fraction, Canopy.ratioFromHeightLength, [
            modId+K.ctht, modId+K.clen]],
    ]
    const heightBase = [
        [modId+K.cbht, 0, U.clen, Dag.input, []],
        [modId+K.clen, 0, U.clen, Canopy.lengthFromHeightBase, [
            modId+K.ctht, modId+K.cbht]],
        [modId+K.ctht, 0, U.clen, Dag.input, []],
        [modId+K.crat, 0, U.fraction, Canopy.ratioFromHeightBase, [
            modId+K.ctht, modId+K.cbht]],
    ]
    const lengthBase = [
        [modId+K.cbht, 0, U.clen, Dag.input, []],
        [modId+K.clen, 0, U.clen, Dag.input, []],
        [modId+K.ctht, 0, U.clen, Canopy.heightFromLengthBase, [
            modId+K.ctht, modId+K.cbht]],
        [modId+K.crat, 0, U.fraction, Canopy.ratioFromLengthBase, [
            modId+K.ctht, modId+K.cbht]],
    ]

    if (cfgInputs === 'ratio-height') return [...nodes, ...ratioHeight].sort()
    if (cfgInputs === 'ratio-base') return [...nodes, ...ratioBase].sort()
    if (cfgInputs === 'ratio-length') return [...nodes, ...ratioLength].sort()
    if (cfgInputs === 'height-length') return [...nodes, ...heightLength].sort()
    if (cfgInputs === 'height-base') return [...nodes, ...heightBase].sort()
    if (cfgInputs === 'length-base') return [...nodes, ...lengthBase].sort()
}
