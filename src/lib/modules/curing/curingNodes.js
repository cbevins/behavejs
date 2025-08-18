import { Dag, L, U, SurfaceBedEquations as Eq } from '../index.js'

export const CuringConfig = {
    source: {
        prompt: 'Cured herb fuel fraction is',
        options: [
            {value: 'input', desc: 'directly entered as input'},
            {value: 'estimated', desc: 'estimated from live herb moisture content'}],
        value: 'input'
    },
}
export const CuringInputOptions = ['input', 'estimated']
/**
 * 
 * @param {string} path Module pathway prefixed to all the returned nodes' keys
 * @param {string} mois Path of the Moisture Model to be applied
 * @param {string} cfgopt One of the CuringInputOptions
 * @returns Array of curing module node definitions
 */
export function curingNodes(path, mois, cfgopt='input') {
    const meta = [
        [path+L.mmod, 'curing', U.text, Dag.constant, []],
        [path+L.mver, '1', U.text, Dag.constant, []],
        [path+L.mcfg+'input', cfgopt, U.text, Dag.constant, []],
    ]
    const input = [
        [path+L.cured, 0, U.fraction, Dag.input, []],
    ]
    const estimated = [
        [path+L.cured, 0, U.fraction, Eq.curedHerbFraction, [mois+L.mherb]],
    ]
    const nodes = (cfgopt === 'input') ? input : estimated
    return [...meta, ...nodes].sort()
}
