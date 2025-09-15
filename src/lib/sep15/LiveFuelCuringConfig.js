export class LiveFuelCuringConfig {
    constructor(key) {
        this.key = key
        // keys for outside reference
        this.observed = 'observed'
        this.estimated = 'estimated'
        this.options = [this.observed, this.estimated]
        this.prompt = 'live fuel curing fraction is'
        this.prompts = [
            [this.observed, 'input parameter'],
            [this.estimated, 'estimated from herb moisture content'],
        ]
    }
}
