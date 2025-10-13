import {Dag} from './Dag.js'
import {Units as U} from './Units.js'
import {DagModule, DagNode} from './DagItems.js'
import { StandardFuelModelCatalog as Catalog } from '../index.js'
import { Calc, FuelElementEquations as Fuel } from '../index.js'
import { FuelBedEquations as Bed } from '../index.js'

/**
 *
 * @param {DagModule} parentMod Reference to the parent DagModule,
 *  usually  site.surface.primary, site.surface.secondary, or site.crown.active
 * @param {string} parentProp Parent's property name for this DagItem
 * @returns Reference to the new DagModule 
 */
export function configRothermelModule(mod, moistureMod, windMod, slopeMod,
        configFuelDomain, configFireEffWindLimit, configFuelCuring) {
    configRothermelFireModule(mod.fire, configFireEffWindLimit)
    configRothermelFuelModule(mod.fuel, moistureMod, configFuelDomain, configFuelCuring)
}

export function configRothermelFireModule(mod, config) {
    if (config.value === config.applied) {
    } else if (config.value === config.notApplied) {
    } else {
        throw new Error(`Unknown config "${config.key}" value "${config.value}"`)
    }
}

/**
 * 
 * @param {DagModule} parentMod Reference to the parent DagModule
 * @param {string} parentProp Parent's property name for this DagItem
 */
export function configRothermelFuelModule(mod, moistureMod, domain, curing) {

    // Fuel bed nodes
    mod.area.use(Calc.sum, [mod.dead.area,  mod.live.area], domain)
    mod.beta.use(Bed.packingRatio, [mod.dead.vol, mod.live.vol, mod.depth], domain)
    mod.bopt.use(Bed.optimumPackingRatio, [mod.savr], domain)
    mod.brat.use(Bed.packingRatioRatio, [mod.beta, mod.bopt], domain)
    mod.bulk.use(Bed.bulkDensity, [mod.load, mod.depth], domain)
    mod.load.use(Calc.sum, [mod.dead.load, mod.live.load], domain)
    mod.qig.use(Bed.weightedHeatOfPreIgnition, [
        mod.dead.sawf, mod.dead.qig, mod.live.sawf, mod.live.qig], domain)
    // mod.ehn.use(Bed.effectiveHeatingNumber, [mod.savr], domain)
    mod.rxve.use(Bed.reactionVelocityExponent, [mod.savr], domain)
    mod.rxvm.use(Bed.reactionVelocityMaximum, [mod.savr15], domain)
    mod.rxvo.use(Bed.reactionVelocityOptimum, [mod.brat, mod.rxvm, mod.rxve], domain)
    mod.savr.use(Bed.weightedSavr, [
        mod.dead.sawf, mod.dead.savr, mod.live.sawf, mod.live.savr], domain)
    mod.savr15.use(Bed.savr15, [mod.savr], domain)
    mod.sink.use(Bed.heatSink, [mod.bulk, mod.qig], domain)
    mod.rxi.use(Bed.reactionIntensity, [mod.dead.rxi, mod.live.rxi], domain)
    mod.source.use(Bed.heatSource, [mod.rxi, mod.xi], domain)
    mod.wsrf.use(Bed.openWindSpeedAdjustmentFactor, [mod.depth], domain)
    mod.xi.use(Bed.propagatingFluxRatio, [mod.savr, mod.beta], domain)

    // Fuel life category nodes
    for(let lcat of [mod.dead, mod.live]) {
        lcat.life.constant(lcat.prop()) // 'dead' or 'live'
        const p1 = lcat.element1
        const p2 = lcat.element2
        const p3 = lcat.element3
        const p4 = lcat.element4
        const p5 = lcat.element5
        lcat.area.use(Calc.sum, [p1.area, p2.area, p3.area, p4.area, p5.area], domain)
        lcat.drxi.use(Bed.dryFuelReactionIntensity, [
            mod.rxvo, lcat.net, lcat.heat, lcat.etas], domain)
        lcat.efol.use(Calc.sum, [p1.efol, p2.efol, p3.efol, p4.efol, p5.efol], domain)
        // The following 2 nodes only exist for the surface fire 'dead' category
        if (lcat.life === 'dead') {
            lcat.efwl.use(Calc.sum, [p1.efwl, p2.efwl, p3.efwl, p4.efwl, p5.efwl], domain)
            lcat.efmc.use(Calc.divide, [dead.efwl, dead.efol], domain)
        }
        lcat.etas.use(Bed.mineralDamping, [lcat.seff], domain)
        lcat.etam.use(Bed.moistureDamping, [lcat.mois, lcat.mext], domain)
        lcat.heat.use(Calc.sumOfProducts, [
            p1.sawf, p2.sawf, p3.sawf, p4.sawf, p5.sawf,
            p1.heat, p2.heat, p3.heat, p4.heat, p5.heat], domain)
        lcat.load.use(Calc.sum, [p1.load, p2.load, p3.load, p4.load, p5.load], domain)
        // The following 2 nodes only exist for the surface fire 'live' category
        if (lcat.life === 'live') {
            lcat.mextf.use(Bed.liveFuelExtinctionMoistureContentFactor, [
                mod.dead.efol, mod.live.efol], domain)
            lcat.mext.use(Bed.liveFuelExtinctionMoistureContent, [
                mod.live.mextf, mod.dead.efmc, mod.dead.mext], domain)
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
        lcat.sawf.use(Fuel.surfaceAreaWeightingFactor, [lcat.area, mod.area], domain)
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
        configFuelDomainStandard(mod, moistureMod, domain, curing)
    } else {
        throw new Error(`Unknown config "${config.key}" value "${config.value}"`)
    }
}

export function configFuelDomainStandard(mod, moistureMod, domain, curing) {
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
