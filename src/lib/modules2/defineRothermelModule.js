import {Units as U} from './Units.js'
import {DagModule, DagNode} from './DagItems.js'
/**
 *
 * @param {DagModule} parentMod Reference to the parent DagModule,
 *  usually  site.surface.primary, site.surface.secondary, or site.crown.active
 * @param {string} parentProp Parent's property name for this DagItem
 * @returns Reference to the new DagModule 
 */
export function defineRothermelModule(parentMod, parentProp, configFuelDomain) {
    const mod = new DagModule(parentMod, parentProp)

    mod.fire = new DagModule(mod, 'fire')
    const fire = mod.fire
    fire.dir   = new DagNode(fire, 'dir', U.compass)
    fire.flame = new DagNode(fire, 'flame', U.fireFlame)
    fire.fli   = new DagNode(fire, 'fli', U.fireFli)
    fire.hpua  = new DagNode(fire, 'hpua', U.fireHpua)
    fire.lwr   = new DagNode(fire, 'lwr', U.ratio)
    fire.ros   = new DagNode(fire, 'ros', U.fireRos)
    fire.rosA  = new DagNode(fire, 'rosA', U.fireRos)
    fire.rosH  = new DagNode(fire, 'rosH', U.fireRos)

    mod.fuel = new DagModule(mod, 'fuel')
    const fuel = mod.fuel
    if (configFuelDomain.value === configFuelDomain.standard) {
        fuel.stdKey = new DagNode(fuel, 'stdKey', U.fuelKey)
        fuel.cured = new DagNode(fuel, 'cured', U.fraction)
        fuel.curedEst = new DagNode(fuel, 'curedEst', U.fraction)
        fuel.curedInp = new DagNode(fuel, 'curedInp', U.fraction)
    }
    fuel.area   = new DagNode(fuel, 'area', U.fuelArea)
    fuel.bulk   = new DagNode(fuel, 'bulk', U.fuelBulk)
    fuel.depth  = new DagNode(fuel, 'depth', U.fuelDepth)
    fuel.qig    = new DagNode(fuel, 'qig', U.fuelQig)
    fuel.beta   = new DagNode(fuel, 'beta', U.ratio)
    fuel.bopt   = new DagNode(fuel, 'bopt', U.ratio)
    fuel.brat   = new DagNode(fuel, 'brat', U.ratio)
    fuel.load   = new DagNode(fuel, 'load', U.fuelLoad)
    fuel.rxi    = new DagNode(fuel, 'rxi', U.fireRxi)
    fuel.rxve   = new DagNode(fuel, 'rxve', U.factor)
    fuel.rxvm   = new DagNode(fuel, 'rxvm', U.fuelRxv)
    fuel.rxvo   = new DagNode(fuel, 'rxvo', U.fuelRxv)
    fuel.savr   = new DagNode(fuel, 'savr', U.fuelSavr)
    fuel.savr15 = new DagNode(fuel, 'savr15', U.fuelSavr)
    fuel.sink   = new DagNode(fuel, 'sink', U.fuelSink)
    fuel.source = new DagNode(fuel, 'source', U.fireRxi)
    fuel.wsrf   = new DagNode(fuel, 'wsrf', U.fraction, 'open canopy wind speed reduction factor')
    fuel.xi     = new DagNode(fuel, 'xi', U.ratio)

    mod.fuel.dead = new DagModule(fuel, 'dead')
    mod.fuel.live = new DagModule(mod, 'live')
    for(let lcat of [mod.fuel.dead, mod.fuel.live]) {
        lcat.area = new DagNode(lcat, 'area', U.fuelArea)
        lcat.drxi = new DagNode(lcat, 'drxi', U.fireRxi)
        if (lcat === mod.fuel.dead) lcat.efmc = new DagNode(lcat, 'efmc', U.fuelMois)
        lcat.efol = new DagNode(lcat, 'efol', U.fuelLoad)
        if (lcat === mod.fuel.dead) lcat.efwl = new DagNode(lcat, 'efwl', U.fuelLoad)
        lcat.etam = new DagNode(lcat, 'etam', U.fraction)
        lcat.etas = new DagNode(lcat, 'etas', U.fraction)
        lcat.heat = new DagNode(lcat, 'heat', U.fuelHeat)
        lcat.life = new DagNode(lcat, 'life', U.fuelLife).constant(lcat.prop()) // 'dead' or 'live'
        lcat.load = new DagNode(lcat, 'load', U.fuelLoad)
        lcat.mext = new DagNode(lcat, 'mext', U.fuelMois)
        if (lcat === mod.fuel.live) lcat.mextf = new DagNode(lcat, 'mextf', U.factor)
        lcat.mois = new DagNode(lcat, 'mois', U.fuelMois)
        lcat.net  = new DagNode(lcat, 'net', U.fuelLoad)
        lcat.qig  = new DagNode(lcat, 'qig', U.fuelQig)
        lcat.rxi  = new DagNode(lcat, 'rxi', U.fireRxi)
        lcat.savr = new DagNode(lcat, 'savr', U.fuelSavr)
        lcat.sawf = new DagNode(lcat, 'sawf', U.fuelWtg)
        lcat.scar = new DagNode(lcat, 'scar', U.fuelWtg)
        lcat.seff = new DagNode(lcat, 'seff', U.fraction)
        lcat.vol  = new DagNode(lcat, 'vol', U.fuelVol)
        for(let i=1; i<=5; i++) {
            const prop = 'element'+i
            lcat[prop] = new DagModule(lcat, prop)
            const el = lcat[prop]
            el.life = new DagNode(el, 'life', U.fuelLife).constant(lcat.life)
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
            el.size = new DagNode(el, 'size', U.fuelSize)
            el.vol  = new DagNode(el, 'vol', U.fuelVol)
            el.scwf = new DagNode(el, 'scwf', U.fuelWtg)
        }
    }
    return mod
}
