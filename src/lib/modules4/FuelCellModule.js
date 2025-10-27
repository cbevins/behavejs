import { DagModule } from './DagItems.js'
import { CommonNodes as Common } from './CommonNodes.js'

import { Calc, FuelElementEquations as Fuel } from '../index.js'
import { FuelBedEquations as Bed } from '../index.js'

export class FuelCellModule extends DagModule {
    /**
     * @param {DagModule} parentMod Reference to this DagItem's parent DagModule
     * @param {string} parentProp Parent's property name for this DagItem ('fuel')
     * @param {FuelModelCatalogModule} catalogMod
     * @param {FuelModelCustomModule} customMod
     * @param {FuelModelChaparralModule} chaparralMod
     * @param {FuelModelPalmettoModule} palmettoMod
     * @param {FuelModelAspenModule} aspenMod
     * @param {Config} configs Module containing all current configuration objects
     */
    constructor(parentMod, parentProp, catalogMod, customMod, chaparralMod,
            palmettoMod, aspenMod, configs) {
        super(parentMod, parentProp)
        this._meta.configs = configs
        this._meta.modules = {catalogMod, customMod, chaparralMod, 
            palmettoMod, aspenMod}

        this.area   = Common.area(this)
        this.bulk   = Common.bulk(this)
        this.depth  = Common.depth(this)
        this.qig    = Common.qig(this)
        this.beta   = Common.beta(this)
        this.bopt   = Common.bopt(this)
        this.brat   = Common.brat(this)
        this.load   = Common.load(this)
        this.rxi    = Common.rxi(this)
        this.rxve   = Common.rxve(this)
        this.rxvm   = Common.rxvm(this)
        this.rxvo   = Common.rxvo(this)
        this.savr   = Common.savr(this)
        this.savr15 = Common.savr15(this)
        this.sink   = Common.sink(this)
        this.source = Common.source(this)
        this.fuelWsrf = Common.fuelWsrf(this)
        this.xi     = Common.xi(this)

        // this.<lcat>
        this.dead = new DagModule(this, 'dead')
        this.live = new DagModule(this, 'live')
        for(let lcat of [this.dead, this.live]) {
            lcat.area = Common.area(lcat)
            lcat.drxi = Common.drxi(lcat)
            if (lcat === this.dead) lcat.efmc = Common.efmc(lcat)
            lcat.efol = Common.efol(lcat)
            if (lcat === this.dead) lcat.efwl = Common.efwl(lcat)
            lcat.etam = Common.etam(lcat)
            lcat.etas = Common.etas(lcat)
            lcat.heat = Common.heat(lcat)
            lcat.life = Common.life(lcat).constant(lcat.prop())
            lcat.load = Common.load(lcat)
            lcat.mext = Common.mext(lcat)
            if (lcat === this.live) lcat.mextf = Common.mextf(lcat)
            lcat.mois = Common.mois(lcat)
            lcat.net  = Common.net(lcat)
            lcat.qig  = Common.qig(lcat)
            lcat.rxi  = Common.rxi(lcat)
            lcat.savr = Common.savr(lcat)
            lcat.sawf = Common.sawf(lcat)
            lcat.scar = Common.scar(lcat)
            lcat.seff = Common.seff(lcat)
            lcat.vol  = Common.vol(lcat)
            // this.<lcat>.element<n>
            for(let i=1; i<=5; i++) {
                const prop = 'element'+i
                lcat[prop] = new DagModule(lcat, prop)
                const el = lcat[prop]
                el.life = Common.life(el).constant(lcat.prop())
                // The following 8 props must be configured based on fuel domain
                el.type = Common.type(el)
                el.load = Common.load(el)
                el.savr = Common.savr(el)
                el.heat = Common.heat(el)
                el.dens = Common.dens(el)
                el.stot = Common.stot(el)
                el.seff = Common.seff(el)
                el.mois = Common.mois(el)
                // Each particle has 12 derived characteristics:
                el.area = Common.area(el)
                el.diam = Common.diam(el)
                el.ehn  = Common.ehn(el)
                el.efol = Common.efol(el)
                el.efwl = Common.efwl(el)
                el.leng = Common.leng(el)
                el.net  = Common.net(el)
                el.qig  = Common.qig(el)
                el.sawf = Common.sawf(el)
                el.scwf = Common.scwf(el)
                el.size = Common.size(el)
                el.vol  = Common.vol(el)
            }
        }
    }

