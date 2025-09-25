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

import {CanopyHeightConfig} from './CanopyHeightConfig.js'
import {DeadFuelMoistureConfig} from './DeadFuelMoistureConfig.js'
import {FireEffectiveWindLimitConfig} from './FireEffectiveWindLimitConfig.js'
import {FireEllipseLinkConfig} from './FireEllipseLinkConfig.js'
import {FireEllipseVectorConfig} from './FireEllipseVectorConfig.js'
import {LiveFuelCuringConfig} from './LiveFuelCuringConfig.js'
import {LiveFuelMoistureConfig} from './LiveFuelMoistureConfig.js'
import {MidflameWindSpeedConfig} from './MidflameWindSpeedConfig.js'
import {SlopeDirectionConfig} from './SlopeDirectionConfig.js'
import {SlopeSteepnessConfig} from './SlopeSteepnessConfig.js'
import {SurfaceFireWtgConfig} from './SurfaceFireWtgConfig.js'
import {SurfacePrimaryFuelConfig, SurfaceSecondaryFuelConfig} from './SurfaceFuelConfig.js'
import {SurfacePrimaryStandardConfig, SurfaceSecondaryStandardConfig} from './SurfaceStandardConfig.js'
import {WindDirectionConfig} from './WindDirectionConfig.js'
import {WindSpeedConfig} from './WindSpeedConfig.js'
import {WindSpeedReductionConfig} from './WindSpeedReductionConfig.js'

