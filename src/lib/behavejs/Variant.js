export class Variant {
    constructor(type, name, desc, value) {
        this.type = type
        this.name = name
        this.desc = desc
        this.value = value
        this.units = []
        this.dirty = true
        this.inputs =  new Set()  // references to all variants that provide *this* with inputs
        this.consumers = new Set() // references to all variants that use *this* as input
    }

    set(value) {
        this.value = value
        // PROPAGATE dirty UPWARDS TO ALL consumers
        this.setDirty()
        return this
    }

    setDirty() {
        if (! this.dirty) {
            this.consumers.forEach((value1, value2, set) => value1.setDirty())
            this.dirty = true
        }
        return this
    }

    logEdges() {
        console.log(this.desc, 'has', this.inputs.size, 'inputs and',
            this.consumers.size, 'consumers:')
        this.inputs.forEach((value1, value2, set) =>
            console.log(' - Input:', value1.desc))
        this.consumers.forEach((value1, value2, set) =>
            console.log(' - Consumer:', value1.desc))
    }

    update() {
        this.dirty = false
        return this
    }
}
