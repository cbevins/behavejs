import { Dag, DagNode, nodesFromDefs, showNodes, Expect } from '../index.js'
import { fuelModelNodeDefs } from './nodeDefs.js'


const tu1 =[161, "tu1", "Light load, dry climate timber-grass-shrub", 0.6, 0.2,
    0.009182736455463728, 0.04132231404958678, 0.06887052341597796, 0.009182736455463728, 0.04132231404958678,
    2000, 1800, 1600, 8000, 8000]

console.log(new Date())
const dag = new Dag('Standard Fuel Model')
const prefix = 'surface/primary'

// Gather all the DagNode definitions
const defs = fuelModelNodeDefs(prefix)//, ...linkFuelBed2Model(prefix)]
const nodes = nodesFromDefs(defs)
dag.add(nodes)
dag.init()
dag.addOutputs([
    prefix+'/fuel/dead/element 1/ovendry load',
])
showNodes(dag)
dag.set(prefix+'/fuel model/key', 'tu1')

const expect = new Expect('Standard Fuel Models Linked to Surface Fire')
.equal('tu1 1-h load', tu1[5], dag.get(prefix+'/fuel/dead/element 1/ovendry load'))
.equal('tu1 1-h savr', tu1[10], dag.get(prefix+'/fuel/dead/element 1/surface area to volume ratio'))
.equal('tu1 1-h heat', tu1[13], dag.get(prefix+'/fuel/dead/element 1/heat of combustion'))

.equal('tu1 10-h load', tu1[6], dag.get(prefix+'/fuel/dead/element 2/ovendry load'))
.equal('tu1 10-h heat', tu1[13], dag.get(prefix+'/fuel/dead/element 2/heat of combustion'))
// expect.equal('tu1 1-h savr', tu1[10], dag.get(prefix+'/fuel/dead/element 1/surface area to volume ratio'))

.equal('tu1 100-h load', tu1[7], dag.get(prefix+'/fuel/dead/element 3/ovendry load'))
.equal('tu1 100-h heat', tu1[13], dag.get(prefix+'/fuel/dead/element 3/heat of combustion'))

.equal('tu1 cured heat', tu1[13], dag.get(prefix+'/fuel/dead/element 3/heat of combustion'))

.equal('tu1 total herb load', tu1[8], dag.get(prefix+'/fuel/live/element 1/ovendry load'))
.equal('tu1 herb savr', tu1[11], dag.get(prefix+'/fuel/live/element 1/surface area to volume ratio'))
.equal('tu1 herb heat', tu1[14], dag.get(prefix+'/fuel/live/element 2/heat of combustion'))

.equal('tu1 stem load', tu1[9], dag.get(prefix+'/fuel/live/element 2/ovendry load'))
.equal('tu1 stem savr', tu1[12], dag.get(prefix+'/fuel/live/element 2/surface area to volume ratio'))
.equal('tu1 stem heat', tu1[14], dag.get(prefix+'/fuel/live/element 2/heat of combustion'))
.summary()