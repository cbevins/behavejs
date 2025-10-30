import { Units as U } from './Units.js'
import { DagModule, DagNode } from './DagItems.js'
import { CommonNodes as Common } from './CommonNodes.js'
import { CompassEquations as Compass } from '../index.js'
import { WindEquations as Wind } from '../index.js'

export class WeatherModule extends DagModule {
    /**
     * @param {DagModule} parentMod Reference to this DagItem's parent DagModule
     * @param {string} parentProp Parent's property name for this DagItem  ('slope')
     * @param {Config} configs Module containing all current configuration objects
     * @param {TerrainModule} terrainMod Supplies aspect to determine wind dir from upslope
     */
    constructor(parentMod, parentProp, configs, terrainMod) {
        super(parentMod, parentProp)
        this._meta.configs = configs
        this._meta.modules = {terrainMod}

        const air = this.air = new DagModule(this, 'air')
        air.temp = new DagNode(air, 'temp', U.temperature, 'temperature')
        air.rh = new DagNode(air, 'rh', U.fraction, 'relative humidity')

        this.ppt = new DagModule(this, 'ppt', 'precipitation')

        const wind = this.wind = new DagModule(this, 'wind')

        wind.dir = new DagModule(this, 'dir')
        wind.dir.origin = new DagModule(wind.dir, 'origin')
        wind.dir.origin.fromNorth = Common.fromNorth(wind.dir.origin, 'fromNorth', U.compass)
        wind.dir.origin.fromUpslope = new DagNode(wind.dir.origin, 'fromUpslope', U.compass)
        wind.dir.heading = new DagModule(wind.dir, 'heading')
        wind.dir.heading.fromNorth = new DagNode(wind.dir.heading, 'fromNorth', U.compass)
        wind.dir.heading.fromUpslope = new DagNode(wind.dir.heading, 'fromUpslope', U.compass)

        wind.speed = new DagModule(this, 'speed')
        wind.speed.at10m = new DagNode(wind.speed, 'at10m', U.windSpeed)
        wind.speed.at20ft = new DagNode(wind.speed, 'at20ft', U.windSpeed)
    }

    config() {
        const {windDirection:configDir, windSpeed: configSpeed} = this._meta.configs
        const {terrainMod} = this._meta.modules
        const upslopeNode = terrainMod.upslope

        const {air, ppt, wind} = this
        const {dir, speed} = wind
        const {origin, heading} = dir

        air.temp.input()
        air.rh.input()

        // No config required for this node
        dir.origin.fromUpslope.use(Compass.compassOpposite, [dir.heading.fromUpslope])

        if (configDir.value === configDir.headingWrtUp) {
            dir.heading.fromUpslope.input(configDir)
            dir.origin.fromNorth.use(Compass.compassOpposite, [dir.heading.fromNorth], configDir)
            dir.heading.fromNorth.use(Compass.compassSum, [dir.heading.fromUpslope, upslopeNode], configDir)
        } else if (configDir.value === configDir.originWrtNo) {
            dir.heading.fromUpslope.use(Compass.compassDiff, [dir.heading.fromNorth, upslopeNode], configDir)
            dir.origin.fromNorth.input(configDir)
            dir.heading.fromNorth.use(Compass.compassOpposite, [dir.origin.fromNorth], configDir)
        } else if (configDir.value === configDir.upslope) {
            dir.heading.fromUpslope.constant(0)
            dir.origin.fromNorth.use(Compass.compassOpposite, [upslopeNode], configDir)
            dir.heading.fromNorth.bind(upslopeNode)
        } else throw new Error(`Unknown config "${configDir.key}" value "${configDir.value}"`)

        if (configSpeed.value === configSpeed.at20ft) {
            speed.at20ft.input(configSpeed)
            speed.at10m.use(Wind.windSpeedAt20ftFrom10m, [speed.at20ft], configSpeed)
        } else if (configSpeed.value === configSpeed.at10m) {
            speed.at10m.input(configSpeed)
            speed.at20ft.use(Wind.windSpeedAt10mFrom20ft, [speed.at10m], configSpeed)
        } else throw new Error(`Unknown config "${configSpeed.key}" value "${configSpeed.value}"`)
        return this
    }
}
