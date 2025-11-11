import { AllModules } from "./AllModules.js"
import { Util } from '../core.js'
import * as Config from './Configs.js'

//------------------------------------------------------------------------------
// AllModules 'site' construction and configuration
//------------------------------------------------------------------------------

Config.surfaceFire.value = Config.surfaceFire.onefuel
const modules = new AllModules(Config, 'site')
const site = modules.root
console.log(Util.moduleTreeStr(site))

//------------------------------------------------------------------------------
// Site destructuring
//------------------------------------------------------------------------------

const {canopy, moisture, surface, terrain, weather} = site

// 'site.surface' SurfaceModule destructuring
const {primary} = surface

// 'site.surface.primary' FireCellModule destructuring
const {model, fuel, fire} = primary
const {catalog} = model
const {fuelKey, cured, depth} = catalog
const {dead, live, rxi, sink, source} = fuel
const {ros, fli, flame, lwr, hpua, scorch} = fire
const {fromUpslope, fromNorth} = fire.dir
const midflame = fire.midflame

// 'site.moisture' FuelMoistureModule destructuring
const {tl1, tl10, tl100} = moisture.dead
const {herb, stem} = moisture.live

//------------------------------------------------------------------------------
// DagNode selection, input, update, and results
//------------------------------------------------------------------------------

// Step 1 - select nodes of interest
const dag = modules.dag
dag.select(fuel.savr, fuel.beta, fuel.bopt, fuel.brat, fuel.bulk,
    fuel.dead.drxi, fuel.live.drxi,
    fire.slopeK, fire.windB, fire.windC, fire.windE, fire.taur
)

// Step 2 - display (optional) and set input DagNode values
dag.set(fuelKey, '10')
dag.set(tl1, 0.05)
dag.set(tl10, 0.07)
dag.set(tl100, 0.09)
dag.set(herb, 0.5)
dag.set(stem, 1.5)

// Step 3 - Update all the selected DagNode values
dag.updateAll()
Util.logDagNodes(dag.activeInputs(), 'Active Input Nodes')
Util.logDagNodes(dag.selected(), 'Selected Nodes')
