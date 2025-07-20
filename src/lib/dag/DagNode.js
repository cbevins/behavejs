export class DagNode {
    constructor(key, value=0) {
        this.key = key
        this.value = value
        this.inputs = []
        this.outputs = []
        this.tmp = false    // Used for dirty, visited, indegrees
        this.updater = null // reference to an update method
    }

    depends(updater=null, inputs=[]) {
        this.updater = updater
        this.inputs = inputs
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
        }
    }
}
