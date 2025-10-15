import { Units as U } from './Units.js'
import { DagModule, DagNode } from './DagItems.js'
import { CanopyEquations as Canopy} from '../index.js'

/**
 * Builds and configures a CanopyModule
 * @param {DagModule} parentMod Reference to this DagItem's parent DagModule
 * @param {string} parentProp Parent's property name for this DagItem
 * @returns Reference to the new DagModule 
 */
export class CanopyModule extends DagModule {
    constructor(parentMod, parentProp, configHeight) {
        super(parentMod, parentProp)
        this._meta.config = {configHeight}
        this._meta.mod = {}

        const crown = this.crown = new DagModule(this, 'crown')
        crown.base   = new DagNode(crown, 'base', U.treeLeng)
        crown.cover  = new DagNode(crown, 'cover',U.fraction)
        crown.fill   = new DagNode(crown, 'fill', U.fraction)
        crown.height = new DagNode(crown, 'height', U.treeLeng)
        crown.length = new DagNode(crown, 'length', U.treeLeng)
        crown.ratio  = new DagNode(crown, 'ratio', U.fraction)

        const fuel = this.fuel = new DagModule(this, 'fuel')
        fuel.bulk = new DagNode(fuel, 'bulk', U.fraction)
        fuel.heat = new DagNode(fuel, 'heat', U.fuelHeat)
        fuel.hpua = new DagNode(fuel, 'hpua', U.fireHpua)
        fuel.load = new DagNode(fuel, 'load', U.fuelLoad)
        fuel.mois = new DagNode(fuel, 'mois', U.fuelMois)

        const wind = this.wind = new DagModule(this, 'wind')
        wind.sheltered = new DagNode(wind, 'sheltered', U.bool)
        wind.wsrf = new DagNode(wind, 'wsrf', U.fraction)
    }

    config() {
        const {configHeight} = this._meta.config
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
    }
}
