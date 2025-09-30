export class ConfigBase {
    constructor(key) {
        this.key = key
        this.options = []   // array of valid option key strings (values)
        this.prompt = ''    // 
        this.prompts = []   // array of [key, text] pairs
        this.notes = []
        // Module nodeDef option values that match any config value
        this.any = 'any'
        this.all = this.any
    }
    hasOption(optkey) { return this.options.includes(optkey) }
}