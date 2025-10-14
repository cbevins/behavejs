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
export function defineSlopeModule(parentMod, parentProp) {
    const mod = new DagModule(parentMod, parentProp)
    mod.dir = new DagModule(mod, 'dir')
    mod.dir.upslope = new DagNode(mod.dir, 'upslope', U.compass)
    mod.dir.downslope = new DagNode(mod.dir, 'downslope', U.compass)
    mod.steep = new DagModule(mod, 'speed')
    mod.steep.degrees = new DagNode(mod.steep, 'degrees', U.compass)
    mod.steep.ratio = new DagNode(mod.steep, 'ratio', U.ratio)
    return mod
}

export function configSlopeModule(mod, configDir, configSteep) {
    const {dir, steep} = mod

    if (configDir.value === configDir.upslope) {
        dir.upslope.input(configDir)
        dir.downslope.use(Compass.compassOpposite, [dir.upslope], configDir)
    } else if (configDir.value === configDir.downslope) {
        dir.downslope.input(configDir)
        dir.upslope.use(Compass.compassOpposite, [dir.downslope], configDir)
    } else throw new Error(`Unknown config "${configDir.key}" value "${configDir.value}"`)

    if (configSteep.value === configSteep.ratio) {
        steep.ratio.input(configSteep)
        steep.degrees.use(Compass.compassSlopeDegrees, [steep.ratio], configSteep)
    } else if (configSteep.value === configSteep.degrees) {
        steep.ratio.use(Compass.compassSlopeRatio, [steep.degrees], configSteep)
        steep.degrees.input(configSteep)
    } else throw new Error(`Unknown config "${configSteep.key}" value "${configSteep.value}"`)
}
