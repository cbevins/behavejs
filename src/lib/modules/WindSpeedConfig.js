import { ConfigBase } from './ConfigBase.js'
import {Paths} from './Paths.js'

export class WindSpeedConfig extends ConfigBase {
    constructor(key=Paths.cfgWindSpeed) {
        super(key)
        // keys for outside reference
        this.at20ft = 'at 20-ft'
        this.at10m  = 'at 10-m'
        this.options = [this.at20ft, this.at10m]
        this.prompt = 'the open wind speed is measured at'
        this.prompts = [
            [this.at20ft, '20-ft height'],
            [this.at10m, '10-m height]']
        ]
        this.value = this.options[0]
    }
}
