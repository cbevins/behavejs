import { Util } from './index.js'
import { surfaceNodes } from './index.js'

function showModule(nodes, cols=4) {
    const map = Util.nodesToMap(nodes)
    console.log(Util.listNodeMap(map, cols))
}

console.log(new Date())

// showModule(bed)
const nodes = surfaceNodes()
const map = Util.nodesToMap(nodes)
Util.checkNodeKeys(map)
console.log(Util.listNodeMap(map, 3))