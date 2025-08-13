import { Dag, Util } from './index.js'
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


// const selected= [
//     'surface/shared/Canopy/crown length',
//     'surface/shared/Canopy/base height']
// dag.select(selected)

// for(let node of dag.activeInputs()) {
//     console.log('input:', node.key)
// }
// dag.set('surface/shared/Canopy/canopy height', 8)
// dag.set('surface/shared/Canopy/crown ratio', 0.75)
// console.log('Canopy crown length', dag.get('surface/shared/Canopy/crown length'))
// console.log(dag.tracker)
// console.log('Canopy base height', dag.get('surface/shared/Canopy/base height'))
// console.log(dag.tracker)

