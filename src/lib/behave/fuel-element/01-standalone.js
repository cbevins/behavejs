import { Dag, DagNode, nodesFromDefs, showNodes } from '../index.js'
import { fuelElementNodeDefs } from '../fuel-element/nodeDefs.js'

console.log(new Date())
const dag = new Dag('Fire Head RoS')
const prefix = 'surface/primary'

// Gather all the DagNode definitions
const defs = fuelElementNodeDefs(prefix, 'dead', 1)
const nodes = nodesFromDefs(defs)
dag.add(nodes)
dag.init()
dag.addOutputs([
    `${prefix}/fuel/bed/no-wind no-slope/spread rate`,
    `${prefix}/fuel/bed/heat sink`])
showNodes(dag)
