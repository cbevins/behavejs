import {Quantity} from './Quantity.js'

// Effective heating number requires a surface area-to-volume ratio
export class Ehn extends Quantity {
    constructor(desc, savrRef) {
        super('EHN', desc, 0., [['ratio',0]])
        this.savrRef = savrRef
        this.inputs.add(savrRef)
        savrRef.consumers.add(this)
    }
    
    update() {
        const savr = this.savrRef.value
        this.set(savr <= 0 ? 0 : Math.exp(-138 / savr))
    }
}

export class Savr extends Quantity {
    constructor(desc, value) {
        super('SAVR', desc, value, [['ratio',0]])
    }
}