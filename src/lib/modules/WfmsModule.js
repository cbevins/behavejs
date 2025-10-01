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

        // Get each Module's node defs and store names of shared nodes

        // CanopyModule produces 2 nodes referenced by the WindSpeedReductionModule
        // and ??? nodes by the CanopyFireModule
        const canopyMod = this._add(new CanopyModule(none, cfg.canopy.height))
        const canopySheltersNode = canopyMod.path + P.canopyShelters
        const canopyWsrfNode = canopyMod.path + P.canopyWsrf

        // ConstantsModule provides a 'zero' and a 'one' and some fuel types
        // to which other nodes can bind
        const constantsMod = this._add(new ConstantsModule(none, cfg))

        // DeadFuelMoistureModel produces 3 nodes referenced used by the StandardFuelModelModule
        const deadmoisMod = this._add(new DeadFuelMoistureModule(weather, cfg.moisture.dead))
        const mois1hNode = deadmoisMod.path + P.moisDead1
        const mois10hNode = deadmoisMod.path + P.moisDead10
        const mois100hNode = deadmoisMod.path + P.moisDead100

        // LiveFuelMoistureModel produces 2 node referenced by the StandardFuelModelModule
        // and 1 of them is also referenced by the LiveFuelCuringModule
        const livemoisMod = this._add(new LiveFuelMoistureModule(weather, cfg.moisture.live))
        const moisHerbNode = livemoisMod.path + P.moisLiveHerb  // Referenced by LiveFuelCuringModule
        const moisStemNode = livemoisMod.path + P.moisLiveStem

        // MapModule has no configs
        const mapMod = this._add(new MapModule(none))
        const mapScaleNode = mapMod.path + P.mapScale

        // SlopeDirectionModule produces 1 node referenced by the SurfaceFireModule
        const slpdirMod = this._add(new SlopeDirectionModule(terrain, cfg.slope.direction))
        const upslopeDirNode = slpdirMod.path + P.slopeUp
        
        // SlopeSteepnessModule produces 1 node referenced by the SurfaceFireModule
        const slpsteepMod = this._add(new SlopeSteepnessModule(terrain, cfg.slope.steepness))
        const slopeRatioNode = slpsteepMod.path + P.slopeRatio

        // WindSpeedModule produces 1 node referenced by the MidflameWindSpeedModule
        const windspdMod = this._add(new WindSpeedModule(weather, cfg.wind.speed))
        const windAt20ftNode = windspdMod.path + P.wspd20ft

        // WindDirectionModule produces 1 node referenced by the SurfaceFireModule
        // and references 1 node from the SlopeDirectionModule
        const winddirMod = this._add(new WindDirectionModule(weather, cfg.wind.direction,
            upslopeDirNode))
        const wdirUpNode = winddirMod.path + P.wdirHeadFromUp

        // LiveFuelCuringModule produces 1 node referenced by the StandardFuelModelModule
        // and references 1 node produced by the LiveFuelMoistureModule
        const curingMod = this._add(new LiveFuelCuringModule(weather, cfg.surface.curing,
            moisHerbNode))
        const curedNode = curingMod.path + P.curingApplied
        
        // NOTE: If a site has primary and secondary fuels,
        // it may have 2 different midflame windspeeds (due to bed depth differences),
        // but both fuel share the same terrain, weather, moisture, and curing parms.
        
        // StandardFuelModelModule produces lots of nodes referenced by the SurfaceFuelModule,
        // and references 3 nodes from the DeadFuelMoistureModule, 2 nodes from the
        // LiveFuelMoistureModule, and 1 node from the LiveFuelCuringModule.
        // Need separate primary and secondary instances as they may use different fuel models
        const stdMod1 = this._add(new StandardFuelModelModule('primary/model/', cfg.surface.primary.standard,
            mois1hNode, mois10hNode, mois100hNode, moisHerbNode, moisStemNode, curedNode))

        const stdMod2 = this._add(new StandardFuelModelModule('secondary/model/', cfg.surface.secondary.standard,
            mois1hNode, mois10hNode, mois100hNode, moisHerbNode, moisStemNode, curedNode))

        // SurfaceFuelModule produces
        // Need separate primary and secondary instances as they may use different fuel model domains
        const bedMod1 = this._add(new SurfaceFuelModule(primary, cfg.surface.primary.fuel,
            stdMod1.path, none, none, none))
        const bedWsrfNode1 = bedMod1.path + P.fuelWsrf

        const bedMod2 = this._add(new SurfaceFuelModule(secondary, cfg.surface.secondary.fuel,
            stdMod2.path, none, none, none))
        const bedWsrfNode2 = bedMod2.path + P.fuelWsrf

        // WindSpeedReductionModule produces 1 node referenced by the MidflameWindSpeedModule
        // and references 2 nodes from the CanopyModule and 1 node from the SurfaceFuelModule.
        // Need separate primary and secondary instances since this module requires fuel bed depth
        const wsrfMod1 = this._add(new WindSpeedReductionModule(primary, cfg.surface.wsrf,
            canopySheltersNode, canopyWsrfNode, bedWsrfNode1))
        const wsrfFactorNode1 = wsrfMod1.path + P.wsrfMidflame

        const wsrfMod2 = this._add(new WindSpeedReductionModule(secondary, cfg.surface.wsrf,
            canopySheltersNode, canopyWsrfNode, bedWsrfNode1))
        const wsrfFactorNode2 = wsrfMod2.path + P.wsrfMidflame
        
        // MidflameWindSpeedModule produces 1 node referenced by the SurfaceFireModule
        // and references 1 node from the WindSpeedModule and 1 node from the WindSpeedReductionModule
        // Need separate primary and secondary instances since this module requires fuel bed wsrf
        const midflameMod1 = this._add(new MidflameWindSpeedModule(primary, cfg.surface.midflame,
            windAt20ftNode, wsrfFactorNode1))
        const midflameNode1 = midflameMod1.path + P.midflame
// for(let node of midflameMod1.nodes) console.log(node[0])
            
        const midflameMod2 = this._add(new MidflameWindSpeedModule(secondary, cfg.surface.midflame,
            windAt20ftNode, wsrfFactorNode2))
        const midflameNode2 = midflameMod2.path + P.midflame
                
        // SurfaceFireModule
        const fireMod1 = this._add(new SurfaceFireModule(primary, cfg.surface.windLimit,
            bedMod1.path, slopeRatioNode, upslopeDirNode, midflameNode1, wdirUpNode))

        const fireMod2 = this._add(new SurfaceFireModule(secondary, cfg.surface.windLimit,
            bedMod2.path, slopeRatioNode, upslopeDirNode, midflameNode2, wdirUpNode))
                
        // SurfaceFireWtgModule
        const wtgMod = this._add(new SurfaceFireWtgModule(none, cfg.surface.weighting,
            fireMod1.path, fireMod2.path))
                
        // FireEllipseModule
        const ellipseMod = this._add(new FireEllipseModule(none, cfg.ellipse.link, cfg.ellipse.vector,
            wtgMod.path, canopyMod.path, upslopeDirNode, mapScaleNode))

        // CrownFuelModule
        const crownFuelMod = this._add(new CrownFuelModule('crown/canopy/fuel/',
            mois1hNode, mois10hNode, mois100hNode, moisStemNode))
    }
    _add(mod) {
        this.nodeDefs.push(...mod.nodes)
        return mod
    }
}