import { Calc, Dag, K, U, Util } from '../index.js'
import { CanopyEquations as Canopy} from '../index.js'

export const MidflameWindConfig = {
    source: {
        prompt: 'Midflame wind speed is',
        options: [
            {value: 'input', desc: 'entered directly as input'},
            {value: 'estimated', desc: 'estimated from 20-ft wind speed and a wind speed adjustment'},
        ],
        value: 'input',
    },
}

export function midflameWindNodes(modId, windId, wafId, cfg) {
    const cfgSource = cfg.source.value

    const meta = [
        [modId+K.mmod, 'midflame wind speed', U.text, Dag.constant, []],
        [modId+K.mver, '1', U.text, Dag.constant, []],
        [modId+K.mcfg+'source', cfgSource, U.text, Dag.constant, []],
    ]

    const nodes = (cfgSource === 'input')
        ? [[modId+K.wmid, 0, U.wspd, Dag.input, []]]
        : [[modId+K.wmid, 0, U.wspd, Calc.multiply, [windId+K.w20f, wafId+K.waf]],
    ]
    return [...meta, ...nodes].sort()
}
