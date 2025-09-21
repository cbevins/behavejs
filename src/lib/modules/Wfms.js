/**
 * Wfms is the Wildland Fire Modeling System for Javascript.
 * It assembles the node definitions of all Modules comprising the
 * Behave Fire Behavior Modeling System into a Dag.
 */
import {Dag} from '../index.js'
import {Paths as P} from './Paths.js'
import {CanopyModule} from './CanopyModule.js'
import {CanopyConfig} from './CanopyConfig.js'
import {ConstantsModule} from './ConstantsModule.js'
import {DeadFuelMoistureModule} from './DeadFuelMoistureModule.js'
import {DeadFuelMoistureConfig} from './DeadFuelMoistureConfig.js'
import {LiveFuelCuringModule} from './LiveFuelCuringModule.js'
import {LiveFuelCuringConfig} from './LiveFuelCuringConfig.js'
import {LiveFuelMoistureModule} from './LiveFuelMoistureModule.js'
import {LiveFuelMoistureConfig} from './LiveFuelMoistureConfig.js'
import {MidflameWindSpeedConfig} from './MidflameWindSpeedConfig.js'
import {MidflameWindSpeedModule} from './MidflameWindSpeedModule.js'
import {SlopeDirectionModule} from './SlopeDirectionModule.js'
import {SlopeDirectionConfig} from './SlopeDirectionConfig.js'
import {SlopeSteepnessModule} from './SlopeSteepnessModule.js'
import {SlopeSteepnessConfig} from './SlopeSteepnessConfig.js'
import {SurfaceFireModule} from './SurfaceFireModule.js'
import {SurfaceFireConfig} from './SurfaceFireConfig.js'
import {SurfaceFireWtgModule} from './SurfaceFireWtgModule.js'
import {SurfaceFireWtgConfig} from './SurfaceFireWtgConfig.js'
import {StandardFuelModelModule} from './StandardFuelModelModule.js'
import {PrimaryStandardFuelModelConfig, SecondaryStandardFuelModelConfig} from './StandardFuelModelConfig.js'
import {SurfaceFuelModule} from './SurfaceFuelModule.js'
import {PrimarySurfaceFuelConfig, SecondarySurfaceFuelConfig} from './SurfaceFuelConfig.js'
import {WindDirectionModule} from './WindDirectionModule.js'
import {WindDirectionConfig} from './WindDirectionConfig.js'
import {WindSpeedModule} from './WindSpeedModule.js'
import {WindSpeedConfig} from './WindSpeedConfig.js'
import {WindSpeedReductionModule} from './WindSpeedReductionModule.js'
import {WindSpeedReductionConfig} from './WindSpeedReductionConfig.js'

export class Wfms {
    constructor() {
        this.configMap = new Map()
        this._createDag()
    }

    //--------------------------------------------------------------------------
    // Public methods
    //--------------------------------------------------------------------------

    configs() { return this.configMap.values() }

    // Reconfigures a Dag nodeMap from current Node cfg references
    // Client accesses this method by calling:
    //      setConfig([[key, value],[key, value]...])
    // which updates this.configMap with the passed values, then calls this method.
    setConfig(items) {
        if (!Array.isArray(items))
            throw new Error(`setConfig() arg must be an array of [key,value] arrays`)
        for(let i=0; i<items.length; i++) {
            const item = items[i]
            if (!Array.isArray(item) || item.length !==2)
                throw new Error(`setConfig() arg array element ${i} must be an array of [key,value]`)
            const [key, value] = item
            if (this.configMap.has(key)) {
                const cfg = this.configMap.get(key)
                cfg.value = value
            } else {
                console.log(`WARNING FROM setConfig(): config key ${key} has not been defined`)
            }
        }
        this.dag.configure()
    }

    //--------------------------------------------------------------------------
    // Private methods
    //--------------------------------------------------------------------------

