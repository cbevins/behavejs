import { Units as U } from './Units.js'
import { DagModule, DagNode } from './DagItems.js'
import { Calc, CompassEquations as Compass } from '../index.js'

export class FireVectorModule extends DagModule {
    /**
     * .beg - .time, .x, .y
     * .degrees - .fromNorth (.fromUpslope, .fromFireHead)
     * .distance
     * .end - .time, .x, .y
     * .time
     * .velocity
     * @param {DagModule} parentMod
     * @param {string} parentProp Usually 'ellipse'
     */
    constructor(parentMod, parentProp) {
        super(parentMod, parentProp)

        for(let mod of ['degrees', 'beg', 'end'])
            this[mod] = new DagModule(this, 'mod')

        this.degrees.fromNorth = new DagNode(this.degrees, 'fromNorth', U.compass)
        this.distance = new DagNode(this, 'distance', U.distance)
        this.dt = new DagNode(this, 'dt', U.time, 'elapsed time')
        this.dx = new DagNode(this, 'dx', U.distance)
        this.dy = new DagNode(this, 'dy', U.distance)
        this.velocity = new DagNode(this, 'velocity', U.velocity)

        for(let mod of [this.beg, this.end]) {
            mod.t = new DagNode(mod, 't', U.time)
            mod.x = new DagNode(mod, 'x', U.geocoord)
            mod.y = new DagNode(mod, 'y', U.geocoord)
        }
    }
    
    config(cfg) {
        const {beg, degrees, distance, dt, dx, dy, end, velocity} = this
        // Default input nodes (may be overridden by config)
        for(let node of [beg.x, beg.y, degrees, dt, distance, velocity])
            node.input

        if (cfg === 'inputVelocityTime') {
            distance.use(Calc.multiply, [velocity, dt])
        } else if (cfg === 'inputDistanceTime') {
            velocity.use(Calc.divide, [distance, dt])
        } else if (cfg === 'inputDistanceVelocity') {
            dt.use(Calc.divide, [distance, velocity])
        }
        dx.use(Calc.dx, [degrees, distance])
        dy.use(Calc.dy, [degrees, distance])
        end.t.use(Calc.sum, [beg.t, dt])
        end.x.use(Calc.sum, [beg.x, dx])
        end.y.use(Calc.sum, [beg.y, dy])
    }
}