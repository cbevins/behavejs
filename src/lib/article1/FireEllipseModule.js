import { CommonNodes as Common, DagModule } from '../core.js'
import { Calc, CompassEquations as Compass } from '../core.js'
import { SurfaceFireEquations as SurfaceFire } from '../core.js'
import { SurfaceFireEquations as Fire } from '../core.js'

/**
 * Required minimum inputs for fire perimeter point locations
 * - this.lwr
 * - this.head.ros
 * - this.head.fromUpslope - the fire heading direction from north
 * - this.upslope - the upslope direction from north
 * - this.t - elapsed time since ignition
 * - this.ignpt.x
 * - this.ignpt.y
 * 
 * Additional inputs for fire behavior
 * - this.head.flame or this.head.fli
 * - this.midflame
 * - this.air.temp
 */
export class FireEllipseModule extends DagModule {
    constructor(parentMod, parentProp, configs) {
        super(parentMod, parentProp)

        // Inputs (or bound to input mods)
        this.lwr = Common.lwr(this)
        this.t = Common.t(this)
        this.upslope = Common.fromNorth(this)

        this.ignpt = new DagModule(this, 'ignpt')
        this.ignpt.x = Common.x(this.ignpt)
        this.ignpt.y = Common.y(this.ignpt)

        // Calculated
        this.center = new DagModule(this, 'center')
        this.center.x = Common.x(this)
        this.center.y = Common.y(this)

        // Required as input to scorch height
        this.midflame = Common.midflame(this)
        this.airTemp = Common.airTemp(this)

        // Fire ellipse has the following 6 perimeter points
        for(let sub of ['back', 'beta', 'head', 'left', 'psi', 'right']) {
            const mod = this[sub] = new DagModule(this, sub)
            mod.dist = Common.fireDist(mod) // distance from or ignition pt if 'beta')
            mod.dx = Common.dx(mod)
            mod.dy = Common.dy(mod)
            mod.flame = Common.flame(mod)
            mod.fli = Common.fli(mod)
            mod.fromHead = Common.fromHead(mod) // fixed for head, back, left, right; input for beta, psi
            mod.fromNorth = Common.fromNorth(mod)
            mod.fromUpslope = Common.fromUpslope(mod)
            mod.ros = Common.ros(mod)
            mod.scorch = Common.scorch(mod)
            mod.x = Common.x(mod)
            mod.y = Common.y(mod)
        }
    }

    config() {
        this.ros.input()
        this.lwr.input()
        this.flame.input()
        this.dir.input()
        this.fli.use(SurfaceFire.firelineIntensityFromFlameLength, [this.flame])
        this.scorch.use(Fire.scorchHeight, [this.fli, this.midflame, air.temp])
        
        
        return this
    }
}