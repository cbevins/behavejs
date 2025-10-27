import { Dag } from './Dag.js'
import { DagModule, DagNode, NodeMap } from './DagItems.js'
import { Util } from './Util.js'

import { CanopyModule } from './CanopyModule.js'
import { FireEllipseModule } from './FireEllipseModule.js'
import { FuelMoistureModule } from './FuelMoistureModule.js'
import { MapModule } from './MapModule.js'
import { RothermelModule } from './RothermelModule.js'
import { SurfaceFireModule } from './SurfaceFireModule.js'
import { SlopeModule } from './SlopeModule.js'
import { WindModule } from './WindModule.js'
import * as Config from './Configs.js'

console.log(new Date())
const useSurface = true

//------------------------------------------------------------------------------
function dump(node, expected=null) {
    const {_meta, value, units, updater, suppliers, config, consumers, dirty, status} = node
    const {key, parent, prop, label, isNode} = _meta
    let str = `Node "${key}" = [${value}] `
    if (expected!==null) str+= `(expected ${expected}) `
    str += `${status} ${dirty} ${updater.name}`
    console.log(str)
}

function configureSite(site) {
    site.canopy.config()
    site.map.config()
    site.moisture.config()
    site.slope.config()
    site.wind.config()
    site.primary.config()
    site.secondary.config()
    site.surface.config()
    site.ellipse.config()
}

function buildSite(prop='site') {
    const site = new DagModule(null, prop)
    site.canopy = new CanopyModule(site, 'canopy', Config.canopyHeight)
    site.map = new MapModule(site, 'map')
    site.moisture = new FuelMoistureModule(site, 'moisture',
        Config.fuelMoistureDead, Config.fuelMoistureLive)
    site.slope = new SlopeModule(site, 'slope', Config.slopeDirection, Config.slopeSteepness)
    site.wind = new WindModule(site, 'wind', site.slope, Config.windDirection, Config.windSpeed)

    // SurfaceFireModule with a primary and secondary RothermelModule
    site.primary = new RothermelModule(site, 'primary',
        site.moisture, site.wind, site.slope, site.canopy,
        Config.fireEffWindLimit, Config.midflameWindSpeed,
        Config.fuelDomainPrimary, Config.fuelCuring)
    site.secondary = new RothermelModule(site, 'secondary',
        site.moisture, site.wind, site.slope, site.canopy,
        Config.fireEffWindLimit, Config.midflameWindSpeed,
        Config.fuelDomainSecondary, Config.fuelCuring)
    site.surface = new SurfaceFireModule(site, 'surface',
        site.primary, site.secondary, Config.surfaceFire)
        
    // FireEllipseModule for the SurfaceFireModule
    site.ellipse = new FireEllipseModule(site, 'ellipse',
        site.surface, site.slope, site.map,
        Config.fireVectors, Config.firelineIntensity
    )
    return site
}
//------------------------------------------------------------------------------

Config.surfaceFire.value = Config.surfaceFire.arithmetic
const site = buildSite()
configureSite(site)
console.log(Util.moduleTreeStr(site))

const dag = new Dag(NodeMap, 'Test')

// Site destructuring
const {canopy, map, moisture, primary, secondary, slope, surface, wind} = site
// CanopyModule destructuring
const canopyBase = canopy.crown.base
const canopyHeight = canopy.crown.height
const canopyRatio = canopy.crown.ratio
const canopyWsrf = canopy.wind.wsrf
// MoistureModule destructuring
const {tl1, tl10, tl100} = moisture.dead
const {herb, stem} = moisture.live
// SlopeModule destructuring
const steep = slope.steep.ratio
const aspect = slope.dir.aspect

// SurfaceModule destructuring
const stdKey1 = primary.fuel.domain.standard.stdKey
const midflame1 = primary.fire.wind.midflame.speed
const ros1 = primary.fire.ros

const stdKey2 = secondary.fuel.domain.standard.stdKey
const midflame2 = secondary.fire.wind.midflame.speed
const ros2 = secondary.fire.ros

const cover1 = surface.cover1
const ros3 = surface.ros
const rosA = surface.rosArith
const rosH = surface.rosHarm

// WindModule destructuring
const wind20 =wind.speed.at20ft
const windFrom = wind.dir.origin.fromNortth
// console.log(primary.fire.wind.midflame.speed)

dag.select(
    tl1, tl10, tl100, herb, stem,
    steep, aspect,
    windFrom, // wind20,
    // canopyBase, canopyHeight, canopyRatio,
    ros1, ros2, ros3, rosA, rosH,
    primary.fuel.dead.savr,
    primary.fuel.live.savr,
)
Util.logDagNodes(dag.selected(), 'Selected Nodes')

// Set inputs
dag.set(stdKey1, '10')
dag.set(stdKey2, '124')
dag.set(cover1, 0.6)
dag.set(canopyBase, 10)
dag.set(canopyHeight, 40)
dag.set(tl1, 0.05)
dag.set(tl10, 0.07)
dag.set(tl100, 0.09)
dag.set(herb, 0.5)
dag.set(stem, 1.5)
dag.set(steep, 0.25)
dag.set(aspect, 180)
dag.set(windFrom, 270)
dag.set(midflame1, 880)
dag.set(midflame2, 880)
dag.updateAll()
Util.logDagNodes(dag.activeInputs(), 'Active Input Nodes')

// Expected results
const xros1 = 18.551680325448835
const xros2 = 48.47042599399056
const xcover1 = 0.6
const xrosH = 1 / (xcover1 / xros1 + (1 - xcover1) / xros2)
const xrosA = xcover1 * xros1 + (1-xcover1) * xros2

dump(ros1, xros1)
dump(ros2, xros2)
dump(rosA, xrosA)
dump(rosH, xrosH)
dump(ros3, xrosA)
dump(primary.fuel.dead.savr, 1888.860238693467)
dump(primary.fuel.live.savr, 1500)
