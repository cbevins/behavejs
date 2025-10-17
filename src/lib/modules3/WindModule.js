import { Units as U } from './Units.js'
import { DagModule, DagNode } from './DagItems.js'
import { WindEquations as Wind } from '../index.js'
import { CompassEquations as Compass } from '../index.js'

export class WindModule extends DagModule {
    /**
     * 
     * @param {DagModule} parentMod Reference to this DagItem's parent DagModule
     * @param {string} parentProp Parent's property name for this DagItem
     * @param {SlopeModule} slopeMod Reference to a SlopeModule
     */
    constructor(parentMod, parentProp, slopeMod, configDir, configSpeed) {
        super(parentMod, parentProp)
        this._meta.config = {configDir, configSpeed}
        this._meta.mod = {slopeMod}

        this.dir = new DagModule(this, 'dir')
        
        this.dir.origin = new DagModule(this.dir, 'origin')
        this.dir.origin.fromNortth = new DagNode(this.dir.origin, 'fromNortth', U.compass)
        this.dir.origin.fromUpslope = new DagNode(this.dir.origin, 'fromUpslope', U.compass)

        this.dir.heading = new DagModule(this.dir, 'heading')
        this.dir.heading.fromNortth = new DagNode(this.dir.heading, 'fromNortth', U.compass)
        this.dir.heading.fromUpslope = new DagNode(this.dir.heading, 'fromUpslope', U.compass)

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
        dir.origin.fromUpslope.use(Compass.compassOpposite, [dir.heading.fromUpslope])

        if (configDir.value === configDir.headingWrtUp) {
            dir.heading.fromUpslope.input(configDir)
            dir.origin.fromNortth.use(Compass.compassOpposite, [dir.heading.fromNortth], configDir)
            dir.heading.fromNortth.use(Compass.compassSum, [dir.heading.fromUpslope, upslopeNode], configDir)
        } else if (configDir.value === configDir.originWrtNo) {
            dir.heading.fromUpslope.use(Compass.compassDiff, [dir.heading.fromNortth, upslopeNode], configDir)
            dir.origin.fromNortth.input(configDir)
            dir.heading.fromNortth.use(Compass.compassOpposite, [dir.origin.fromNortth], configDir)
        } else if (configDir.value === configDir.upslope) {
            dir.heading.fromUpslope.constant(0)
            dir.origin.fromNortth.use(Compass.compassOpposite, [upslopeNode], configDir)
            dir.heading.fromNortth.bind(upslopeNode)
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
