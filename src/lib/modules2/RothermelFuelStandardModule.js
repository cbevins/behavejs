import { Dag} from './Dag.js'
import { Units as U } from './Units.js'
import { DagModule, DagNode } from './DagItems.js'
import { StandardFuelModelCatalog as Catalog } from '../index.js'
import { Calc, FuelElementEquations as Fuel } from '../index.js'
import { FuelBedEquations as Bed } from '../index.js'

export function configRothermelFuelStandardModule(mod, moistureMod, domain, curing) {
    mod.stdKey.input(domain)
    mod.curedEst.use(Bed.curedHerbFraction, [moistureMod.live.herb], curing)
    mod.curedInp.input(curing)
    mod.cured.bind(curing.value===curing.estimated ? mod.curedEst : mod.curedInp, curing)
    mod.depth.use(Catalog.standardDepth, [mod.stdKey], domain)
    mod.dead.mext.use(Catalog.standardMext, [mod.stdKey], domain)
    for(let i=1; i<=5; i++) {
        const el = 'element'+i
        mod.dead[el].heat.use(Catalog.standardHeatDead, [mod.stdKey], domain)
        mod.live[el].heat.use(Catalog.standardHeatLive, [mod.stdKey], domain)
        for(let lcat of [mod.dead[el], mod.live[el]]) {
            lcat.dens.use(Catalog.standardDens, [], domain)
            lcat.seff.use(Catalog.standardSeff, [], domain)
            lcat.stot.use(Catalog.standardStot, [], domain)
        }
    }
    const d1 = mod.dead.element1
    d1.type.use(Catalog.standardType1, [mod.stdKey], domain)
    d1.load.use(Catalog.standardLoad1, [mod.stdKey], domain)
    d1.savr.use(Catalog.standardSavr1, [mod.stdKey], domain)
    d1.mois.bind(moistureMod.dead.tl1, domain)

    const d2 = mod.dead.element2
    d2.type.use(Catalog.standardType10, [mod.stdKey], domain)
    d2.load.use(Catalog.standardLoad10, [mod.stdKey], domain)
    d2.savr.use(Catalog.standardSavr10, [mod.stdKey], domain)
    d2.mois.bind(moistureMod.dead.tl10, domain)

    const d3 = mod.dead.element3
    d3.type.use(Catalog.standardType100, [mod.stdKey], domain)
    d3.load.use(Catalog.standardLoad100, [mod.stdKey], domain)
    d3.savr.use(Catalog.standardSavr100, [mod.stdKey], domain)
    d3.mois.bind(moistureMod.dead.tl100, domain)

    const d4 = mod.dead.element4
    d4.type.use(Catalog.standardTypeCured, [mod.stdKey], domain)
    d4.load.use(Catalog.standardLoadCured, [mod.stdKey, mod.cured], domain)
    d4.savr.use(Catalog.standardSavrHerb, [mod.stdKey], domain)
    d4.mois.bind(moistureMod.dead.tl1, domain)

    const l1 = mod.live.element1
    l1.type.use(Catalog.standardTypeUncured, [mod.stdKey], domain)
    l1.load.use(Catalog.standardLoadUncured, [mod.stdKey, mod.cured], domain)
    l1.savr.use(Catalog.standardSavrHerb, [mod.stdKey], domain)
    l1.mois.bind(moistureMod.live.herb, domain)

    const l2 = mod.live.element2
    l2.type.use(Catalog.standardTypeStem, [mod.stdKey], domain)
    l2.load.use(Catalog.standardLoadStem, [mod.stdKey], domain)
    l2.savr.use(Catalog.standardSavrStem, [mod.stdKey], domain)
    l2.mois.bind(moistureMod.live.herb, domain)
}
