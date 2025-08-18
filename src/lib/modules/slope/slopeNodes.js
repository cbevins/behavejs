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
export const SlopeDirectionOptions = ['aspect', 'upslope']
export const SlopeSteepnessOptions = ['ratio', 'degrees', 'map']
/**
 * @param {string} path Module pathway prefixed to all the returned nodes' keys
 * @param {Config} cfgSteep is one of the SlopeSteepnessOptioins
 * @param {Config} cfgDir is one of the SlopeDirectionOptioins
 * @returns Array of slope steepness and direction node definitions
 */
export function slopeNodes(path, cfgSteep='ratio', cfgDir='aspect') {
    const srat = path+L.srat
    const sdeg = path+L.sdeg
    const sasp = path+L.sasp
    const sups = path+L.sups

    const meta = [
        [path+L.mmod, 'slope', U.text, Dag.constant, []],
        [path+L.mver, '1', U.text, Dag.constant, []],
        [path+L.mcfg+'direction', cfgDir, U.text, Dag.constant, []],
        [path+L.mcfg+'steep', cfgSteep, U.text, Dag.constant, []],
    ]
    const ratio = [
        [srat, 0, U.srat, Dag.input, []],
        [sdeg, 0, U.sdeg, Compass.slopeDegrees, [srat]],
    ]
    const degrees = [
        [srat, 0, U.srat, Compass.slopeRatio, [sdeg]],
        [sdeg, 0, U.sdeg, Dag.input, []],
    ]
    const aspect = [
        [sasp, 0, U.cdeg, Dag.input, []],
        [sups, 180, U.cdeg, Compass.opposite, [sasp]],
    ]
    const upslope = [
        [sasp, 0, U.cdeg, Compass.opposite, [sups]],
        [sups, 180, U.cdeg, Dag.input, []],
    ]
    const steep = (cfgSteep === 'degrees') ? degrees : ratio
    const dir = (cfgDir === 'aspect') ? aspect : upslope
    return [...meta, ...steep, ...dir].sort()
}
