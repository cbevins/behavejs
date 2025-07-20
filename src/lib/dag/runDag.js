import {Dag} from './Dag.js'
import {DagNode} from './DagNode.js'

// Some simple update methods to reference
function add(a,b) { return a+b }
function div(a,b) { return a/b }
function mul(a,b) { return a*b }
function sub(a,b) { return a-b }
function sqr(a) { return a*a }
function dbl(a) { return 2*a }

// Step 1 - Create the Dag and add the DagNodes
const dag = new Dag()
const a = dag.add(new DagNode('A', 0))
const b = dag.add(new DagNode('B', 0))
const c = dag.add(new DagNode('C', 0))
const d = dag.add(new DagNode('D', 0))
const e = dag.add(new DagNode('E', 3))
const f = dag.add(new DagNode('F', 2))

// Step 2 - set each DagNode's update method and input dependencies
a.depends(mul, [e, f])
b.depends(add, [d, e])
c.depends(sqr, [f])
d.depends(dbl, [c])
e.depends()
f.depends(dag.constant)

// Step 3 - have the Dag determine DagNode.outputs and perform topological sorting
dag.init()

// The DFS sort result should be: F E C D B A
// console.log('\nDFS Sort Order:')
// for(let node of dag.dfsOrder) console.log(node.key, node.value)

a.update()
c.update()
d.update()
b.update()

// Should be [4,5], [0, 2], [3], [1]
console.log('Kahn Sort Order:')
for (let i=0; i<dag.topoLevels.length; i++) {
    for(let node of dag.topoLevels[i])
        console.log(i, node.key, node.value)
}

