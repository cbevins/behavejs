import { Units as U } from './Units.js'
import { DagModule, DagNode } from './DagItems.js'
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
export class WeightedFireModule extends DagModule {
    /**
     * @param {DagModule} parentMod Reference to this DagItem's parent DagModule
     * @param {string} parentProp Parent's property name for this DagItem ('site')
     * @param {FireCellModule} fire1Mod Primary FireCellModule
     * @param {FireCellModule} fire2Mod Secondary FireCellModule
     * @param {Config} configs Module containing all current configuration objects
     */
    constructor(parentMod, parentProp, fire1Mod, fire2Mod, configs) {
        super(parentMod, parentProp)
        this._meta.configs = configs
        this._meta.modules = {fire1Mod, fire2Mod}

        // SurfaceFireModule adds the following DagNodes to FireModule
        this.cover1 = new DagNode(this, 'cover1', U.fraction)   // ADDED
        this.cover2 = new DagNode(this, 'cover2', U.fraction)   // ADDED
        // These are the same nodes as FireCellModule
        this.dir = new DagModule(this, 'dir')
        this.dir.fromUpslope = new DagNode(this.dir, 'fromUpslope', U.compass)
        this.dir.fromNorth = new DagNode(this.dir, 'fromNorth', U.compass)
        this.taur = new DagNode(this, 'taur', U.fireTaur)
        this.hpua = new DagNode(this, 'hpua', U.fireHpua)
        this.lwr = new DagNode(this, 'lwr', U.ratio)
        this.fli = new DagNode(this, 'fli', U.fireFli)
        this.flame = new DagNode(this, 'flame', U.fireFlame)
        this.ros = new DagNode(this, 'ros', U.fireRos)
        this.rosArith = new DagNode(this, 'rosArith', U.fireRos)    // ADDED
        this.rosHarm  = new DagNode(this, 'rosHarm', U.fireRos)     // ADDED
        this.rxi = new DagNode(this, 'rxi', U.fireRxi)
        this.wind = new DagModule(this, 'wind')
        this.wind.effective = new DagModule(this.wind, 'effective')
        this.wind.effective.phi = new DagNode(this.wind.effective, 'phi', U.factor)
        this.wind.effective.speed = new DagNode(this.wind.effective, 'speed', U.windSpeed)
        this.wind.effective.limit = new DagNode(this.wind.effective, 'limit', U.windSpeed)
        this.wind.effective.exceeded = new DagNode(this.wind.effective, 'exceeded', U.bool)
        this.wind.midflame = new DagModule(this.wind, 'midflame')
        this.wind.midflame.speed = new DagNode(this.wind.midflame, 'speed', U.windSpeed)
        this.wind.midflame.factor = new DagNode(this.wind.midflame, 'factor', U.windSpeed)
    }

    config() {
        const {surfaceFire:config} = this._meta.configs
        const {fire1Mod:fire1, fire2Mod: fire2} = this._meta.modules

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
        return this
    }
}
