import { Units as U } from './Units.js'
import { DagModule, DagNode } from './DagItems.js'
import { RothermelFireModule } from './RothermelFireModule.js'
import { RothermelFuelModule } from './RothermelFuelModule.js'
import { RothermelWindModule } from './RothermelWindModule.js'

export class RothermelModule extends DagModule {
    /**
     * 
     * @param {*} parentMod 
     * @param {*} parentProp 
     * @param {*} moistureMod 
     * @param {*} windMod 
     * @param {*} slopeMod 
     * @param {*} canopyMod 
     * @param {*} configWindLimit 
     * @param {*} configMidflame 
     * @param {*} configFuelDomain 
     * @param {*} configCuring 
     */
    constructor(parentMod, parentProp,
            moistureMod, windMod, slopeMod, canopyMod,
            configWindLimit, configMidflame, configFuelDomain, configCuring) {
        super(parentMod, parentProp)
        this._meta.config = {configCuring, configFuelDomain, configMidflame, configWindLimit}
        this._meta.mod = {canopyMod, moistureMod, slopeMod, windMod}

        this.fuel = new RothermelFuelModule(this, 'fuel',
            moistureMod,        // FuelMoistureMod
            configFuelDomain,   // DagConfig
            configCuring)       // DagConfig

        this.wind = new RothermelWindModule(this, 'wind',
            this.fuel,          // RothermelFuelModule
            windMod,            // WindModule
            canopyMod,          // CanopyModule
            configMidflame)     // DagConfig

        this.fire = new RothermelFireModule(this, 'fire',
            this.fuel,          // RothermelFuelModule
            this.wind,          // RothermelWindModule
            windMod,            // WindModule
            slopeMod,           // SlopeModule
            configWindLimit)    // DagCOnfig
    }

    config() {
        this.fuel.config()
        this.wind.config()
        this.fire.config()
    }
}
