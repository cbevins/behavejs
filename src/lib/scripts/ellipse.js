import { AllModules, Util } from "../core.js"
import * as Config from '../core.js'

//------------------------------------------------------------------------------
// AllModules 'site' construction and configuration
//------------------------------------------------------------------------------

Config.surfaceFire.value = Config.surfaceFire.onefuel
const modules = new AllModules(Config, 'site')
const site = modules.root
// console.log(Util.moduleTreeStr(root))

//------------------------------------------------------------------------------
// Site destructuring
//------------------------------------------------------------------------------

const {canopy, ignition, map, moisture, surface, terrain, weather} = site

// 'site.surface' SurfaceModule destructuring
const {ellipse, primary, secondary, weighted:wtd} = surface
const {axis, head, back, right, left, beta5, beta6, psi} = ellipse

// 'site.surface.primary' FireCellModule destructuring
const fire1 = primary.fire
const {fuelKey} = primary.model.catalog

// 'site.moisture' FuelMoistureModule destructuring
const {tl1, tl10, tl100} = moisture.dead
const {herb, stem} = moisture.live

// 'site.terrain' TerrainModule destructuring
const {aspect, elevation, geo, slope, upslope} = terrain
const steepness = slope.ratio

// 'site.weather' WeatherModule destructuring
const {air, ppt, wind} = weather
const windSpeed = wind.speed.at20ft
const windFrom = wind.dir.origin.fromNorth

//------------------------------------------------------------------------------
// DagNode selection, input, update, and results
//------------------------------------------------------------------------------

// Step 1 - select nodes of interest
const dag = modules.dag
for(let mod of [fire1, wtd, head]) {
    dag.select(mod.ros, mod.dir.fromUpslope, mod.dir.fromNorth, mod.fli, mod.flame)
}
for(let mod of [fire1, wtd, axis]) dag.select(mod.lwr)
for(let mod of [fire1, wtd, ellipse]) dag.select(mod.midflame)

// Step 2 - display (optional) and set input DagNode values
dag.set(fuelKey, '10')
dag.set(tl1, 0.05)
dag.set(tl10, 0.07)
dag.set(tl100, 0.09)
dag.set(herb, 0.5)
dag.set(stem, 1.5)
dag.set(steepness, 0.25)
dag.set(aspect, 180)
dag.set(windFrom, 270)
dag.set(primary.fire.midflame, 880)
dag.set(air.temp, 95)

// Step 3 - Update all the selected DagNode values
dag.updateAll()
Util.logDagNodes(dag.activeInputs(), 'Active Input Nodes')
Util.logDagNodes(dag.selected(), 'Selected Nodes')

// Util.compare(rxi1, 5794.6954002291168)
// Util.compare(rxi2, 12976.692888496578)
// Util.compare(ros1, 18.551680325448835)
// Util.compare(ros2, 48.47042599399056)
// Util.compare(headUpslope1, 87.573367385837855)
// Util.compare(headUpslope2, 87.613728665173383)
// Util.compare(flame1, 6.9996889013229229)
// Util.compare(flame2, 16.35631663)
// Util.compare(lwr1, 3.5015680219321221)
// Util.compare(lwr2, 3.501581941)
// Util.compare(scorch1, 39.580182)
// Util.compare(scorch2, 215.682771)
