import { Dag, C, K, L, P, ModuleBase, U } from './index.js'
import { Calc, FuelElementEquations as Fuel } from './index.js'
import { FuelBedEquations as Bed } from './index.js'
import { SurfaceFireEquations as Fire } from './index.js'

export class SurfaceFuelModule extends ModuleBase {
    /**
     * The main purpose of the SurfaceFuelModule is to produce:
     * - fuel bed packing ratio,
     * - fuel bed characteristic surface area-to-volume ratio,
     * - fuel bed reaction intensity, and
     * - no-wind, no-slope spread rate
     * From these parameters, all the fire spread rate, direction, intensity,
     * and shape characteristcis can be determined.
     * 
     * @param {string} path Prefix for this module's fully qualified node names
     * (something like `primary/surface/`) to append this module's 'bed/<node>' node keys
     * @param {string} stdPath Fully qualified path to standard fuel model
     *        something like `surface/primary/model/standard/`
     * @param {string} chPath Fully qualified path to chaparral fuel model
     *        something like `surface/primary/model/chaparral/`
     * @param {string} pgPath Fully qualified path to palmetto-gallberry fuel model
     *        something like `surface/primary/model/palmetto/`
     * @param {string} waPath Fully qualified path to western aspen fuel model
     *        something like `surface/primary/model/aspen/`
    */
    constructor(path, stdPath='', chPath='', pgPath='', waPath='') {
        super(path, 'SurfaceFuelModule')

        // configs
        this.config = 'fuel model domain'
        this.options = [C.fuelStd, C.fuelCh, C.fuelPg, C.fuelWa]

        const bed  = path + 'bed/'
        const dead = bed + 'dead/'
        const live = bed + 'live/'
        const d1 = dead + '1/'
        const d2 = dead + '2/'
        const d3 = dead + '3/'
        const d4 = dead + '4/'
        const d5 = dead + '5/'
        const l1 = live + '1/'
        const l2 = live + '2/'
        const l3 = live + '3/'
        const l4 = live + '4/'
        const l5 = live + '5/'
        
        //----------------------------------------------------------------------
        // Fuel bed particle input nodes (9)
        //----------------------------------------------------------------------
        this.nodes = [
            [d1+L.fuelLife, '', U.fuelLife, 0, [
                [this.any, Dag.assign, [K.fuelDeadCat]]
            ]],
            [d1+L.fuelType, '', U.fuelType, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdDead1Type]],
            ]],
            [d1+L.fuelMois, 0, U.fuelMois, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdDead1Mois]],
            ]],
            [d1+L.fuelLoad, 0, U.fuelLoad, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdDead1Load]],
            ]],
            [d1+L.fuelSavr, 1, U.fuelSavr, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdDead1Savr]],
            ]],
            [d1+L.fuelHeat, 0, U.fuelHeat, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdDeadHeat]],
            ]],
            [d1+L.fuelDens, 0, U.fuelDens, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdDens]],
            ]],
            [d1+L.fuelStot, 0, U.fuelFrac, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdStot]],
            ]],
            [d1+L.fuelSeff, 0, U.fuelFrac, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdSeff]],
            ]],

            // Dead particle 2
            [d2+L.fuelLife, '', U.fuelLife, 0, [
                [this.any, Dag.assign, [K.fuelDeadCat]]
            ]],
            [d2+L.fuelType, '', U.fuelType, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdDead10Type]],
            ]],
            [d2+L.fuelMois, 0, U.fuelMois, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdDead10Mois]],
            ]],
            [d2+L.fuelLoad, 0, U.fuelLoad, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdDead10Load]],
            ]],
            [d2+L.fuelSavr, 1, U.fuelSavr, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdDead10Savr]],
            ]],
            [d2+L.fuelHeat, 0, U.fuelHeat, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdDeadHeat]],
            ]],
            [d2+L.fuelDens, 0, U.fuelDens, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdDens]],
            ]],
            [d2+L.fuelStot, 0, U.fuelFrac, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdStot]],
            ]],
            [d2+L.fuelSeff, 0, U.fuelFrac, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdSeff]],
            ]],

            // Dead particle 3
            [d3+L.fuelLife, '', U.fuelLife, 0, [
                [this.any, Dag.assign, [K.fuelDeadCat]]
            ]],
            [d3+L.fuelType, '', U.fuelType, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdDead100Type]],
            ]],
            [d3+L.fuelMois, 0, U.fuelMois, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdDead100Mois]],
            ]],
            [d3+L.fuelLoad, 0, U.fuelLoad, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdDead100Load]],
            ]],
            [d3+L.fuelSavr, 1, U.fuelSavr, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdDead100Savr]],
            ]],
            [d3+L.fuelHeat, 0, U.fuelHeat, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdDeadHeat]],
            ]],
            [d3+L.fuelDens, 0, U.fuelDens, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdDens]],
            ]],
            [d3+L.fuelStot, 0, U.fuelFrac, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdStot]],
            ]],
            [d3+L.fuelSeff, 0, U.fuelFrac, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdSeff]],
            ]],

            // Dead particle 4
            [d4+L.fuelLife, '', U.fuelLife, 0, [
                [this.any, Dag.assign, [K.fuelDeadCat]]
            ]],
            [d4+L.fuelType, '', U.fuelType, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdDeadHerbType]],
            ]],
            [d4+L.fuelMois, 0, U.fuelMois, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdDeadHerbMois]],
            ]],
            [d4+L.fuelLoad, 0, U.fuelLoad, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdDeadHerbLoad]],
            ]],
            [d4+L.fuelSavr, 1, U.fuelSavr, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdDeadHerbSavr]],
            ]],
            [d4+L.fuelHeat, 0, U.fuelHeat, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdDeadHeat]],
            ]],
            [d4+L.fuelDens, 0, U.fuelDens, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdDens]],
            ]],
            [d4+L.fuelStot, 0, U.fuelFrac, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdStot]],
            ]],
            [d4+L.fuelSeff, 0, U.fuelFrac, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdSeff]],
            ]],

            // Dead particle 5
            [d5+L.fuelLife, '', U.fuelLife, 0, [
                [this.any, Dag.assign, [K.fuelDeadCat]]
            ]],
            [d5+L.fuelType, '', U.fuelType, 0, [
                [C.fuelStd, Dag.assign, [K.fuelUnused]],
            ]],
            [d5+L.fuelMois, 0, U.fuelMois, 0, [
                [C.fuelStd, Dag.assign, [K.zero]],
            ]],
            [d5+L.fuelLoad, 0, U.fuelLoad, 0, [
                [C.fuelStd, Dag.assign, [K.zero]],
            ]],
            [d5+L.fuelSavr, 1, U.fuelSavr, 0, [
                [C.fuelStd, Dag.assign, [K.zero]],
            ]],
            [d5+L.fuelHeat, 0, U.fuelHeat, 0, [
                [C.fuelStd, Dag.assign, [K.zero]],
            ]],
            [d5+L.fuelDens, 0, U.fuelDens, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdDens]],
            ]],
            [d5+L.fuelStot, 0, U.fuelFrac, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdStot]],
            ]],
            [d5+L.fuelSeff, 0, U.fuelFrac, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdSeff]],
            ]],

            // Live particle 1
            [l1+L.fuelLife, '', U.fuelLife, 0, [
                [this.any, Dag.assign, [K.fuelLiveCat]]
            ]],
            [l1+L.fuelType, '', U.fuelType, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdLiveHerbType]],
            ]],
            [l1+L.fuelMois, 0, U.fuelMois, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdLiveHerbMois]],
            ]],
            [l1+L.fuelLoad, 0, U.fuelLoad, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdLiveHerbLoad]],
            ]],
            [l1+L.fuelSavr, 1, U.fuelSavr, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdLiveHerbSavr]],
            ]],
            [l1+L.fuelHeat, 0, U.fuelHeat, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdLiveHeat]],
            ]],
            [l1+L.fuelDens, 0, U.fuelDens, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdDens]],
            ]],
            [l1+L.fuelStot, 0, U.fuelFrac, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdStot]],
            ]],
            [l1+L.fuelSeff, 0, U.fuelFrac, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdSeff]],
            ]],

            // Live particle 2
            [l2+L.fuelLife, '', U.fuelLife, 0, [
                [this.any, Dag.assign, [K.fuelLiveCat]]
            ]],
            [l2+L.fuelType, '', U.fuelType, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdLiveStemType]],
            ]],
            [l2+L.fuelMois, 0, U.fuelMois, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdLiveStemMois]],
            ]],
            [l2+L.fuelLoad, 0, U.fuelLoad, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdLiveStemLoad]],
            ]],
            [l2+L.fuelSavr, 1, U.fuelSavr, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdLiveStemSavr]],
            ]],
            [l2+L.fuelHeat, 0, U.fuelHeat, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdLiveHeat]],
            ]],
            [l2+L.fuelDens, 0, U.fuelDens, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdDens]],
            ]],
            [l2+L.fuelStot, 0, U.fuelFrac, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdStot]],
            ]],
            [l2+L.fuelSeff, 0, U.fuelFrac, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdSeff]],
            ]],

            // Live particle 3
            [l3+L.fuelLife, '', U.fuelLife, 0, [
                [this.any, Dag.assign, [K.fuelLiveCat]]
            ]],
            [l3+L.fuelType, '', U.fuelType, 0, [
                [C.fuelStd, Dag.assign, [K.fuelUnused]],
            ]],
            [l3+L.fuelMois, 0, U.fuelMois, 0, [
                [C.fuelStd, Dag.assign, [K.zero]],
            ]],
            [l3+L.fuelLoad, 0, U.fuelLoad, 0, [
                [C.fuelStd, Dag.assign, [K.zero]],
            ]],
            [l3+L.fuelSavr, 1, U.fuelSavr, 0, [
                [C.fuelStd, Dag.assign, [K.zero]],
            ]],
            [l3+L.fuelHeat, 0, U.fuelHeat, 0, [
                [C.fuelStd, Dag.assign, [K.zero]],
            ]],
            [l3+L.fuelDens, 0, U.fuelDens, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdDens]],
            ]],
            [l3+L.fuelStot, 0, U.fuelFrac, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdStot]],
            ]],
            [l3+L.fuelSeff, 0, U.fuelFrac, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdSeff]],
            ]],

            // Live particle 4
            [l4+L.fuelLife, '', U.fuelLife, 0, [
                [this.any, Dag.assign, [K.fuelLiveCat]]
            ]],
            [l4+L.fuelType, '', U.fuelType, 0, [
                [C.fuelStd, Dag.assign, [K.fuelUnused]],
            ]],
            [l4+L.fuelMois, 0, U.fuelMois, 0, [
                [C.fuelStd, Dag.assign, [K.zero]],
            ]],
            [l4+L.fuelLoad, 0, U.fuelLoad, 0, [
                [C.fuelStd, Dag.assign, [K.zero]],
            ]],
            [l4+L.fuelSavr, 1, U.fuelSavr, 0, [
                [C.fuelStd, Dag.assign, [K.zero]],
            ]],
            [l4+L.fuelHeat, 0, U.fuelHeat, 0, [
                [C.fuelStd, Dag.assign, [K.zero]],
            ]],
            [l4+L.fuelDens, 0, U.fuelDens, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdDens]],
            ]],
            [l4+L.fuelStot, 0, U.fuelFrac, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdStot]],
            ]],
            [l4+L.fuelSeff, 0, U.fuelFrac, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdSeff]],
            ]],

            // Live particle 5
            [l5+L.fuelLife, '', U.fuelLife, 0, [
                [this.any, Dag.assign, [K.fuelLiveCat]]
            ]],
            [l5+L.fuelType, '', U.fuelType, 0, [
                [C.fuelStd, Dag.assign, [K.fuelUnused]],
            ]],
            [l5+L.fuelMois, 0, U.fuelMois, 0, [
                [C.fuelStd, Dag.assign, [K.zero]],
            ]],
            [l5+L.fuelLoad, 0, U.fuelLoad, 0, [
                [C.fuelStd, Dag.assign, [K.zero]],
            ]],
            [l5+L.fuelSavr, 1, U.fuelSavr, 0, [
                [C.fuelStd, Dag.assign, [K.zero]],
            ]],
            [l5+L.fuelHeat, 0, U.fuelHeat, 0, [
                [C.fuelStd, Dag.assign, [K.zero]],
            ]],
            [l5+L.fuelDens, 0, U.fuelDens, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdDens]],
            ]],
            [l5+L.fuelStot, 0, U.fuelFrac, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdStot]],
            ]],
            [l5+L.fuelSeff, 0, U.fuelFrac, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdSeff]],
            ]],
        ]

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
                this.nodes.push(
                    [p+L.fuelEhn, 0, U.fraction, 0, [
                        [this.any, Fuel.effectiveHeatingNumber, [p+L.fuelSavr]]]],
                    [p+L.fuelEfol, 0, U.fuelLoad, 0, [
                        [this.any, Fuel.effectiveFuelLoad, [p+L.fuelSavr, p+L.fuelLoad, p+L.fuelLife]]]],
                    [p+L.fuelQig, 0, U.fuelQig, 0, [
                        [this.any, Fuel.heatOfPreignition, [p+L.fuelMois, p+L.fuelEhn]]]],
                    [p+L.fuelNet, 0, U.fuelLoad, 0, [
                        [this.any, Fuel.netOvendryLoad, [p+L.fuelLoad, p+L.fuelStot]]]],
                    [p+L.fuelSize, 0, U.fuelSize, 0, [
                        [this.any, Fuel.sizeClass, [p+L.fuelSavr]]]],

                    [p+L.fuelScwf, 0, U.fuelWtg, 0, [
                        [this.any, Fuel.sizeClassWeightingFactor, [p+L.fuelSize, lcat+L.fuelScar]]]],

                    [p+L.fuelSa, 0, U.fuelSa, 0, [
                        [this.any, Fuel.surfaceArea, [p+L.fuelLoad, p+L.fuelSavr, p+L.fuelDens]]]],
                    [p+L.fuelSawf, 0, U.fuelWtg, 0, [
                        [this.any, Fuel.surfaceAreaWeightingFactor, [p+L.fuelSa, lcat+L.fuelSa]]]],
                    [p+L.fuelVol, 0, U.fuelVol, 0, [
                        [this.any, Fuel.volume, [p+L.fuelLoad, p+L.fuelDens]]]],
                    [p+L.fuelEfwl, 0, U.fuelLoad, 0, [
                        [this.any, Fuel.effectiveFuelWaterLoad, [p+L.fuelEfol, p+L.fuelMois]]]],
                    [p+L.fuelDiam, 0, U.fuelLeng, 0, [
                        [this.any, Fuel.cylindricalDiameter, [p+L.fuelSavr]]]],
                    [p+L.fuelLeng, 0, U.fuelLeng, 0, [
                        [this.any, Fuel.cylindricalLength, [p+L.fuelDiam, p+L.fuelVol]]]],
                )
            }
            //------------------------------------------------------------------
            // Fuel life category *derived* nodes
            //------------------------------------------------------------------
            this.nodes.push(
                [lcat+L.fuelScar, 0, U.fuelWtg, 0, [
                    [this.any, Bed.sizeClassWeightingFactorArray, [
                        p1+L.fuelSa, p1+L.fuelSize,
                        p2+L.fuelSa, p2+L.fuelSize,
                        p3+L.fuelSa, p3+L.fuelSize,
                        p4+L.fuelSa, p4+L.fuelSize,
                        p5+L.fuelSa, p5+L.fuelSize]]]],
                [lcat+L.fuelSa, 0, U.fuelSa, 0, [
                    [this.any, Calc.sum, [p1+L.fuelSa, p2+L.fuelSa, p3+L.fuelSa, p4+L.fuelSa, p5+L.fuelSa]]]],
                [lcat+L.fuelSawf, 0, U.fuelWtg, 0, [
                    [this.any, Calc.divide, [lcat+L.fuelSa, bed+L.fuelSa]]]],
                [lcat+L.fuelEtas, 0, U.fraction, 0, [
                    [this.any, Bed.mineralDamping, [lcat+L.fuelSeff]]]],
                [lcat+L.fuelEtam, 0, U.fraction, 0, [
                    [this.any, Bed.moistureDamping, [lcat+L.fuelMois, lcat+L.fuelMext]]]],
                [lcat+L.fuelHeat, 0, U.fuelHeat, 0, [
                    [this.any, Calc.sumOfProducts, [
                        p1+L.fuelSawf, p2+L.fuelSawf, p3+L.fuelSawf, p4+L.fuelSawf, p5+L.fuelSawf,
                        p1+L.fuelHeat, p2+L.fuelHeat, p3+L.fuelHeat, p4+L.fuelHeat, p5+L.fuelHeat]]]],
                [lcat+L.fuelLoad, 0, U.fuelLoad, 0, [
                    [this.any, Calc.sum, [p1+L.fuelLoad, p2+L.fuelLoad, p3+L.fuelLoad, p4+L.fuelLoad, p5+L.fuelLoad]]]],
                [lcat+L.fuelEfol, 0, U.fuelLoad, 0, [
                    [this.any, Calc.sum, [p1+L.fuelEfol, p2+L.fuelEfol, p3+L.fuelEfol, p4+L.fuelEfol, p5+L.fuelEfol]]]],
                [lcat+L.fuelMois, 1, U.fuelMois, 0, [
                    [this.any, Calc.sumOfProducts, [
                        p1+L.fuelSawf, p2+L.fuelSawf, p3+L.fuelSawf, p4+L.fuelSawf, p5+L.fuelSawf,
                        p1+L.fuelMois, p2+L.fuelMois, p3+L.fuelMois, p4+L.fuelMois, p5+L.fuelMois]]]],
                [lcat+L.fuelVol,  0, U.fuelVol, 0, [
                    [this.any, Calc.sum, [p1+L.fuelVol, p2+L.fuelVol, p3+L.fuelVol, p4+L.fuelVol, p5+L.fuelVol]]]],
                [lcat+L.fuelQig,  0, U.fuelQig, 0, [
                    [this.any, Calc.sumOfProducts, [
                        p1+L.fuelSawf, p2+L.fuelSawf, p3+L.fuelSawf, p4+L.fuelSawf, p5+L.fuelSawf,
                        p1+L.fuelQig, p2+L.fuelQig, p3+L.fuelQig, p4+L.fuelQig, p5+L.fuelQig]]]],
                [lcat+L.fireRxi,  0, U.fireRxi, 0, [
                    [this.any, Calc.multiply, [lcat+L.fuelDrxi, lcat+L.fuelEtam]]]],
                [lcat+L.fuelDrxi, 0, U.fireRxi, 0, [
                    [this.any, Bed.dryFuelReactionIntensity, [
                        bed+L.fuelRxvo, lcat+L.fuelNet, lcat+L.fuelHeat, lcat+L.fuelEtas]]]],
                [lcat+L.fuelSavr, 1, U.fuelSavr, 0, [
                    [this.any, Calc.sumOfProducts, [
                        p1+L.fuelSawf, p2+L.fuelSawf, p3+L.fuelSawf, p4+L.fuelSawf, p5+L.fuelSawf,
                        p1+L.fuelSavr, p2+L.fuelSavr, p3+L.fuelSavr, p4+L.fuelSavr, p5+L.fuelSavr]]]],
                [lcat+L.fuelSeff, 0, U.fuelFrac, 0, [
                    [this.any, Calc.sumOfProducts, [
                        p1+L.fuelSawf, p2+L.fuelSawf, p3+L.fuelSawf, p4+L.fuelSawf, p5+L.fuelSawf,
                        p1+L.fuelSeff, p2+L.fuelSeff, p3+L.fuelSeff, p4+L.fuelSeff, p5+L.fuelSeff]]]],
                // Note that this uses the *SIZE CLASS* weighting factors!!
                [lcat+L.fuelNet, 0, U.fuelLoad, 0, [
                    [this.any, Calc.sumOfProducts, [
                        p1+L.fuelScwf, p2+L.fuelScwf, p3+L.fuelScwf, p4+L.fuelScwf, p5+L.fuelScwf,
                        p1+L.fuelNet, p2+L.fuelNet, p3+L.fuelNet, p4+L.fuelNet, p5+L.fuelNet]]]],
            )
        }
        // The following nodes only exist for the surface fire 'dead' category
        this.nodes.push(
            [dead+L.fuelMext, 0, U.fuelMois, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdDeadMext]]]],
            [dead+L.fuelEfwl, 0, U.fuelLoad, 0, [
                [this.any, Calc.sum, [d1+L.fuelEfwl, d2+L.fuelEfwl, d3+L.fuelEfwl, d4+L.fuelEfwl, d5+L.fuelEfwl]]]],
            [dead+L.fuelEfmc, 0, U.fuelMois, 0, [
                [this.any, Calc.divide, [dead+L.fuelEfwl, dead+L.fuelEfol]]]],
        )
        // The following nodes only exist for the surface fire 'live' category
        this.nodes.push(
            [live+L.fuelMextf, 0, U.factor, 0, [
                [this.any, Bed.liveFuelExtinctionMoistureContentFactor, [dead+L.fuelEfol, live+L.fuelEfol]]]],
                // [this.any, Bed.dummy, [dead+L.fuelEfol, live+L.fuelEfol, live+L.fuelMois]]]],
            [live+L.fuelMext,  0, U.fuelMois, 0, [
                [this.any, Bed.liveFuelExtinctionMoistureContent, [
                    live+L.fuelMextf, dead+L.fuelEfmc, dead+L.fuelMext]]]]
        )
        // The crown canopy fuel model mext is 0.25

        //----------------------------------------------------------------------
        // Fuel bed *derived*  and *input* nodes
        //----------------------------------------------------------------------
        this.nodes.push(
            [bed+L.fuelDepth,  0, U.fuelLeng, 0, [
                [C.fuelStd, Dag.assign, [stdPath + P.stdDepth]]]],
            [bed+L.fuelBulk,   0, U.fuelBulk, 0, [
                [this.any, Bed.bulkDensity, [bed+L.fuelLoad, bed+L.fuelDepth]]]],
            [bed+L.fuelLoad,   0, U.fuelLoad, 0, [
                [this.any, Calc.sum, [dead+L.fuelLoad, live+L.fuelLoad]]]],
            [bed+L.fuelSa,     0, U.fuelSa, 0, [
                [this.any, Calc.sum, [dead+L.fuelSa, live+L.fuelSa]]]],
            [bed+L.fuelSavr,   1, U.fuelSavr, 0, [
                [this.any, Bed.weightedSavr, [
                    dead+L.fuelSawf, dead+L.fuelSavr, live+L.fuelSawf, live+L.fuelSavr]]]],
            [bed+L.fuelQig,    0, U.fuelQig, 0, [
                [this.any, Bed.weightedHeatOfPreIgnition, [
                    dead+L.fuelSawf, dead+L.fuelQig, live+L.fuelSawf, live+L.fuelQig]]]],
            [bed+L.fuelBeta,   0, U.ratio, 0, [
                [this.any, Bed.packingRatio, [dead+L.fuelVol, live+L.fuelVol, bed+L.fuelDepth]]]],
            [bed+L.fuelBopt,   0, U.ratio, 0, [
                [this.any, Bed.optimumPackingRatio, [bed+L.fuelSavr]]]],
            [bed+L.fuelBrat,   0, U.ratio, 0, [
                [this.any, Bed.packingRatioRatio, [bed+L.fuelBeta, bed+L.fuelBopt]]]],
            // [bed+L.fuelEhn,    0, U.ratio, 0, [
            //     [this.any, Bed.effectiveHeatingNumber, [bed+L.fuelSavr]]]],
            [bed+L.fuelXi,     0, U.ratio, 0, [
                [this.any, Bed.propagatingFluxRatio, [bed+L.fuelSavr, bed+L.fuelBeta]]]],
            [bed+L.fuelRxve,   0, U.factor, 0, [
                [this.any, Bed.reactionVelocityExponent, [bed+L.fuelSavr]]]],
            [bed+L.fuelRxvm,   0, U.fuelRxv, 0, [
                [this.any, Bed.reactionVelocityMaximum, [bed+L.fuelSavr15]]]],
            [bed+L.fuelRxvo,   0, U.fuelRxv, 0, [
                [this.any, Bed.reactionVelocityOptimum, [bed+L.fuelBrat, bed+L.fuelRxvm, bed+L.fuelRxve]]]],
            [bed+L.fuelSavr15, 1, U.fuelSavr, 0, [
                [this.any, Bed.savr15, [bed+L.fuelSavr]]]],
            [bed+L.fuelSink,   0, U.fuelSink, 0, [
                [this.any, Bed.heatSink, [bed+L.fuelBulk, bed+L.fuelQig]]]],
            [bed+L.fireRxi,    0, U.fireRxi, 0, [
                [this.any, Bed.reactionIntensity, [dead+L.fireRxi, live+L.fireRxi]]]],
            [bed+L.fuelSource, 0, U.fireRxi, 0, [
                [this.any, Bed.heatSource, [bed+L.fireRxi, bed+L.fuelXi]]]],
            [bed+L.wsrfFuel,   1, U.fraction, 0, [
                [this.any, Bed.openWindSpeedAdjustmentFactor, [bed+L.fuelDepth]]]],
        )
    }
}
