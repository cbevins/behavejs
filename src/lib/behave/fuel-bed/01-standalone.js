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
    `${prefix}/fuel/dead/element 1/surface area to volume ratio`
])
// showNodes(dag)
showElement(prefix, 'dead', 1)

function showElement(prefix, life, n) {
    const el   = prefix+'/fuel/'+life+'/element '+n+'/'
    const dens = dag.nodeRef(el+'fiber density')
    const ehn  = dag.nodeRef(el+'effective heating number')
    const heat = dag.nodeRef(el+'heat of combustion')
    const lcat = dag.nodeRef(el+'life')
    const load = dag.nodeRef(el+'ovendry load')
    const mois = dag.nodeRef(el+'moisture content')
    const sa   = dag.nodeRef(el+'surface area')
    const savr = dag.nodeRef(el+'surface area to volume ratio')
    const seff = dag.nodeRef(el+'effective mineral content')
    const stot = dag.nodeRef(el+'total mineral content')

    dag.set(dens, 32)
    dag.set(heat, 8000)
    dag.set(load, 0.32)
    dag.set(mois, 0.10)
    dag.set(savr, 2000)
    dag.set(seff, 0.01)
    dag.set(stot, 0.0555)

console.log(el)
console.log('  life =', dag.get(lcat))
console.log('  load =', dag.get(load))
console.log('  savr =', dag.get(savr))
console.log('  heat =', dag.get(heat))
console.log('  mois =', dag.get(mois))

console.log('  sa   =', dag.get(sa))
console.log('  sawf =', dag.get(el+'surface area weighting factor'))
console.log('  vol  =', dag.get(el+'volume'))
console.log('  ehn  =', dag.get(ehn))
}