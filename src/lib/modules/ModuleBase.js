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
        this.self   = self
        this.module = module
        this.cfg    = cfg
        this.path   = prefix + self
        this.nodes  = []
    }
    checkNodes() {
        let prev = 'first'
        for(let i=0; i<this.nodes.length; i++) {
            const node = this.nodes[i]
            const [key, value, units, cfg, options] = node
            console.log(i, key)
            if (key.includes('undefined')) {
                console.log(`${this.module} has undefined key at node index ${i} with units "${units.key}" right after node "${prev}"`)
            }
            prev = key
        }
    }
}
