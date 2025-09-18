import { ConfigBase } from './ConfigBase.js'
export class SurfaceFuelConfig extends ConfigBase {
    constructor(key, addNone=false) {
        super(key)
        // keys for outside reference
        this.standard  = 'standard'
        this.chaparral = 'chaparral'
        this.palmetto  = 'palmetto'
        this.aspen     = 'aspen'
        this.none      = 'none'
        this.options = []
        this.prompts = []
        this.prompt = 'Primary fuel parameters are provided by the'
        if (addNone) {
            this.prompt = 'Secondary fuel parameters are provided by the'
            this.options.push('none')
            this.prompts.push([this.none, 'none - no secondary fuel present'])
        }
        this.options.push(this.standard, this.chaparral, this.palmetto, this.aspen)
        this.prompts.push(
            [this.standard, 'standard fire behavior fuel models'],
            [this.chaparral, 'Philpot & Rothermel chaparral fuel model'],
            [this.palmetto, 'Albini and Hough palmetto-gallberry fuel model'],
            [this.aspen, 'the Brown and Simmerman western aspen fuel model']
        )
        this.value = this.options[0]
    }
}
export class PrimarySurfaceFuelConfig extends SurfaceFuelConfig {
    constructor(key='primary/fuel/domain') {
        super(key, false)
    }
}
export class SecondarySurfaceFuelConfig extends SurfaceFuelConfig {
    constructor(key='secondary/fuel/domain') {
        super(key, true)
    }
}
