import { Units as U } from './Units.js'
import { DagModule, DagNode } from './DagItems.js'
import { FireModule } from './FireModule.js'
import { Calc, CompassEquations as Compass } from '../index.js'
import { FireEllipseEquations as FireEllipse } from '../index.js'
import { SurfaceFireEquations as SurfaceFire } from '../index.js'
// import { TreeMortalityEquations as TreeMortality } from '../index.js'

export class FireEllipseModule extends DagModule {
    /**
     * It requires the following nodes:
     *  - direction of maximum fire spread from upslope,
     *  - fire spread rate in the direction of maximum spread,
     *  - fireline intensity (or flame length) at the fire head, and
     *  - fire length-to-width ratio (or effective wind speed).
     * 
     * @param {DagModule} parentMod
     * @param {string} parentProp Usually 'ellipse'
     * @param {FireModule} fireMod The linked FireModule such as a
     *  SurfaceFireModule.
     * @param {SlopeModule} slopeMod The linked SlopeModule
     * @param {MapModule} mapMod The linked MapModule
     * @param {DagConfig} cfgVectors Reference to Config.fireVector
     * @param {DagConfig} cfgFli Reference to Config.firelineIntensity
     */
    constructor(parentMod, parentProp, fireMod, slopeMod, mapMod, configVectors, configFli) {
        super(parentMod, parentProp)
        this._meta.mod = {fireMod, slopeMod, mapMod}
        this._meta.config = {configFli, configVectors}

        // Structure
        // fire.head.dir.fromUpslope, fromNorth
        // fire.head.ros, flame, fli, scorch, mort, dist, x, y

        // fire.back.dir.fromUpslope, fromNorth
        // fire.back.ros, flame, fli, scorch, mort, dist, x, y

        // fire.left.dir.fromUpslope, fromNorth
        // fire.left.ros, flame, fli, scorch, mort, dist, x, y

        // fire.right.dir.fromUpslope, fromNorth
        // fire.right.ros, flame, fli, scorch, mort, dist, x, y

        // fire.vector.dir.fromHead, fromNorth, fromUpslope

        // fire.beta5.ros, fli, flame, scorch, mort, dist, x, y RENAME 'ignPt5'
        // fire.beta6.ros, fli, flame, scorch, mort, dist, x, y  RENAME 'ignPt6'
        // fire.psi.ros, fli, flame, scorch, mort, dist, x, y, mapDist, mapX, mapY   RENAME 'center'

        // Create the first depth of DagModules then destructure them
        for(let sub of ['axis', 'back', 'beta5', 'beta6', 'head', 'ignition', 'left', 'map', 'psi',
            'right', 'size', 'temp', 'vector', 'wind'])
            this[sub] = new DagModule(this, sub)
        const {axis, back, beta5, beta6, head, ignition, left, map, psi, right, size, temp, vector, wind} = this

        // Create common fire behavior DagModule DagNodes
        for(let sub of [head, back, left, right, beta5, beta6, psi]) {
            const dir = sub.dir = new DagModule(sub, 'dir')
            dir.fromUpslope = new DagNode(dir, 'fromUpslope', U.compass)
            dir.fromNorth = new DagNode(dir, 'fromNorth', U.compass)
            sub.flame = new DagNode(sub, 'flame', U.fireFlame)
            sub.fli = new DagNode(sub, 'fli', U.fireFli)
            sub.ros = new DagNode(sub, 'ros', U.fireRos)
            sub.scorch = new DagNode(sub, 'scorch', U.fireScorch)
            sub.dist = new DagNode(sub, 'dist', U.distance)
            sub.mapDist = new DagNode(sub, 'mapDist', U.mapDist)
        }
        // Additional DagNodes for beta6
        beta6.theta = new DagNode(beta6, 'theta', U.compass)
        beta6.psi = new DagNode(beta6, 'psi', U.compass)
        beta6.psiRos = new DagNode(beta6, 'psiRos', U.fireRos)

        for(let sub of [head, back, left, right, vector]) {
            const dir = sub.dir = new DagModule(sub, 'dir')
            dir.fromUpslope = new DagNode(dir, 'fromUpslope', U.compass)
            dir.fromNorth = new DagNode(dir, 'fromNorth', U.compass)
        }
        // Additional DagNode for vector
        vector.dir.fromHead = new DagNode(vector, 'fromHead', U.compass)

        // Axis
        for (let sub of ['major', 'minor', 'f', 'g', 'h']) {
            axis[sub] = new DagModule(axis, sub)
            axis[sub].ros = new DagNode(axis[sub], 'ros', U.fireRos)
        }
        axis.eccentricity = new DagNode(axis, 'eccentricity', U.ratio,)
        axis.lwr = new DagNode(axis, 'lwr', U.ratio)

        // Ignition time and point
        ignition.time = new DagModule(ignition, 'time')
        ignition.time.elapsed = new DagNode(ignition.time, 'elapsed', U.fireTime)
        ignition.point = new DagModule(ignition, 'point')
        ignition.point.x = new DagNode(ignition.point, 'x', U.factor)
        ignition.point.y = new DagNode(ignition.point, 'y', U.factor)

        map.area = new DagNode(map, 'area', U.mapArea)
        map.length = new DagNode(map, 'length', U.mapDist)
        map.perimeter = new DagNode(map, 'perimeter', U.mapDist)
        map.width = new DagNode(map, 'width', U.mapDist)
        
        size.area = new DagNode(size, 'area', U.fireArea)
        size.length = new DagNode(size, 'length', U.fireDist)
        size.perimeter = new DagNode(size, 'perimeter', U.fireDist)
        size.width = new DagNode(size, 'width', U.fireDist)

        temp.air = new DagNode(temp, 'air', U.temp).input()

        // Fire midflame and effective wind speed
        // wind.effective = new DagModule(wind, 'effective')
        // wind.effective.speed = new DagNode(wind.effective, 'speed', U.windSpeed)
        wind.midflame = new DagModule(this.wind, 'midflame')
        wind.midflame.speed = new DagNode(wind.midflame, 'speed', U.windSpeed)
        // wind.midflame.factor = new DagNode(wind.midflame, 'factor', U.windSpeed)
    }

