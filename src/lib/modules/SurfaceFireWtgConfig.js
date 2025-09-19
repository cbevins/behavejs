import { ConfigBase } from './ConfigBase.js'
import {Paths} from './Paths.js'

export class SurfaceFireWtgConfig extends ConfigBase {
    constructor(key=Paths.cfgSurfWtg) {
        super(key)
        // keys for outside reference
        this.primary = 'primary'
        this.harmonic = 'harmonic'
        this.arithmetic = 'arithmetic'
        this.options = [this.primary, this.harmonic, this.arithmetic]
        this.prompt = 'surface fire results are'
        this.prompts = [
            [this.primary, 'for the primary fuel only'],
            [this.harmonic, 'harmonic mean of primary and secondary fuels'],
            [this.arithmetic, 'arithmetic mean of primary and secondary fuels'],
        ]
        this.value = this.options[0]
    }
}
