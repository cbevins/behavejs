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
export class WindModule extends DagModule {
    constructor(parentMod, parentProp, slopeMod, configDir, configSpeed) {
        super(parentMod, parentProp)
        this._meta.config = {configDir, configSpeed}
        this._meta.mod = {slopeMod}

        this.dir = new DagModule(this, 'dir')
        
        this.dir.origin = new DagModule(this.dir, 'origin')
        this.dir.origin.wrtNo = new DagNode(this.dir.origin, 'wrtNo', U.compass)
        this.dir.origin.wrtUp = new DagNode(this.dir.origin, 'wrtUp', U.compass)

        this.dir.heading = new DagModule(this.dir, 'heading')
        this.dir.heading.wrtNo = new DagNode(this.dir.heading, 'wrtNo', U.compass)
        this.dir.heading.wrtUp = new DagNode(this.dir.heading, 'wrtUp', U.compass)

        this.speed = new DagModule(this, 'speed')
        this.speed.at10m = new DagNode(this.speed, 'at10m', U.windSpeed)
        this.speed.at20ft = new DagNode(this.speed, 'at20ft', U.windSpeed)
    }

    config() {
        const {configDir, configSpeed} = this._meta.config
        const {slopeMod} = this._meta.mod
        const upslopeNode = slopeMod.dir.upslope
        const {dir, speed} = this
        const {origin, heading} = dir

        // No config required for this node
        dir.origin.wrtUp.use(Compass.compassOpposite, [dir.heading.wrtUp])

        if (configDir.value === configDir.headingWrtUp) {
            dir.heading.wrtUp.input(configDir)
            dir.origin.wrtNo.use(Compass.compassOpposite, [dir.heading.wrtNo], configDir)
            dir.heading.wrtNo.use(Compass.compassSum, [dir.heading.wrtUp, upslopeNode], configDir)
        } else if (configDir.value === configDir.originWrtNo) {
            dir.heading.wrtUp.use(Compass.compassDiff, [dir.heading.wrtNo, upslopeNode], configDir)
            dir.origin.wrtNo.input(configDir)
            dir.heading.wrtNo.use(Compass.compassOpposite, [dir.origin.wrtNo], configDir)
        } else if (configDir.value === configDir.upslope) {
            dir.heading.wrtUp.constant(0)
            dir.origin.wrtNo.use(Compass.compassOpposite, [upslopeNode], configDir)
            dir.heading.wrtNo.bind(upslopeNode)
        } else throw new Error(`Unknown config "${configDir.key}" value "${configDir.value}"`)

        if (configSpeed.value === configSpeed.at20ft) {
            speed.at20ft.input(configSpeed)
            speed.at10m.use(Wind.windSpeedAt20ftFrom10m, [speed.at20ft], configSpeed)
        } else if (configSpeed.value === configSpeed.at10m) {
            speed.at10m.input(configSpeed)
            speed.at20ft.use(Wind.windSpeedAt10mFrom20ft, [speed.at10m], configSpeed)
        } else throw new Error(`Unknown config "${configSpeed.key}" value "${configSpeed.value}"`)
    }
}
