import { Units as U } from './Units.js'
import { DagModule, DagNode } from './DagItems.js'

export class FuelMoistureModule extends DagModule {
    /**
     * @param {DagModule} parentMod Reference to this DagItem's parent DagModule
     * @param {string} parentProp Parent's property name for this DagItem ('moisture')
     * @param {Config} configs Module containing all current configuration objects
     */
    constructor(parentMod, parentProp, configs) {
        super(parentMod, parentProp)
        this._meta.config = configs

        this.dead = new DagModule(this, 'dead')
        for(let prop of ['category', 'tl1', 'tl10', 'tl100'])
            this.dead[prop] = new DagNode(this.dead, prop, U.fuelMois)

        this.live = new DagModule(this, 'live')
        for(let prop of ['category', 'herb', 'stem'])
            this.live[prop] = new DagNode(this.live, prop, U.fuelMois)
    }
    
    config() {
        const {fuelMoistureDead, fuelMoistureLive} = this._meta.config
        this._configLife(this.dead, fuelMoistureDead, ['tl1', 'tl10', 'tl100'])
        this._configLife(this.live, fuelMoistureLive, ['herb', 'stem'])
        return this
    }

    _configLife(mod, config, elements) {
        mod.category.input()    // life category fuel moisture is always an input, so no config
        for(let prop of elements) {
            if (config.value === config.category) mod[prop].bind(mod.category, config)
            else if (config.value === config.element) mod[prop].input(config)
            else throw new Error(`Unknown config "${config.key}" value "${config.value}"`)
        }
    }
}
