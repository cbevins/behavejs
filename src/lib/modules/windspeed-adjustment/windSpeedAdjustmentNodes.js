import { Dag, L, U } from '../index.js'
import { CanopyEquations as Canopy} from '../index.js'
import { SurfaceBedEquations as Bed} from '../index.js'

export const WindSpeedAdjustmentConfig= {
    source: {
        prompt: 'Wind speed adjustment factor is',
        options: [
            {value: 'input', desc: 'entered directly as input'},
            {value: 'open', desc: 'estimated for open-canopy fuel bed'},
            {value: 'canopy', desc: 'estimated from fuel canopy parameters'},
        ],
        value: 'input',
    },
}
export const WindSpeedAdjustmentOptions = ['input', 'open', 'canopy']
/**
 * 
 * @param {string} path Module pathway prefixed to all the returned nodes' keys
 * @param {string} bed Path of the Bed Module to be applied
 * @param {string} canopy Path of the Canopy Module to be applied
 * @param {Config} cfgSource One of the WindSpeedAdjustmentOptions
 * @returns Array of wind speed adjustment module factor node definitions
 */
export function windSpeedAdjustmentNodes(path, bed, canopy, cfgSource) {
    const meta = [
        [path+L.mmod, 'wind speed adjustment', U.text, Dag.constant, []],
        [path+L.mver, '1', U.text, Dag.constant, []],
        [path+L.mcfg+'source', cfgSource, U.text, Dag.constant, []],
    ]
    const input = [
        [path+L.waf,  1, U.factor, Dag.input, []],   // final waf
        [path+L.owaf, 1, U.factor, Dag.constant, []],  // open canopy waf
        [path+L.cwaf, 1, U.factor, Dag.constant, []],  // canopy-induced waf
    ]
    const open = [
        [path+L.waf,  1, U.factor, Dag.assign, [path+L.owaf]],   // final waf
        [bed+L.owaf, 1, U.owaf,   Bed.openWindSpeedAdjustmentFactor, [bed+L.depth]],
        [path+L.cwaf, 1, U.factor, Dag.constant, []],  // canopy-induced waf
    ]
    const can = [
        [path+L.waf,  1, U.factor, Dag.assign, [path+L.cwaf]],   // final waf
        [bed+L.owaf, 1, U.owaf,   Dag.constant, []],
        [path+L.cwaf, 1, U.factor, Dag.assign, [canopy+L.cwaf]],  // canopy-induced waf
    ]
    let nodes = [...meta, ...can]
    if (cfgSource === 'input') nodes = [...meta, ...input]
    else if (cfgSource === 'open') nodes = [...meta, ...open]
    return nodes.sort()
}
