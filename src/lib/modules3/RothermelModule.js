import { Units as U } from './Units.js'
import { DagModule, DagNode } from './DagItems.js'
import { RothermelFireModule } from './RothermelFireModule.js'
import { RothermelFuelModule } from './RothermelFuelModule.js'

export class RothermelModule extends DagModule {
    /**
     * 
     * @param {DagModule} parentMod 
     * @param {string} parentProp 'primary' or 'secondary' or 'canopy'
     * @param {FuelMoistureMod} moistureMod 
     * @param {WindMod} windMod 
     * @param {SlopeMod} slopeMod 
     * @param {CanopyMod} canopyMod 
     * @param {DagConfig} configWindLimit 
     * @param {DagConfig} configMidflame 
     * @param {DagConfig} configFuelDomain 
     * @param {DagConfig} configCuring 
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

        this.fire = new RothermelFireModule(this, 'fire',
            this.fuel,          // RothermelFuelModule
            windMod,            // WindModule
            slopeMod,           // SlopeModule
            canopyMod,          // CanopyModule
            configWindLimit,    // DagConfig
            configMidflame)     // DagConfig
    }

    config() {
        this.fuel.config()
        this.fire.config()
    }
}
