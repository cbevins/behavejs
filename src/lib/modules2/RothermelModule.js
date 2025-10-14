import { Units as U } from './Units.js'
import { DagModule, DagNode } from './DagItems.js'
import { defineRothermelFireModule, configRothermelFireModule } from './RothermelFireModule.js'
import { defineRothermelFuelModule, configRothermelFuelModule } from './RothermelFuelModule.js'
import { defineRothermelWindModule, configRothermelWindModule } from './RothermelWindModule.js'

/**
 * Defines all the DagNodes within the Rothermel Fire and Fuel Model (1972)
 * @param {DagModule} parentMod Reference to the parent DagModule,
 *  usually  site.surface.primary, site.surface.secondary, or site.crown.active
 * @param {string} parentProp Parent's property name for this DagItem
 * @returns Reference to the new DagModule 
 */
export function defineRothermelModule(parentMod, parentProp, configFuelDomain) {
    const mod = new DagModule(parentMod, parentProp)
    mod.fire = defineRothermelFireModule(mod, 'fire')
    mod.fuel = defineRothermelFuelModule(mod, 'fuel', configFuelDomain)
    mod.wind = defineRothermelWindModule(mod, 'wind')
    return mod
}

export function configRothermelModule(mod,
        moistureMod, windMod, slopeMod, canopyMod,
        configFuelDomain, configFireEffWindLimit, configFuelCuring, configMidflame) {
    configRothermelFireModule(mod.fire, windMod, slopeMod, configFireEffWindLimit)
    configRothermelFuelModule(mod.fuel, moistureMod, configFuelDomain, configFuelCuring)
    configRothermelWindModule(mod.wind, windMod, mod.fuel, canopyMod, configMidflame)
}
