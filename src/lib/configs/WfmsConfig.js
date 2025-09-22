import { Paths as P } from '../index.js'
import { Wfms } from '../index.js'

// High level WFMS convenience base class whose derived classes provide:
// 1 - a WFMS with preset selected nodes, configuration, and input values;
// 2 - access to commonly used node references; and
// 3 - chaining to lower lever Wfms and Dag methods
export class WfmsConfig {
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
        this.bulk  = dag.nodeRef('primary/bed/bulk density')
        this.cured = dag.nodeRef('weather/curing/fraction/applied')

        // SurfaceFireModule and SurfaceFireWtgModule
        this.cover2   = dag.nodeRef('surface/fire/cover/secondary')
        this.ros1 = dag.nodeRef('primary/fire/heading/spread rate')
        this.ros2 = dag.nodeRef('secondary/fire/heading/spread rate')
        this.rosH = dag.nodeRef('surface/fire/spread rate/harmonic mean')
        this.rosA = dag.nodeRef('surface/fire/spread rate/arithmetic mean')
        this.rosW = dag.nodeRef('surface/fire/heading/spread rate')
        
        this.dirNo1 = dag.nodeRef('primary/fire/heading/direction/from north')
        this.dirNo2 = dag.nodeRef('secondary/fire/heading/direction/from north')
        this.dirNoW = dag.nodeRef('surface/fire/heading/direction/from north')
        
        this.dirUp1 = dag.nodeRef('primary/fire/heading/direction/from up-slope')
        this.dirUp2 = dag.nodeRef('secondary/fire/heading/direction/from up-slope')
        this.dirUpW = dag.nodeRef('surface/fire/heading/direction/from up-slope')

        this.lwr1 = dag.nodeRef('primary/fire/length-to-width ratio')
        this.lwr2 = dag.nodeRef('secondary/fire/length-to-width ratio')
        this.lwrW = dag.nodeRef('surface/fire/length-to-width ratio')

        this.mid1 = dag.nodeRef('primary/fire/wind/speed/midflame')
        this.mid2 = dag.nodeRef('secondary/fire/wind/speed/midflame')
        this.midW = dag.nodeRef('surface/fire/wind/speed/midflame')

        this.rxi1 = dag.nodeRef('primary/fire/reaction intensity')
        this.rxi2 = dag.nodeRef('secondary/fire/reaction intensity')
        this.rxiW = dag.nodeRef('surface/fire/reaction intensity')

        this.ews1 = dag.nodeRef('primary/fire/effective wind/speed')
        this.ews2 = dag.nodeRef('secondary/fire/effective wind/speed')
        this.ewsW = dag.nodeRef('surface/fire/effective wind/speed')

        this.ewsl1 = dag.nodeRef('primary/fire/effective wind/speed/limit')
        this.ewsl2 = dag.nodeRef('secondary/fire/effective wind/speed/limit')
        this.ewslW = dag.nodeRef('surface/fire/effective wind/speed/limit')

        this.ewsx2 = dag.nodeRef('primary/fire/effective wind/speed/exceeded')
        this.ewsx1 = dag.nodeRef('secondary/fire/effective wind/speed/exceeded')
        this.ewsxW = dag.nodeRef('surface/fire/effective wind/speed/exceeded')
        
        this.hpua1 = dag.nodeRef('primary/fire/heat per unit area')
        this.hpua2 = dag.nodeRef('secondary/fire/heat per unit area')
        this.hpuaW = dag.nodeRef('surface/fire/heat per unit area')

        this.fli1 = dag.nodeRef('primary/fire/heading/fireline intensity')
        this.fli2 = dag.nodeRef('secondary/fire/heading/fireline intensity')
        this.fliW = dag.nodeRef('surface/fire/heading/fireline intensity')

        this.fl1 = dag.nodeRef('primary/fire/heading/flame length')
        this.fl2 = dag.nodeRef('secondary/fire/heading/flame length')
        this.flW = dag.nodeRef('surface/fire/heading/flame length')

        // Common inputs nodes
        this.key1           = dag.nodeRef('primary/model/standard/key')
        this.key2           = dag.nodeRef('secondary/model/standard/key')
        this.cover1         = dag.nodeRef('surface/fire/cover/primary')
        this.midflame1      = dag.nodeRef('primary/wind/speed/midflame')
        this.midflame2      = dag.nodeRef('secondary/wind/speed/midflame')
        this.aspect         = dag.nodeRef('terrain/slope/direction/down-slope')
        this.upslope        = dag.nodeRef('terrain/slope/direction/up-slope')
        this.slopeRatio     = dag.nodeRef('terrain/slope/steepness/ratio')
        this.mois1          = dag.nodeRef('weather/moisture/dead/1-h')
        this.mois10         = dag.nodeRef('weather/moisture/dead/10-h')
        this.mois100        = dag.nodeRef('weather/moisture/dead/100-h')
        this.moisHerb       = dag.nodeRef('weather/moisture/live/herb')
        this.moisStem       = dag.nodeRef('weather/moisture/live/stem')
        this.windFromNorth  = dag.nodeRef('weather/wind/direction/source/from north')
        this.windHeadUpslp  = dag.nodeRef('weather/wind/direction/heading/from up-slope')
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
            [P.cfgVector,       ["fire head", "up-slope", "north"][0]],
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
    
    // Input values used for version 1 unit testing
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