    config() {
        const {fuelDomain: domain} = this._meta.configs
        const {catalogMod, customMod, chaparralMod, palmettoMod, aspenMod} = this._meta.modules

        // Fuel bed nodes
        this.area.use(Calc.sum, [this.dead.area,  this.live.area], domain)
        this.beta.use(Bed.packingRatio, [this.dead.vol, this.live.vol, this.depth], domain)
        this.bopt.use(Bed.optimumPackingRatio, [this.savr], domain)
        this.brat.use(Bed.packingRatioRatio, [this.beta, this.bopt], domain)
        this.bulk.use(Bed.bulkDensity, [this.load, this.depth], domain)
        this.load.use(Calc.sum, [this.dead.load, this.live.load], domain)
        this.qig.use(Bed.weightedHeatOfPreIgnition, [
            this.dead.sawf, this.dead.qig, this.live.sawf, this.live.qig], domain)
        // this.ehn.use(Bed.effectiveHeatingNumber, [this.savr], domain)
        this.rxve.use(Bed.reactionVelocityExponent, [this.savr], domain)
        this.rxvm.use(Bed.reactionVelocityMaximum, [this.savr15], domain)
        this.rxvo.use(Bed.reactionVelocityOptimum, [this.brat, this.rxvm, this.rxve], domain)
        this.savr.use(Bed.weightedSavr, [
            this.dead.sawf, this.dead.savr, this.live.sawf, this.live.savr], domain)
        this.savr15.use(Bed.savr15, [this.savr], domain)
        this.sink.use(Bed.heatSink, [this.bulk, this.qig], domain)
        this.rxi.use(Bed.reactionIntensity, [this.dead.rxi, this.live.rxi], domain)
        this.source.use(Bed.heatSource, [this.rxi, this.xi], domain)
        this.fuelWsrf.use(Bed.openWindSpeedAdjustmentFactor, [this.depth], domain)
        this.xi.use(Bed.propagatingFluxRatio, [this.savr, this.beta], domain)

        // Fuel life category nodes
        for(let life of ['dead', 'live']) {
            const lcat = this[life]
            lcat.life.constant(life) // 'dead' or 'live'
            const p1 = lcat.element1
            const p2 = lcat.element2
            const p3 = lcat.element3
            const p4 = lcat.element4
            const p5 = lcat.element5
            lcat.area.use(Calc.sum, [p1.area, p2.area, p3.area, p4.area, p5.area], domain)
            lcat.drxi.use(Bed.dryFuelReactionIntensity, [
                this.rxvo, lcat.net, lcat.heat, lcat.etas], domain)
            lcat.efol.use(Calc.sum, [p1.efol, p2.efol, p3.efol, p4.efol, p5.efol], domain)
            // The following 2 nodes only exist for the surface fire 'dead' category
            if (lcat.life.value === 'dead') {
                lcat.efwl.use(Calc.sum, [p1.efwl, p2.efwl, p3.efwl, p4.efwl, p5.efwl], domain)
                lcat.efmc.use(Calc.divide, [lcat.efwl, lcat.efol], domain)
            }
            lcat.etas.use(Bed.mineralDamping, [lcat.seff], domain)
            lcat.etam.use(Bed.moistureDamping, [lcat.mois, lcat.mext], domain)
            lcat.heat.use(Calc.sumOfProducts, [
                p1.sawf, p2.sawf, p3.sawf, p4.sawf, p5.sawf,
                p1.heat, p2.heat, p3.heat, p4.heat, p5.heat], domain)
            lcat.load.use(Calc.sum, [p1.load, p2.load, p3.load, p4.load, p5.load], domain)
            // The following 2 nodes only exist for the surface fire 'live' category
            if (lcat.life.value === 'live') {
                lcat.mextf.use(Bed.liveFuelExtinctionMoistureContentFactor, [
                    this.dead.efol, this.live.efol], domain)
                lcat.mext.use(Bed.liveFuelExtinctionMoistureContent, [
                    this.live.mextf, this.dead.efmc, this.dead.mext], domain)
            }
            lcat.mois.use(Calc.sumOfProducts, [
                p1.sawf, p2.sawf, p3.sawf, p4.sawf, p5.sawf,
                p1.mois, p2.mois, p3.mois, p4.mois, p5.mois], domain)
            // Note that this uses the *SIZE CLASS* weighting factors!!
            lcat.net.use(Calc.sumOfProducts, [
                p1.scwf, p2.scwf, p3.scwf, p4.scwf, p5.scwf,
                p1.net, p2.net, p3.net, p4.net, p5.net], domain)
            lcat.qig.use(Calc.sumOfProducts, [
                p1.sawf, p2.sawf, p3.sawf, p4.sawf, p5.sawf,
                p1.qig, p2.qig, p3.qig, p4.qig, p5.qig], domain)
            lcat.rxi.use(Calc.multiply, [lcat.drxi, lcat.etam], domain)
            lcat.savr.use(Calc.sumOfProducts, [
                p1.sawf, p2.sawf, p3.sawf, p4.sawf, p5.sawf,
                p1.savr, p2.savr, p3.savr, p4.savr, p5.savr], domain)
            lcat.sawf.use(Fuel.surfaceAreaWeightingFactor, [lcat.area, this.area], domain)
            lcat.scar.use(Bed.sizeClassWeightingFactorArray, [
                p1.area, p1.size,
                p2.area, p2.size,
                p3.area, p3.size,
                p4.area, p4.size,
                p5.area, p5.size], domain)
            lcat.seff.use(Calc.sumOfProducts, [
                p1.sawf, p2.sawf, p3.sawf, p4.sawf, p5.sawf,
                p1.seff, p2.seff, p3.seff, p4.seff, p5.seff], domain)
            lcat.vol.use(Calc.sum, [p1.vol, p2.vol, p3.vol, p4.vol, p5.vol], domain)
        }
        // This is where the FuelCellModule is bound to a fuel domain
        let model
        if (domain.value === domain.catalog) model = catalogMod
        else if (domain.value === domain.custom) model = customMod
        else if (domain.value === domain.chaparral) model = chaparralMod
        else if (domain.value === domain.palmetto) model = palmettoMod
        else if (domain.value === domain.aspen) model = aspenMod
        else throw new Error(`Unknown config "${domain.key}" value "${domain.value}"`)
        if (!model)
            throw new Error(`The fuel domain "${domain.value}" is not yet implemented.`)
        
        // Fuel element nodes
        this.depth.bind(model.depth, domain)
        this.dead.mext.bind(model.dead.mext)
        for(let life of ['dead', 'live']) {
            const lcat = this[life]
            for(let el of ['element1', 'element2', 'element3', 'element4', 'element5']) {
                // The following 8 props must be bound to the fuel domain model
                const p = this[life][el]
                const m = model[life][el]
                p.type.bind(m.type, domain)
                p.load.bind(m.load, domain)
                p.savr.bind(m.savr, domain)
                p.heat.bind(m.heat, domain)
                p.dens.bind(m.dens, domain)
                p.stot.bind(m.stot, domain)
                p.seff.bind(m.seff, domain)
                p.mois.bind(m.mois, domain)
                // The following are derived
                p.area.use(Fuel.surfaceArea, [p.load, p.savr, p.dens], domain)
                p.diam.use(Fuel.cylindricalDiameter, [p.savr], domain)
                p.efol.use(Fuel.effectiveFuelLoad, [p.savr, p.load, p.life], domain)
                p.efwl.use(Fuel.effectiveFuelWaterLoad, [p.efol, p.mois], domain)
                p.ehn.use(Fuel.effectiveHeatingNumber, [p.savr], domain)
                p.leng.use(Fuel.cylindricalLength, [p.diam, p.vol], domain)
                p.net.use(Fuel.netOvendryLoad, [p.load, p.stot], domain)
                p.qig.use(Fuel.heatOfPreignition, [p.mois, p.ehn], domain)
                p.sawf.use(Fuel.surfaceAreaWeightingFactor, [p.area, lcat.area], domain)
                p.scwf.use(Fuel.sizeClassWeightingFactor, [p.size, lcat.scar], domain)
                p.size.use(Fuel.sizeClass, [p.savr], domain)
                p.vol.use(Fuel.volume, [p.load, p.dens], domain)
            }
        }
        return this
    }
}