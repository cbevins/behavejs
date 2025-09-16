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
import {StandardFuelModelModule} from './StandardFuelModelModule.js'
import {StandardFuelModelConfig} from './StandardFuelModelConfig.js'
import {SurfaceFuelModule} from './SurfaceFuelModule.js'
import {SurfaceFuelConfig} from './SurfaceFuelConfig.js'
import {WindDirectionModule} from './WindDirectionModule.js'
import {WindDirectionConfig} from './WindDirectionConfig.js'
import {WindSpeedModule} from './WindSpeedModule.js'
import {WindSpeedConfig} from './WindSpeedConfig.js'
import {WindSpeedReductionModule} from './WindSpeedReductionModule.js'
import {WindSpeedReductionConfig} from './WindSpeedReductionConfig.js'

export class BehaveModule {
    // NOTE: If a site has 2 fuel models, it may have 2 different midflame
    // windspeeds (dure to fuel depth difference),
    // but both fuel share the same terrain, weather, moisture, and curing parms.
    constructor() {
        // Define each Module's nodes and store names of shared nodes

        // CanopyModule produces 2 nodes referenced by the WindSpeedReductionModule
        // and ??? nodes by the CanopyFireModule
        const canopyCfg = new CanopyConfig('canopyHeightInputs')
        const canopyMod = new CanopyModule('', canopyCfg)
        const canopySheltersNode = canopyMod.path + P.canopyShelters
        const canopyWsrfNode = canopyMod.path + P.canopyWsrf

        const constantsMod = new ConstantsModule('')

        // DeadFuelMoistureModel produces 3 nodes referenced used by the StandardFuelModelModule
        const deadmoisCfg = new DeadFuelMoistureConfig('deadFuelMoistureInputs')
        const deadmoisMod = new DeadFuelMoistureModule('weather/', deadmoisCfg)
        const mois1hNode = deadmoisMod.path + P.moisDead1
        const mois10hNode = deadmoisMod.path + P.moisDead10
        const mois100hNode = deadmoisMod.path + P.moisDead100

        // LiveFuelMoistureModel produces 2 node referenced by the StandardFuelModelModule
        // and 1 of them is also referenced by the LiveFuelCuringModule
        const livemoisCfg = new LiveFuelMoistureConfig('liveFuelMoistureInputs')
        const livemoisMod = new LiveFuelMoistureModule('weather/', livemoisCfg)
        const moisHerbNode = livemoisMod.path + P.moisLiveHerb
        const moisStemNode = livemoisMod.path + P.moisLiveStem

        // SlopeDirectionModule produces 1 node referenced by the SurfaceFireModule
        const slpdirCfg = new SlopeDirectionConfig('slopeDirectionInputs')
        const slpdirMod = new SlopeDirectionModule('terrain/', slpdirCfg)
        const upslopeDirNode = slpdirMod.path + P.slopeUp

        // SlopeSteepnessModule produces 1 node referenced by the SurfaceFireModule
        const slpsteepCfg = new SlopeSteepnessConfig('slopeSteepnessInputs')
        const slpsteepMod = new SlopeSteepnessModule('terrain/', slpsteepCfg)
        const slopeRatioNode = slpsteepMod.path + P.slopeRatio

        // WindSpeedModule produces 1 node referenced by the MidflameWindSpeedModule
        const windspdCfg = new WindSpeedConfig('windSpeedInputs')
        const windspdMod = new WindSpeedModule('weather/', windspdCfg)
        const windAt20ftNode = windspdMod.path + P.wspd20ft

        // WindDirectionModule produces 1 node referenced by the SurfaceFireModule
        const winddirCfg = new WindSpeedConfig('windDiretcionInputs')
        const winddirMod = new WindSpeedModule('weather/', winddirCfg)
        const wdirUpNode = winddirMod.path + P.wdirSourceFromUp

        // LiveFuelCuringModule produces 1 node referenced by the StandardFuelModelModule
        // and references 1 node produced by the LiveFuelMoistureModule
        const curingCfg = new LiveFuelCuringConfig('liveFuelMoistureInputs')
        const curingMod = new LiveFuelCuringModule('weather/', curingCfg, moisHerbNode)
        const curedNode = curingMod.path + P.curingApplied

        // StandardFuelModelModule produces lots of nodes referenced by the SurfaceFuelModule,
        // and references 3 nodes from the DeadFuelMoistureModule, 2 nodes from the
        // LiveFuelMoistureModule, and 1 node from the LiveFuelCuringModule.
        const stdCfg1 = new StandardFuelModelConfig('primaryStandardModelInputs')
        const stdMod1 = new StandardFuelModelModule('primary/model/', stdCfg1,
            mois1hNode, mois10hNode, mois100hNode, moisHerbNode, moisStemNode, curedNode)

        // SurfaceFuelModule produces
        const bedCfg1 = new SurfaceFuelConfig('primarySurfaceFuelDomain')
        const bedMod1 = new SurfaceFuelModule('primary/', bedCfg1, stdMod1.path, '', '', '')
        const wsrfFuelNode1 = bedMod1.path + P.fuelWsrf

        // WindSpeedReductionModule produces 1 node referenced by the MidflameWindSpeedModule
        // and references 2 nodes from the CanopyModule and 1 node from the SurfaceFuelModule.
        const wsrfCfg = new WindSpeedReductionConfig('windSpeedReductionInputs')
        const wsrfMod1 = new WindSpeedReductionModule('primary/', wsrfCfg,
            canopySheltersNode, canopyWsrfNode, wsrfFuelNode1)
        const wsrfFactorNode1 = wsrfMod1.path + P.wsrfMidflame

        // MidflameWindSpeedModule produces 1 node referenced by the SurfaceFireModule
        // and references 1 node from the WindSpeedModule and 1 node from the WindSpeedReductionModule
        const midflameCfg = new MidflameWindSpeedConfig('midflameInputs')
        const midflameMod1 = new MidflameWindSpeedModule('primary/', midflameCfg,
            windAt20ftNode, wsrfFactorNode1)
        const midflameNode1 = midflameMod1.path + P.midflame

        // SurfaceFireModule
        const fireCfg1 = new SurfaceFireConfig('primarySurfaceFireLimit')
        const fireMod1 = new SurfaceFireModule('primary/', fireCfg1, bedMod1.path,
            slopeRatioNode, upslopeDirNode, midflameNode1, wdirUpNode)

        this.nodes = [
            // independent modules (have no shared nodes as input)
            ...constantsMod.nodes,
            ...canopyMod.nodes,
            ...deadmoisMod.nodes,
            ...livemoisMod.nodes,
            ...windspdMod.nodes,
            ...winddirMod.nodes,
            ...slpsteepMod.nodes,
            ...slpdirMod.nodes,

            ...curingMod.nodes,
            ...stdMod1.nodes,
            ...bedMod1.nodes,
            ...wsrfMod1.nodes,
            ...midflameMod1.nodes,
            ...fireMod1.nodes,
        ]
    }
}