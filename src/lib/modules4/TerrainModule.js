import { CommonNodes as Common, DagModule } from '../core.js'
import { CompassEquations as Compass } from '../index.js'

export class TerrainModule extends DagModule {
    /**
     * @param {DagModule} parentMod Reference to this DagItem's parent DagModule
     * @param {string} parentProp Parent's property name for this DagItem  ('slope')
     * @param {Config} configs Module containing all current configuration objects
     */
    constructor(parentMod, parentProp, configs) {
        super(parentMod, parentProp)
        this._meta.configs = configs

        this.aspect = Common.aspect(this)
        this.elevation = Common.elevation(this)
        this.upslope = Common.upslope(this)

        this.slope = new DagModule(this, 'slope')
        this.slope.degrees = Common.slopeDegrees(this.slope)
        this.slope.ratio = Common.slopeRatio(this.slope)
    }

    config() {
        const {terrainAspect:configAspect, terrainSlope:configSlope} = this._meta.configs

        this.elevation.input()

        if (configAspect.value === configAspect.upslope) {
            this.upslope.input(configAspect)
            this.aspect.use(Compass.compassOpposite, [this.upslope], configAspect)
        } else if (configAspect.value === configAspect.aspect) {
            this.aspect.input(configAspect)
            this.upslope.use(Compass.compassOpposite, [this.aspect], configAspect)
        } else throw new Error(`Unknown config "${configAspect.key}" value "${configAspect.value}"`)

        if (configSlope.value === configSlope.ratio) {
            this.slope.ratio.input(configSlope)
            this.slope.degrees.use(Compass.compassSlopeDegrees, [this.slope.ratio], configSlope)
        } else if (configSlope.value === configSlope.degrees) {
            this.slope.ratio.use(Compass.compassSlopeRatio, [this.slope.degrees], configSlope)
            this.slope.degrees.input(configSlope)
        } else throw new Error(`Unknown config "${configSlope.key}" value "${configSlope.value}"`)
        return this
    }
}
