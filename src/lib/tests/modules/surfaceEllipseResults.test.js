import { describe, it, expect } from 'vitest'
import { value } from '../matchers.js'
import { AllModules, Util } from "../../core.js"
import * as Config from '../../core.js'
import {FireEllipseBp6Results as Results} from '../../testdata/fireEllipse.bp6.results.js'
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

//------------------------------------------------------------------------------
// Site destructuring
//------------------------------------------------------------------------------

const {canopy, ignition, map, moisture, surface, terrain, weather} = site

// 'site.surface' SurfaceModule destructuring
const {ellipse, primary, secondary, weighted:wtd} = surface
const {axis, head, back, right, left, beta5, beta6, psi, size} = ellipse

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

//------------------------------------------------------------------------------
// DagNode selection, input, update, and results
//------------------------------------------------------------------------------

// Step 1 - select nodes of interest
const dag = modules.dag
// console.log(Util.moduleTreeStr(axis))

dag.select(
    axis.lwr, ellipse.midflame,
    back.fireDist, back.flame, back.fli, back.ros, back.scorch, back.dir.fromNorth, back.dir.fromHead,
    beta5.fireDist, beta5.flame, beta5.fli, beta5.ros, beta5.scorch, beta5.dir.fromNorth, beta5.dir.fromHead,
    beta6.fireDist, beta6.flame, beta6.fli, beta6.ros, beta6.scorch, beta6.dir.fromNorth, beta6.dir.fromHead,
        beta6.theta, beta6.psi, beta6.psiRos,
    head.fireDist, head.flame, head.fli, head.ros, head.scorch, head.dir.fromNorth, head.dir.fromHead,
    left.fireDist, left.flame, left.fli, left.ros, left.scorch, left.dir.fromNorth, left.dir.fromHead,
    psi.fireDist, psi.flame, psi.fli, psi.ros, psi.scorch, psi.dir.fromNorth, psi.dir.fromHead,
    right.fireDist, right.flame, right.fli, right.ros, right.scorch, right.dir.fromNorth, right.dir.fromHead,
    size.length, size.width, size.area, size.perimeter,
    wtd.ros, wtd.midflame, wtd.dir.fromNorth, wtd.dir.fromUpslope, wtd.lwr, wtd.flame, wtd.fli, wtd.scorch
)

// Step 2 - display (optional) and set input DagNode values
dag.set(moisture.dead.tl1, 0.05)
dag.set(moisture.dead.tl10, 0.07)
dag.set(moisture.dead.tl100, 0.09)
dag.set(moisture.live.herb, 0.5)
dag.set(moisture.live.stem, 1.5)
dag.set(terrain.aspect, 180)
dag.set(terrain.slope.ratio, 0.25)
dag.set(weather.air.temp, 95)
dag.set(weather.wind.dir.origin.fromNorth, 270)
dag.set(primary.fire.midflame, 880)
dag.set(site.ignition.t, 60)
dag.set(beta5.dir.fromNorth, 45)
dag.set(beta6.dir.fromNorth, 45)
dag.set(psi.dir.fromNorth, 45)
// Util.logDagNodes(dag.activeInputsByKey(), 'Active Input Nodes')
// Util.logDagNodes(dag.activeNodesByKey(), 'Active Nodes')

