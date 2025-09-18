export class ConfigBase {
    constructor(key) {
        this.key = key
        // Module nodeDef option values that match any config value
        this.any = 'any'
        this.all = this.any
    }
}