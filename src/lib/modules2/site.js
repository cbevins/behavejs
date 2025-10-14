import * as Config from './Configs.js'
import { Dag } from './Dag.js'
import { DagModule, DagNode, NodeMap } from './DagItems.js'
import { Util } from './Util.js'
import { defineFuelMoistureModule, configFuelMoistureModule } from './FuelMoistureModule.js'
import { defineRothermelModule, configRothermelModule } from './RothermelModule.js'
import { defineSlopeModule, configSlopeModule } from './SlopeModule.js'
import { defineWindModule, configWindModule } from './WindModule.js'

console.log(new Date())

//------------------------------------------------------------------------------
function dump(node) {
    const {_meta, value, units, updater, suppliers, config, consumers, dirty, status} = node
    const {key, parent, prop, label, isNode} = _meta
    console.log(`Node "${key}" = [${value}] ${status} ${dirty} ${updater.name}`)
}

function configureSite(site) {
    configFuelMoistureModule(site.moisture, Config.fuelMoistureDead, Config.fuelMoistureLive)
    configSlopeModule(site.slope, Config.slopeDirection, Config.slopeSteepness)
    configWindModule(site.wind, site.slope, Config.windDirection, Config.windSpeed)

    configRothermelModule(site.surface.primary, site.moisture, site.wind, site.slope, site.canopy,
        Config.fuelDomainPrimary, Config.fireEffWindLimit, Config.fuelCuring, Config.midflameWindSpeed)
}
//------------------------------------------------------------------------------

const site = new DagModule(null, 'site')
site.moisture = defineFuelMoistureModule(site, 'moisture')
site.canopy = new DagModule(site, 'canopy')
site.slope = defineSlopeModule(site, 'slope')
site.wind = defineWindModule(site, 'wind')
site.surface = new DagModule(site, 'surface')
site.surface.primary = defineRothermelModule(site.surface, 'primary', Config.fuelDomainPrimary)
// console.log(Util.moduleTreeStr(site))
configureSite(site)

const dag = new Dag(NodeMap, 'Test')
const fuel = site.surface.primary.fuel
const {stdKey, dead, live} = fuel
const {tl1, tl10, tl100} = site.moisture.dead
const {herb, stem} = site.moisture.live
const bulk = fuel.bulk
const d1load = dead.element1.load

dag.select(bulk)
Util.logDagNodes(dag.selected(), 'Selected Nodes')

dag.set(stdKey, '10')
dag.set(tl1, 0.05)
dag.set(tl1, 0.07)
dag.set(tl1, 0.09)
dag.set(herb, 0.5)
dag.set(stem, 1.5)
Util.logDagNodes(dag.activeInputs(), 'Active Input Nodes')

dag.updateAll()
dump(bulk)
