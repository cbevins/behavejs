import { Calc, Compass, Dag } from '../../modules/index.js'
import { NodeDef } from './NodeDef.js'
export class SlopeSteepness extends NodeDef {
    constructor(prefix) {
        super(prefix)
    }
    inputRatio() {
        this.ratio = [0, 'ratio', Dag.input, []]
        this.degrees = [0, 'degrees', Compass.slopeDegrees, [this.ratio]]
        return this.nodes()
    }
    inputDegrees() {
        this.degrees = [0, 'degrees', Dag.input, []]
        this.ratio = [0, 'ratio', Compass.slopeRatio, [this.degrees]]
        return this.nodes()
    }
}