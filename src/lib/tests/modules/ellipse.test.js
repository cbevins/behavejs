import { describe, it, expect } from 'vitest'
import { value } from '../matchers.js'
import { AllModules, Util } from "../../core.js"
import * as Config from '../../core.js'

expect.extend({ value })

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
for(let mod of [fire1, wtd, head])
    dag.select(mod.ros, mod.dir.fromUpslope, mod.dir.fromNorth, mod.fli, mod.flame, mod.scorch)

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

// Results from BehavePlus V6
// Uses ellipse.head, fire1, and wtd
const test1 = [
    ['ros', 18.551680325448835],
    ['fli', 389.95413667947145],
    ['flame', 6.9996889013229229],
    ['scorch', 39.58018178],
]
// uses ellipse, fire1, and wtd
const test2 = [['midflame', 880]]
// uses ellipse.axis, fire1, and wtd
const test3 = [['lwr', 3.5015680219321221]]
// uses ellipse.head.dir, fire1.dir, and wtd.dir
const test4 = [
    ['fromNorth', 87.573367385837855],
    ['fromUpslope', 87.573367385837855],
]

describe('Surface fire ellipse binding', () => {
    for(let [prop, expected] of test1) {
        for (let mod of [fire1, wtd, ellipse.head]) {
            const node = mod[prop]
            it(`primary, weighted, and ellipse fire inputs are the same > ${node.key()}`, () => {
                expect(node).value(expected)
            })
        }
    }
    for(let [prop, expected] of test2) {
        for (let mod of [fire1, wtd, ellipse]) {
            const node = mod[prop]
            it(`primary, weighted, and ellipse fire inputs are the same > ${node.key()}`, () => {
                expect(node).value(expected)
            })
        }
    }
    for(let [prop, expected] of test3) {
        for (let mod of [fire1, wtd, ellipse.axis]) {
            const node = mod[prop]
            it(`primary, weighted, and ellipse fire inputs are the same > ${node.key()}`, () => {
                expect(node).value(expected)
            })
        }
    }
    for(let [prop, expected] of test4) {
        for (let mod of [fire1, wtd, ellipse.head]) {
            const node = mod.dir[prop]
            it(`primary, weighted, and ellipse fire inputs are the same > ${node.key()}`, () => {
                expect(node).value(expected)
            })
        }
    }
})
