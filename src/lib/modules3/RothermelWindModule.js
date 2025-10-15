import { Units as U } from './Units.js'
import { DagModule, DagNode } from './DagItems.js'
import { Calc } from '../index.js'

export class RothermelWindModule extends DagModule {
    /**
     * 
     * @param {RothermelModule} parentMod 
     * @param {string} parentProp 'wind'
     * @param {RothermelFuelMod} fuelMod 
     * @param {windModule} windMod 
     * @param {CanopyModule} canopyMod 
     * @param {DagConfig} configMidflame 
     */
    constructor(parentMod, parentProp, fuelMod, windMod, canopyMod, configMidflame) {
        super(parentMod, parentProp)
        this._meta.mod = {fuelMod, windMod, canopyMod}
        this._meta.config = {configMidflame}

        this.midflame = new DagNode(this, 'midflame', U.windSpeed)
        this.wsrf  = new DagNode(this, 'wsrf', U.fraction)
    }

    config() {
        const {windMod, fuelMod, canopyMod} = this._meta.mod
        const {configMidflame:config} = this._meta.config

        if(config.value === config.input) {
            this.midflame.input(config)
        } else if(config.value === config.wsrf) {
            this.wsrf.input(config)
            this.midflame.use(Calc.multiply, [this.wsrf, windMod.speed.at20ft], config)
        } else if(config.value === config.fuelbed) {
            this.wsrf.bind(fuelMod.wsrf)
            this.midflame.use(Calc.multiply, [this.wsrf, windMod.speed.at20ft], config)
        } else if(config.value === config.canopy) {
            this.wsrf.bind(canopyMod.wsrf)
            this.midflame.use(Calc.multiply, [this.wsrf, windMod.speed.at20ft], config)
        }
    }
}
