import { Units as U } from './Units.js'
import { DagModule, DagNode } from './DagItems.js'
import { FireModule } from './FireModule.js'
import { RothermelModule } from './RothermelModule.js'
import { SlopeModule } from './SlopeModule.js'
import { CanopyModule } from './CanopyModule.js'
import { Calc, SurfaceFireEquations as Fire } from '../index.js'

/**
 * Defines the final surface module
 * NOTE that the FireEllipseModule links to the following nodes:
 *  fire.ros
 *  fire.dir.fromUpslope
 *  fire.lwr
 *  fire.midflame (to calculate scorch height)
 *  fire.flame (to calculate fireline intensity)
 *  fire.hpua is used by Rothermel's crown fire
 */
export class SurfaceFireModule extends FireModule {
    /**
     * 
     * @param {DagModule} parentMod Usually 'site'
     * @param {string} parentProp usually 'surface'
     * @param {RothermelModule} roth1
     * @param {RothermelModule} roth2
     * @param {DagConfig} Reference to Config.surfaceFire
     */
    constructor(parentMod, parentProp, roth1Mod, roth2Mod, configSurface) {
        super(parentMod, parentProp)
        this._meta.config = {configSurface}
        this._meta.mod = {roth1Mod, roth2Mod}

        // SurfaceFireModule adds the following DagNodes to FireModule
        this.cover1 = new DagNode(this, 'cover1', U.fraction)
        this.cover2 = new DagNode(this, 'cover2', U.fraction)
        this.rosArith = new DagNode(this, 'rosArith', U.fireRos)
        this.rosHarm  = new DagNode(this, 'rosHarm', U.fireRos)
    }

    // SurfaceFireModule has its own config() implementation
    config() {
        const {configSurface:config} = this._meta.config
        const {roth1Mod, roth2Mod} = this._meta.mod
        const fire1 = roth1Mod.fire
        const fire2 = roth2Mod.fire

        // The following are ALWAYS bound to the primary
        this.dir.fromUpslope.bind(fire1.dir.fromUpslope)
        this.dir.fromNorth.bind(fire1.dir.fromNorth)
        this.lwr.bind(fire1.lwr)
        this.wind.effective.speed.bind(fire1.wind.effective.speed)
        this.wind.midflame.speed.bind(fire1.wind.midflame.speed)
        this.wind.midflame.factor.bind(fire1.wind.midflame.factor)

        if (config.value === config.onefuel) {
            this.cover1.constant(1, config)
            this.cover2.constant(0, config)
            this.rxi.bind(fire1.rxi, config)
            this.hpua.bind(fire1.hpua, config)
            this.fli.bind(fire1.fli, config)
            this.flame.bind(fire1.flame, config)
            this.rosArith.bind(fire1.ros, config)
            this.rosHarm.bind(fire1.ros, config)
            this.ros.bind(fire1.ros, config)
            this.wind.effective.limit.bind(fire1.wind.effective.limit)
        } else {
            this.cover1.input(config)
            this.cover2.use(Calc.fromOne, [this.cover1], config)
            // The following use the maximum of the primary or secondary fuel
            this.rxi.use(Math.max, [fire1.rxi, fire2.rxi], config)
            this.hpua.use(Math.max, [fire1.hpua, fire2.hpua], config)
            this.fli.use(Math.max, [fire1.fli, fire2.fli], config)
            this.flame.use(Math.max, [fire1.flame, fire2.flame], config)
            // The effective wind speed limit is the minimum of either
            this.wind.effective.limit.use(Math.min, [fire1.wind.effective.limit, fire2.wind.effective.limit])
            // Effective wind speed is exceeded if *either* fuel bed's effective wind speed limit is exceeded
            this.wind.effective.exceeded.use(Calc.or, [fire1.wind.effective.exceeded, fire2.wind.effective.exceeded], config)
            // Arithmetic and harmonic means
            this.rosArith.use(Fire.arithmeticMeanSpreadRate, [this.cover1, fire1.ros, fire2.ros], config)
            this.rosHarm.use(Fire.harmonicMeanSpreadRate, [this.cover1, fire1.ros, fire2.ros], config)
            // Final ros
            const rosFinal = (config.value === config.harmonic) ? this.rosHarm : this.rosArith
            this.ros.bind(rosFinal, config)
        }
    }
}
