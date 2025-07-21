import {Dag} from './Dag.js'
import {DagNode} from './DagNode.js'

// Some simple update methods to reference
function add(a,b) { return a+b }
function div(a,b) { return a/b }
function mul(a,b) { return a*b }
function sub(a,b) { return a-b }
function sqr(a) { return a*a }
function dbl(a) { return 2*a }

console.log(new Date())

function log(msg) {
    const act = dag.activeNodes()
    const clnt = dag.clientNodes()
    const kon = dag.constantNodes()
    const sel = dag.selectedNodes()
    let str =  `\n${msg}:\nLvl NodeKey  Type   Status   Dirty Value\n`
    for (let i=0; i<dag.topoLevels.length; i++) {
        for(let node of dag.topoLevels[i]) {
            let method = 'update'
            if (node.updater===dag.constant) method = "const "
            if (node.updater===dag.client) method = "client"
            str += `${(''+i).padStart(3)} ${node.key.padEnd(8)} ${method} ${node.status.padEnd(8)} ${node.dirty} ${node.value}\n`
        }
    }
    str += `Nodes: ${sel.length} SELECTED, ${clnt.length} client, ${act.length} ACTIVE, ${kon.length} constant`
    console.log(str)
}

// Step 1 - Create the Dag and add the DagNodes
const dag = new Dag()
const a = dag.add('A', 0)
const b = dag.add('B', 0)
const c = dag.add('C', 0)
const d = dag.add('D', 0)
const e = dag.add('E', 3)
const f = dag.add('F', 2)

// Step 2 - set each DagNode's update method and input dependencies
a.depends(mul, [e, f])
b.depends(add, [d, e])
c.depends(sqr, [f])
d.depends(dbl, [c])
e.depends()
f.depends(dag.constant)

// Add a second, unconnected sub-net
const x = dag.add('X', 2)
const y = dag.add('Y', 0)
const z = dag.add('Z', 0)
x.depends(dag.constant)
y.depends()
z.depends(mul, [x, y])

// Step 3 - have the Dag determine DagNode.outputs and perform topological sorting
// and make initial update()
dag.init()
log('1: After Dag.init() all nodes should be inactive and clean')

// Require B as an output
dag.select(b)
log('2: After select(b), only B is selected & dirty and rest still inactive & clean')

// Change client input
dag.poke(e, 4)
log('3: After poke(E, 4):, E, A, and B should be dirty')

// Update values
dag.update()
log('4: After update: updater() called for C=>4, D=>8, and E=>12')

// Update values
dag.update()
log('5: After immediate update: no updater() calls are necessary')
