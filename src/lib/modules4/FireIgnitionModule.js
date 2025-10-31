import { DagModule } from './DagItems.js'
import { CommonNodes as Common } from './CommonNodes.js'
import { CompassEquations as Compass } from '../index.js'

export class FireIgnitionModule extends DagModule {
    /**
     * @param {DagModule} parentMod Reference to this DagItem's parent DagModule
     * @param {string} parentProp Parent's property name for this DagItem  ('slope')
     * @param {Config} configs Module containing all current configuration objects
     */
    constructor(parentMod, parentProp, configs) {
        super(parentMod, parentProp)
        this._meta.configs = configs

        this.location = new DagModule(this, 'location')
        this.location.x = Common.x(this)
        this.location.y = Common.y(this)

        this.time = new DagModule(this, 'time')
        this.time.elapsed = CommonNodes.elasped(this.time)
    }

    config() {
        this.location.x.input()
        this.location.y.input()
        return this
    }
}
