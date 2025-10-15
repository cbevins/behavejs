import { Dag } from './Dag.js'
import { Units as U } from './Units.js'
import { DagModule, DagNode } from './DagItems.js'
import { StandardFuelModelCatalog as Catalog } from '../index.js'
import { Calc, FuelElementEquations as Fuel } from '../index.js'
import { FuelBedEquations as Bed } from '../index.js'

export class RothermelFuelStandardModule extends DagModule {
    /**
     * 
     * @param {DagModule} parentMod RothermelFuelModule.domain
     * @param {*} parentProp 'standard'
     * @param {RothermelFuelModule} fuelMod RothermelFuelModule
     * @param {FuelMoistureModule} moistureMod 
     * @param {DagConfig} configDomain 
     * @param {DagConfig} configCuring 
     * @returns 
     */
    constructor(parentMod, parentProp, fuelMod, moistureMod, configDomain, configCuring) {
        super(parentMod, parentProp)
        this._meta.config = {domain: configDomain, curing: configCuring}
        this._meta.mod = {fuelMod, moistureMod}

        this.stdKey = new DagNode(this, 'stdKey', U.fuelKey)
        this.cured = new DagNode(this, 'cured', U.fraction)
        this.curedEst = new DagNode(this, 'curedEst', U.fraction)
        this.curedInp = new DagNode(this, 'curedInp', U.fraction)
    }

    config() {
        const {fuelMod, moistureMod} = this._meta.mod
        const {domain, curing} = this._meta.config

        this.stdKey.input(domain)
        this.curedEst.use(Bed.curedHerbFraction, [moistureMod.live.herb], curing)
        this.curedInp.input(curing)
        this.cured.bind(curing.value===curing.estimated ? this.curedEst : this.curedInp, curing)

        // Configure the RothermelFuelModule to use this RothermelFuelStandardModule
        fuelMod.depth.use(Catalog.standardDepth, [this.stdKey], domain)
        fuelMod.dead.mext.use(Catalog.standardMext, [this.stdKey], domain)
        for(let i=1; i<=5; i++) {
            const el = 'element'+i
            fuelMod.dead[el].heat.use(Catalog.standardHeatDead, [this.stdKey], domain)
            fuelMod.live[el].heat.use(Catalog.standardHeatLive, [this.stdKey], domain)
            for(let lcat of [fuelMod.dead[el], fuelMod.live[el]]) {
                lcat.dens.use(Catalog.standardDens, [], domain)
                lcat.seff.use(Catalog.standardSeff, [], domain)
                lcat.stot.use(Catalog.standardStot, [], domain)
            }
        }
        const d1 = fuelMod.dead.element1
        d1.type.use(Catalog.standardType1, [this.stdKey], domain)
        d1.load.use(Catalog.standardLoad1, [this.stdKey], domain)
        d1.savr.use(Catalog.standardSavr1, [this.stdKey], domain)
        d1.mois.bind(moistureMod.dead.tl1, domain)

        const d2 = fuelMod.dead.element2
        d2.type.use(Catalog.standardType10, [this.stdKey], domain)
        d2.load.use(Catalog.standardLoad10, [this.stdKey], domain)
        d2.savr.use(Catalog.standardSavr10, [this.stdKey], domain)
        d2.mois.bind(moistureMod.dead.tl10, domain)

        const d3 = fuelMod.dead.element3
        d3.type.use(Catalog.standardType100, [this.stdKey], domain)
        d3.load.use(Catalog.standardLoad100, [this.stdKey], domain)
        d3.savr.use(Catalog.standardSavr100, [this.stdKey], domain)
        d3.mois.bind(moistureMod.dead.tl100, domain)

        const d4 = fuelMod.dead.element4
        d4.type.use(Catalog.standardTypeCured, [this.stdKey], domain)
        d4.load.use(Catalog.standardLoadCured, [this.stdKey, this.cured], domain)
        d4.savr.use(Catalog.standardSavrHerb, [this.stdKey], domain)
        d4.mois.bind(moistureMod.dead.tl1, domain)

        const l1 = fuelMod.live.element1
        l1.type.use(Catalog.standardTypeUncured, [this.stdKey], domain)
        l1.load.use(Catalog.standardLoadUncured, [this.stdKey, this.cured], domain)
        l1.savr.use(Catalog.standardSavrHerb, [this.stdKey], domain)
        l1.mois.bind(moistureMod.live.herb, domain)

        const l2 = fuelMod.live.element2
        l2.type.use(Catalog.standardTypeStem, [this.stdKey], domain)
        l2.load.use(Catalog.standardLoadStem, [this.stdKey], domain)
        l2.savr.use(Catalog.standardSavrStem, [this.stdKey], domain)
        l2.mois.bind(moistureMod.live.stem, domain)
    }
}
