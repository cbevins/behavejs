import { describe, it, expect } from 'vitest'
import { value } from '../matchers.js'
import { AllModules, Util } from "../../core.js"
import * as Config from '../../core.js'

expect.extend({ value })

//------------------------------------------------------------------------------
// AllModules 'site' construction and configuration
//------------------------------------------------------------------------------

Config.firelineIntensity.value = Config.firelineIntensity.fli
Config.fireVectors.value = Config.fireVectors.fromNorth
Config.fuelCuring.value = Config.fuelCuring.estimated
Config.midflameWindSpeed.value = Config.midflameWindSpeed.input
Config.surfaceFire.value = Config.surfaceFire.onefuel
Config.windDirection.value = Config.windDirection.originWrtNo

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
const fuelKey = primary.model.catalog.fuelKey

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
for(let mod of [wtd, head])
    dag.select(mod.ros, mod.dir.fromUpslope, mod.dir.fromNorth, mod.fli, mod.flame, mod.scorch)

for(let mod of [wtd, axis]) dag.select(mod.lwr)
for(let mod of [wtd, ellipse]) dag.select(mod.midflame)

// Step 2 - display (optional) and set input DagNode values
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

// ellipse.head[prop] and wtd[prop]
const results1 = [
    ['ros', [18.551680325448835, 48.47042599399056]],
]
// ellipse[prop]
const results2 = [
    ['midflame', [880], [880]],
]
// ellipse.axis[prop]
const results3 = [
    [axis.lwr, [3.5015680219321221, 3.5015819412846603]],
]

describe(`Surface fire ellipse for fuel model 10`, () => {
    let i = 0
    for(let key of ['10']) {
        dag.set(fuelKey, key)
        dag.updateAll()
        for(let result of results1) {
            const [prop, values] = result
            const value = values[i]
            it(`fm ${key} ${prop}`, () => {
                expect(wtd[prop]).value(value)
                expect(head[prop]).value(value)
            })
        }
        i++
    }
})
// let i = 0
// for (let key of ['10','124']) {
//     // Expected weighted surface results
//     const results = [
//         [wtd.ros, [18.551680325448835, 48.47042599399056][i]],
//         // [axis.lwr, [3.5015680219321221, 3.5015819412846603][i]],
//     ]
//     dag.set(fuelKey, key)
//     dag.updateAll()
//     describe(`Surface fire ellipse for fuel model '${key}'`, () => {
//         for(let result of results) {
//             const [node, val] = result
//             it(`${node.key()}`, () => {
//                 expect(node).value(val)
//             })
//         }
//     })
//     i++
// }
