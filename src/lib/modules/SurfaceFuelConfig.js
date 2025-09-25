import { ConfigBase } from './ConfigBase.js'
import {Paths} from './Paths.js'

export class SurfaceFuelConfig extends ConfigBase {
    constructor(key, prefix='primary' /* or secondary*/) {
        super(key)
        // keys for outside reference
        this.standard  = 'standard'
        this.chaparral = 'chaparral'
        this.palmetto  = 'palmetto'
        this.aspen     = 'aspen'
        this.prompt    = prefix + ' fuel parameters are provided by the'
        this.options   = [this.standard, this.chaparral, this.palmetto, this.aspen]
        this.prompts   = [
            [this.standard, 'Albini (1976) and Scott and Burgan (2005) "standard" fire behavior fuel models'],
            [this.chaparral, 'Rothermel and Philpot (1973) chaparral fuel model'],
            [this.palmetto, 'Hough and Albini (1978) palmetto-gallberry fuel model'],
            [this.aspen, 'Brown and Simmerman (1986) western aspen fuel model']
        ]
        this.value = this.options[0]
    }
}
export class SurfacePrimaryFuelConfig extends SurfaceFuelConfig {
    constructor(key=Paths.cfgFuelDomain1) {
        super(key, 'primary')
    }
}
export class SurfaceSecondaryFuelConfig extends SurfaceFuelConfig {
    constructor(key=Paths.cfgFuelDomain2) {
        super(key, 'secondary')
    }
}
