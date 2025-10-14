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
export function defineWindModule(parentMod, parentProp) {
    const mod = new DagModule(parentMod, parentProp)
    mod.dir = new DagModule(mod, 'dir')
    mod.dir.origin = new DagModule(mod.dir, 'origin')
    mod.dir.origin.wrtNo = new DagNode(mod.dir.origin, 'wrtNo', U.compass)
    mod.dir.origin.wrtUp = new DagNode(mod.dir.origin, 'wrtUp', U.compass)
    mod.dir.heading = new DagModule(mod.dir, 'heading')
    mod.dir.heading.wrtNo = new DagNode(mod.dir.heading, 'wrtNo', U.compass)
    mod.dir.heading.wrtUp = new DagNode(mod.dir.heading, 'wrtUp', U.compass)
    mod.speed = new DagModule(mod, 'speed')
    mod.speed.at10m = new DagNode(mod.speed, 'at10m', U.windSpeed)
    mod.speed.at20ft = new DagNode(mod.speed, 'at20ft', U.windSpeed)
    return mod
}

export function configWindModule(mod, slopeMod, configDir, configSpeed) {
    const {dir, speed} = mod
    const {origin, heading} = dir
    // No config required for this node
    dir.origin.wrtUp.use(Compass.compassOpposite, [dir.heading.wrtUp])

    if (configDir.value === configDir.headingWrtUp) {
        dir.heading.wrtUp.input(configDir)
        dir.origin.wrtNo.use(Compass.compassOpposite, [dir.heading.wrtNo], configDir)
        dir.heading.wrtNo.use(Compass.compassSum, [dir.heading.wrtUp, slopeMod.dir.upslope], configDir)
    } else if (configDir.value === configDir.originWrtNo) {
        dir.heading.wrtUp.use(Compass.compassDiff, [dir.heading.wrtNo, slopeMod.dir.upslope], configDir)
        dir.origin.wrtNo.input(configDir)
        dir.heading.wrtNo.use(Compass.compassOpposite, [dir.origin.wrtNo], configDir)
    } else if (configDir.value === configDir.upslope) {
        dir.heading.wrtUp.constant(0)
        dir.origin.wrtNo.use(Compass.compassOpposite, [slopeMod.dir.upslope], configDir)
        dir.heading.wrtNo.bind(slopeMod.dir.upslope)
    } else throw new Error(`Unknown config "${configDir.key}" value "${configDir.value}"`)

    if (configSpeed.value === configSpeed.at20ft) {
        speed.at20ft.input(configSpeed)
        speed.at10m.use(Wind.windSpeedAt20ftFrom10m, [speed.at20ft], configSpeed)
    } else if (configSpeed.value === configSpeed.at10m) {
        speed.at10m.input(configSpeed)
        speed.at20ft.use(Wind.windSpeedAt10mFrom20ft, [speed.at10m], configSpeed)
    } else throw new Error(`Unknown config "${configSpeed.key}" value "${configSpeed.value}"`)
}