describe(`Surface fire ellipse agrees with BP6`, () => {
    for(let i=0; i<2; i++) {
        const key = Results.fuels[i]
        it(`fm ${key} wieghted and ellipse inputs are bound`, () => {
            dag.set(fuelKey, key)
            dag.updateAll()
            expect(wtd.midflame).value(Results.midflame[i])
            expect(wtd.ros).value(Results.head.ros[i])
            expect(wtd.lwr).value(Results.axis.lwr[i])
        })
        it(`fm ${key} ellipse head fire vector`, () => {
            dag.set(fuelKey, key)
            dag.updateAll()
            expect(head.ros).value(Results.head.ros[i])
            expect(head.fli).value(Results.head.fli[i])
            expect(head.flame).value(Results.head.flame[i])
            expect(head.fireDist).value(Results.head.fireDist[i])
            expect(head.scorch).value(Results.head.scorch[i])
        })
        it(`fm ${key} ellipse back fire vector`, () => {
            dag.set(fuelKey, key)
            dag.updateAll()
            expect(back.ros).value(Results.back.ros[i])
            expect(back.fli).value(Results.back.fli[i])
            expect(back.flame).value(Results.back.flame[i])
            expect(back.fireDist).value(Results.back.fireDist[i])
            expect(back.scorch).value(Results.back.scorch[i])
        })
        it(`fm ${key} ellipse right flank fire vector`, () => {
            dag.set(fuelKey, key)
            dag.updateAll()
            expect(right.ros).value(Results.right.ros[i])
            expect(right.fli).value(Results.right.fli[i])
            expect(right.flame).value(Results.right.flame[i])
            expect(right.fireDist).value(Results.right.fireDist[i])
            expect(right.scorch).value(Results.right.scorch[i])
        })
        it(`fm ${key} left flank fire vector`, () => {
            dag.set(fuelKey, key)
            dag.updateAll()
            expect(left.ros).value(Results.left.ros[i])
            expect(left.fli).value(Results.left.fli[i])
            expect(left.flame).value(Results.left.flame[i])
            expect(left.fireDist).value(Results.left.fireDist[i])
            expect(left.scorch).value(Results.left.scorch[i])
        })
        it(`fm ${key} beta5 fire vector results`, () => {
            dag.set(fuelKey, key)
            dag.updateAll()
            expect(beta5.dir.fromHead).value(Results.beta5.dir.fromHead[i])
            expect(beta5.ros).value(Results.beta5.ros[i])
            expect(beta5.fli).value(Results.beta5.fli[i])
            expect(beta5.flame).value(Results.beta5.flame[i])
            expect(beta5.fireDist).value(Results.beta5.fireDist[i])
            expect(beta5.scorch).value(Results.beta5.scorch[i])
        })
        it(`fm ${key} beta6 fire vector results`, () => {
            dag.set(fuelKey, key)
            dag.updateAll()
            expect(beta6.dir.fromHead).value(Results.beta6.dir.fromHead[i])
            expect(beta6.ros).value(Results.beta6.ros[i])
            expect(beta6.theta).value(Results.beta6.theta[i])
            expect(beta6.psi).value(Results.beta6.psi[i])
            // expect(beta6.psiRos).value(Results.beta6.psiRos[i]) // No BP6 results available for this!!!
            expect(beta6.fli).value(Results.beta6.fli[i], '1.0e-8', 1.0e-8)
            expect(beta6.flame).value(Results.beta6.flame[i])
            expect(beta6.fireDist).value(Results.beta6.fireDist[i])
            expect(beta6.scorch).value(Results.beta6.scorch[i], '1.0e-8', 1.0e-8)
        })
        it(`fm ${key} ellipse axis results`, () => {
            dag.set(fuelKey, key)
            dag.updateAll()
            expect(axis.lwr).value(Results.axis.lwr[i])
            expect(axis.eccentricity).value(Results.axis.eccentricity[i])
            expect(axis.major.ros).value(Results.axis.major.ros[i])
            expect(axis.minor.ros).value(Results.axis.minor.ros[i])
            expect(axis.f.ros).value(Results.axis.f.ros[i])
            expect(axis.g.ros).value(Results.axis.g.ros[i])
            expect(axis.h.ros).value(Results.axis.h.ros[i])
        })
        it(`fm ${key} ellipse size results`, () => {
            dag.set(fuelKey, key)
            dag.updateAll()
            expect(size.area).value(Results.size.area[i], 'at 1.0e-7', 1.0e-7)
            expect(size.length).value(Results.size.length[i])
            expect(size.perimeter).value(Results.size.perimeter[i])
            expect(size.width).value(Results.size.width[i])
        })
    }
})