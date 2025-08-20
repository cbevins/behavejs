import {Calc, Dag, L, U } from '../../modules/index.js'
import { FuelElement } from './FuelElement.js'
import { NodeDef } from './NodeDef.js'

export class FuelElementDead1 extends FuelElement {
    constructor(prefix, lcat) {
        super(prefix)
    }
    standard(moisture) {
        this.type = ['dead 1-h', U.ftype, Dag.constant, []]
        this.life = [L.dead, U.life, Dag.constant, []],
        this.load = [0, U.load, Dag.assign, [fuel+L.fmload1]]
        this.savr = [1, U.savr, Dag.assign, [fuel+L.fmsavr1]]
        this.heat = [8000, U.heat, Dag.assign, [fuel+L.fmheatdead]]
        this.mois = [1, U.mois, Dag.assign, [moisture.d1]]
        this.dens = [32, U.dens, Dag.constant, []]
        this.seff = [0.01, U.seff, Dag.constant, []]
        this.stot = [0.0555, U.stot, Dag.constant, []]
        return this.nodes()        
    }
}