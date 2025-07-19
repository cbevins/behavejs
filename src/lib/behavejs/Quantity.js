import {Variant} from './variant.js'
export class Quantity extends Variant {
    constructor(name, desc, value, units) {
        super('Quantity', name, desc, value)
        this.units = units
    }
}
