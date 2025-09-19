import { ConfigBase } from './ConfigBase.js'
import {Paths} from './Paths.js'

export class WindSpeedReductionConfig extends ConfigBase {
    constructor(key=Paths.cfgWsrf) {
        super(key)
        // keys for outside reference
        this.input    = 'input'
        this.observed = this.input// for backwards compatability
        this.estimated = 'estimated'
        this.options =  [this.input, this.estimated]
        this.prompt =  'wind speed reduction factor (from 20-ft to midflame height) is'
        this.prompts =  [
            [this.input, 'an input parameter'],
            [this.estimated, 'estimated from fuel depth and canopy parameters'],
        ]
        this.value = this.options[0]
    }
}
