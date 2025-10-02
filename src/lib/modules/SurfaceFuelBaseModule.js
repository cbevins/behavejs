import { Dag } from '../index.js'
import { ModuleBase } from './ModuleBase.js'
import { Paths as P} from './Paths.js'
import { Units as U} from './Units.js'
import { Calc, FuelElementEquations as Fuel } from '../index.js'
import { FuelBedEquations as Bed } from '../index.js'
import { SurfaceFireEquations as Fire } from '../index.js'

export class SurfaceFuelBaseModule extends ModuleBase {
    /**
     * The main purpose of the SurfaceFuelModule is to produce:
     * - fuel bed packing ratio,
     * - fuel bed characteristic surface area-to-volume ratio,
     * - fuel bed reaction intensity,
     * - no-wind, no-slope spread rate,
     * - fire heat per unit area
     * From these parameters, all the fire spread rate, direction, intensity,
     * and shape characteristcis can be determined.
     * 
     * @param {string} prefix Prefix for this module's fully qualified node names
     * (something like `primary/surface/`) to append this module's 'bed/<node>' node keys
     * @param {Config} cfg Config reference
    */
    constructor(prefix, self='', module='', cfg) {
        super(prefix, self, module, cfg)
        this.nodes = []
    }

    // USed by derived classes to create their common fuel bed nodes
    _bedNodes() {
        const nodes  = []
        const bed  = this.path
        const dead = bed + P.fuelDead
        const live = bed + P.fuelLive
        const d1 = dead + P.fuelEl1
        const d2 = dead + P.fuelEl2
        const d3 = dead + P.fuelEl3
        const d4 = dead + P.fuelEl4
        const d5 = dead + P.fuelEl5
        const l1 = live + P.fuelEl1
        const l2 = live + P.fuelEl2
        const l3 = live + P.fuelEl3
        const l4 = live + P.fuelEl4
        const l5 = live + P.fuelEl5

        //----------------------------------------------------------------------
        // Fuel life category and particle *derived* nodes
        //----------------------------------------------------------------------
        for(let lcat of [dead, live]) {
            const p1 = (lcat===dead) ? d1 : l1
            const p2 = (lcat===dead) ? d2 : l2
            const p3 = (lcat===dead) ? d3 : l3
            const p4 = (lcat===dead) ? d4 : l4
            const p5 = (lcat===dead) ? d5 : l5
            //------------------------------------------------------------------
            // Fuel particle *derived* nodes
            //------------------------------------------------------------------
            for(let p of [p1, p2, p3, p4, p5]) {
                // Each particle has 11 derived characteristics
                nodes.push(
                    [p+P.fuelEhn, 0, U.fraction, null, [
                        ['', Fuel.effectiveHeatingNumber, [p+P.fuelSavr]]]],
                    [p+P.fuelEfol, 0, U.fuelLoad, null, [
                        ['', Fuel.effectiveFuelLoad, [p+P.fuelSavr, p+P.fuelLoad, p+P.fuelLife]]]],
                    [p+P.fuelQig, 0, U.fuelQig, null, [
                        ['', Fuel.heatOfPreignition, [p+P.fuelMois, p+P.fuelEhn]]]],
                    [p+P.fuelNet, 0, U.fuelLoad, null, [
                        ['', Fuel.netOvendryLoad, [p+P.fuelLoad, p+P.fuelStot]]]],
                    [p+P.fuelSize, 0, U.fuelSize, null, [
                        ['', Fuel.sizeClass, [p+P.fuelSavr]]]],

                    [p+P.fuelScwf, 0, U.fuelWtg, null, [
                        ['', Fuel.sizeClassWeightingFactor, [p+P.fuelSize, lcat+P.fuelScar]]]],

                    [p+P.fuelSa, 0, U.fuelSa, null, [
                        ['', Fuel.surfaceArea, [p+P.fuelLoad, p+P.fuelSavr, p+P.fuelDens]]]],
                    [p+P.fuelSawf, 0, U.fuelWtg, null, [
                        ['', Fuel.surfaceAreaWeightingFactor, [p+P.fuelSa, lcat+P.fuelSa]]]],
                    [p+P.fuelVol, 0, U.fuelVol, null, [
                        ['', Fuel.volume, [p+P.fuelLoad, p+P.fuelDens]]]],
                    [p+P.fuelEfwl, 0, U.fuelLoad, null, [
                        ['', Fuel.effectiveFuelWaterLoad, [p+P.fuelEfol, p+P.fuelMois]]]],
                    [p+P.fuelDiam, 0, U.fuelLeng, null, [
                        ['', Fuel.cylindricalDiameter, [p+P.fuelSavr]]]],
                    [p+P.fuelLeng, 0, U.fuelLeng, null, [
                        ['', Fuel.cylindricalLength, [p+P.fuelDiam, p+P.fuelVol]]]],
                )
            }
            //------------------------------------------------------------------
            // Fuel life category *derived* nodes
            //------------------------------------------------------------------
            nodes.push(
                [lcat+P.fuelScar, 0, U.fuelWtg, null, [
                    ['', Bed.sizeClassWeightingFactorArray, [
                        p1+P.fuelSa, p1+P.fuelSize,
                        p2+P.fuelSa, p2+P.fuelSize,
                        p3+P.fuelSa, p3+P.fuelSize,
                        p4+P.fuelSa, p4+P.fuelSize,
                        p5+P.fuelSa, p5+P.fuelSize]]]],
                [lcat+P.fuelSa, 0, U.fuelSa, null, [
                    ['', Calc.sum, [p1+P.fuelSa, p2+P.fuelSa, p3+P.fuelSa, p4+P.fuelSa, p5+P.fuelSa]]]],
                [lcat+P.fuelSawf, 0, U.fuelWtg, null, [
                    ['', Calc.divide, [lcat+P.fuelSa, bed+P.fuelSa]]]],
                [lcat+P.fuelEtas, 0, U.fraction, null, [
                    ['', Bed.mineralDamping, [lcat+P.fuelSeff]]]],
                [lcat+P.fuelEtam, 0, U.fraction, null, [
                    ['', Bed.moistureDamping, [lcat+P.fuelMois, lcat+P.fuelMext]]]],
                [lcat+P.fuelHeat, 0, U.fuelHeat, null, [
                    ['', Calc.sumOfProducts, [
                        p1+P.fuelSawf, p2+P.fuelSawf, p3+P.fuelSawf, p4+P.fuelSawf, p5+P.fuelSawf,
                        p1+P.fuelHeat, p2+P.fuelHeat, p3+P.fuelHeat, p4+P.fuelHeat, p5+P.fuelHeat]]]],
                [lcat+P.fuelLoad, 0, U.fuelLoad, null, [
                    ['', Calc.sum, [p1+P.fuelLoad, p2+P.fuelLoad, p3+P.fuelLoad, p4+P.fuelLoad, p5+P.fuelLoad]]]],
                [lcat+P.fuelEfol, 0, U.fuelLoad, null, [
                    ['', Calc.sum, [p1+P.fuelEfol, p2+P.fuelEfol, p3+P.fuelEfol, p4+P.fuelEfol, p5+P.fuelEfol]]]],
                [lcat+P.fuelMois, 1, U.fuelMois, null, [
                    ['', Calc.sumOfProducts, [
                        p1+P.fuelSawf, p2+P.fuelSawf, p3+P.fuelSawf, p4+P.fuelSawf, p5+P.fuelSawf,
                        p1+P.fuelMois, p2+P.fuelMois, p3+P.fuelMois, p4+P.fuelMois, p5+P.fuelMois]]]],
                [lcat+P.fuelVol,  0, U.fuelVol, null, [
                    ['', Calc.sum, [p1+P.fuelVol, p2+P.fuelVol, p3+P.fuelVol, p4+P.fuelVol, p5+P.fuelVol]]]],
                [lcat+P.fuelQig,  0, U.fuelQig, null, [
                    ['', Calc.sumOfProducts, [
                        p1+P.fuelSawf, p2+P.fuelSawf, p3+P.fuelSawf, p4+P.fuelSawf, p5+P.fuelSawf,
                        p1+P.fuelQig, p2+P.fuelQig, p3+P.fuelQig, p4+P.fuelQig, p5+P.fuelQig]]]],
                [lcat+P.fuelRxi,  0, U.fireRxi, null, [
                    ['', Calc.multiply, [lcat+P.fuelDrxi, lcat+P.fuelEtam]]]],
                [lcat+P.fuelDrxi, 0, U.fireRxi, null, [
                    ['', Bed.dryFuelReactionIntensity, [
                        bed+P.fuelRxvo, lcat+P.fuelNet, lcat+P.fuelHeat, lcat+P.fuelEtas]]]],
                [lcat+P.fuelSavr, 1, U.fuelSavr, null, [
                    ['', Calc.sumOfProducts, [
                        p1+P.fuelSawf, p2+P.fuelSawf, p3+P.fuelSawf, p4+P.fuelSawf, p5+P.fuelSawf,
                        p1+P.fuelSavr, p2+P.fuelSavr, p3+P.fuelSavr, p4+P.fuelSavr, p5+P.fuelSavr]]]],
                [lcat+P.fuelSeff, 0, U.fuelFrac, null, [
                    ['', Calc.sumOfProducts, [
                        p1+P.fuelSawf, p2+P.fuelSawf, p3+P.fuelSawf, p4+P.fuelSawf, p5+P.fuelSawf,
                        p1+P.fuelSeff, p2+P.fuelSeff, p3+P.fuelSeff, p4+P.fuelSeff, p5+P.fuelSeff]]]],
                // Note that this uses the *SIZE CLASS* weighting factors!!
                [lcat+P.fuelNet, 0, U.fuelLoad, null, [
                    ['', Calc.sumOfProducts, [
                        p1+P.fuelScwf, p2+P.fuelScwf, p3+P.fuelScwf, p4+P.fuelScwf, p5+P.fuelScwf,
                        p1+P.fuelNet, p2+P.fuelNet, p3+P.fuelNet, p4+P.fuelNet, p5+P.fuelNet]]]],
            )
        }
        // The following nodes only exist for the surface fire 'dead' category
        nodes.push(
            [dead+P.fuelEfwl, 0, U.fuelLoad, null, [
                ['', Calc.sum, [d1+P.fuelEfwl, d2+P.fuelEfwl, d3+P.fuelEfwl, d4+P.fuelEfwl, d5+P.fuelEfwl]]]],
            [dead+P.fuelEfmc, 0, U.fuelMois, null, [
                ['', Calc.divide, [dead+P.fuelEfwl, dead+P.fuelEfol]]]],
        )
        // The following nodes only exist for the surface fire 'live' category
        nodes.push(
            [live+P.fuelMextf, 0, U.factor, null, [
                ['', Bed.liveFuelExtinctionMoistureContentFactor, [dead+P.fuelEfol, live+P.fuelEfol]]]],
            [live+P.fuelMext,  0, U.fuelMois, null, [
                ['', Bed.liveFuelExtinctionMoistureContent, [
                    live+P.fuelMextf, dead+P.fuelEfmc, dead+P.fuelMext]]]]
        )

        //----------------------------------------------------------------------
        // Fuel bed *derived*  and *input* nodes
        //----------------------------------------------------------------------
        nodes.push(
            [bed+P.fuelBulk,   0, U.fuelBulk, null, [
                ['', Bed.bulkDensity, [bed+P.fuelLoad, bed+P.fuelDepth]]]],
            [bed+P.fuelLoad,   0, U.fuelLoad, null, [
                ['', Calc.sum, [dead+P.fuelLoad, live+P.fuelLoad]]]],
            [bed+P.fuelSa,     0, U.fuelSa, null, [
                ['', Calc.sum, [dead+P.fuelSa, live+P.fuelSa]]]],
            [bed+P.fuelSavr,   1, U.fuelSavr, null, [
                ['', Bed.weightedSavr, [
                    dead+P.fuelSawf, dead+P.fuelSavr, live+P.fuelSawf, live+P.fuelSavr]]]],
            [bed+P.fuelQig,    0, U.fuelQig, null, [
                ['', Bed.weightedHeatOfPreIgnition, [
                    dead+P.fuelSawf, dead+P.fuelQig, live+P.fuelSawf, live+P.fuelQig]]]],
            [bed+P.fuelBeta,   0, U.ratio, null, [
                ['', Bed.packingRatio, [dead+P.fuelVol, live+P.fuelVol, bed+P.fuelDepth]]]],
            [bed+P.fuelBopt,   0, U.ratio, null, [
                ['', Bed.optimumPackingRatio, [bed+P.fuelSavr]]]],
            [bed+P.fuelBrat,   0, U.ratio, null, [
                ['', Bed.packingRatioRatio, [bed+P.fuelBeta, bed+P.fuelBopt]]]],
            // [bed+P.fuelEhn,    0, U.ratio, null, [
            //     ['', Bed.effectiveHeatingNumber, [bed+P.fuelSavr]]]],
            [bed+P.fuelXi,     0, U.ratio, null, [
                ['', Bed.propagatingFluxRatio, [bed+P.fuelSavr, bed+P.fuelBeta]]]],
            [bed+P.fuelRxve,   0, U.factor, null, [
                ['', Bed.reactionVelocityExponent, [bed+P.fuelSavr]]]],
            [bed+P.fuelRxvm,   0, U.fuelRxv, null, [
                ['', Bed.reactionVelocityMaximum, [bed+P.fuelSavr15]]]],
            [bed+P.fuelRxvo,   0, U.fuelRxv, null, [
                ['', Bed.reactionVelocityOptimum, [bed+P.fuelBrat, bed+P.fuelRxvm, bed+P.fuelRxve]]]],
            [bed+P.fuelSavr15, 1, U.fuelSavr, null, [
                ['', Bed.savr15, [bed+P.fuelSavr]]]],
            [bed+P.fuelSink,   0, U.fuelSink, null, [
                ['', Bed.heatSink, [bed+P.fuelBulk, bed+P.fuelQig]]]],
            [bed+P.fuelRxi,    0, U.fireRxi, null, [
                ['', Bed.reactionIntensity, [dead+P.fuelRxi, live+P.fuelRxi]]]],
            [bed+P.fuelSource, 0, U.fireRxi, null, [
                ['', Bed.heatSource, [bed+P.fuelRxi, bed+P.fuelXi]]]],
            [bed+P.fuelWsrf,   1, U.fraction, null, [
                ['', Bed.openWindSpeedAdjustmentFactor, [bed+P.fuelDepth]]]],
        )
        return nodes
    }
}