import {CanopyModule} from './CanopyModule.js'
import {ConstantsModule} from './ConstantsModule.js'
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
    constructor() {
        this.config = {}
        this.nodeDefs = []
        this._createConfigs()
        this._createNodeDefs()
    }

    //--------------------------------------------------------------------------
    // Private methods
    //--------------------------------------------------------------------------

    _createConfigs() {
        this.config = {
            canopy: {
                height: new CanopyHeightConfig(),
            },
            ellipse: {
                link: new FireEllipseLinkConfig(),
                vector: new FireEllipseVectorConfig(),
            },
            moisture: {
                dead: new DeadFuelMoistureConfig(),
                live: new LiveFuelMoistureConfig(),
            },
            slope: {
                direction: new SlopeDirectionConfig(),
                steepness: new SlopeSteepnessConfig(),
            },
            surface: {
                curing: new LiveFuelCuringConfig(),
                midflame: new MidflameWindSpeedConfig(),
                primary: {
                    fuel: new SurfacePrimaryFuelConfig(),
                    standard: new SurfacePrimaryStandardConfig(),
                },
                secondary: {
                    fuel: new SurfaceSecondaryFuelConfig(),
                    standard: new SurfaceSecondaryStandardConfig(),
                },
                weighting: new SurfaceFireWtgConfig(),
                windLimit: new FireEffectiveWindLimitConfig(),
                wsrf: new WindSpeedReductionConfig(),
            },
            wind: {
                direction: new WindDirectionConfig(),
                speed: new WindSpeedConfig(),
            }
        }
    }

    _createNodeDefs() {
        // Get each Module's node defs and store names of shared nodes

        // CanopyModule produces 2 nodes referenced by the WindSpeedReductionModule
        // and ??? nodes by the CanopyFireModule
        const canopyMod = this._add(new CanopyModule('', this.config.canopy.height))
        const canopySheltersNode = canopyMod.path + P.canopyShelters
        const canopyWsrfNode = canopyMod.path + P.canopyWsrf

        // ConstantsModule provides a 'zero' and a 'one' and some fuel types
        // to which other nodes can bind
        const constantsMod = this._add(new ConstantsModule('', this.config))

        // DeadFuelMoistureModel produces 3 nodes referenced used by the StandardFuelModelModule
        const deadmoisMod = this._add(new DeadFuelMoistureModule('weather/', this.config.moisture.dead))
        const mois1hNode = deadmoisMod.path + P.moisDead1
        const mois10hNode = deadmoisMod.path + P.moisDead10
        const mois100hNode = deadmoisMod.path + P.moisDead100

        // LiveFuelMoistureModel produces 2 node referenced by the StandardFuelModelModule
        // and 1 of them is also referenced by the LiveFuelCuringModule
        const livemoisMod = this._add(new LiveFuelMoistureModule('weather/', this.config.moisture.live))
        const moisHerbNode = livemoisMod.path + P.moisLiveHerb  // Referenced by LiveFuelCuringModule
        const moisStemNode = livemoisMod.path + P.moisLiveStem

        // MapModule has no configs
        const mapMod = this._add(new MapModule(''))
        const mapScaleNode = mapMod.path + P.mapScale

        // SlopeDirectionModule produces 1 node referenced by the SurfaceFireModule
        const slpdirMod = this._add(new SlopeDirectionModule('terrain/', this.config.slope.direction))
        const upslopeDirNode = slpdirMod.path + P.slopeUp
        
        // SlopeSteepnessModule produces 1 node referenced by the SurfaceFireModule
        const slpsteepMod = this._add(new SlopeSteepnessModule('terrain/', this.config.slope.steepness))
        const slopeRatioNode = slpsteepMod.path + P.slopeRatio

        // WindSpeedModule produces 1 node referenced by the MidflameWindSpeedModule
        const windspdMod = this._add(new WindSpeedModule('weather/', this.config.wind.speed))
        const windAt20ftNode = windspdMod.path + P.wspd20ft

        // WindDirectionModule produces 1 node referenced by the SurfaceFireModule
        // and references 1 node from the SlopeDirectionModule
        const winddirMod = this._add(new WindDirectionModule('weather/', this.config.wind.direction,
            upslopeDirNode))
        const wdirUpNode = winddirMod.path + P.wdirHeadFromUp

        // LiveFuelCuringModule produces 1 node referenced by the StandardFuelModelModule
        // and references 1 node produced by the LiveFuelMoistureModule
        const curingMod = this._add(new LiveFuelCuringModule('weather/', this.config.surface.curing,
            moisHerbNode))
        const curedNode = curingMod.path + P.curingApplied
        
        // NOTE: If a site has primary and secondary fuels,
        // it may have 2 different midflame windspeeds (due to bed depth differences),
        // but both fuel share the same terrain, weather, moisture, and curing parms.
        
        // StandardFuelModelModule produces lots of nodes referenced by the SurfaceFuelModule,
        // and references 3 nodes from the DeadFuelMoistureModule, 2 nodes from the
        // LiveFuelMoistureModule, and 1 node from the LiveFuelCuringModule.
        // Need separate primary and secondary instances as they may use different fuel models
        const stdMod1 = this._add(new StandardFuelModelModule('primary/model/', this.config.surface.primary.standard,
            mois1hNode, mois10hNode, mois100hNode, moisHerbNode, moisStemNode, curedNode))

        const stdMod2 = this._add(new StandardFuelModelModule('secondary/model/', this.config.surface.secondary.standard,
            mois1hNode, mois10hNode, mois100hNode, moisHerbNode, moisStemNode, curedNode))

        // SurfaceFuelModule produces
        // Need separate primary and secondary instances as they may use different fuel model domains
        const bedMod1 = this._add(new SurfaceFuelModule('primary/', this.config.surface.primary.fuel,
            stdMod1.path, '', '', ''))
        const bedWsrfNode1 = bedMod1.path + P.fuelWsrf

        const bedMod2 = this._add(new SurfaceFuelModule('secondary/', this.config.surface.secondary.fuel,
            stdMod2.path, '', '', ''))
        const bedWsrfNode2 = bedMod2.path + P.fuelWsrf

        // WindSpeedReductionModule produces 1 node referenced by the MidflameWindSpeedModule
        // and references 2 nodes from the CanopyModule and 1 node from the SurfaceFuelModule.
        // Need separate primary and secondary instances since this module requires fuel bed depth
        const wsrfMod1 = this._add(new WindSpeedReductionModule('primary/', this.config.surface.wsrf,
            canopySheltersNode, canopyWsrfNode, bedWsrfNode1))
        const wsrfFactorNode1 = wsrfMod1.path + P.wsrfMidflame

        const wsrfMod2 = this._add(new WindSpeedReductionModule('secondary/', this.config.surface.wsrf,
            canopySheltersNode, canopyWsrfNode, bedWsrfNode1))
        const wsrfFactorNode2 = wsrfMod2.path + P.wsrfMidflame
        
        // MidflameWindSpeedModule produces 1 node referenced by the SurfaceFireModule
        // and references 1 node from the WindSpeedModule and 1 node from the WindSpeedReductionModule
        // Need separate primary and secondary instances since this module requires fuel bed wsrf
        const midflameMod1 = this._add(new MidflameWindSpeedModule('primary/', this.config.surface.midflame,
            windAt20ftNode, wsrfFactorNode1))
        const midflameNode1 = midflameMod1.path + P.midflame
// for(let node of midflameMod1.nodes) console.log(node[0])
            
        const midflameMod2 = this._add(new MidflameWindSpeedModule('secondary/', this.config.surface.midflame,
            windAt20ftNode, wsrfFactorNode2))
        const midflameNode2 = midflameMod2.path + P.midflame
                
        // SurfaceFireModule
        const fireMod1 = this._add(new SurfaceFireModule('primary/', this.config.surface.windLimit,
            bedMod1.path, slopeRatioNode, upslopeDirNode, midflameNode1, wdirUpNode))

        const fireMod2 = this._add(new SurfaceFireModule('secondary/', this.config.surface.windLimit,
            bedMod2.path, slopeRatioNode, upslopeDirNode, midflameNode2, wdirUpNode))
                
        // SurfaceFireWtgModule
        const wtgMod = this._add(new SurfaceFireWtgModule('', this.config.surface.weighting,
            fireMod1.path, fireMod2.path))
                
        // FireEllipseModule
        const ellipseMod = this._add(new FireEllipseModule('', this.config.ellipse.link, this.config.ellipse.vector,
            wtgMod.path, canopyMod.path, upslopeDirNode, mapScaleNode))
    }
    _add(mod) {
        this.nodeDefs.push(...mod.nodes)
        return mod
    }
}