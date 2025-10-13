import * as Config from './Configs.js'
import { Dag } from './Dag.js'
import { DagModule, DagNode, NodeMap } from './DagItems.js'
import { Util } from './Util.js'
import { defineFuelMoistureModule, configFuelMoistureModule } from './FuelMoistureModule.js'
import { defineRothermelModule } from './defineRothermelModule.js'
import { configRothermelModule } from './configRothermelModule.js'
console.log(new Date())

function dump(node) {
    const {_meta, value, units, updater, suppliers, config, consumers, dirty, status} = node
    const {key, parent, prop, label, isNode} = _meta
    console.log(`Node "${key}" = [${value}] ${status} ${dirty} ${updater.name}`)
}
//------------------------------------------------------------------------------
/*
    moisture/ FuelMoistureModule [configMoistureDead, configMoistureLive]
        dead/
        live/

    wind/
    slope/

    surface/ SurfaceModule 
        primary/
            fire/ SurfaceFireModule [configEffectiveWindLimit] (fuelMod, windMod, slopeMod) 
                phiw, phis, phiew
                ros, fli, flame, hpua, effwind, lwr
                dir/
                    upslope, north 
                step1/
                ...
                step8/
                    ros, effwind
            fuel/ FuelBedModule [configFuelDomain] (moisMod)
                depth, sa, load, bulk, savr, etas, etam rxi, sink, source, qig, xi
                beta/
                    packing, opt, ratio
                rxi/
                    opt, min, exp
                dead/ FuelLifeModule [configFuelDomain] (moisMod)
                    mext, etas, etam, drxi, sa, load, wtg
                    element1/ FuelElementModule [configFuelDomain] (moisMod)
                        input/ (moisMod)
                            load, savr, heat, dens, stot, seff, mois type
                        derived/
                            sa, size, net, ehn, efwl, qig
                        weighting factor/
                            sa, size
                    ...
                    element5/ FuelElementModule [configFuelDomain] (moisMod)
                live/ FuelLifeModule [configFuelDomain] (moisMod)
                    mext, mextf, etas, etam, drxi, sa, load, wtg
                    element1/ FuelElementModule [configFuelDomain] (moisMod)
                    ...
                    element5/ FuelElementModule [configFuelDomain] (moisMod)
                slope/
                    k
                wind/
                    open canopy wsrf
                    midflame
                    factor/
                        b, c, e, k, i
*/
function configureSite(site) {
    configFuelMoistureModule(site.moisture, Config.fuelMoistureDead, Config.fuelMoistureLive)
    configRothermelModule(site.surface.primary, site.moisture, site.wind, site.slope,
        Config.fuelDomainPrimary, Config.fireEffWindLimit, Config.fuelCuring)
}
const site = new DagModule(null, 'site')
site.moisture = defineFuelMoistureModule(site, 'moisture')

site.slope = new DagModule(site, 'slope') // to be replaced by buildSlopeModule()
site.wind = new DagModule(site, 'wind') // to be replaced by buildWindModule()

site.surface = new DagModule(site, 'surface')
site.surface.primary = defineRothermelModule(site.surface, 'primary', Config.fuelDomainPrimary)
configureSite(site)
// console.log(Util.moduleTreeStr(site))

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
