import { Dag, DagNode, nodesFromDefs, showNodes } from '../index.js'
import { fuelBedNodeDefs } from './nodeDefs.js'
import { fuelLifeNodeDefs } from '../fuel-life/nodeDefs.js'
import { fuelElementNodeDefs } from '../fuel-element/nodeDefs.js'

console.log(new Date())
const dag = new Dag('Fire Head RoS')
const prefix = 'surface/primary'

// Gather all the DagNode definitions
const defs = fuelBedNodeDefs(prefix)
for(let life of ['dead','live']) {
    defs.push(...fuelLifeNodeDefs(prefix, life))
    for(let el of [1,2,3,4,5]) {
        defs.push(...fuelElementNodeDefs(prefix, life, el))
    }
}
// Create and add the DagNodes
const nodes = nodesFromDefs(defs)
dag.add(nodes)
dag.init()
dag.addOutputs([
    `${prefix}/fuel/bed/no-wind no-slope/spread rate`,
    `${prefix}/fuel/bed/heat sink`])
showNodes(dag)
