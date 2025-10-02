import { Dag } from '../index.js'
import { Paths as P} from './Paths.js'
import { Units as U} from './Units.js'
import { SurfaceFuelBaseModule } from './SurfaceFuelBaseModule.js'
import { Calc, FuelElementEquations as Fuel } from '../index.js'
import { FuelBedEquations as Bed } from '../index.js'
import { SurfaceFireEquations as Fire } from '../index.js'

export class SurfaceFuelModule extends SurfaceFuelBaseModule {
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
     * (something like `primary/`, 'secondary', or 'crown/')
     * to append this module's 'bed/<node>' node keys
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
        const particleNodes = this._particleNodes(prefix, cfg, stdPath, chPath, pgPath, waPath)
        this.nodes = [...this._bedNodes(), ...particleNodes]
    }
    
    _particleNodes(prefix, cfg, stdPath, chPath, pgPath, waPath) {
        const nodes = []
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
        // Fuel bed nodes
        //----------------------------------------------------------------------
        nodes.push(
            [bed+P.fuelDepth,  0, U.fuelLeng, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDepth]]]],
            [dead+P.fuelMext, 0, U.fuelMois, cfg, [
                [cfg.standard, Dag.assign, [stdPath + P.stdDeadMext]]]],
        )

        //----------------------------------------------------------------------
        // Fuel bed particle input nodes (9)
        //----------------------------------------------------------------------
        nodes.push(
            [d1+P.fuelLife, '', U.fuelLife, null, [
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
            [d2+P.fuelLife, '', U.fuelLife, null, [
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
            [d3+P.fuelLife, '', U.fuelLife, null, [
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
            [d4+P.fuelLife, '', U.fuelLife, null, [
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
            [d5+P.fuelLife, '', U.fuelLife, null, [
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
            [l1+P.fuelLife, '', U.fuelLife, null, [
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
            [l2+P.fuelLife, '', U.fuelLife, null, [
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
            [l3+P.fuelLife, '', U.fuelLife, null, [
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
            [l4+P.fuelLife, '', U.fuelLife, null, [
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
            [l5+P.fuelLife, '', U.fuelLife, null, [
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
        )
        return nodes
    }
}
