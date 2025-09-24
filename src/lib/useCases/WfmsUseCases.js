import { Paths as P } from '../index.js'
import { Wfms } from '../index.js'

// High level WFMS convenience base class whose derived classes provide:
// 1 - a WFMS with preset selected nodes, configuration, and input values;
// 2 - access to commonly used node references; and
// 3 - chaining to lower lever Wfms and Dag methods
export class WfmsUseCases {
    constructor(name='WFMS Standard Configuration')
    {
        this.name = name
        this.wfms = new Wfms()
        this.dag  = this.wfms.dag
        this._assignCommonNodeReferences()
        this.wfms.setConfig(this.fireMapConfig())
    }

    //--------------------------------------------------------------------------
    // Public methods
    //--------------------------------------------------------------------------

    // Convenience accessor methods
    activeConfigs() { return this.dag.activeConfigs() }
    activeConfigsByKey() { return this.dag.activeConfigsByKey() }
    activeInputs() { return this.dag.activeInputs() }
    activeInputsByKey() { return this.dag.activeInputsByKey() }
    activeNodes() { return this.dag.activeNodes() }
    activeNodesByKey() { return this.dag.activeNodesByKey() }
    configs() { return this.wfms.configs() }
    allInputs() { return this.dag.allInputs() }
    allInputsByKey() { return this.dag.allInputsByKey() }
    leafNodes() { return this.dag.leafNodes() }
    leafNodesByKey() { return this.dag.leafNodesByKey() }
    nodes() { return this.dag.nodes() }
    nodesByKey() { return this.dag.nodesByKey() }
    nodeRef(refOrKey, caller='unknown') {  return this.dag.nodeRef(refOrKey, caller) }
    selected() { return this.dag.selected() }
    selectedByKey() { return this.dag.selectedByKey() }

    // Convenience operations methods
    configure() { return this.dag.configure() }
    get(node) { return this.dag.get(node) }
    select(whatever) { return this.dag.select(whatever) }
    set(refOrKey, value, inputsOnly=true, unequalOnly=true) {
        return this.dag.set(refOrKey, value, inputsOnly, unequalOnly) }
    setConfig(items) { return this.wfms.setConfig(items) }
    updateAll() { return this.dag.updateAll }

    //--------------------------------------------------------------------------
    // Private methods
    //--------------------------------------------------------------------------
    
    _assignCommonNodeReferences() {
        const dag = this.dag
        // SurfaceFuelBed
        this.cured = dag.nodeRef('weather/curing/fraction/applied')

        // Common inputs nodes
        this.canopy = {
            cover: dag.nodeRef('canopy/coverage'),
            base: dag.nodeRef('canopy/crown/base height'),
            total: dag.nodeRef('canopy/crown/total height')
        }
        this.mois = {
            tl1: dag.nodeRef('weather/moisture/dead/1-h'),
            tl10: dag.nodeRef('weather/moisture/dead/10-h'),
            tl100: dag.nodeRef('weather/moisture/dead/100-h'),
            herb: dag.nodeRef('weather/moisture/live/herb'),
            stem: dag.nodeRef('weather/moisture/live/stem'),
        }
        this.primary = {
            cover: dag.nodeRef('weighted/fire/cover/primary'),
            fuel: dag.nodeRef('primary/model/standard/key'),
            midflame: dag.nodeRef('primary/wind/speed/midflame'),
        }
        this.secondary = {
            fuel: dag.nodeRef('secondary/model/standard/key'),
            midflame: dag.nodeRef('secondary/wind/speed/midflame'),
        }
        this.slope = {
            aspect: dag.nodeRef('terrain/slope/direction/down-slope/degrees/from north'),
            upslope: dag.nodeRef('terrain/slope/direction/up-slope/degrees/from north'),
            ratio: dag.nodeRef('terrain/slope/steepness/ratio/rise-to-reach'),
            degrees: dag.nodeRef('terrain/slope/steepness/degrees/from horizontal'),
        },
        this.wind = {
            source: dag.nodeRef('weather/wind/direction/source/degrees/from north'),
            heading: dag.nodeRef('weather/wind/direction/heading/degrees/from up-slope'),
            at20ft: dag.nodeRef('weather/wind/speed/at 20-ft'),
            at10m: dag.nodeRef('weather/wind/speed/at 10-m')
        }
    }

