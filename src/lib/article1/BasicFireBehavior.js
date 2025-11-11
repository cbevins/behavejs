import { CommonNodes as Common, DagModule } from '..core.js'
import { Calc, CompassEquations as Compass } from '../core.js'
import { SurfaceFireEquations as SurfaceFire } from '../core.js'
import { SurfaceFireEquations as Fire } from '../core.js'

export class BasicFireBehaviorModule extends DagModule {
    constructor(parentMod, parentProp, configs) {
        super(parentMod, parentProp)
        this.ros = Common.ros(this)
        this.dir = new DagModule(sub, 'dir')
        this.dir.fromNorth = Common.fromNorth(this)
        this.flame = Common.flame(this)
        this.lwr = Common.lwr(this)

        this.ign = DagModule(this, 'ign')
        this.ign.x = Common.x(this)
        this.ign.y = Common.y(this)

        this.point = DagModule(this, 'point')
        this.point.t = Common.t(this.point)
        this.point.angle = Common.fromHead(this.point)
        
        this.point.dx = Common.dx(this.point)
        this.point.dy = Common.dy(this.point)
        this.point.x = Common.x(this.point)
        this.point.y = Common.y(this.point)
        this.point.dist = Common.fireDist(this.point) // distance from center or ignition pt
        
        // Calculated from above
        this.fli = Common.fli(this)
        this.scorch = Common.scorch(this)

        // Required for scorch height
        this.midflame = Common.midflame(this)
        this.airTemp = Common.airTemp(this)
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