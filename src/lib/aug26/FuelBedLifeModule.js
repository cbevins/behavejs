/**
 * @file Behavejs 'fuel/dead' and '/fuel/live' Dag node definitions.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 */
import { Dag, ModuleBase, U } from './index.js'
import { Calc, FuelBedEquations as Eq} from '../index.js'

export class FuelBedLifeModule extends ModuleBase {
    /**
     * Creates the fire fuel bed dead/live module nodes.
     * @param {string} bed Prefix for this module's fuel bed ('site/surface/{primary|secondary}/bed/')
     * @param {string} life Either 'dead' or 'live' life category
     */
    constructor(bed, life){
        const path = bed + life + '/'
        super(path)
        const dead = bed + 'dead/'
        const live = bed + 'live/'

        // fully qualified node keys
        this.efmc = 'effective fuel/moisture content'
        this.efwl = 'effective fuel/water load'
        this.etam = 'moisture damping coefficient'
        this.etas = 'mineral damping coefficient'
        this.heat = 'heat of combustion'
        this.load = 'fuel ovendry load'
        this.mext = 'extinction moisture content'
        this.mextf = 'extinction moisture content/factor'
        this.mois = 'moisture content'
        this.qig = 'heat of pre-ignition'
        this.sa = 'surface area'
        this.savr = 'surface area-to-volume ratio'
        this.sawf = 'surface area weighting factor'
        this.vol = 'volume'

        const p1 = path + 'element/1/'
        const p2 = path + 'element/2/'
        const p3 = path + 'element/3/'
        const p4 = path + 'element/4/'
        const p5 = path + 'element/5/'

        const p = {
            efwl: 'effective fuel/water load',
            efol: 'effective fuel/ovendry load',
        }
        // The following nodes only exist for the surface fuel 'dead' category
        const deadNodes = [
            // The following nodes need no further modification or linkage:
            [this.efwl, 0, U.efwl, Calc.sum, [p1+p.efwl, p2+p.efwl, p3+p.efwl, p4+p.efwl, p5+p.efwl]],
            [this.efmc, 0, U.mois, Calc.divide, [this.efwl, this.efol]],
            [this.mext, 1, U.mois, Dag.assign, [bed+L.mext]],
        ]

        // The following nodes only exist for the surface fuel 'live' category
        const liveNodes = [
            // The following nodes need no further modification or linkage:
            [this.mextf, 0, U.factor,
                Eq.liveFuelExtinctionMoistureContentFactor, [dead+L.efol, live+L.efol]],
            [this.mext, 1, U.mois,
                Eq.liveFuelExtinctionMoistureContent, [this.mextf, dead+L.efmc, dead+L.mext]]
        ]

        // The following nodes exist for both 'dead' and 'live' categories
        const categoryNodes = [
            // The following nodes need no further modification or linkage:
            [this.sa, 0, U.sa, Calc.sum, [p1+L.sa, p2+L.sa, p3+L.sa, p4+L.sa, p5+L.sa]],
            
            [this.sawf, 0, U.fraction, Calc.divide, [this.sa, bed+L.sa]],

            [this.etas, 0, U.fraction, Eq.mineralDamping, [this.seff]],
            
            [this.etam, 0, U.fraction, Eq.moistureDamping, [this.mois, this.mext]],
            
            [this.heat, 0, U.heat,
                Calc.sumOfProducts, [p1+L.sawf, p2+L.sawf, p3+L.sawf, p4+L.sawf, p5+L.sawf,
                    p1+L.heat, p2+L.heat, p3+L.heat, p4+L.heat, p5+L.heat]],
            
            [this.load, 0, U.load, Calc.sum, [p1+L.load, p2+L.load, p3+L.load, p4+L.load, p5+L.load]],
            
            [this.efol, 0, U.load, Calc.sum, [p1+L.efol, p2+L.efol, p3+L.efol, p4+L.efol, p5+L.efol]],

            [this.mois, 1, U.mois,
                Calc.sumOfProducts, [p1+L.sawf, p2+L.sawf, p3+L.sawf, p4+L.sawf, p5+L.sawf,
                    p1+L.mois, p2+L.mois, p3+L.mois, p4+L.mois, p5+L.mois]],

            [this.vol, 0, U.vol, Calc.sum, [p1+L.vol, p2+L.vol, p3+L.vol, p4+L.vol, p5+L.vol]],
            
            [this.qig, 0, U.qig,
                Calc.sumOfProducts, [p1+L.sawf, p2+L.sawf, p3+L.sawf, p4+L.sawf, p5+L.sawf,
                    p1+L.qig, p2+L.qig, p3+L.qig, p4+L.qig, p5+L.qig]],

            [this.rxi, 0, U.rxi, Calc.multiply, [this.dfrxi, this.etam]],

            [this.dfrxi, 0, U.rxi,
                Eq.dryFuelReactionIntensity, [bed+L.rxvo, this.net, this.heat, this.etas]],

            [this.savr, 1, U.savr,
                Calc.sumOfProducts, [p1+L.sawf, p2+L.sawf, p3+L.sawf, p4+L.sawf, p5+L.sawf,
                    p1+L.savr, p2+L.savr, p3+L.savr, p4+L.savr, p5+L.savr]],

            [this.seff, 0, U.seff,
                Calc.sumOfProducts, [p1+L.sawf, p2+L.sawf, p3+L.sawf, p4+L.sawf, p5+L.sawf,
                    p1+L.seff, p2+L.seff, p3+L.seff, p4+L.seff, p5+L.seff]],
            
            [this.scar, 0, U.scwf, Eq.sizeClassWeightingFactorArray,
                [p1+L.sa, p1+L.size, p2+L.sa, p2+L.size, p3+L.sa, p3+L.size, p4+L.sa, p4+L.size, p5+L.sa, p5+L.size]],

            // Note that this uses the *SIZE CLASS* weighting factors!!
            [this.net, 0, U.load,
                Calc.sumOfProducts, [p1+L.scwf, p2+L.scwf, p3+L.scwf, p4+L.scwf, p5+L.scwf,
                    p1+L.net, p2+L.net, p3+L.net, p4+L.net, p5+L.net]],
        ]
    
        // Dead, live, and canopy fuels have their own extinction moisture content methods
        if (lcat === 'dead') {
            if (id === 'crown/canopy') return [...crownFireNodes, ...categoryNodes]
            return [...deadNodes,  ...categoryNodes]
        }
        return [...liveNodes, ...categoryNodes]
    }
}
