import { Dag } from './Dag.js'
import { DagModule, DagNode, NodeMap } from './DagItems.js'
import { Util } from './Util.js'

import { CanopyModule } from './CanopyModule.js'
import { FuelMoistureModule } from './FuelMoistureModule.js'
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
    site.moisture.config()
    site.slope.config()
    site.wind.config()
    site.primary.config()
    site.secondary.config()
    site.surface.config()
}

function buildSite(prop='site') {
    const site = new DagModule(null, prop)
    site.canopy = new CanopyModule(site, 'canopy', Config.canopyHeight)
    site.moisture = new FuelMoistureModule(site, 'moisture',
        Config.fuelMoistureDead, Config.fuelMoistureLive)
    site.slope = new SlopeModule(site, 'slope', Config.slopeDirection, Config.slopeSteepness)
    site.wind = new WindModule(site, 'wind', site.slope, Config.windDirection, Config.windSpeed)

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
    return site
}
//------------------------------------------------------------------------------

const site = buildSite()
configureSite(site)
console.log(Util.moduleTreeStr(site))

const dag = new Dag(NodeMap, 'Test')

const {canopy, moisture, primary, secondary, slope, surface, wind} = site
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
const downslope = slope.dir.downslope

// SurfaceModule destructuring
const stdKey1 = primary.fuel.domain.standard.stdKey
const stdKey2 = secondary.fuel.domain.standard.stdKey
const midflame1 = primary.fire.wind.midflame.speed
const midflame2 = secondary.fire.wind.midflame.speed
const ros1 = primary.fire.ros
const ros2 = secondary.fire.ros

// WindModule destructuring
const wind20 =wind.speed.at20ft
const windFrom = wind.dir.origin.wrtNo
// console.log(primary.fire.wind.midflame.speed)

dag.select(
    tl1, tl10, tl100, herb, stem,
    steep, downslope,
    windFrom, wind20,
    canopyBase, canopyHeight, canopyRatio,
    ros1
)
Util.logDagNodes(dag.selected(), 'Selected Nodes')

// Set inputs
dag.set(stdKey1, '10')
dag.set(canopyBase, 10)
dag.set(canopyHeight, 40)
dag.set(tl1, 0.05)
dag.set(tl10, 0.07)
dag.set(tl100, 0.09)
dag.set(herb, 0.5)
dag.set(stem, 1.5)
dag.set(steep, 0.25)
dag.set(downslope, 180)
dag.set(windFrom, 270)
dag.set(midflame1, 880)
Util.logDagNodes(dag.activeInputs(), 'Active Input Nodes')

dag.updateAll()
// dump(tl1, 0.05)
// dump(tl10, 0.07)
// dump(tl100, 0.09)
// dump(herb, 0.5)
// dump(stem, 1.5)
// dump(steep, 0.25)
// dump(downslope, 180)
// dump(windFrom, 270)
// dump(wind20, 880)
// dump(canopyBase, 10)
// dump(canopyHeight, 40)
// dump(canopyRatio, 0.75)
// dump(stdKey1, '10')
dump(ros1, 18.551680325448835)

dag.set(stdKey1, '124')
dag.updateAll()
dump(ros1, 48.47042599399056)
