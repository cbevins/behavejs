import { ConfigBase } from './ConfigBase.js'
export class SurfaceFireConfig extends ConfigBase {
    constructor(key='fire/effective wind speed limit') {
        super(key)
    // keys for outside reference
    this.applied = 'applied'
    this.notApplied = 'not applied'
        this.options = [this.applied, this.notApplied],
        this.prompt = 'effective wind speed limit is',
        this.prompts = [
            [this.applied, 'applied'],
            [this.notApplied, 'not applied'],
        ]
        this.value = this.options[0]
    }
}
