import { Dag } from './Dag.js'
import { Units as U } from './Units.js'
import { DagModule, DagNode } from './DagItems.js'
import { Calc, CompassEquations as Compass } from '../index.js'

export class MapModule extends DagModule {
    constructor(parentMod, parentProp) {
        super(parentMod, parentProp)
        this.contours = new DagNode(this, 'contours', U.integer)
        this.factor   = new DagNode(this, 'factor', U.factor)
        this.interval = new DagNode(this, 'interval', U.fireDist)
        this.mapDist  = new DagNode(this, 'mapDist', U.mapDist)
        this.reach    = new DagNode(this, 'reach', U.fireDist)
        this.rise     = new DagNode(this, 'rise', U.fireDist,)
        this.scale    = new DagNode(this, 'scale', U.mapScale)
        this.slope    = new DagModule(this, 'slope')
        this.slope.ratio    = new DagNode(this.slope, 'ratio', U.ratio)
        this.slope.degrees  = new DagNode(this.degrees, 'degrees', U.degrees,)
    }
    config() {
        this.scale.input()
        this.mapDist.input()
        this.contours.input()
        this.interval.input()

        this.factor.use(Calc.inverse, [this.scale])
        this.reach.use(Calc.multiply, [this.scale, this.mapDist])
        this.rise.use(Calc.multiply, [this.interval, this.contours])
        this.slope.ratio.use(Compass.compassSlopeRatioMap, [
            this.scale, this.interval, this.contours, this.mapDist])
        this.slope.degrees.use(Compass.compassSlopeDegreesMap, [
            this.scale, this.interval, this.contours, this.mapDist])
    }
}