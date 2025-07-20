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

function log() {
    console.log('Nodes in Kahn Sort Order:')
    for (let i=0; i<dag.topoLevels.length; i++) {
        for(let node of dag.topoLevels[i]) {
            let method = 'input'
            if (node.updater) {
                method = (node.updater===dag.constant ? "const" : 'value')
            }
            console.log(i, node.key, method, node.value)
        }
    }
}

// Step 4 - Make a run
dag.update()
log()

// Change input and run again
dag.poke(e, 4)
dag.update()
log()
