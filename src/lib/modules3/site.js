import * as Config from './Configs.js'
import { Dag } from './Dag.js'
import { DagModule, DagNode, NodeMap } from './DagItems.js'
import { Util } from './Util.js'

import { CanopyModule } from './CanopyModule.js'
import { FuelMoistureModule } from './FuelMoistureModule.js'
import { RothermelModule } from './RothermelModule.js'
import { SlopeModule } from './SlopeModule.js'
import { WindModule } from './WindModule.js'

console.log(new Date())

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
}

function buildSite(prop='site') {
    const site = new DagModule(null, prop)
    site.moisture = new FuelMoistureModule(site, 'moisture',
        Config.fuelMoistureDead, Config.fuelMoistureLive)
    site.canopy = new CanopyModule(site, 'canopy', Config.canopyHeight)
    site.slope = new SlopeModule(site, 'slope', Config.slopeDirection, Config.slopeSteepness)
    site.wind = new WindModule(site, 'wind', site.slope, Config.windDirection, Config.windSpeed)
    site.primary = new RothermelModule(site, 'primary',
        site.moisture, site.wind, site.slope, site.canopy,
        Config.fireEffWindLimit, Config.midflameWindSpeed,
        Config.fuelDomainPrimary, Config.fuelCuring)
    // site.surface = new SurfaceModule(site, 'surface', site.moisture, site.wind, site.slope, site.canopy)
    return site
}
//------------------------------------------------------------------------------

const site = buildSite()
configureSite(site)
console.log(Util.moduleTreeStr(site))

const dag = new Dag(NodeMap, 'Test')

const {canopy, moisture, primary, slope, wind} = site
// CanopyModule destructuring
const canopyBase = canopy.crown.base
const canopyHeight = canopy.crown.height
const canopyRatio = canopy.crown.ratio
const canopyWsrf = canopy.wind.wsrf
// MoistureModule destructuring
const {tl1, tl10, tl100, category} = moisture.dead
const {herb, stem} = moisture.live
// SlopeModule destructuring
const steep = slope.steep.ratio
const downslope = slope.dir.downslope
// WindModule destructuring
const windFrom = wind.dir.origin.wrtNo
const wind20 =wind.speed.at20ft
//
const {fire, fuel} = primary
const {stdKey} = fuel.domain.standard
const {midflame} = primary.wind
const {ros} = primary.fire

dag.select(
    tl1, tl10, tl100, herb, stem,
    steep, downslope,
    windFrom, wind20,
    canopyBase, canopyHeight, canopyRatio,
    ros
)
Util.logDagNodes(dag.selected(), 'Selected Nodes')

// Set inputs
dag.set(stdKey, '10')
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
dag.set(midflame, 880)
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
// dump(stdKey, '10')
dump(ros, 18.551680325448835)

dag.set(stdKey, '124')
dag.updateAll()
dump(ros, 48.47042599399056)