    config() {
        const {axis, back, beta5, beta6, head, ignition, left, map, psi, right, size, temp, vector, wind} = this
        const {fireMod, mapMod, slopeMod} = this._meta.mod
        const {configFli, configVectors} = this._meta.config

        //----------------------------------------------------------------------
        // The following are either bound to a FireModule or are Dag.input
        //----------------------------------------------------------------------
        if (fireMod) {
            axis.lwr.bind(fireMod.lwr)
            head.ros.bind(fireMod.ros)
            head.dir.fromUpslope.bind(fireMod.dir.fromUpslope)
            head.dir.fromNorth.bind(fireMod.dir.fromNorth)
            head.flame.bind(fireMod.flame)
            head.fli.use(SurfaceFire.firelineIntensityFromFlameLength, [head.flame])
            // Fire midflame and effective wind speed
            // wind.effective.speed.bind(fireMod.wind.effective.speed)
            wind.midflame.speed.bind(fireMod.wind.midflame.speed)
            // wind.midflame.factor.bind(fireMod.wind.midflame.factor)
            // Ignition time and point
            ignition.time.elapsed.bind(fireMod.ignition.time.elapsed)
            ignition.point.x.bind(fireMod.ignition.point.x)
            ignition.point.y.bind(fireMod.ignition.point.y)
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
            }
            ignition.time.elapsed.input()
            ignition.point.x.input()
            ignition.point.y.input()
            temp.air.input()
            wind.midflame.speed.input()
        }

        //----------------------------------------------------------------------
        // Fire spread vectors from ignition point or ellipse center
        //----------------------------------------------------------------------
        
        if (configVectors.value === configVectors.fromNorth) {
            vector.dir.fromHead.use(Compass.compassDiff, [
                vector.dir.fromNorth, head.dir.fromNorth], configVectors)
            vector.dir.fromNorth.input(configVectors)
            vector.dir.fromUpslope.use(Compass.compassDiff, [
                vector.dir.fromNorth, slopeMod.dir.upslope], configVectors)
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
                vector.dir.fromUpslope, slopeMod.dir.upslope], configVectors)
            vector.dir.fromUpslope.input(configVectors)
        }

        // FireEllipse
        axis.eccentricity.use(FireEllipse.eccentricity, [axis.lwr])
        axis.major.ros.use(FireEllipse.majorSpreadRate, [head.ros, back.ros])
        axis.minor.ros.use(FireEllipse.minorSpreadRate, [axis.major.ros, axis.lwr])
        axis.f.ros.use(FireEllipse.fSpreadRate, [axis.major.ros])
        axis.g.ros.use(FireEllipse.gSpreadRate, [axis.major.ros, back.ros])
        axis.h.ros.use(FireEllipse.hSpreadRate, [axis.minor.ros])

        size.area.use(FireEllipse.area, [size.length, axis.lwr])
        size.length.use(FireEllipse.spreadDistance, [axis.major.ros, ignition.time.elapsed])
        size.perimeter.use(FireEllipse.perimeter, [size.length, size.width])
        size.width.use(FireEllipse.spreadDistance, [axis.minor.ros, ignition.time.elapsed])

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
            vector.dir.fromHead, head.ros, axis.eccentricity])
        psi.ros.use(FireEllipse.psiSpreadRate, [
            vector.dir.fromHead, axis.f.ros, axis.g.ros, axis.h.ros])

        // All 7 vectors share the following computation equations and parameters
        for(let node of [head, back, right, left, beta5, beta6, psi]) {
            node.dist.use(FireEllipse.spreadDistance, [node.ros, ignition.time.elapsed])
            node.mapDist.use(Calc.divide, [node.dist, mapMod.scale])
            node.scorch.use(SurfaceFire.scorchHeight, [node.fli, wind.midflame.speed, temp.air])
            // node.mortality.use(TreeMortality.mortalityRate, [
            //     canopyMod.tree.species.fofem6.code, canopyMod.tree.dbh',
            //     canopyMod.crown.height', canopyMod.crown.base', node.scorch])
        }

        // fli for all except head.fli, which may be bound, and beta6.fli (see above)
        for(let node of [back, right, left, beta5, psi]) {
            // !!! NOT used for head.fli, beta6.fli
            node.fli.use(FireEllipse.fliAtAzimuth, [head.fli, head.ros, node.ros])
        }
        // NOTE: beta6.fli derives the beta6.psiRos for its fireline intensity
        // using the following computation sequence!
        beta6.theta.use(FireEllipse.thetaFromBeta, [
            vector.dir.fromHead, axis.f.ros, axis.g.ros, axis.h.ros])
        beta6.psi.use(FireEllipse.psiFromTheta, [beta6.theta, axis.f.ros, axis.h.ros])
        beta6.psiRos.use(FireEllipse.psiSpreadRate, [beta6.psi, axis.f.ros, axis.g.ros, axis.h.ros])
        beta6.fli.use(FireEllipse.fliAtAzimuth, [head.fli, head.ros, beta6.psiRos])

        // flame for all except head.flame, which may be bound
        for(let node of [back, right, left, beta5, beta6, psi]) {
            node.flame.use(SurfaceFire.flameLength, [node.fli])
        }
    }
}