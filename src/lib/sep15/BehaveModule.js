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
import {WindDirectionModule} from './WindDirectionModule.js'
import {WindDirectionConfig} from './WindDirectionConfig.js'
import {WindSpeedModule} from './WindSpeedModule.js'
import {WindSpeedConfig} from './WindSpeedConfig.js'
import {WindSpeedReductionModule} from './WindSpeedReductionModule.js'
import {WindSpeedReductionConfig} from './WindSpeedReductionConfig.js'

export class BehaveModule {
    constructor() {
        // Define each Module's nodes and store names of shared nodes
        const canopyCfg = new CanopyConfig('canopyHeightInputs')
        const canopyMod = new CanopyModule('', canopyCfg)
        const canopySheltersNode = canopyMod.path + P.canopyShelters
        const canopyWsrfNode = canopyMod.path + P.canopyWsrf

        const constantsMod = new ConstantsModule('')

        const deadmoisCfg = new DeadFuelMoistureConfig('deadFuelMoistureInputs')
        const deadmoisMod = new DeadFuelMoistureModule('weather/', deadmoisCfg)

        const livemoisCfg = new LiveFuelMoistureConfig('liveFuelMoistureInputs')
        const livemoisMod = new LiveFuelMoistureModule('weather/', livemoisCfg)
        const herbmoisNode = livemoisMod.path + P.moisLiveHerb

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

        const midflameCfg = new MidflameWindSpeedConfig('midflameInputs')
        // const midflameMod = new MidflameWindSpeedModule('primary/', midflameCfg, windAt20ftNode, wsrfNode)
        // const midflameWind = midflameMod.psth + P.midflame

        const wsrfCfg = new WindSpeedReductionConfig('windSpeedReductionInputs')
        // const wsrfMod = new WindSpeedReductionModule('primary/', wsrfCfg, canopySheltersNode, canopWsrfNode, fuelWsrfNode)
        // const wsrfFactor = wsrfMod.path + P.wsrfMidflame

        // Might make live curing specific to primary/secondary instead of shared
        const curingCfg = new LiveFuelCuringConfig('liveFuelMoistureInputs')
        const curingMod = new LiveFuelCuringModule('weather/', curingCfg, herbmoisNode)
        const curedNode = curingMod.path + P.curingApplied

        this.nodes = [
            ...canopyMod.nodes,
            ...constantsMod.nodes,
            ...deadmoisMod.nodes,
            ...livemoisMod.nodes,
            ...curingMod.nodes,
            ...windspdMod.nodes,
            ...winddirMod.nodes,
            ...slpsteepMod.nodes,
            ...slpdirMod.nodes,
        ]
    }
}