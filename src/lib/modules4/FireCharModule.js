import { DagModule } from './DagItems.js'
import { CommonNodes as Common } from './CommonNodes.js'

/**
 * FireCharModule defines the basic stack of fire behavior characteristic nodes.
 * It is a base class that is extended by FireCellModule, WeightedFireModule,
 * FireInputModule, FireVectorModule, etc.
 */
export class FireCharModule extends DagModule {
    /**
     * @param {DagModule} parentMod Reference to this DagItem's parent DagModule
     * @param {string} parentProp Parent's property name for this DagItem
     */
    constructor(parentMod, parentProp) {
        super(parentMod, parentProp)
        this.dir = new DagModule(this, 'dir', 'fire heading')
        this.dir.fromUpslope = Common.fromUpslope(this.dir)
        this.dir.fromNorth = Common.fromNorth(this.dir)
        this.taur = Common.taur(this)
        this.hpua = Common.hpua(this)
        this.lwr = Common.lwr(this)
        this.fli = Common.fli(this)
        this.flame = Common.flame(this)
        this.midflame = Common.midflame(this)
        this.phiE = Common.phiE(this)
        this.ros = Common.ros(this)
        this.rxi = Common.rxi(this)
        this.weff = Common.weff(this)
        this.weffExceeded = Common.weffExceeded(this)
        this.weffLimit = Common.weffLimit(this)
        this.wsrf = Common.wsrf(this)
    }

    config() {}
}
