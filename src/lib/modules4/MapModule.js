import { CommonNodes as Common, DagModule } from '../core.js'
import { Calc, CompassEquations as Compass } from '../core.js'

export class MapModule extends DagModule {
    constructor(parentMod, parentProp) {
        super(parentMod, parentProp)
        this.contours = Common.mapContours(this)
        this.factor   = Common.mapFactor(this)
        this.interval = Common.mapInterval(this)
        this.mapDist  = Common.mapDist(this)
        this.reach    = Common.mapReach(this)
        this.rise     = Common.mapRise(this)
        this.scale    = Common.mapScale(this)
        this.slope    = new DagModule(this, 'slope')
        this.slope.ratio   = Common.slopeRatio(this.slope)
        this.slope.degrees = Common.slopeDegrees(this.degrees)
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