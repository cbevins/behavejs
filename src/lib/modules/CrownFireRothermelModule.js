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

export class CrownFireRothermelModule extends ModuleBase {
    constructor(prefix, cfg,
            canopyPath,     // CanopyModule.path
            weightedPath,   // SurfaceFireWtg.path
            crownFirePath,  // CrownFireModule.path
            windSpeedPath,
        ) {
        super(prefix, P.crownFireSelf, P.crownFireMod, cfg)
        const path = this.path

        // CanopyModule is product of canopy load and canopy heat
        const canopyModHpua = canopyPath + P.canopyHpua         // 'site.canopy.fire.heatPerUnitArea'
        // CrownFireRothermelModule 3.34*RoS(fm10)
        const crownModRos   = crownFirePath + P.fireRos         // 'crown.canopy.fuel.fire.spreadRate'
        const windMod20ft   = windSpeedPath + P.wspd20ft        // 'site.wind.speed.at20ft'

        // Surface fire HPUA is either linked to SurfaceFireWtgModule or input
        const wtdModHpua    = weightedPath + P.fireHpua         // 'surface.weighted.fire.heatPerUnitArea'
        // This will be linked to either the wtdModHpua or input
        const surfaceHpua = path + 'surface/' + P.fireHpua      // 'crown.fire.surface.heatPerUnitArea'

        const activeNodes = [
            [surfaceHpua, 0, U.fireHpua, cfg, [                 // 'crown.fire.surface.heatPerUnitArea'
                [cfg.surface, Dag.assign, [wtdModHpua]],        // 'surface.weighted.fire.firelineIntensity'
                [cfg.any, Dag.input, []]]],                     // 'site.fire.observed.firelineIntensity'

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

            [path+P.fireHpua, 0, U.fireHpua, null, [        // 'crown.fire.active.heatPerUnitArea'
                ['', CrownFire.hpuaActive, [
                    canopyModHpua,                          // 'site.canopy.fire.heatPerUnitArea'
                    surfaceHpua]]]],                        // 'crown.fire.surface.heatPerUnitArea'
            
            [path+P.fireRos, 0, U.fireRos, null, [          // 'crown.fire.active.spreadRate'
                ['', CrownFire.rActive, [
                    crownModRos]]]],                        // 'crown.canopy.fuel.fire.spreadRate'

            [path+P.fireFli, 0, U.fireFli, null, [          // 'crown.fire.active.firelineIntensity'
                ['', CrownFire.fliActive, [
                    path+P.fireHpua,                        // 'crown.fire.active.heatPerUnitArea',
                    path+P.fireRos]]]],                     // 'crown.fire.active.spreadRate'

            [path+P.fireFlame, 0, U.fireFlame, null, [      // 'crown.fire.active.flameLength'
                ['', CrownFire.flameLengthThomas, [
                    path+P.fireFli]]]],                     // 'crown.fire.active.firelineIntensity'

            [path+P.crownPowerFire, 0, U.firePower, null, [ // 'crown.fire.active.powerOfTheFire'
                ['', CrownFire.powerOfTheFire, [
                    path+P.fireFli]]]],                     // 'crown.fire.active.firelineIntensity'

            [path+P.crownPowerWind, 0, U.windPower, null, [ // 'crown.fire.active.powerOfTheWind'
                ['', CrownFire.powerOfTheWind, [
                    windMod20ft,                            // 'site.wind.speed.at20ft'
                    path+P.fireRos]]]],                     // 'crown.fire.active.spreadRate'

            [path+P.crownPowerRatio, 0, U.ratio, [          // 'crown.fire.active.powerRatio'
                ['', Calc.divide, [
                    path+P.crownPowerFire,                  // 'crown.fire.active.powerOfTheFire'
                    path+P.crownPowerWind]]]],              // 'crown.fire.active.powerOfTheWind'

            [path+P.crownTypePlume, 0, U.yesno, null [      // 'crown.fire.active.isPlumeDominated'
                ['', CrownFire.isPlumeDominated, [
                    path+P.crownPowerRatio]]]],             // 'crown.fire.active.powerRatio'

            [path+P.crownTypeWind, 0, U.yesno, null, [      // 'crown.fire.active.isWindDriven'
                ['', CrownFire.isWindDriven, [
                    path+P.crownPowerRatio]]]],             // 'crown.fire.active.powerRatio'
        ]
    }
}
