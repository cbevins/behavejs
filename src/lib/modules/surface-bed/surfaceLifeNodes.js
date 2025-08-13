/**
 * @file Behavejs 'fuel/dead' and '/fuel/live' Dag node definitions.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 */
import {Calc, Dag, SurfaceBedEquations as Eq, L, U} from '../index.js'

/**
 * @param {string} bed Module pathway prefixed to all the returned nodes' keys
 * @param {string} lcat Either 'dead' or 'live' life category
 * @returns Array of surface fuel bed life module node definitions
 */
export function surfaceLifeNodes(bed, lcat) {
    const id = bed + lcat + '/'
    const dead = bed + 'dead/'
    const live = bed + 'live/'

    const p1 = id + 'element/1/'
    const p2 = id + 'element/2/'
    const p3 = id + 'element/3/'
    const p4 = id + 'element/4/'
    const p5 = id + 'element/5/'

    // The following node only exists for the crown fire module
    const crownFireNodes = [
        // The following nodes need no further modification or linkage:
        ['crown/canopy/fuel/dead/'+L.mext, 0.25, U.mois, Dag.constant, []]
    ]

    // The following nodes only exist for the surface fire 'dead' category
    const deadNodes = [
        // The following nodes need no further modification or linkage:
        [id+L.efwl, 0, U.efwl, Calc.sum, [p1+L.efwl, p2+L.efwl, p3+L.efwl, p4+L.efwl, p5+L.efwl]],
        [id+L.efmc, 0, U.mois, Calc.divide, [id+L.efwl, id+L.efol]],
        [id+L.mext, 1, U.mois, Dag.assign, [bed+L.mext]],
    ]

    // The following nodes only exist for the surface fire 'live' category
    const liveNodes = [
        // The following nodes need no further modification or linkage:
        [id+L.mextf, 0, U.factor,
            Eq.liveFuelExtinctionMoistureContentFactor, [dead+L.efol, live+L.efol]],
        [id+L.mext, 1, U.mois,
            Eq.liveFuelExtinctionMoistureContent, [id+L.mextf, dead+L.efmc, dead+L.mext]]
    ]

    // The following nodes exist for both 'dead' and 'live' categories
    const categoryNodes = [
        // The following nodes need no further modification or linkage:
        [id+L.sa, 0, U.sa, Calc.sum, [p1+L.sa, p2+L.sa, p3+L.sa, p4+L.sa, p5+L.sa]],
        
        [id+L.sawf, 0, U.fraction, Calc.divide, [id+L.sa, bed+L.sa]],

        [id+L.etas, 0, U.fraction, Eq.mineralDamping, [id+L.seff]],
        
        [id+L.etam, 0, U.fraction, Eq.moistureDamping, [id+L.mois, id+L.mext]],
        
        [id+L.heat, 0, U.heat,
            Calc.sumOfProducts, [p1+L.sawf, p2+L.sawf, p3+L.sawf, p4+L.sawf, p5+L.sawf,
                p1+L.heat, p2+L.heat, p3+L.heat, p4+L.heat, p5+L.heat]],
        
        [id+L.load, 0, U.load, Calc.sum, [p1+L.load, p2+L.load, p3+L.load, p4+L.load, p5+L.load]],
        
        [id+L.efol, 0, U.load, Calc.sum, [p1+L.efol, p2+L.efol, p3+L.efol, p4+L.efol, p5+L.efol]],

        [id+L.mois, 1, U.mois,
            Calc.sumOfProducts, [p1+L.sawf, p2+L.sawf, p3+L.sawf, p4+L.sawf, p5+L.sawf,
                p1+L.mois, p2+L.mois, p3+L.mois, p4+L.mois, p5+L.mois]],

        [id+L.vol, 0, U.vol, Calc.sum, [p1+L.vol, p2+L.vol, p3+L.vol, p4+L.vol, p5+L.vol]],
        
        [id+L.qig, 0, U.qig,
            Calc.sumOfProducts, [p1+L.sawf, p2+L.sawf, p3+L.sawf, p4+L.sawf, p5+L.sawf,
                p1+L.qig, p2+L.qig, p3+L.qig, p4+L.qig, p5+L.qig]],

        [id+L.rxi, 0, U.rxi, Calc.multiply, [id+L.dfrxi, id+L.etam]],

        [id+L.dfrxi, 0, U.rxi,
            Eq.dryFuelReactionIntensity, [bed+L.rxvo, id+L.net, id+L.heat, id+L.etas]],

        [id+L.savr, 1, U.savr,
            Calc.sumOfProducts, [p1+L.sawf, p2+L.sawf, p3+L.sawf, p4+L.sawf, p5+L.sawf,
                p1+L.savr, p2+L.savr, p3+L.savr, p4+L.savr, p5+L.savr]],

        [id+L.seff, 0, U.seff,
            Calc.sumOfProducts, [p1+L.sawf, p2+L.sawf, p3+L.sawf, p4+L.sawf, p5+L.sawf,
                p1+L.seff, p2+L.seff, p3+L.seff, p4+L.seff, p5+L.seff]],
        
        [id+L.scar, 0, U.scwf, Eq.sizeClassWeightingFactorArray,
            [p1+L.sa, p1+L.size, p2+L.sa, p2+L.size, p3+L.sa, p3+L.size, p4+L.sa, p4+L.size, p5+L.sa, p5+L.size]],

        // Note that this uses the *SIZE CLASS* weighting factors!!
        [id+L.net, 0, U.load,
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
