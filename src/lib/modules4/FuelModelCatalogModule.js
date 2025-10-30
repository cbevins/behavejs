import { Dag } from './Dag.js'
import { Units as U } from './Units.js'
import { DagModule, DagNode } from './DagItems.js'
import { FuelModelModule } from './FuelModelModule.js'
import { FuelBedEquations as Bed } from '../index.js'
import { StandardFuelModelCatalog as Catalog } from '../index.js'

/**
 * FuelModelCatalogModule provides the FuelCellModule with the required:
 * - 5 dead FuelParticleModules (dead.element1, ... dead.element5),
 * - 5 live FuelParticleModules (live.element1, ... live.element5),
 * - a fuel bed depth, and
 * - a dead fuel extinction moisture content
 */
export class FuelModelCatalogModule extends FuelModelModule {
    /**
     * @param {DagModule} parentMod Reference to this DagItem's parent DagModule
     * @param {string} parentProp Parent's property name for this DagItem ('catalog')
     * @param {Config} configs Module containing all current configuration objects
     * @param {FuelMoistureModule} moistureMod
     */
    constructor(parentMod, parentProp, configs, moistureMod) {
        super(parentMod, parentProp)
        this._meta.configs = configs
        this._meta.modules = {moistureMod}

        // Additional nodes used by the standard fuel model catalog
        this.fuelKey = new DagNode(this, 'key', U.fuelKey)
        this.cured = new DagNode(this, 'cured', U.fraction)
        this.curedEst = new DagNode(this, 'curedEst', U.fraction)
        this.curedInp = new DagNode(this, 'curedInp', U.fraction)
    }

    config() {
        const {moistureMod} = this._meta.modules
        const {fuelCuring: curing, fuelDomain: domain} = this._meta.configs

        // Additional nodes used by the standard fuel model catalog
        this.fuelKey.input()
        this.curedEst.use(Bed.curedHerbFraction, [moistureMod.live.herb], curing)
        this.curedInp.input(curing)
        this.cured.bind(curing.value===curing.estimated ? this.curedEst : this.curedInp, curing)

        this.depth.use(Catalog.standardDepth, [this.fuelKey], domain)
        this.dead.mext.use(Catalog.standardMext, [this.fuelKey], domain)
        for(let i=1; i<=4; i++) {
            const el = 'element'+i
            this.dead[el].heat.use(Catalog.standardHeatDead, [this.fuelKey], domain)
            this.dead[el].dens.use(Catalog.standardDens, [], domain)
            this.dead[el].seff.use(Catalog.standardSeff, [], domain)
            this.dead[el].stot.use(Catalog.standardStot, [], domain)
        }
        for(let i=1; i<=2; i++) {
            const el = 'element'+i
            this.live[el].heat.use(Catalog.standardHeatLive, [this.fuelKey], domain)
            this.live[el].dens.use(Catalog.standardDens, [], domain)
            this.live[el].seff.use(Catalog.standardSeff, [], domain)
            this.live[el].stot.use(Catalog.standardStot, [], domain)
        }
        
        const d1 = this.dead.element1
        d1.type.use(Catalog.standardType1, [this.fuelKey], domain)
        d1.load.use(Catalog.standardLoad1, [this.fuelKey], domain)
        d1.savr.use(Catalog.standardSavr1, [this.fuelKey], domain)
        d1.mois.bind(moistureMod.dead.tl1, domain)

        const d2 = this.dead.element2
        d2.type.use(Catalog.standardType10, [this.fuelKey], domain)
        d2.load.use(Catalog.standardLoad10, [this.fuelKey], domain)
        d2.savr.use(Catalog.standardSavr10, [this.fuelKey], domain)
        d2.mois.bind(moistureMod.dead.tl10, domain)

        const d3 = this.dead.element3
        d3.type.use(Catalog.standardType100, [this.fuelKey], domain)
        d3.load.use(Catalog.standardLoad100, [this.fuelKey], domain)
        d3.savr.use(Catalog.standardSavr100, [this.fuelKey], domain)
        d3.mois.bind(moistureMod.dead.tl100, domain)

        const d4 = this.dead.element4
        d4.type.use(Catalog.standardTypeCured, [this.fuelKey], domain)
        d4.load.use(Catalog.standardLoadCured, [this.fuelKey, this.cured], domain)
        d4.savr.use(Catalog.standardSavrHerb, [this.fuelKey], domain)
        d4.mois.bind(moistureMod.dead.tl1, domain)

        const l1 = this.live.element1
        l1.type.use(Catalog.standardTypeUncured, [this.fuelKey], domain)
        l1.load.use(Catalog.standardLoadUncured, [this.fuelKey, this.cured], domain)
        l1.savr.use(Catalog.standardSavrHerb, [this.fuelKey], domain)
        l1.mois.bind(moistureMod.live.herb, domain)

        const l2 = this.live.element2
        l2.type.use(Catalog.standardTypeStem, [this.fuelKey], domain)
        l2.load.use(Catalog.standardLoadStem, [this.fuelKey], domain)
        l2.savr.use(Catalog.standardSavrStem, [this.fuelKey], domain)
        l2.mois.bind(moistureMod.live.stem, domain)
        return this
    }
}
