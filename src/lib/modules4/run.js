import { Dag } from './Dag.js'
import { DagModule, DagNode, NodeMap } from './DagItems.js'
import { Units as U } from './Units.js'
import { Util } from './Util.js'
import { FireVectorModule } from './FireVectorModule.js'
import { FuelCellModule } from './FuelCellModule.js'
import { FuelModelCatalogModule } from './FuelModelCatalogModule.js'
import { FuelMoistureModule } from './FuelMoistureModule.js'
import * as Config from './Configs.js'

console.log(new Date())

function buildSite(prop='site') {
    const site = new DagModule(null, prop)
    site.moisture = new FuelMoistureModule(site, 'moisture', Config)
    site.catalog = new FuelModelCatalogModule(site, 'catalog', site.moisture, Config)
    site.primary = new FuelCellModule(site, 'primary', site.catalog, Config)
    return site
}

function configureSite(site) {
    site.moisture.config()
    site.catalog.config()
    site.primary.config()
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

const {catalog, moisture, primary} = site

// FuelCellModelModule destructuring
const {fuelKey, cured, depth} = catalog

// FuelCellModule destructuring
const {dead, live, rxi, sink, source} = primary
const {element1:d1, element2:d2, element3:d3, element4:d4, element5:d5} = dead
const {element1:l1, element2:l2, element3:l3, element4:l4, element5:l5} = live

// FuelMoistureModule destructuring
const {tl1, tl10, tl100} = moisture.dead
const {herb, stem} = moisture.live

//------------------------------------------------------------------------------
// Dag construction and use
//------------------------------------------------------------------------------

const dag = new Dag(NodeMap, 'Test')
dag.select(
    primary.dead.area, primary.live.area,
    primary.dead.etam, primary.live.etam,
    primary.rxvo, primary.rxvm, primary.rxve,
    primary.sink, primary.source, primary.rxi)

// Set inputs
dag.set(fuelKey, '10')
dag.set(tl1, 0.05)
dag.set(tl10, 0.07)
dag.set(tl100, 0.09)
dag.set(herb, 0.5)
dag.set(stem, 1.5)
dag.updateAll()
Util.logDagNodes(dag.activeInputs(), 'Active Input Nodes')
Util.logDagNodes(dag.selected(), 'Selected Nodes')

Util.compare(primary.dead.load, 0.46)
Util.compare(primary.live.load, 0.092)

Util.compare(primary.dead.area, 9.154)
Util.compare(primary.live.area, 4.3125)

Util.compare(primary.dead.savr, 1888.860238693467)
Util.compare(primary.live.savr, 1500)

Util.compare(primary.dead.mois, 0.051626884422110553)
Util.compare(primary.live.mois, 1.5)

Util.compare(primary.dead.efol, 0.15704963842638839)
Util.compare(primary.live.efol, 0.065920880572788609)

Util.compare(primary.dead.etas, 0.41739692790939131)
Util.compare(primary.live.etas, 0.41739692790939131)

Util.compare(primary.bopt, 0.0073478593798598172)

Util.compare(primary.rxve, 0.35878365060452616)
Util.compare(primary.rxvm, 15.13331887756658)
Util.compare(primary.rxvo, 12.674359628667819)

Util.compare(primary.beta, 0.01725)
Util.compare(primary.brat, 2.3476224990480286)

Util.compare(primary.dead.drxi, 5539.9575948899355)
Util.compare(primary.live.drxi, 3677.5200629895871)

Util.compare(primary.dead.etam, 0.65206408989980214)
Util.compare(primary.live.etam, 0.59341294014849078)

Util.compare(primary.sink, 412.34037227937284)
Util.compare(primary.source, 0)
Util.compare(primary.rxi, 5794.6954002291168)