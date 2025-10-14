import * as Config from './Configs.js'
import { Dag } from './Dag.js'
import { DagModule, DagNode, NodeMap } from './DagItems.js'
import { Util } from './Util.js'
import { defineCanopyModule, configCanopyModule } from './CanopyModule.js'
import { defineFuelMoistureModule, configFuelMoistureModule } from './FuelMoistureModule.js'
import { defineSlopeModule, configSlopeModule } from './SlopeModule.js'
import { defineWindModule, configWindModule } from './WindModule.js'
import { defineSurfaceModule, configSurfaceModule } from './SurfaceModule.js'
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
    configCanopyModule(site.canopy, Config.canopyHeight)
    configFuelMoistureModule(site.moisture, Config.fuelMoistureDead, Config.fuelMoistureLive)
    configSlopeModule(site.slope, Config.slopeDirection, Config.slopeSteepness)
    configWindModule(site.wind, site.slope, Config.windDirection, Config.windSpeed)

    configSurfaceModule(site.surface, site.moisture, site.wind, site.slope, site.canopy)
}
//------------------------------------------------------------------------------

const site = new DagModule(null, 'site')
site.canopy = defineCanopyModule(site, 'canopy')
site.moisture = defineFuelMoistureModule(site, 'moisture')
site.slope = defineSlopeModule(site, 'slope')
site.wind = defineWindModule(site, 'wind')
site.surface = defineSurfaceModule(site, 'surface')

// console.log(Util.moduleTreeStr(site))
configureSite(site)

const dag = new Dag(NodeMap, 'Test')

const {canopy, moisture, slope, wind, surface} = site
const {primary} = site.surface
const {fire, fuel} = primary
const {dead, live} = fuel

// Common input nodes
const {stdKey} = fuel.domain.standard
const {tl1, tl10, tl100} = moisture.dead
const {herb, stem} = moisture.live
const {steep} = slope
const aspect = slope.dir.downslope
const {midflame, wsrf} = primary.wind
const windFrom = wind.dir.origin.wrtNo

// Select outputs
const area = fuel.area
const bulk = fuel.bulk
const beta = fuel.beta
const savr = fuel.savr
const cured = fuel.domain.standard.cured
const deadEtam = dead.etam
const deadRxi = dead.rxi
const liveEtam = live.etam
const liveEtas = live.etas
const liveMext = live.mext
const liveMextF = live.mextf
const liveLoad = live.load
const liveMois = live.mois
const liveRxi = live.rxi
const qig = fuel.qig
const ros = fire.ros
const sink = fuel.sink
dag.select(bulk, sink, ros)
Util.logDagNodes(dag.selected(), 'Selected Nodes')

// Set inputs
dag.set(stdKey, '10')
dag.set(tl1, 0.05)
dag.set(tl10, 0.07)
dag.set(tl100, 0.09)
dag.set(herb, 0.5)
dag.set(stem, 1.5)
dag.set(steep.ratio, 0.25)
dag.set(aspect, 180)
dag.set(midflame, 880)
dag.set(windFrom, 270)
Util.logDagNodes(dag.activeInputs(), 'Active Input Nodes')

dag.updateAll()
dump(cured, 0.778)
dump(bulk, 0.552)
dump(area, 13.4665)
dump(beta, 0.01725)
dump(savr, 1764.3319812126388)
dump(deadEtam, 0.65206408989980214)
dump(deadRxi, 3612.4074071954024)
dump(liveLoad, 0.092)
dump(liveMextF, 6.908948234294801)
dump(live.mext, 5.1935979022741359)
dump(liveEtas, 0.41739692790939131)
dump(liveMois, 1.5)
dump(liveEtam, 0.59341294014849078)
dump(liveRxi, 2182.287993033714)
dump(qig, 746.993428042342)
dump(sink, 412.34037227937284)
dump(ros, 18.551680325448835)
