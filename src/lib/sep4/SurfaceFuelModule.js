import { Dag, K, L, ModuleBase, U } from './index.js'
import { Calc, FuelElementEquations as Fuel } from '../index.js'
import { FuelBedEquations as Bed } from '../index.js'
import { SurfaceFireEquations as Fire } from '../index.js'

export class SurfaceFuelModule extends ModuleBase {
    /**
     * 
     * @param {string} fuelBedPath Prefix for this module's fully qualified node kets,
     *        something like `surface/primary/bed/`
     * @param {string} slope Fully qualified path to slope steepness ratio node,
     *        something like 'terrain/slope/steepness/ratio'
     * @param {string} midflame Fully qualified path to the midflame wind speed,
     *        something like 'surface/primary/wind/midflame'
     * @param {string} windHeadUpslp Fully qualified path to the wind heading direction clockwise from upslope,
     *        something like 'weather/wind/direction/heading/from upslope'
     * @param {string} stdPath Fully qualified path to standard fuel model
     *        something like `surface/primary/model/standard/`
     * @param {string} chPath Fully qualified path to chaparral fuel model
     *        something like `surface/primary/model/chaparral/`
     * @param {string} pgPath Fully qualified path to palmetto-gallberry fuel model
     *        something like `surface/primary/model/palmetto/`
     * @param {string} waPath Fully qualified path to western aspen fuel model
     *        something like `surface/primary/model/aspen/`
    */
    constructor(fuelBedPath, slope, midflame, windHeadUpslp, stdPath='', chPath='', pgPath='', waPath='') {
        super(fuelBedPath)
console.log(`SurfaceFuelModel got wind heading key = "${windHeadUpslp}"`)

        // configs
        this.config = 'fuel model domain'
        // config options
        this.std = 'standard'
        this.ch = 'chaparral'
        this.pg = 'palmetto-gallberry'
        this.wa = 'western aspen'
        this.options = [this.std, this.ch, this.pg, this.wa]

        const bed = this.path
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

        this.fuelRxi = bed + L.fireRxi
        this.fuelNwns = bed + L.rosNwns
        this.fuelSavr = bed + L.fuelSavr
        this.fuelBeta = bed + L.fuelBeta
        
        //----------------------------------------------------------------------
        // Fuel bed particle input nodes (9)
        //----------------------------------------------------------------------
        this.nodes = [
            [d1+L.fuelLife, '', U.fuelLife, 0, [
                [this.any, Dag.assign, [K.fuelDeadCat]]
            ]],
            [d1+L.fuelType, '', U.fuelType, 0, [
                [this.std, Dag.assign, [stdPath + 'dead/1-h/' + L.fuelType]],
            ]],
            [d1+L.fuelMois, 0, U.fuelMois, 0, [
                [this.std, Dag.assign, [stdPath + 'dead/1-h/' + L.fuelMois]],
            ]],
            [d1+L.fuelLoad, 0, U.fuelLoad, 0, [
                [this.std, Dag.assign, [stdPath+'dead/1-h/' + L.fuelLoad]],
            ]],
            [d1+L.fuelSavr, 1, U.fuelSavr, 0, [
                [this.std, Dag.assign, [stdPath+'dead/1-h/' + L.fuelSavr]],
            ]],
            [d1+L.fuelHeat, 0, U.fuelHeat, 0, [
                [this.std, Dag.assign, [stdPath+'dead/' + L.fuelHeat]],
            ]],
            [d1+L.fuelDens, 0, U.fuelDens, 0, [
                [this.std, Dag.assign, [stdPath+ L.fuelDens]],
            ]],
            [d1+L.fuelStot, 0, U.fuelFrac, 0, [
                [this.std, Dag.assign, [stdPath+ L.fuelStot]],
            ]],
            [d1+L.fuelSeff, 0, U.fuelFrac, 0, [
                [this.std, Dag.assign, [stdPath+ L.fuelSeff]],
            ]],

            // Dead particle 2
            [d2+L.fuelLife, '', U.fuelLife, 0, [
                [this.any, Dag.assign, [K.fuelDeadCat]]
            ]],
            [d2+L.fuelType, '', U.fuelType, 0, [
                [this.std, Dag.assign, [stdPath + 'dead/10-h/' + L.fuelType]],
            ]],
            [d2+L.fuelMois, 0, U.fuelMois, 0, [
                [this.std, Dag.assign, [stdPath + 'dead/10-h/' + L.fuelMois]],
            ]],
            [d2+L.fuelLoad, 0, U.fuelLoad, 0, [
                [this.std, Dag.assign, [stdPath+'dead/10-h/' + L.fuelLoad]],
            ]],
            [d2+L.fuelSavr, 1, U.fuelSavr, 0, [
                [this.std, Dag.assign, [stdPath+'dead/10-h/' + L.fuelSavr]],
            ]],
            [d2+L.fuelHeat, 0, U.fuelHeat, 0, [
                [this.std, Dag.assign, [stdPath+'dead/' + L.fuelHeat]],
            ]],
            [d2+L.fuelDens, 0, U.fuelDens, 0, [
                [this.std, Dag.assign, [stdPath+ L.fuelDens]],
            ]],
            [d2+L.fuelStot, 0, U.fuelFrac, 0, [
                [this.std, Dag.assign, [stdPath+ L.fuelStot]],
            ]],
            [d2+L.fuelSeff, 0, U.fuelFrac, 0, [
                [this.std, Dag.assign, [stdPath+ L.fuelSeff]],
            ]],

            // Dead particle 3
            [d3+L.fuelLife, '', U.fuelLife, 0, [
                [this.any, Dag.assign, [K.fuelDeadCat]]
            ]],
            [d3+L.fuelType, '', U.fuelType, 0, [
                [this.std, Dag.assign, [stdPath + 'dead/100-h/' + L.fuelType]],
            ]],
            [d3+L.fuelMois, 0, U.fuelMois, 0, [
                [this.std, Dag.assign, [stdPath + 'dead/100-h/' + L.fuelMois]],
            ]],
            [d3+L.fuelLoad, 0, U.fuelLoad, 0, [
                [this.std, Dag.assign, [stdPath+'dead/100-h/' + L.fuelLoad]],
            ]],
            [d3+L.fuelSavr, 1, U.fuelSavr, 0, [
                [this.std, Dag.assign, [stdPath+'dead/100-h/' + L.fuelSavr]],
            ]],
            [d3+L.fuelHeat, 0, U.fuelHeat, 0, [
                [this.std, Dag.assign, [stdPath+'dead/' + L.fuelHeat]],
            ]],
            [d3+L.fuelDens, 0, U.fuelDens, 0, [
                [this.std, Dag.assign, [stdPath+ L.fuelDens]],
            ]],
            [d3+L.fuelStot, 0, U.fuelFrac, 0, [
                [this.std, Dag.assign, [stdPath+ L.fuelStot]],
            ]],
            [d3+L.fuelSeff, 0, U.fuelFrac, 0, [
                [this.std, Dag.assign, [stdPath+ L.fuelSeff]],
            ]],

            // Dead particle 4
            [d4+L.fuelLife, '', U.fuelLife, 0, [
                [this.any, Dag.assign, [K.fuelDeadCat]]
            ]],
            [d4+L.fuelType, '', U.fuelType, 0, [
                [this.std, Dag.assign, [stdPath + 'dead/herb/' + L.fuelType]],
            ]],
            [d4+L.fuelMois, 0, U.fuelMois, 0, [
                [this.std, Dag.assign, [stdPath + 'dead/herb/' + L.fuelMois]],
            ]],
            [d4+L.fuelLoad, 0, U.fuelLoad, 0, [
                [this.std, Dag.assign, [stdPath+'dead/herb/' + L.fuelLoad]],
            ]],
            [d4+L.fuelSavr, 1, U.fuelSavr, 0, [
                [this.std, Dag.assign, [stdPath+'dead/herb/' + L.fuelSavr]],
            ]],
            [d4+L.fuelHeat, 0, U.fuelHeat, 0, [
                [this.std, Dag.assign, [stdPath+'dead/' + L.fuelHeat]],
            ]],
            [d4+L.fuelDens, 0, U.fuelDens, 0, [
                [this.std, Dag.assign, [stdPath+ L.fuelDens]],
            ]],
            [d4+L.fuelStot, 0, U.fuelFrac, 0, [
                [this.std, Dag.assign, [stdPath+ L.fuelStot]],
            ]],
            [d4+L.fuelSeff, 0, U.fuelFrac, 0, [
                [this.std, Dag.assign, [stdPath+ L.fuelSeff]],
            ]],

            // Dead particle 5
            [d5+L.fuelLife, '', U.fuelLife, 0, [
                [this.any, Dag.assign, [K.fuelDeadCat]]
            ]],
            [d5+L.fuelType, '', U.fuelType, 0, [
                [this.std, Dag.assign, [K.fuelUnused]],
            ]],
            [d5+L.fuelMois, 0, U.fuelMois, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],
            [d5+L.fuelLoad, 0, U.fuelLoad, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],
            [d5+L.fuelSavr, 1, U.fuelSavr, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],
            [d5+L.fuelHeat, 0, U.fuelHeat, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],
            [d5+L.fuelDens, 0, U.fuelDens, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],
            [d5+L.fuelStot, 0, U.fuelFrac, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],
            [d5+L.fuelSeff, 0, U.fuelFrac, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],

            // Live particle 1
            [l1+L.fuelLife, '', U.fuelLife, 0, [
                [this.any, Dag.assign, [K.fuelLiveCat]]
            ]],
            [l1+L.fuelType, '', U.fuelType, 0, [
                [this.std, Dag.assign, [stdPath + 'live/herb/' + L.fuelType]],
            ]],
            [l1+L.fuelMois, 0, U.fuelMois, 0, [
                [this.std, Dag.assign, [stdPath + 'live/herb/' + L.fuelMois]],
            ]],
            [l1+L.fuelLoad, 0, U.fuelLoad, 0, [
                [this.std, Dag.assign, [stdPath+'live/herb/' + L.fuelLoad]],
            ]],
            [l1+L.fuelSavr, 1, U.fuelSavr, 0, [
                [this.std, Dag.assign, [stdPath+'live/herb/' + L.fuelSavr]],
            ]],
            [l1+L.fuelHeat, 0, U.fuelHeat, 0, [
                [this.std, Dag.assign, [stdPath+'live/' + L.fuelHeat]],
            ]],
            [l1+L.fuelDens, 0, U.fuelDens, 0, [
                [this.std, Dag.assign, [stdPath+ L.fuelDens]],
            ]],
            [l1+L.fuelStot, 0, U.fuelFrac, 0, [
                [this.std, Dag.assign, [stdPath+ L.fuelStot]],
            ]],
            [l1+L.fuelSeff, 0, U.fuelFrac, 0, [
                [this.std, Dag.assign, [stdPath+ L.fuelSeff]],
            ]],

            // Live particle 2
            [l2+L.fuelLife, '', U.fuelLife, 0, [
                [this.any, Dag.assign, [K.fuelLiveCat]]
            ]],
            [l2+L.fuelType, '', U.fuelType, 0, [
                [this.std, Dag.assign, [stdPath + 'live/stem/' + L.fuelType]],
            ]],
            [l2+L.fuelMois, 0, U.fuelMois, 0, [
                [this.std, Dag.assign, [stdPath + 'live/stem/' + L.fuelMois]],
            ]],
            [l2+L.fuelLoad, 0, U.fuelLoad, 0, [
                [this.std, Dag.assign, [stdPath+'live/stem/' + L.fuelLoad]],
            ]],
            [l2+L.fuelSavr, 1, U.fuelSavr, 0, [
                [this.std, Dag.assign, [stdPath+'live/stem/' + L.fuelSavr]],
            ]],
            [l2+L.fuelHeat, 0, U.fuelHeat, 0, [
                [this.std, Dag.assign, [stdPath+'live/' + L.fuelHeat]],
            ]],
            [l2+L.fuelDens, 0, U.fuelDens, 0, [
                [this.std, Dag.assign, [stdPath+ L.fuelDens]],
            ]],
            [l2+L.fuelStot, 0, U.fuelFrac, 0, [
                [this.std, Dag.assign, [stdPath+ L.fuelStot]],
            ]],
            [l2+L.fuelSeff, 0, U.fuelFrac, 0, [
                [this.std, Dag.assign, [stdPath+ L.fuelSeff]],
            ]],

            // Live particle 3
            [l3+L.fuelLife, '', U.fuelLife, 0, [
                [this.any, Dag.assign, [K.fuelLiveCat]]
            ]],
            [l3+L.fuelType, '', U.fuelType, 0, [
                [this.std, Dag.assign, [K.fuelUnused]],
            ]],
            [l3+L.fuelMois, 0, U.fuelMois, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],
            [l3+L.fuelLoad, 0, U.fuelLoad, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],
            [l3+L.fuelSavr, 1, U.fuelSavr, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],
            [l3+L.fuelHeat, 0, U.fuelHeat, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],
            [l3+L.fuelDens, 0, U.fuelDens, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],
            [l3+L.fuelStot, 0, U.fuelFrac, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],
            [l3+L.fuelSeff, 0, U.fuelFrac, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],

            // Live particle 4
            [l4+L.fuelLife, '', U.fuelLife, 0, [
                [this.any, Dag.assign, [K.fuelLiveCat]]
            ]],
            [l4+L.fuelType, '', U.fuelType, 0, [
                [this.std, Dag.assign, [K.fuelUnused]],
            ]],
            [l4+L.fuelMois, 0, U.fuelMois, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],
            [l4+L.fuelLoad, 0, U.fuelLoad, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],
            [l4+L.fuelSavr, 1, U.fuelSavr, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],
            [l4+L.fuelHeat, 0, U.fuelHeat, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],
            [l4+L.fuelDens, 0, U.fuelDens, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],
            [l4+L.fuelStot, 0, U.fuelFrac, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],
            [l4+L.fuelSeff, 0, U.fuelFrac, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],

            // Live particle 5
            [l5+L.fuelLife, '', U.fuelLife, 0, [
                [this.any, Dag.assign, [K.fuelLiveCat]]
            ]],
            [l5+L.fuelType, '', U.fuelType, 0, [
                [this.std, Dag.assign, [K.fuelUnused]],
            ]],
            [l5+L.fuelMois, 0, U.fuelMois, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],
            [l5+L.fuelLoad, 0, U.fuelLoad, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],
            [l5+L.fuelSavr, 1, U.fuelSavr, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],
            [l5+L.fuelHeat, 0, U.fuelHeat, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],
            [l5+L.fuelDens, 0, U.fuelDens, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],
            [l5+L.fuelStot, 0, U.fuelFrac, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],
            [l5+L.fuelSeff, 0, U.fuelFrac, 0, [
                [this.std, Dag.assign, [K.zero]],
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
                    [p+L.fuelEhn, 0, U.fuelEhn, 0, [
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
                    [p+L.fuelEfwl, 0, U.waterLoad, 0, [
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
                [this.std, Dag.assign, [stdPath + 'dead/' + L.fuelMext]]]],
            [dead+L.fuelEfwl, 0, U.fuelEfwl, 0, [
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
        // Fuel bed *derived* nodes
        //----------------------------------------------------------------------
        this.nodes.push(
            [bed+L.fuelDepth,  0, U.fuelLeng, 0, [
                [this.std, Dag.assign, [stdPath + L.fuelDepth]]]],
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
            [bed+L.fuelEhn,    0, U.ratio, 0, [
                [this.any, Bed.effectiveHeatingNumber, [bed+L.fuelSavr]]]],
            [bed+L.fuelXi,     0, U.ratio, 0, [
                [this.any, Bed.propagatingFluxRatio, [bed+L.fuelSavr, bed+L.fuelBeta]]]],
            [bed+L.fuelRxve,   0, U.factor, 0, [
                [this.any, Bed.reactionVelocityExponent, [bed+L.fuelSavr]]]],
            [bed+L.fuelRxvm,   0, U.fuelRxv, 0, [
                [this.any, Bed.reactionVelocityMaximum, [bed+L.fuelSavr15]]]],
            [bed+L.fuelRxvo,   0, U.fuelRxv, 0, [
                [this.any, Bed.reactionVelocityOptimum, [bed+L.fuelBrat, bed+L.fuelRxvm, bed+L.fuelRxve]]]],
            [bed+L.fuelSlpk,   0, U.factor, 0, [
                [this.any, Bed.slopeK, [bed+L.fuelBeta]]]],
            [bed+L.fuelSavr15, 1, U.fuelSavr, 0, [
                [this.any, Bed.savr15, [bed+L.fuelSavr]]]],
            [bed+L.fuelSink,   0, U.fuelSink, 0, [
                [this.any, Bed.heatSink, [bed+L.fuelBulk, bed+L.fuelQig]]]],
            [bed+L.fireRxi,    0, U.fireRxi, 0, [
                [this.any, Bed.reactionIntensity, [dead+L.fireRxi, live+L.fireRxi]]]],
            [bed+L.fuelSource, 0, U.fireRxi, 0, [
                [this.any, Bed.heatSource, [bed+L.fireRxi, bed+L.fuelXi]]]],
            [bed+L.windB,      1, U.factor, 0, [
                [this.any, Bed.windB, [bed+L.fuelSavr]]]],
            [bed+L.windC,      0, U.factor, 0, [
                [this.any, Bed.windC, [bed+L.fuelSavr]]]],
            [bed+L.windE,      1, U.factor, 0, [
                [this.any, Bed.windE, [bed+L.fuelSavr]]]],
            [bed+L.windI,      0, U.factor, 0, [
                [this.any, Bed.windI, [bed+L.fuelBrat, bed+L.windE, bed+L.windC]]]],
            [bed+L.windK,      0, U.factor, 0, [
                [this.any, Bed.windK, [bed+L.fuelBrat, bed+L.windE, bed+L.windC]]]],
            [bed+L.weffLimit,  0, U.windSpeed, 0, [
                [this.any, Fire.effectiveWindSpeedLimit, [bed+L.fireRxi]]]],
            [bed+L.fireTaur,   0, U.taur, 0, [
                [this.any, Bed.fireResidenceTime, [bed+L.fuelSavr]]]],
            [bed+L.fireHpua,   0, U.hpua, 0, [
                [this.any, Bed.heatPerUnitArea, [bed+L.fireRxi, bed+L.fireTaur]]]],
            [bed+L.wsrfFuel,   1, U.fraction, 0, [
                [this.any, Bed.openWindSpeedAdjustmentFactor, [bed+L.fuelDepth]]]],
            [bed+L.rosNwns,    0, U.fireRos, 0, [
                [this.any, Bed.noWindNoSlopeSpreadRate, [bed+L.fuelSource, bed+L.fuelSink]]]],
            [bed+L.weffLimit,  0, U.windSpeed, 0, [
                [this.any, Fire.effectiveWindSpeedLimit, [bed+L.fireRxi]]]],

            [bed+L.fuelPhiW,   0, U.factor, 0, [
                [this.any, Bed.phiWind, [midflame, bed+L.windB, bed+L.windK]]]],
            [bed+L.fuelPhiS,   0, U.factor, 0, [
                [this.any, Bed.phiSlope, [slope, bed+L.fuelSlpk]]]],
            [bed+L.fuelPhiE,   0, U.factor, 0, [
                [this.any, Fire.phiEffectiveWind, [bed+L.fuelPhiW, bed+L.fuelPhiS]]]],
            // The following apply only to upslope wind conditions
            [bed+L.weffUpsl,   0, U.windSpeed, 0, [
                [this.any, Fire.effectiveWindSpeed, [bed+L.fuelPhiE, bed+L.windB, bed+L.windI]]]],
            [bed+L.rosUpsl,    0, U.fireRos, 0, [
                [this.any, Fire.maximumSpreadRate, [bed+L.rosNwns, bed+L.fuelPhiE]]]],
            [bed+L.fireTaur,   0, U.taur, 0, [
                [this.any, Bed.fireResidenceTime, [bed+L.fuelSavr]]]],
            [bed+L.fireHpua,   0, U.hpua, 0, [
                [this.any, Bed.heatPerUnitArea, [bed+L.fireRxi, bed+L.fireTaur]]]],
            [bed+L.fireLwr,    1, U.ratio, 0, [
                [this.any, Fire.lengthToWidthRatio, [bed+L.weffUpsl]]]],
            [bed+L.fireFli,    0, U.fireFli, 0, [
                [this.any, Fire.firelineIntensity, [bed+L.rosUpsl, bed+L.fireRxi, bed+L.fireTaur]]]],
            [bed+L.fireFlame,   0, U.flamelen, 0, [
                [this.any, Fire.flameLength, [bed+L.fireFli]]]],

            [bed+L.rosSlope,  0, U.fireRos, 0, [
                [this.any, Fire.maximumDirectionSlopeSpreadRate, [bed+L.rosNwns, bed+L.fuelPhiS]]]],
            [bed+L.rosWind,   0, U.fireRos, 0, [
                [this.any,Fire.maximumDirectionWindSpreadRate, [bed+L.rosNwns, bed+L.fuelPhiW]]]],
            [bed+L.rosXcomp,  0, U.factor, 0, [
                [this.any,Fire.maximumDirectionXComponent, [bed+L.rosWind, bed+L.rosSlope, windHeadUpslp]]]],
            [bed+L.rosYcomp,  0, U.factor, 0, [
                [this.any,Fire.maximumDirectionYComponent, [bed+L.rosWind, windHeadUpslp]]]],
            [bed+L.rosHead,   0, U.factor, 0, [
                [this.any,Fire.maximumDirectionSpreadRate, [bed+L.rosXcomp, bed+L.rosYcomp]]]],

        )
    }
}
