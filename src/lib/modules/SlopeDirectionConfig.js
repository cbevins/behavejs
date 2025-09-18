import { ConfigBase } from './ConfigBase.js'
export class SlopeDirectionConfig extends ConfigBase {
    constructor(key='slope/direction/input') {
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
