import { Dag, L, P, Util } from './index.js'
import { surfaceNodes } from './index.js'
import { FuelModelConfig } from './index.js'

function showModule(nodes, cols=4) {
    const map = Util.nodesToMap(nodes)
    console.log(Util.listNodeMap(map, cols))
}

console.log(new Date())
const nodeDefs = surfaceNodes(FuelModelConfig)
const nodeDefsMap = Util.nodesToMap(nodeDefs)
// showModule(nodeDefs,4)
const dag = new Dag(nodeDefsMap)

const selected= [
    P.bed1+L.savr,
    P.bed1+L.wndk,
    P.bed1+L.wndb,
    P.bed1+L.wnde,
    P.fuel1+L.fmdepth,
    P.fire1+L.rosmax,
]
dag.select(selected)

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

const depth = dag.get(P.fuel1+L.fmdepth)
console.log(`Fuel Model "${alias}" depth = ${depth}`)
const rosmax = dag.get(P.fire1+L.rosmax)

const savr = dag.get(P.bed1+L.savr)
console.log('Bed savr=', savr)
console.log( 'B =', 0.02526 * savr ** 0.54)
console.log('C=', 7.47 * Math.exp(-0.133 * savr ** 0.55))
console.log('E=', 0.715 * Math.exp(-3.59 + 0.0001*savr))
