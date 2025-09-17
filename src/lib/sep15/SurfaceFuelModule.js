import { Dag } from './Dag.js'
import { ModuleBase } from './ModuleBase.js'
import { Paths as P} from './Paths.js'
import { Units as U} from './Units.js'
import { Calc, FuelElementEquations as Fuel } from '../index.js'
import { FuelBedEquations as Bed } from '../index.js'
import { SurfaceFireEquations as Fire } from '../index.js'

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
     * @param {string} prefix Prefix for this module's fully qualified node names
     * (something like `primary/surface/`) to append this module's 'bed/<node>' node keys
     * @param {Config} cfg Config reference
     * @param {string} stdPath Fully qualified path to standard fuel model
     *        something like `surface/primary/model/standard/`
     * @param {string} chPath Fully qualified path to chaparral fuel model
     *        something like `surface/primary/model/chaparral/`
     * @param {string} pgPath Fully qualified path to palmetto-gallberry fuel model
     *        something like `surface/primary/model/palmetto/`
     * @param {string} waPath Fully qualified path to western aspen fuel model
     *        something like `surface/primary/model/aspen/`
    */
    constructor(prefix, cfg, stdPath='', chPath='', pgPath='', waPath='') {
        super(prefix, P.fuelSelf, P.fuelMod, cfg)
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
        // Fuel bed particle input nodes (9)
        //----------------------------------------------------------------------
        this.nodes = [
            [d1+P.fuelLife, '', U.fuelLife, '', [
                ['', Dag.assign, [P.fuelDeadCat]]
            ]],
            [d1+P.fuelType, '', U.fuelType, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDead1Type]],
            ]],
            [d1+P.fuelMois, 0, U.fuelMois, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDead1Mois]],
            ]],
            [d1+P.fuelLoad, 0, U.fuelLoad, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDead1Load]],
            ]],
            [d1+P.fuelSavr, 1, U.fuelSavr, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDead1Savr]],
            ]],
            [d1+P.fuelHeat, 0, U.fuelHeat, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDeadHeat]],
            ]],
            [d1+P.fuelDens, 0, U.fuelDens, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDens]],
            ]],
            [d1+P.fuelStot, 0, U.fuelFrac, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdStot]],
            ]],
            [d1+P.fuelSeff, 0, U.fuelFrac, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdSeff]],
            ]],

            // Dead particle 2
            [d2+P.fuelLife, '', U.fuelLife, '', [
                ['', Dag.assign, [P.fuelDeadCat]]
            ]],
            [d2+P.fuelType, '', U.fuelType, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDead10Type]],
            ]],
            [d2+P.fuelMois, 0, U.fuelMois, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDead10Mois]],
            ]],
            [d2+P.fuelLoad, 0, U.fuelLoad, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDead10Load]],
            ]],
            [d2+P.fuelSavr, 1, U.fuelSavr, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDead10Savr]],
            ]],
            [d2+P.fuelHeat, 0, U.fuelHeat, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDeadHeat]],
            ]],
            [d2+P.fuelDens, 0, U.fuelDens, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDens]],
            ]],
            [d2+P.fuelStot, 0, U.fuelFrac, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdStot]],
            ]],
            [d2+P.fuelSeff, 0, U.fuelFrac, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdSeff]],
            ]],

            // Dead particle 3
            [d3+P.fuelLife, '', U.fuelLife, '', [
                ['', Dag.assign, [P.fuelDeadCat]]
            ]],
            [d3+P.fuelType, '', U.fuelType, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDead100Type]],
            ]],
            [d3+P.fuelMois, 0, U.fuelMois, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDead100Mois]],
            ]],
            [d3+P.fuelLoad, 0, U.fuelLoad, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDead100Load]],
            ]],
            [d3+P.fuelSavr, 1, U.fuelSavr, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDead100Savr]],
            ]],
            [d3+P.fuelHeat, 0, U.fuelHeat, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDeadHeat]],
            ]],
            [d3+P.fuelDens, 0, U.fuelDens, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDens]],
            ]],
            [d3+P.fuelStot, 0, U.fuelFrac, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdStot]],
            ]],
            [d3+P.fuelSeff, 0, U.fuelFrac, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdSeff]],
            ]],

            // Dead particle 4
            [d4+P.fuelLife, '', U.fuelLife, '', [
                ['', Dag.assign, [P.fuelDeadCat]]
            ]],
            [d4+P.fuelType, '', U.fuelType, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDeadHerbType]],
            ]],
            [d4+P.fuelMois, 0, U.fuelMois, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDeadHerbMois]],
            ]],
            [d4+P.fuelLoad, 0, U.fuelLoad, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDeadHerbLoad]],
            ]],
            [d4+P.fuelSavr, 1, U.fuelSavr, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDeadHerbSavr]],
            ]],
            [d4+P.fuelHeat, 0, U.fuelHeat, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDeadHeat]],
            ]],
            [d4+P.fuelDens, 0, U.fuelDens, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDens]],
            ]],
            [d4+P.fuelStot, 0, U.fuelFrac, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdStot]],
            ]],
            [d4+P.fuelSeff, 0, U.fuelFrac, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdSeff]],
            ]],

            // Dead particle 5
            [d5+P.fuelLife, '', U.fuelLife, '', [
                ['', Dag.assign, [P.fuelDeadCat]]
            ]],
            [d5+P.fuelType, '', U.fuelType, cfg, [
                [cfg.standard, Dag.assign, [P.fuelUnused]],
            ]],
            [d5+P.fuelMois, 0, U.fuelMois, cfg, [
                [cfg.standard, Dag.assign, [P.zero]],
            ]],
            [d5+P.fuelLoad, 0, U.fuelLoad, cfg, [
                [cfg.standard, Dag.assign, [P.zero]],
            ]],
            [d5+P.fuelSavr, 1, U.fuelSavr, cfg, [
                [cfg.standard, Dag.assign, [P.zero]],
            ]],
            [d5+P.fuelHeat, 0, U.fuelHeat, cfg, [
                [cfg.standard, Dag.assign, [P.zero]],
            ]],
            [d5+P.fuelDens, 0, U.fuelDens, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDens]],
            ]],
            [d5+P.fuelStot, 0, U.fuelFrac, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdStot]],
            ]],
            [d5+P.fuelSeff, 0, U.fuelFrac, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdSeff]],
            ]],

            // Live particle 1
            [l1+P.fuelLife, '', U.fuelLife, '', [
                ['', Dag.assign, [P.fuelLiveCat]]
            ]],
            [l1+P.fuelType, '', U.fuelType, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdLiveHerbType]],
            ]],
            [l1+P.fuelMois, 0, U.fuelMois, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdLiveHerbMois]],
            ]],
            [l1+P.fuelLoad, 0, U.fuelLoad, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdLiveHerbLoad]],
            ]],
            [l1+P.fuelSavr, 1, U.fuelSavr, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdLiveHerbSavr]],
            ]],
            [l1+P.fuelHeat, 0, U.fuelHeat, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdLiveHeat]],
            ]],
            [l1+P.fuelDens, 0, U.fuelDens, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDens]],
            ]],
            [l1+P.fuelStot, 0, U.fuelFrac, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdStot]],
            ]],
            [l1+P.fuelSeff, 0, U.fuelFrac, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdSeff]],
            ]],

            // Live particle 2
            [l2+P.fuelLife, '', U.fuelLife, '', [
                ['', Dag.assign, [P.fuelLiveCat]]
            ]],
            [l2+P.fuelType, '', U.fuelType, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdLiveStemType]],
            ]],
            [l2+P.fuelMois, 0, U.fuelMois, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdLiveStemMois]],
            ]],
            [l2+P.fuelLoad, 0, U.fuelLoad, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdLiveStemLoad]],
            ]],
            [l2+P.fuelSavr, 1, U.fuelSavr, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdLiveStemSavr]],
            ]],
            [l2+P.fuelHeat, 0, U.fuelHeat, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdLiveHeat]],
            ]],
            [l2+P.fuelDens, 0, U.fuelDens, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDens]],
            ]],
            [l2+P.fuelStot, 0, U.fuelFrac, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdStot]],
            ]],
            [l2+P.fuelSeff, 0, U.fuelFrac, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdSeff]],
            ]],

            // Live particle 3
            [l3+P.fuelLife, '', U.fuelLife, '', [
                ['', Dag.assign, [P.fuelLiveCat]]
            ]],
            [l3+P.fuelType, '', U.fuelType, cfg, [
                [cfg.standard, Dag.assign, [P.fuelUnused]],
            ]],
            [l3+P.fuelMois, 0, U.fuelMois, cfg, [
                [cfg.standard, Dag.assign, [P.zero]],
            ]],
            [l3+P.fuelLoad, 0, U.fuelLoad, cfg, [
                [cfg.standard, Dag.assign, [P.zero]],
            ]],
            [l3+P.fuelSavr, 1, U.fuelSavr, cfg, [
                [cfg.standard, Dag.assign, [P.zero]],
            ]],
            [l3+P.fuelHeat, 0, U.fuelHeat, cfg, [
                [cfg.standard, Dag.assign, [P.zero]],
            ]],
            [l3+P.fuelDens, 0, U.fuelDens, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDens]],
            ]],
            [l3+P.fuelStot, 0, U.fuelFrac, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdStot]],
            ]],
            [l3+P.fuelSeff, 0, U.fuelFrac, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdSeff]],
            ]],

            // Live particle 4
            [l4+P.fuelLife, '', U.fuelLife, '', [
                ['', Dag.assign, [P.fuelLiveCat]]
            ]],
            [l4+P.fuelType, '', U.fuelType, cfg, [
                [cfg.standard, Dag.assign, [P.fuelUnused]],
            ]],
            [l4+P.fuelMois, 0, U.fuelMois, cfg, [
                [cfg.standard, Dag.assign, [P.zero]],
            ]],
            [l4+P.fuelLoad, 0, U.fuelLoad, cfg, [
                [cfg.standard, Dag.assign, [P.zero]],
            ]],
            [l4+P.fuelSavr, 1, U.fuelSavr, cfg, [
                [cfg.standard, Dag.assign, [P.zero]],
            ]],
            [l4+P.fuelHeat, 0, U.fuelHeat, cfg, [
                [cfg.standard, Dag.assign, [P.zero]],
            ]],
            [l4+P.fuelDens, 0, U.fuelDens, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDens]],
            ]],
            [l4+P.fuelStot, 0, U.fuelFrac, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdStot]],
            ]],
            [l4+P.fuelSeff, 0, U.fuelFrac, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdSeff]],
            ]],

            // Live particle 5
            [l5+P.fuelLife, '', U.fuelLife, '', [
                ['', Dag.assign, [P.fuelLiveCat]]
            ]],
            [l5+P.fuelType, '', U.fuelType, cfg, [
                [cfg.standard, Dag.assign, [P.fuelUnused]],
            ]],
            [l5+P.fuelMois, 0, U.fuelMois, cfg, [
                [cfg.standard, Dag.assign, [P.zero]],
            ]],
            [l5+P.fuelLoad, 0, U.fuelLoad, cfg, [
                [cfg.standard, Dag.assign, [P.zero]],
            ]],
            [l5+P.fuelSavr, 1, U.fuelSavr, cfg, [
                [cfg.standard, Dag.assign, [P.zero]],
            ]],
            [l5+P.fuelHeat, 0, U.fuelHeat, cfg, [
                [cfg.standard, Dag.assign, [P.zero]],
            ]],
            [l5+P.fuelDens, 0, U.fuelDens, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDens]],
            ]],
            [l5+P.fuelStot, 0, U.fuelFrac, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdStot]],
            ]],
            [l5+P.fuelSeff, 0, U.fuelFrac, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdSeff]],
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
                    [p+P.fuelEhn, 0, U.fraction, '', [
                        ['', Fuel.effectiveHeatingNumber, [p+P.fuelSavr]]]],
                    [p+P.fuelEfol, 0, U.fuelLoad, '', [
                        ['', Fuel.effectiveFuelLoad, [p+P.fuelSavr, p+P.fuelLoad, p+P.fuelLife]]]],
                    [p+P.fuelQig, 0, U.fuelQig, '', [
                        ['', Fuel.heatOfPreignition, [p+P.fuelMois, p+P.fuelEhn]]]],
                    [p+P.fuelNet, 0, U.fuelLoad, '', [
                        ['', Fuel.netOvendryLoad, [p+P.fuelLoad, p+P.fuelStot]]]],
                    [p+P.fuelSize, 0, U.fuelSize, '', [
                        ['', Fuel.sizeClass, [p+P.fuelSavr]]]],

                    [p+P.fuelScwf, 0, U.fuelWtg, '', [
                        ['', Fuel.sizeClassWeightingFactor, [p+P.fuelSize, lcat+P.fuelScar]]]],

                    [p+P.fuelSa, 0, U.fuelSa, '', [
                        ['', Fuel.surfaceArea, [p+P.fuelLoad, p+P.fuelSavr, p+P.fuelDens]]]],
                    [p+P.fuelSawf, 0, U.fuelWtg, '', [
                        ['', Fuel.surfaceAreaWeightingFactor, [p+P.fuelSa, lcat+P.fuelSa]]]],
                    [p+P.fuelVol, 0, U.fuelVol, '', [
                        ['', Fuel.volume, [p+P.fuelLoad, p+P.fuelDens]]]],
                    [p+P.fuelEfwl, 0, U.fuelLoad, '', [
                        ['', Fuel.effectiveFuelWaterLoad, [p+P.fuelEfol, p+P.fuelMois]]]],
                    [p+P.fuelDiam, 0, U.fuelLeng, '', [
                        ['', Fuel.cylindricalDiameter, [p+P.fuelSavr]]]],
                    [p+P.fuelLeng, 0, U.fuelLeng, '', [
                        ['', Fuel.cylindricalLength, [p+P.fuelDiam, p+P.fuelVol]]]],
                )
            }
            //------------------------------------------------------------------
            // Fuel life category *derived* nodes
            //------------------------------------------------------------------
            this.nodes.push(
                [lcat+P.fuelScar, 0, U.fuelWtg, '', [
                    ['', Bed.sizeClassWeightingFactorArray, [
                        p1+P.fuelSa, p1+P.fuelSize,
                        p2+P.fuelSa, p2+P.fuelSize,
                        p3+P.fuelSa, p3+P.fuelSize,
                        p4+P.fuelSa, p4+P.fuelSize,
                        p5+P.fuelSa, p5+P.fuelSize]]]],
                [lcat+P.fuelSa, 0, U.fuelSa, '', [
                    ['', Calc.sum, [p1+P.fuelSa, p2+P.fuelSa, p3+P.fuelSa, p4+P.fuelSa, p5+P.fuelSa]]]],
                [lcat+P.fuelSawf, 0, U.fuelWtg, '', [
                    ['', Calc.divide, [lcat+P.fuelSa, bed+P.fuelSa]]]],
                [lcat+P.fuelEtas, 0, U.fraction, '', [
                    ['', Bed.mineralDamping, [lcat+P.fuelSeff]]]],
                [lcat+P.fuelEtam, 0, U.fraction, '', [
                    ['', Bed.moistureDamping, [lcat+P.fuelMois, lcat+P.fuelMext]]]],
                [lcat+P.fuelHeat, 0, U.fuelHeat, '', [
                    ['', Calc.sumOfProducts, [
                        p1+P.fuelSawf, p2+P.fuelSawf, p3+P.fuelSawf, p4+P.fuelSawf, p5+P.fuelSawf,
                        p1+P.fuelHeat, p2+P.fuelHeat, p3+P.fuelHeat, p4+P.fuelHeat, p5+P.fuelHeat]]]],
                [lcat+P.fuelLoad, 0, U.fuelLoad, '', [
                    ['', Calc.sum, [p1+P.fuelLoad, p2+P.fuelLoad, p3+P.fuelLoad, p4+P.fuelLoad, p5+P.fuelLoad]]]],
                [lcat+P.fuelEfol, 0, U.fuelLoad, '', [
                    ['', Calc.sum, [p1+P.fuelEfol, p2+P.fuelEfol, p3+P.fuelEfol, p4+P.fuelEfol, p5+P.fuelEfol]]]],
                [lcat+P.fuelMois, 1, U.fuelMois, '', [
                    ['', Calc.sumOfProducts, [
                        p1+P.fuelSawf, p2+P.fuelSawf, p3+P.fuelSawf, p4+P.fuelSawf, p5+P.fuelSawf,
                        p1+P.fuelMois, p2+P.fuelMois, p3+P.fuelMois, p4+P.fuelMois, p5+P.fuelMois]]]],
                [lcat+P.fuelVol,  0, U.fuelVol, '', [
                    ['', Calc.sum, [p1+P.fuelVol, p2+P.fuelVol, p3+P.fuelVol, p4+P.fuelVol, p5+P.fuelVol]]]],
                [lcat+P.fuelQig,  0, U.fuelQig, '', [
                    ['', Calc.sumOfProducts, [
                        p1+P.fuelSawf, p2+P.fuelSawf, p3+P.fuelSawf, p4+P.fuelSawf, p5+P.fuelSawf,
                        p1+P.fuelQig, p2+P.fuelQig, p3+P.fuelQig, p4+P.fuelQig, p5+P.fuelQig]]]],
                [lcat+P.fuelRxi,  0, U.fireRxi, '', [
                    ['', Calc.multiply, [lcat+P.fuelDrxi, lcat+P.fuelEtam]]]],
                [lcat+P.fuelDrxi, 0, U.fireRxi, '', [
                    ['', Bed.dryFuelReactionIntensity, [
                        bed+P.fuelRxvo, lcat+P.fuelNet, lcat+P.fuelHeat, lcat+P.fuelEtas]]]],
                [lcat+P.fuelSavr, 1, U.fuelSavr, '', [
                    ['', Calc.sumOfProducts, [
                        p1+P.fuelSawf, p2+P.fuelSawf, p3+P.fuelSawf, p4+P.fuelSawf, p5+P.fuelSawf,
                        p1+P.fuelSavr, p2+P.fuelSavr, p3+P.fuelSavr, p4+P.fuelSavr, p5+P.fuelSavr]]]],
                [lcat+P.fuelSeff, 0, U.fuelFrac, '', [
                    ['', Calc.sumOfProducts, [
                        p1+P.fuelSawf, p2+P.fuelSawf, p3+P.fuelSawf, p4+P.fuelSawf, p5+P.fuelSawf,
                        p1+P.fuelSeff, p2+P.fuelSeff, p3+P.fuelSeff, p4+P.fuelSeff, p5+P.fuelSeff]]]],
                // Note that this uses the *SIZE CLASS* weighting factors!!
                [lcat+P.fuelNet, 0, U.fuelLoad, '', [
                    ['', Calc.sumOfProducts, [
                        p1+P.fuelScwf, p2+P.fuelScwf, p3+P.fuelScwf, p4+P.fuelScwf, p5+P.fuelScwf,
                        p1+P.fuelNet, p2+P.fuelNet, p3+P.fuelNet, p4+P.fuelNet, p5+P.fuelNet]]]],
            )
        }
        // The following nodes only exist for the surface fire 'dead' category
        this.nodes.push(
            [dead+P.fuelMext, 0, U.fuelMois, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDeadMext]]]],
            [dead+P.fuelEfwl, 0, U.fuelLoad, '', [
                ['', Calc.sum, [d1+P.fuelEfwl, d2+P.fuelEfwl, d3+P.fuelEfwl, d4+P.fuelEfwl, d5+P.fuelEfwl]]]],
            [dead+P.fuelEfmc, 0, U.fuelMois, '', [
                ['', Calc.divide, [dead+P.fuelEfwl, dead+P.fuelEfol]]]],
        )
        // The following nodes only exist for the surface fire 'live' category
        this.nodes.push(
            [live+P.fuelMextf, 0, U.factor, '', [
                ['', Bed.liveFuelExtinctionMoistureContentFactor, [dead+P.fuelEfol, live+P.fuelEfol]]]],
            [live+P.fuelMext,  0, U.fuelMois, '', [
                ['', Bed.liveFuelExtinctionMoistureContent, [
                    live+P.fuelMextf, dead+P.fuelEfmc, dead+P.fuelMext]]]]
        )
        // The crown canopy fuel model mext is 0.25, wrsf is 0.4, slope is 0

        //----------------------------------------------------------------------
        // Fuel bed *derived*  and *input* nodes
        //----------------------------------------------------------------------
        this.nodes.push(
            [bed+P.fuelDepth,  0, U.fuelLeng, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDepth]]]],
            [bed+P.fuelBulk,   0, U.fuelBulk, '', [
                ['', Bed.bulkDensity, [bed+P.fuelLoad, bed+P.fuelDepth]]]],
            [bed+P.fuelLoad,   0, U.fuelLoad, '', [
                ['', Calc.sum, [dead+P.fuelLoad, live+P.fuelLoad]]]],
            [bed+P.fuelSa,     0, U.fuelSa, '', [
                ['', Calc.sum, [dead+P.fuelSa, live+P.fuelSa]]]],
            [bed+P.fuelSavr,   1, U.fuelSavr, '', [
                ['', Bed.weightedSavr, [
                    dead+P.fuelSawf, dead+P.fuelSavr, live+P.fuelSawf, live+P.fuelSavr]]]],
            [bed+P.fuelQig,    0, U.fuelQig, '', [
                ['', Bed.weightedHeatOfPreIgnition, [
                    dead+P.fuelSawf, dead+P.fuelQig, live+P.fuelSawf, live+P.fuelQig]]]],
            [bed+P.fuelBeta,   0, U.ratio, '', [
                ['', Bed.packingRatio, [dead+P.fuelVol, live+P.fuelVol, bed+P.fuelDepth]]]],
            [bed+P.fuelBopt,   0, U.ratio, '', [
                ['', Bed.optimumPackingRatio, [bed+P.fuelSavr]]]],
            [bed+P.fuelBrat,   0, U.ratio, '', [
                ['', Bed.packingRatioRatio, [bed+P.fuelBeta, bed+P.fuelBopt]]]],
            // [bed+P.fuelEhn,    0, U.ratio, '', [
            //     ['', Bed.effectiveHeatingNumber, [bed+P.fuelSavr]]]],
            [bed+P.fuelXi,     0, U.ratio, '', [
                ['', Bed.propagatingFluxRatio, [bed+P.fuelSavr, bed+P.fuelBeta]]]],
            [bed+P.fuelRxve,   0, U.factor, '', [
                ['', Bed.reactionVelocityExponent, [bed+P.fuelSavr]]]],
            [bed+P.fuelRxvm,   0, U.fuelRxv, '', [
                ['', Bed.reactionVelocityMaximum, [bed+P.fuelSavr15]]]],
            [bed+P.fuelRxvo,   0, U.fuelRxv, '', [
                ['', Bed.reactionVelocityOptimum, [bed+P.fuelBrat, bed+P.fuelRxvm, bed+P.fuelRxve]]]],
            [bed+P.fuelSavr15, 1, U.fuelSavr, '', [
                ['', Bed.savr15, [bed+P.fuelSavr]]]],
            [bed+P.fuelSink,   0, U.fuelSink, '', [
                ['', Bed.heatSink, [bed+P.fuelBulk, bed+P.fuelQig]]]],
            [bed+P.fuelRxi,    0, U.fireRxi, '', [
                ['', Bed.reactionIntensity, [dead+P.fuelRxi, live+P.fuelRxi]]]],
            [bed+P.fuelSource, 0, U.fireRxi, '', [
                ['', Bed.heatSource, [bed+P.fuelRxi, bed+P.fuelXi]]]],
            [bed+P.fuelWsrf,   1, U.fraction, '', [
                ['', Bed.openWindSpeedAdjustmentFactor, [bed+P.fuelDepth]]]],
        )
    }
}
