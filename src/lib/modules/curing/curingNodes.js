import { Dag, K, U, Util, SurfaceBedEquations as Eq } from '../index.js'

export const CuringConfig = {
    source: {
        prompt: 'Cured herb fuel fraction is',
        options: [
            {value: 'input', desc: 'directly entered as input'},
            {value: 'estimated', desc: 'estimated from live herb moisture content'}],
        value: 'input'
    },
}

export function curingNodes(modId, moisId, cfg) {
    const cfgSource = cfg.source.value

    const meta = [
        [modId+K.mmod, 'curing', U.text, Dag.constant, []],
        [modId+K.mver, '1', U.text, Dag.constant, []],
        [modId+K.mcfg+'source', cfgSource, U.text, Dag.constant, []],
    ]
    const input = [
        [modId+K.cured, 0, U.fraction, Eq.curedHerbFraction, [moisId+K.mherb]],
    ]
    const estimated = [
        [modId+K.cured, 0, U.fraction, Dag.input, []],
    ]
    const curing = (cfgSource === 'input') ? input : estimated
    return [...meta, ...curing].sort()
}
