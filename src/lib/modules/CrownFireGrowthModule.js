/**
 * @file Fire elliptical size and growth model.
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

export class CrownFireSize extends ModuleBase {
    constructor(prefix,
            cfg,
            crownFirePath,  // CrownFireRothermelModule.path or CrownFireSRModule.path
            mapPath,        // MapModule.path
            windSpeedPath   // WindSpeedModule.path
        ) {
        super(prefix, P.crownFireGrowthSelf, P.crownFireGrowthMod, cfg)
        const path = this.path

        // Inputs
        const crownModRos = crownFirePath + P.fireRos
        const mapModScale = mapPath + P.mapScale              // 'site.map.scale'
        const windMod20ft = windSpeedPath + P.wspd20ft        // 'site.wind.speed.at20ft'
        
        this.nodes = [
            [path+P.fireTime, 0, U.fireTime, null, [
                ['', Dag.input, []]]],
            
            [path+P.fireLwr, 1, U.fireLwr, null, [      // 'crown.fire.active.lengthToWidthRatio'
                ['', CrownFire.lengthToWidthRatio, [
                    windMod20ft]]]],                    // 'site.wind.speed.at20ft'

            [path+P.sizeArea, 0, U.fireArea, null, [    // 'crown.fire.active.size.area'
                ['', CrownFire.area, [
                    path+P.sizeLength,                  // 'crown.fire.active.size.length'
                    path+P.fireLwr]]]],                 // 'crown.fire.active.lengthToWidthRatio'

            [path+P.sizeLength, 0, U.fireDist, null, [  // 'crown.fire.active.size.length'
                ['', Calc.multiply, [
                    crownModRos,                        // 'crown.fire.active.spreadRate'
                    path+P.fireTime]]]],                // 'site.fire.time.sinceIgnition'

            [path+P.sizePerim, 0, U.fireDist, null, [   // 'crown.fire.active.size.perimeter'
                ['', CrownFire.perimeter, [
                    path+P.sizeLength,                  // 'crown.fire.active.size.length'
                    path+P.fireLwr]]]],                 // 'crown.fire.active.lengthToWidthRatio'

            [path+P.sizeWidth, 0, U.fireDist, null, [   // 'crown.fire.active.size.width'
                ['', Calc.divide, [
                    path+P.sizeLength,                   // 'crown.fire.active.size.length'
                    path+P.fireLwr]]]],                  // 'crown.fire.active.lengthToWidthRatio'

            [path+P.mapArea, 0, U.mapArea, null, [      // 'crown.fire.active.map.area'
                ['', FireEllipse.mapArea, [
                    path+P.mapArea,                     // 'crown.fire.active.size.area',
                    mapModScale]]]],                    // 'site.map.scale'

            [path+P.mapLength, 0, U.mapDist, null, [    // 'crown.fire.active.map.length'
                ['', Calc.divide, [
                    path+P.mapLength,                   // 'crown.fire.active.size.length',
                    mapModScale]]]],                    // 'site.map.scale'

            [path+P.mapPerim, 0, U.mapDist, null, [     // 'crown.fire.active.map.perimeter'
                ['', Calc.divide, [
                    path+P.mapPerim,                    // 'crown.fire.active.size.perimeter',
                    mapModScale]]]],                    // 'site.map.scale'

            [path+P.mapWidth, 0, U.mapDist, null, [     // 'crown.fire.active.map.width'
                ['', Calc.divide, [
                    path+P.mapWidth,                    // 'crown.fire.active.size.width',
                    mapModScale]]]],                    // 'site.map.scale'
        ]
    }
}