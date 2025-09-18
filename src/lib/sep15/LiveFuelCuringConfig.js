import { ConfigBase } from './ConfigBase.js'
export class LiveFuelCuringConfig extends ConfigBase {
    constructor(key='fuel/curing fraction/parameter') {
        super(key)
        // keys for outside reference
        this.input = 'input'
        this.observed = 'input' // for backwards compatability
        this.estimated = 'estimated'
        this.options = [this.input, this.estimated]
        this.prompt = 'live fuel curing fraction is'
        this.prompts = [
            [this.input, 'an input parameter'],
            [this.estimated, 'estimated from live herb moisture content'],
        ]
        this.value = this.options[0]
    }
}
