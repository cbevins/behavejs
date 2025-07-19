// source may be NULL or some client input
export const Variant = {
    variant: 'Variant',
    type: 'variant',
    desc: '',
    value: null,
    units: [],
    dirty: true,
    inputs: new Set(),  // references to all variants that provide *this* with inputs
    consumers: new Set(), // references to all variants that use *this* as input
    set: function (value) {
        this.value = value
        // PROPAGATE dirty UPWARDS TO ALL consumers
        this.setDirty()
        return this
    },
    setDirty: function () {
        if (! this.dirty) {
            for (let i=0; i<this.consumers.length; i++)
                this.consumers[i].setDirty()
            this.dirty = true
        }
        return this
    },
    // default is a constant value (no updates)
    update: function () {
        this.dirty = false
        return this
    },
}

// Quantity
export const Quantity = {
    ...Variant,
    type: 'quantity',
    units: [['ratio',0]],
    value: 0
}

    
export function addConsumer(target, variant) {
    if (! target.consumers.has(variant)) {
        console.log('***', target.desc, '- addConsumer -', variant.desc)
        target.consumers.add(variant)
        target.dirty = true
    }
}

export function addInput(target, variant) {
    if (! target.inputs.has(variant)) {
        console.log('***', target.desc, '- addInput -', variant.desc)
        target.inputs.add(variant)
        // target.dirty = true
        // addConsumer(variant, target)
    }
}
