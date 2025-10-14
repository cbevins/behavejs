import {Units as U} from './Units.js'
import {DagModule, DagNode} from './DagItems.js'
import { Calc, FuelElementEquations as Fuel } from '../index.js'
import { FuelBedEquations as Bed } from '../index.js'
import { configRothermelFuelStandardModule } from './RothermelFuelStandardModule.js'

/**
 * Defines all the DagNodes within the Rothermel Fire and Fuel Model (1972)
 * @param {DagModule} parentMod Reference to the parent DagModule,
 *  usually  site.surface.primary, site.surface.secondary, or site.crown.active
 * @param {string} parentProp Parent's property name for this DagItem
 * @returns Reference to the new DagModule 
 */
export function defineRothermelFuelModule(parentMod, parentProp, configFuelDomain) {
    const mod = new DagModule(parentMod, parentProp)
    // Put these into defineRothermelFuelStandardModule()?
    if (configFuelDomain.value === configFuelDomain.standard) {
        mod.stdKey = new DagNode(mod, 'stdKey', U.fuelKey)
        mod.cured = new DagNode(mod, 'cured', U.fraction)
        mod.curedEst = new DagNode(mod, 'curedEst', U.fraction)
        mod.curedInp = new DagNode(mod, 'curedInp', U.fraction)
    }
    mod.area   = new DagNode(mod, 'area', U.fuelArea)
    mod.bulk   = new DagNode(mod, 'bulk', U.fuelBulk)
    mod.depth  = new DagNode(mod, 'depth', U.fuelDepth)
    mod.qig    = new DagNode(mod, 'qig', U.fuelQig)
    mod.beta   = new DagNode(mod, 'beta', U.ratio)
    mod.bopt   = new DagNode(mod, 'bopt', U.ratio)
    mod.brat   = new DagNode(mod, 'brat', U.ratio)
    mod.load   = new DagNode(mod, 'load', U.fuelLoad)
    mod.rxi    = new DagNode(mod, 'rxi', U.fireRxi)
    mod.rxve   = new DagNode(mod, 'rxve', U.factor)
    mod.rxvm   = new DagNode(mod, 'rxvm', U.fuelRxv)
    mod.rxvo   = new DagNode(mod, 'rxvo', U.fuelRxv)
    mod.savr   = new DagNode(mod, 'savr', U.fuelSavr)
    mod.savr15 = new DagNode(mod, 'savr15', U.fuelSavr)
    mod.sink   = new DagNode(mod, 'sink', U.fuelSink)
    mod.source = new DagNode(mod, 'source', U.fireRxi)
    mod.wsrf   = new DagNode(mod, 'wsrf', U.fraction, 'open canopy wind speed reduction factor')
    mod.xi     = new DagNode(mod, 'xi', U.ratio)

    // mod.<lcat>
    mod.dead = new DagModule(mod, 'dead')
    mod.live = new DagModule(mod, 'live')
    for(let lcat of [mod.dead, mod.live]) {
        lcat.area = new DagNode(lcat, 'area', U.fuelArea)
        lcat.drxi = new DagNode(lcat, 'drxi', U.fireRxi)
        if (lcat === mod.dead) lcat.efmc = new DagNode(lcat, 'efmc', U.fuelMois)
        lcat.efol = new DagNode(lcat, 'efol', U.fuelLoad)
        if (lcat === mod.dead) lcat.efwl = new DagNode(lcat, 'efwl', U.fuelLoad)
        lcat.etam = new DagNode(lcat, 'etam', U.fraction)
        lcat.etas = new DagNode(lcat, 'etas', U.fraction)
        lcat.heat = new DagNode(lcat, 'heat', U.fuelHeat)
        lcat.life = new DagNode(lcat, 'life', U.fuelLife).constant(lcat.prop()) // 'dead' or 'live'
        lcat.load = new DagNode(lcat, 'load', U.fuelLoad)
        lcat.mext = new DagNode(lcat, 'mext', U.fuelMois)
        if (lcat === mod.live) lcat.mextf = new DagNode(lcat, 'mextf', U.factor)
        lcat.mois = new DagNode(lcat, 'mois', U.fuelMois)
        lcat.net  = new DagNode(lcat, 'net', U.fuelLoad)
        lcat.qig  = new DagNode(lcat, 'qig', U.fuelQig)
        lcat.rxi  = new DagNode(lcat, 'rxi', U.fireRxi)
        lcat.savr = new DagNode(lcat, 'savr', U.fuelSavr)
        lcat.sawf = new DagNode(lcat, 'sawf', U.fuelWtg)
        lcat.scar = new DagNode(lcat, 'scar', U.fuelWtg)
        lcat.seff = new DagNode(lcat, 'seff', U.fraction)
        lcat.vol  = new DagNode(lcat, 'vol', U.fuelVol)
        // mod.<lcat>.element<n>
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
    return mod
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
        configRothermelFuelStandardModule(mod, moistureMod, domain, curing)
    } else {
        throw new Error(`Unknown config "${config.key}" value "${config.value}"`)
    }
}
