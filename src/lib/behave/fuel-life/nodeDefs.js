/**
 * @file Behave 'fuel/dead' and '/fuel/live' DagNode definitions and creator method.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 */
import {Calc, Dag, DagNode} from '../index.js'
import {Equations as Eq} from '../fuel-bed/equations.js'

// 'deadOrLive' must be 'dead' or 'live'
// 'prefix' is 'surface/primary', 'surface/secondary', or 'crown/canopy'
export function fuelLifeNodeDefs(prefix, deadOrLive) {
    const bed = prefix + '/fuel/bed/'
    const dead = prefix + '/fuel/dead/'
    const live = prefix + '/fuel/live/'
    const life = prefix + '/fuel/'+deadOrLive+'/'
    const p1 = life + 'element 1/'
    const p2 = life + 'element 2/'
    const p3 = life + 'element 3/'
    const p4 = life + 'element 4/'
    const p5 = life + 'element 5/'
    const efmc = 'effective fuel/moisture content'
    const efol = 'effective fuel/ovendry load'
    const efwl = 'effective fuel/water load'
    const etam = 'moisture damping coefficient'
    const etas = 'mineral damping coefficient'
    const heat = 'heat of combustion'
    const qig  = 'heat of pre-ignition'
    const load = 'ovendry load'
    const mext = 'extinction moisture content'
    const mois = 'moisture content'
    const net  = 'net ovendry load'
    const rxi  = 'fire/reaction intensity'
    const rxv  = 'fire/reaction velocity'
    const sa   = 'surface area'
    const savr = 'surface area to volume ratio'
    const sawf = 'surface area weighting factor'
    const scwf = 'size class weighting factor'
    const size = 'size class'
    const seff = 'effective mineral content'
    const stot = 'total mineral content'
    const vol  = 'volume'

    // The following nodes exist for both 'dead' and 'live' fuels
    const nodeDefs = [
        [life+sa, 0, '/fuel/'+sa,
            Calc.sum, [p1+sa, p2+sa, p3+sa, p4+sa, p5+sa]],
        
        [life+sawf, 0, '/fraction', Calc.divide, [life+sa, bed+sa]],

        [life+etas, 0, '/fraction', Eq.mineralDamping, [life+seff]],
        
        [life+etam, 0, '/fraction', Eq.moistureDamping, [life+mois, life+mext]],
        
        [life+heat, 8000, '/fuel/'+heat,
            Calc.sumOfProducts, [p1+sawf, p2+sawf, p3+sawf, p4+sawf, p5+sawf,
                p1+heat, p2+heat, p3+heat, p4+heat, p5+heat]],
        
        [life+load, 0, '/fuel/'+load,
            Calc.sum, [p1+load, p2+load, p3+load, p4+load, p5+load]],
        
        [life+efol, 0, '/fuel/'+load,
            Calc.sum, [p1+efol, p2+efol, p3+efol, p4+efol, p5+efol]],

        [life+mois, 1, '/fuel/'+mois,
            Calc.sumOfProducts, [p1+sawf, p2+sawf, p3+sawf, p4+sawf, p5+sawf,
                p1+mois, p2+mois, p3+mois, p4+mois, p5+mois]],

        [life+vol, 0, '/fuel/'+vol,
            Calc.sum, [p1+vol, p2+vol, p3+vol, p4+vol, p5+vol]],
        
        [life+qig, 0, '/fuel/'+qig,
            Calc.sumOfProducts, [p1+sawf, p2+sawf, p3+sawf, p4+sawf, p5+sawf,
                p1+qig, p2+qig, p3+qig, p4+qig, p5+qig]],

        [life+rxi, 0, '/fire/reaction intensity',
            Calc.multiply, [life+'dry fuel reaction intensity', life+etam]],

        [life+'dry fuel reaction intensity', 0, '/fire/reaction intensity',
            Eq.dryFuelReactionIntensity, [
                bed+rxv+'/optimum', life+net, life+heat, life+etas]],

        [life+savr, 1, '/fuel/'+savr,
            Calc.sumOfProducts, [p1+sawf, p2+sawf, p3+sawf, p4+sawf, p5+sawf,
                p1+savr, p2+savr, p3+savr, p4+savr, p5+savr]],

        [life+seff, 0, '/fuel/mineral content',
            Calc.sumOfProducts, [p1+sawf, p2+sawf, p3+sawf, p4+sawf, p5+sawf,
                p1+seff, p2+seff, p3+seff, p4+seff, p5+seff]],
        
        [life+'size class weighting factor array', 0, '/fuel/weighting factor',
            Eq.sizeClassWeightingFactorArray, [p1+sa, p1+size, p2+sa, p2+size,
                p3+sa, p3+size, p4+sa, p4+size, p5+sa, p5+size]],

        // Note that this uses the *SIZE CLASS* weighting factors!!
        [life+net, 0, '/fuel/'+load,
            Calc.sumOfProducts, [p1+scwf, p2+scwf, p3+scwf, p4+scwf, p5+scwf,
                p1+net, p2+net, p3+net, p4+net, p5+net]],
    ]
    
    // Dead, live, and canopy fuels have their own extinction moisture content methods
    if (deadOrLive === 'dead') {
        if (prefix === 'crown/canopy') {
            nodeDefs.push(
                ['crown/canopy/fuel/bed/dead/'+mext, 0.25, '/fuel/'+mois,
                    Dag.constant, []])
        } else {
            nodeDefs.push(
                [life+mext, 1, '/fuel/'+mois,
                    Dag.input, []],
                [life+efwl, 0, '/fuel/water load',
                    Calc.sum, [p1+efwl, p2+efwl, p3+efwl, p4+efwl, p5+efwl]],
                [life+efmc, 0, '/fuel/'+mois,
                    Calc.divide, [life+efwl, life+efol]]
            )
        }
    } else {
        nodeDefs.push(
            [life+mext+'/factor', 0, '/factor',
                Eq.liveFuelExtinctionMoistureContentFactor, [dead+efol, live+efol]],
            [life+mext, 1, '/fuel/'+mois,
                Eq.liveFuelExtinctionMoistureContent, [
                    life+mext+'/factor',
                    dead+efmc,
                    dead+mext]]
        )
    }
    return nodeDefs
}
