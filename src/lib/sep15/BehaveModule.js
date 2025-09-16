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
import {StandardFuelModelModule} from './StandardFuelModelModule.js'
import {StandardFuelModelConfig} from './StandardFuelModelConfig.js'
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
        const canopyCfg = new CanopyConfig('canopyHeightInputs')
        const canopyMod = new CanopyModule('', canopyCfg)
        const canopySheltersNode = canopyMod.path + P.canopyShelters
        const canopyWsrfNode = canopyMod.path + P.canopyWsrf

        const constantsMod = new ConstantsModule('')

        const deadmoisCfg = new DeadFuelMoistureConfig('deadFuelMoistureInputs')
        const deadmoisMod = new DeadFuelMoistureModule('weather/', deadmoisCfg)
        const mois1hNode = deadmoisMod.path + P.moisDead1
        const mois10hNode = deadmoisMod.path + P.moisDead10
        const mois100hNode = deadmoisMod.path + P.moisDead100

        const livemoisCfg = new LiveFuelMoistureConfig('liveFuelMoistureInputs')
        const livemoisMod = new LiveFuelMoistureModule('weather/', livemoisCfg)
        const moisHerbNode = livemoisMod.path + P.moisLiveHerb
        const moisStemNode = livemoisMod.path + P.moisLiveStem

        const slpdirCfg = new SlopeDirectionConfig('slopeDirectionInputs')
        const slpdirMod = new SlopeDirectionModule('terrain/', slpdirCfg)
        const upslopeDirNode = slpdirMod.path + P.slopeUp

        const slpsteepCfg = new SlopeSteepnessConfig('slopeSteepnessInputs')
        const slpsteepMod = new SlopeSteepnessModule('terrain/', slpsteepCfg)
        const slopeRatioNode = slpsteepMod.path + P.slopeRatio

        const windspdCfg = new WindSpeedConfig('windSpeedInputs')
        const windspdMod = new WindSpeedModule('weather/', windspdCfg)
        const windAt20ftNode = windspdMod.path + P.wspd20ft

        const winddirCfg = new WindSpeedConfig('windDiretcionInputs')
        const winddirMod = new WindSpeedModule('weather/', winddirCfg)
        const wdirFromUp = winddirMod.path + P.wdirSourceFromUp

        // Might make live curing specific to primary/secondary instead of shared
        const curingCfg = new LiveFuelCuringConfig('liveFuelMoistureInputs')
        const curingMod = new LiveFuelCuringModule('weather/', curingCfg, moisHerbNode)
        const curedNode = curingMod.path + P.curingApplied

        const stdCfg1 = new StandardFuelModelConfig('primaryStandardModelInputs')
        const stdMod1 = new StandardFuelModelModule('primary/model', stdCfg1,
            mois1hNode, mois10hNode, mois100hNode,
            moisHerbNode, moisStemNode, curedNode)

        const wsrfCfg = new WindSpeedReductionConfig('windSpeedReductionInputs')
        // const wsrfMod = new WindSpeedReductionModule('primary/', wsrfCfg, canopySheltersNode, canopWsrfNode, fuelWsrfNode)
        // const wsrfFactor = wsrfMod.path + P.wsrfMidflame

        const midflameCfg = new MidflameWindSpeedConfig('midflameInputs')
        // const midflameMod = new MidflameWindSpeedModule('primary/', midflameCfg, windAt20ftNode, wsrfNode)
        // const midflameWind = midflameMod.psth + P.midflame

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
        ]
    }
}