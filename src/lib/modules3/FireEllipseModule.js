import { Units as U } from './Units.js'
import { DagModule, DagNode } from './DagItems.js'
import { FireModule } from './FireModule.js'
import { Calc, CompassEquations as Compass } from '../index.js'
import { FireEllipseEquations as FireEllipse } from '../index.js'
import { SurfaceFireEquations as SurfaceFire } from '../index.js'
// import { TreeMortalityEquations as TreeMortality } from '../index.js'

export class FireEllipseModule extends FireModule {
    /**
     * It requires the following nodes:
     *  - direction of maximum fire spread from upslope,
     *  - fire spread rate in the direction of maximum spread,
     *  - fireline intensity (or flame length) at the fire head, and
     *  - fire length-to-width ratio (or effective wind speed).
     * 
     * @param {DagModule} parentMod
     * @param {string} parentProp Usually 'ellipse'
     * @param {FireModule} fireMod The linked fire module
     * @param {MapModule} mapMod
     * @param {DagConfig} cfgVectors Config reference to FireEllipseConfig.js
     */
    constructor(parentMod, parentProp, fireMod, mapMod, configVectors) {
        super(parentMod, parentProp)
        this._meta.mod = {fireMod, mapMod}
        this._meta.config = {configVectors}

        //----------------------------------------------------------------------
        // The following are either bound to a FireModule or are Dag.input
        //----------------------------------------------------------------------
        this.airTemp = new DagNode(this, 'airTemp', U.temp).input()
        // Direction of maximum spread
        this.dir = new DagModule(this, 'direction')
        this.dir.upslope = new DagNode(this.dir, 'upslope', U.compass)
            .bind(fireMod.dir.upslope)
        this.dir.north = new DagNode(this.dir, 'north', U.compass)
            .bind(fireMod.dir.north)
        this.flame = new DagNode(this, 'flame', U.fireFlame)
            .bind(fireMod.flame)
        this.fli = new DagNode(this, 'fli', U.fireFli)
            .use(SurfaceFire.firelineIntensityFromFlameLength, [this.flame])
        this.lwr = new DagNode(this, 'lwr', U.ratio)
            .bind(fireMod.dir.upslope)
        this.ros = new DagNode(this, 'ros', U.fireRos)
            .bind(fireMod.ros)

        // Fire midflame and effective wind speed
        this.wind = new DagModule(this, 'wind')
        this.wind.effective = new DagModule(this.wind, 'effective')
        this.wind.effective.speed = new DagNode(this.wind.effective, 'speed', U.windSpeed)
            .bind(fireMod.wind.effective.speed)
        this.wind.midflame = new DagModule(this.wind, 'midflame')
        this.wind.midflame.speed = new DagNode(this.wind.midflame, 'speed', U.windSpeed)
            .bind(fireMod.wind.midflame.speed)
        this.wind.midflame.factor = new DagNode(this.wind.midflame, 'factor', U.windSpeed)
            .bind(fireMod.wind.midflame.factor)

        // Ignition time and point
        this.ignition = new DagModule(this, 'ignition')
        this.ignition.time = new DagModule(this.ignition, 'time')
        this.ignition.time.elapsed = new DagNode(this.ignition.time, 'elapsed', U.fireTime)
            .bind(fireMod.ignition.time.elapsed)
        this.ignition.point = new DagModule(this.ignition, 'point')
        this.ignition.point.x = new DagNode(this.ignition.point, 'x', U.factor)
            .bind(fireMod.ignition.point.x)
        this.ignition.point.y = new DagNode(this.ignition.point, 'y', U.factor)
            .bind(fireMod.ignition.point.y)

        //----------------------------------------------------------------------
        // Fire spread vectors from ignition point or ellipse center
        //----------------------------------------------------------------------

        const vector = this.vector = new DagModule(this, 'vector')
        this.vector.fromHead = new DagNode(vector, 'fromHead', U.compass)
            .input(configVectors)   // if (configVectors.value === configVectors.fromHead)
            .use(Compass.compassDiff, [ // if (configVectors.value === configVectors.fromUpslope)
                vector.fromUpslope, this.dir.upslope], configVectors)
            .use(Compass.compassDiff, [// if (configVectors.value === configVectors.fromNorth)
                vector.fromNorth, this.dir.north], configVectors)

        this.vector.fromNorth = new DagModule(vector, 'fromNorth', U.compass)
            .input(configVectors)   // if (configVectors.value === configVectors.fromNorth)
            .use(Compass.compassSum, [   // if (configVectors.value === configVectors.fromHead)
                vector.fromHead, this.dir.fromNorth])
                [cfgVectors.fromUpslope, Compass.compassSum, [   // if (configVectors.value === configVectors.fromUpslope)
                    vector.fromUpslope, upslopeNode]]]],

            [path+P.vectorFromUpslope, 0, U.compass, cfgVectors, [
                [cfgVectors.fromUpslope, Dag.input, []],
                [cfgVectors.fromHead, Compass.compassSum, [
                    path+P.vectorFromHead,
                    path+P.fireFromUpslope]],
                [cfgVectors.fromNorth, Compass.compassDiff, [
                    path+P.vectorFromNorth,
                    upslopeNode]],
                [cfgVectors.any, Compass.compassDiff, [
                    path+P.vectorFromNorth,
                    upslopeNode]]]],

            // FireEllipse
            [path+P.headFli, 0, U.fireFli, null, [
                [cfg.any, SurfaceFire.firelineIntensityFromFlameLength, [
                    path+P.headFlame]]]],

            [path+P.eccent, 0, U.ratio, null, [
                ['', FireEllipse.eccentricity, [
                    path+P.axisLwr]]]],

            [path+P.axisMajRos, 0, U.fireRos, null, [
                ['', FireEllipse.majorSpreadRate, [
                    path+P.headRos,
                    path+P.backRos]]]],

            [path+P.axisMinRos, 0, U.fireRos, null, [
                ['', FireEllipse.minorSpreadRate, [
                    path+P.axisMajRos,
                    path+P.axisLwr]]]],
            
            [path+P.axisFRos, 0, U.fireRos, null, [
                ['', FireEllipse.fSpreadRate, [
                    path+P.axisMajRos]]]],
            
            [path+P.axisGRos, 0, U.fireRos, null, [
                ['', FireEllipse.gSpreadRate, [
                    path+P.axisMajRos,
                    path+P.backRos]]]],

            [path+P.axisHRos, 0, U.fireRos, null, [
                ['', FireEllipse.hSpreadRate, [
                    path+P.axisMinRos]]]],

            [path+P.sizeArea, 0, U.fireArea, null, [
                ['', FireEllipse.area, [
                    path+P.sizeLength,
                    path+P.axisLwr]]]],

            [path+P.sizeLength, 0, U.fireDist, null, [
                ['', FireEllipse.spreadDistance, [
                    path+P.axisMajRos,
                    path+P.fireTime]]]],

            [path+P.sizePerim, 0, U.fireDist, null, [
                ['', FireEllipse.perimeter, [
                    path+P.sizeLength,
                    path+P.sizeWidth]]]],

            [path+P.sizeWidth, 0, U.fireDist, null, [
                ['', FireEllipse.spreadDistance, [
                    path+P.axisMinRos,
                    path+P.fireTime]]]],

            // end path+'size'
            [path+P.mapArea, 0, U.mapArea, null, [
                ['', FireEllipse.mapArea, [
                    path+P.sizeArea,
                    mapScaleNode]]]],

            [path+P.mapLength, 0, U.mapDist, null, [
                ['', Calc.divide, [
                    path+P.sizeLength,
                    mapScaleNode]]]],

            [path+P.mapPerim, 0, U.mapDist, null, [
                ['', Calc.divide, [
                    path+P.sizePerim,
                    mapScaleNode]]]],

            [path+P.mapWidth, 0, U.mapDist, null, [
                ['', Calc.divide, [
                    path+P.sizeWidth,
                    mapScaleNode]]]],

            // end path+'map'
            [path+P.backDist, 0, U.fireDist, null, [
                ['', FireEllipse.spreadDistance, [
                    path+P.backRos,
                    path+P.fireTime]]]],

            [path+P.backFli, 0, U.fireFli, null, [
                ['', FireEllipse.fliAtAzimuth, [
                    path+P.headFli,
                    path+P.headRos,
                    path+P.backRos]]]],

            [path+P.backFlame, 0, U.fireFlame, null, [
                ['', SurfaceFire.flameLength, [
                    path+P.backFli]]]],

            [path+P.backMap, 0, U.mapDist, null, [
                ['', Calc.divide, [
                    path+P.backDist,
                    mapScaleNode]]]],

            [path+P.backRos, 0, U.fireRos, null, [
                ['', FireEllipse.backingSpreadRate, [
                    path+P.headRos,
                    path+P.eccent]]]],

            [path+P.backScorch, 0, U.fireScorch, null, [
                ['', SurfaceFire.scorchHeight, [
                    path+P.backFli,
                    path+P.fireMidf,
                    path+P.airTemp]]]],

            // [path+P.backMort, 0, U.fraction, null, [
            //     ['', TreeMortality.mortalityRate, [
            //         'site.canopy.tree.species.fofem6.code',
            //         'site.canopy.tree.dbh',
            //         'site.canopy.crown.totalHeight',
            //         'site.canopy.crown.baseHeight',
            //         path+P.backScorch]]]],

            // end path+'back'
            [path+P.flankDist, 0, U.fireDist, null, [
                ['', FireEllipse.spreadDistance, [
                    path+P.flankRos,
                    path+P.fireTime]]]],

            [path+P.flankFli, 0, U.fireFli, null, [
                ['', FireEllipse.fliAtAzimuth, [
                    path+P.headFli,
                    path+P.headRos,
                    path+P.flankRos]]]],

            [path+P.flankFlame, 0, U.fireFlame, null, [
                ['', SurfaceFire.flameLength, [
                    path+P.flankFli]]]],

            [path+P.flankMap, 0, U.mapDist, null, [
                ['', Calc.divide, [
                    path+P.flankDist,
                    mapScaleNode]]]],

            [path+P.flankRos, 0, U.fireRos, null, [
                ['', FireEllipse.flankingSpreadRate, [
                    path+P.axisMinRos]]]],

            [path+P.flankScorch, 0, U.fireScorch, null, [
                ['', SurfaceFire.scorchHeight, [
                    path+P.flankFli,
                    path+P.fireMidf,
                    path+P.airTemp]]]],

            // [path+P.flankMort, 0, U.fraction, null, [
            //     ['', TreeMortality.mortalityRate, [
            //         'site.canopy.tree.species.fofem6.code',
            //         'site.canopy.tree.dbh',
            //         'site.canopy.crown.totalHeight',
            //         'site.canopy.crown.baseHeight',
            //         path+P.flankScorch]]]],

            // end path+'flank'
            [path+P.headDist, 0, U.fireDist, null, [
                ['', FireEllipse.spreadDistance, [
                    path+P.headRos,
                    path+P.fireTime]]]],

            [path+P.headMap, 0, U.mapDist, null, [
                ['', Calc.divide, [
                    path+P.headDist,
                    mapScaleNode]]]],

            [path+P.headScorch, 0, U.fireScorch, null, [
                ['', SurfaceFire.scorchHeight, [
                    path+P.headFli,
                    path+P.fireMidf,
                    path+P.airTemp]]]],

            // [path+P.headMort, 0, U.fraction, null, [
            //     ['', TreeMortality.mortalityRate, [
            //         'site.canopy.tree.species.fofem6.code',
            //         'site.canopy.tree.dbh',
            //         'site.canopy.crown.totalHeight',
            //         'site.canopy.crown.baseHeight',
            //         path+P.headScorch]]]],

            // end path+'head'
            [path+P.psiDist, 0, U.fireDist, null, [
                ['', FireEllipse.spreadDistance, [
                    path+P.psiRos,
                    path+P.fireTime]]]],

            [path+P.psiFli, 0, U.fireFli, null, [
                ['', FireEllipse.fliAtAzimuth, [
                    path+P.headFli,
                    path+P.headRos,
                    path+P.psiRos]]]],

            [path+P.psiFlame, 0, U.fireFlame, null, [
                ['', SurfaceFire.flameLength, [
                    path+P.psiFli]]]],

            [path+P.psiMap, 0, U.mapDist, null, [
                ['', Calc.divide, [
                    path+P.psiDist,
                    mapScaleNode]]]],

            [path+P.psiRos, 0, U.fireRos, null, [
                ['', FireEllipse.psiSpreadRate, [
                    path+P.vectorFromHead,
                    path+P.axisFRos,
                    path+P.axisGRos,
                    path+P.axisHRos]]]],

            [path+P.psiScorch, 0, U.fireScorch, null, [
                ['', SurfaceFire.scorchHeight, [
                    path+P.psiFli,
                    path+P.fireMidf,
                    path+P.airTemp]]]],

            // [path+P.psiMort, 0, U.fraction, null, [
            //     ['', TreeMortality.mortalityRate, [
            //         'site.canopy.tree.species.fofem6.code',
            //         'site.canopy.tree.dbh',
            //         'site.canopy.crown.totalHeight',
            //         'site.canopy.crown.baseHeight',
            //         path+P.psiScorch]]]],

            // end pathPsi
            [path+P.beta5Dist, 0, U.fireDist, null, [
                ['', FireEllipse.spreadDistance, [
                    path+P.beta5Ros,
                    path+P.fireTime]]]],

            [path+P.beta5Fli, 0, U.fireFli, null, [
                ['', FireEllipse.fliAtAzimuth, [
                    path+P.headFli,
                    path+P.headRos,
                    path+P.betaRos]]]],

            [path+P.beta5Flame, 0, U.fireFlame, null, [
                ['', SurfaceFire.flameLength, [
                    path+P.beta5Fli]]]],

            [path+P.beta5Map, 0, U.mapDist, null, [
                ['', Calc.divide, [
                    path+P.beta5Dist,
                    mapScaleNode]]]],

            [path+P.beta5Ros, 0, U.fireRos, null, [
                ['', Dag.assign, [path+P.betaRos]]]],

            [path+P.beta5Scorch, 0, U.fireScorch, null, [
                ['', SurfaceFire.scorchHeight, [
                    path+P.beta5Fli,
                    path+P.fireMidf,
                    path+P.airTemp]]]],

            // [path+P.beta5Mort, 0, U.fraction, null, [
            //     ['', TreeMortality.mortalityRate, [
            //         'site.canopy.tree.species.fofem6.code',
            //         'site.canopy.tree.dbh',
            //         'site.canopy.crown.totalHeight',
            //         'site.canopy.crown.baseHeight',
            //         path+P.beta5Scorch]]]],

            // end path+P.beta5+''
            [path+P.betaDist, 0,  U.fireDist, null, [
                ['', FireEllipse.spreadDistance, [
                    path+P.betaRos,
                    path+P.fireTime]]]],

            [path+P.betaFli, 0, U.fireFli, null, [
                ['', FireEllipse.fliAtAzimuth, [
                    path+P.headFli,
                    path+P.headRos,
                    path+P.betaPsiRos]]]],

            [path+P.betaFlame, 0, U.fireFlame, null, [
                ['', SurfaceFire.flameLength, [
                    path+P.betaFli]]]],

            [path+P.betaMap, 0, U.mapDist, null, [
                ['', Calc.divide, [
                    path+P.betaDist,
                    mapScaleNode]]]],

            [path+P.betaRos, 0, U.fireRos, null, [
                ['', FireEllipse.betaSpreadRate, [
                    path+P.vectorFromHead,
                    path+P.headRos,
                    path+P.eccent]]]],

            [path+P.betaScorch, 0, U.fireScorch, null, [
                ['', SurfaceFire.scorchHeight, [
                    path+P.betaFli,
                    path+P.fireMidf,
                    path+P.airTemp]]]],

            // [path+P.betaMort, 0, U.fraction, null, [
            //     ['', TreeMortality.mortalityRate, [
            //         'site.canopy.tree.species.fofem6.code',
            //         'site.canopy.tree.dbh',
            //         'site.canopy.crown.totalHeight',
            //         'site.canopy.crown.baseHeight',
            //         path+P.betaScorch]]]],

            [path+P.betaTheta, 0, U.compass, null, [
                ['', FireEllipse.thetaFromBeta, [
                    path+P.vectorFromHead,
                    path+P.axisFRos,
                    path+P.axisGRos,
                    path+P.axisHRos]]]],

            [path+P.betaPsi, 0, U.compass, null, [
                ['', FireEllipse.psiFromTheta, [
                    path+P.betaTheta,
                    path+P.axisFRos,
                    path+P.axisHRos]]]],

            [path+P.betaPsiRos, 0, U.fireRos, null, [
                ['', FireEllipse.psiSpreadRate, [
                    path+P.betaPsi,
                    path+P.axisFRos,
                    path+P.axisGRos,
                    path+P.axisHRos]]]],

            // end path+'beta'
            [path+P.fireFromNorth, 0, U.compass, null, [
                ['', Compass.compassSum, [
                    upslopeNode,
                    path+P.fireFromUpslope]]]],
        ]
        // for(let i=0; i<this.nodes.length; i++) {
        //     const node = this.nodes[i]
        //     const [key, value, units, cfg, options] = node
        //     console.log(i, key)
        //     if (key.includes('undefined')) {
        //         console.log(`${this.module} has undefined key at node index ${i} with units "${units.key}"`)
        //     }
        // }
    }
}
