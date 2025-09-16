export class WindSpeedReductionConfig {
    constructor(key) {
        this.key = key
        // keys for outside reference
        this.at20ft = 'at 20-ft'
        this.at10m  = 'at 10-m'
        this.options = [this.at20ft, this.at10m]

        this.observed = 'observed'
        this.estimated = 'estimated'
        this.options =  [this.observed, this.estimated]
        this.prompt =  'wind speed reduction factor (from 20-ft to midflame height) is'
        this.prompts =  [
            [this.observed, 'an input parameter'],
            [this.estimated, 'estimated from fuel depth and canopy parameters'],
        ]
        this.value = this.options[0]
    }
}
