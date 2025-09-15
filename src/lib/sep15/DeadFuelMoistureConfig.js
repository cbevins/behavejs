export class DeadFuelMoistureConfig {
    constructor(key) {
        this.key = key
        // keys for outside reference
        this.particle = 'particle'
        this.category = 'category'
        this.options = [this.particle, this.category]
        this.prompt = 'dead fuel moisture content is entered'
        this.prompts = [
            [this.particle, 'individually for the 1-h, 10-h, and 100-h time-lag fuels'],
            [this.category, 'collectively for the dead category as a whole'],
        ]
    }
}
