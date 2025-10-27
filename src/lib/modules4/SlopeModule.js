import { Units as U } from './Units.js'
import { DagModule, DagNode } from './DagItems.js'
import { CompassEquations as Compass } from '../index.js'

export class SlopeModule extends DagModule {
    /**
     * @param {DagModule} parentMod Reference to this DagItem's parent DagModule
     * @param {string} parentProp Parent's property name for this DagItem  ('slope')
     * @param {Config} configs Module containing all current configuration objects
     */
    constructor(parentMod, parentProp, configs) {
        super(parentMod, parentProp)
        this._meta.configs = configs

        this.dir = new DagModule(this, 'dir')
        this.dir.upslope = new DagNode(this.dir, 'upslope', U.compass)
        this.dir.aspect = new DagNode(this.dir, 'aspect', U.compass)

        this.steep = new DagModule(this, 'speed')
        this.steep.degrees = new DagNode(this.steep, 'degrees', U.compass)
        this.steep.ratio = new DagNode(this.steep, 'ratio', U.ratio)
    }

    config() {
        const {slopeDirection:configDir, slopeSteepness:configSteep} = this._meta.configs
        const {dir, steep} = this

        if (configDir.value === configDir.upslope) {
            dir.upslope.input(configDir)
            dir.aspect.use(Compass.compassOpposite, [dir.upslope], configDir)
        } else if (configDir.value === configDir.aspect) {
            dir.aspect.input(configDir)
            dir.upslope.use(Compass.compassOpposite, [dir.aspect], configDir)
        } else throw new Error(`Unknown config "${configDir.key}" value "${configDir.value}"`)

        if (configSteep.value === configSteep.ratio) {
            steep.ratio.input(configSteep)
            steep.degrees.use(Compass.compassSlopeDegrees, [steep.ratio], configSteep)
        } else if (configSteep.value === configSteep.degrees) {
            steep.ratio.use(Compass.compassSlopeRatio, [steep.degrees], configSteep)
            steep.degrees.input(configSteep)
        } else throw new Error(`Unknown config "${configSteep.key}" value "${configSteep.value}"`)
        return this
    }
}
