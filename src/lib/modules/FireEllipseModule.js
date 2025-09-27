/**
 * @file Surface fire ellipse node definitions
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
*/
import { Dag } from '../index.js'
import { ModuleBase } from './ModuleBase.js'
import { Paths as P} from './Paths.js'
import { Units as U} from './Units.js'
import { Calc, CompassEquations as Compass } from '../index.js'
import { FireEllipseEquations as FireEllipse } from '../index.js'
import { SurfaceFireEquations as SurfaceFire } from '../index.js'
// Mortailty is currently not implemented!
// import { TreeMortalityEquations as TreeMortality } from '../index.js'

export class FireEllipseModule extends ModuleBase {
    /**
     * Creates the fuel moisture module.
     * @param {string} prefix Prefix for this module instance's fully qualified node names
     * something like 'fire/' or '' to prefix the 'ellipse/<node>' keys.
     * @param {Config} cfg Config reference to FireEllipseConfig.js
     */
    constructor(prefix, cfg, cfgVectors, surfPath, canopyPath,
        upslopeNode, mapScaleNode) {
        super(prefix, P.ellipseSelf, P.ellipseMod, cfg)
        const path = this.path  // ellipseSelf

        // let str = `${this.module} prefix="${prefix}" self="${this.self}"\n`
        // str += `    surface path="${surfPath}",\n    canopy path="${canopyPath}"\n`
        // str += `    upslopeNode="${upslopeNode}"\n    mapScaleNode="${mapScaleNode}"\n`
        // str+= `    head ros ="${path+P.headRos}"\n    fireMidf="${path+P.fireMidf}"`
        // console.log(str)

        this.nodes = [
            // Input nodes
            [path+P.fireTime, 0, U.fireTime, null, [
                [cfg.any, Dag.input, []]]],

            [path+P.airTemp, 77, U.temp, null, [
                [cfg.any, Dag.input, []]]],

            // SurfaceModule link nodes
            [path+P.headRos, 0, U.fireRos, cfg, [
                [cfg.surface, Dag.assign, [surfPath+P.fireHeadRos]],
                [cfg.observed, Dag.input, []]]],

            [path+P.fireFromUpslope, 0, U.compass, cfg, [
                [cfg.surface, Dag.assign, [surfPath+P.fireFromUpslope]],
                [cfg.observed, Dag.input, []]]],

            [path+P.axisLwr, 1, U.ratio, cfg, [
                [cfg.surface, Dag.assign, [surfPath+P.fireLwr]],
                [cfg.observed, Dag.input, []]]],

            [path+P.headFlame, 0, U.fireFlame, cfg, [
                [cfg.surface, Dag.assign, [surfPath+P.fireHeadFlame]],
                [cfg.observed, Dag.input, []]]],

            // Midflame wind speed is used by scorch height
            [path+P.fireMidf, 0, U.windSpeed, cfg, [
                [cfg.surface, Dag.assign, [surfPath+P.fireMidf]],
                [cfg.observed, Dag.input, []]]],

                // Move these into their own module?
            // this.fireVectorNodes = [
            [path+P.vectorFromHead, 0, U.compass, cfgVectors, [
                [cfgVectors.fromHead, Dag.input, []],
                [cfgVectors.fromUpslope, Compass.diff, [
                    path+P.vectorFromUpslope,
                    path+P.fireFromUpslope]],
                [cfgVectors.fromNorth, Compass.diff, [
                    path+P.vectorFromNorth,
                    path+P.fireFromNorth]]]],

            [path+P.vectorFromNorth, 0, U.compass, cfgVectors, [
                [cfgVectors.fromNorth, Dag.input, []],
                [cfgVectors.fromHead, Compass.sum, [
                    path+P.vectorFromHead,
                    path+P.fireFromNorth]],
                [cfgVectors.fromUpslope, Compass.sum, [
                    path+P.vectorFromUpslope,
                    upslopeNode]]]],

            [path+P.vectorFromUpslope, 0, U.compass, cfgVectors, [
                [cfgVectors.fromUpslope, Dag.input, []],
                [cfgVectors.fromHead, Compass.sum, [
                    path+P.vectorFromHead,
                    path+P.fireFromUpslope]],
                [cfgVectors.fromNorth, Compass.diff, [
                    path+P.vectorFromNorth,
                    upslopeNode]],
                [cfgVectors.any, Compass.diff, [
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
                ['', Compass.sum, [
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
