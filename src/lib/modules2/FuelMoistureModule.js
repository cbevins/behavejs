import {Units as U} from './Units.js'
import {DagModule, DagNode} from './DagItems.js'

/**
 * Builds and configures a FuelMoistureModule
 * @param {DagModule} parentMod Reference to this DagItem's parent DagModule
 * @param {string} parentProp Parent's property name for this DagItem
 * @returns Reference to the new DagModule 
 */
export function defineFuelMoistureModule(parentMod, parentProp) {
    const mod = new DagModule(parentMod, parentProp)

    mod.dead = new DagModule(mod, 'dead')
    for(let prop of ['category', 'tl1', 'tl10', 'tl100'])
        mod.dead[prop] = new DagNode(mod.dead, prop, U.fuelMois)

    mod.live = new DagModule(mod, 'live')
    for(let prop of ['category', 'herb', 'stem'])
        mod.live[prop] = new DagNode(mod.live, prop, U.fuelMois)

    return mod
}

/**
 * Called by buildFuelMoistureModule()
 * @param {DagModule} mod Reference to the DagModule whose DagNodes are to be configured
 * @param {DagConfig} config Reference to the DagConfig to be applied
 */
export function configFuelMoistureModule(mod, configDead, configLive) {
    configFuelMoistureLifeModule(mod.dead, configDead, ['tl1', 'tl10', 'tl100'])
    configFuelMoistureLifeModule(mod.live, configLive, ['herb', 'stem'])
}
function configFuelMoistureLifeModule(mod, config, elements) {
    mod.category.input()    // life category fuel moisture is always an input, so no config
    for(let prop of elements) {
        if (config.value === config.category) mod[prop].bind(mod.category, config)
        else if (config.value === config.element) mod[prop].input(config)
        else throw new Error(`Unknown config "${config.key}" value "${config.value}"`)
    }
}
