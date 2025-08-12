import { Dag, Util } from './index.js'
import { surfaceNodes } from './index.js'

function showModule(nodes, cols=4) {
    const map = Util.nodesToMap(nodes)
    console.log(Util.listNodeMap(map, cols))
}

console.log(new Date())
const nodeDefs = surfaceNodes()
const nodeDefsMap = Util.nodesToMap(nodeDefs)
showModule(nodeDefs,3)
const dag = new Dag(nodeDefsMap)
const selected= ['surface/shared/Canopy/crown ratio']
dag.select(selected)