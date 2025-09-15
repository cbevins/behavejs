export class WindSpeedConfig {
    constructor(key) {
        this.key = key
        // keys for outside reference
        this.at20ft = 'at 20-ft'
        this.at10m  = 'at 10-m'
        this.options = [this.at20ft, this.at10m]
        this.prompt = 'the open wind speed is measured at'
        this.prompts = [
            [this.at20ft, '20-ft height'],
            [this.at10m, '10-m height]']
        ]
    }
}
