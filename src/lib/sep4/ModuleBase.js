
export class ModuleBase {
    constructor(path) {
        this.path = path
        this.any = '*'
        this.nodes = []
    }
    
    configure(applyOption) {
        for(let i=0; i<this.nodes.length; i++) {
            const [key, value, units, option, options] = this.nodes[i]
            let found = false
            if (options.length === 1) {
                this.nodes[i][3] = 0
                found = true
            } else {
                for (let j=0; j<options.length; j++) {
                    const [optval, method, args] = options[j]
                    if (optval === this.any || optval === applyOption) {
                        this.nodes[i][3] = j
                        found = true
                        break
                    }
                }
            }
            if (! found) {
                throw new Error(`Module "${this.path}" node "${key}" has no matching config for "${applyOption}"`)
            }
            // push the configuration key onto the node record so the Dag can
            // report active configurations
            this.nodes[i].push(this.config)
        }
        return this.nodes
    }
}
