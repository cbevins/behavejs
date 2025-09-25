/**
 * Wfms is the Wildland Fire Modeling System for Javascript.
 * It assembles the node definitions of all Modules comprising the
 * Behave Fire Behavior Modeling System into a Dag.
 */
import { Dag } from '../index.js'
import { Paths as P } from './Paths.js'
import { WfmsModule } from './WfmsModule.js'

export class Wfms {
    constructor() {
        const wfmsMod = new WfmsModule()
        const nodeDefs = wfmsMod.nodeDefs
        nodeDefs.sort((a, b) => { return a.key - b.key })
        this.dag = new Dag(nodeDefs, 'Wildland Fire Modeling System')
        this.config = {...wfmsMod.config}
    }
    
    // Convenience accessor methods
    activeConfigs() { return this.dag.activeConfigs() }
    activeConfigsByKey() { return this.dag.activeConfigsByKey() }
    activeInputs() { return this.dag.activeInputs() }
    activeInputsByKey() { return this.dag.activeInputsByKey() }
    activeNodes() { return this.dag.activeNodes() }
    activeNodesByKey() { return this.dag.activeNodesByKey() }
    allInputs() { return this.dag.allInputs() }
    allInputsByKey() { return this.dag.allInputsByKey() }
    leafNodes() { return this.dag.leafNodes() }
    leafNodesByKey() { return this.dag.leafNodesByKey() }
    nodes() { return this.dag.nodes() }
    nodesByKey() { return this.dag.nodesByKey() }
    nodeRef(refOrKey, caller='Wfms.nodeRef') {  return this.dag.nodeRef(refOrKey, caller) }
    selected() { return this.dag.selected() }
    selectedByKey() { return this.dag.selectedByKey() }

    // Convenience operations methods
    configure() { return this.dag.configure() }
    get(node) { return this.dag.get(node) }
    select(whatever) { return this.dag.select(whatever) }
    set(refOrKey, value, inputsOnly=true, unequalOnly=true) {
        return this.dag.set(refOrKey, value, inputsOnly, unequalOnly) }
    updateAll() { return this.dag.updateAll }
}