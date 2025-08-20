import { Dag, L, U } from '../../modules/index.js'
import { StandardFuelModelCatalog as Eq, FuelModelOptions } from '../../modules/index.js'
import { NodeDef } from './NodeDef.js'

export class StandardFuel extends NodeDef {
    constructor(prefix) {
        super(prefix)
    }
    catalog() {
        this.fmtype = ['standard', U.text, Dag.constant, []]
        this.fmalias = [      '', U.fmkey, Dag.input, []]
        this.fmkey = [        '', U.fmkey, Eq.key, [this.fmkey]]
        this.fmnumb = [        0, U.fmnumb, Eq.number, [this.fmkey]]
        this.fmcode = [   'none', U.fmcode, Eq.code, [this.fmkey]]
        this.fmlabel = [      '', U.fmlabel, Eq.label, [this.fmkey]]
        this.fmdepth = [       1, U.depth, Eq.depth, [this.fmkey]]
        this.fmmext = [     0.25, U.mois, Eq.mext, [this.fmkey]]
        this.fmheatdead = [ 8000, U.heat, Eq.heatDead, [this.fmkey]]
        this.fmheatlive = [ 8000, U.heat, Eq.heatLive, [this.fmkey]]
        this.fmload1 = [       0, U.load, Eq.load1, [this.fmkey]]
        this.fmload10 = [      0, U.load, Eq.load10, [this.fmkey]]
        this.fmload100 = [     0, U.load, Eq.load100, [this.fmkey]]
        this.fmloadherb = [    0, U.load, Eq.loadHerb, [this.fmkey]]
        this.fmloadstem = [    0, U.load, Eq.loadStem, [this.fmkey]]
        this.fmsavr1 = [       1, U.savr, Eq.savr1, [this.fmkey]]
        this.fmsavrherb = [    1, U.savr, Eq.savrHerb, [this.fmkey]]
        this.fmsavrstem = [    1, U.savr, Eq.savrStem, [this.fmkey]]
        return this.nodes()
    }
    input() {
        this.fmtype = ['standard', U.text, Dag.constant, []]
        this.fmkey = [        '', U.fmkey, Dag.input, []]
        this.fmalias = [      '', U.fmkey, Dag.assign, [this.fmkey]]
        this.fmnumb = [        0, U.fmnumb, Eq.number, [this.fmkey]]
        this.fmcode = [   'none', U.fmcode, Eq.code, [this.fmkey]]
        this.fmlabel = [      '', U.fmlabel, Dag.input, []]
        this.fmdepth = [       1, U.depth, Dag.input, []]
        this.fmmext = [     0.25, U.mois, Dag.input, []]
        this.fmheatdead = [ 8000, U.heat, Dag.input, []]
        this.fmheatlive = [ 8000, U.heat, Dag.input, []]
        this.fmload1 = [       0, U.load, Dag.input, []]
        this.fmload10 = [      0, U.load, Dag.input, []]
        this.fmload100 = [     0, U.load, Dag.input, []]
        this.fmloadherb = [    0, U.load, Dag.input, []]
        this.fmloadstem = [    0, U.load, Dag.input, []]
        this.fmsavr1 = [       1, U.savr, Dag.input, []]
        this.fmsavrherb = [    1, U.savr, Dag.input, []]
        this.fmsavrstem = [    1, U.savr, Dag.input, []]
        return this.nodes()
    }
}
