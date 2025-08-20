import {Calc, Dag, L, U } from '../../modules/index.js'
import {SurfaceElementEquations as El} from '../../modules/index.js'
import { NodeDef } from './NodeDef.js'

export class FuelElement extends NodeDef{
    constructor(prefix, lcat) {
        super(prefix)

        // input nodes
        this.type = ['unused', U.ftype, Dag.constant, []]
        this.load = [0, U.load, Dag.constant, []]
        this.savr = [1, U.savr, Dag.constant, []]
        this.heat = [0, U.heat, Dag.constant, []]
        this.dens = [0, U.dens, Dag.constant, []]
        this.seff = [0, U.seff, Dag.constant, []]
        this.stot = [0, U.stot, Dag.constant, []]
        this.mois = [1, U.mois, Dag.constant, []]

        // 1 constant node
        this.life = [life, U.life, Dag.constant, []]
    
        // 12 derived characteristics
        this.ehn = [0, U.ehn, El.effectiveHeatingNumber, [this.savr]]

        this.efol = [0, U.load, El.effectiveFuelLoad, [this.savr, this.load, this.life]]

        this.qig = [0, U.qig, El.heatOfPreignition, [this.mois, this.ehn]]

        this.net = [0, U.load, El.netOvendryLoad, [this.load, this.stot]]

        this.size = [0, U.size, El.sizeClass, [this.savr]]

        this.scwf = [0, U.scwf, El.sizeClassWeightingFactor, [
                this.size,             // element's size class index
                lcat.scar]]    // into this size class weighting array

        this.sa = [0, U.sa, El.surfaceArea, [this.load, this.savr, this.dens]]

        this.sawf = [0, U.sawf, El.surfaceAreaWeightingFactor, [this.sa, lcat.sa]]

        this.vol = [0, U.vol, El.volume, [this.load, this.dens]]

        this.efwl = [0, U.efwl, El.effectiveFuelWaterLoad, [this.efol, this.mois]]

        this.diam = [0, U.fleng, El.cylindricalDiameter, [this.savr]]

        this.leng = [0, U.fleng, El.cylindricalLength, [this.diam, this.vol]]
    }
}
