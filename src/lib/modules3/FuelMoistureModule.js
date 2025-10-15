import { Units as U } from './Units.js'
import { DagModule, DagNode } from './DagItems.js'

/**
 * Builds and configures a FuelMoistureModule
 * @param {DagModule} parentMod Reference to this DagItem's parent DagModule
 * @param {string} parentProp Parent's property name for this DagItem
 * @returns Reference to the new DagModule 
 */
export class FuelMoistureModule extends DagModule {
    constructor(parentMod, parentProp, configDead, configLive) {
        super(parentMod, parentProp)
        this._meta.config = {configDead, configLive}
        this._meta.mod = {}

        this.dead = new DagModule(this, 'dead')
        for(let prop of ['category', 'tl1', 'tl10', 'tl100'])
            this.dead[prop] = new DagNode(this.dead, prop, U.fuelMois)

        this.live = new DagModule(this, 'live')
        for(let prop of ['category', 'herb', 'stem'])
            this.live[prop] = new DagNode(this.live, prop, U.fuelMois)
    }
    
    config() {
        const {configDead, configLive} = this._meta.config
        this.configLife(this.dead, configDead, ['tl1', 'tl10', 'tl100'])
        this.configLife(this.live, configLive, ['herb', 'stem'])
    }

    configLife(mod, config, elements) {
        mod.category.input()    // life category fuel moisture is always an input, so no config
        for(let prop of elements) {
            if (config.value === config.category) mod[prop].bind(mod.category, config)
            else if (config.value === config.element) mod[prop].input(config)
            else throw new Error(`Unknown config "${config.key}" value "${config.value}"`)
        }
    }
}
