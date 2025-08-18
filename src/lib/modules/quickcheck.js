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
const dag = new Dag(nodeDefsMap)

const selected= [P.fire1+L.rosmax]
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

const t0 = new Date()
// Note that each input can have multiple values
const fuels = ['1', '2', '3', '4', '5', '6', '7', '8','9', '10', '11', '12', '13',
    '101', '102', '103', '104', '105', '106', '107', '108', '109',
    '121', '122', '123', '124',
    '141', '142', '143', '144', '145', '146', '147', '148', '149',
    '161', '162', '163', '164', '165',
    '181', '182', '183', '184', '185', '186', '187', '188', '189',
    '201', '202', '203', '204']
const mdead = [0.02, 0.04, 0.06, 0.08, 0.10, 0.12, 0.14, 0.16, 0.18, 0.2]
const mlive =  [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75]
const wind =  [0, 2*88, 4*88, 6*88, 8*88, 10*88, 12*88, 14*88, 16*88, 18*88]
const slope = [0, 0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2, 2.25]
for(let fuel of fuels) {
    dag.set(P.fuel1+L.fmalias, fuel)
    for(let ml of mlive) {
        dag.set(P.moisture+L.mherb, ml)
        for (let md of mdead) {
            dag.set(P.moisture+L.m1, md)
            for(let w of wind) {
                dag.set(P.windmid1+L.wmid, w)
                for (let s of slope) {
                    dag.set(P.slope+L.srat, s)
                    let rosmax = dag.get(P.fire1+L.rosmax)
                }
            }
        }
    }
}
const t1 = new Date()
const runs = fuels.length * mdead.length * mlive.length * wind.length * slope.length
console.log(`${runs} runs for upslope wind ros required ${t1-t0} msec`)