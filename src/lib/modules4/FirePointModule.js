import { CommonNodes as Common, DagModule } from '../core.js'

export class FirePointModule extends DagModule {
    /**
     * @param {DagModule} parentMod Reference to this DagItem's parent DagModule
     * @param {string} parentProp Parent's property name for this DagItem  ('slope')
     * @param {Config} configs Module containing all current configuration objects
     */
    constructor(parentMod, parentProp, configs) {
        super(parentMod, parentProp)
        this._meta.configs = configs

        this.t = Common.t(this)
        this.x = Common.x(this)
        this.y = Common.y(this)
    }

    config() {
        this.t.input()
        this.x.input()
        this.y.input()
        return this
    }
}
