/**
 * @file Behavejs 'fuel/dead' and '/fuel/live' Dag node definitions.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 */
import {Calc, Dag, FuelBedEquations as Eq, Util, K} from '../index.js'

export function surfaceLifeNodes(bedId, lcat, fuelId, moisId) {
    // The id will be .../bed/dead or .../bed/live
    const id = bedId + lcat + '/'
    const dead = bedId + 'dead/'
    const live = bedId + 'live/'

    const p1 = id + 'element/1/'
    const p2 = id + 'element/2/'
    const p3 = id + 'element/3/'
    const p4 = id + 'element/4/'
    const p5 = id + 'element/5/'
    // The following node only exists for the crown fire module
    const crownFireNodes = [
        // The following nodes need no further modification or linkage:
        ['crown/canopy/fuel/dead/'+K.mext, 0.25, K._mois, Dag.constant, []]
    ]

    // The following nodes only exist for the surface fire 'dead' category
    const deadNodes = [
        // The following nodes need no further modification or linkage:
        [id+K.efwl, 0, K._efwl, Calc.sum, [p1+K.efwl, p2+K.efwl, p3+K.efwl, p4+K.efwl, p5+K.efwl]],
        [id+K.efmc, 0, K._mois, Calc.divide, [id+K.efwl, id+K.efol]]
    ]

    // The following nodes only exist for the surface fire 'live' category
    const liveNodes = [
        // The following nodes need no further modification or linkage:
        [id+K.mextf, 0, K._factor,
            Eq.liveFuelExtinctionMoistureContentFactor, [dead+K.efol, live+K.efol]],
        [id+K.mext, 1, K._mois,
            Eq.liveFuelExtinctionMoistureContent, [id+K.mextf, dead+K.efmc, dead+K.mext]]
    ]

    // The following nodes exist for both 'dead' and 'live' categories
    const categoryNodes = [
        // The following nodes need no further modification or linkage:
        [id+K.sa, 0, K._sa, Calc.sum, [p1+K.sa, p2+K.sa, p3+K.sa, p4+K.sa, p5+K.sa]],
        
        [id+K.sawf, 0, K._fraction, Calc.divide, [id+K.sa, bedId+K.sa]],

        [id+K.etas, 0, K._fraction, Eq.mineralDamping, [id+K.seff]],
        
        [id+K.etam, 0, K._fraction, Eq.moistureDamping, [id+K.mois, id+K.mext]],
        
        [id+K.heat, 8000, K._heat,
            Calc.sumOfProducts, [p1+K.sawf, p2+K.sawf, p3+K.sawf, p4+K.sawf, p5+K.sawf,
                p1+K.heat, p2+K.heat, p3+K.heat, p4+K.heat, p5+K.heat]],
        
        [id+K.load, 0, K._load, Calc.sum, [p1+K.load, p2+K.load, p3+K.load, p4+K.load, p5+K.load]],
        
        [id+K.efol, 0, K._load, Calc.sum, [p1+K.efol, p2+K.efol, p3+K.efol, p4+K.efol, p5+K.efol]],

        [id+K.mois, 1, K._mois,
            Calc.sumOfProducts, [p1+K.sawf, p2+K.sawf, p3+K.sawf, p4+K.sawf, p5+K.sawf,
                p1+K.mois, p2+K.mois, p3+K.mois, p4+K.mois, p5+K.mois]],

        [id+K.vol, 0, K._vol, Calc.sum, [p1+K.vol, p2+K.vol, p3+K.vol, p4+K.vol, p5+K.vol]],
        
        [id+K.qig, 0, K._qig,
            Calc.sumOfProducts, [p1+K.sawf, p2+K.sawf, p3+K.sawf, p4+K.sawf, p5+K.sawf,
                p1+K.qig, p2+K.qig, p3+K.qig, p4+K.qig, p5+K.qig]],

        [id+K.rxi, 0, K._rxi, Calc.multiply, [id+K.dfrxi, id+K.etam]],

        [id+K.dfrxi, 0, K._rxi,
            Eq.dryFuelReactionIntensity, [bedId+K.rxvo, id+K.net, id+K.heat, id+K.etas]],

        [id+K.savr, 1, K._savr,
            Calc.sumOfProducts, [p1+K.sawf, p2+K.sawf, p3+K.sawf, p4+K.sawf, p5+K.sawf,
                p1+K.savr, p2+K.savr, p3+K.savr, p4+K.savr, p5+K.savr]],

        [id+K.seff, 0, K._seff,
            Calc.sumOfProducts, [p1+K.sawf, p2+K.sawf, p3+K.sawf, p4+K.sawf, p5+K.sawf,
                p1+K.seff, p2+K.seff, p3+K.seff, p4+K.seff, p5+K.seff]],
        
        [id+K.scar, 0, K._scwf, Eq.sizeClassWeightingFactorArray,
            [p1+K.sa, p1+K.size, p2+K.sa, p2+K.size, p3+K.sa, p3+K.size, p4+K.sa, p4+K.size, p5+K.sa, p5+K.size]],

        // Note that this uses the *SIZE CLASS* weighting factors!!
        [id+K.net, 0, K._net,
            Calc.sumOfProducts, [p1+K.scwf, p2+K.scwf, p3+K.scwf, p4+K.scwf, p5+K.scwf,
                p1+K.net, p2+K.net, p3+K.net, p4+K.net, p5+K.net]],
    ]
    
    // Dead, live, and canopy fuels have their own extinction moisture content methods
    if (lcat === 'dead') {
        if (id === 'crown/canopy') return [...crownFireNodes, ...categoryNodes]
        return [...deadNodes,  ...categoryNodes]
    }
    return [...liveNodes, ...categoryNodes]
}
