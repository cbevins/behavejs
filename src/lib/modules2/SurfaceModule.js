import * as Config from './Configs.js'
import { Units as U } from './Units.js'
import { DagModule, DagNode } from './DagItems.js'
import { defineRothermelModule, configRothermelModule } from './RothermelModule.js'
import { defineSurfaceFireModule, configSurfaceFireModule } from './SurfaceFireModule.js'

/**
 * 
 * @param {DagModule} parentMod Reference to the parent dagModule, probably site
 * @param {string} parentProp Something like 'surface'
 */
export function defineSurfaceModule(parentMod, parentProp) {
    const mod     = new DagModule(parentMod, parentProp)
    mod.fire      = defineSurfaceFireModule(mod, 'fire')
    mod.primary   = defineRothermelModule(mod, 'primary', Config.fuelDomainPrimary)
    mod.secondary = defineRothermelModule(mod, 'secondary', Config.fuelDomainSecondary)
    return mod
}

export function configSurfaceModule(mod, moistureMod, windMod, slopeMod, canopyMod) {
    configRothermelModule(mod.primary,   moistureMod, windMod, slopeMod, canopyMod, Config.fuelDomainPrimary)
    configRothermelModule(mod.secondary, moistureMod, windMod, slopeMod, canopyMod, Config.fuelDomainSecondary)
    configSurfaceFireModule(mod.fire, mod.primary, mod.secondary)
}
