import { Dag } from './Dag.js'
import { ModuleBase } from './ModuleBase.js'
import { Paths as P} from './Paths.js'
import { Units as U} from './Units.js'

export class ConstantsModule extends ModuleBase {
    constructor(prefix) {
        super(prefix, P.constantsSelf, P.constantsMod)
        const path = this.prefix
        this.nodes = [
            [path+P.fuelDeadCat, 'dead', U.fuelLife, null, [['', Dag.constant, []]]],
            [path+P.fuelLiveCat, 'live', U.fuelLife, null, [['', Dag.constant, []]]],
            [path+P.zero, 0, '', null, [['', Dag.constant, []]]],
            [path+P.one, 1, '', null, [['', Dag.constant, []]]],
            [path+P.fuelUnused, 'unused', U.fuelType, null, [['', Dag.constant, []]]],
        ]
    }
}