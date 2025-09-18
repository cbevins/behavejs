import { BehaveModule } from "./BehaveModule.js"

// Step 1 - create the Behave Dag
const behave = new BehaveModule()
const dag = behave.dag

// Step 2 - select outputs
const bulk = dag.nodeRef('primary/bed/bulk density')
dag.select(bulk)
const activeConfigs = dag.activeConfigs()
// Step 3 - set inputs
const key = dag.nodeRef('primary/model/standard/key')
const cured = dag.nodeRef('weather/curing/fraction/observed')
dag.set(key, '10')
dag.set(cured, 0.5)
// Step 4 - get updated values of selected nodes
dag.get(bulk)