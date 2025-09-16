export class LiveFuelMoistureConfig {
    constructor(key) {
        this.key = key
        // keys for outside reference
        this.particle = 'particle'
        this.category = 'category'
        this.options = [this.particle, this.category]
        this.prompt = 'live fuel moisture content is entered'
        this.prompts = [
            [this.particle, 'individually for the herb and stem fuels'],
            [this.category, 'collectively for the live category as a whole'],
        ]
        this.value = this.options[0]
    }
}
