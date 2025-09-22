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
import { TreeMortalityEquations as TreeMortality } from '../index.js'

export class FireEllipseModule extends ModuleBase {
    /**
     * Creates the fuel moisture module.
     * @param {string} prefix Prefix for this module instance's fully qualified node names
     * something like 'fire/' or '' to prefix the 'ellipse/<node>' keys.
     * @param {Config} cfg Config reference to  FireEllipseConfig.js
     */
    constructor(prefix, cfg, cfgVectors, surfPath) {
        super(prefix, P.ellipseSelf, P.ellipseMod, cfg)
        const path = this.path  // ellipseSelf

        this.surfaceLinkNodes = [
            [path+P.axisLwr, U.ratio, cfg, [
                [cfg.surface, Dag.assign, [surfPath+P.fireLwr]],
                [cfg.observed, Dag.input, []]]],

            [path+P.headFlame, U.fireFlame, cfg, [
                [cfg.surface, Dag.assign, [surfPath+P.fireHeadFlame]],
                [cfg.observed, Dag.input, []]]],

            [path+P.headRos, U.fireRos, cfg, [
                [cfg.surface, Dag.assign, [surfPath+P.fireHeadRos]],
                [cfg.observed, Dag.input, []]]],

            [path+P.fireHeadDirUp, U.compass, cfg, [
                [cfg.surface, Dag.assign, [surfpath+P.fireHeadDirUp]],
                [cfg.observed, Dag.input, []]]],

            // Midflame wind speed is used by scorch height
            [path+P.fireMidf, U.windSpeed, cfg, [
                [cfg.surface, Dag.assign, [surfPath+P.fireMidf]],
                [cfg.observed, Dag.input, []]]],
        ]

        // Move these into there own module
        this.fireVectorNodes = [
            [path+P.vectorFromHead, U.compass, cfgVectors, [
                [cfgVectors.fromHead, Dag.input, []],
                [cfgVectors.fromUpslope, Compass.diff, [
                    path+P.vectorFromUpslope,
                    path+P.headingFromUpslope]],
                [cfgVectors.fromNorth, Compass.diff, [
                    path+P.vectorFromNorth,
                    path+P.headingFromNorth]]]],

            [path+P.vectorFromNorth, U.compass, cfgVectors, [
                [cfgVectors.fromNorth, Dag.input, []],
                [cfgVectors.fromHead, Compass.sum, [
                    path+P.vectorFromHead,
                    path+P.headingFromNorth]],
                [cfgVectors.fromUpslope, Compass.sum, [
                    path+P.vectorFromUpslope,
                    'site.slope.direction.upslope']]]],

            [path+P.vectorFromUpslope, U.compass, cfgVectors, [
                [cfgVectors.fromUpslope, Dag.input, []],
                [cfgVectors.fromHead, Compass.sum, [
                    path+P.vectorFromHead,
                    path+P.headingFromUpslope]],
                [cfgVectors.fromNorth, Compass.diff, [
                    path+P.vectorFromNorth,
                    'site.slope.direction.upslope']],
                [cfgVectors.any, Compass.diff, [
                    path+P.vectorFromNorth,
                    'site.slope.direction.upslope']]]]
        ]

        this.nodes = [
            [path+P.headFli, U.fireFli, null, [
                [cfg.any, SurfaceFire.firelineIntensityFromFlameLength, [
                    path+P.fireFlame]]]],

            [path+P.eccent, U.ratio, null, [
                ['', FireEllipse.eccentricity, [
                    path+P.axisLwr]]]],

            [path+P.axisMajRos, U.fireRos, null, [
                ['', FireEllipse.majorSpreadRate, [
                    path+P.headRos,
                    path+P.backRos]]]],

            [path+P.axisMinRos, U.fireRos, null, [
                ['', FireEllipse.minorSpreadRate, [
                    path+P.axisMajRos,
                    path+P.axisLwr]]]],
            
            [path+P.axisFRos, U.fireRos, null, [
                ['', FireEllipse.fSpreadRate, [
                    path+P.axisMajRos]]]],
            
            [path+P.axisGRos, U.fireRos, null, [
                ['', FireEllipse.gSpreadRate, [
                    path+P.axisMajRos,
                    path+P.backRos]]]],

            [path+P.axisHRos, U.fireRos, null, [
                ['', FireEllipse.hSpreadRate, [
                    path+P.axisMinRos]]]],

            [path+P.sizeArea, U.fireArea, null, [
                ['', FireEllipse.area, [
                    path+'size.length',
                    path+P.axisLwr]]]],

            [path+P.sizeLength, U.fireDist, null, [
                ['', FireEllipse.spreadDistance, [
                    path+P.axisMajRos,
                    'site.fire.time.sinceIgnition']]]],

            [path+P.sizePerim, U.fireDist, null, [
                ['', FireEllipse.perimeter, [
                    path+P.sizeLength,
                    path+P.sizeWidth]]]],

            [path+P.sizeWidth, U.fireDist, null, [
                ['', FireEllipse.spreadDistance, [
                    path+P.axisMinRos,
                    'site.fire.time.sinceIgnition']]]],

            // end path+'size'
            [path+P.mapArea, U.mapArea, null, [
                ['', FireEllipse.mapArea, [
                    path+P.sizeArea,
                    'site.map.scale']]]],

            [path+P.mapLength, U.mapDist, null, [
                ['', Calc.divide, [
                    path+P.sizeLength,
                    'site.map.scale']]]],

            [path+P.mapPerim, U.mapDist, null, [
                ['', Calc.divide, [
                    path+P.sizePerim,
                    'site.map.scale']]]],

            [path+P.mapWidth, U.mapDist, null, [
                ['', Calc.divide, [
                    path+P.sizeWwidth,
                    'site.map.scale']]]],

            // end path+'map'
            [path+P.backDist, U.fireDist, null, [
                ['', FireEllipse.spreadDistance, [
                    path+P.backRos,
                    'site.fire.time.sinceIgnition']]]],

            [path+P.backFli, U.fireFli, null, [
                ['', FireEllipse.fliAtAzimuth, [
                    path+P.headFli,
                    path+P.headRos,
                    path+P.backRos]]]],

            [path+P.backFlame, U.fireFlame, null, [
                ['', SurfaceFire.flameLength, [
                    path+P.backFli]]]],

            [path+P.backMap, U.mapDist, null, [
                ['', Calc.divide, [
                    path+P.backDist,
                    'site.map.scale']]]],

            [path+P.backRos, U.fireRos, null, [
                ['', FireEllipse.backingSpreadRate, [
                    path+P.headRos,
                    path+P.eccent]]]],

            [path+P.backScorch, U.fireScorch, null, [
                ['', SurfaceFire.scorchHeight, [
                    path+P.backFli,
                    path+P.fireMidf,
                    'site.temperature.air']]]],

            [path+P.backMort, U.fraction, null, [
                ['', TreeMortality.mortalityRate, [
                    'site.canopy.tree.species.fofem6.code',
                    'site.canopy.tree.dbh',
                    'site.canopy.crown.totalHeight',
                    'site.canopy.crown.baseHeight',
                    path+P.backScorch]]]],

            // end path+'back'
            [path+P.flankDist, U.fireDist, null, [
                ['', FireEllipse.spreadDistance, [
                    path+P.flankRos,
                    'site.fire.time.sinceIgnition']]]],

            [path+P.flankFli, U.fireFli, null, [
                ['', FireEllipse.fliAtAzimuth, [
                    path+P.headFli,
                    path+P.headRos,
                    path+P.flankRos]]]],

            [path+P.flankFlame, U.fireFlame, null, [
                ['', SurfaceFire.flameLength, [
                    path+P.flankFli]]]],

            [path+P.flankMap, U.mapDist, null, [
                ['', Calc.divide, [
                    path+P.flankDist,
                    'site.map.scale']]]],

            [path+P.flankRos, U.fireRos, null, [
                ['', FireEllipse.flankingSpreadRate, [
                    path+P.axisMinRos]]]],

            [path+P.flankScorch, U.fireScorch, null, [
                ['', SurfaceFire.scorchHeight, [
                    path+P.flankFli,
                    path+P.fireMidf,
                    'site.temperature.air']]]],

            [path+P.flankMort, U.fraction, null, [
                ['', TreeMortality.mortalityRate, [
                    'site.canopy.tree.species.fofem6.code',
                    'site.canopy.tree.dbh',
                    'site.canopy.crown.totalHeight',
                    'site.canopy.crown.baseHeight',
                    path+P.flankScorch]]]],

            // end path+'flank'
            [path+P.headDist, U.fireDist, null, [
                ['', FireEllipse.spreadDistance, [
                    path+P.headRos,
                    'site.fire.time.sinceIgnition']]]],

            [path+P.headMap, U.mapDist, null, [
                ['', Calc.divide, [
                    path+P.headDist,
                    'site.map.scale']]]],

            [path+P.headScorch, U.fireScorch, null, [
                ['', SurfaceFire.scorchHeight, [
                    path+P.headFli,
                    path+P.fireMidf,
                    'site.temperature.air']]]],

            [path+P.headMort, U.fraction, null, [
                ['', TreeMortality.mortalityRate, [
                    'site.canopy.tree.species.fofem6.code',
                    'site.canopy.tree.dbh',
                    'site.canopy.crown.totalHeight',
                    'site.canopy.crown.baseHeight',
                    path+P.headScorch]]]],

            // end path+'head'
            [path+P.psiDist, U.fireDist, null, [
                ['', FireEllipse.spreadDistance, [
                    path+P.psiRos,
                    'site.fire.time.sinceIgnition']]]],

            [path+P.psiFli, U.fireFli, null, [
                ['', FireEllipse.fliAtAzimuth, [
                    path+P.headFli,
                    path+P.headRos,
                    path+P.psiRos]]]],

            [path+P.psiFlame, U.fireFlame, null, [
                ['', SurfaceFire.flameLength, [
                    path+P.psiFli]]]],

            [path+P.psiMap, U.mapDist, null, [
                ['', Calc.divide, [
                    path+P.psiDist,
                    'site.map.scale']]]],

            [path+P.psiRos, U.fireRos, null, [
                ['', FireEllipse.psiSpreadRate, [
                    path+P.vectorFromHead,
                    path+P.axisFRos,
                    path+P.axisGRos,
                    path+P.axisHRos]]]],

            [path+P.psiScorch, U.fireScorch, null, [
                ['', SurfaceFire.scorchHeight, [
                    path+P.psiFli,
                    path+P.fireMidf,
                    'site.temperature.air']]]],

            [path+P.psiMort, U.fraction, null, [
                ['', TreeMortality.mortalityRate, [
                    'site.canopy.tree.species.fofem6.code',
                    'site.canopy.tree.dbh',
                    'site.canopy.crown.totalHeight',
                    'site.canopy.crown.baseHeight',
                    path+P.psiScorch]]]],

            // end pathPsi
            [path+P.beta5Dist, U.fireDist, null, [
                ['', FireEllipse.spreadDistance, [
                    path+P.beta5Ros,
                    'site.fire.time.sinceIgnition']]]],

            [path+P.beta5Fli, U.fireFli, null, [
                ['', FireEllipse.fliAtAzimuth, [
                    path+P.headFli,
                    path+P.headRos,
                    path+P.betaRos]]]],

            [path+P.beta5Flame, U.fireFlame, null, [
                ['', SurfaceFire.flameLength, [
                    path+P.beta5Fli]]]],

            [path+P.beta5Map, U.mapDist, null, [
                ['', Calc.divide, [
                    path+P.beta5Dist,
                    'site.map.scale']]]],

            [path+P.beta5Ros, U.fireRos, null, [
                ['', Dag.assign, [path+P.betaRos]]]],

            [path+P.beta5Scorch, U.fireScorch, null, [
                ['', SurfaceFire.scorchHeight, [
                    path+P.beta5Fli,
                    path+P.fireMidf,
                    'site.temperature.air']]]],

            [path+P.beta5Mort, U.fraction, null, [
                ['', TreeMortality.mortalityRate, [
                    'site.canopy.tree.species.fofem6.code',
                    'site.canopy.tree.dbh',
                    'site.canopy.crown.totalHeight',
                    'site.canopy.crown.baseHeight',
                    path+P.beta5Scorch]]]],

            // end path+P.beta5+''
            [path+P.betaDist, U.fireDist, null, [
                ['', FireEllipse.spreadDistance, [
                    path+P.betaRos,
                    'site.fire.time.sinceIgnition']]]],

            [path+P.betaFli, U.fireFli, null, [
                ['', FireEllipse.fliAtAzimuth, [
                    path+P.headFli,
                    path+P.headRos,
                    path+P.betaPsiRos]]]],

            [path+P.betaFlame, U.fireFlame, null, [
                ['', SurfaceFire.flameLength, [
                    path+P.betaFli]]]],

            [path+P.betaMap, U.mapDist, null, [
                ['', Calc.divide, [
                    path+P.betaDist,
                    'site.map.scale']]]],

            [path+P.betaRos, U.fireRos, null, [
                ['', FireEllipse.betaSpreadRate, [
                    path+P.vectorFromHead,
                    path+P.headRos,
                    path+P.eccent]]]],

            [path+P.betaScorch, U.fireScorch, null, [
                ['', SurfaceFire.scorchHeight, [
                    path+P.betaFli,
                    path+P.fireMidf,
                    'site.temperature.air']]]],

            [path+P.betaMort, U.fraction, null, [
                ['', TreeMortality.mortalityRate, [
                    'site.canopy.tree.species.fofem6.code',
                    'site.canopy.tree.dbh',
                    'site.canopy.crown.totalHeight',
                    'site.canopy.crown.baseHeight',
                    path+P.betaScorch]]]],

            [path+P.betaTheta, U.compass, null, [
                ['', FireEllipse.thetaFromBeta, [
                    path+P.vectorFromHead,
                    path+P.axisFRos,
                    path+P.axisGRos,
                    path+P.axisHRos]]]],

            [path+P.betaPsi, U.compass, null, [
                ['', FireEllipse.psiFromTheta, [
                    path+P.betaTheta,
                    path+P.axisFRos,
                    path+P.axisHRos]]]],

            [path+P.betaPsiRos, U.fireRos, null, [
                ['', FireEllipse.psiSpreadRate, [
                    path+P.betaPsi,
                    path+P.axisFRos,
                    path+P.axisGRos,
                    path+P.axisHRos]]]],

            // end path+'beta'
            [path+P.headingFromNorth, U.compass, null, [
                ['', Compass.sum, [
                    'site.slope.direction.upslope',
                    path+P.headingFromUpslope]]]],
        ]
    }
}
