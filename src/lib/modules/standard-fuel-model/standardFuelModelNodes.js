/**
 * Returns standard fuel model linked to a fuel catalog
 * @param {string} fuelId All the nodes are prefaced with this id
*/
import { Dag, K, U } from '../index.js'
import { StandardFuelModelCatalog as Eq} from '../index.js'

/**
 * 
 * @param {*} modId 
 * @param {object} cfg Object with cfg.model.value as defined by FuelModelConfig
 * @returns 
 */
export function standardFuelModelNodes(modId, cfg) {
    const key = modId + K.fmalias
    const cfgModel = cfg.model.value

    const meta = [
        [modId+K.mmod, 'standard fuel model', U.text, Dag.constant, []],
        [modId+K.mver, '1', U.text, Dag.constant, []],
        [modId+K.mcfg+'model', cfgModel, U.text, Dag.constant, []],
    ]
    const nodes = [
        [modId+K.fmalias,      '', U.fmkey, Dag.input, []],
        [modId+K.fmkey,        '', U.fmkey, Eq.key, []],
        [modId+K.fmnumb,        0, U.fmnumb, Eq.number, []],
        [modId+K.fmcode,   'none', U.fmcode, Eq.code, [key]],
        [modId+K.fmlabel,      '', U.fmlabel, Eq.label, [key]],
        [modId+K.fmdepth,       1, U.depth, Eq.depth, []],
        [modId+K.fmmext,     0.25, U.mois, Eq.mext, [key]],
        [modId+K.fmheatdead, 8000, U.heat, Eq.heatDead, [key]],
        [modId+K.fmheatlive, 8000, U.heat, Eq.heatLive, [key]],
        [modId+K.fmload1,       0, U.load, Eq.load1, [key]],
        [modId+K.fmload10,      0, U.load, Eq.load10, [key]],
        [modId+K.fmload100,     0, U.load, Eq.load100, [key]],
        [modId+K.fmloadherb,    0, U.load, Eq.loadHerb, [key]],
        [modId+K.fmloadstem,    0, U.load, Eq.loadStem, [key]],
        [modId+K.fmsavr1,       1, U.savr, Eq.savr1, [key]],
        [modId+K.fmsavrherb,    1, U.savr, Eq.savrHerb, [key]],
        [modId+K.fmsavrstem,    1, U.savr, Eq.savrStem, [key]],
    ]
    if (cfgModel === 'standard input') {
        for(let i=0; i<nodes.length; i++) {
            node[i][3] = Dag.input
            node[i][4] = []
        }
    }
    return [...meta, ...nodes].sort()
}
