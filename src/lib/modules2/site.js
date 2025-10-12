import * as Config from './Configs.js'
import { Dag } from './Dag.js'
import { DagModule, DagNode, ModuleMap } from './DagItems.js'
import { Util } from './Util.js'
import { buildFuelMoistureModule } from './FuelMoistureModule.js'
import { defineRothermelModule } from './defineRothermelModule.js'
console.log(new Date())

//------------------------------------------------------------------------------
/*
    moisture/ FuelMoistureModule [configMoistureDead, configMoistureLive]
        dead/
        live/

    wind/
    slope/

    surface/ SurfaceModule 
        primary/
            fire/ SurfaceFireModule [configEffectiveWindLimit] (fuelMod, windMod, slopeMod) 
                phiw, phis, phiew
                ros, fli, flame, hpua, effwind, lwr
                dir/
                    upslope, north 
                step1/
                ...
                step8/
                    ros, effwind
            fuel/ FuelBedModule [configFuelDomain] (moisMod)
                depth, sa, load, bulk, savr, etas, etam rxi, sink, source, qig, xi
                beta/
                    packing, opt, ratio
                rxi/
                    opt, min, exp
                dead/ FuelLifeModule [configFuelDomain] (moisMod)
                    mext, etas, etam, drxi, sa, load, wtg
                    element1/ FuelElementModule [configFuelDomain] (moisMod)
                        input/ (moisMod)
                            load, savr, heat, dens, stot, seff, mois type
                        derived/
                            sa, size, net, ehn, efwl, qig
                        weighting factor/
                            sa, size
                    ...
                    element5/ FuelElementModule [configFuelDomain] (moisMod)
                live/ FuelLifeModule [configFuelDomain] (moisMod)
                    mext, mextf, etas, etam, drxi, sa, load, wtg
                    element1/ FuelElementModule [configFuelDomain] (moisMod)
                    ...
                    element5/ FuelElementModule [configFuelDomain] (moisMod)
                slope/
                    k
                wind/
                    open canopy wsrf
                    midflame
                    factor/
                        b, c, e, k, i
*/

const site = new DagModule(null, 'site')
site.moisture = buildFuelMoistureModule(site, 'moisture',
    Config.fuelMoistureDead, Config.fuelMoistureLive)

site.slope = new DagModule(site, 'slope') // to be replaced by buildSlopeModule()
site.wind = new DagModule(site, 'wind') // to be replaced by buildWindModule()

site.surface = new DagModule(site, 'surface')
site.surface.primary = defineRothermelModule(site.surface, 'primary',
    Config.fuelDomainPrimary)

console.log(Util.moduleTreeStr(site))

// for(let [key, mod] of ModuleMap.entries()) {
//     // Only call configure on non-nodes
//     if(!mod.isNode()) mod.configure()
// }

//------------------------------------------------------------------------------
// const dead = site.moisture.dead
// const tl1 = site.moisture.dead.tl1
// for(let item of [dead, tl1]) {
//     console.log(`\nkey() of "${item.key()}" is "${item.key()}"`)
//     console.log(`lineage() of "${item.key()}" is [${item.lineage()}]`)
//     console.log(`isNode() of "${item.key()}" is "${item.isNode()}"`)
//     console.log(`items() of "${item.key()}" is "${item.items()}"`)
//     console.log(`allProps() of "${item.key()}" is "${item.allProps()}"`)
//     console.log(`propTreeArray() of "${item.key()}" is "${item.propTreeArray()}"`)
//     console.log(`rootModule() of "${item.key()}" is "${item.rootModule().key()}"`)
// }