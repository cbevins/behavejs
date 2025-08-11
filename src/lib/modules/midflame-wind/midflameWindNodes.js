import { Calc, Dag, K, U, Util } from '../index.js'
import { CanopyEquations as Canopy} from '../index.js'

export const MidflameWindConfig = {
    source: {
        prompt: 'Midflame windspeed is',
        options: [
            {value: 'midflame', desc: 'entered directly as input'},
            {value: 'waf', desc: 'estimated from wind speed and an input adjustment factor'},
            {value: 'estimated', desc: 'estimated from wind speed and fuel, canopy parameters'}
        ],
        value: 'midflame',
    },
}

export function midflameWindNodes(modId, windId, canId, cfg) {
    const cfgSource = cfg.source.value

    const meta = [
        [modId+K.mmod, 'midflame wind', U.text, Dag.constant, []],
        [modId+K.mver, '1', U.text, Dag.constant, []],
        [modId+K.mcfg+'source', cfgSource, U.text, Dag.constant, []],
    ]
    const derived = [
        
    ]
    const midflame = [
        [modId+K.wmid, 0, U.wspd, Dag.input, []],
        [modId+K.waf, 1, U.factor, Dag.constant, []],
    ]
    const waf = [
        [modId+K.waf, 0, U.factor, Dag.input, []],
        [modId+K.wmid, 0, U.wspd, Calc.multiply, [modId+K.waf, windId+K.w20f]],
    ]
    const estimated = [
        [modId+K.waf, 1, U.factor, Dag.constant, []],
        [modId+K.ccov, 1, U.fraction, Dag.input, []],
        [modId+K.cht, 1, U.factor, Dag.input, []],
        [modId+K.fill, 1, U.fraction, Dag.input, []],
        // [modId+K.wmid, 0, U.wspd, Canopy.windSpeedAdjustmentFactor, [
        //     canId+K.ccov, canId+K.cht, canId+K.cfill]],
    ]
    if (cfgSource === 'estimated') return [...meta, ...estimated].sort()
    if (cfgSource === 'midflame') return [...meta, ...midflame].sort()
    return [...meta, ...midflame].sort()
}
