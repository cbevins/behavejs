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
    primary.model.catalog = new FuelModelCatalogModule(primary.model, 'catalog', site.moisture, Config)
    primary.fuel = new FuelCellModule(primary, 'fuel', primary.model.catalog, Config)
    primary.fire = new FireCellModule(primary, 'fire',
        primary.fuel, site.wind, site.slope, site.canopy, Config)
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

const {canopy,  moisture, primary, slope, wind} = site

// Primary FireCellModule destructuring
const {model:pmodel, fuel:pfuel, fire:pfire} = primary
const {catalog:pcatalog} = pmodel
const {fuelKey:pfuelKey, cured:pcured, depth:pdepth} = pcatalog

const {dead:pdead, live:plive, rxi:prxi, sink:psink, source:psource} = pfuel
const {element1:pd1, element2:pd2, element3:pd3, element4:pd4, element5:pd5} = pdead
const {element1:pl1, element2:pl2, element3:pl3, element4:pl4, element5:pl5} = plive

// FuelMoistureModule destructuring
const {tl1, tl10, tl100} = moisture.dead
const {herb, stem} = moisture.live

//------------------------------------------------------------------------------
// Dag construction and use
//------------------------------------------------------------------------------

const dag = new Dag(NodeMap, 'Test')
dag.select(
    pdead.area, plive.area,
    pdead.etam, plive.etam,
    pfuel.rxvo, pfuel.rxvm, pfuel.rxve,
    psink, psource, prxi)

// Set inputs
dag.set(pfuelKey, '10')
dag.set(tl1, 0.05)
dag.set(tl10, 0.07)
dag.set(tl100, 0.09)
dag.set(herb, 0.5)
dag.set(stem, 1.5)
dag.updateAll()
Util.logDagNodes(dag.activeInputs(), 'Active Input Nodes')
Util.logDagNodes(dag.selected(), 'Selected Nodes')

Util.compare(pdead.load, 0.46)
Util.compare(plive.load, 0.092)

Util.compare(pdead.area, 9.154)
Util.compare(plive.area, 4.3125)

Util.compare(pdead.savr, 1888.860238693467)
Util.compare(plive.savr, 1500)

Util.compare(pdead.mois, 0.051626884422110553)
Util.compare(plive.mois, 1.5)

Util.compare(pdead.efol, 0.15704963842638839)
Util.compare(plive.efol, 0.065920880572788609)

Util.compare(pdead.etas, 0.41739692790939131)
Util.compare(plive.etas, 0.41739692790939131)

Util.compare(pfuel.bopt, 0.0073478593798598172)

Util.compare(pfuel.rxve, 0.35878365060452616)
Util.compare(pfuel.rxvm, 15.13331887756658)
Util.compare(pfuel.rxvo, 12.674359628667819)

Util.compare(pfuel.beta, 0.01725)
Util.compare(pfuel.brat, 2.3476224990480286)

Util.compare(pdead.drxi, 5539.9575948899355)
Util.compare(plive.drxi, 3677.5200629895871)

Util.compare(pdead.etam, 0.65206408989980214)
Util.compare(plive.etam, 0.59341294014849078)

Util.compare(pfuel.sink, 412.34037227937284)
Util.compare(pfuel.source, 0)
Util.compare(pfuel.rxi, 5794.6954002291168)