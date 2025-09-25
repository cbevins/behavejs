import { Wfms } from '../index.js'

// High level WFMS convenience base class whose derived classes provide:
// 1 - a WFMS with preset selected nodes, configuration, and input values;
// 2 - access to commonly used node references; and
// 3 - chaining to lower lever Wfms and Dag methods
export class WfmsUseCases extends Wfms{
    constructor(name='WFMS Standard Configuration') {
        super()
        this.name = name
        this.nodeRefs = {}
        this._assignNodeRefs()
    }

    //--------------------------------------------------------------------------
    // Public methods
    //--------------------------------------------------------------------------

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
    applyFireMapConfig() {
        const {canopy, ellipse, moisture, slope, surface, wind} = this.config
        const {primary, secondary} = surface

        canopy.height.value = canopy.height.heightBase

        ellipse.link.value = ellipse.link.surface
        ellipse.vector.value = ellipse.vector.fromHead

        moisture.dead.value = moisture.dead.particle
        moisture.live.value = moisture.live.particle

        slope.direction.value = slope.direction.downslope
        slope.steepness.value = slope.steepness.ratio

        wind.direction.value = wind.direction.sourceFromNorth
        wind.speed.value = wind.speed.at20ft

        surface.curing.value = surface.curing.estimated
        surface.midflame.value = surface.midflame.estimated
        surface.windLimit.value = surface.windLimit.applied
        surface.wsrf.value = surface.wsrf.estimated

        // Setting the following to 'primary' results in just 1 surface fuel
        // Setting it to any other value results in 2 surface fuel
        surface.weighting.value = surface.weighting.primary
        primary.fuel.value = primary.fuel.standard
        primary.standard.value = primary.standard.catalog
        secondary.fuel.value = secondary.fuel.standard
        secondary.standard.value = secondary.standard.catalog
        this.configure()
    }

    //--------------------------------------------------------------------------
    // Private methods
    //--------------------------------------------------------------------------
    
    _assignNodeRefs() {
        const dag = this.dag
        this.nodeRefs = {
            surface: {
                cured: dag.nodeRef('weather/curing/fraction/applied'),

                primary: {
                    cover: dag.nodeRef('weighted/fire/cover/primary'),
                    ewind: {
                        speed: dag.nodeRef('primary/fire/effective wind/speed'),
                        limit: dag.nodeRef('primary/fire/effective wind/speed/limit'),
                        exceeded: dag.nodeRef('secondary/fire/effective wind/speed/exceeded'),
                    },
                    heading: {
                        fromNorth: dag.nodeRef('primary/fire/heading/degrees/from north'),
                        fromUpslope: dag.nodeRef('primary/fire/heading/degrees/from up-slope'),
                    },
                    flame: dag.nodeRef('primary/fire/heading/flame length'),
                    fli: dag.nodeRef('primary/fire/heading/fireline intensity'),
                    fuel: {
                        key: dag.nodeRef('primary/model/standard/key'),
                    },
                    hpua: dag.nodeRef('primary/fire/heat per unit area'),
                    lwr: dag.nodeRef('primary/fire/length-to-width ratio'),
                    midflame: dag.nodeRef('primary/wind/speed/midflame'),
                    ros: dag.nodeRef('primary/fire/heading/spread rate'),
                    rxi: dag.nodeRef('primary/fire/reaction intensity'),
                },
                secondary: {
                    ewind: {
                        speed: dag.nodeRef('secondary/fire/effective wind/speed'),
                        limit: dag.nodeRef('secondary/fire/effective wind/speed/limit'),
                        exceeded: dag.nodeRef('primary/fire/effective wind/speed/exceeded'),
                    },
                    heading: {
                        fromNorth: dag.nodeRef('secondary/fire/heading/degrees/from north'),
                        fromUpslope: dag.nodeRef('secondary/fire/heading/degrees/from up-slope'),
                    },
                    flame: dag.nodeRef('secondary/fire/heading/flame length'),
                    fli: dag.nodeRef('secondary/fire/heading/fireline intensity'),
                    fuel: {
                        key: dag.nodeRef('secondary/model/standard/key'),
                    },
                    hpua: dag.nodeRef('secondary/fire/heat per unit area'),
                    lwr: dag.nodeRef('secondary/fire/length-to-width ratio'),
                    midflame: dag.nodeRef('secondary/wind/speed/midflame'),
                    rxi: dag.nodeRef('secondary/fire/reaction intensity'),
                    ros: dag.nodeRef('secondary/fire/heading/spread rate'),
                },
                weighted: {
                    arithmetic: dag.nodeRef('weighted/fire/spread rate/arithmetic mean'),
                    ewind: {
                        speed: dag.nodeRef('weighted/fire/effective wind/speed'),
                        limit: dag.nodeRef('weighted/fire/effective wind/speed/limit'),
                        exceeded: dag.nodeRef('weighted/fire/effective wind/speed/exceeded'),
                    },
                    harmonic: dag.nodeRef('weighted/fire/spread rate/harmonic mean'),
                    heading: {
                        fromNorth: dag.nodeRef('weighted/fire/heading/degrees/from north'),
                        fromUpslope: dag.nodeRef('weighted/fire/heading/degrees/from up-slope'),
                    },
                    flame: dag.nodeRef('weighted/fire/heading/flame length'),
                    fli: dag.nodeRef('weighted/fire/heading/fireline intensity'),
                    lwr: dag.nodeRef('weighted/fire/length-to-width ratio'),
                    midflame: dag.nodeRef('weighted/fire/wind/speed/midflame'),
                    rxi: dag.nodeRef('weighted/fire/reaction intensity'),
                    hpua: dag.nodeRef('weighted/fire/heat per unit area'),
                    ros: dag.nodeRef('weighted/fire/heading/spread rate'),
                },
            },
            canopy: {
                cover: dag.nodeRef('canopy/coverage'),
                baseHeight: dag.nodeRef('canopy/crown/base height'),
                totalHeight: dag.nodeRef('canopy/crown/total height')
            },
            moisture: {
                tl1: dag.nodeRef('weather/moisture/dead/1-h'),
                tl10: dag.nodeRef('weather/moisture/dead/10-h'),
                tl100: dag.nodeRef('weather/moisture/dead/100-h'),
                herb: dag.nodeRef('weather/moisture/live/herb'),
                stem: dag.nodeRef('weather/moisture/live/stem'),
            },
            slope: {
                aspect: dag.nodeRef('terrain/slope/direction/down-slope/degrees/from north'),
                upslope: dag.nodeRef('terrain/slope/direction/up-slope/degrees/from north'),
                ratio: dag.nodeRef('terrain/slope/steepness/ratio/rise-to-reach'),
                degrees: dag.nodeRef('terrain/slope/steepness/degrees/from horizontal'),
            },
            wind: {
                source: dag.nodeRef('weather/wind/direction/source/degrees/from north'),
                heading: dag.nodeRef('weather/wind/direction/heading/degrees/from up-slope'),
                at20ft: dag.nodeRef('weather/wind/speed/at 20-ft'),
                at10m: dag.nodeRef('weather/wind/speed/at 10-m')
            }
        }
    }

    // For reference, here are the input values used for version 1 unit testing
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