    _createDag() {
        // Get each Module's node defs and store names of shared nodes

        // CanopyModule produces 2 nodes referenced by the WindSpeedReductionModule
        // and ??? nodes by the CanopyFireModule
        const canopyCfg = this._addCfg(new CanopyConfig())
        const canopyMod = new CanopyModule('', canopyCfg)
        const canopySheltersNode = canopyMod.path + P.canopyShelters
        const canopyWsrfNode = canopyMod.path + P.canopyWsrf

        const constantsMod = new ConstantsModule('')

        // DeadFuelMoistureModel produces 3 nodes referenced used by the StandardFuelModelModule
        const deadmoisCfg = this._addCfg(new DeadFuelMoistureConfig())
        const deadmoisMod = new DeadFuelMoistureModule('weather/', deadmoisCfg)
        const mois1hNode = deadmoisMod.path + P.moisDead1
        const mois10hNode = deadmoisMod.path + P.moisDead10
        const mois100hNode = deadmoisMod.path + P.moisDead100

        // LiveFuelMoistureModel produces 2 node referenced by the StandardFuelModelModule
        // and 1 of them is also referenced by the LiveFuelCuringModule
        const livemoisCfg = this._addCfg(new LiveFuelMoistureConfig())
        const livemoisMod = new LiveFuelMoistureModule('weather/', livemoisCfg)
        const moisHerbNode = livemoisMod.path + P.moisLiveHerb  // Referenced by LiveFuelCuringModule
        const moisStemNode = livemoisMod.path + P.moisLiveStem

        // SlopeDirectionModule produces 1 node referenced by the SurfaceFireModule
        const slpdirCfg = this._addCfg(new SlopeDirectionConfig())
        const slpdirMod = new SlopeDirectionModule('terrain/', slpdirCfg)
        const upslopeDirNode = slpdirMod.path + P.slopeUp

        // SlopeSteepnessModule produces 1 node referenced by the SurfaceFireModule
        const slpsteepCfg = this._addCfg(new SlopeSteepnessConfig())
        const slpsteepMod = new SlopeSteepnessModule('terrain/', slpsteepCfg)
        const slopeRatioNode = slpsteepMod.path + P.slopeRatio

        // WindSpeedModule produces 1 node referenced by the MidflameWindSpeedModule
        const windspdCfg = this._addCfg(new WindSpeedConfig())
        const windspdMod = new WindSpeedModule('weather/', windspdCfg)
        const windAt20ftNode = windspdMod.path + P.wspd20ft

        // WindDirectionModule produces 1 node referenced by the SurfaceFireModule
        // and references 1 node from the SlopeDirectionModule
        const winddirCfg = this._addCfg(new WindDirectionConfig())
        const winddirMod = new WindDirectionModule('weather/', winddirCfg,
            upslopeDirNode)
        const wdirUpNode = winddirMod.path + P.wdirHeadFromUp

        // LiveFuelCuringModule produces 1 node referenced by the StandardFuelModelModule
        // and references 1 node produced by the LiveFuelMoistureModule
        const curingCfg = this._addCfg(new LiveFuelCuringConfig())
        const curingMod = new LiveFuelCuringModule('weather/', curingCfg,
            moisHerbNode)
        const curedNode = curingMod.path + P.curingApplied

        // NOTE: If a site has primary and secondary fuels,
        // it may have 2 different midflame windspeeds (due to bed depth differences),
        // but both fuel share the same terrain, weather, moisture, and curing parms.

        // StandardFuelModelModule produces lots of nodes referenced by the SurfaceFuelModule,
        // and references 3 nodes from the DeadFuelMoistureModule, 2 nodes from the
        // LiveFuelMoistureModule, and 1 node from the LiveFuelCuringModule.
        // Need separate primary and secondary instances as they may use different fuel models
        const stdCfg1 = this._addCfg(new PrimaryStandardFuelModelConfig())
        const stdMod1 = new StandardFuelModelModule('primary/model/', stdCfg1,
            mois1hNode, mois10hNode, mois100hNode, moisHerbNode, moisStemNode, curedNode)

        const stdCfg2 = this._addCfg(new SecondaryStandardFuelModelConfig())
        const stdMod2 = new StandardFuelModelModule('secondary/model/', stdCfg2,
            mois1hNode, mois10hNode, mois100hNode, moisHerbNode, moisStemNode, curedNode)

        // SurfaceFuelModule produces
        // Need separate primary and secondary instances as they may use different fuel model domains
        const bedCfg1 = this._addCfg(new PrimarySurfaceFuelConfig())
        const bedMod1 = new SurfaceFuelModule('primary/', bedCfg1,
            stdMod1.path, '', '', '')
        const bedWsrfNode1 = bedMod1.path + P.fuelWsrf

        const bedCfg2 = this._addCfg(new SecondarySurfaceFuelConfig())
        const bedMod2 = new SurfaceFuelModule('secondary/', bedCfg2,
            stdMod2.path, '', '', '')
        const bedWsrfNode2 = bedMod2.path + P.fuelWsrf

        // WindSpeedReductionModule produces 1 node referenced by the MidflameWindSpeedModule
        // and references 2 nodes from the CanopyModule and 1 node from the SurfaceFuelModule.
        // Need separate primary and secondary instances since this module requires fuel bed depth
        const wsrfCfg = this._addCfg(new WindSpeedReductionConfig())  // Primary and secondary use the same Config instance
        const wsrfMod1 = new WindSpeedReductionModule('primary/', wsrfCfg,
            canopySheltersNode, canopyWsrfNode, bedWsrfNode1)
        const wsrfFactorNode1 = wsrfMod1.path + P.wsrfMidflame

        const wsrfMod2 = new WindSpeedReductionModule('secondary/', wsrfCfg,
            canopySheltersNode, canopyWsrfNode, bedWsrfNode1)
        const wsrfFactorNode2 = wsrfMod2.path + P.wsrfMidflame
        
        // MidflameWindSpeedModule produces 1 node referenced by the SurfaceFireModule
        // and references 1 node from the WindSpeedModule and 1 node from the WindSpeedReductionModule
        // Need separate primary and secondary instances since this module requires fuel bed wsrf
        const midflameCfg = this._addCfg(new MidflameWindSpeedConfig())  // Primary and secondary use the same Config instance
        const midflameMod1 = new MidflameWindSpeedModule('primary/', midflameCfg,
            windAt20ftNode, wsrfFactorNode1)
        const midflameNode1 = midflameMod1.path + P.midflame

        const midflameMod2 = new MidflameWindSpeedModule('secondary/', midflameCfg,
            windAt20ftNode, wsrfFactorNode2)
        const midflameNode2 = midflameMod2.path + P.midflame

        // SurfaceFireModule
        const fireCfg = this._addCfg(new SurfaceFireConfig())
        const fireMod1 = new SurfaceFireModule('primary/', fireCfg,
            bedMod1.path, slopeRatioNode, upslopeDirNode, midflameNode1, wdirUpNode)
        const fireMod2 = new SurfaceFireModule('secondary/', fireCfg,
            bedMod2.path, slopeRatioNode, upslopeDirNode, midflameNode2, wdirUpNode)

        // SurfaceFireWtgModule
        const wtgCfg = this._addCfg(new SurfaceFireWtgConfig())
        const wtgMod = new SurfaceFireWtgModule('surface/', wtgCfg,
            fireMod1.path, fireMod2.path)
        
        // Create the this.dag from here so we can garbage collect the nodeDefs
        this.dag = new Dag([
            // independent modules requiring no shared nodes as input
            ...constantsMod.nodes,
            ...canopyMod.nodes,
            ...deadmoisMod.nodes,
            ...livemoisMod.nodes,
            ...windspdMod.nodes,
            ...slpsteepMod.nodes,
            ...slpdirMod.nodes,
            // independent modules requiring shared nodes as input
            ...winddirMod.nodes,
            // SurfaceModule modules
            ...curingMod.nodes,
            ...stdMod1.nodes,
            ...bedMod1.nodes,
            ...wsrfMod1.nodes,
            ...midflameMod1.nodes,
            ...fireMod1.nodes,
            ...stdMod2.nodes,
            ...bedMod2.nodes,
            ...wsrfMod2.nodes,
            ...midflameMod2.nodes,
            ...fireMod2.nodes,
            ...wtgMod.nodes,
        ].sort((a, b) => { return a.key - b.key }), 'Behave')

        const mods = [
            constantsMod, canopyMod, curingMod, deadmoisMod, livemoisMod,
            slpsteepMod, slpdirMod, winddirMod, windspdMod,
            stdMod1, bedMod1, wsrfMod1, midflameMod1, fireMod1,
            stdMod2, bedMod2, wsrfMod2, midflameMod2, fireMod2,
        ]
        // for(let mod of mods) console.log(mod.path, mod.nodes.length)
    }

    _addCfg(cfg) {
        this.configMap.set(cfg.key, cfg)
        return cfg
    }
}