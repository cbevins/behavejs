import {Dag} from './Dag.js'
import {DagNode} from './DagNode.js'

// Some dummy update methods to reference
function calcR(R0, W, S) { return R0 * (1 + W + S) }
function calcR0(Ir) { return 0.0001 * Ir }
function calcIr(Bed, Heat, Mois) { return Bed * Heat *  (1-Mois)}
function calcBed(Key) { return Key==='A' ? 2 : 3 }

function showNodes(dag) {
    for(let node of dag.nodes) {
        let special = dag.isInputNode(node) ? 'INPUT' : ''
        special = dag.isConstantNode(node) ? 'CONSTANT' : special
        let str = [node.key.padEnd(4),
            (node.updater===dag.input ? 'INPUT' : '.....').padEnd(5),
            (node.updater===dag.constant ? 'CONST' : '.....').padEnd(5),
            (''+node.value).padStart(8),
            node.status.padEnd(8),
            special.padEnd(8),
            node.dirty,
            (''+node.suppliers.length).padStart(3),
            (''+node.consumers.length).padStart(3)
        ].join(' ')
        console.log(str)
    }
}

console.log(new Date())
const dag = new Dag('DagDfs')

const R = dag.add(new DagNode('R', 0).depends(calcR, ['R0', 'W', 'S']))
const W = dag.add(new DagNode('W', 0))
const S = dag.add(new DagNode('S', 0))
const R0 = dag.add(new DagNode('R0', 0).depends(calcR0, ['Ir']))
const Ir = dag.add(new DagNode('Ir', 0).depends(calcIr, ['Bed', 'Heat', 'Mois']))
const Heat = dag.add(new DagNode('Heat', 8000).depends(Dag.constant))
const Mois = dag.add(new DagNode('Mois', 0))
const Bed = dag.add(new DagNode('Bed', 0).depends(calcBed, ['Key']))
const Key = dag.add(new DagNode('Key', 'A').depends(Dag.assign, ['KeyB']))
const KeyB = dag.add(new DagNode('KeyB', 'A').depends(Dag.input))

dag.init()

dag.addOutputs([R, R0])
dag.set(Mois, 0.2)
dag.get(R)
showNodes(dag)
// console.log(R)