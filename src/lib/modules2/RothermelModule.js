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
export function buildRothermelModule(parentMod, parentProp,
        moistureMod, windMod, slopeMod,
        configFuelDomain, configFireEffWindLimit, configCuring) {
    const mod = new DagModule(parentMod, parentProp)
    mod.fire = buildRothermelFireModule(mod, 'fire',
        windMod, slopeMod, configFireEffWindLimit)
    mod.fuel = buildRothermelFuelModule(mod, 'fuel',
        moistureMod, configFuelDomain, configCuring)
    return mod
}

/**
 * 
 * @param {DagModule} parentMod Reference to the parent DagModule
 *  usually  site.surface.primary.fire, site.surface.secondary.fire,
 *  or site.crown.active.fire
 * @param {string} parentProp Parent's property name for this DagItem
 * @returns Reference to the new DagModule 
 */
export function buildRothermelFireModule(parentMod, parentProp,
        windMod, slopeMod, configFireEffWindLimit) {
    const mod = new DagModule(parentMod, parentProp)
    mod.dir   = new DagNode(mod, 'dir', U.compass)
    mod.flame = new DagNode(mod, 'flame', U.fireFlame)
    mod.fli   = new DagNode(mod, 'fli', U.fireFli)
    mod.hpua  = new DagNode(mod, 'hpua', U.fireHpua)
    mod.lwr   = new DagNode(mod, 'lwr', U.ratio)
    mod.ros   = new DagNode(mod, 'ros', U.fireRos)
    mod.rosA  = new DagNode(mod, 'rosA', U.fireRos)
    mod.rosH  = new DagNode(mod, 'rosH', U.fireRos)
    configRothermelFireModule(mod, configFireEffWindLimit)
    return mod
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
export function buildRothermelFuelModule(parentMod, parentProp,
        moistureMod, configFuelDomain, configFuelCuring) {
    // First create the base fuel module then add items specific to the fuel domain
    const mod = new DagModule(parentMod, parentProp)
    if (configFuelDomain.value === configFuelDomain.standard) {
        mod.stdKey = new DagNode(mod, 'stdKey', U.fuelKey)
        mod.cured = new DagNode(mod, 'cured', U.fraction)
        mod.curedEst = new DagNode(mod, 'curedEst', U.fraction)
        .use(Bed.curedHerbFraction, [moistureMod.live.herb])
        mod.curedInp = new DagNode(mod, 'curedInp', U.fraction).input()
    }
    // Now add items common to all fuel domains
    mod.depth = new DagNode(mod, 'depth', U.fuelDepth)
    mod.rxvo = new DagNode(mod, 'rxvo', U.fuelRxv)  // used by life cat dry rxi

    // Create fuel life category modules
    mod.dead = new DagModule(mod, 'dead')
    mod.live = new DagModule(mod, 'live')
    for(let lcat of [mod.dead, mod.live]) {
        lcat.life = new DagNode(lcat, 'life', U.fuelLife).constant(lcat.prop()) // 'dead' or 'live'
        // The following must be declared here and then configured later from its elements
        lcat.sa = new DagNode(lcat, 'sa', U.fuelArea)
        lcat.scar = new DagNode(lcat, 'scar', U.fuelWtg)
        lcat.mext = new DagNode(lcat, 'mext', U.fuelMois)
        for(let i=1; i<=5; i++) {
            lcat['element'+i] = buildRothermelElementModule(lcat, 'element'+i,
                moistureMod, configFuelDomain)
        }
        const p1 = lcat.element1
        const p2 = lcat.element2
        const p3 = lcat.element3
        const p4 = lcat.element4
        const p5 = lcat.element5
        // The following can be declared and configured as there is only 1 possible configuration
        lcat.etas = new DagNode(lcat, 'etas', U.fraction)
            .use(Bed.mineralDamping, [lcat.seff])
        lcat.etam = new DagNode(lcat, 'etam', U.fraction)
            .use(Bed.moistureDamping, [lcat.mois, lcat.mext])
        lcat.heat = new DagNode(lcat, 'heat', U.fuelHeat)
            .use(Calc.sumOfProducts, [
                p1.sawf, p2.sawf, p3.sawf, p4.sawf, p5.sawf,
                p1.heat, p2.heat, p3.heat, p4.heat, p5.heat])
        lcat.load = new DagNode(lcat, 'load', U.fuelLoad)
            .use(Calc.sum, [p1.load, p2.load, p3.load, p4.load, p5.load])
        lcat.efol = new DagNode(lcat, 'efol', U.fuelLoad)
            .use(Calc.sum, [p1.efol, p2.efol, p3.efol, p4.efol, p5.efol])
        lcat.mois = new DagNode(lcat, 'mois', U.fuelMois)
            .use(Calc.sumOfProducts, [
                p1.sawf, p2.sawf, p3.sawf, p4.sawf, p5.sawf,
                p1.mois, p2.mois, p3.mois, p4.mois, p5.mois])
        lcat.vol = new DagNode(lcat, 'vol', U.fuelVol)
            .use(Calc.sum, [p1.vol, p2.vol, p3.vol, p4.vol, p5.vol])
        lcat.qig = new DagNode(lcat, 'qig', U.fuelQig)
            .use(Calc.sumOfProducts, [
                p1.sawf, p2.sawf, p3.sawf, p4.sawf, p5.sawf,
                p1.qig, p2.qig, p3.qig, p4.qig, p5.qig])
        lcat.rxi = new DagNode(lcat, 'rxi', U.fireRxi)
            .use(Calc.multiply, [lcat.drxi, lcat.etam])
        lcat.drxi = new DagNode(lcat, 'drxi', U.fireRxi)
            .use(Bed.dryFuelReactionIntensity, [
                mod.rxvo, lcat.net, lcat.heat, lcat.etas])
        lcat.savr = new DagNode(lcat, 'savr', U.fuelSavr)
            .use(Calc.sumOfProducts, [
                p1.sawf, p2.sawf, p3.sawf, p4.sawf, p5.sawf,
                p1.savr, p2.savr, p3.savr, p4.savr, p5.savr])
        lcat.seff = new DagNode(lcat, 'seff', U.fraction)
            .use(Calc.sumOfProducts, [
                p1.sawf, p2.sawf, p3.sawf, p4.sawf, p5.sawf,
                p1.seff, p2.seff, p3.seff, p4.seff, p5.seff])
        // Note that this uses the *SIZE CLASS* weighting factors!!
        lcat.net = new DagNode(lcat, 'net', U.fuelLoad)
            .use(Calc.sumOfProducts, [
                p1.scwf, p2.scwf, p3.scwf, p4.scwf, p5.scwf,
                p1.net, p2.net, p3.net, p4.net, p5.net])

        // The following nodes only exist for the surface fire 'dead' category
        if (lcat.life === 'dead') {
            lcat.efwl = new DagNode(lcat, 'efwl', U.fuelLoad)
                .use(Calc.sum, [p1.efwl, p2.efwl, p3.efwl, p4.efwl, p5.efwl])
            lcat.efmc = new DagNode(lcat, 'efmc', U.fuelMois)
                .use(Calc.divide, [dead.efwl, dead.efol])
        } else {
        // The following nodes only exist for the surface fire 'live' category
            lcat.mextf = new DagNode(lcat, 'mextf', U.factor)
                .use(Bed.liveFuelExtinctionMoistureContentFactor, [mod.dead.efol, mod.live.efol])
            lcat.mext = new DagNode(lcat, 'mext', U.fuelMois)
                .use(Bed.liveFuelExtinctionMoistureContent, [
                    mod.live.mextf, mod.dead.efmc, mod.dead.mext])
        }
    }

    mod.load = new DagNode(mod, 'load', U.fuelLoad)
        .use(Calc.sum, [mod.dead.load, mod.live.load])
    mod.bulk = new DagNode(mod, 'bulk', U.fuelBulk)
        .use(Bed.bulkDensity, [mod.load, mod.depth])

    // These use surface area weighting factors
    mod.sa = new DagNode(mod, 'sa', U.fuelArea)
        .use(Calc.sum, [mod.dead.sa,  mod.live.sa])
    mod.dead.sawf = new DagNode(mod, 'sawf', U.fuelWtg)
        .use(Fuel.surfaceAreaWeightingFactor, [mod.dead.sa, mod.sa])
    mod.live.sawf = new DagNode(mod, 'sawf', U.fuelWtg)
        .use(Fuel.surfaceAreaWeightingFactor, [mod.live.sa, mod.sa])
    mod.savr = new DagNode(mod, 'savr', U.fuelSavr)
        .use(Bed.weightedSavr, [
            mod.dead.sawf, mod.dead.savr, mod.live.sawf, mod.live.savr])
    mod.qig = new DagNode(mod, 'qig', U.fuelQig)
        .use(Bed.weightedHeatOfPreIgnition, [
            mod.dead.sawf, mod.dead.qig, mod.live.sawf, mod.live.qig])

    mod.beta = new DagNode(mod, 'beta', U.ratio)
        .use(Bed.packingRatio, [mod.dead.vol, mod.live.vol, mod.depth])
    mod.bopt = new DagNode(mod, 'bopt', U.ratio)
        .use(Bed.optimumPackingRatio, [mod.savr])
    mod.brat = new DagNode(mod, 'brat', U.ratio)
        .use(Bed.packingRatioRatio, [mod.beta, mod.bopt])

    // mod.ehn = new DagNode(mod, 'ehn', U.ratio).use(Bed.effectiveHeatingNumber, [mod.savr])
    mod.xi = new DagNode(mod, 'xi', U.ratio)
        .use(Bed.propagatingFluxRatio, [mod.savr, mod.beta])
    mod.rxve = new DagNode(mod, 'rxve', U.factor)
        .use(Bed.reactionVelocityExponent, [mod.savr])
    mod.rxvm = new DagNode(mod, 'rxvm', U.fuelRxv)
        .use(Bed.reactionVelocityMaximum, [mod.savr15])
    // rxvo was declared previously as its referenced  by lcat.drxi
    mod.rxvo.use(Bed.reactionVelocityOptimum, [mod.brat, mod.rxvm, mod.rxve])
    mod.savr15 = new DagNode(mod, 'savr15', U.fuelSavr)
        .use(Bed.savr15, [mod.savr])
    mod.sink = new DagNode(mod, 'sink', U.fuelSink)
        .use(Bed.heatSink, [mod.bulk, mod.qig])
    mod.rxi = new DagNode(mod, 'rxi', U.fireRxi)
        .use(Bed.reactionIntensity, [mod.dead.rxi, mod.live.rxi])
    mod.source = new DagNode(mod, 'source', U.fireRxi)
        .use(Bed.heatSource, [mod.rxi, mod.xi])
    mod.wsrf = new DagNode(mod, 'wsrf', U.fraction, 'open canopy wind speed reduction factor')
        .use(Bed.openWindSpeedAdjustmentFactor, [mod.depth])
    
    // Now we can configure all the fuel parameters per the fuel domain
    configRothermelFuelBed(mod)
    configRothermelFuelDomain(mod, moistureMod, configFuelDomain, configFuelCuring)
    return mod
}

/**
 * 
 * @param {DagModule} parent Reference to the parent DagModule (a fuel life category)
 * @param {string} modProp Parent's property name for this DagItem (a fuel element)
 */
export function buildRothermelElementModule(parentMod, parentProp,
        moistureMod, configFuelDomain) {
    const mod = new DagModule(parentMod, parentProp)
    mod.life = new DagNode(mod, 'life', U.fuelLife).constant(parentMod.life)

    // The following 8 props must be configured based on fuel domain
    mod.type = new DagNode(mod, 'type', U.fuelType)
    mod.load = new DagNode(mod, 'load', U.fuelLoad)
    mod.savr = new DagNode(mod, 'savr', U.fuelSavr)
    mod.heat = new DagNode(mod, 'heat', U.fuelHeat)
    mod.dens = new DagNode(mod, 'dens', U.fuelDens)
    mod.stot = new DagNode(mod, 'stot', U.fuelStot)
    mod.seff = new DagNode(mod, 'seff', U.fuelSeff)
    mod.mois = new DagNode(mod, 'mois', U.fuelMois)

    // Each particle has 12 derived characteristics:
    mod.ehn = new DagNode(mod, 'ehn', U.fraction)
        .use(Fuel.effectiveHeatingNumber, [mod.savr])
    mod.efol = new DagNode(mod, 'efol', U.fuelLoad)
        .use(Fuel.effectiveFuelLoad, [mod.savr, mod.load, mod.life])
    mod.qig = new DagNode(mod, 'qig', U.fuelQig)
        .use(Fuel.heatOfPreignition, [mod.mois, mod.ehn])
    mod.net = new DagNode(mod, 'net', U.fuelLoad)
        .use(Fuel.netOvendryLoad, [mod.load, mod.stot])
    mod.size = new DagNode(mod, 'size', U.fuelSize)
        .use(Fuel.sizeClass, [mod.savr])
    mod.sa = new DagNode(mod, 'sa', U.fuelArea)
        .use(Fuel.surfaceArea, [mod.load, mod.savr, mod.dens])
    mod.vol = new DagNode(mod, 'vol', U.fuelVol)
        .use(Fuel.volume, [mod.load, mod.dens])
    mod.efwl = new DagNode(mod, 'efwl', U.fuelLoad)
        .use(Fuel.effectiveFuelWaterLoad, [mod.efol, mod.mois])
    mod.diam = new DagNode(mod, 'diam', U.fuelLeng)
        .use(Fuel.cylindricalDiameter, [mod.savr])
    mod.leng = new DagNode(mod, 'leng', U.fuelLeng)
        .use(Fuel.cylindricalLength, [mod.diam, mod.vol])
    // The following require parent's sa and scar
    mod.sawf = new DagNode(mod, 'sawf', U.fuelWtg)
        .use(Fuel.surfaceAreaWeightingFactor, [mod.sa, parentMod.sa])
    mod.scwf = new DagNode(mod, 'scwf', U.fuelWtg)
        .use(Fuel.sizeClassWeightingFactor, [mod.size, parentMod.scar])
    return mod
}

export function configRothermelFuelBed(mod) {
    for(let lcat of [mod.dead,  mod.live]) {
        lcat.scar.use(Bed.sizeClassWeightingFactorArray, [
            lcat.element1.sa, lcat.element1.size,
            lcat.element2.sa, lcat.element2.size,
            lcat.element3.sa, lcat.element3.size,
            lcat.element4.sa, lcat.element4.size,
            lcat.element5.sa, lcat.element5.size])
        lcat.sa.use(Calc.sum, [
            lcat.element1.sa, lcat.element2.sa, lcat.element3.sa, lcat.element4.sa, lcat.element5.sa])
    }
}

export function configRothermelFuelDomain(mod, moistureMod, domain, curing) {
    if (domain.value === domain.standard) {
        mod.stdKey.input(domain)
        mod.cured.bind(curing.value===curing.estimated ? mod.curedEst : mod.curedInp, curing)
        mod.depth.use(Catalog.standardDepth, [mod.stdKey], domain)
        mod.dead.mext.use(Catalog.standardMext, [mod.stdKey], domain)
        for(let i=1; i<=5; i++) {
            const el = 'element'+i
            mod.dead[el].heat.use(Catalog.standardHeatDead, [mod.stdKey], domain)
            mod.live[el].heat.use(Catalog.standardHeatLive, [mod.stdKey], domain)
        }

        mod.dead.element1.type.use(Catalog.standardType1, [mod.stdKey], domain)
        mod.dead.element1.load.use(Catalog.standardLoad1, [mod.stdKey], domain)
        mod.dead.element1.savr.use(Catalog.standardSavr1, [mod.stdKey], domain)
        mod.dead.element1.mois.bind(moistureMod.dead.tl1, domain)

        mod.dead.element2.type.use(Catalog.standardType10, [mod.stdKey], domain)
        mod.dead.element2.load.use(Catalog.standardLoad10, [mod.stdKey], domain)
        mod.dead.element2.savr.use(Catalog.standardSavr10, [mod.stdKey], domain)
        mod.dead.element2.mois.bind(moistureMod.dead.tl10, domain)

        mod.dead.element3.type.use(Catalog.standardType100, [mod.stdKey], domain)
        mod.dead.element3.load.use(Catalog.standardLoad100, [mod.stdKey], domain)
        mod.dead.element3.savr.use(Catalog.standardSavr100, [mod.stdKey], domain)
        mod.dead.element3.mois.bind(moistureMod.dead.tl100, domain)

        mod.dead.element4.type.use(Catalog.standardTypeCured, [mod.stdKey], domain)
        mod.dead.element4.load.use(Catalog.standardLoadCured, [mod.stdKey, mod.cured], domain)
        mod.dead.element4.savr.use(Catalog.standardSavrHerb, [mod.stdKey, mod.cured], domain)
        mod.dead.element4.mois.bind(moistureMod.dead.tl1, domain)

        mod.live.element1.type.use(Catalog.standardTypeUncured, [mod.stdKey], domain)
        mod.live.element1.load.use(Catalog.standardLoadUncured, [mod.stdKey, mod.cured], domain)
        mod.live.element1.savr.use(Catalog.standardSavrHerb, [mod.stdKey, mod.cured], domain)
        mod.live.element1.mois.bind(moistureMod.live.herb, domain)

        mod.live.element2.type.use(Catalog.standardTypeStem, [mod.stdKey], domain)
        mod.live.element2.load.use(Catalog.standardLoadStem, [mod.stdKey, mod.cured], domain)
        mod.live.element2.savr.use(Catalog.standardSavrStem, [mod.stdKey, mod.cured], domain)
        mod.live.element2.mois.bind(moistureMod.live.herb, domain)
    } else {
        throw new Error(`Unknown domain "${domain.key}" value "${domain.value}"`)
    }
}
