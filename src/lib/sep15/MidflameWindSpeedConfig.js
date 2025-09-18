import { ConfigBase } from './ConfigBase.js'
export class MidflameWindSpeedConfig extends ConfigBase {
    constructor(key='midflame/wind speed/parameter') {
        super(key)
        // keys for outside reference
        this.input = 'input'
        this.observed = this.input // for backwards compatability
        this.estimated = 'estimated'
        this.options = [this.input, this.estimated]
        this.prompt = 'wind speed at midflame height is'
        this.prompts = [
            [this.input, 'input parameter'],
            [this.estimated, 'estimated from 20-ft wind speed and a reduction factor'],
        ]
        this.value = this.options[0]
    }
}
