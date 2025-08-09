import { Calc, Dag, K } from '../index.js'
import { surfaceElementDerivedNodes } from './surfaceElementDerivedNodes.js'

export function surfaceElementNodesNone(bedId) {
    const bed = [
        [bedId+K.depth, 1, K._depth, Dag.const, []],
    ]
    
    for(let life of ['dead', 'live']) {
        bed.push([bedId+life+'/'+K.mext, 1, K._mois, Dag.constant, []])
        for(let n of ['1','2','3','4','5']) {
            const p = bedId + `${life}/element/${n}/`
            const el = [
                [p+K.type, 'unused', K._type, Dag.constant, []],
                [p+K.life, life, K._life, Dag.constant, []],
                [p+K.load, 0, K._load, Dag.assign, Dag.constant, []],
                [p+K.savr, 0, K._load, Dag.assign, Dag.constant, []],
                [p+K.heat, 8000, K._heat, Dag.assign, Dag.constant, []],
                [p+K.mois, 1, K._mois, Dag.assign, Dag.constant, []],
                [p+K.dens, 32, K._dens, Dag.constant, []],
                [p+K.seff, 0.01, K._seff, Dag.constant, []],
                [p+K.stot, 0.0555, K._stot, Dag.constant, []],
            ]
            bed.push(...(surfaceElementDerivedNodes(bedId, p, life)))
        }
    }
    return bed
}
