import { Dag, K, ModuleBase, U } from './index.js'

export class ConstantsModule extends ModuleBase {
    constructor(path = 'constants/') {
        super(path)

        this.nodes = [
            [K.fuelDeadCat, 'dead', U.fuelLife, 0 [this.all, Dag.constant, []]],
            [K.fuelLiveCat, 'live', U.fuelLife, 0 [this.all, Dag.constant, []]],

            [K.fuelStandard, 'standard', U.fuelModel, 0 [this.all, Dag.constant, []]],
            [K.fuelChaparral, 'chaparral', U.fuelModel, 0 [this.all, Dag.constant, []]],
            [K.fuelAspen, 'western aspen', U.fuelModel, 0 [this.all, Dag.constant, []]],
            [K.fuelPg, 'palmetto-gallberry', U.fuelModel, 0 [this.all, Dag.constant, []]],
            
            [K.fuelDeadDown, 'dead-down', U.fuelType, 0 [this.all, Dag.constant, []]],
            [K.fuelGrass, 'grass', U.fuelType, 0 [this.all, Dag.constant, []]],
            [K.fuelDuff, 'duff', U.fuelType, 0 [this.all, Dag.constant, []]],
            [K.fuelHerb, 'herb', U.fuelType, 0 [this.all, Dag.constant, []]],
            [K.fuelStem, 'stem', U.fuelType, 0 [this.all, Dag.constant, []]],
            [K.fuelCured, 'cured', U.fuelType, 0 [this.all, Dag.constant, []]],
            [K.fuelUnused, 'unused', U.fuelType, 0 [this.all, Dag.constant, []]],

            [K.fuelDens, 32., U.fuelDens, 0 [this.all, Dag.constant, []]],
            [K.fuelHeat, 8000., U.fuelHeat, 0 [this.all, Dag.constant, []]],
            [K.fuelLife, 'dead', U.fuelLife, 0 [this.all, Dag.constant, []]],
            [K.fuelLoad, 0., U.fuelLoad, 0 [this.all, Dag.constant, []]],
            [K.fuelSavr, 1., U.fuelSavr, 0 [this.all, Dag.constant, []]],
            [K.fuelSeff, 0.01, U.fuelSeff, 0 [this.all, Dag.constant, []]],
            [K.fuelStot, 0.0555, U.fuelStot, 0 [this.all, Dag.constant, []]],
            [K.fuelType, 'unused', U.fuelType, 0 [this.all, Dag.constant, []]],
        ]
    }
}