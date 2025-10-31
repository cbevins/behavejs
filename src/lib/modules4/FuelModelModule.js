import { Units as U } from './Units.js'
import { DagModule, DagNode } from './DagItems.js'

/**
 * The FuelCellModule binds to one of the 5 sets of fuel domain model parameters.
 * The required *model* parameters are:
 * - a fuel bed depth (.depth),
 * - a dead fuel extinction moisture content (.dead.mext),
 * - 5 dead FuelElementModules (dead.element1, ... dead.element5), and
 * - 5 live FuelElementModules (live.element1, ... live.element5).
 * 
 * FuelModelModule is a base class that must be extended for each fuel domain.
 * All fuel model domains (catalog, custom, chaparral, palmetto, aspen) should also
 * add their own specific nodes such as catalog key, age, basal area, etc.
 * 
 * This is basically the interface between fuel domains and a FuelCellModule.
 * The FuelCellModule will add and configure all the derived element and life
 * category nodes behind the scenes and hidden from the fuel domain model.
 */
export class FuelModelModule extends DagModule {
    /**
     * @param {FuelCellModule} parentMod Reference to this DagItem's parent DagModule
     * @param {string} parentProp Parent's property name for this DagItem,
     * one of 'catalog', 'custom', 'chaparral', 'palmetto', 'aspen'
     */
    constructor(parentMod, parentProp, configs=null) {
        super(parentMod, parentProp)
        this.depth = new DagNode(this, 'depth', U.fuelDepth)
        this.dead = new DagModule(this, 'dead')
        this.live = new DagModule(this, 'live')
        for(let life of ['dead', 'live']) {
            for(let i=1; i<=5; i++) {
                const prop = 'element'+i
                const el = this[life][prop] = new DagModule(this, prop)
                el.life = new DagNode(el, 'life', U.fuelType).constant(life)
                el.type = new DagNode(el, 'type', U.fuelType)
                el.load = new DagNode(el, 'load', U.fuelLoad)
                el.savr = new DagNode(el, 'savr', U.fuelSavr)
                el.heat = new DagNode(el, 'heat', U.fuelHeat)
                el.dens = new DagNode(el, 'dens', U.fuelDens)
                el.stot = new DagNode(el, 'stot', U.fuelStot)
                el.seff = new DagNode(el, 'seff', U.fuelSeff)
                el.mois = new DagNode(el, 'mois', U.fuelMois)
            }
        }
        this.dead.mext = new DagNode(this.dead, 'mext', U.fuelMois)
    }
}
