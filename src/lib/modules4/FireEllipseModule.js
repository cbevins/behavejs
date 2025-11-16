import { CommonNodes as Common, DagModule } from '../core.js'

import { Calc, CompassEquations as Compass } from '../core.js'
import { FireEllipseEquations as FireEllipse } from '../core.js'
import { SurfaceFireEquations as SurfaceFire } from '../core.js'
// import { TreeMortalityEquations as TreeMortality } from '../index.js'

/**
 * FireEllipseModule provides a FireCharModule-like stack of fire behaviors
 * at any point along the fire ellipse perimeter at a specific elapsed time
 * and angle from either the fire ignition or current ellipse center point.
 * 
 * Vector angles may be specified as degrees clockwise from the fire head,
 * from the upslope direction, or from north.
 * 
 * There are 7 angle options available.  The 'head', 'right', 'back', and 'left' options
 * have a fixed angle from the fire head (0, 90, 180, 270 degrees, respectively).
 * 
 * The 'psi' option calculates fire behavior at the ellipse perimeter at an angle psi
 * from the fire's *current ellipse center* (which varies over time as the ellipse expands).
 * 
 * The 2 'beta' options calculate fire behavior at the ellipse perimeter at an angle
 * beta from the fire's *ignition point*, (which is fixed over time).
 * There are 2 methods of calculating fire behavior at angle beta.  While both methods
 * calculate *spread rate* and distance from the ignition point to the perimeter
 * point at angle 'beta', their calculations of *fireline intensity* differ.
 * 
 * The 'beta5' method calculates *fireline intensity* based upon the vector length from
 * the *ignition point* to the perimeter point at angle 'beta' from the ignition point
 * (as per BehavePlus Version 5 and earlier).
 * 
 * The 'beta6' method calculates *fireline intensity* based upon the vector length from
 * the *ellipse center* to the perimeter point at angle 'a' from the ignition point
 * (as per BehavePlus Version 6).
 * 
 * The client may request any or all of the 7 options as output.
 * But each option must have its own angle specified.
 */
export class FireEllipseModule extends DagModule {
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
     * @param {FirePointModule} ignMod Reference to a Module with the following properties:
     *  - .t
     *  - .x
     *  - .y
     * @param {TerrainModule} terrainMod Reference to a Module with the following properties:
     *  - .upslope
     * @param {WeatherModule} weatherMod Reference to a Module with the following properties:
     *  - .air.temp
     * @param {MapModule} mapMod Reference to a Module with the following properties:
     *  - .scale
     */
    constructor(parentMod, parentProp, configs, fireMod, ignMod, terrainMod, weatherMod, mapMod) {
        super(parentMod, parentProp)
        this._meta.configs = configs
        this._meta.modules = {fireMod, ignMod, mapMod, terrainMod, weatherMod}

        // Create the first depth of DagModules then destructure them for convenience
        for(let sub of ['axis', 'back', 'beta5', 'beta6', 'head', 'left', 'map', 'psi', 'right', 'size'])
            this[sub] = new DagModule(this, sub)
        const {axis, back, beta5, beta6, head, left, map, psi, right, size} = this

        // Add better labels for some of the modules
        beta5._meta.label = 'ignition point v5'
        beta6._meta.label = 'ignition point v6'
        psi._meta.label = 'ellipse center'

        // Create common fire point and characteristics nodes for the 7 fire ellipse angles
        for(let sub of [head, back, left, right, beta5, beta6, psi]) {
            // FireCharModule stack
            const dir = sub.dir = new DagModule(sub, 'dir')
            dir.fromHead = Common.fromHead(dir)
            dir.fromNorth = Common.fromNorth(dir)
            dir.fromUpslope = Common.fromUpslope(dir)
            sub.fli = Common.fli(sub)
            sub.flame = Common.flame(sub)
            sub.ros = Common.ros(sub)
            sub.scorch = Common.scorch(sub)
            // Fire perimeter stack
            sub.dist = Common.fireDist(sub) // distance from center or ignition pt
            sub.mapDist = Common.mapDist(sub)
            sub.t = Common.t(sub)
            sub.dx = Common.dx(sub)
            sub.dy = Common.dy(sub)
            sub.x = Common.x(sub)
            sub.y = Common.y(sub)
        }
        // Additional DagNodes for beta6, which uses the psi ros for its fli calc
        beta6.theta = Common.beta6Theta(beta6)
        beta6.psi = Common.beta6Psi(beta6)
        beta6.psiRos = Common.beta6PsiRos(beta6)

        // Axis
        axis.eccentricity = Common.eccentricity(this.axis)
        axis.lwr = Common.lwr(this.axis)
        for (let sub of ['major', 'minor', 'f', 'g', 'h']) {
            axis[sub] = new DagModule(axis, sub)
            axis[sub].ros = Common.ros(axis[sub])
        }

        // Ignition time and point
        this.t = Common.t(this)
        this.x = Common.x(this)
        this.y = Common.y(this)

        map.area = Common.mapArea(map)
        map.length = Common.mapLength(map)
        map.perimeter = Common.mapPerimeter(map)
        map.width = Common.mapWidth(map)
        
        size.area = Common.fireArea(size)
        size.length = Common.fireLength(size)
        size.perimeter = Common.firePerimeter(size)
        size.width = Common.fireWidth(size)

        this.midflame = Common.midflame(head)
        this.temp = Common.temp(this)
    }

