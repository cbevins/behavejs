import { BehaveModule } from "./BehaveDag.js"
import { Util } from '../index.js'

// Step 1 - create the Behave Dag
const behave = new BehaveModule()
const dag = behave.dag

console.log(new Date())

// Step 1 - set the configuration options

// Step 2 - get the BehaveModule wqith default configuration
const behave = new BehaveModule()
// Util.logNodeDefs(behave.nodes)

// Step 3 - construct the directed acyclical graph with the configuration
const dag = new Dag(behave.nodes)

// Step 4 - select nodes of interest
const select = [

    P.surf1+P.fire+L.firePhiE,
    P.surf1+P.fire+L.fireWeff,
    P.surf1+P.fire+L.fireHeadRos,
    P.surf1+P.fire+L.fireHeadDirUp, // 'primary/surface/fire/heading/direction/from upslope',
    P.surf1+P.fire+L.fireLwr,
    P.surf1+P.fire+L.fireHeadFli,
    P.surf1+P.fire+L.fireHeadFlame,
]
dag.select(select)
// Util.logDagNodes(dag.selected(), 'Selected Nodes')

// Step 5 - determine/confirm active configurations (informational)
Util.listActiveConfigs(dag)

// RECONFIGURE HERE?

// Step 6 - determine/confirm active inputs (informational)
const inputs = dag.activeInputs()

// Step 7 - Set input values
dag.set(P.model1+P.stdKey, '10')
dag.set(P.weather+P.moisDead1, 0.05)
dag.set(P.weather+P.moisDead10, 0.07)
dag.set(P.weather+P.moisDead100, 0.09)
dag.set(P.weather+P.moisLiveHerb, 0.5)
dag.set(P.weather+P.moisLiveStem, 1.5)
dag.set(P.terrain+P.slopeRatio, 0.25)
dag.set(P.surf1+P.midflame, 10*88)
dag.set(P.weather+P.wdirHeadFromUp, 90)
Util.logDagNodes(dag.activeInputs(), 'Active Input Values')

// Step 8 - Get output values
dag.updateAll() // or call get(nodeKey) on a selected node
Util.logDagNodes(dag.selected(), 'Selected Node Values')
// Util.logDagNodes(dag.nodes(), 'All Nodes')
