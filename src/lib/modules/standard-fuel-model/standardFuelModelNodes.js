/**
 * Returns standard fuel model linked to a fuel catalog
 * @param {string} fuelId All the nodes are prefaced with this id
*/
import { Dag, L, U } from '../index.js'
import { StandardFuelModelCatalog as Eq } from '../index.js'

/**
 * @param {string} path Module pathway prefixed to all the returned nodes' keys
 * @param {object} cfg Object with cfg.model.value (see FuelModelConfig)
 * @returns Array of surface fuel bed module node definitions
 */

export function standardFuelModelNodes(path, cfg) {
    const key = path + L.fmalias
    const cfgModel = cfg.model.value

    const meta = [
        [path+L.mmod, 'standard fuel model', U.text, Dag.constant, []],
        [path+L.mver, '1', U.text, Dag.constant, []],
        [path+L.mcfg+'model', cfgModel, U.text, Dag.constant, []],
    ]
    const nodes = [
        [path+L.fmalias,      '', U.fmkey, Dag.input, []],
        [path+L.fmkey,        '', U.fmkey, Eq.key, [key]],
        [path+L.fmnumb,        0, U.fmnumb, Eq.number, [key]],
        [path+L.fmcode,   'none', U.fmcode, Eq.code, [key]],
        [path+L.fmlabel,      '', U.fmlabel, Eq.label, [key]],
        [path+L.fmdepth,       1, U.depth, Eq.depth, [key]],
        [path+L.fmmext,     0.25, U.mois, Eq.mext, [key]],
        [path+L.fmheatdead, 8000, U.heat, Eq.heatDead, [key]],
        [path+L.fmheatlive, 8000, U.heat, Eq.heatLive, [key]],
        [path+L.fmload1,       0, U.load, Eq.load1, [key]],
        [path+L.fmload10,      0, U.load, Eq.load10, [key]],
        [path+L.fmload100,     0, U.load, Eq.load100, [key]],
        [path+L.fmloadherb,    0, U.load, Eq.loadHerb, [key]],
        [path+L.fmloadstem,    0, U.load, Eq.loadStem, [key]],
        [path+L.fmsavr1,       1, U.savr, Eq.savr1, [key]],
        [path+L.fmsavrherb,    1, U.savr, Eq.savrHerb, [key]],
        [path+L.fmsavrstem,    1, U.savr, Eq.savrStem, [key]],
    ]
    if (cfgModel === 'standard input') {
        for(let i=0; i<nodes.length; i++) {
            node[i][3] = Dag.input
            node[i][4] = []
        }
    }
    return [...meta, ...nodes].sort()
}
