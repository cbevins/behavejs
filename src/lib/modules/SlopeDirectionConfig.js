import { ConfigBase } from './ConfigBase.js'
import {Paths} from './Paths.js'

export class SlopeDirectionConfig extends ConfigBase {
    constructor(key=Paths.cfgSlopeDir) {
        super(key)
        // keys for outside reference
        this.upslope = 'up-slope'
        this.downslope = 'down-slope'
        this.options = [this.upslope, this.downslope]
        this.prompt = 'slope direction is specified as'
        this.prompts = [
            [this.upslope, 'up-slope direction'],
            [this.downslope, 'down-slope direction (aspect)'],
        ]
        this.value = this.options[0]
    }
}
