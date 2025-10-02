import { Dag } from '../index.js'
import { ModuleBase } from './ModuleBase.js'
import { Paths as P} from './Paths.js'
import { Units as U} from './Units.js'
import { SurfaceFuelModule } from './SurfaceFuelModule.js'

import { Calc, FuelElementEquations as Fuel } from '../index.js'
import { FuelBedEquations as Bed } from '../index.js'
import { SurfaceFireEquations as Fire } from '../index.js'

export class CrownFuelModule extends SurfaceFuelModule {
    /**
     * Specializes the SurfaceFuelModule for crown fire modeling.
     * 
     * @param {string} prefix Prefix for this module's fully qualified node names
     * (something like `primary/surface/`) to append this module's 'bed/<node>' node keys
     * @param {string} mois1Node Fully qualified path to the 1-h fuel moisture node
     * @param {string} mois10Node Fully qualified path to the 10-h fuel moisture node
     * @param {string} mois100Node Fully qualified path to the 100-h fuel moisture node
     * @param {string} moisStemNode Fully qualified path to the live stem fuel moisture node
    */
    constructor(prefix, mois1Node, mois10Node, mois100Node, moisStemNode) {
        // Pass SurfaceFuelModule a null config so it lets us do our own particle nodes
        super(prefix+P.crownFuel, null)
        this.self = P.crownFuelSelf
        this.module = P.crownFuelMod
        this._configurableNodes(mois1Node, mois10Node, mois100Node, moisStemNode)
        this.nodes = [...this.cNodes, ...this.dNodes]
    }

    _configurableNodes(mois1Node, mois10Node, mois100Node, moisStemNode) {
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
        // The crown canopy fuel model mext is 0.25, wrsf is 0.4, slope is 0

        //----------------------------------------------------------------------
        // Fuel bed nodes
        //----------------------------------------------------------------------
        this.cNodes.push(
            [bed+P.fuelDepth,  1, U.fuelLeng, null, [['', Dag.constant, []]]],
            [dead+P.fuelMext, 0.25, U.fuelMois, null, [['', Dag.constant, []]]],
        )

        //----------------------------------------------------------------------
        // Fuel bed particle input nodes (9)
        //----------------------------------------------------------------------
        this.cNodes.push(
            // Dead particle 1
            [d1+P.fuelType, P.stdDead1Type, U.fuelType, null, [['', Dag.constant, []]]],
            [d1+P.fuelMois, 0, U.fuelMois, null, [['', Dag.assign, [mois1Node]]]],
            [d1+P.fuelLoad, 0.138, U.fuelLoad, null, [['', Dag.constant, []]]],
            [d1+P.fuelSavr, 2000, U.fuelSavr, null, [['', Dag.constant, []]]],

            // Dead particle 2
            [d2+P.fuelType, P.stdDead10Type, U.fuelType, null, [['', Dag.constant, []]]],
            [d2+P.fuelMois, 0, U.fuelMois, null, [['', Dag.assign, [mois10Node]]]],
            [d2+P.fuelLoad, 0.092, U.fuelLoad, null, [['', Dag.constant, []]]],
            [d2+P.fuelSavr, 109, U.fuelSavr, null, [['', Dag.constant, []]]],

            // Dead particle 3
            [d3+P.fuelType, P.stdDead100Type, U.fuelType, null, [['', Dag.constant, []]]],
            [d3+P.fuelMois, 0, U.fuelMois, null, [['', Dag.assign, [mois100Node]]]],
            [d3+P.fuelLoad, 0.23, U.fuelLoad, null, [['', Dag.constant, []]]],
            [d3+P.fuelSavr, 30, U.fuelSavr, null, [['', Dag.constant, []]]],

            // Live particle 2
            [l2+P.fuelType, P.stdLiveStemType, U.fuelType, null, [['', Dag.constant, []]]],
            [l2+P.fuelMois, 0, U.fuelMois, null, [['', Dag.assign, [moisStemNode]]]],
            [l2+P.fuelLoad, 0.092, U.fuelLoad, null, [['', Dag.constant, []]]],
            [l2+P.fuelSavr, 1500, U.fuelSavr, null, [['', Dag.constant, []]]],
        )

        for(let p of [d1, d2, d3, d4, d5]) {
            this.cNodes.push(       
                [p+P.fuelLife, P.fuelDeadCat, U.fuelLife, null, [['', Dag.constant, []]]])
        }

        for(let p of [l1, l2, l3, l4, l5]) {
            this.cNodes.push(       
                [p+P.fuelLife, P.fuelLiveCat, U.fuelLife, null, [['', Dag.constant, []]]])
        }

        // Unused particles
        for(let p of [d4, d5, l1, l3, l4, l5]) {
            this.cNodes.push(       
                [p+P.fuelType, P.fuelUnused, U.fuelType, null, [['', Dag.constant, []]]],
                [p+P.fuelMois, 0, U.fuelMois, null, [['', Dag.constant, []]]],
                [p+P.fuelLoad, 0, U.fuelLoad, null, [['', Dag.constant, []]]],
                [p+P.fuelSavr, 1, U.fuelSavr, null, [['', Dag.constant, []]]],
            )
        }

        for(let p of [d1, d2, d3, d4, d5, l1, l2, l3, l4, l5]) {
            this.cNodes.push(       
                [p+P.fuelHeat, 8000,   U.fuelHeat, null, [['', Dag.constant, []]]],
                [p+P.fuelDens, 32,     U.fuelDens, null, [['', Dag.constant, []]]],
                [p+P.fuelStot, 0.0555, U.fuelFrac, null, [['', Dag.constant, []]]],
                [p+P.fuelSeff, 0.01,   U.fuelFrac, null, [['', Dag.constant, []]]],
            )
        }
    }
}
