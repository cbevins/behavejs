/**
 * @file Crown Fire genes
 * @copyright 2021 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
*/
import { Dag } from '../index.js'
import { ModuleBase } from './ModuleBase.js'
import { Paths as P } from './Paths.js'
import { Units as U } from './Units.js'
import { Calc } from '../index.js'
import { CrownFireEquations as CrownFire } from '../index.js'
import { FireEllipseEquations as FireEllipse } from '../index.js'
import { SurfaceFireEquations as SurfaceFire } from '../index.js'

export class CrownFireModule extends ModuleBase {
    /**
     * 
     * @param {*} prefix 
     * @param {*} cfg 
     * 
     * The following are linked to FireEllipseModule , and are therefore
     * either linked to SurfaceFireWtgModule or input:
     * @param {string} 'surface.weighted.fire.heatPerUnitArea' (x1)
     * @param {string} 'surface.weighted.fire.firelineIntensity' (x1)
     * The following come from input parameters:
     * @param {string} 'fire.time.sinceIgnition' (x2) 
     * @param {string} 'map.scale' (x8)
     * @param {string} 'wind.speed.at20ft' (x2)
     * @param {string} 'canopy.fire.heatPerUnitArea' (x2)
     * @param {string} 'canopy.fuel.foliar.moistureContent' (x1)
     * @param {string} 'canopy.crown.baseHeight' (x1)
     * @param {string} 'canopy.fuel.bulkDensity' (x2)
     * // SurfaceFireWtgModule or SUrfaceFireModule
     * @param {string} 'surface.heatPerUnitArea'
     * @param {string} 'surface.primary.fuel.bed.noWindNoSlope.spreadRate',
     * @param {string} 'surface.primary.fuel.fire.windSpeedAdjustmentFactor',
     * @param {string} 'surface.primary.fuel.fire.wind.factor.b',
     * @param {string} 'surface.primary.fuel.fire.wind.factor.k',
     * @param {string} 'surface.primary.fuel.fire.slope.phi']]]],
     * @param {string} 'surface.primary.fuel.fire.spreadRate',
     */
    constructor(prefix, cfg) {
        super(prefix, P.crownFireSelf, P.crownFireMod, cfg)

        this.nodes = [
            
            // INPUTS
            // USED BY 'crown.fire.initiation.transitionRatio'
            // ['crown.fire.surface.firelineIntensity', 0, U.fireFli, cfg, [
            //     [cfg.surface, Dag.assign, ['surface.weighted.fire.firelineIntensity']],
            //     [cfg.any, Dag.assign, [ellPath+P.headFli]]]],

            // UNUSED!
            // ['crown.fire.surface.flameLength', 0, U.fireFlame, cfg, [
            //     [cfg.surface, Dag.assign, ['surface.weighted.fire.flameLength']],
            //     [cfg.any, Dag.assign, [ellPath+P.headFlame]]]],

            // USED BY:
            // 'crown.fire.active.heatPerUnitArea'
            // 'crown.fire.final.firelineIntensity'
            // 'crown.fire.initiation.spreadRate'
            // ['crown.fire.surface.heatPerUnitArea', 0, U.fireHpua, cfg, [
            //     [cfg.surface, Dag.assign, ['surface.weighted.fire.heatPerUnitArea']],
            //     [cfg.any, Dag.assign, [ellPath+P.fireHpua]]]],

            // Derived

            // 'crown.fire.active.size'
            // ['crown.fire.active.size.area', 0, U.fireArea, null, [
            //     ['', CrownFire.area, [
            //         'crown.fire.active.size.length',
            //         'crown.fire.active.lengthToWidthRatio']]]],

            // ['crown.fire.active.size.length', 0, U.fireDist, null, [
            //     ['', FireEllipse.spreadDistance, [
            //         'crown.fire.active.spreadRate',
            //         'site.fire.time.sinceIgnition']]]],

            // ['crown.fire.active.size.perimeter', 0, U.fireDist, null, [
            //     ['', CrownFire.perimeter, [
            //         'crown.fire.active.size.length',
            //         'crown.fire.active.lengthToWidthRatio']]]],

            // ['crown.fire.active.size.width', 0, U.fireDist, null, [
            //     ['', Calc.divide, [
            //         'crown.fire.active.size.length',
            //         'crown.fire.active.lengthToWidthRatio']]]],
            // end 'crown.fire.active.size'

            // 'crown.fire.active.map'
            // ['crown.fire.active.map.area', 0, U.mapArea, null, [
            //     ['', FireEllipse.mapArea, [
            //         'crown.fire.active.size.area',
            //         'site.map.scale']]]],

            // ['crown.fire.active.map.length', 0, U.mapDist, null, [
            //     ['', Calc.divide, [
            //         'crown.fire.active.size.length',
            //         'site.map.scale']]]],

            // ['crown.fire.active.map.perimeter', 0, U.mapDist, null, [
            //     ['', Calc.divide, [
            //         'crown.fire.active.size.perimeter',
            //         'site.map.scale']]]],

            // [' crown.fire.active.map.width', 0, U.mapDist, null, [
            //     ['', Calc.divide, [
            //         'crown.fire.active.size.width',
            //         'site.map.scale']]]],
            // end 'crown.fire.active.map'

            // ['crown.fire.active.lengthToWidthRatio', 1, U.fireLwr, null, [
            //     ['', CrownFire.lengthToWidthRatio, [
            //         'site.wind.speed.at20ft']]]],

            // ['crown.fire.active.spreadRate', 0, U.fireRos, null, [
            //     ['', CrownFire.rActive, [
            //         'crown.canopy.fuel.fire.spreadRate']]]],

            // ['crown.fire.active.firelineIntensity', 0, U.fireFli, null, [
            //     ['', CrownFire.fliActive, [
            //         'crown.fire.active.heatPerUnitArea',
            //         'crown.fire.active.spreadRate']]]],

            // ['crown.fire.active.flameLength', 0, U.fireFlame, null, [
            //     ['', CrownFire.flameLengthThomas, [
            //         'crown.fire.active.firelineIntensity']]]],

            // ['crown.fire.active.heatPerUnitArea', 0, U.fireHpua, null, [
            //     ['', CrownFire.hpuaActive, [
            //         'site.canopy.fire.heatPerUnitArea',
            //         'crown.fire.surface.heatPerUnitArea']]]],

            // ['crown.fire.active.powerOfTheFire', 0, U.firePower, null, [
            //     ['', CrownFire.powerOfTheFire, [
            //         'crown.fire.active.firelineIntensity']]]],

            // ['crown.fire.active.powerOfTheWind', 0, U.windPower, null, [
            //     ['', CrownFire.powerOfTheWind, [
            //         'site.wind.speed.at20ft',
            //         'crown.fire.active.spreadRate']]]],

            // ['crown.fire.active.powerRatio', 0, U.ratio, [
            //     ['', Calc.divide, [
            //         'crown.fire.active.powerOfTheFire',
            //         'crown.fire.active.powerOfTheWind']]]],

            // ['crown.fire.active.isPlumeDominated', 0, U.yesno, null [
            //     ['', CrownFire.isPlumeDominated, [
            //         'crown.fire.active.powerRatio']]]],

            // ['crown.fire.active.isWindDriven', 0, U.yesno, null, [
            //     ['', CrownFire.isWindDriven, [
            //         'crown.fire.active.powerRatio']]]],
            // end 'crown.fire.active'

            // 'crown.fire.final'
            // 'crown.fire.final.size'
            // ['crown.fire.final.size.area', 0, U.fireArea, null, [
            //     ['', CrownFire.area, [
            //         'crown.fire.final.size.length',
            //         'crown.fire.active.lengthToWidthRatio']]]],

            // ['crown.fire.final.size.length', 0, U.fireDist, null, [
            //     ['', FireEllipse.spreadDistance, [
            //         'crown.fire.final.spreadRate',
            //         'site.fire.time.sinceIgnition']]]],

            // ['crown.fire.final.size.perimeter', 0, U.fireDist, null, [
            //     ['', CrownFire.perimeter, [
            //         'crown.fire.final.size.length',
            //         'crown.fire.active.lengthToWidthRatio']]]],

            // ['crown.fire.final.size.width', 0, U.fireDist, null, [
            //     ['', Calc.divide, [
            //         'crown.fire.final.size.length',
            //         'crown.fire.active.lengthToWidthRatio']]]],
            // end 'crown.fire.final.size'

            // 'crown.fire.final.map'
            // ['crown.fire.final.map.area', 0, U.mapArea, null, [
            //     ['', FireEllipse.mapArea, [
            //         'crown.fire.final.size.area',
            //         'site.map.scale']]]],

            // ['crown.fire.final.map.length', 0, U.mapDist, null, [
            //     ['', Calc.divide, [
            //         'crown.fire.final.size.length',
            //         'site.map.scale']]]],

            // ['crown.fire.final.map.perimeter', 0, U.mapDist, null, [
            //     ['', Calc.divide, [
            //         'crown.fire.final.size.perimeter',
            //         'site.map.scale']]]],

            // ['crown.fire.final.map.width', 0, U.mapDist, null, [
            //     ['', Calc.divide, [
            //         'crown.fire.final.size.width',
            //         'site.map.scale']]]],
            // end 'crown.fire.final.map'
                    
            // ['crown.fire.final.rSa', 0, U.fireRos,  null, [
            //     ['', CrownFire.rSa, [
            //         'crown.fire.initiation.oActive',
            //         'surface.primary.fuel.bed.noWindNoSlope.spreadRate',
            //         'surface.primary.fuel.fire.windSpeedAdjustmentFactor',
            //         'surface.primary.fuel.fire.wind.factor.b',
            //         'surface.primary.fuel.fire.wind.factor.k',
            //         'surface.primary.fuel.fire.slope.phi']]]],

            // ['crown.fire.final.crownFractionBurned', 0, U.fraction, null, [
            //     ['', CrownFire.crownFractionBurned, [
            //         'surface.primary.fuel.fire.spreadRate',
            //         'crown.fire.initiation.spreadRate',
            //         'crown.fire.final.rSa']]]],

            // ['crown.fire.final.spreadRate', 0, U.fireRos, null, [
            //     ['', CrownFire.rFinal, [
            //         'surface.primary.fuel.fire.spreadRate',
            //         'crown.fire.active.spreadRate',
            //         'crown.fire.final.crownFractionBurned']]]],

            // ['crown.fire.final.firelineIntensity', 0, U.fireFli, null, [
            //     ['', CrownFire.fliFinal, [
            //         'crown.fire.final.spreadRate',
            //         'crown.fire.final.crownFractionBurned',
            //         'site.canopy.fire.heatPerUnitArea',
            //         'crown.fire.surface.heatPerUnitArea']]]],

            // ['crown.fire.final.flameLength', 0, U.fireFlame, null, [
            //     ['', CrownFire.flameLengthThomas, [
            //         'crown.fire.final.firelineIntensity']]]],
            // end 'crown.fire.final'

            // ['crown.fire.initiation.firelineIntensity', 0, U.fireFli, null, [
            //     ['', CrownFire.fliInit, [
            //         'site.canopy.fuel.foliar.moistureContent',
            //         'site.canopy.crown.baseHeight']]]],

            // ['crown.fire.initiation.flameLength', 0, U.fireFlame, null, [
            //     ['', SurfaceFire.flameLength, [
            //         'crown.fire.initiation.firelineIntensity']]]],

            // ['crown.fire.initiation.spreadRate',  0, U.fireRos, null, [
            //     ['', CrownFire.rInit, [
            //         'crown.fire.initiation.firelineIntensity',
            //         'crown.fire.surface.heatPerUnitArea']]]],

            // ['crown.fire.initiation.rPrime', 0, U.fireRos, null, [
            //     ['', CrownFire.rPrimeActive, [
            //         'site.canopy.fuel.bulkDensity']]]],

            // ['crown.fire.initiation.transitionRatio', 0, U.ratio, null, [
            //     ['', CrownFire.transitionRatio, [
            //         'crown.fire.surface.firelineIntensity',
            //         'crown.fire.initiation.firelineIntensity']]]],

            // ['crown.fire.initiation.canTransition', 0, U.yesno, null, [
            //     ['', CrownFire.canTransition, [
            //         'crown.fire.initiation.transitionRatio'
            //         ]]]],

            // ['crown.fire.initiation.activeRatio', 0, U.ratio, [
            //     ['', CrownFire.activeRatio, [
            //         'crown.fire.active.spreadRate',
            //         'crown.fire.initiation.rPrime']]]],

            // export const InitiationTypes = [ACTIVE, CONDITIONAL, PASSIVE, SURFACE]
            // ['crown.fire.initiation.type', CrownFire.Surface, U.crownInitType, null, [
            //     ['', CrownFire.type, [
            //         'crown.fire.initiation.transitionRatio',
            //         'crown.fire.initiation.activeRatio']]]],

            // ['crown.fire.initiation.isActiveCrownFire', 0, U.yesno, null, [
            //     ['', CrownFire.isActive, [
            //         'crown.fire.initiation.transitionRatio',
            //         'crown.fire.initiation.activeRatio']]]],

            // ['crown.fire.initiation.isCrownFire',  0, U.yesno, null, [
            //     ['', CrownFire.isCrown, [
            //         'crown.fire.initiation.transitionRatio',
            //         'crown.fire.initiation.activeRatio']]]],

            // ['crown.fire.initiation.isPassiveCrownFire', 0, U.yesno, null, [
            //     ['', CrownFire.isPassive, [
            //         'crown.fire.initiation.transitionRatio',
            //         'crown.fire.initiation.activeRatio']]]],

            // ['crown.fire.initiation.isConditionalCrownFire', 0, U.yesno, null, [
            //     ['', CrownFire.isConditional, [
            //         'crown.fire.initiation.transitionRatio',
            //         'crown.fire.initiation.activeRatio']]]],

            // ['crown.fire.initiation.isSurfaceFire', 0, U.yesno, null, [
            //     ['', CrownFire.isSurface, [
            //         'crown.fire.initiation.transitionRatio',
            //         'crown.fire.initiation.activeRatio']]]],

            // ['crown.fire.initiation.oActive', 0, U.windSpeed, [
            //     ['', CrownFire.oActive, [
            //         'site.canopy.fuel.bulkDensity',
            //         'crown.canopy.fuel.fire.reactionIntensity',
            //         'crown.canopy.fuel.bed.heatSink',
            //         'crown.canopy.fuel.fire.slope.phi']]]],
                    
            // ['crown.fire.initiation.crowningIndex', 0, U.factor, null, [
            //     ['', CrownFire.crowningIndex, [
            //         'crown.fire.initiation.oActive']]]],
            // end 'crown.fire.initiation'
            // end 'crown.fire.surface'
            // end 'crown.fire'
            // end 'crown'
        ]
    }
}
