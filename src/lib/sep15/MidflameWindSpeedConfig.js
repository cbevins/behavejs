export class MidflameWindSpeedConfig {
    constructor(key) {
        this.key = key
        // keys for outside reference
        this.observed = 'observed'
        this.estimated = 'estimated'
        this.options = [this.observed, this.estimated]
        this.prompt = 'wind speed at midflame height is'
        this.prompts = [
            [this.observed, 'input parameter'],
            [this.estimated, 'estimated from 20-ft wind speed and a reduction factor'],
        ]
        this.value = this.options[0]
    }
}
