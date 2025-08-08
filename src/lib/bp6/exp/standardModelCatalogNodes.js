/**
 * Returns standard fuel model linked to a fuel catalog
 * @param {string} fuelId All the nodes are prefaces with this id
*/
import {Calc, Dag, StandardFuelModels as Eq, K, Util} from '../index.js'

export function standardModelCatalogNodes(fuelId) {
    const id = fuelId
    const key = fuelId + K.fmkey
    const nodes = [
        [key, '', K._fmkey, Dag.input, []],
        [id+K.fmcured, 0, K._fraction, Dag.input, []],
        [id+K.fmnumb, 0, K._fmnumb, Eq.code, [key]],
        [id+K.fmcode, 'none', K._fmcode, Eq.number, [key]],
        [id+K.fmlabel, '', K._fmlabel, Eq.label, [key]],
        [id+K.depth, 1, K._depth, Eq.depth, [key]],
        [id+K.mext, 0.25, K._mois, Eq.mext, [key]],
        [id+'dead/'+K.heat, 8000, K._heat, Eq.heatDead, [key]],
        [id+'dead/1-h/'+K.savr, 1, K._savr, Eq.savr1, [key]],
        [id+'dead/1-h/'+K.load, 0, K._load, Eq.load1, [key]],
        [id+'dead/10-h/'+K.load, 0, K._load, Eq.load10, [key]],
        [id+'dead/100-h/'+K.load, 0, K._load, Eq.load100, [key]],
        [id+'live/total herb/'+K.load, 0, K._load, Eq.loadHerb, [key]],
        [id+'live/stem/'+K.load, 0, K._load, Eq.loadStem, [key]],
        [id+'live/herb/'+K.savr, 1, K._savr, Eq.savrHerb, [key]],
        [id+'live/stem/'+K.savr, 1, K._savr, Eq.savrStem, [key]],
        [id+'live/'+K.heat, 8000, K._heat, Eq.heatLive, [key]],
    ]
    // Add the derived nodes
    nodes.push(
        [id+'dead/cured herb/'+K.load, 0, K._load, Eq.loadCured, [key, id+K.fmcured]],
        [id+'live/herb/'+K.load, 0, K._load, Eq.loadUncured, [key, id+K.fmcured]]
    )
    return nodes
}
/**
 * Returns standard fuel model linked to client input
 * @param {string} id
 */
function standardModelInputNodes(id) {
    const nodes = standardModelCatalogNodes(id, cfg)
    for(let i=0; i<nodes.length; i++) {
        nodes[i][3] = Dag.input
        nodes[i][4] = []
    }
    // Add the derived nodes
    nodes.push(
        [id+'dead/cured herb'+K.load, 0, K._load, Eq.loadCured, [key, id+K.fmcured]],
        [id+'live/herb'+K.load, 0, K._load, Eq.loadUncured, [key, id+K.fmcured]]
    )
    return nodes
}
