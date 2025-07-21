export class DagNode {
    constructor(key, value=0, updater=null, inputs=[]) {
        this.key = key
        this.value = value
        this.status = null      // INACTIVE, ACTIVE, or SELECTED
        this.dirty = null       // Used for dirty, visited, indegrees
        this.updater = null     // reference to an update method
        this.inputs = []        // references to all input (provider) DagNodes
        this.outputs = []       // references to all output (consumer) DagNodes
    }

    // Sets the updater method and input dependencies
    depends(updater=null, inputs=[]) {
        this.updater = updater
        this.inputs = inputs
        return this
    }

    update() {
        if (this.updater) {
            const args = []
            // NOTE: This is the most heavily used function in the entire system.
            // DO NOT use Array.map() to iterate over method parms,
            // as it increases execution time time by 50% !!!
            for (let i = 0; i < this.inputs.length; i++) {
                args.push(this.inputs[i].value)
            }
            this.value = this.updater.apply(this, args)
            console.log(`${this.key}.update() => ${this.value}`)
        }
    }
}
