import { Calc, Dag, L, U } from '../index.js'

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
/**
 * @param {string} path Module pathway prefixed to all the returned nodes' keys
 * @param {string} wind Prefix pathway to the Wind Module to be applied
 * @param {string} waf Prefix pathway to the Wind Adjustment Factor Module to be applied
 * @param {Config} cfg cfg.input.value of 'input' or 'estimated'
 * @returns Array of midflame wind module speed node definitions
 */
export function midflameWindNodes(path, wind, waf, cfg) {
    const cfgSource = cfg.source.value

    const meta = [
        [path+L.mmod, 'wind at midflame', U.text, Dag.constant, []],
        [path+L.mver, '1', U.text, Dag.constant, []],
        [path+L.mcfg+'source', cfgSource, U.text, Dag.constant, []],
    ]

    const nodes = (cfgSource === 'input')
        ? [[path+L.wmid, 0, U.wspd, Dag.input, []]]
        : [[path+L.wmid, 0, U.wspd, Calc.multiply, [wind+L.w20f, waf+L.waf]],
    ]
    return [...meta, ...nodes].sort()
}
