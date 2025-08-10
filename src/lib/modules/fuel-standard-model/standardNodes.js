/**
 * Returns standard fuel model linked to a fuel catalog
 * @param {string} fuelId All the nodes are prefaced with this id
*/
import { StandardFuelModels as Eq} from './StandardFuelModels.js'
import { Calc, Dag, K, U, Util } from '../index.js'

export const StandardFuelConfig = {
    source: {
        prompt: 'Standard fuel model parameters are',
        options: [
            {value: 'catalog', desc: 'retrieved from a catalog using a key'},
            {value: 'input', desc: 'directly entered as input'},
        ],
        value: 'catalog',
    },
}

export function fuelStandardModelNodes(modId, cfg) {
    const key = modId + K.fmalias
    const cfgSource = cfg.source.value

    const meta = [
        [modId+K.mmod, 'standard fuel model', U.text, Dag.constant, []],
        [modId+K.mver, '1', U.text, Dag.constant, []],
        [modId+K.mcfg+'source', cfgSource, U.text, Dag.constant, []],
    ]
    const nodes = [
        [modId+K.fmalias,    '', U.fmkey, Dag.input, []],
        [modId+K.fmkey,      '', U.fmkey, Eq.key, []],
        [modId+K.fmnumb,      0, U.fmnumb, Eq.number, []],
        [modId+K.fmcode, 'none', U.fmcode, Eq.code, [key]],
        [modId+K.fmlabel,    '', U.fmlabel, Eq.label, [key]],
        [modId+K.fmdepth,     1, U.depth, Eq.depth, []],
        [modId+K.fmmext,   0.25, U.mois, Eq.mext, [key]],
        [modId+K.heatdead, 8000, U.heat, Eq.heatDead, [key]],
        [modId+K.heatlive, 8000, U.heat, Eq.heatLive, [key]],
        [modId+K.fmload1,     0, U.load, Eq.load1, [key]],
        [modId+K.fmload10,    0, U.load, Eq.load10, [key]],
        [modId+K.fmload100,   0, U.load, Eq.load100, [key]],
        [modId+K.fmloadherb,  0, U.load, Eq.loadHerb, [key]],
        [modId+K.fmloadstem,  0, U.load, Eq.loadStem, [key]],
        [modId+K.fmsavr1,     1, U.savr, Eq.savr1, [key]],
        [modId+K.fmsavrherb,  1, U.savr, Eq.savrHerb, [key]],
        [modId+K.fmsavrstem,  1, U.savr, Eq.savrStem, [key]],
    ]
    if (cfgSource === 'input') {
        for(let i=0; i<nodes.length; i++) {
            node[i][3] = Dag.input
            node[i][4] = []
        }
    }
    return nodes
}

const nodes = fuelStandardModelNodes('standard/', StandardFuelConfig)
const map = Util.nodesToMap(nodes)
console.log(Util.listNodeMap(map))

