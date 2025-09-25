import { ConfigBase } from './ConfigBase.js'
import {Paths} from './Paths.js'

export class SurfaceStandardConfig extends ConfigBase {
    constructor(key='') {
        super(key)
        // keys for outside reference
        this.catalog = 'catalog'
        this.custom  = 'custom'
        this.options = [this.catalog, this.custom]
        this.prompt = 'standard fuel model parameters are'
        this.prompts = [
            [this.catalog, 'accessed by name from the fuel catalog'],
            [this.custom, 'entered as custom input parameters'],
        ]
        this.value = this.options[0]
    }
}
export class SurfacePrimaryStandardConfig extends SurfaceStandardConfig {
    constructor(key=Paths.cfgStdInput1) {
        super(key, false)
        this.prompt = 'Primary ' + this.prompt
    }
}
export class SurfaceSecondaryStandardConfig extends SurfaceStandardConfig {
    constructor(key=Paths.cfgStdInput2) {
        super(key, true)
        this.prompt = 'Secondary ' + this.prompt
    }
}
