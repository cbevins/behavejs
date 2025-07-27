import {Dag} from '../../dag/Dag.js'
import {showNodes} from '../../dag/showNodes.js'
import {createDagNodes} from './nodeDefs.js'

console.log(new Date())
const dag = new Dag('Fire Head RoS')
const prefix = 'surface/primary/'
dag.add(createDagNodes(prefix))
dag.init()
dag.addOutputs([
    `${prefix}fuel/bed/no-wind no-slope/spread rate`,
    `${prefix}fuel/bed/heat sink`])
showNodes(dag)
