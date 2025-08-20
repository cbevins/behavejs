export class NodeDef {
    constructor(prefix) {
        this.prefix = prefix
    }
    
    nodes() {
        const ar = []
        for (const [key, value] of Object.entries(this)) {
            if (key !== 'prefix')
                ar.push([key, value[0], value[1], value[2], value[3]])
        }
        return ar
    }
}