    // The 'fire map' configuration is meant to implement a common use case of
    // predicting fire behavior from map and weather data streams such as
    // LANDFIRE fuel and site parameters and WIMS/NOAA moisture/weather parameters.
    // Therefore, the configuration specifies
    // - a single surface standard fuel model identified by key,
    // - all 5 moisture contents as input parameters
    // - live moisture curing is derived from herb fuel moisture
    // - wind speed at 2-ft and direction is source from north
    // - slope direction is the aspect and steepness is ratio
    // - wind speed reduction factor and midflame wind speed are derived from 20-ft wind
    // - canopy inputs are total height and base height

    fireMapConfig() {
        return [
            [P.cfgSurfWtg,      ['primary', 'harmonic', 'arithmetic'][0]],
            [P.cfgCanopy,       ["height-base","ratio-height","height-length",
                                "ratio-base","ratio-length","length-base"][0]],
            [P.cfgEffWind,      ["applied","not applied"][0]],
            [P.cfgEllipse,      ["surface", "observed"][0]],
            [P.cfgVectors,      ["fire head", "up-slope", "north"][0]],
            [P.cfgCured,        ["input","estimated"][1]],
            [P.cfgWsrf,         ["input","estimated"][1]],
            [P.cfgMidflame,     ["input","estimated"][1]],
            [P.cfgMoisDead,     ["particle","category"][0]],
            [P.cfgMoisLive,     ["particle","category"][0]],
            [P.cfgStdInput1,    ["catalog","custom"][0]],
            [P.cfgStdInput2,    ["catalog","custom"][0]],
            [P.cfgFuelDomain1,  ["standard","chaparral","palmetto","aspen"][0]],
            [P.cfgFuelDomain2,  ["standard","chaparral","palmetto","aspen"][0]],
            [P.cfgSlopeDir,     ["up-slope","down-slope"][1]],
            [P.cfgSlopeSteep,   ["ratio","degrees","map"][0]],
            [P.cfgWindSpeed,    ["at 20-ft","at 10-m"][0]],
            [P.cfgWindDir,      ["source from north","heading from up-slope","up-slope"][0]],
        ]
    }
    
    // For reference, here are t input values used for version 1 unit testing
    _testInputs () {
        this.oldInputsFm010Fm124 = [
            ['site.fire.time.sinceIgnition', [60]],
            ['site.fire.vector.fromNorth', [45]],
            ['site.map.scale', [24000]],
            ['site.moisture.dead.tl1h', [0.05]],
            ['site.moisture.dead.tl10h', [0.07]],
            ['site.moisture.dead.tl100h', [0.09]],
            ['site.moisture.dead.category', [0.05]],
            ['site.moisture.live.herb', [0.5]],
            ['site.moisture.live.stem', [1.5]],
            ['site.moisture.live.category', [1.5]],
            ['site.slope.direction.aspect', [180]],
            ['site.slope.steepness.ratio', [0.25]],
            ['site.temperature.air', [95]],
            ['site.terrain.spotSourceLocation', ['ridgeTop']],
            ['site.terrain.ridgeValleyDistance', [5000]],
            ['site.terrain.ridgeValleyElevation', [1000]],
            ['site.wind.direction.source.fromNorth', [270]],
            ['site.windSpeedAdjustmentFactor', [0.5]],
            ['site.wind.speed.atMidflame', [880]],
            ['surface.primary.fuel.model.catalogKey', ['10']],
            ['surface.secondary.fuel.model.catalogKey', ['124']],
            ['surface.weighted.fire.primaryCover', [0.6]]
        ]
    }
}
