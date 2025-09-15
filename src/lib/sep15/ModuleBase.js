export class ModuleBase {
    /**
     * 
     * @param {*} prefix instance path name, like 'primary'
     * @param {*} self module's own name, like 'surface/bed'
     * @param {*} module module class name, like 'SurfaceBedModule'
     * @param {*} cfg reference to {key:, options: [key1, key2,...], value: <option>}
     */
    constructor(prefix, self='', module='', cfg=null) {
        this.prefix = prefix
        this.self = self
        this.module = module
        this.cfg = cfg
        this.nodes = []
    }
}
