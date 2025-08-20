import { Dag, L, U, SurfaceBedEquations as Eq } from '../../modules/index.js'
import { NodeDef } from './NodeDef.js'

export class Curing extends NodeDef {
    constructor(prefix) {
        super(prefix)
    }
    input() {
        this.cured = [0, U.fraction, Dag.input, []]
        return this.nodes()
    }
    estimated(moistureModule) {
        this.cured = [0, U.fraction, Eq.curedHerbFraction, [moistureModule.mherb]]
        return this.nodes()
    }
}
