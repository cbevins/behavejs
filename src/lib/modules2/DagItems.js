import {Dag} from './Dag.js'

export const ModuleMap = new Map()
export const NodeMap = new Map()

//------------------------------------------------------------------------------
// Base class for DagModule and DagNode
//------------------------------------------------------------------------------
export class DagItem {
    constructor(parent, prop, label=null) {
        if (!label) label = prop
        Object.defineProperty(this, '_meta', {
            value: {
                isNode: false,
                parent,             // reference to this module's parent DagModule
                prop,               // property string of this DagModule in its parent, i.e., parent[prop]
                label               // a more descriptive string, such a '1-h time lag'
            },
            enumerable:false}
        )
        // full lineage key, i.e., 'site/moisture/dead/tl1'
        this._meta.key = this.lineage().join('/')
        ModuleMap.set(this._meta.key, this)
    }

    // _meta access
    isModule() { return ! this._meta.isNode }
    isNode() { return this._meta.isNode }
    key() { return this._meta.key }
    parent() { return this._meta.parent }
    prop() { return this._meta.prop }

    configure() { return this }

    // Returns an array of the module's immediate child DagItems (both modules and nodes) as [prop, node] pairs
    items() {
        const ar = []
        for(let [prop, node] of Object.entries(this))
            ar.push([prop, node])
        return ar
    } 

    // Returns an array of all this module's property names,
    // including non-enumerables props like this._meta
    allProps() { return Object.getOwnPropertyNames(this) }

    // Returns an array of all this module's *parental* props, including its own
    lineage(props=[]) {
        if (this._meta.parent) this._meta.parent.lineage(props)
        props.push(this._meta.prop)
        return props
    }

    /**
     * Creates an array of all descendants of *module* and their depth
     * @param {DagModule} module Top-level DagModule to be traversed
     * @param {string} str Used only on recursive calls
     * @param {integer} depth Used only on recursive call
     * @returns An array of [prop, depth] pairs.
     */
    propTreeArray(ar=[], depth=0) {
        ar.push([this._meta.prop, depth])
        if (this.isNode()) return ar // This is a DagNode, and not a DagModule
        // NOTE: Object.entries() *DOES NOT* access non-enumerables such as 'module._meta'
        for(let [key, module] of Object.entries(this))
            module.propTreeArray(ar, depth+1)
        return ar
    }

    // Returns a reference to the root DagModule
    rootModule() {
        if (this._meta.parent) return this._meta.parent.rootModule()
        return this
    }
}

//------------------------------------------------------------------------------
// A DagModule has DagModules and/or DagNodes as properties
//------------------------------------------------------------------------------
export class DagModule extends DagItem {
    constructor(parent, prop, label=null) {
        super(parent, prop, label)
        this._meta.isNode = false
    }
}

//------------------------------------------------------------------------------
// DagNodes may have no DagItem children, just its Dag related props
//------------------------------------------------------------------------------
export class DagNode extends DagItem {
    constructor(parent, key, units, label=null, value=null) {
        super(parent, key, label)
        this._meta.isNode = true    // Reset to TRUE
        this.units      = units     // reference to the Units object
        this.value      = (value===null) ? units.value : value
        // console.log(`Node "${key}" is ${units.key} of ${this.value}`)
        this.consumers  = []
        this.status     = 0
        this.dirty      = true
        this.constant(value)
        NodeMap.set(this._meta.key, this)
    }
    bind(other, config) {
        this.updater = Dag.bind     // reference to the updater method
        this.suppliers = [other]    // only supplier is the bound DagNode
        this.config = config        // reference to the configuration object, or NULL
        return this
    }
    constant(value=null, config=null) {
        if (value !== null)
            this.value = value      // declare the constant value
        this.updater = Dag.constant // reference to the updater method
        this.suppliers = []         // no suppliers for constants
        this.config = config        // reference to the configuration object, or NULL
        return this
    }
    input(config=null) {
        this.updater = Dag.input    // reference to the updater method
        this.suppliers = []         // no suppliers for input
        this.config = config        // reference to the configuration object, or NULL
        return this
    }
    use(updater, suppliers=[], config=null) {
        this.updater = updater      // reference to the updater method
        this.suppliers = suppliers  // array of references to argument nodes
        this.config = config        // reference to the configuration object, or NULL
        return this
    }
}
