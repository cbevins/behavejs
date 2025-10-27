import { Dag } from './Dag.js'
import { DagModule, DagNode, NodeMap } from './DagItems.js'
import { Units as U } from './Units.js'
import { Util } from './Util.js'

import { CanopyModule } from './CanopyModule.js'
import { FireCellModule } from './FireCellModule.js'
import { FireVectorModule } from './FireVectorModule.js'
import { FuelCellModule } from './FuelCellModule.js'
import { FuelModelCatalogModule } from './FuelModelCatalogModule.js'
import { FuelMoistureModule } from './FuelMoistureModule.js'
import { SlopeModule } from './SlopeModule.js'
import { WeightedFireModule } from './WeightedFireModule.js'
import { WindModule } from './WindModule.js'
import * as Config from './Configs.js'

console.log(new Date())

function buildSite(prop='site') {
    const site = new DagModule(null, prop)
    site.canopy = new CanopyModule(site, 'canopy', Config)
    site.moisture = new FuelMoistureModule(site, 'moisture', Config)
    site.slope = new SlopeModule(site, 'slope', Config)
    site.wind = new WindModule(site, 'wind', site.slope, Config)

    const primary = site.primary = new DagModule(site, 'primary')
    primary.model = new DagModule(primary, 'model')
    primary.model.catalog = new FuelModelCatalogModule(primary.model, 'catalog',
        site.moisture, Config)
    // The following fuel domains are not yet implemented
    const custom = null
    const chaparral = null
    const palmetto = null
    const aspen = null

    primary.fuel = new FuelCellModule(primary, 'fuel',
        primary.model.catalog, custom, chaparral, palmetto, aspen, Config)
    primary.fire = new FireCellModule(primary, 'fire',
        primary.fuel, site.wind, site.slope, site.canopy, Config)

    const secondary = site.secondary = new DagModule(site, 'secondary')
    secondary.model = new DagModule(secondary, 'model')
    secondary.model.catalog = new FuelModelCatalogModule(secondary.model, 'catalog',
        site.moisture, Config)
    secondary.fuel = new FuelCellModule(secondary, 'fuel',
        secondary.model.catalog, custom, chaparral, palmetto, aspen, Config)
    secondary.fire = new FireCellModule(secondary, 'fire',
        secondary.fuel, site.wind, site.slope, site.canopy, Config)

    const surface = site.surface = new WeightedFireModule(site, 'surface',
        primary.fire, secondary.fire, Config)
    return site
}

function configureSite(site) {
    site.canopy.config()
    site.moisture.config()
    site.slope.config()
    site.wind.config()

    site.primary.model.catalog.config()
    site.primary.fuel.config()
    site.primary.fire.config()
    site.secondary.model.catalog.config()
    site.secondary.fuel.config()
    site.secondary.fire.config()
    site.surface.config()
}

//------------------------------------------------------------------------------
// Site construction and configuration
//------------------------------------------------------------------------------

const site = buildSite()
Config.surfaceFire.value = Config.surfaceFire.arithmetic
configureSite(site)
// console.log(Util.moduleTreeStr(site))

//------------------------------------------------------------------------------
// Site destructuring
//------------------------------------------------------------------------------

const {canopy,  moisture, primary, secondary, surface, slope, wind} = site

// Primary FireCellModule destructuring
const {model:model1, fuel:fuel1, fire:fire1} = primary
const {catalog:catalog1} = model1
const {fuelKey:fuelKey1, cured:cured1, depth:depth1} = catalog1
const {dead:dead1, live:live1, rxi:rxi1, sink:sink1, source:source1} = fuel1
const {ros:ros1, fli:fli1, flame:flame1, lwr:lwr1, hpua:hpua1} = fire1
const {fromUpslope:headUpslope1, fromNorth:headNorth1} = fire1.dir
const midflame1 = fire1.midflame

// Secondary FireCellModule destructuring
const {model:model2, fuel:fuel2, fire:fire2} = secondary
const {catalog:catalog2} = model2
const {fuelKey:fuelKey2, cured:cured2, depth:depth2} = catalog2
const {dead:dead2, live:live2, rxi:rxi2, sink:sink2, source:source2} = fuel2
const {ros:ros2, fli:fli2, flame:flame2, lwr:lwr2, hpua:hpua2} = fire2
const {fromUpslope:headUpslope2, fromNorth:headNorth2} = fire2.dir
const midflame2 = fire2.midflame

// WeightedFireModule destructuring
const {ros:ros3, rosArith:rosA, rosHarm:rosH, fli:fli3, flame:flame3, lwr:lwr3, hpua:hpua3} = surface
const {fromUpslope:headUpslope3, fromNorth:headNorth3} = surface.dir
const midflame3 = surface.midflame

// FuelMoistureModule destructuring
const {tl1, tl10, tl100} = moisture.dead
const {herb, stem} = moisture.live

// SlopeModule destructuring
const aspect = site.slope.dir.aspect
const steepness = site.slope.steep.ratio

// WindModule destructuring
const windSpeed = site.wind.speed.at20ft
const windFrom = site.wind.dir.origin.fromNorth

//------------------------------------------------------------------------------
// Dag construction and use
//------------------------------------------------------------------------------

const dag = new Dag(NodeMap, 'Test')
dag.select(
    ros1, headUpslope1, headNorth1, fli1, flame1, lwr1, hpua1,
    ros2, headUpslope2, headNorth2, fli2, flame2, lwr2, hpua2,
    ros3, headUpslope3, headNorth3, fli3, flame3, lwr3, hpua3, rosA, rosH)

// Set inputs
dag.set(surface.cover1, 0.6)
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

// Expected results
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
