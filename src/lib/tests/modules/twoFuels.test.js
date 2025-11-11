import { describe, it, expect } from 'vitest'
import { value } from '../matchers.js'
import { AllModules } from '../index.js'
import * as Config from '../../modules4/Configs.js'

expect.extend({ value })

Config.surfaceFire.value = Config.surfaceFire.arithmetic
const modules = new AllModules(Config, 'site')
const site = modules.root

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
const {ros:ros1, fli:fli1, flame:flame1, lwr:lwr1, hpua:hpua1, scorch:scorch1,
    weff:weff1, wsrf:wsrf1, weffLimit:weffl1, weffExceeded:weffx1} = fire1
const {fromUpslope:headUpslope1, fromNorth:headNorth1} = fire1.dir
const midflame1 = fire1.midflame

// 'site.surface.secondary' FireCellModule destructuring
const {model:model2, fuel:fuel2, fire:fire2} = secondary
const {catalog:catalog2} = model2
const {fuelKey:fuelKey2, cured:cured2, depth:depth2} = catalog2
const {dead:dead2, live:live2, rxi:rxi2, sink:sink2, source:source2} = fuel2
const {ros:ros2, fli:fli2, flame:flame2, lwr:lwr2, hpua:hpua2, scorch:scorch2,
    weff:weff2, wsrf:wsrf2, weffLimit:weffl2, weffExceeded:weffx2} = fire2
const {fromUpslope:headUpslope2, fromNorth:headNorth2} = fire2.dir
const midflame2 = fire2.midflame

// 'site.surface.weighted' WeightedFireModule destructuring
const {ros:ros3, rosArith:rosA, rosHarm:rosH, fli:fli3,
    flame:flame3, lwr:lwr3, hpua:hpua3, rxi:rxi3, scorch:scorch3,
    weff:weff3, weffLimit:weffl3, weffExceeded:weffx3, wsrf:wsrf3} = weighted
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
    ros1, headUpslope1, headNorth1, fli1, flame1, lwr1, hpua1, midflame1, rxi1, scorch1,
    weff1, weffl1, weffx1, wsrf1, scorch1,
    ros2, headUpslope2, headNorth2, fli2, flame2, lwr2, hpua2, midflame2, rxi2, scorch2,
    weff2, weffl2, weffx2, wsrf2, scorch2,
    ros3, headUpslope3, headNorth3, fli3, flame3, lwr3, hpua3, midflame3, rxi3, scorch3,
    weff3, weffl3, weffx3, wsrf3, rosA, rosH)

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

// Expected weighted surface results
const xros1 = 18.551680325448835
const xros2 = 48.47042599399056
const xcover1 = 0.6
const xrosH = 1 / (xcover1 / xros1 + (1 - xcover1) / xros2)
const xrosA = xcover1 * xros1 + (1-xcover1) * xros2
const xhpua2 = 12976.692888496578 * 0.23541979977677915

// Results from BehavePlus V6 [fm010, fm124, precision]
const tests = [
    // Weighted result
    [ros1, xros1], [ros2, xros2], [ros3, xrosA], [rosA, xrosA], [rosH, xrosH],
    // The following 6 nodes are always bound to the primary fuel
    [headUpslope1, 87.573367385837855], [headUpslope2, 87.613728665173383], [headUpslope3, headUpslope1.value],
    [headNorth1, 87.573367385837855], [headNorth2, 87.613728665173383], [headNorth3, headNorth1.value],
    [lwr1, 3.5015680219321221], [lwr2, 3.501581941], [lwr3, lwr1.value],
    [midflame1, 880], [midflame2, 880], [midflame3, 880],
    [weff1, 880.55194372010692], [weff2, 880.5568433322004], [weff3, weff1.value],
    [wsrf1, 1], [wsrf2, 1], [wsrf3, 1],

    // The effective wind speed limit is the minimum of either
    [weffl1, 5215.2258602062057], [weffl2, 11679.02359964692],
    // The effective wind speed limit is exceeded if EITHER are exceeded
    //[weffx1, false], [weffx2, false], [weff3, false], // requires adding bool test to matchers

    // The following 5 are always bound to the max of the 2 fuels
    [rxi1, 5794.6954002291168], [rxi2, 12976.692888496578], [rxi3, rxi2.value],
    [hpua1, 1261.1929372603729], [hpua2, xhpua2],
    [fli1, 389.95413667947145], [fli2, 2467.928645], [fli3, fli2.value],
    [flame1, 6.9996889013229229], [flame2, 16.35631663], [fli3, fli2.value],
    [scorch1, 39.58018178], [scorch2, 215.6827713], [scorch3, scorch2.value],
]

describe('Two fuel models', () => {
    for(let [node, expected] of tests) {
        it(`${node.key()}`, () => {
            expect(node).value(expected)
        })
    }
})