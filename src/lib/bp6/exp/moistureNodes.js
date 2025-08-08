/**
 * Returns standard fuel model linked to a fuel catalog
 * @param {string}moisId All the nodes are prefaces with this id
*/
import { Dag, K, Util} from '../index.js'
export function moistureNodes(moislId) {
    const id = moislId
    return [
        [id+'dead/1-h/'+K.mois, 0, K._mois, Dag.input, []],
        [id+'dead/10-h/'+K.mois, 0, K._mois, Dag.input, []],
        [id+'dead/100-h/'+K.mois, 0, K._mois, Dag.input, []],
        [id+'live/herb/'+K.mois, 0, K._mois, Dag.input, []],
        [id+'live/stem/'+K.mois, 0, K._mois, Dag.input, []],
    ]
}
