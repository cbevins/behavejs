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

const {canopy, ignition, map, moisture, surface, terrain, weather} = site

// 'site.surface' SurfaceModule destructuring
const {ellipse, primary, secondary, weighted:wtd} = surface

// 'site.surface.primary' FireCellModule destructuring
const {model:model1, fuel:fuel1, fire:fire1} = primary
const {catalog:catalog1} = model1
const {fuelKey:fuelKey1, cured:cured1, depth:depth1} = catalog1

// 'site.surface.secondary' FireCellModule destructuring
const {model:model2, fuel:fuel2, fire:fire2} = secondary
const {catalog:catalog2} = model2
const {fuelKey:fuelKey2, cured:cured2, depth:depth2} = catalog2

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
for(let mod of [fire1, fire2, wtd]) {
    dag.select(
        mod.ros, mod.dir.fromUpslope, mod.dir.fromNorth, mod.fli, mod.flame,
        mod.hpua, mod.lwr, mod.midflame, mod.rxi, mod.scorch,
        mod.weff, mod.weffLimit, mod.weffExceeded, mod.wsrf)
}
dag.select(wtd.rosArith, wtd.rosHarm)

// Step 2 - display (optional) and set input DagNode values
dag.set(wtd.cover1, 0.6)
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
dag.set(fire1.midflame, 880)
dag.set(fire2.midflame, 880)
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

// Results from BehavePlus V6
// Weighted result
const test1 = [
    [fire1.ros, xros1], [fire2.ros, xros2], [wtd.ros, xrosA], [wtd.rosArith, xrosA], [wtd.rosHarm, xrosH]
]
// The following 6 nodes are always bound to the primary fuel
const test2 = [
    [fire1.dir.fromUpslope, 87.573367385837855], [fire2.dir.fromUpslope, 87.613728665173383],
        [wtd.dir.fromUpslope, fire1.dir.fromUpslope.value],
    [fire1.dir.fromNorth, 87.573367385837855], [fire2.dir.fromNorth, 87.613728665173383],
        [wtd.dir.fromNorth, fire1.dir.fromNorth.value],
    [fire1.lwr, 3.5015680219321221], [fire2.lwr, 3.501581941], [wtd.lwr, fire1.lwr.value],
    [fire1.midflame, 880], [fire2.midflame, 880], [wtd.midflame, 880],
    [fire1.weff, 880.55194372010692], [fire2.weff, 880.5568433322004], [wtd.weff, fire1.weff.value],
    [fire1.wsrf, 1], [fire2.wsrf, 1], [wtd.wsrf, 1]
]

// The effective wind speed limit is the minimum of the 2 fuels
const test3 = [
    [fire1.weffLimit, 5215.2258602062057], [fire2.weffLimit, 11679.02359964692],
    // The effective wind speed limit is exceeded if EITHER are exceeded
    [fire1.weffExceeded, false], [fire2.weffExceeded, false], [wtd.weffExceeded, false],
]

// The following 5 are always bound to the maximum of the 2 fuels
const test4 = [
    [fire1.rxi, 5794.6954002291168], [fire2.rxi, 12976.692888496578], [wtd.rxi, fire2.rxi.value],
    [fire1.hpua, 1261.1929372603729], [fire2.hpua, xhpua2], [wtd.hpua, xhpua2],
    [fire1.fli, 389.95413667947145], [fire2.fli, 2467.928645], [wtd.fli, fire2.fli.value],
    [fire1.flame, 6.9996889013229229], [fire2.flame, 16.35631663], [wtd.fli, fire2.fli.value],
    [fire1.scorch, 39.58018178], [fire2.scorch, 215.6827713], [wtd.scorch, fire2.scorch.value],
]

describe('Two fuel models', () => {
    for(let [node, expected] of test1) {
        it(`primary, secondary, weighted, and mean ros > ${node.key()}`, () => {
            expect(node).value(expected)
        })
    }
    for(let [node, expected] of test2) {
        it(`final value is bound to primary fuel > ${node.key()}`, () => {
            expect(node).value(expected)
        })
    }
    for(let [node, expected] of test3) {
        it(`final effective wind limit is minimum and exceeded if either > ${node.key()}`, () => {
            expect(node).value(expected)
        })
    }
    for(let [node, expected] of test4) {
        it(`final value is bound to the maximum of the two fuels > ${node.key()}`, () => {
            expect(node).value(expected)
        })
    }
    it('final effective wind limit is exceeded if either is exceeded', () => {
        dag.set(fire1.midflame, 6000)
        dag.updateAll()
            expect(fire1.weffLimit).value(5215.2258602062057)
            expect(fire1.weffExceeded).value(true)
            expect(fire2.weffExceeded).value(false)
            expect(wtd.weffExceeded).value(true)
    })
})
