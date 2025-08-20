import {Calc, Dag, L, U } from '../../modules/index.js'
import {SurfaceBedEquations as Bed} from '../../modules/index.js'
import { FuelElement } from './FuelElement.js'
import { NodeDef } from './NodeDef.js'

export class FuelLife extends NodeDef {
    /**
     * 
     * @param {string} prefix Something like 'surface/primary/bed/dead/'
     * @param {string} life 'dead' or 'live'
     * @param {FuelBed} bed Reference to the parent FuelBed class
     * @param {*} fuel Reference to a Fuel Model Module 
     * @param {*} moisture Reference to a Fuel Moisture Module
     * @param {FuelLife} dead Reference to the dead instance of this class, used by live class instances
     */
    constructor(prefix) {
        super(prefix)
    }
    common(life, bed, fuel, moisture, dead) {
        const p1 = new FuelElementDead1(prefix+'/1', this).standard(moisture)
        const p2 = new FuelElement(prefix+'/2', life, this, moisture)
        const p3 = new FuelElement(prefix+'/3', life, this, moisture)
        const p4 = new FuelElement(prefix+'/4', life, this, moisture)
        const p5 = new FuelElement(prefix+'/5', life, this, moisture)
        // The following nodes only exist for the surface fire 'dead' category
        // only used by 'dead', but could still be calculated (and ignored) for live
        this.efwl = [0, U.efwl, Calc.sum, [p1.efwl, p2.efwl, p3.efwl, p4.efwl, p5.efwl]]
        // only used by 'dead', but could still be calculated (and ignored) for live
        this.efmc = [0, U.mois, Calc.divide, [this.efwl, this.efol]]
        if (life === 'dead') {
            this.mext = [1, U.mois, Dag.assign, [bed.mext]]
            // Not used at all by dead
            this.mextf = [1, U.factor, Dag.constant, []]
        }
        // The following nodes only used by the surface fuel bed 'live' category
        else {
            // only used by live, but could be set to constant 1 for dead
            this.mextf = [0, U.factor, Bed.liveFuelExtinctionMoistureContentFactor, [dead.efol, live.efol]]
            this.mext = [1, U.mois, Bed.liveFuelExtinctionMoistureContent, [this.mextf, dead.efmc, dead.mext]]
        }

        this.sa = [0, U.sa, Calc.sum, [p1.sa, p2.sa, p3.sa, p4.sa, p5.sa]]
        
        this.sawf = [0, U.fraction, Calc.divide, [this.sa, bed.sa]]

        this.etas = [0, U.fraction, Bed.mineralDamping, [this.seff]]
        
        this.etam = [0, U.fraction, Bed.moistureDamping, [this.mois, this.mext]]
        
        this.heat = [0, U.heat,
            Calc.sumOfProducts, [p1.sawf, p2.sawf, p3.sawf, p4.sawf, p5.sawf,
                p1.heat, p2.heat, p3.heat, p4.heat, p5.heat]]
        
        this.load = [0, U.load, Calc.sum, [p1.load, p2.load, p3.load, p4.load, p5.load]]
        
        this.efol = [0, U.load, Calc.sum, [p1.efol, p2.efol, p3.efol, p4.efol, p5.efol]]

        this.mois = [1, U.mois,
            Calc.sumOfProducts, [p1.sawf, p2.sawf, p3.sawf, p4.sawf, p5.sawf,
                p1.mois, p2.mois, p3.mois, p4.mois, p5.mois]]

        this.vol = [0, U.vol, Calc.sum, [p1.vol, p2.vol, p3.vol, p4.vol, p5.vol]]
        
        this.qig = [0, U.qig,
            Calc.sumOfProducts, [p1.sawf, p2.sawf, p3.sawf, p4.sawf, p5.sawf,
                p1.qig, p2.qig, p3.qig, p4.qig, p5.qig]]

        this.rxi = [0, U.rxi, Calc.multiply, [this.dfrxi, this.etam]]

        this.dfrxi = [0, U.rxi,
            Bed.dryFuelReactionIntensity, [bed.rxvo, this.net, this.heat, this.etas]],

        this.savr = [1, U.savr,
            Calc.sumOfProducts, [p1.sawf, p2.sawf, p3.sawf, p4.sawf, p5.sawf,
                p1.savr, p2.savr, p3.savr, p4.savr, p5.savr]]

        this.seff = [0, U.seff,
            Calc.sumOfProducts, [p1.sawf, p2.sawf, p3.sawf, p4.sawf, p5.sawf,
                p1.seff, p2.seff, p3.seff, p4.seff, p5.seff]]
        
        this.scar = [0, U.scwf, Bed.sizeClassWeightingFactorArray,
            [p1.sa, p1.size, p2.sa, p2.size, p3.sa, p3.size, p4.sa, p4.size, p5.sa, p5.size]]

        // Note that this uses the *SIZE CLASS* weighting factors!!
        this.net = [0, U.load,
            Calc.sumOfProducts, [p1.scwf, p2.scwf, p3.scwf, p4.scwf, p5.scwf,
                p1.net, p2.net, p3.net, p4.net, p5.net]]
    }
}
