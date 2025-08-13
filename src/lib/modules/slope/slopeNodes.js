import { Compass, Dag, L, U } from '../index.js'

export const SlopeConfig = {
    steepness: {
        prompt: 'Slope steepness inputs are entered as',
        options: [
            {value: 'ratio', desc: 'ratio of vertical rise to horizontal reach'},
            {value: 'degrees', desc: 'degrees above the horizontal'},],
        value: 'ratio'
    },
    direction: {
        prompt: 'Slope direction inputs are for',
        options: [
            {value: 'aspect', desc: 'aspect (downslope) degreees from north'},
            {value: 'upslope', desc: 'upslope degreees from north'},
        ],
        value: 'aspect'
    }
}
/**
 * @param {string} path Module pathway prefixed to all the returned nodes' keys
 * @param {Config} cfg cfg.steepness.value of ''ratio' or 'degrees'
 *  and a cfg.direction.value of 'aspect' or 'upslope'
 * @returns Array of slope steepness and direction node definitions
 */
export function slopeNodes(path, cfg) {
    const srat = path+L.srat
    const sdeg = path+L.sdeg
    const sasp = path+L.sasp
    const sups = path+L.sups
    const cfgDir = cfg.direction.value
    const cfgSteep = cfg.steepness.value

    const meta = [
        [path+L.mmod, 'slope', U.text, Dag.constant, []],
        [path+L.mver, '1', U.text, Dag.constant, []],
        [path+L.mcfg+'direction', cfgDir, U.text, Dag.constant, []],
        [path+L.mcfg+'steep', cfgSteep, U.text, Dag.constant, []],
    ]
    const inputRatio = [
        [srat, 0, U.srat, Dag.input, []],
        [sdeg, 0, U.sdeg, Compass.slopeDegrees, [srat]],
    ]
    const inputDegrees = [
        [srat, 0, U.srat, Compass.slopeRatio, [sdeg]],
        [sdeg, 0, U.sdeg, Dag.input, []],
    ]
    const inputAspect = [
        [sasp, 0, U.cdeg, Dag.input, []],
        [sups, 180, U.cdeg, Compass.opposite, [sasp]],
    ]
    const inputUpslope = [
        [sasp, 0, U.cdeg, Compass.opposite, [sups]],
        [sups, 180, U.cdeg, Dag.input, []],
    ]
    const steep = (cfgSteep === 'degrees') ? inputDegrees : inputRatio
    const dir = (cfgDir === 'aspect') ? inputAspect : inputUpslope
    return [...meta, ...steep, ...dir].sort()
}
