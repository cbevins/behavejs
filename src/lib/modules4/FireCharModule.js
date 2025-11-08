import { DagModule } from './DagItems.js'
import { CommonNodes as Common } from './CommonNodes.js'

/**
 * FireCharModule defines the basic stack of fire behavior characteristic nodes.
 * It is a base class that is extended by FireCellModule and WeightedFireModule,
 */
export class FireCharModule extends DagModule {
    /**
     * @param {DagModule} parentMod Reference to this DagItem's parent DagModule
     * @param {string} parentProp Parent's property name for this DagItem
     */
    constructor(parentMod, parentProp, configs=null) {
        super(parentMod, parentProp)

        // Mandatory properties
        this.dir = new DagModule(this, 'dir', 'fire heading')
        this.dir.fromUpslope = Common.fromUpslope(this.dir)
        this.dir.fromNorth = Common.fromNorth(this.dir)
        this.fli = Common.fli(this)
        this.lwr = Common.lwr(this)
        this.ros = Common.ros(this)

        // Calculated from above
        this.flame = Common.flame(this)
        this.mort = Common.mort(this)
        this.scorch = Common.scorch(this)

        // Required for scorch height
        this.midflame = Common.midflame(this)
        // Optional or special use case such as S&R crown fire,
        // these are all set by FireCellModule
        this.hpua = Common.hpua(this)
        this.phiE = Common.phiE(this)
        this.rxi = Common.rxi(this)
        this.taur = Common.taur(this)
        this.weff = Common.weff(this)
        this.weffExceeded = Common.weffExceeded(this)
        this.weffLimit = Common.weffLimit(this)
        this.wsrf = Common.wsrf(this)
    }

    config() {}
}
