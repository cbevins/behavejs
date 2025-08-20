import { Calc, Dag, L, U } from '../../modules/index.js'
import { NodeDef } from './NodeDef.js'

export class MidflameWind extends NodeDef {
    constructor(prefix) {
        super(prefix)
    }
    input() {
        this.atMidflame = [0, U.wspd, Dag.input, []]
        return this.nodes()
    }
    estimated(wind, wrf) {
        this.atMidflame = [0, U.wspd, Calc.multiply, [wind.at20f, wrf.wrf]]
        return this.nodes()
    }
}
