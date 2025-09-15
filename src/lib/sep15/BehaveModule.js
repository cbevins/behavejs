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
import {SlopeDirectionModule} from './SlopeDirectionModule.js'
import {SlopeDirectionConfig} from './SlopeDirectionConfig.js'
import {SlopeSteepnessModule} from './SlopeSteepnessModule.js'
import {SlopeSteepnessConfig} from './SlopeSteepnessConfig.js'
import {WindDirectionModule} from './WindDirectionModule.js'
import {WindDirectionConfig} from './WindDirectionConfig.js'
import {WindSpeedModule} from './WindSpeedModule.js'
import {WindSpeedConfig} from './WindSpeedConfig.js'

export class BehaveModule {
    constructor() {
        const canopyCfg = new CanopyConfig('canopyHeightInputs')
        const canopyMod = new CanopyModule('', canopyCfg)
        const constantsMod = new ConstantsModule('')
        const deadmoisCfg = new DeadFuelMoistureConfig('deadFuelMoistureInputs')
        const deadmoisMod = new DeadFuelMoistureModule('weather/', deadmoisCfg)
        const livemoisCfg = new LiveFuelMoistureConfig('liveFuelMoistureInputs')
        const livemoisMod = new LiveFuelMoistureModule('weather/', livemoisCfg)
        const slpdirCfg = new SlopeDirectionConfig('slopeDirectionInputs')
        const slpdirMod = new SlopeDirectionModule('terrain/', slpdirCfg)
        const slpsteepCfg = new SlopeSteepnessConfig('slopeSteepnessInputs')
        const slpsteepMod = new SlopeSteepnessModule('terrain/', slpsteepCfg)
        const windspdCfg = new WindSpeedConfig('windSpeedInputs')
        const windspdMod = new WindSpeedModule('weather/', windspdCfg)
        const winddirCfg = new WindSpeedConfig('windDiretcionInputs')
        const winddirMod = new WindSpeedModule('weather/', winddirCfg)

        const herbmoisKey = 'weather/' + livemoisMod.self + P.moisLiveHerb
        const curingCfg = new LiveFuelCuringConfig('liveFuelMoistureInputs')
        const curingMod = new LiveFuelCuringModule('weather/', curingCfg, herbmoisKey)
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