// Extends the Wfms class to provide an object of hierarchical references to commonly used nodes.
// Derived classes *MUST* then implement their own configuration and selected nodes
// as appropriate to their use case.

import { Wfms } from '../index.js'

export class WfmsUseCases extends Wfms{
    constructor(name='WFMS Standard Configuration') {
        super()
        this.name = name
        this.nodeRefs = {}
        this._assignNodeRefs()
        // this.configure(this.configFireMapping())
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
    configFireMapping() {
        const {canopy, ellipse, moisture, slope, surface, wind} = this.configObj
        const {primary, secondary} = surface
        return [

            [canopy.height.key, canopy.height.heightBase],

            [ellipse.link.key, ellipse.link.surface],
            [ellipse.vector.key, ellipse.vector.fromHead],

            [moisture.dead.key, moisture.dead.particle],
            [moisture.live.key, moisture.live.particle],

            [slope.direction.key, slope.direction.downslope],
            [slope.steepness.key, slope.steepness.ratio],

            [wind.direction.key, wind.direction.sourceFromNorth],
            [wind.speed.key, wind.speed.at20ft],

            [surface.curing.key, surface.curing.estimated],
            [surface.midflame.key, surface.midflame.estimated],
            [surface.windLimit.key, surface.windLimit.applied],
            [surface.wsrf.key, surface.wsrf.estimated],

            // Setting the following to 'primary' results in just 1 surface fuel
            // Setting it to any other value results in 2 surface fuel
            [surface.weighting.key, surface.weighting.primary],
            [primary.fuel.key, primary.fuel.standard],
            [primary.standard.key, primary.standard.catalog],
            [secondary.fuel.key, secondary.fuel.standard],
            [secondary.standard.key, secondary.standard.catalog],
        ]
    }

    // - single surface fuel model
    configDefault() {
        const {canopy, ellipse, moisture, slope, surface, wind} = this.configObj
        const {primary, secondary} = surface
        return [
            // Most commonly changed configurations ----------------------------

            // Setting the following to 'primary' results in just 1 surface fuel
            [surface.weighting.key, surface.weighting.primary],     // or .harmonic, .arithmetic
            [surface.midflame.key, surface.midflame.input],         // or .estimated
            [surface.curing.key, surface.curing.input],             // or .estimated

            [ellipse.link.key, ellipse.link.surface],               // or .observed for stand alone
            [ellipse.vector.key, ellipse.vector.fromHead],          // or .fromNorth, .fromUpslope

            // Less frequently changed configurations -------------------------
            [canopy.height.key, canopy.height.heightBase],

            [moisture.dead.key, moisture.dead.particle],            // or .category
            [moisture.live.key, moisture.live.particle],            // or .category

            [slope.direction.key, slope.direction.usplope],         // or .downslope 
            [slope.steepness.key, slope.steepness.ratio],           // or .degrees, .map

            [wind.direction.key, wind.direction.sourceFromNorth],   // or .headingFromUpslope or .upslope
            [wind.speed.key, wind.speed.at20ft],                    // or .at10m

            [surface.windLimit.key, surface.windLimit.applied],     // or .notApplied
            [surface.wsrf.key, surface.wsrf.input],                 // or .estimated

            // Setting it to any other value results in 2 surface fuel
            [primary.fuel.key, primary.fuel.standard],              // or .chaparral, .palmetto, .aspen
            [primary.standard.key, primary.standard.catalog],       // or .custom
            [secondary.fuel.key, secondary.fuel.standard],          // or .chaparral, .palmetto, .aspen
            [secondary.standard.key, secondary.standard.catalog],   // or .custom
        ]
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
            },
            ellipse: {
                axis: {
                    f: dag.nodeRef('ellipse/axis/f/spread rate'),
                    g: dag.nodeRef('ellipse/axis/g/spread rate'),
                    h: dag.nodeRef('ellipse/axis/h/spread rate'),
                    lwr: dag.nodeRef('ellipse/axis/length-to-width ratio'),
                    major: dag.nodeRef('ellipse/axis/major/spread rate'),
                    minor: dag.nodeRef('ellipse/axis/minor/spread rate'),
                },
                back: {
                    dist: dag.nodeRef('ellipse/backing/distance'),
                    fli : dag.nodeRef('ellipse/backing/fireline intensity'),
                    flame: dag.nodeRef('ellipse/backing/flame length'),
                    mapdist: dag.nodeRef('ellipse/backing/map distance'),
                    ros: dag.nodeRef('ellipse/backing/spread rate'),
                    scorch: dag.nodeRef('ellipse/backing/scorch height'),
                },
                beta: {
                    dist: dag.nodeRef('ellipse/beta/distance'),
                    fli : dag.nodeRef('ellipse/beta/fireline intensity'),
                    flame: dag.nodeRef('ellipse/beta/flame length'),
                    mapdist: dag.nodeRef('ellipse/beta/map distance'),
                    psi: {
                        degrees: dag.nodeRef('ellipse/beta/psi/degrees'),
                        ros: dag.nodeRef('ellipse/beta/psi/spread rate'),
                    },
                    ros: dag.nodeRef('ellipse/beta/spread rate'),
                    scorch: dag.nodeRef('ellipse/beta/scorch height'),
                },
                beta5: {
                    dist: dag.nodeRef('ellipse/beta5/distance'),
                    fli : dag.nodeRef('ellipse/beta5/fireline intensity'),
                    flame: dag.nodeRef('ellipse/beta5/flame length'),
                    mapdist: dag.nodeRef('ellipse/beta5/map distance'),
                    ros: dag.nodeRef('ellipse/beta5/spread rate'),
                    scorch: dag.nodeRef('ellipse/beta5/scorch height'),
                },
                direction: {
                    north: dag.nodeRef('ellipse/heading/degrees/from north'),
                    upslope: dag.nodeRef('ellipse/heading/degrees/from up-slope'),
                },
                eccent: dag.nodeRef('ellipse/eccentricity'),
                flank: {
                    dist: dag.nodeRef('ellipse/flanking/distance'),
                    fli : dag.nodeRef('ellipse/flanking/fireline intensity'),
                    flame: dag.nodeRef('ellipse/flanking/flame length'),
                    mapdist: dag.nodeRef('ellipse/flanking/map distance'),
                    ros: dag.nodeRef('ellipse/flanking/spread rate'),
                    scorch: dag.nodeRef('ellipse/flanking/scorch height'),
                },
                head: {
                    dist: dag.nodeRef('ellipse/heading/distance'),
                    fli : dag.nodeRef('ellipse/heading/fireline intensity'),
                    flame: dag.nodeRef('ellipse/heading/flame length'),
                    mapdist: dag.nodeRef('ellipse/heading/map distance'),
                    scorch: dag.nodeRef('ellipse/heading/scorch height'),
                    ros: dag.nodeRef('ellipse/heading/spread rate'),
                },
                map: {
                    area: dag.nodeRef('ellipse/map/area'),
                    length: dag.nodeRef('ellipse/map/length'),
                    perim: dag.nodeRef('ellipse/map/perimeter'),
                    width: dag.nodeRef('ellipse/map/width'),
                },
                psi: {
                    dist: dag.nodeRef('ellipse/psi/distance'),
                    fli : dag.nodeRef('ellipse/psi/fireline intensity'),
                    flame: dag.nodeRef('ellipse/psi/flame length'),
                    mapdist: dag.nodeRef('ellipse/psi/map distance'),
                    scorch: dag.nodeRef('ellipse/psi/scorch height'),
                    ros: dag.nodeRef('ellipse/psi/spread rate'),
                },
                size: {
                    area: dag.nodeRef('ellipse/size/area'),
                    length: dag.nodeRef('ellipse/size/length'),
                    perim: dag.nodeRef('ellipse/size/perimeter'),
                    width: dag.nodeRef('ellipse/size/width'),
                },
                temp: dag.nodeRef('ellipse/temperature/ambient air'),
                time: dag.nodeRef('ellipse/time/ignition/elapsed'),
                vector: {
                    head: dag.nodeRef('ellipse/vector/degrees/from fire head'),
                    north: dag.nodeRef('ellipse/vector/degrees/from north'),
                    upslope: dag.nodeRef('ellipse/vector/degrees/from up-slope'),
                },
                wind: dag.nodeRef('ellipse/wind/speed/midflame'),
            },
            map: {
                contour: {
                    count: dag.nodeRef('map/contour/count'),
                    interval: dag.nodeRef('map/contour/interval'),
                },
                dist: dag.nodeRef('map/distance'),
                scale: dag.nodeRef('map/scale'),
                factor: dag.nodeRef('map/scale/inverse'),
                slope: {
                    degrees: dag.nodeRef('map/slope/degrees'),
                    ratio: dag.nodeRef('map/slope/ratio'),
                    reach: dag.nodeRef('map/slope/reach'),
                    rise: dag.nodeRef('map/slope/rise'),
                },
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