    config() {
        const {axis, back, beta5, beta6, head, left, map, psi, right, size} = this
        const {fireMod, ignMod, mapMod, terrainMod, weatherMod} = this._meta.modules
        const {firelineIntensity:configFli, fireVectors:configVectors} = this._meta.configs

        this.t.bind(ignMod.t)
        this.x.bind(ignMod.x)
        this.y.bind(ignMod.y)
        this.temp.bind(weatherMod.air.temp)

        //----------------------------------------------------------------------
        // Fire spread vectors from ignition point or ellipse center
        //----------------------------------------------------------------------
        
        for(let sub of ['head', 'back', 'right', 'left', 'beta5', 'beta6', 'psi']) {
            const vector = this[sub]
            if (configVectors.value === configVectors.fromNorth) {
                vector.dir.fromHead.use(Compass.compassDiff, [
                    vector.dir.fromNorth, head.dir.fromNorth], configVectors)
                vector.dir.fromNorth.input(configVectors)
                vector.dir.fromUpslope.use(Compass.compassDiff, [
                    vector.dir.fromNorth, terrainMod.upslope], configVectors)
            }
            else if (configVectors.value === configVectors.fromHead) {
                vector.dir.fromHead.input(configVectors)
                vector.dir.fromNorth.use(Compass.compassSum, [
                    vector.dir.fromHead, head.dir.fromNorth], configVectors)
                vector.dir.fromUpslope.use(Compass.compassSum, [
                    vector.dir.fromHead, head.dir.fromUpslope], configVectors)
            }
            else if (configVectors.value === configVectors.fromUpslope) {
                vector.dir.fromHead.use(Compass.compassDiff, [
                    vector.dir.fromUpslope, head.dir.fromUpslope], configVectors)
                vector.dir.fromNorth.use(Compass.compassSum, [
                    vector.dir.fromUpslope, terrainMod.upslope], configVectors)
                vector.dir.fromUpslope.input(configVectors)
            }
        }
        this.head.dir.fromHead.constant(0)
        this.back.dir.fromHead.constant(180)
        this.right.dir.fromHead.constant(90)
        this.left.dir.fromHead.constant(270)

        //----------------------------------------------------------------------
        // The following are either bound to a FireModule or are Dag.input
        // NOTE: head.dir.{fromNorth|fromUpslope} configs are overwritten from above
        //----------------------------------------------------------------------

        if (fireMod) {
            axis.lwr.bind(fireMod.lwr)
            head.ros.bind(fireMod.ros)
            head.dir.fromUpslope.bind(fireMod.dir.fromUpslope)
            head.dir.fromNorth.bind(fireMod.dir.fromNorth)
            head.flame.bind(fireMod.flame)
            head.fli.use(SurfaceFire.firelineIntensityFromFlameLength, [head.flame])
            this.midflame.bind(fireMod.midflame)
        } else {
            axis.lwr.input()
            head.ros.input()
            head.dir.fromUpslope.input()
            head.dir.fromNorth.input()
            if(configFli.value===configFli.flame) {
                head.flame.input(configFli)
                head.fli.use(SurfaceFire.firelineIntensityFromFlameLength, [this.flame], configFli)
            } else if (configFli.value===configFli.fli) {
                head.fli.input(configFli)
                head.flame.use(SurfaceFire.flameLength, [head.fli], configFli)
            } else throw new Error(`Unknown config "${configFli.key}" value "${configFli.value}"`)
            this.midflame.input()
        }

        // FireEllipse
        axis.eccentricity.use(FireEllipse.eccentricity, [axis.lwr])
        axis.major.ros.use(FireEllipse.majorSpreadRate, [head.ros, back.ros])
        axis.minor.ros.use(FireEllipse.minorSpreadRate, [axis.major.ros, axis.lwr])
        axis.f.ros.use(FireEllipse.fSpreadRate, [axis.major.ros])
        axis.g.ros.use(FireEllipse.gSpreadRate, [axis.major.ros, back.ros])
        axis.h.ros.use(FireEllipse.hSpreadRate, [axis.minor.ros])

        size.area.use(FireEllipse.area, [size.length, axis.lwr])
        size.length.use(FireEllipse.spreadDistance, [axis.major.ros, ignMod.t])
        size.perimeter.use(FireEllipse.perimeter, [size.length, size.width])
        size.width.use(FireEllipse.spreadDistance, [axis.minor.ros, ignMod.t])

        map.area.use(FireEllipse.mapArea, [size.area, mapMod.scale])
        map.length.use(Calc.divide, [size.length, mapMod.scale])
        map.perimeter.use(Calc.divide, [size.perimeter, mapMod.scale])
        map.width.use(Calc.divide, [size.width, mapMod.scale])
        
        // All 7 vectors have their own ros computation (head.ros was set above)
        back.ros.use(FireEllipse.backingSpreadRate, [head.ros, axis.eccentricity])
        left.ros.use(FireEllipse.flankingSpreadRate, [axis.minor.ros])
        right.ros.bind(left.ros)
        beta5.ros.bind(beta6.ros)
        beta6.ros.use(FireEllipse.betaSpreadRate, [
            beta6.dir.fromHead, head.ros, axis.eccentricity])
        psi.ros.use(FireEllipse.psiSpreadRate, [
            psi.dir.fromHead, axis.f.ros, axis.g.ros, axis.h.ros])

        // All 7 vectors share the following computation equations and parameters
        for(let node of [head, back, right, left, beta5, beta6, psi]) {
            node.dist.use(FireEllipse.spreadDistance, [node.ros, ignMod.t])
            node.mapDist.use(Calc.divide, [node.dist, mapMod.scale])
            node.scorch.use(SurfaceFire.scorchHeight, [node.fli, this.midflame, this.temp])
            // node.mortality.use(TreeMortality.mortalityRate, [
            //     canopyMod.tree.species.fofem6.code, canopyMod.tree.dbh,
            //     canopyMod.crown.height, canopyMod.crown.base', node.scorch])
        }

        // fli for all except head.fli, which may be bound, and beta6.fli (see below)
        for(let node of [back, right, left, beta5, psi]) {
            // !!! NOT used for head.fli, beta6.fli
            node.fli.use(FireEllipse.fliAtAzimuth, [head.fli, head.ros, node.ros])
        }
        // NOTE: beta6.fli derives the beta6.psiRos for its fireline intensity
        // using the following computation sequence!
        beta6.theta.use(FireEllipse.thetaFromBeta, [
            beta6.dir.fromHead, axis.f.ros, axis.g.ros, axis.h.ros])
        beta6.psi.use(FireEllipse.psiFromTheta, [beta6.theta, axis.f.ros, axis.h.ros])
        beta6.psiRos.use(FireEllipse.psiSpreadRate, [beta6.psi, axis.f.ros, axis.g.ros, axis.h.ros])
        beta6.fli.use(FireEllipse.fliAtAzimuth, [head.fli, head.ros, beta6.psiRos])

        // flame for all except head.flame, which may be bound
        for(let node of [back, right, left, beta5, beta6, psi]) {
            node.flame.use(SurfaceFire.flameLength, [node.fli])
        }
    }
}