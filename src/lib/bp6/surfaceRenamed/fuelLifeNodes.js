/**
 * @file Behavejs 'fuel/dead' and '/fuel/live' Dag node definitions.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 */
import {Calc, Dag, FuelBedEquations as Eq, Util, K} from '../index.js'
import { fuelElementNodes } from './fuelElementNodes.js'

/**
 * The following nodes' update method should be changed from Dag.constant
 * by one or more external submodules:
 * - /fuel/dead/mext
 * 
 * @param {string} f is 'surface/fuel/1', 'surface/fuel/1', or 'crown/canopy'
 * @param {string} deadOrLive must be 'dead' or 'live'
 * @returns Array of node defs
 */
export function fuelLifeNodes(f, deadOrLive) {
    const bed = f + K.bed
    const dead = f + K.dead
    const live = f + K.live

    // The following keys are only used within this file
    const life = bed + deadOrLive
    const p1 = life + 'element/1/'
    const p2 = life + 'element/2/'
    const p3 = life + 'element/3/'
    const p4 = life + 'element/4/'
    const p5 = life + 'element/5/'

    // The following node only exists for the crown fire module
    const crownFireNodes = [
        // The following nodes need no further modification or linkage:
        ['crown/canopy/fuel/dead/'+K.mext, 0.25, K._mois, Dag.constant, []]
    ]

    // The following nodes only exist for the surface fire 'dead' category
    const deadNodes = [
        // The following node's update method should be changed from Dag.constant
        // by one or more external submodules:
        [life+K.mext, 1, K._mois, Dag.constant, []],
        // The following nodes need no further modification or linkage:
        [life+K.efwl, 0, K._efwl, Calc.sum, [p1+K.efwl, p2+K.efwl, p3+K.efwl, p4+K.efwl, p5+K.efwl]],
        [life+K.efmc, 0, K._mois, Calc.divide, [life+K.efwl, life+K.efol]]
    ]

    // The following nodes only exist for the surface fire 'live' category
    const liveNodes = [
        // The following nodes need no further modification or linkage:
        [life+K.mextf, 0, K._factor,
            Eq.liveFuelExtinctionMoistureContentFactor, [dead+K.efol, live+K.efol]],
        [life+K.mext, 1, K._mois,
            Eq.liveFuelExtinctionMoistureContent, [life+K.mextf, dead+K.efmc, dead+K.mext]]
    ]

    // The following nodes exist for both 'dead' and 'live' categories
    const categoryNodes = [
        // The following nodes need no further modification or linkage:
        [life+K.sa, 0, K._sa, Calc.sum, [p1+K.sa, p2+K.sa, p3+K.sa, p4+K.sa, p5+K.sa]],
        
        [life+K.sawf, 0, K._fraction, Calc.divide, [life+K.sa, bed+K.sa]],

        [life+K.etas, 0, K._fraction, Eq.mineralDamping, [life+K.seff]],
        
        [life+K.etam, 0, K._fraction, Eq.moistureDamping, [life+K.mois, life+K.mext]],
        
        [life+K.heat, 8000, K._heat,
            Calc.sumOfProducts, [p1+K.sawf, p2+K.sawf, p3+K.sawf, p4+K.sawf, p5+K.sawf,
                p1+K.heat, p2+K.heat, p3+K.heat, p4+K.heat, p5+K.heat]],
        
        [life+K.load, 0, K._load, Calc.sum, [p1+K.load, p2+K.load, p3+K.load, p4+K.load, p5+K.load]],
        
        [life+K.efol, 0, K._load, Calc.sum, [p1+K.efol, p2+K.efol, p3+K.efol, p4+K.efol, p5+K.efol]],

        [life+K.mois, 1, K._mois,
            Calc.sumOfProducts, [p1+K.sawf, p2+K.sawf, p3+K.sawf, p4+K.sawf, p5+K.sawf,
                p1+K.mois, p2+K.mois, p3+K.mois, p4+K.mois, p5+K.mois]],

        [life+K.vol, 0, K._vol, Calc.sum, [p1+K.vol, p2+K.vol, p3+K.vol, p4+K.vol, p5+K.vol]],
        
        [life+K.qig, 0, K._qig,
            Calc.sumOfProducts, [p1+K.sawf, p2+K.sawf, p3+K.sawf, p4+K.sawf, p5+K.sawf,
                p1+K.qig, p2+K.qig, p3+K.qig, p4+K.qig, p5+K.qig]],

        [life+K.rxi, 0, K._rxi, Calc.multiply, [life+K.dfrxi, life+K.etam]],

        [life+K.dfrxi, 0, K._rxi,
            Eq.dryFuelReactionIntensity, [bed+K.rxvo, life+K.net, life+K.heat, life+K.etas]],

        [life+K.savr, 1, K._savr,
            Calc.sumOfProducts, [p1+K.sawf, p2+K.sawf, p3+K.sawf, p4+K.sawf, p5+K.sawf,
                p1+K.savr, p2+K.savr, p3+K.savr, p4+K.savr, p5+K.savr]],

        [life+K.seff, 0, K._seff,
            Calc.sumOfProducts, [p1+K.sawf, p2+K.sawf, p3+K.sawf, p4+K.sawf, p5+K.sawf,
                p1+K.seff, p2+K.seff, p3+K.seff, p4+K.seff, p5+K.seff]],
        
        [life+K.scar, 0, K._scwf, Eq.sizeClassWeightingFactorArray,
            [p1+K.sa, p1+K.size, p2+K.sa, p2+K.size, p3+K.sa, p3+K.size, p4+K.sa, p4+K.size, p5+K.sa, p5+K.size]],

        // Note that this uses the *SIZE CLASS* weighting factors!!
        [life+K.net, 0, K._net,
            Calc.sumOfProducts, [p1+K.scwf, p2+K.scwf, p3+K.scwf, p4+K.scwf, p5+K.scwf,
                p1+K.net, p2+K.net, p3+K.net, p4+K.net, p5+K.net]],
    ]

    let elNodes = []
    for(let el of ['1', '2', '3', '4', '5'])
        elNodes = [...elNodes, ...fuelElementNodes(f, deadOrLive, el)]
    
    // Dead, live, and canopy fuels have their own extinction moisture content methods
    if (deadOrLive === 'dead') {
        if (f === 'crown/canopy') return [...crownFireNodes, ...elNodes, ...categoryNodes]
        return [...deadNodes,  ...elNodes, ...categoryNodes]
    }
    return [...liveNodes,  ...elNodes, ...categoryNodes]
}
