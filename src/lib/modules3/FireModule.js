import { Dag } from './Dag.js'
import { Units as U } from './Units.js'
import { DagModule, DagNode } from './DagItems.js'
import { FuelElementEquations as Fuel } from '../index.js'
import { Calc, CompassEquations as Compass } from '../index.js'
import { FuelBedEquations as Bed } from '../index.js'
import { SurfaceFireEquations as Fire } from '../index.js'

export class FireModule extends DagModule {
    /**
     * Generic FireModule
     * @param {DagModule} parentMod 
     * @param {string} parentProp 'fire'
     */
    constructor(parentMod, parentProp) {
        super(parentMod, parentProp)
        
        // Direction of maximum spread
        this.dir = new DagModule(this, 'dir')
        this.dir.fromUpslope = new DagNode(this.dir, 'fromUpslope', U.compass)
        this.dir.fromNorth = new DagNode(this.dir, 'fromNorth', U.compass)
        
        this.ros = new DagNode(this, 'ros', U.fireRos)
        this.flame = new DagNode(this, 'flame', U.fireFlame)
        this.fli = new DagNode(this, 'fli', U.fireFli)
        this.hpua = new DagNode(this, 'hpua', U.fireHpua)
        this.lwr = new DagNode(this, 'lwr', U.ratio)
        this.rxi = new DagNode(this, 'rxi', U.fireRxi)
        this.taur = new DagNode(this, 'taur', U.fireTaur)

        this.wind = new DagModule(this, 'wind')
        this.wind.effective = new DagModule(this.wind, 'effective')
        this.wind.effective.phi = new DagNode(this.wind.effective, 'phi', U.factor)
        this.wind.effective.speed = new DagNode(this.wind.effective, 'speed', U.windSpeed)
        this.wind.effective.limit = new DagNode(this.wind.effective, 'limit', U.windSpeed)
        this.wind.effective.exceeded = new DagNode(this.wind.effective, 'exceeded', U.bool)
        this.wind.midflame = new DagModule(this.wind, 'midflame')
        this.wind.midflame.speed = new DagNode(this.wind.midflame, 'speed', U.windSpeed)
        this.wind.midflame.factor = new DagNode(this.wind.midflame, 'factor', U.windSpeed)

        // Ignition time and point
        this.ignition = new DagModule(this, 'ignition')
        this.ignition.time = new DagModule(this.ignition, 'time')
        this.ignition.time.elapsed = new DagNode(this.ignition.time, 'elapsed', U.fireTime)
        this.ignition.point = new DagModule(this.ignition, 'point')
        this.ignition.point.x = new DagNode(this.ignition.point, 'x', U.factor)
        this.ignition.point.y = new DagNode(this.ignition.point, 'y', U.factor)
    }

    config() {
    }
}
