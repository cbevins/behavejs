import {Dag, K, L, ModuleBase, U} from './index.js'
import {Calc, FuelElementEquations as Eq} from '../index.js'

export class FuelParticleNodes extends ModuleBase {
    /**
     * 
     * @param {string} fuelBedPath Something like 'surface/primary/bed/'
     * @param {string} stdModelKey Fully qualified path to standard fuel model key node
     * @param {string} curedFraction Fully qualified path to cured herb fraction node
     */
    constructor(fuelBedPath, stdPath='', chPath='', pgPath='', waPath='') {
        super(fuelBedPath)

        // configs
        this.config = 'fuel model domain'
        // config options
        this.std = 'standard'
        this.ch = 'chaparral'
        this.pg = 'palmetto-gallberry'
        this.wa = 'western aspen'
        this.options = [this.std, this.ch, this.pg, this.wa]

        const dead = this.path + 'dead/'
        const d1 = this.path + 'dead/1/'
        const d2 = this.path + 'dead/2/'
        const d3 = this.path + 'dead/3/'
        const d4 = this.path + 'dead/4/'
        const d5 = this.path + 'dead/5/'
        const live = this.path + 'live/'
        const l1 = this.path + 'live/1/'
        const l2 = this.path + 'live/2/'
        const l3 = this.path + 'live/3/'
        const l4 = this.path + 'live/4/'
        const l5 = this.path + 'live/5/'

        // Each particle has 9 input characteristics
        this.nodes = [
            [d1+L.fuelLife, '', U.fuelLife, 0, [
                [this.all, Dag.assign, [K.fuelDeadCat]]
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
            [d1+L.fuelStot, 0, U.fuelStot, 0, [
                [this.std, Dag.assign, [stdPath+ L.fuelStot]],
            ]],
            [d1+L.fuelSeff, 0, U.fuelSeff, 0, [
                [this.std, Dag.assign, [stdPath+ L.fuelSeff]],
            ]],

            // Dead particle 2
            [d2+L.fuelLife, '', U.fuelLife, 0, [
                [this.all, Dag.assign, [K.fuelDeadCat]]
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
            [d2+L.fuelStot, 0, U.fuelStot, 0, [
                [this.std, Dag.assign, [stdPath+ L.fuelStot]],
            ]],
            [d2+L.fuelSeff, 0, U.fuelSeff, 0, [
                [this.std, Dag.assign, [stdPath+ L.fuelSeff]],
            ]],

            // Dead particle 3
            [d3+L.fuelLife, '', U.fuelLife, 0, [
                [this.all, Dag.assign, [K.fuelDeadCat]]
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
            [d3+L.fuelStot, 0, U.fuelStot, 0, [
                [this.std, Dag.assign, [stdPath+ L.fuelStot]],
            ]],
            [d3+L.fuelSeff, 0, U.fuelSeff, 0, [
                [this.std, Dag.assign, [stdPath+ L.fuelSeff]],
            ]],

            // Dead particle 4
            [d4+L.fuelLife, '', U.fuelLife, 0, [
                [this.all, Dag.assign, [K.fuelDeadCat]]
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
            [d4+L.fuelStot, 0, U.fuelStot, 0, [
                [this.std, Dag.assign, [stdPath+ L.fuelStot]],
            ]],
            [d4+L.fuelSeff, 0, U.fuelSeff, 0, [
                [this.std, Dag.assign, [stdPath+ L.fuelSeff]],
            ]],

            // Dead particle 5
            [d5+L.fuelLife, '', U.fuelLife, 0, [
                [this.all, Dag.assign, [K.fuelDeadCat]]
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
            [d5+L.fuelStot, 0, U.fuelStot, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],
            [d5+L.fuelSeff, 0, U.fuelSeff, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],

            // Live particle 1
            [l1+L.fuelLife, '', U.fuelLife, 0, [
                [this.all, Dag.assign, [K.fuelLiveCat]]
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
            [l1+L.fuelStot, 0, U.fuelStot, 0, [
                [this.std, Dag.assign, [stdPath+ L.fuelStot]],
            ]],
            [l1+L.fuelSeff, 0, U.fuelSeff, 0, [
                [this.std, Dag.assign, [stdPath+ L.fuelSeff]],
            ]],

            // Live particle 2
            [l2+L.fuelLife, '', U.fuelLife, 0, [
                [this.all, Dag.assign, [K.fuelLiveCat]]
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
            [l2+L.fuelStot, 0, U.fuelStot, 0, [
                [this.std, Dag.assign, [stdPath+ L.fuelStot]],
            ]],
            [l2+L.fuelSeff, 0, U.fuelSeff, 0, [
                [this.std, Dag.assign, [stdPath+ L.fuelSeff]],
            ]],

            // Live particle 3
            [l3+L.fuelLife, '', U.fuelLife, 0, [
                [this.all, Dag.assign, [K.fuelLiveCat]]
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
            [l3+L.fuelStot, 0, U.fuelStot, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],
            [l3+L.fuelSeff, 0, U.fuelSeff, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],

            // Live particle 4
            [l4+L.fuelLife, '', U.fuelLife, 0, [
                [this.all, Dag.assign, [K.fuelLiveCat]]
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
            [l4+L.fuelStot, 0, U.fuelStot, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],
            [l4+L.fuelSeff, 0, U.fuelSeff, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],

            // Live particle 5
            [l5+L.fuelLife, '', U.fuelLife, 0, [
                [this.all, Dag.assign, [K.fuelLiveCat]]
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
            [l5+L.fuelStot, 0, U.fuelStot, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],
            [l5+L.fuelSeff, 0, U.fuelSeff, 0, [
                [this.std, Dag.assign, [K.zero]],
            ]],
            // TEST NODE!!!
            ['totalLoad', 0, U.fuelLoad, 0, [
                [this.std, Calc.sum, [
                    d1+L.fuelLoad, d2+L.fuelLoad, d3+L.fuelLoad, d4+L.fuelLoad, d5+L.fuelLoad,
                    l1+L.fuelLoad, l2+L.fuelLoad, l3+L.fuelLoad, l4+L.fuelLoad, l5+L.fuelLoad,]]
            ]]
        ]

        for(let lcat of [dead, live]) {
            const p1 = (lcat===dead) ? d1 : l1
            const p2 = (lcat===dead) ? d2 : l2
            const p3 = (lcat===dead) ? d3 : l3
            const p4 = (lcat===dead) ? d4 : l4
            const p5 = (lcat===dead) ? d5 : l5
            for(let p of [p1, p2, p3, p4, p5]) {
                // Each particle has 11 derived characteristics
                this.nodes.push(
                    [p+L.fuelEhn, 0, U.fuelEhn, 0, [
                        [this.any, Eq.effectiveHeatingNumber, [p+L.fuelSavr]]]],
                    [p+L.fuelEfol, 0, U.fuelLoad, 0, [
                        [this.any, Eq.effectiveFuelLoad, [p+L.fuelSavr, p+L.fuelLoad, p+L.fuelLife]]]],
                    [p+L.fuelQig, 0, U.fuelQig, 0, [
                        [this.any, Eq.heatOfPreignition, [p+L.fuelMois, p+L.fuelEhn]]]],
                    [p+L.fuelNet, 0, U.fuelLoad, 0, [
                        [this.any, Eq.netOvendryLoad, [p+L.fuelLoad, p+L.fuelStot]]]],
                    [p+L.fuelSize, 0, U.fuelSize, 0, [
                        [this.any, Eq.sizeClass, [p+L.fuelSavr]]]],
                    [p+L.fuelScwf, 0, U.fuelScwf, 0, [
                        [this.any, Eq.sizeClassWeightingFactor, [
                            p+L.fuelSize,       // element's size class index
                            lcat+L.fuelScar]]]],  // into this size class weighting array
                    [p+L.fuelSa, 0, U.fuelSa, 0, [
                        [this.any, Eq.surfaceArea, [p+L.fuelLoad, p+L.fuelSavr, p+L.fuelDens]]]],
                    [p+L.fuelSawf, 0, U.fuelSawf, 0, [
                        [this.any, Eq.surfaceAreaWeightingFactor, [p+L.fuelSa, lcat+L.fuelSa]]]],
                    [p+L.fuelVol, 0, U.fuelVol, 0, [
                        [this.any, Eq.volume, [p+L.fuelLoad, p+L.fuelDens]]]],
                    [p+L.fuelEfwl, 0, U.waterLoad, 0, [
                        [this.any, Eq.effectiveFuelWaterLoad, [p+L.fuelEfol, p+L.fuelMois]]]],
                    [p+L.fuelDiam, 0, U.fuelDiam, 0, [
                        [this.any, Eq.cylindricalDiameter, [p+L.fuelSavr]]]],
                    [p+L.fuelLeng, 0, U.fuelDiam, 0, [
                        [this.any, Eq.cylindricalLength, [p+L.fuelDiam, p+L.fuelVol]]]],
                )
            }
            this.nodes.push(
                [lcat+L.fuelSa, 0, U.fuelSa, 0, [
                    [this.any, Calc.sum, [p1+L.fuelSa, p2+L.fuelSa, p3+L.fuelSa, p4+L.fuelSa, p5+L.fuelSa]]
                ]],
                [lcat+L.fuelScar, 0, U.fuelScwf, 0, [
                    [this.any, Eq.sizeClassWeightingFactorArray, [
                        p1+L.fuelSa, p1+L.fuelSize,
                        p2+L.fuelSa, p2+L.fuelSize,
                        p3+L.fuelSa, p3+L.fuelSize,
                        p4+L.fuelSa, p4+L.fuelSize,
                        p5+L.fuelSa, p5+L.fuelSize]]]],
            )
        }
    }
}
