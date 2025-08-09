/**
 * Returns standard fuel model linked to a fuel catalog
 * @param {string} moisId All the nodes are prefaces with this id
*/
import { Dag, K, Util} from '../index.js'
export function moistureInputNodes(moisId, cfg) {
    const d1   = moisId + 'dead/1-h/' + K.mois
    const d10  = moisId + 'dead/10-h/' + K.mois
    const d100 = moisId + 'dead/100-h/' + K.mois
    const herb = moisId + 'live/herb/' + K.mois
    const stem = moisId + 'live/stem/' + K.mois
    const live = moisId + 'live/category/' + K.mois
    const dead = moisId + 'dead/category/' + K.mois

    const module = [
        [moisId+'module', 'moisture input', K._text, Dag.constant, []],
        [moisId+'version', '1', K._text, Dag.constant, []],
    ]
    let nodes = []
    if (cfg === '2') {
        nodes = [
            [dead, 0, K._mois, Dag.input, []],
            [live, 0, K._mois, Dag.input, []],

            [d1, 0, K._mois, Dag.assign, [dead]],
            [d10, 0, K._mois, Dag.assign, [dead]],
            [d100, 0, K._mois, Dag.assign, [dead]],
            [herb, 0, K._mois, Dag.assign, [live]],
            [stem, 0, K._mois, Dag.assign, [live]],
        ]
    }
    else if (cfg === '4') {
        nodes = [
            [d1, 0, K._mois, Dag.input, []],
            [d10, 0, K._mois, Dag.input, []],
            [d100, 0, K._mois, Dag.input, []],
            [live, 0, K._mois, Dag.input, []],
            [herb, 0, K._mois, Dag.assign, [live]],
            [stem, 0, K._mois, Dag.assign, [live]],
            [dead, 0, K._mois, Dag.constant, []],
        ]
    }
    else {  // if (cfg === '5') {
        nodes = [
            [d1, 0, K._mois, Dag.input, []],
            [d10, 0, K._mois, Dag.input, []],
            [d100, 0, K._mois, Dag.input, []],
            [herb, 0, K._mois, Dag.input, []],
            [stem, 0, K._mois, Dag.input, []],
            [dead, 0, K._mois, Dag.constant, []],
            [live, 0, K._mois, Dag.constant, []],
        ]
    }
    return [...module, ...nodes]
}
