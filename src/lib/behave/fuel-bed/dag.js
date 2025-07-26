import {Dag} from '../../dag/Dag.js'
import {DagNode} from '../../dag/DagNode.js'
import {showNodes} from '../../dag/showNodes.js'
import {nodeDefs} from './nodeDefs.js'

console.log(new Date())
const dag = new Dag('Fire Head RoS')
for(let nodeDef of nodeDefs) {
    const [key, value, units, updater, suppliers] = nodeDef
    dag.add(new DagNode(key, value, units).depends(updater, suppliers))
}
dag.init()
dag.addOutputs(['fuel/bed/no-wind no-slope/spread rate', 'fuel/bed/heat sink'])
showNodes(dag)
