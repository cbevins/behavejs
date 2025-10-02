/**
 * @file Crown Fire Module
 * @copyright 2025 Systems for Environmental Management
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
    constructor(prefix, cfg) {
        super(prefix, P.crownFireSelf, P.crownFireMod, cfg)

        this.nodes = [
            // Surface fireline intensity is used by S&R for 'crown.fire.initiation.transitionRatio'
            ['crown.fire.surface.firelineIntensity', 0, U.fireFli, cfg, [
                [cfg.surface, Dag.assign, ['surface.weighted.fire.firelineIntensity']],
                [cfg.any, Dag.assign, [ellPath+P.headFli]]]],

            // Surface fire HPUA is used by:
            //  - Rothermel for 'crown.fire.active.heatPerUnitArea'
            //  - S&R for 'crown.fire.final.firelineIntensity'
            //  - S&R for 'crown.fire.initiation.spreadRate'
            ['crown.fire.surface.heatPerUnitArea', 0, U.fireHpua, cfg, [
                [cfg.surface, Dag.assign, ['surface.weighted.fire.heatPerUnitArea']],
                [cfg.any, Dag.assign, [ellPath+P.fireHpua]]]],

            //------------------------------------------------------------------
            // Rothermel crown fire assumes a fully 'active' crown fire
            // Inputs are:
            //  - surface fire heat per unit area
            //  - crown fire active spread rate, determined from FM10, 0.4*wind20,
            //      and fuel moisture content
            //  - surface fire hpua
            //------------------------------------------------------------------

            //------------------------------------------------------------------
            // Rothermel crown fire behavior
            //------------------------------------------------------------------

            ['crown.fire.active.heatPerUnitArea', 0, U.fireHpua, null, [
                ['', CrownFire.hpuaActive, [
                    'site.canopy.fire.heatPerUnitArea',
                    'crown.fire.surface.heatPerUnitArea']]]],
            
            ['crown.fire.active.spreadRate', 0, U.fireRos, null, [
                ['', CrownFire.rActive, [
                    'crown.canopy.fuel.fire.spreadRate']]]],

            ['crown.fire.active.firelineIntensity', 0, U.fireFli, null, [
                ['', CrownFire.fliActive, [
                    'crown.fire.active.heatPerUnitArea',
                    'crown.fire.active.spreadRate']]]],

            ['crown.fire.active.flameLength', 0, U.fireFlame, null, [
                ['', CrownFire.flameLengthThomas, [
                    'crown.fire.active.firelineIntensity']]]],

            ['crown.fire.active.powerOfTheFire', 0, U.firePower, null, [
                ['', CrownFire.powerOfTheFire, [
                    'crown.fire.active.firelineIntensity']]]],

            ['crown.fire.active.powerOfTheWind', 0, U.windPower, null, [
                ['', CrownFire.powerOfTheWind, [
                    'site.wind.speed.at20ft',
                    'crown.fire.active.spreadRate']]]],

            ['crown.fire.active.powerRatio', 0, U.ratio, [
                ['', Calc.divide, [
                    'crown.fire.active.powerOfTheFire',
                    'crown.fire.active.powerOfTheWind']]]],

            ['crown.fire.active.isPlumeDominated', 0, U.yesno, null [
                ['', CrownFire.isPlumeDominated, [
                    'crown.fire.active.powerRatio']]]],

            ['crown.fire.active.isWindDriven', 0, U.yesno, null, [
                ['', CrownFire.isWindDriven, [
                    'crown.fire.active.powerRatio']]]],

            //------------------------------------------------------------------
            // Rothermel crown fire size, shape, and growth
            //------------------------------------------------------------------
            
            ['crown.fire.active.lengthToWidthRatio', 1, U.fireLwr, null, [
                ['', CrownFire.lengthToWidthRatio, [
                    'site.wind.speed.at20ft']]]],

            ['crown.fire.active.size.area', 0, U.fireArea, null, [
                ['', CrownFire.area, [
                    'crown.fire.active.size.length',
                    'crown.fire.active.lengthToWidthRatio']]]],

            ['crown.fire.active.size.length', 0, U.fireDist, null, [
                ['', FireEllipse.spreadDistance, [
                    'crown.fire.active.spreadRate',
                    'site.fire.time.sinceIgnition']]]],

            ['crown.fire.active.size.perimeter', 0, U.fireDist, null, [
                ['', CrownFire.perimeter, [
                    'crown.fire.active.size.length',
                    'crown.fire.active.lengthToWidthRatio']]]],

            ['crown.fire.active.size.width', 0, U.fireDist, null, [
                ['', Calc.divide, [
                    'crown.fire.active.size.length',
                    'crown.fire.active.lengthToWidthRatio']]]],

            ['crown.fire.active.map.area', 0, U.mapArea, null, [
                ['', FireEllipse.mapArea, [
                    'crown.fire.active.size.area',
                    'site.map.scale']]]],

            ['crown.fire.active.map.length', 0, U.mapDist, null, [
                ['', Calc.divide, [
                    'crown.fire.active.size.length',
                    'site.map.scale']]]],

            ['crown.fire.active.map.perimeter', 0, U.mapDist, null, [
                ['', Calc.divide, [
                    'crown.fire.active.size.perimeter',
                    'site.map.scale']]]],

            [' crown.fire.active.map.width', 0, U.mapDist, null, [
                ['', Calc.divide, [
                    'crown.fire.active.size.width',
                    'site.map.scale']]]],

            //------------------------------------------------------------------
            // Scott & Reinhardt allows partial crown fires based on surface and
            // canopy fuel & fire characteristics
            // Inputs:
            //  - surface fire fireline intensity
            //  - surface fire heat per unit area
            //  - Rothermel's 'crown.fire.active.spreadRate'
            //  - Rothermel's 'crown.fire.active.lengthToWidthRatio' (for size and area only)
            //  - canopy fuel bulk density
            //  - canopy foliar moisture content
            //  - canopy crown base height
            //  - Rothermel's 'crown.canopy.fuel.fire.reactionIntensity',
            //  - Rothermel's 'crown.canopy.fuel.bed.heatSink',
            //  - Rothermel's 'crown.canopy.fuel.fire.slope.phi'
            //  - Surface fire 'surface.primary.fuel.bed.noWindNoSlope.spreadRate',
            //  - Surface fire 'surface.primary.fuel.fire.windSpeedAdjustmentFactor',
            //  - Surface fire 'surface.primary.fuel.fire.wind.factor.b',
            //  - Surface fire 'surface.primary.fuel.fire.wind.factor.k',
            //  - Surface fire 'surface.primary.fuel.fire.slope.phi'
            //------------------------------------------------------------------
            
            //------------------------------------------------------------------
            // initiation and transition variables
            //------------------------------------------------------------------

            // Intermediate
            ['crown.fire.initiation.rPrime', 0, U.fireRos, null, [
                ['', CrownFire.rPrimeActive, [
                    'site.canopy.fuel.bulkDensity']]]],

            // Intermediate
            ['crown.fire.initiation.activeRatio', 0, U.ratio, [
                ['', CrownFire.activeRatio, [
                    'crown.fire.active.spreadRate',
                    'crown.fire.initiation.rPrime']]]],

            // Intermediate
            ['crown.fire.initiation.firelineIntensity', 0, U.fireFli, null, [
                ['', CrownFire.fliInit, [
                    'site.canopy.fuel.foliar.moistureContent',
                    'site.canopy.crown.baseHeight']]]],
                    
            // Intermediate
            ['crown.fire.initiation.transitionRatio', 0, U.ratio, null, [
                ['', CrownFire.transitionRatio, [
                    'crown.fire.surface.firelineIntensity',
                    'crown.fire.initiation.firelineIntensity']]]],

            // Output only
            ['crown.fire.initiation.canTransition', 0, U.yesno, null, [
                ['', CrownFire.canTransition, [
                    'crown.fire.initiation.transitionRatio']]]],

            // Output only
            ['crown.fire.initiation.flameLength', 0, U.fireFlame, null, [
                ['', SurfaceFire.flameLength, [
                    'crown.fire.initiation.firelineIntensity']]]],

            // Intermediate
            ['crown.fire.initiation.spreadRate',  0, U.fireRos, null, [
                ['', CrownFire.rInit, [
                    'crown.fire.initiation.firelineIntensity',
                    'crown.fire.surface.heatPerUnitArea']]]],
            
            // Intermediate
            ['crown.fire.initiation.oActive', 0, U.windSpeed, [
                ['', CrownFire.oActive, [
                    'site.canopy.fuel.bulkDensity',
                    'crown.canopy.fuel.fire.reactionIntensity',
                    'crown.canopy.fuel.bed.heatSink',
                    'crown.canopy.fuel.fire.slope.phi']]]],
                    
            // Output only
            ['crown.fire.initiation.crowningIndex', 0, U.factor, null, [
                ['', CrownFire.crowningIndex, [
                    'crown.fire.initiation.oActive']]]],

            // Output only
            ['crown.fire.initiation.type', CrownFire.Surface, U.crownInitType, null, [
                ['', CrownFire.type, [
                    'crown.fire.initiation.transitionRatio',
                    'crown.fire.initiation.activeRatio']]]],

            // Output only
            ['crown.fire.initiation.isActiveCrownFire', 0, U.yesno, null, [
                ['', CrownFire.isActive, [
                    'crown.fire.initiation.transitionRatio',
                    'crown.fire.initiation.activeRatio']]]],

            // Output only
            ['crown.fire.initiation.isCrownFire',  0, U.yesno, null, [
                ['', CrownFire.isCrown, [
                    'crown.fire.initiation.transitionRatio',
                    'crown.fire.initiation.activeRatio']]]],

            // Output only
            ['crown.fire.initiation.isPassiveCrownFire', 0, U.yesno, null, [
                ['', CrownFire.isPassive, [
                    'crown.fire.initiation.transitionRatio',
                    'crown.fire.initiation.activeRatio']]]],

            // Output only
            ['crown.fire.initiation.isConditionalCrownFire', 0, U.yesno, null, [
                ['', CrownFire.isConditional, [
                    'crown.fire.initiation.transitionRatio',
                    'crown.fire.initiation.activeRatio']]]],

            // Output only
            ['crown.fire.initiation.isSurfaceFire', 0, U.yesno, null, [
                ['', CrownFire.isSurface, [
                    'crown.fire.initiation.transitionRatio',
                    'crown.fire.initiation.activeRatio']]]],

            //------------------------------------------------------------------
            // Final fire behavior (Scott & Reinhardt)
            //------------------------------------------------------------------

            // According to Scott & Reinhardt, this is the
            // "critical open wind speed at 20-ft that leads to cronw fire activity
            // for a set of site charactersitcis, surface, and canopy fuel
            // characteristics, and fuel moisture conditions."
            //
            // Probably better to move rSa and oActive nodes the Surface
            ['crown.fire.final.rSa', 0, U.fireRos,  null, [
                ['', CrownFire.rSa, [
                    'crown.fire.initiation.oActive',    // depends on crown/canopy/fuel/bed|fire chars
                    'surface.primary.fuel.bed.noWindNoSlope.spreadRate',
                    'surface.primary.fuel.fire.windSpeedAdjustmentFactor',
                    'surface.primary.fuel.fire.wind.factor.b',
                    'surface.primary.fuel.fire.wind.factor.k',
                    'surface.primary.fuel.fire.slope.phi']]]],

            ['crown.fire.final.crownFractionBurned', 0, U.fraction, null, [
                ['', CrownFire.crownFractionBurned, [
                    'surface.primary.fuel.fire.spreadRate',
                    'crown.fire.initiation.spreadRate',
                    'crown.fire.final.rSa']]]],

            ['crown.fire.final.spreadRate', 0, U.fireRos, null, [
                ['', CrownFire.rFinal, [
                    'surface.primary.fuel.fire.spreadRate',
                    'crown.fire.active.spreadRate',
                    'crown.fire.final.crownFractionBurned']]]],

            ['crown.fire.final.firelineIntensity', 0, U.fireFli, null, [
                ['', CrownFire.fliFinal, [
                    'crown.fire.final.spreadRate',
                    'crown.fire.final.crownFractionBurned',
                    'site.canopy.fire.heatPerUnitArea',
                    'crown.fire.surface.heatPerUnitArea']]]],

            ['crown.fire.final.flameLength', 0, U.fireFlame, null, [
                ['', CrownFire.flameLengthThomas, [
                    'crown.fire.final.firelineIntensity']]]],

            ['crown.fire.final.size.area', 0, U.fireArea, null, [
                ['', CrownFire.area, [
                    'crown.fire.final.size.length',
                    'crown.fire.active.lengthToWidthRatio']]]],

            ['crown.fire.final.size.length', 0, U.fireDist, null, [
                ['', FireEllipse.spreadDistance, [
                    'crown.fire.final.spreadRate',
                    'site.fire.time.sinceIgnition']]]],

            ['crown.fire.final.size.perimeter', 0, U.fireDist, null, [
                ['', CrownFire.perimeter, [
                    'crown.fire.final.size.length',
                    'crown.fire.active.lengthToWidthRatio']]]],

            ['crown.fire.final.size.width', 0, U.fireDist, null, [
                ['', Calc.divide, [
                    'crown.fire.final.size.length',
                    'crown.fire.active.lengthToWidthRatio']]]],
                    
            ['crown.fire.final.map.area', 0, U.mapArea, null, [
                ['', FireEllipse.mapArea, [
                    'crown.fire.final.size.area',
                    'site.map.scale']]]],

            ['crown.fire.final.map.length', 0, U.mapDist, null, [
                ['', Calc.divide, [
                    'crown.fire.final.size.length',
                    'site.map.scale']]]],

            ['crown.fire.final.map.perimeter', 0, U.mapDist, null, [
                ['', Calc.divide, [
                    'crown.fire.final.size.perimeter',
                    'site.map.scale']]]],

            ['crown.fire.final.map.width', 0, U.mapDist, null, [
                ['', Calc.divide, [
                    'crown.fire.final.size.width',
                    'site.map.scale']]]],
        ]
    }
}
