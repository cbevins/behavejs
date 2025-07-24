import {Variant, Quantity, addInput} from './baseVariants.js'

// Effective heating number requires a surface area-to-volume ratio
export function createEhn(desc, savrVar) {
    const ehn = {...Quantity,
        variant: 'Ehn',
        units: [['ratio',0]],
        update: function () {
            const savr = this.inputs[0].value
            const ehn = savr <= 0 ? 0 : Math.exp(-138 / savr)
            this.set(ehn)
        },
        desc
    }
    ehn.inputs.add(savrVar)
    // savrVar.consumers.add(ehn)
    return ehn
}

// props commonly specify a non-default {value} and a {desc}
export function createSavr(desc, value) {
    return {...Quantity,
        variant: 'Savr',
        units: [['ft',-1]],
        desc, value
    }
}

// 
export function createFuelModelKey(props) {
    return {
        variant: 'FuelModelKey',
        type: 'Key',
        options: ['1', '2', '3'],
        value: '1',
        ...props
    }
}

//
export function createConfigFuelSource(props) {
    return {
        variant: 'ConfigFuel',
        type: 'selection',
        desc: 'Surface Fuel Parameter Source',
        options: ['Standard', 'Input'],
        value: 'Standard',
        ...props
    }
}