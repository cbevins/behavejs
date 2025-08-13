import { Dag, L, U } from '../index.js'

export const MoistureConfig = {
    input: {
        prompt: 'Fuel moisture inputs are entered for',
        options: [
            {value: '5', desc: '3 dead class and 2 live class values'},
            {value: '4', desc: '3 dead class and 1 live category values'},
            {value: '2', desc: '1 dead category and 1 live category values'},
        ],
        value: '5'
    }
}
/**
 * @param {string} path Module pathway prefixed to all the returned nodes' keys
 * @param {Config} cfg cfg.input.value of '5', '4', or '2'
 * @returns Array of moisture module fuel moisture content node definitions
 */
export function moistureNodes(path, cfg) {
    const md1   = path + L.m1
    const md10  = path + L.m10
    const md100 = path + L.m100
    const mherb = path + L.mherb
    const mstem = path + L.mstem
    const mlive = path + L.mlive
    const mdead = path + L.mdead
    const cfgInput = cfg.input.value
    
    const meta = [
        [path+L.mmod, 'moisture', U.text, Dag.constant, []],
        [path+L.mver, '1', U.text, Dag.constant, []],
        [path+L.mcfg+'input', cfgInput, U.text, Dag.constant, []],
    ]
    const input2 = [
        [mdead, 0, U.mois, Dag.input, []],
        [mlive, 0, U.mois, Dag.input, []],
        [md1,   0, U.mois, Dag.assign, [mdead]],
        [md10,  0, U.mois, Dag.assign, [mdead]],
        [md100, 0, U.mois, Dag.assign, [mdead]],
        [mherb, 0, U.mois, Dag.assign, [mlive]],
        [mstem, 0, U.mois, Dag.assign, [mlive]],
    ]
    const input4 = [
        [mdead, 0, U.mois, Dag.constant, []],
        [md1,   0, U.mois, Dag.input, []],
        [md10,  0, U.mois, Dag.input, []],
        [md100, 0, U.mois, Dag.input, []],
        [mlive, 0, U.mois, Dag.input, []],
        [mherb, 0, U.mois, Dag.assign, [mlive]],
        [mstem, 0, U.mois, Dag.assign, [mlive]],
    ]
    const input5 = [
        [md1,   0, U.mois, Dag.input, []],
        [md10,  0, U.mois, Dag.input, []],
        [md100, 0, U.mois, Dag.input, []],
        [mherb, 0, U.mois, Dag.input, []],
        [mstem, 0, U.mois, Dag.input, []],
        [mdead, 0, U.mois, Dag.constant, []],
        [mlive, 0, U.mois, Dag.constant, []],
    ]
    if (cfgInput === '2') return [...meta, ...input2]
    if (cfgInput === '4') return [...meta, ...input4]
    return [...meta, ...input5]
}
