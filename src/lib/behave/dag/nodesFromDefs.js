// Returns an array of DagNode instances given an array of definitions
import { DagNode } from './DagNode.js'

export function nodesFromDefs(defs) {
    const nodes = []
    for(let t of defs) {
        const def = {key: t[0], value: t[1], units: t[2], updater: t[3], suppliers: t[4]}
        nodes.push(new DagNode(def.key, def.value, def.units)
            .depends(def.updater, def.suppliers))
    }
    return nodes
}
