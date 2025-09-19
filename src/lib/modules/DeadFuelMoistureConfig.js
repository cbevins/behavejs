import { ConfigBase } from './ConfigBase.js'
import {Paths} from './Paths.js'

export class DeadFuelMoistureConfig extends ConfigBase {
    constructor(key=Paths.cfgMoisDead) {
        super(key)
        // keys for outside reference
        this.particle = 'particle'
        this.category = 'category'
        this.options = [this.particle, this.category]
        this.prompt = 'dead fuel moisture content is entered'
        this.prompts = [
            [this.particle, 'individually for the 1-h, 10-h, and 100-h time-lag fuels'],
            [this.category, 'collectively for the dead category as a whole'],
        ]
        this.value = this.options[0]
    }
}
