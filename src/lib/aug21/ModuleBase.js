export class ModuleBase {
    constructor(path) {
        this.path = path
        this.any = '*'
        this.config = ''    // configuration key
        this.options = []   // configuration option keys
    }
}
