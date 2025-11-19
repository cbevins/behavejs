import { AllModules, Util, StandardFuelModels } from "../core.js"
import * as Config from '../core.js'
console.log('Lists fuel model variables at 0 100% cured')

//------------------------------------------------------------------------------
// AllModules 'site' construction and configuration
//------------------------------------------------------------------------------

Config.surfaceFire.value = Config.surfaceFire.onefuel
Config.fuelCuring.value = Config.fuelCuring.input

const modules = new AllModules(Config, 'site')
const site = modules.root
// console.log(Util.moduleTreeStr(root))

//------------------------------------------------------------------------------
// Site destructuring
//------------------------------------------------------------------------------

const {canopy, ignition, map, moisture, surface, terrain, weather} = site

// 'site.surface' SurfaceModule destructuring
const {primary} = surface
const {fire, fuel, model} = primary 
const {cured, fuelKey} = model.catalog
const {area, bulk, depth, qig, beta, bopt, brat, load, rxi,
    rxve, rxvm, rxvo, savr, sink, source, fuelWsrf, xi} = fuel
const deadHerbLoad = fuel.dead.element4.load

// 'site.moisture' FuelMoistureModule destructuring
const {tl1, tl10, tl100} = moisture.dead
const {herb, stem} = moisture.live

// console.log(Util.moduleTreeStr(model.catalog))

//------------------------------------------------------------------------------
// DagNode selection, input, update, and results
//------------------------------------------------------------------------------

const dag = modules.dag
dag.select(beta, bulk, depth, savr, deadHerbLoad)

// Util.logDagNodes(dag.activeInputs(), 'Active Input Nodes')
// Util.logDagNodes(dag.selected(), 'Selected Nodes')
// process.exit()
const fuels = [
      '1',   '2',   '3',   '4',   '5',   '6',   '7',   '8',   '9', '10', '11', '12', '13',
    'gr1', 'gr2', 'gr3', 'gr4', 'gr5', 'gr6', 'gr7', 'gr8', 'gr9',
    'gs1', 'gs2', 'gs3', 'gs4',
    'sh1', 'sh2', 'sh3', 'sh4', 'sh5', 'sh6', 'sh7', 'sh8', 'sh9',
    'tu1', 'tu2', 'tu3', 'tu4', 'tu5',
    'tl1', 'tl2', 'tl3', 'tl4', 'tl5', 'tl6', 'tl7', 'tl8', 'tl9',
    'sb1', 'sb2', 'sb3', 'sb4']
const std = []
for(let rec of StandardFuelModels) std.push(rec[1])
// console.log(std)
// process.exit()
// for(let fm of fuels) {
for(let fm of fuels) {
    dag.set(fuelKey, fm)
    // console.log(`----------------------\nFuel model set to '${fm}'\n----------------------`)
    dag.updateAll()
    // Util.logDagNodes(dag.activeNodes(), 'Active Nodes')
    console.log((fuelKey.value).padEnd(4), savr.value.toFixed(2),
        beta.value.toFixed(8),
        bulk.value.toFixed(8),
        deadHerbLoad.value.toFixed(8))
}
