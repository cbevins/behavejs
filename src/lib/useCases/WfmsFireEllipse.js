import { WfmsUseCases } from '../index.js'

export class WfmsFireEllipse extends WfmsUseCases {
    constructor(name='Fire Ellipse Test', showMessages=false) {
        super(name)
        this.configure(this.configFireEllipseTesting())
        // if (showMessages) console.log(this.dag.messages)

        this.select(this.selectFireEllipseTestNodes())
        if (showMessages) console.log(this.dag.messages)

        this.setFireEllipseTestInputs()
        if (showMessages) console.log(this.dag.messages)
    }

    /**
     * Sets this.config to the fireEllipse.bp6.results.js file testing configuration:
     * - a single standard surface fuel model specified by catalog key;
     * - the weighted fire spread rate is the primary spread rate with effective wind limit applied;
     * - midflame wind speed is an input parameter;
     * - dead and live fuel moistures are entered for each particle type;
     * - live fuel curing fraction is estimated from herb moisture;
     * - wind speed is at 20-ft and direction is source from north;
     * - slope steepness is ratio and direction is the aspect.
     */
    configFireEllipseTesting() {
        // For reference , here is the fireEllipse.bp6.results.js configuration:
        const previousTestingConfigs = [
            ['configure.fire.effectiveWindSpeedLimit', ['applied', 'ignored'][0]],
            ['configure.fire.firelineIntensity', ['firelineIntensity', 'flameLength'][0]],
            ['configure.fire.lengthToWidthRatio', ['lengthToWidthRatio', 'effectiveWindSpeed'][0]],
            ['configure.fire.weightingMethod', ['arithmetic', 'expected', 'harmonic'][0]],
            ['configure.fire.vector', ['fromHead', 'fromUpslope', 'fromNorth'][2]],
            ['configure.fuel.chaparralTotalLoad', ['input', 'estimated'][0]],
            ['configure.fuel.curedHerbFraction', ['input', 'estimated'][1]],
            ['configure.fuel.moisture', ['individual', 'liveCategory', 'category', 'catalog'][0]],
            ['configure.fuel.primary', ['catalog', 'behave', 'chaparral', 'palmettoGallberry', 'westernAspen'][0]],
            ['configure.fuel.secondary', ['none', 'catalog', 'behave', 'chaparral', 'palmettoGallberry', 'westernAspen'][0]],
            ['configure.fuel.windSpeedAdjustmentFactor', ['input', 'estimated'][0]],
            ['configure.slope.steepness', ['ratio', 'degrees', 'map'][0]],
            ['configure.wind.direction', ['sourceFromNorth', 'headingFromUpslope', 'upslope'][0]],
            ['configure.wind.speed', ['at10m', 'at20ft', 'atMidflame'][2]],
            ['link.crownFire', 'linkedToSurfaceFire'],
            ['link.crownSpot', 'linkedToCrownFire'],
            ['link.fireContain', 'linkedToFireEllipse'],
            ['link.fireEllipse', 'linkedToSurfaceFire'],
            ['link.scorchHeight', 'linkedToSurfaceFire'],
            ['link.surfaceSpot', 'linkedToSurfaceFire'],
            ['link.treeMortality', 'linkedToScorchHeight']
        ]

        // Config object references for convenience
        const {canopy, ellipse, moisture, slope, surface, wind} = this.configObj
        const {primary, secondary} = surface
        return [
            [ellipse.link.key,       ellipse.link.surface],
            [ellipse.vector.key,     ellipse.vector.fromNorth], // use fromNorth for tests!!
           // Setting the following to 'primary' results in just 1 surface fuel
            // Setting it to any other value results in 2 surface fuel
            [surface.weighting.key,  surface.weighting.primary],
            [primary.fuel.key,       primary.fuel.standard],
            [primary.standard.key,   primary.standard.catalog],
            [secondary.fuel.key,     secondary.fuel.standard],      // not used, only a single fuel
            [secondary.standard.key, secondary.standard.catalog],   // not used, only a single fuel

            [surface.curing.key,     surface.curing.estimated],
            [surface.midflame.key,   surface.midflame.input],
            [surface.windLimit.key,  surface.windLimit.applied],
            [surface.wsrf.key,       surface.wsrf.input],           // not used, midflame is an input parameter

            [moisture.dead.key,      moisture.dead.particle],
            [moisture.live.key,      moisture.live.particle],

            [slope.direction.key,    slope.direction.downslope],
            [slope.steepness.key,    slope.steepness.ratio],

            [wind.direction.key,     wind.direction.sourceFromNorth],
            [wind.speed.key,         wind.speed.at20ft],

            [canopy.height.key,      canopy.height.heightBase],     // not used, midflame is an input parameter

            // These need to have *Config entries!
            // ellipse.intensity = {value: 'flame length', options: ['flame length', 'fireline intensity']}
            // ellipse.lwr = {value: 'length-to-width ratio', options: ['length-to-width ratio', 'effective wind speed']}
        ]
    }

    selectFireEllipseTestNodes() {
        // Node references for convenience
        const {canopy, ellipse, map, moisture, slope, surface, wind} = this.nodeRefs
        const {primary, secondary, weighted} = surface
        const {axis, back, beta, beta5, direction, eccent, flank, head, map:emap,
            psi, size, temp, time, vector } = ellipse

        return [
            surface.weighted.heading.fromUpslope,
            surface.weighted.heading.fromNorth,
            // surface.weighted.ros,
            // surface.weighted.harmonic,
            // surface.weighted.arithmetic,
            // surface.primary.ros,
            // surface.secondary.ros,

            axis.f, axis.g, axis.h, axis.lwr, axis.major, axis.minor,
            head.ros, head.fli, head.flame, head.dist, head.mapdist,
            back.ros, back.fli, back.flame, back.dist, back.mapdist,
            flank.ros, flank.fli, flank.flame, flank.dist, flank.mapdist,
            beta5.ros, beta5.fli, beta5.flame, beta5.dist, beta5.mapdist,
            beta.ros, beta.fli, beta.flame, beta.dist, beta.mapdist, beta.psi.degrees, beta.psi.ros, beta.theta,
            psi.ros, psi.fli, psi.flame, psi.dist, psi.mapdist,
            size.area, size.perim, size.length, size.width,
            emap.area, emap.perim, emap.length, emap.width,
            vector.head, vector.upslope,
            // surface.weighted.heading.fromNorth,
        ]
    }

    setFireEllipseTestInputs() {
        // Node references for convenience
        const {canopy, ellipse, map, moisture, slope, surface, wind} = this.nodeRefs
        const {primary, secondary} = surface
        const {axis, back, beta, beta5, direction, eccent, flank, head, map:emap,
            psi, size, temp, time, vector } = ellipse

        this.set(vector.north, 45)
        this.set(time, 60)
        this.set(primary.fuel.key, '10')
        this.set(primary.midflame, 880)
        this.set(slope.aspect, 180)
        this.set(slope.ratio, 0.25)
        this.set(moisture.tl1, 0.05)
        this.set(moisture.tl10, 0.07)
        this.set(moisture.tl100, 0.09)
        this.set(moisture.herb, 0.5)
        this.set(moisture.stem, 1.5)
        this.set(wind.source, 270)
        this.set(map.scale, 24000)
        this.set(temp, 95)
        this.updateAll()
    }
}
