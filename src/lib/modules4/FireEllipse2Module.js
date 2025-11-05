import { DagModule } from './DagItems.js'
import { CommonNodes as Common } from './CommonNodes.js'
import { Calc, CompassEquations as Compass } from '../index.js'
import { FireEllipseEquations as FireEllipse } from '../index.js'
import { SurfaceFireEquations as SurfaceFire } from '../index.js'

export class FireEllipse2Module extends DagModule {
    /**
     * @param {DagModule} parentMod Reference to this DagItem's parent DagModule
     * @param {string} parentProp Parent's property name for this DagItem ('moisture')
     * @param {Config} configs Module containing all current configuration objects
     * @param {FireCharModule} fireMod Reference to a Module with the following properties:
     *  - .dir.fromUpslope
     *  - .dir.fromNorth
     *  - .lwr
     *  - .ros
     *  - .fli or .flame
     * @param {FireIgnitionModule} ignMod Reference to a Module with the following properties:
     *  - .time.elapsed
     * @param {WeatherModule} weatherMod Reference to a Module with the following properties:
     *  - .air.temp
     * 
     */
    constructor(parentMod, parentProp, configs, ignMod, fireMod=null) {
        super(parentMod, parentProp)
        this._meta.configs = configs
        this._meta.modules = {fireMod, ignMod}

        const head = this.head = new DagModule(this, 'head')
        head.dir = new DagModule(head, 'dir', 'fire heading')
        head.dir.fromUpslope = Common.fromUpslope(head.dir)
        head.dir.fromNorth = Common.fromNorth(head.dir)
        head.lwr = Common.lwr(head)
        head.fli = Common.fli(head)
        head.flame = Common.flame(head)
        head.midflame = Common.midflame(head)
        head.ros = Common.ros(head)
        head.scorch = Common.scorch(head)
        head.wsrf = Common.wsrf(head)

        this.axis = new DagModule(this, 'axis')
        this.axis.eccentricity = Common.eccentricity(this.axis)
        this.axis.lwr = Common.lwr(this.axis)
        for(let sub of ['f', 'g', 'h', 'major', 'minor']) {
            this.axis[sub] = new DagModule(this.axis, sub)
            this.axis[sub]['ros'] = Common.ros(this.axis[sub])
        }

        this.back = new DagModule(this, 'back')
        this.back.ros = Common.ros(this.back)

        this.right = new DagModule(this, 'right')
        this.right.ros = Common.ros(this.right)

        this.left = new DagModule(this, 'left')
        this.left.ros = Common.ros(this.left)

        const size = this.size = new DagModule(this, 'size')
        size.area = Common.fireArea(size)
        size.length = Common.fireLength(size)
        size.perimeter = Common.firePerimeter(size)
        size.width = Common.fireWidth(size)
    }

    config() {
        const {firelineIntensity:configFli} = this._meta.configs
        const {fireMod, ignMod, weatherMod} = this._meta.modules
        const {axis, back, head, size} = this

        //----------------------------------------------------------------------
        // The following are either bound to a FireCharModule or are Dag.input
        //----------------------------------------------------------------------

        if (fireMod) {
            axis.lwr.bind(fireMod.lwr)
            head.ros.bind(fireMod.ros)
            head.dir.fromUpslope.bind(fireMod.dir.fromUpslope)
            head.dir.fromNorth.bind(fireMod.dir.fromNorth)
            head.flame.bind(fireMod.flame)
            head.fli.use(SurfaceFire.firelineIntensityFromFlameLength, [head.flame])
            head.midflame.bind(fireMod.midflame)
            head.wsrf.bind(fireMod.wsrf)
        } else {
            axis.lwr.input()
            head.ros.input()
            head.dir.fromUpslope.input()
            head.dir.fromNorth.input()
            if(configFli.value===configFli.flame) {
                head.flame.input(configFli)
                head.fli.use(SurfaceFire.firelineIntensityFromFlameLength, [head.flame], configFli)
            } else if (configFli.value===configFli.fli) {
                head.fli.input(configFli)
                head.flame.use(SurfaceFire.flameLength, [head.fli], configFli)
            }
            head.midflame.input()
            head.wsrf.input()
        }

        axis.eccentricity.use(FireEllipse.eccentricity, [axis.lwr])
        axis.major.ros.use(FireEllipse.majorSpreadRate, [head.ros, back.ros])
        axis.minor.ros.use(FireEllipse.minorSpreadRate, [axis.major.ros, axis.lwr])
        axis.f.ros.use(FireEllipse.fSpreadRate, [axis.major.ros])
        axis.g.ros.use(FireEllipse.gSpreadRate, [axis.major.ros, back.ros])
        axis.h.ros.use(FireEllipse.hSpreadRate, [axis.minor.ros])

        back.ros.use(FireEllipse.backingSpreadRate, [head.ros, axis.eccentricity])
        left.ros.use(FireEllipse.flankingSpreadRate, [axis.minor.ros])
        right.ros.bind(left.ros)

        size.area.use(FireEllipse.area, [size.length, axis.lwr])
        size.length.use(FireEllipse.spreadDistance, [axis.major.ros, ignMod.time.elapsed])
        size.perimeter.use(FireEllipse.perimeter, [size.length, size.width])
        size.width.use(FireEllipse.spreadDistance, [axis.minor.ros, ignMod.time.elapsed])
        return this
    }
}