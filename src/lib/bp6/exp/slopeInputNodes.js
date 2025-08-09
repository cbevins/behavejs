import { Dag, K } from '../index.js'
import { CompassEquations as Compass } from './CompassEquations.js'

export function slopeInputNodes(id, cfgSteep, cfgDir) {
    const ratio = id+'steepness/ratio'
    const degrees = id+'steepness/degrees'
    const aspect = id+'direction/aspect'
    const upslope = id+'direction/upslope'

    const inputRatio = [
        [ratio, 0, K._ratio, Dag.input, []],
        [degrees, 0, K._degh, Compass.slopeDegrees, [ratio]],
    ]
    const inputDegrees = [
        [ratio, 0, K._wspd, Compass.slopeRatio, [degrees]],
        [degrees, 0, K._degh, Dag.input, []],
    ]
    const inputAspect = [
        [aspect, 0, K._degn, Dag.input, []],
        [upslope, 180, K._degn, Compass.opposite, [aspect]],
    ]
    const inputUpslope = [
        [aspect, 0, K._degn, Compass.opposite, [upslope]],
        [upslope, 180, K._degn, Dag.input, []],
    ]
    const module = [
        [id+'module', 'terrain slope input', K._text, Dag.constant, []],
        [id+'version', '1', K._text, Dag.constant, []],
    ]
    const steep = (cfgSteep === 'degrees') ? inputDegrees : inputRatio
    const dir = (cfgDir === 'aspect') ? inputAspect : inputUpslope
    return [...module, ...steep, ...dir]
}
