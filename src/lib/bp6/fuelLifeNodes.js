/**
 * @file Behavejs 'fuel/dead' and '/fuel/live' Dag node definitions.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 */
import {Calc} from './Calc.js'
import {Dag} from './Dag.js'
import {Util} from './Util.js'
import {FuelBedEquations as Eq} from './FuelBedEquations.js'
import { 
    efmc, efol, efwl, etam, etas, heat, load, mext, mextf, mois, net, qig, rxi, 
    rxvo, sa, savr, sawf, scar, scwf, seff, size, stot, vol,
    _efmc, _efwl, _factor, _fraction, _heat, _load, _mois, _net, _qig, _rxi, _sa, _savr,
    _scwf, _seff, _stot, _vol,
} from './standardKeys.js'

/**
 * 
 * @param {*} prefix is 'surface/primary', 'surface/secondary', or 'crown/canopy'
 * @param {*} deadOrLive must be 'dead' or 'live'
 * @returns Map of node key-array
 */
export function fuelLifeNodes(prefix, deadOrLive) {
    const bed = prefix + '/fuel/bed/'
    const dead = prefix + '/fuel/dead/'
    const live = prefix + '/fuel/live/'
    // The following keys are only used by this file
    const life = prefix + '/fuel/'+deadOrLive+'/'
    const p1 = life + 'element 1/'
    const p2 = life + 'element 2/'
    const p3 = life + 'element 3/'
    const p4 = life + 'element 4/'
    const p5 = life + 'element 5/'
    const dfrxi = 'dry fuel reaction intensity'

    // The following nodes exist for both 'dead' and 'live' fuels
    const nodes = [
        [life+sa, 0, _sa, Calc.sum, [p1+sa, p2+sa, p3+sa, p4+sa, p5+sa]],
        
        [life+sawf, 0, _fraction, Calc.divide, [life+sa, bed+sa]],

        [life+etas, 0, _fraction, Eq.mineralDamping, [life+seff]],
        
        [life+etam, 0, _fraction, Eq.moistureDamping, [life+mois, life+mext]],
        
        [life+heat, 8000, _heat,
            Calc.sumOfProducts, [p1+sawf, p2+sawf, p3+sawf, p4+sawf, p5+sawf,
                p1+heat, p2+heat, p3+heat, p4+heat, p5+heat]],
        
        [life+load, 0, _load,
            Calc.sum, [p1+load, p2+load, p3+load, p4+load, p5+load]],
        
        [life+efol, 0, _load,
            Calc.sum, [p1+efol, p2+efol, p3+efol, p4+efol, p5+efol]],

        [life+mois, 1, _mois,
            Calc.sumOfProducts, [p1+sawf, p2+sawf, p3+sawf, p4+sawf, p5+sawf,
                p1+mois, p2+mois, p3+mois, p4+mois, p5+mois]],

        [life+vol, 0, _vol,
            Calc.sum, [p1+vol, p2+vol, p3+vol, p4+vol, p5+vol]],
        
        [life+qig, 0, _qig,
            Calc.sumOfProducts, [p1+sawf, p2+sawf, p3+sawf, p4+sawf, p5+sawf,
                p1+qig, p2+qig, p3+qig, p4+qig, p5+qig]],

        [life+rxi, 0, _rxi, Calc.multiply, [life+dfrxi, life+etam]],

        [life+dfrxi, 0, _rxi,
            Eq.dryFuelReactionIntensity, [
                bed+rxvo, life+net, life+heat, life+etas]],

        [life+savr, 1, _savr,
            Calc.sumOfProducts, [p1+sawf, p2+sawf, p3+sawf, p4+sawf, p5+sawf,
                p1+savr, p2+savr, p3+savr, p4+savr, p5+savr]],

        [life+seff, 0, _seff,
            Calc.sumOfProducts, [p1+sawf, p2+sawf, p3+sawf, p4+sawf, p5+sawf,
                p1+seff, p2+seff, p3+seff, p4+seff, p5+seff]],
        
        [life+scar, 0, _scwf,
            Eq.sizeClassWeightingFactorArray, [p1+sa, p1+size, p2+sa, p2+size,
                p3+sa, p3+size, p4+sa, p4+size, p5+sa, p5+size]],

        // Note that this uses the *SIZE CLASS* weighting factors!!
        [life+net, 0, _net,
            Calc.sumOfProducts, [p1+scwf, p2+scwf, p3+scwf, p4+scwf, p5+scwf,
                p1+net, p2+net, p3+net, p4+net, p5+net]],
    ]
    
    // Dead, live, and canopy fuels have their own extinction moisture content methods
    if (deadOrLive === 'dead') {
        if (prefix === 'crown/canopy') {
            nodes.push(
                ['crown/canopy/fuel/bed/dead/'+mext, 0.25, _mois, Dag.constant, []])
        } else {
            nodes.push(
                [life+mext, 1, _mois, Dag.input, []],
                [life+efwl, 0, _efwl, Calc.sum, [p1+efwl, p2+efwl, p3+efwl, p4+efwl, p5+efwl]],
                [life+efmc, 0, _mois, Calc.divide, [life+efwl, life+efol]]
            )
        }
    } else {
        nodes.push(
            [life+mextf, 0, _factor,
                Eq.liveFuelExtinctionMoistureContentFactor, [dead+efol, live+efol]],
            [life+mext, 1, _mois,
                Eq.liveFuelExtinctionMoistureContent, [life+mextf, dead+efmc, dead+mext]]
        )
    }
    return Util.nodesToMap(nodes)
}
