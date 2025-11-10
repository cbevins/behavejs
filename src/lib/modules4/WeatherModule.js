import { CommonNodes as Common, DagModule } from '../core.js'
import { CompassEquations as Compass } from '../core.js'
import { WindEquations as Wind } from '../core.js'

export class WeatherModule extends DagModule {
    /**
     * @param {DagModule} parentMod Reference to this DagItem's parent DagModule
     * @param {string} parentProp Parent's property name for this DagItem  ('slope')
     * @param {Config} configs Module containing all current configuration objects
     * @param {TerrainModule} terrainMod Reference to a module with the following properties:
     *  - .slope, used to determine wind direction from upslope
     */
    constructor(parentMod, parentProp, configs, terrainMod) {
        super(parentMod, parentProp)
        this._meta.configs = configs
        this._meta.modules = {terrainMod}

        const air = this.air = new DagModule(this, 'air')
        air.temp = Common.temp(air)
        air.rh = Common.rh(air)

        this.ppt = new DagModule(this, 'ppt', 'precipitation')

        const wind = this.wind = new DagModule(this, 'wind')

        wind.dir = new DagModule(this, 'dir')
        wind.dir.origin = new DagModule(wind.dir, 'origin')
        wind.dir.origin.fromNorth = Common.fromNorth(wind.dir.origin)
        wind.dir.origin.fromUpslope = Common.fromUpslope(wind.dir.origin)
        wind.dir.heading = new DagModule(wind.dir, 'heading')
        wind.dir.heading.fromNorth = Common.fromNorth(wind.dir.heading)
        wind.dir.heading.fromUpslope = Common.fromUpslope(wind.dir.heading)

        wind.speed = new DagModule(this, 'speed')
        wind.speed.at10m = Common.at10m(wind.speed)
        wind.speed.at20ft = Common.at20ft(wind.speed)
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
