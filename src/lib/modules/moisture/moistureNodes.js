import { Dag, L, U } from '../index.js'

export const MoistureConfig = {
    input: {
        prompt: 'Fuel moisture inputs are entered for',
        options: [
            {value: 'individual', desc: '3 dead class and 2 live class values'},
            {value: 'liveCategory', desc: '3 dead class and 1 live category values'},
            {value: 'category', desc: '1 dead category and 1 live category values'},
        ],
        value: 'individual'
    }
}
export const MoistureSourceOptions = ['individual', 'liveCategory', 'category']

/**
 * @param {string} path Module pathway prefixed to all the returned nodes' keys
 * @param {Config} cfgopt One of the MoistureSourceOptions
 * @returns Array of moisture module fuel moisture content node definitions
 */
export function moistureNodes(path, cfgopt='individual') {
    const md1   = path + L.m1
    const md10  = path + L.m10
    const md100 = path + L.m100
    const mherb = path + L.mherb
    const mstem = path + L.mstem
    const mlive = path + L.mlive
    const mdead = path + L.mdead
    
    const meta = [
        [path+L.mmod, 'moisture', U.text, Dag.constant, []],
        [path+L.mver, '1', U.text, Dag.constant, []],
        [path+L.mcfg+'source', cfgopt, U.text, Dag.constant, []],
    ]
    const category = [
        [mdead, 0, U.mois, Dag.input, []],
        [mlive, 0, U.mois, Dag.input, []],
        [md1,   0, U.mois, Dag.assign, [mdead]],
        [md10,  0, U.mois, Dag.assign, [mdead]],
        [md100, 0, U.mois, Dag.assign, [mdead]],
        [mherb, 0, U.mois, Dag.assign, [mlive]],
        [mstem, 0, U.mois, Dag.assign, [mlive]],
    ]
    const liveCategory = [
        [mdead, 0, U.mois, Dag.constant, []],
        [md1,   0, U.mois, Dag.input, []],
        [md10,  0, U.mois, Dag.input, []],
        [md100, 0, U.mois, Dag.input, []],
        [mlive, 0, U.mois, Dag.input, []],
        [mherb, 0, U.mois, Dag.assign, [mlive]],
        [mstem, 0, U.mois, Dag.assign, [mlive]],
    ]
    const individual = [
        [md1,   0, U.mois, Dag.input, []],
        [md10,  0, U.mois, Dag.input, []],
        [md100, 0, U.mois, Dag.input, []],
        [mherb, 0, U.mois, Dag.input, []],
        [mstem, 0, U.mois, Dag.input, []],
        [mdead, 0, U.mois, Dag.constant, []],
        [mlive, 0, U.mois, Dag.constant, []],
    ]
    if (cfgopt === category) return [...meta, ...category]
    if (cfgopt === liveCategory) return [...meta, ...liveCategory]
    return [...meta, ...individual]
}
