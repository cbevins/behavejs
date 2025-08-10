/**
 * Returns standard fuel model linked to a fuel catalog
 * @param {string} modId All the nodes are prefaces with this id
*/
import { Dag, K, U, Util} from '../index.js'

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

export function moistureNodes(modId, cfg) {
    const md1   = modId + K.md1
    const md10  = modId + K.md10
    const md100 = modId + K.md100
    const mherb = modId + K.mherb
    const mstem = modId + K.mstem
    const mlive = modId + K.mlive
    const mdead = modId + K.mdead
    const cfgInput = cfg.input.value
    
    const meta = [
        [modId+K.mmod, 'fuel moisture', U.text, Dag.constant, []],
        [modId+K.mver, '1', U.text, Dag.constant, []],
        [modId+K.mcfg+'input', cfgInput, U.text, Dag.constant, []],
    ]
    const input2 = [
        [mdead, 0, U.mois, Dag.input, []],
        [mlive, 0, U.mois, Dag.input, []],
        [md1, 0, U.mois, Dag.assign, [mdead]],
        [md10, 0, U.mois, Dag.assign, [mdead]],
        [md100, 0, U.mois, Dag.assign, [mdead]],
        [mherb, 0, U.mois, Dag.assign, [mlive]],
        [mstem, 0, U.mois, Dag.assign, [mlive]],
    ]
    const input4 = [
        [md1, 0, U.mois, Dag.input, []],
        [md10, 0, U.mois, Dag.input, []],
        [md100, 0, U.mois, Dag.input, []],
        [mlive, 0, U.mois, Dag.input, []],
        [mherb, 0, U.mois, Dag.assign, [mlive]],
        [mstem, 0, U.mois, Dag.assign, [mlive]],
        [mdead, 0, U.mois, Dag.constant, []],
    ]
    const input5 = [
        [md1, 0, U.mois, Dag.input, []],
        [md10, 0, U.mois, Dag.input, []],
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
