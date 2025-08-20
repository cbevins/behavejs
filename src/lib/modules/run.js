import { Dag, L, P, Util } from './index.js'
import { surfaceNodes } from './index.js'

function showModule(nodes, cols=4) {
    const map = Util.nodesToMap(nodes)
    console.log(Util.listNodeMap(map, cols))
}

console.log(new Date())
const nodeDefs = surfaceNodes()
const nodeDefsMap = Util.nodesToMap(nodeDefs)
// showModule(nodeDefs,4)
const dag = new Dag(nodeDefsMap)

const selected= [
    P.bed1+L.savr,
    P.bed1+L.wndk,
    P.bed1+L.wndb,
    P.bed1+L.wnde,
    P.bed1+L.wndi,
    P.bed1+L.phiw,
    P.bed1+L.phis,
    P.bed1+L.phie,
    P.bed1+L.weff,
    P.fire1+L.weff1,
    P.fire1+L.rosmax,
    // P.fire1+L.roseff,
    // P.fire1+L.ros,
]
dag.select(selected)

// Display active input nodes and set their values
for(let node of dag.activeInputs()) {
    console.log('input:', node.key)
}
const alias = '10'
dag.set(P.fuel1+L.fmalias, alias)
dag.set(P.moisture+L.m1, 0.05)
dag.set(P.moisture+L.m10, 0.07)
dag.set(P.moisture+L.m100, 0.09)
dag.set(P.moisture+L.mherb, 0.5)
dag.set(P.moisture+L.mstem, 1.5)
dag.set(P.slope+L.srat, 0.25)
dag.set(P.windmid1+L.wmid, 10*88)


for(let key of selected) {
    const node = dag.nodeRef(key)
    console.log(node.key, dag.get(node))
}
