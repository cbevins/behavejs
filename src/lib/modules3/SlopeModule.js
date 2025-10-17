import { Units as U } from './Units.js'
import { DagModule, DagNode } from './DagItems.js'
import { WindEquations as Wind } from '../index.js'
import { CompassEquations as Compass } from '../index.js'

/**
 * Builds and configures a WindModule
 * @param {DagModule} parentMod Reference to this DagItem's parent DagModule
 * @param {string} parentProp Parent's property name for this DagItem
 * @returns Reference to the new DagModule 
 */
export class SlopeModule extends DagModule {
    constructor(parentMod, parentProp, configDir, configSteep) {
        super(parentMod, parentProp)
        this._meta.config = {configDir, configSteep}
        this._meta.mod = {}

        this.dir = new DagModule(this, 'dir')
        this.dir.upslope = new DagNode(this.dir, 'upslope', U.compass)
        this.dir.aspect = new DagNode(this.dir, 'aspect', U.compass)

        this.steep = new DagModule(this, 'speed')
        this.steep.degrees = new DagNode(this.steep, 'degrees', U.compass)
        this.steep.ratio = new DagNode(this.steep, 'ratio', U.ratio)
    }

    config() {
        const {configDir, configSteep} = this._meta.config
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
    }
}
