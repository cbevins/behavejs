import { WfmsUseCases } from '../index.js'

export class WfmsTwoFuels extends WfmsUseCases {
    constructor(name='Two Fuel Models Test', showMessages=false) {
        super(name)
        this.configure(this.configTwoFuelsTesting())
        if (showMessages) console.log(this.dag.messages)

        this.select(this.selectTwoFuelsTestNodes())
        if (showMessages) console.log(this.dag.messages)

        this.setTwoFuelsTestInputs()
        if (showMessages) console.log(this.dag.messages)
    }

    /**
     * Returns a two fuel model testing configuration:
     * - two standard surface fuel models specified by catalog key;
     * - the weighted fire spread rate is the harmonic mean with effective wind limit applied;
     * - midflame wind speed is an input parameter for each fuel bed;
     * - dead and live fuel moistures are entered for each particle type;
     * - live fuel curing fraction is estimated from herb moisture;
     * - wind speed is at 20-ft and direction is source from north;
     * - slope steepness is ratio and direction is the aspect.
     */
    configTwoFuelsTesting() {
        const {canopy, ellipse, moisture, slope, surface, wind} = this.configObj
        const {primary, secondary} = surface
        return [
            // Setting the following to 'primary' results in just 1 surface fuel
            // Setting it to any other value results in 2 surface fuel
            [surface.weighting.key,  surface.weighting.harmonic],
            [primary.fuel.key,       primary.fuel.standard],
            [primary.standard.key,   primary.standard.catalog],
            [secondary.fuel.key,     secondary.fuel.standard],
            [secondary.standard.key, secondary.standard.catalog],

            [surface.curing.key,     surface.curing.estimated],
            [surface.midflame.key,   surface.midflame.input],
            [surface.windLimit.key,  surface.windLimit.applied],
            [surface.wsrf.key,       surface.wsrf.input],           // not used

            [moisture.dead.key,      moisture.dead.particle],
            [moisture.live.key,      moisture.live.particle],

            [slope.direction.key,    slope.direction.downslope],
            [slope.steepness.key,    slope.steepness.ratio],

            [wind.direction.key,     wind.direction.sourceFromNorth],
            [wind.speed.key,         wind.speed.at20ft],

            [canopy.height.key,      canopy.height.heightBase],     // not used],

            [ellipse.link.key,       ellipse.link.surface],         // not used],
            [ellipse.vector.key,     ellipse.vector.fromHead],      // not used],
        ]
    }

    selectTwoFuelsTestNodes() {
        const {primary:p, secondary:s, weighted:w} = this.nodeRefs.surface
        return [
            p.ros, s.ros, w.ros, w.arithmetic, w.harmonic,
            p.heading.fromUpslope, s.heading.fromUpslope, w.heading.fromUpslope,
            p.ewind.speed, s.ewind.speed, w.ewind.speed,
            p.ewind.limit, s.ewind.limit, w.ewind.limit,
            p.ewind.exceeded, s.ewind.exceeded, w.ewind.exceeded,
            p.lwr, s.lwr, w.lwr,
            p.fli, s.fli, w.fli,
        ]
    }

    setTwoFuelsTestInputs() {
        const {canopy, moisture, slope, surface, wind} = this.nodeRefs
        const {primary, secondary} = surface

        this.set(primary.cover, 0.6)
        this.set(primary.fuel.key, '10')
        this.set(secondary.fuel.key, '124')
        this.set(primary.midflame, 880)
        this.set(secondary.midflame, 880)
        this.set(moisture.tl1, 0.05)
        this.set(moisture.tl10, 0.07)
        this.set(moisture.tl100, 0.09)
        this.set(moisture.herb, 0.5)
        this.set(moisture.stem, 1.5)
        this.set(slope.ratio, 0.25)
        this.set(slope.aspect, 180)
        this.set(wind.source, 270)
        this.updateAll()
    }
}
