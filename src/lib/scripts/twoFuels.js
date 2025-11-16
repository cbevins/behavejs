import { AllModules, Util } from "../core.js"
import * as Config from '../core.js'

//------------------------------------------------------------------------------
// AllModules 'site' construction and configuration
//------------------------------------------------------------------------------

Config.surfaceFire.value = Config.surfaceFire.arithmetic
const modules = new AllModules(Config, 'site')
const site = modules.root
// console.log(Util.moduleTreeStr(root))

//------------------------------------------------------------------------------
// Site destructuring
//------------------------------------------------------------------------------

const {canopy, moisture, surface, terrain, weather} = site

// 'site.surface' SurfaceModule destructuring
const {primary, secondary, weighted} = surface

// 'site.surface.primary' FireCellModule destructuring
const {model:model1, fuel:fuel1, fire:fire1} = primary
const {catalog:catalog1} = model1
const {fuelKey:fuelKey1, cured:cured1, depth:depth1} = catalog1
const {dead:dead1, live:live1, rxi:rxi1, sink:sink1, source:source1} = fuel1
const {ros:ros1, fli:fli1, flame:flame1, lwr:lwr1, hpua:hpua1, scorch:scorch1} = fire1
const {fromUpslope:headUpslope1, fromNorth:headNorth1} = fire1.dir
const midflame1 = fire1.midflame

// 'site.surface.secondary' FireCellModule destructuring
const {model:model2, fuel:fuel2, fire:fire2} = secondary
const {catalog:catalog2} = model2
const {fuelKey:fuelKey2, cured:cured2, depth:depth2} = catalog2
const {dead:dead2, live:live2, rxi:rxi2, sink:sink2, source:source2} = fuel2
const {ros:ros2, fli:fli2, flame:flame2, lwr:lwr2, hpua:hpua2, scorch:scorch2} = fire2
const {fromUpslope:headUpslope2, fromNorth:headNorth2} = fire2.dir
const midflame2 = fire2.midflame

// 'site.surface.weighted' WeightedFireModule destructuring
const {ros:ros3, rosArith:rosA, rosHarm:rosH, fli:fli3, flame:flame3, lwr:lwr3, hpua:hpua3} = weighted
const {fromUpslope:headUpslope3, fromNorth:headNorth3} = weighted.dir
const midflame3 = weighted.midflame

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
    ros1, headUpslope1, headNorth1, fli1, flame1, lwr1, hpua1, scorch1,
    ros2, headUpslope2, headNorth2, fli2, flame2, lwr2, hpua2, scorch2,
    ros3, headUpslope3, headNorth3, fli3, flame3, lwr3, hpua3, rosA, rosH)

// Step 2 - display (optional) and set input DagNode values
dag.set(weighted.cover1, 0.6)
dag.set(fuelKey1, '10')
dag.set(fuelKey2, '124')
dag.set(tl1, 0.05)
dag.set(tl10, 0.07)
dag.set(tl100, 0.09)
dag.set(herb, 0.5)
dag.set(stem, 1.5)
dag.set(steepness, 0.25)
dag.set(aspect, 180)
dag.set(windFrom, 270)
dag.set(midflame1, 880)
dag.set(midflame2, 880)
dag.set(air.temp, 95)

// Step 3 - Update all the selected DagNode values
dag.updateAll()
Util.logDagNodes(dag.activeInputs(), 'Active Input Nodes')
Util.logDagNodes(dag.selected(), 'Selected Nodes')

Util.compare(rxi1, 5794.6954002291168)
Util.compare(rxi2, 12976.692888496578)
Util.compare(ros1, 18.551680325448835)
Util.compare(ros2, 48.47042599399056)
Util.compare(headUpslope1, 87.573367385837855)
Util.compare(headUpslope2, 87.613728665173383)
Util.compare(flame1, 6.9996889013229229)
Util.compare(flame2, 16.35631663)
Util.compare(lwr1, 3.5015680219321221)
Util.compare(lwr2, 3.501581941)
Util.compare(scorch1, 39.580182)
Util.compare(scorch2, 215.682771)

// Expected weighted surface results
const xros1 = 18.551680325448835
const xros2 = 48.47042599399056
const xcover1 = 0.6
const xrosH = 1 / (xcover1 / xros1 + (1 - xcover1) / xros2)
const xrosA = xcover1 * xros1 + (1-xcover1) * xros2
console.log('Weighted Results:')
Util.compare(ros1, xros1)
Util.compare(ros2, xros2)
Util.compare(rosA, xrosA)
Util.compare(rosH, xrosH)
Util.compare(ros3, xrosA)
