import { Dag, U } from '../index.js'
import { Paths as P} from './Paths.js'
import { ModuleBase } from './ModuleBase.js'

export class ConstantsModule extends ModuleBase {
    constructor(prefix) {
        super(prefix, P.constantsSelf, P.constantsMod)
        const path = this.prefix
        this.nodes = [
            [path+P.fuelDeadCat, 'dead', U.fuelLife, '', [['', Dag.constant, []]]],
            [path+P.fuelLiveCat, 'live', U.fuelLife, '', [['', Dag.constant, []]]],
            [path+P.zero, 0, '', '', [['', Dag.constant, []]]],
            [path+P.one, 1, '', '', [['', Dag.constant, []]]],
            [path+P.fuelUnused, 'unused', U.fuelType, '', [['', Dag.constant, []]]],
        ]
    }
}