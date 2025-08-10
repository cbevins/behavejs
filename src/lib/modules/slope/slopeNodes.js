import { Compass, Dag, K, U, Util } from '../index.js'

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

export function slopeNodes(modId, cfg) {
    const srat = modId+K.srat
    const sdeg = modId+K.sdeg
    const sasp = modId+K.sasp
    const sups = modId+K.sups
    const cfgDir = cfg.direction.value
    const cfgSteep = cfg.steepness.value

    const meta = [
        [modId+K.mmod, 'slope', U.text, Dag.constant, []],
        [modId+K.mver, '1', U.text, Dag.constant, []],
        [modId+K.mcfg+'direction', cfgDir, U.text, Dag.constant, []],
        [modId+K.mcfg+'steep', cfgSteep, U.text, Dag.constant, []],
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

const nodes = slopeNodes('slope/', SlopeConfig)
const map = Util.nodesToMap(nodes)
console.log(Util.listNodeMap(map))
