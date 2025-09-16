export class StandardFuelModelConfig {
    constructor(key) {
        this.key = key
        // keys for outside reference
        this.catalog = 'catalog'
        this.custom = 'custom'
        this.options = [this.catalog, this.custom]
        this.prompt = 'standard fuel model parameters are'
        this.prompts = [
            [this.catalog, 'accessed by name from the fuel catalog'],
            [this.custom, 'entered as custom input parameters'],
        ]
        this.value = this.options[0]
    }
}
