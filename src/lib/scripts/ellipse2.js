import { AllModules, Util } from "../core.js"
import * as Config from '../core.js'
console.log('Lists surface.ellipse nodes')

//------------------------------------------------------------------------------
// AllModules 'site' construction and configuration
//------------------------------------------------------------------------------

Config.surfaceFire.value = Config.surfaceFire.onefuel
const modules = new AllModules(Config, 'site')
const site = modules.root
// console.log(Util.moduleTreeStr(root))

//------------------------------------------------------------------------------
// Site input and output node destructuring
//------------------------------------------------------------------------------

const {canopy, ignition, map:mapMod, moisture, surface, terrain, weather} = site

// 'site.surface' SurfaceModule destructuring
const {ellipse, primary, secondary, weighted} = surface
const {axis, size, map, head, back, right, left, beta5, beta6, psi} = ellipse

// 'site.surface.primary' FireCellModule destructuring
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
dag.select(
    axis.lwr, size.length,
    head.ros, head.dir.fromUpslope, head.dir.fromNorth, head.fli, head.flame
)

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
dag.set(site.ignition.t, 10)

// Step 3 - Update all the selected DagNode values
dag.updateAll()
Util.logDagNodes(dag.activeInputs(), 'Active Input Nodes')
Util.logDagNodes(dag.selected(), 'Selected Nodes')
