import { Units as U } from './Units.js'
import { DagModule, DagNode } from './DagItems.js'
import { CanopyEquations as Canopy} from '../index.js'

export class CanopyModule extends DagModule {
    /**
     * @param {DagModule} parentMod Reference to this DagItem's parent DagModule
     * @param {string} parentProp Parent's property name for this DagItem ('canopy')
     * @param {Config} configs Module containing all current configuration objects
     */
    constructor(parentMod, parentProp, configs) {
        super(parentMod, parentProp)
        this._meta.configs = configs

        const crown = this.crown = new DagModule(this, 'crown')
        crown.base   = new DagNode(crown, 'base', U.treeLeng)
        crown.cover  = new DagNode(crown, 'cover',U.fraction)
        crown.fill   = new DagNode(crown, 'fill', U.fraction)
        crown.height = new DagNode(crown, 'height', U.treeLeng)
        crown.length = new DagNode(crown, 'length', U.treeLeng)
        crown.ratio  = new DagNode(crown, 'ratio', U.fraction)

        const fuel = this.fuel = new DagModule(this, 'fuel')
        fuel.bulk = new DagNode(fuel, 'bulk', U.fraction, 'bulk density')
        fuel.heat = new DagNode(fuel, 'heat', U.fuelHeat, 'heat of combustion')
        fuel.hpua = new DagNode(fuel, 'hpua', U.fireHpua, 'heat per unit area')
        fuel.load = new DagNode(fuel, 'load', U.fuelLoad, 'ovendry fuel load')
        fuel.mois = new DagNode(fuel, 'mois', U.fuelMois, 'moisture content')

        const wind = this.wind = new DagModule(this, 'wind')
        wind.sheltered = new DagNode(wind, 'sheltered', U.bool, 'shelters fuel from wind')
        wind.wsrf = new DagNode(wind, 'wsrf', U.fraction, 'wind speed reduction factor')
    }

    config() {
        const {canopyHeight: configHeight} = this._meta.configs
        const {crown, fuel, wind} = this

        fuel.bulk.input()
        fuel.heat.input()
        fuel.hpua.use(Canopy.canopyHeatPerUnitArea, [fuel.load, fuel.heat])
        fuel.load.use(Canopy.canopyFuelLoad, [fuel.bulk, crown.length])
        fuel.mois.input()
    
        wind.sheltered.use(Canopy.canopySheltersFuelFromWind, [crown.cover, crown.height, crown.fill])
        wind.wsrf.use(Canopy.canopyWindSpeedAdjustmentFactor, [crown.cover, crown.height, crown.fill])
    
        crown.cover.input()
        crown.fill.use(Canopy.crownFillRatio, [crown.cover, crown.ratio])
        if (configHeight.value === configHeight.ratioHeight) {
            crown.base.use(Canopy.canopyBaseFromRatioHeight, [crown.ratio, crown.height], configHeight)
            crown.length.use(Canopy.crownLengthFromRatioHeight, [crown.ratio, crown.height], configHeight)
            crown.height.input(configHeight)
            crown.ratio.input(configHeight)
        } else if (configHeight.value === configHeight.ratioBase) {
            crown.base.input(configHeight)
            crown.length.use(Canopy.crownLengthFromRatioBase, [crown.ratio, crown.base], configHeight)
            crown.height.use(Canopy.canopyHeightFromRatioBase, [crown.ratio, crown.base], configHeight)
            crown.ratio.input(configHeight)
        } else if (configHeight.value === configHeight.ratioLength) {
            crown.base.use(Canopy.canopyBaseFromRatioLength, [crown.ratio, crown.length], configHeight)
            crown.length.input(configHeight)
            crown.height.use(Canopy.canopyHeightFromRatioLength, [crown.ratio, crown.length], configHeight)
            crown.ratio.input(configHeight)
        } else if (configHeight.value === configHeight.lengthHeight) {
            crown.base.use(Canopy.canopyBaseFromHeightLength, [crown.height, crown.length], configHeight)
            crown.length.input(configHeight)
            crown.height.input(configHeight)
            crown.ratio.use(Canopy.crownRatioFromHeightLength, [crown.height, crown.length], configHeight)
        } else if (configHeight.value === configHeight.baseHeight) {
            crown.base.input(configHeight)
            crown.length.use(Canopy.crownLengthFromHeightBase, [crown.height, crown.base], configHeight)
            crown.height.input(configHeight)
            crown.ratio.use(Canopy.crownRatioFromHeightBase, [crown.height, crown.base], configHeight)
        } else if (configHeight.value === configHeight.lengthBase) {
            crown.base.input(configHeight)
            crown.length.input(configHeight)
            crown.height.use(Canopy.canopyHeightFromLengthBase, [crown.length, crown.base], configHeight)
            crown.ratio.use(Canopy.crownRatioFromLengthBase, [crown.length, crown.base], configHeight)
        }
        return this
    }
}
