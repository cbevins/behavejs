import { WfmsUseCases } from '../index.js'

export class WfmsTwoFuels extends WfmsUseCases {
    constructor(name='Two Fuel Models Test') {
        super(name)
        this._applyTwoFuelsTestingConfig()
        this._setSelected()
        this._setInputs()
    }

    _applyTwoFuelsTestingConfig(config) {
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
        surface.midflame.value = surface.midflame.input
        surface.windLimit.value = surface.windLimit.applied
        surface.wsrf.value = surface.wsrf.input

        // Setting the following to 'primary' results in just 1 surface fuel
        // Setting it to any other value results in 2 surface fuel
        surface.weighting.value = surface.weighting.harmonic
        primary.fuel.value = primary.fuel.standard
        primary.standard.value = primary.standard.catalog
        secondary.fuel.value = secondary.fuel.standard
        secondary.standard.value = secondary.standard.catalog
        this.configure()
    }

    _setSelected() {
        const {primary:p, secondary:s, weighted:w} = this.nodeRefs.surface
        this.dag.select(
            p.ros, s.ros, w.ros, w.arithmetic, w.harmonic,
            p.heading.fromUpslope, s.heading.fromUpslope, w.heading.fromUpslope,
            p.ewind.speed, s.ewind.speed, w.ewind.speed,
            p.ewind.limit, s.ewind.limit, w.ewind.limit,
            p.ewind.exceeded, s.ewind.exceeded, w.ewind.exceeded,
            p.lwr, s.lwr, w.lwr,
            p.fli, s.fli, w.fli,
        )
    }

    _setInputs() {
        const dag = this.dag
        const {canopy, moisture, slope, surface, wind} = this.nodeRefs
        const {primary, secondary} = surface

        dag.set(primary.cover, 0.6)
        dag.set(primary.fuel.key, '10')
        dag.set(secondary.fuel.key, '124')
        dag.set(primary.midflame, 880)
        dag.set(secondary.midflame, 880)
        dag.set(moisture.tl1, 0.05)
        dag.set(moisture.tl10, 0.07)
        dag.set(moisture.tl100, 0.09)
        dag.set(moisture.herb, 0.5)
        dag.set(moisture.stem, 1.5)
        dag.set(slope.ratio, 0.25)
        dag.set(slope.aspect, 180)
        dag.set(wind.source, 270)
        dag.updateAll()
    }
}
