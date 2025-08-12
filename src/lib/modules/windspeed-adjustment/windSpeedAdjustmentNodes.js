import { Calc, Dag, K, U, Util } from '../index.js'
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
/**
 * 
 * @param {string} modId  This module's id (prefix)
 * @param {string} bedId  Surface bed module id
 * @param {string} windId Wind module id
 * @param {string} canId Canopy module id
 * @param {string} cfg Config object with cfg.source.value={input|open|canopy}
 * @returns 
 */
export function windSpeedAdjustmentNodes(modId, bedId, windId, canId, cfg) {
    const cfgSource = cfg.source.value

    const meta = [
        // [modId+K.mmod, 'midflame wind', U.text, Dag.constant, []],
        [modId+K.mver, '1', U.text, Dag.constant, []],
        [modId+K.mcfg+'source', 'x', U.text, Dag.constant, []],
    ]
    const input = [
        [modId+K.waf,  1, U.factor, Dag.input, []],   // final waf
        [modId+K.owaf, 1, U.factor, Dag.constant, []],  // open canopy waf
        [modId+K.cwaf, 1, U.factor, Dag.constant, []],  // canopy-induced waf
    ]
    const open = [
        [modId+K.waf,  1, U.factor, Dag.assign, [modId+K.owaf]],   // final waf
        [bedId+K.owaf, 1, U.owaf,   Bed.openWindSpeedAdjustmentFactor, [bedId+K.depth]],
        [modId+K.cwaf, 1, U.factor, Dag.constant, []],  // canopy-induced waf
    ]
    const canopy = [
        [modId+K.waf,  1, U.factor, Dag.assign, [modId+K.cwaf]],   // final waf
        [bedId+K.owaf, 1, U.owaf,   Dag.constant, []],
        [modId+K.cwaf, 1, U.factor, Dag.assign, [canId+K.cwaf]],  // canopy-induced waf
    ]
    let nodes = [...meta, ...canopy]
    if (cfgSource === 'input') nodes = [...meta, ...input]
    else if (cfgSource === 'open') nodes = [...meta, ...open]
    return nodes.sort()
}
