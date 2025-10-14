import { Units as U } from './Units.js'
import { DagModule, DagNode } from './DagItems.js'
import { Calc } from '../index.js'
import * as Config from './Configs.js'

/**
 * Builds and configures a FuelMoistureModule
 * @param {DagModule} parentMod Reference to this DagItem's parent DagModule
 * @param {string} parentProp Parent's property name for this DagItem
 * @returns Reference to the new DagModule 
 */
export function defineRothermelWindModule(parentMod, parentProp) {
    const mod = new DagModule(parentMod, parentProp)
    mod.midflame = new DagNode(mod, 'midflame', U.windSpeed)
    mod.wsrf  = new DagNode(mod, 'wsrf', U.fraction)
    return mod
}

export function configRothermelWindModule(mod, windMod, fuelMod, canopyMod) {
    const config = Config.midflameWindSpeed
    if(config.value === config.input) {
        mod.midflame.input(config)
    } else if(config.value === config.wsrf) {
        mod.wsrf.input(config)
        mod.midflame.use(Calc.multiply, [mod.wsrf, windMod.speed.at20ft], config)
    } else if(config.value === config.fuelbed) {
        mod.wsrf.bind(fuelMod.wsrf)
        mod.midflame.use(Calc.multiply, [mod.wsrf, windMod.speed.at20ft], config)
    } else if(config.value === config.canopy) {
        mod.wsrf.bind(canopyMod.wsrf)
        mod.midflame.use(Calc.multiply, [mod.wsrf, windMod.speed.at20ft], config)
    }
}
