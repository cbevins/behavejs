/**
 * WfmsModule assembles all the sub-module configurations into a single object
 * that is passed to each sub-module on its creation. It then concatenates
 * the sub-module node definitions into a single array defining the
 * Wildland Fire Modeling System for Javascript.
 * 
 * The Wfms class then uses the configuration obhect and nodedefs array to
 * create it Dag.
 */
import {Dag} from '../index.js'
import {Paths as P} from './Paths.js'
import {WfmsConfig} from './WfmsConfig.js'

import {CanopyModule} from './CanopyModule.js'
import {ConstantsModule} from './ConstantsModule.js'
import {CrownFuelModule} from './CrownFuelModule.js'
import {DeadFuelMoistureModule} from './DeadFuelMoistureModule.js'
import {FireEllipseModule} from './FireEllipseModule.js'
import {LiveFuelCuringModule} from './LiveFuelCuringModule.js'
import {LiveFuelMoistureModule} from './LiveFuelMoistureModule.js'
import {MapModule} from './MapModule.js'
import {MidflameWindSpeedModule} from './MidflameWindSpeedModule.js'
import {SlopeDirectionModule} from './SlopeDirectionModule.js'
import {SlopeSteepnessModule} from './SlopeSteepnessModule.js'
import {SurfaceFireModule} from './SurfaceFireModule.js'
import {SurfaceFireWtgModule} from './SurfaceFireWtgModule.js'
import {StandardFuelModelModule} from './StandardFuelModelModule.js'
import {SurfaceFuelModule} from './SurfaceFuelModule.js'
import {WindDirectionModule} from './WindDirectionModule.js'
import {WindSpeedModule} from './WindSpeedModule.js'
import {WindSpeedReductionModule} from './WindSpeedReductionModule.js'

export class WfmsModule {
    constructor(wfmsConfig) {
        const cfg = wfmsConfig.configObj // contains a .configObj and a .configMap
        this.nodeDefs = []
        
        // Prefixes
        const none      = ''
        const primary   = 'primary/'
        const secondary = 'secondary/'
        const terrain   = 'terrain/'
        const weather   = 'weather/'

        // CanopyModule
        const canopyMod = this._add(new CanopyModule(none, cfg.canopy.height))

        // ConstantsModule provides a 'zero' and a 'one' and some fuel types
        // to which other nodes can bind
        const constantsMod = this._add(new ConstantsModule(none, cfg))

        // DeadFuelMoistureModel
        const deadmoisMod = this._add(new DeadFuelMoistureModule(weather, cfg.moisture.dead))

        // LiveFuelMoistureModel
        const livemoisMod = this._add(new LiveFuelMoistureModule(weather, cfg.moisture.live))

        // MapModule has no configs
        const mapMod = this._add(new MapModule(none))

        // SlopeDirectionModule
        const slpdirMod = this._add(new SlopeDirectionModule(terrain, cfg.slope.direction))
        
        // SlopeSteepnessModule
        const slpsteepMod = this._add(new SlopeSteepnessModule(terrain, cfg.slope.steepness))

        // WindSpeedModule
        const windspdMod = this._add(new WindSpeedModule(weather, cfg.wind.speed))

        // WindDirectionModule
        const winddirMod = this._add(new WindDirectionModule(weather, cfg.wind.direction,
            slpdirMod.path))

        // LiveFuelCuringModule
        const curingMod = this._add(new LiveFuelCuringModule(weather, cfg.surface.curing,
            livemoisMod.path))
        
        // NOTE: If a site has primary and secondary fuels,
        // they may have different fuel models, midflame windspeeds, and wind speed
        // // redction factors (due to bed depth differences),
        // but both fuels share the same terrain, weather, moisture, and curing parms.

        // Primary fuel
        const stdMod1 = this._add(new StandardFuelModelModule('primary/model/', cfg.surface.primary.standard,
            deadmoisMod.path, livemoisMod.path, curingMod.path))

        const bedMod1 = this._add(new SurfaceFuelModule(primary, cfg.surface.primary.fuel,
            stdMod1.path, none, none, none))

        const wsrfMod1 = this._add(new WindSpeedReductionModule(primary, cfg.surface.wsrf,
            canopyMod.path, bedMod1.path))

        const midflameMod1 = this._add(new MidflameWindSpeedModule(primary, cfg.surface.midflame,
            windspdMod.path, wsrfMod1.path))

        const fireMod1 = this._add(new SurfaceFireModule(primary, cfg.surface.windLimit,
            bedMod1.path, slpsteepMod.path, slpdirMod.path, midflameMod1.path, winddirMod.path))

        // Secondary fuel
        const stdMod2 = this._add(new StandardFuelModelModule('secondary/model/', cfg.surface.secondary.standard,
            deadmoisMod.path, livemoisMod.path, curingMod.path))

        const bedMod2 = this._add(new SurfaceFuelModule(secondary, cfg.surface.secondary.fuel,
            stdMod2.path, none, none, none))

        const wsrfMod2 = this._add(new WindSpeedReductionModule(secondary, cfg.surface.wsrf,
            canopyMod.path, bedMod2.path))
        
        const midflameMod2 = this._add(new MidflameWindSpeedModule(secondary, cfg.surface.midflame,
            windspdMod.path, wsrfMod2.path))

        const fireMod2 = this._add(new SurfaceFireModule(secondary, cfg.surface.windLimit,
            bedMod2.path, slpsteepMod.path, slpdirMod.path, midflameMod2.path, winddirMod.path))
                
        // SurfaceFireWtgModule
        const wtgMod = this._add(new SurfaceFireWtgModule(none, cfg.surface.weighting,
            fireMod1.path, fireMod2.path))
                
        // FireEllipseModule
        const ellipseMod = this._add(new FireEllipseModule(none, cfg.ellipse.link, cfg.ellipse.vector,
            wtgMod.path, canopyMod.path, slpdirMod.path, mapMod.path))

        // CrownFuelModule
        const crownFuelMod = this._add(new CrownFuelModule(none,
            deadmoisMod.path, livemoisMod.path))
    }
    _add(mod) {
        this.nodeDefs.push(...mod.nodes)
        return mod
    }
}