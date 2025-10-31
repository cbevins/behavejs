import { DagModule } from './DagItems.js'
import { CommonNodes as Common } from './CommonNodes.js'
import { FireCharModule } from './FireCharModule.js'
import { Calc, SurfaceFireEquations as Fire } from '../index.js'

/**
 * Extends the FireCharModule with the weighted the results of two FireCellModules.
 */
export class WeightedFireModule extends FireCharModule {
    /**
     * @param {DagModule} parentMod Reference to this DagItem's parent DagModule
     * @param {string} parentProp Parent's property name for this DagItem ('site')
     * @param {Config} configs Module containing all current configuration objects
     * @param {FireCellModule} fire1Mod Primary FireCellModule
     * @param {FireCellModule} fire2Mod Secondary FireCellModule
     */
    constructor(parentMod, parentProp, configs, fire1Mod, fire2Mod) {
        super(parentMod, parentProp)
        this._meta.configs = configs
        this._meta.modules = {fire1Mod, fire2Mod}

        // SurfaceFireModule adds the following to FireModule
        this.cover1 = Common.cover1(this)
        this.cover2 = Common.cover2(this)
        this.rosArith = Common.ros(this)
        this.rosHarm  = Common.ros(this)
    }

    config() {
        const {surfaceFire:config} = this._meta.configs
        const {fire1Mod:fire1, fire2Mod: fire2} = this._meta.modules

        // The following are ALWAYS bound to the primary
        this.dir.fromUpslope.bind(fire1.dir.fromUpslope)
        this.dir.fromNorth.bind(fire1.dir.fromNorth)
        this.lwr.bind(fire1.lwr)
        this.midflame.bind(fire1.midflame)
        this.weff.bind(fire1.weff)
        this.wsrf.bind(fire1.wsrf)

        if (config.value === config.onefuel) {
            this.cover1.constant(1, config)
            this.cover2.constant(0, config)
            this.fli.bind(fire1.fli, config)
            this.flame.bind(fire1.flame, config)
            this.hpua.bind(fire1.hpua, config)
            this.ros.bind(fire1.ros, config)
            this.rosArith.bind(fire1.ros, config)
            this.rosHarm.bind(fire1.ros, config)
            this.rxi.bind(fire1.rxi, config)
            this.weffLimit.bind(fire1.weffLimit)
        } else {
            this.cover1.input(config)
            this.cover2.use(Calc.fromOne, [this.cover1], config)
            // The following use the maximum of the primary or secondary fuel
            this.rxi.use(Math.max, [fire1.rxi, fire2.rxi], config)
            this.fli.use(Math.max, [fire1.fli, fire2.fli], config)
            this.flame.use(Math.max, [fire1.flame, fire2.flame], config)
            this.hpua.use(Math.max, [fire1.hpua, fire2.hpua], config)
            // Final ros
            const rosFinal = (config.value === config.harmonic) ? this.rosHarm : this.rosArith
            this.ros.bind(rosFinal, config)
            // Arithmetic and harmonic means
            this.rosArith.use(Fire.arithmeticMeanSpreadRate, [this.cover1, fire1.ros, fire2.ros], config)
            this.rosHarm.use(Fire.harmonicMeanSpreadRate, [this.cover1, fire1.ros, fire2.ros], config)
            // The effective wind speed limit is the minimum of either
            this.weffLimit.use(Math.min, [fire1.weffLimit, fire2.weffLimit])
            // Effective wind speed is exceeded if *either* fuel bed's effective wind speed limit is exceeded
            this.weffExceeded.use(Calc.or, [fire1.weffExceeded, fire2.weffExceeded], config)
        }
        return this
    }
}
