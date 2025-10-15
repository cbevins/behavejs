import { Units as U } from './Units.js'
import { DagModule, DagNode } from './DagItems.js'
import { Calc, FuelElementEquations as Fuel } from '../index.js'
import { FuelBedEquations as Bed } from '../index.js'
import { RothermelFuelStandardModule } from './RothermelFuelStandardModule.js'

/**
 * Defines all the DagNodes within the Rothermel Fire and Fuel Model (1972)
 * @param {DagModule} parentMod Reference to the parent DagModule,
 *  usually  site.surface.primary, site.surface.secondary, or site.crown.active
 * @param {string} parentProp Parent's property name for this DagItem
 * @param {DagConfig} configDomain Either Config.fuelDomainPrimary or Config.fuelDomainSecondary
 * @returns Reference to the new DagModule 
 */
export class RothermelFuelModule extends DagModule {
    /**
     * 
     * @param {RothermelFireModule} parentMod 
     * @param {string} parentProp 'fuel'
     * @param {FuelMoistureModule} moistureMod 
     * @param {DagConfig} configDomain 
     * @param {DagConfig} configCuring 
     */
    constructor(parentMod, parentProp, moistureMod, configDomain, configCuring) {
        super(parentMod, parentProp)
        this._meta.config = {configDomain, configCuring}
        this._meta.mod = {moistureMod}

        const domain = this.domain = new DagModule(this, 'domain')
        // Create some empty modules to be built below
        domain.standard = new DagModule(domain, 'standard')
        domain.custom = new DagModule(domain, 'custom')
        domain.chaparral = new DagModule(domain, 'chaparral')
        domain.palemtto = new DagModule(domain, 'palmetto')
        domain.aspen = new DagModule(domain, 'aspen')
        if (configDomain.value === configDomain.standard) {
            // Pass *this* as the fuelMod arg, as it must be a RothermelFuelModule
            domain.standard = new RothermelFuelStandardModule(domain, 'standard',
                this,           // RothermelFuelModule
                moistureMod,    // FuelMoistureModule
                configDomain,   // DagConfig
                configCuring)   // DagConfig
        }

        this.area   = new DagNode(this, 'area', U.fuelArea)
        this.bulk   = new DagNode(this, 'bulk', U.fuelBulk)
        this.depth  = new DagNode(this, 'depth', U.fuelDepth)
        this.qig    = new DagNode(this, 'qig', U.fuelQig)
        this.beta   = new DagNode(this, 'beta', U.ratio)
        this.bopt   = new DagNode(this, 'bopt', U.ratio)
        this.brat   = new DagNode(this, 'brat', U.ratio)
        this.load   = new DagNode(this, 'load', U.fuelLoad)
        this.rxi    = new DagNode(this, 'rxi', U.fireRxi)
        this.rxve   = new DagNode(this, 'rxve', U.factor)
        this.rxvm   = new DagNode(this, 'rxvm', U.fuelRxv)
        this.rxvo   = new DagNode(this, 'rxvo', U.fuelRxv)
        this.savr   = new DagNode(this, 'savr', U.fuelSavr)
        this.savr15 = new DagNode(this, 'savr15', U.fuelSavr)
        this.sink   = new DagNode(this, 'sink', U.fuelSink)
        this.source = new DagNode(this, 'source', U.fireRxi)
        this.wsrf   = new DagNode(this, 'wsrf', U.fraction, 'open canopy wind speed reduction factor')
        this.xi     = new DagNode(this, 'xi', U.ratio)

        // this.<lcat>
        this.dead = new DagModule(this, 'dead')
        this.live = new DagModule(this, 'live')
        for(let lcat of [this.dead, this.live]) {
            lcat.area = new DagNode(lcat, 'area', U.fuelArea)
            lcat.drxi = new DagNode(lcat, 'drxi', U.fireRxi)
            if (lcat === this.dead) lcat.efmc = new DagNode(lcat, 'efmc', U.fuelMois)
            lcat.efol = new DagNode(lcat, 'efol', U.fuelLoad)
            if (lcat === this.dead) lcat.efwl = new DagNode(lcat, 'efwl', U.fuelLoad)
            lcat.etam = new DagNode(lcat, 'etam', U.fraction)
            lcat.etas = new DagNode(lcat, 'etas', U.fraction)
            lcat.heat = new DagNode(lcat, 'heat', U.fuelHeat)
            lcat.life = new DagNode(lcat, 'life', U.fuelLife).constant(lcat.prop()) // 'dead' or 'live'
            lcat.load = new DagNode(lcat, 'load', U.fuelLoad)
            lcat.mext = new DagNode(lcat, 'mext', U.fuelMois)
            if (lcat === this.live) lcat.mextf = new DagNode(lcat, 'mextf', U.factor)
            lcat.mois = new DagNode(lcat, 'mois', U.fuelMois)
            lcat.net  = new DagNode(lcat, 'net', U.fuelLoad)
            lcat.qig  = new DagNode(lcat, 'qig', U.fuelQig)
            lcat.rxi  = new DagNode(lcat, 'rxi', U.fireRxi)
            lcat.savr = new DagNode(lcat, 'savr', U.fuelSavr)
            lcat.sawf = new DagNode(lcat, 'sawf', U.fuelWtg)
            lcat.scar = new DagNode(lcat, 'scar', U.fuelWtg)
            lcat.seff = new DagNode(lcat, 'seff', U.fraction)
            lcat.vol  = new DagNode(lcat, 'vol', U.fuelVol)
            // this.<lcat>.element<n>
            for(let i=1; i<=5; i++) {
                const prop = 'element'+i
                lcat[prop] = new DagModule(lcat, prop)
                const el = lcat[prop]
                el.life = new DagNode(el, 'life', U.fuelLife).constant(lcat.prop())
                // The following 8 props must be configured based on fuel domain
                el.type = new DagNode(el, 'type', U.fuelType)
                el.load = new DagNode(el, 'load', U.fuelLoad)
                el.savr = new DagNode(el, 'savr', U.fuelSavr)
                el.heat = new DagNode(el, 'heat', U.fuelHeat)
                el.dens = new DagNode(el, 'dens', U.fuelDens)
                el.stot = new DagNode(el, 'stot', U.fuelStot)
                el.seff = new DagNode(el, 'seff', U.fuelSeff)
                el.mois = new DagNode(el, 'mois', U.fuelMois)
                // Each particle has 12 derived characteristics:
                el.area = new DagNode(el, 'area', U.fuelArea)
                el.diam = new DagNode(el, 'diam', U.fuelLeng)
                el.ehn  = new DagNode(el, 'ehn', U.fraction)
                el.efol = new DagNode(el, 'efol', U.fuelLoad)
                el.efwl = new DagNode(el, 'efwl', U.fuelLoad)
                el.leng = new DagNode(el, 'leng', U.fuelLeng)
                el.net  = new DagNode(el, 'net', U.fuelLoad)
                el.qig  = new DagNode(el, 'qig', U.fuelQig)
                el.sawf = new DagNode(el, 'sawf', U.fuelWtg)
                el.scwf = new DagNode(el, 'scwf', U.fuelWtg)
                el.size = new DagNode(el, 'size', U.fuelSize)
                el.vol  = new DagNode(el, 'vol', U.fuelVol)
            }
        }
    }

    config() {
        const {configDomain: domain, configCuring: curing} = this._meta.config
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
        this.wsrf.use(Bed.openWindSpeedAdjustmentFactor, [this.depth], domain)
        this.xi.use(Bed.propagatingFluxRatio, [this.savr, this.beta], domain)

        // Fuel life category nodes
        for(let lcat of [this.dead, this.live]) {
            lcat.life.constant(lcat.prop()) // 'dead' or 'live'
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

            // Fuel element nodes
            for(let p of [p1, p2, p3, p4, p5]) {
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

        // Fuel domain configuration
        if (domain.value === domain.standard) {
            this.domain.standard.config()
        } else {
            throw new Error(`Unknown config "${config.key}" value "${config.value}"`)
        }
    }
}