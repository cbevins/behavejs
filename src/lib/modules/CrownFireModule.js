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
    constructor(prefix, cfg,
            canopyPath,     // CanopyModule.path
            primaryPath,    // SurfaceFireModule path
            weightedPath,   // SurfaceFireWtg.path
            mapPath,        // MapModule.path
            crownFuelPath,  // CrownFuelModule.path
            crownFirePath,  // CrownFireModule.path
            windSpeedPath,
            timePath,       // 
            observedPath,   // ObservedFireModule.path with P.fireHpua and P.fireFli nodes
        ) {
        super(prefix, P.crownFireSelf, P.crownFireMod, cfg)

        //----------------------------------------------------------------------
        // Identify the required nodes from each Module
        //----------------------------------------------------------------------

        const canopyModMois = moisPath   + P.canopyMois         // 'site.canopy.fuel.foliar.moistureContent'
        const canopyModBulk = canopyPath + P.canopyBulk         // 'site.canopy.fuel.bulkDensity'
        const canopyModHpua = canopyPath + P.canopyHpua         // 'site.canopy.fire.heatPerUnitArea'
        const canopyModBase = canopypath + P.canopyBase         // 'site.canopy.crown.baseHeight'
        
        const mapModScale   = mapPath + P.mapScale              // 'site.map.scale'
        
        const crownModRos   = crownFirePath + P.fireRos         // 'crown.canopy.fuel.fire.spreadRate'
        const crownModRxi   = crownFirePath + P.fireRxi         // 'crown.canopy.fuel.fire.reactionIntensity',
        const crownModSink  = crownFuelPath + P.fuelSink        // 'crown.canopy.fuel.bed.heatSink',
        const crownModPhiS  = crownFirePath + P.firePhiS        // 'crown.canopy.fuel.fire.slope.phi']]]],

        const obsModFli     = weightedPath  + P.fireFli         // 'site.fire.observed.firelineIntensity'
        const obsModHpua    = weightedPath  + P.fireHpua        // 'site.fire.observed.heatPerUnitArea'

        const windMod20ft   = windSpeedPath + P.wspd20ft        // 'site.wind.speed.at20ft'
        
        const wtdModFli     = weightedPath + P.fireFli          // 'surface.weighted.fire.firelineIntensity'
        const wtdModHpua    = weightedPath + P.fireHpua         // 'surface.weighted.fire.heatPerUnitArea'

        const primModRos    = primaryPath + P.fireHeadRos       // 'surface.primary.fuel.fire.spreadRate'
        const primModRos0   = primaryPath + P.firep1 + P.fireRos    // 'surface.primary.fuel.bed.noWindNoSlope.spreadRate'
        const primModPhiS   = primaryPath + P.firep1 + P.firePhiS   // 'surface.primary.fuel.fire.slope.phi'
        const primModWsrf   = primaryPath + P.wsrfFactor        // 'surface.primary.fuel.fire.windSpeedAdjustmentFactor'
        const primModB      = primaryPath + P.fireWindB         // 'surface.primary.fuel.fire.wind.factor.b',
        const primModK      = primaryPath + P.fireWindK         // 'surface.primary.fuel.fire.wind.factor.k',

        const elapsedTime   = timePath + P.fireTime             // 'site.fire.time.sinceIgnition'

        //----------------------------------------------------------------------
        // Define the Rothermel 'active crown fire' node keys
        // S&R call Rothermel's crown fire spread rate 'Ractive'
        //----------------------------------------------------------------------
        const active = this.path + P.crownActive
        const activeFli = active + P.fireFli                    // 'crown.fire.active.firelineIntensity'
        const activeHpua = active + P.fireHpua                  // 'crown.fire.active.heatPerUnitArea'
        const activeRos = active + P.fireRos                    // 'crown.fire.active.spreadRate'
        const activeFlame = active + P.fireFlame                // 'crown.fire.active.flameLength'
        const activeFirePow = active + P.crownPowerFire         // 'crown.fire.active.powerOfTheFire'
        const activeWindPow = active + P.crownPowerWind         // 'crown.fire.active.powerOfTheWind'
        const activePowerRatio = active + P.crownPowerRatio     // 'crown.fire.active.powerRatio'
        const activePlumeDom = active + P.crownTypePlume        // 'crown.fire.active.isPlumeDominated'
        const activeWindDriven = active + P.crownTypeWind       // 'crown.fire.active.isWindDriven'
        
        const activeLength = active + 'size/length'             // 'crown.fire.active.size.length'
        const activeLwr = active + P.fireLwr                    // 'crown.fire.active.lengthToWidthRatio'
        const activeWidth = active + 'size/width'               // 'crown.fire.active.size.width'
        const activePerim = active + 'size/perimeter'           // 'crown.fire.active.size.perimeter'
        const activeArea = active + 'size/area'                 // 'crown.fire.active.size.area'
        
        const activeMapLength = active + 'map/length'           // 'crown.fire.active.map.length'
        const activeMapWidth = active + 'map/width'             // 'crown.fire.active.map.width'
        const activeMapPerim = active + 'map/perimeter'         // 'crown.fire.active.map.perimeter'
        const activeMapArea = active + 'map/area'               // 'crown.fire.active.map.area'

        //----------------------------------------------------------------------
        // Define the nodes linked to SurfaceFireWtgModule or ObservedFireModule
        //----------------------------------------------------------------------
        const surface = this.path + 'surface/'
        const surfaceHpua = surface + P.fireHpua                // 'crown.fire.surface.heatPerUnitArea'
        const surfaceFli = surface + P.fireFli                  // 'crown.fire.surface.firelineIntensity'

        const activeNodes = [
            // Surface fire HPUA is used by:
            //  - RCR for 'crown.fire.active.heatPerUnitArea'
            //  - S&R for 'crown.fire.final.firelineIntensity'
            //  - S&R for 'crown.fire.initiation.spreadRate'
            [surfaceHpua, 0, U.fireHpua, cfg, [                 // 'crown.fire.surface.heatPerUnitArea'
                [cfg.surface, Dag.assign, [wtdModHpua]],        // 'surface.weighted.fire.firelineIntensity'
                [cfg.any, Dag.assign, [obsModHpua]]]],          // 'site.fire.observed.firelineIntensity'

            //------------------------------------------------------------------
            // Rothermel crown fire assumes a fully 'active' crown fire. Inputs are:
            //  - surface fire heat per unit area
            //  - canopy fuel  heat per unit area
            //  - canopy spread rate for FM10, 0.4*wind20, no slope, and fuel moistures
            //    (which in turn requires fuel moistures and FM10)
            //------------------------------------------------------------------

            //------------------------------------------------------------------
            // Rothermel crown fire behavior
            //------------------------------------------------------------------

            [activeHpua, 0, U.fireHpua, null, [     // 'crown.fire.active.heatPerUnitArea'
                ['', CrownFire.hpuaActive, [
                    canopyModHpua,                  // 'site.canopy.fire.heatPerUnitArea'
                    surfaceHpua]]]],                // 'crown.fire.surface.heatPerUnitArea'
            
            [activeRos, 0, U.fireRos, null, [       // 'crown.fire.active.spreadRate'
                ['', CrownFire.rActive, [
                    crownModRos]]]],                // 'crown.canopy.fuel.fire.spreadRate'

            [activeFli, 0, U.fireFli, null, [       // 'crown.fire.active.firelineIntensity'
                ['', CrownFire.fliActive, [
                    activeHpua,                     // 'crown.fire.active.heatPerUnitArea',
                    activeRos]]]],                  // 'crown.fire.active.spreadRate'

            [activeFlame, 0, U.fireFlame, null, [   // 'crown.fire.active.flameLength'
                ['', CrownFire.flameLengthThomas, [
                    activeFli]]]],                  // 'crown.fire.active.firelineIntensity'

            [activeFirePow, 0, U.firePower, null, [ // 'crown.fire.active.powerOfTheFire'
                ['', CrownFire.powerOfTheFire, [
                    activeFli]]]],                  // 'crown.fire.active.firelineIntensity'

            [activeWindPow, 0, U.windPower, null, [ // 'crown.fire.active.powerOfTheWind'
                ['', CrownFire.powerOfTheWind, [
                    windMod20ft,                    // 'site.wind.speed.at20ft'
                    activeRos]]]],                  // 'crown.fire.active.spreadRate'

            [activePowerRatio, 0, U.ratio, [        // 'crown.fire.active.powerRatio'
                ['', Calc.divide, [
                    activeFirePow,                  // 'crown.fire.active.powerOfTheFire'
                    activeWindPow]]]],              // 'crown.fire.active.powerOfTheWind'

            [activePlumeDom, 0, U.yesno, null [     // 'crown.fire.active.isPlumeDominated'
                ['', CrownFire.isPlumeDominated, [
                    activePowerRatio]]]],           // 'crown.fire.active.powerRatio'

            [activeWindDriven, 0, U.yesno, null, [  // 'crown.fire.active.isWindDriven'
                ['', CrownFire.isWindDriven, [
                    activePowerRatio]]]],           // 'crown.fire.active.powerRatio'

            //------------------------------------------------------------------
            // Rothermel crown fire size, shape, and growth
            //------------------------------------------------------------------
            
            [activeLwr, 1, U.fireLwr, null, [       // 'crown.fire.active.lengthToWidthRatio'
                ['', CrownFire.lengthToWidthRatio, [
                    windMod20ft]]]],                // 'site.wind.speed.at20ft'

            [activeArea, 0, U.fireArea, null, [     // 'crown.fire.active.size.area'
                ['', CrownFire.area, [
                    activeLength,                   // 'crown.fire.active.size.length'
                    activeLwr]]]],                  // 'crown.fire.active.lengthToWidthRatio'

            [activeLength, 0, U.fireDist, null, [   // 'crown.fire.active.size.length'
                ['', FireEllipse.spreadDistance, [
                    activeRos,                      // 'crown.fire.active.spreadRate'
                    elapsedTime]]]],                // 'site.fire.time.sinceIgnition'

            [activePerim, 0, U.fireDist, null, [    // 'crown.fire.active.size.perimeter'
                ['', CrownFire.perimeter, [
                    activeLength,                   // 'crown.fire.active.size.length'
                    activeLwr]]]],                  // 'crown.fire.active.lengthToWidthRatio'

            [activeWidth, 0, U.fireDist, null, [    // 'crown.fire.active.size.width'
                ['', Calc.divide, [
                    activeLength,                   // 'crown.fire.active.size.length'
                    activeLwr]]]],                  // 'crown.fire.active.lengthToWidthRatio'

            [activeMapArea, 0, U.mapArea, null, [   // 'crown.fire.active.map.area'
                ['', FireEllipse.mapArea, [
                    activeArea,                     // 'crown.fire.active.size.area',
                    mapModScale]]]],                // 'site.map.scale'

            [activeMapLength, 0, U.mapDist, null, [ // 'crown.fire.active.map.length'
                ['', Calc.divide, [
                    activeLength,                   // 'crown.fire.active.size.length',
                    mapModScale]]]],                // 'site.map.scale'

            [activeMapPerim, 0, U.mapDist, null, [  // 'crown.fire.active.map.perimeter'
                ['', Calc.divide, [
                    activePerim,                    // 'crown.fire.active.size.perimeter',
                    mapModScale]]]],                // 'site.map.scale'

            [activeMapWidth, 0, U.mapDist, null, [  // 'crown.fire.active.map.width'
                ['', Calc.divide, [
                    activeWidth,                    // 'crown.fire.active.size.width',
                    mapModScale]]]],                // 'site.map.scale'
        ]

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
        
        // Define crown fire *initiation* phase nodes
        const crit = this.path + 'critical/'
        const critActiveRos = crit + 'active/' + P.fireRos      // 'crown.fire.initiation.rPrime' R'-active
        const critRosRatio = crit + 'spread rate/ratio'         // 'crown.fire.initiation.activeRatio'
        const critSurfFli = crit + 'surface/' + P.fireFli       // 'crown.fire.initiation.firelineIntensity', I'-initiation
        const critSurfFlame = crit + 'surface/' + P.fireFlame   // 'crown.fire.initiation.flameLength'
        const critSurfRos = crit + 'surface/' + P.fireRos       // 'crown.fire.initiation.spreadRate'
        const critTransRatio = crit + 'transition/ratio'        // 'crown.fire.initiation.transitionRatio'
        const critWind20ft = crit + 'wind/speed/' + P.wspd20ft  // 'crown.fire.initiation.oActive'
        const crowningIndex = 'crowning index'                  // 'crown.fire.initiation.crowningIndex'

        const type = this.path + 'type/'                        // 'crown.fire.initiation.type'
        const crownFireType = this.path + 'type/'               // 'crown.fire.initiation.type'
        const canTransition = type + 'can transition'           // 'crown.fire.initiation.canTransition'
        const isActive = type + 'is active crown fire'          // 'crown.fire.initiation.isActiveCrownFire'
        const isCrown = type + 'is crown fire'                  // 'crown.fire.initiation.isCrownFire'
        const isPassive = type + 'is passive crown fire'        // 'crown.fire.initiation.isPassiveCrownFire'
        const isConditional = type + 'is conditional crown fire'// 'crown.fire.initiation.isConditionalCrownFire'
        const isSurface = type + 'is surface fire'              // 'crown.fire.initiation.isSurfaceFire'

        const final = this.path + 'final/'
        const finalRsa = final + 'Rsa'                          // 'crown.fire.final.rSa'
        const finalRos = final + P.fireRos                      // 'crown.fire.final.spreadRate'
        const finalCfb = final + 'crown fraction burned'        // 'crown.fire.final.crownFractionBurned'
        const finalFlame = final + P.fireFlame                  // 'crown.fire.final.flameLength'
        const finalFli = final + P.fireFli                      // 'crown.fire.final.firelineIntensity'

        const finalLength = final + 'size/length'               // 'crown.fire.final.size.length'
        const finalWidth = final + 'size/width'                 // 'crown.fire.final.size.width'
        const finalPerim = final + 'size/perimeter'             // 'crown.fire.final.size.perimeter'
        const finalArea = final + 'size/area'                   // 'crown.fire.final.size.area'
        const finalMapLength = final + 'map/length'             // 'crown.fire.final.map.length'
        const finalMapWidth = final + 'map/width'               // 'crown.fire.final.map.width'
        const finalMapPerim = final + 'map/perimeter'           // 'crown.fire.final.map.perimeter'
        const finalMapArea = final + 'map/area'                 // 'crown.fire.final.map.area'

        const finalNodes = [
            // Surface fireline intensity is used by S&R for 'crown.fire.initiation.transitionRatio'
            [surfaceFli, 0, U.fireFli, cfg, [                // 'crown.fire.surface.firelineIntensity'
                [cfg.surface, Dag.assign, [wtgPath + P.fireFli]],
                [cfg.any, Dag.assign, [ellPath + P.headFli]]]],

            //------------------------------------------------------------------
            // initiation and transition variables
            //------------------------------------------------------------------

            // Intermediate
            // S&R's R-prime-active, the critical (minimum) canopy spread rate for *active* crowning
            [critActiveRos, 0, U.fireRos, null, [       // 'crown.fire.initiation.rPrime' R-prime-active
                ['', CrownFire.rPrimeActive, [
                    canopyModBulk]]]],                  // 'site.canopy.fuel.bulkDensity'

            // Intermediate
            [critRosRatio, 0, U.ratio, [                // 'crown.fire.initiation.activeRatio'
                ['', CrownFire.activeRatio, [
                    activeRos,                          // 'crown.fire.active.spreadRate' R-active
                    critActiveRos]]]],                  // 'crown.fire.initiation.rPrime' R-prime-active

            // Intermediate
            [critSurfFli, 0, U.fireFli, null, [         // 'crown.fire.initiation.firelineIntensity'
                ['', CrownFire.fliInit, [
                    canopyModMois,                      // 'site.canopy.fuel.foliar.moistureContent'
                    canopyModBase]]]],                  // 'site.canopy.crown.baseHeight'
                    
            // Intermediate
            [critTransRatio, 0, U.ratio, null, [        // 'crown.fire.initiation.transitionRatio'
                ['', CrownFire.transitionRatio, [
                    surfaceFli,                         // 'crown.fire.surface.firelineIntensity'
                    critSurfFli]]]],                    // 'crown.fire.initiation.firelineIntensity'

            // Output only
            [canTransition, 0, U.yesno, null, [         // 'crown.fire.initiation.canTransition'
                ['', CrownFire.canTransition, [
                    critTransRatio]]]],                 // 'crown.fire.initiation.transitionRatio'

            // Output only
            [critSurfFlame, 0, U.fireFlame, null, [     // 'crown.fire.initiation.flameLength'
                ['', SurfaceFire.flameLength, [
                    critSurfFli]]]],                    // 'crown.fire.initiation.firelineIntensity'

            // Intermediate
            // S&R's R-prime-initiation
            [critSurfRos,  0, U.fireRos, null, [        // 'crown.fire.initiation.spreadRate'
                ['', CrownFire.rInit, [
                    critSurfFli,                        // 'crown.fire.initiation.firelineIntensity'
                    surfaceHpua]]]],                    // 'crown.fire.surface.heatPerUnitArea'
            
            // Intermediate
            // According to Scott & Reinhardt, this is O-prime-active, the
            // "critical open windspeed at 20-ft for sustaining fully active crown fire
            [critWind20ft, 0, U.windSpeed, [            // 'crown.fire.initiation.oActive'
                ['', CrownFire.oActive, [
                    canopyModBulk,                      // 'site.canopy.fuel.bulkDensity',
                    crownModRxi,                        // 'crown.canopy.fuel.fire.reactionIntensity',
                    crownModSink,                       // 'crown.canopy.fuel.bed.heatSink',
                    crownModPhiS]]]],                   // 'crown.canopy.fuel.fire.slope.phi'
                    
            // Output only
            [crowningIndex, 0, U.factor, null, [        // 'crown.fire.initiation.crowningIndex'
                ['', CrownFire.crowningIndex, [
                    critWind20ft]]]],                   // 'crown.fire.initiation.oActive'

            // Output only
            [crownFireType, CrownFire.Surface, U.crownInitType, null, [ // 'crown.fire.initiation.type'
                ['', CrownFire.type, [
                    critTransRatio,                     // 'crown.fire.initiation.transitionRatio'
                    critRosRatio]]]],                   // 'crown.fire.initiation.activeRatio'

            // Output only
            [isActive, 0, U.yesno, null, [              // 'crown.fire.initiation.isActiveCrownFire'
                ['', CrownFire.isActive, [
                    critTransRatio,                     // 'crown.fire.initiation.transitionRatio'
                    critRosRatio]]]],                   // 'crown.fire.initiation.activeRatio'

            // Output only
            [isCrown,  0, U.yesno, null, [              // 'crown.fire.initiation.isCrownFire'
                ['', CrownFire.isCrown, [
                    critTransRatio,                     // 'crown.fire.initiation.transitionRatio'
                    critRosRatio]]]],                   // 'crown.fire.initiation.activeRatio'

            // Output only
            [isPassive, 0, U.yesno, null, [             // 'crown.fire.initiation.isPassiveCrownFire'
                ['', CrownFire.isPassive, [
                    critTransRatio,                     // 'crown.fire.initiation.transitionRatio'
                    critRosRatio]]]],                   // 'crown.fire.initiation.activeRatio'

            // Output only
            [isConditional, 0, U.yesno, null, [         // 'crown.fire.initiation.isConditionalCrownFire'
                ['', CrownFire.isConditional, [
                    critTransRatio,                     // 'crown.fire.initiation.transitionRatio'
                    critRosRatio]]]],                   // 'crown.fire.initiation.activeRatio'

            // Output only
            [isSurface, 0, U.yesno, null, [             // 'crown.fire.initiation.isSurfaceFire'
                ['', CrownFire.isSurface, [
                    critTransRatio,                     // 'crown.fire.initiation.transitionRatio'
                    critRosRatio]]]],                   // 'crown.fire.initiation.activeRatio'

            //------------------------------------------------------------------
            // Final fire behavior (Scott & Reinhardt)
            //------------------------------------------------------------------

            // According to Scott & Reinhardt, this is the "predicted surface fire
            // spread rate that corresponds to the environmental conditions for
            // which R-active = R'active" (p41)
            [finalRsa, 0, U.fireRos,  null, [           // 'crown.fire.final.rSa'
                ['', CrownFire.rSa, [
                    critWind20ft,                       // 'crown.fire.initiation.oActive'
                    primModRos0,                        // 'surface.primary.fuel.bed.noWindNoSlope.spreadRate',
                    primModWsrf,                        // 'surface.primary.fuel.fire.windSpeedAdjustmentFactor'
                    primModB,                           // 'surface.primary.fuel.fire.wind.factor.b'
                    primModK,                           // 'surface.primary.fuel.fire.wind.factor.k'
                    primModPhiS]]]],                    // 'surface.primary.fuel.fire.slope.phi'

            [finalCfb, 0, U.fraction, null, [           // 'crown.fire.final.crownFractionBurned'
                ['', CrownFire.crownFractionBurned, [
                    primModRos,                         // 'surface.primary.fuel.fire.spreadRate'
                    critSurfRos,                        // 'crown.fire.initiation.spreadRate'
                    finalRsa]]]],                       // 'crown.fire.final.rSa'

            [finalRos, 0, U.fireRos, null, [            // 'crown.fire.final.spreadRate'
                ['', CrownFire.rFinal, [
                    primModRos,                         // 'surface.primary.fuel.fire.spreadRate',
                    activeRos,                          // 'crown.fire.active.spreadRate'
                    finalCfb]]]],                       // 'crown.fire.final.crownFractionBurned'

            [finalFli, 0, U.fireFli, null, [            // 'crown.fire.final.firelineIntensity'
                ['', CrownFire.fliFinal, [
                    finalRos,                           // 'crown.fire.final.spreadRate'
                    finalCfb,                           // 'crown.fire.final.crownFractionBurned'
                    canopyModHpua,                      // 'site.canopy.fire.heatPerUnitArea'
                    surfaceHpua]]]],                    // 'crown.fire.surface.heatPerUnitArea'

            [finalFlame, 0, U.fireFlame, null, [        // 'crown.fire.final.flameLength'
                ['', CrownFire.flameLengthThomas, [
                    finalFli]]]],                       // 'crown.fire.final.firelineIntensity'

            [finalArea, 0, U.fireArea, null, [          // 'crown.fire.final.size.area'
                ['', CrownFire.area, [
                    finalLength,                        // 'crown.fire.final.size.length'
                    activeLwr]]]],                      // 'crown.fire.active.lengthToWidthRatio'

            [finalLength, 0, U.fireDist, null, [
                ['', FireEllipse.spreadDistance, [
                    finalRos,                           // 'crown.fire.final.spreadRate'
                    elapsedTime]]]],                    // 'site.fire.time.sinceIgnition'

            [finalPerim, 0, U.fireDist, null, [         // 'crown.fire.final.size.perimeter'
                ['', CrownFire.perimeter, [
                    finalLength,                        // 'crown.fire.final.size.length'
                    activeLwr]]]],                      // 'crown.fire.active.lengthToWidthRatio'

            [finalWidth, 0, U.fireDist, null, [         // 'crown.fire.final.size.width'
                ['', Calc.divide, [
                    finalLength,                        // 'crown.fire.final.size.length'
                    activeLwr]]]],                      // 'crown.fire.active.lengthToWidthRatio'
                    
            [finalMapArea, 0, U.mapArea, null, [        // 'crown.fire.final.map.area'
                ['', FireEllipse.mapArea, [
                    finalArea,                          // 'crown.fire.final.size.area'
                    mapModScale]]]],

            [finalMapLength, 0, U.mapDist, null, [      // 'crown.fire.final.map.length
                ['', Calc.divide, [
                    finalLength,                        // 'crown.fire.final.size.length'
                    mapModScale]]]],

            [finalMapPerim, 0, U.mapDist, null, [       // 'crown.fire.final.map.perimeter'
                ['', Calc.divide, [
                    finalPerim,                         // 'crown.fire.final.size.perimeter'
                    mapModScale]]]],

            [finalMapWidth, 0, U.mapDist, null, [       // 'crown.fire.final.map.width'
                ['', Calc.divide, [
                    finalWidth,                         // 'crown.fire.final.size.width'
                    mapModScale]]]],
        ]

        this.nodes = [...activeNodes, ...finalNodes]
    }
}
