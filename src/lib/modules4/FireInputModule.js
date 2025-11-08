import { DagModule } from './DagItems.js'
import { CommonNodes as Common } from './CommonNodes.js'
import { Calc, CompassEquations as Compass } from '../index.js'
import { SurfaceFireEquations as SurfaceFire } from '../index.js'

export class FireInputModule extends DagModule {
    constructor(parentMod, parentProp, configs, terrainMod) {
        super(parentMod, parentProp)
        this._meta.modules = {terrainMod}
    }
    config() {
        const {firelineIntensity:configFli, fireVectors:configVectors} = this._meta.configs

        this.ros.input()
        this.lwr.input()
        
        if (configVectors.value === configVectors.fromNorth) {
            this.dir.fromNorth.input(configVectors)
            this.dir.fromUpslope.use(Compass.compassDiff, [
                this.dir.fromNorth, terrainMod.upslope], configVectors)
        } else if (configVectors.value === configVectors.fromUpslope) {
            this.dir.fromNorth.use(Compass.compassSum, [
                this.dir.fromUpslope, terrainMod.upslope], configVectors)
            this.dir.fromUpslope.input(configVectors)
        }

        if(configFli.value===configFli.flame) {
            this.flame.input(configFli)
            this.fli.use(SurfaceFire.firelineIntensityFromFlameLength, [this.flame], configFli)
        } else if (configFli.value===configFli.fli) {
            this.fli.input(configFli)
            this.flame.use(SurfaceFire.flameLength, [this.fli], configFli)
        }
        
        return this
    }
}