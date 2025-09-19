import { ConfigBase } from './ConfigBase.js'
import {Paths} from './Paths.js'

export class SlopeSteepnessConfig extends ConfigBase {
    constructor(key=Paths.cfgSlopeSteep) {
        super(key)
        // keys for outside reference
        this.ratio = 'ratio'
        this.degrees = 'degrees'
        this.map = 'map'
        this.options = [this.ratio, this.degrees, this.map]
        this.prompt = 'slope steepness is specified as'
        this.prompts = [
            [this.ratio, 'ratio of vertical rise to horizontal reach'],
            [this.degrees, 'degrees'],
            [this.map, 'estimated from map parameters']
        ]
        this.value = this.options[0]
    }
}
