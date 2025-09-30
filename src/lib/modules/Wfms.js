/**
 * Wfms is the Wildland Fire Modeling System for Javascript.
 * 
 * It assembles the node definitions of all Modules comprising the
 * Behave Fire Behavior Modeling System into a Dag.
 * 
 * It also makes the configuration object and the Dag API available to derived classes.
 */
import { Dag } from '../index.js'
import { Paths as P } from './Paths.js'
import { WfmsConfig } from './WfmsConfig.js'
import { WfmsModule } from './WfmsModule.js'

export class Wfms {
    constructor() {
        // Create and store the configuration object and map
        const wfmsConfig = new WfmsConfig()
        this.configObj = wfmsConfig.configObj
        this.configMap = wfmsConfig.configMap

        // Create node definitions and create the Dag
        const wfmsMod = new WfmsModule(wfmsConfig)
        const nodeDefs = wfmsMod.nodeDefs
        nodeDefs.sort((a, b) => { return a.key - b.key })
        this.dag = new Dag(nodeDefs, this.configMap, 'Wildland Fire Modeling System')
    }
    
    // Forwarded Dag accessor methods
    activeConfigs() { return this.dag.activeConfigs() }
    activeConfigsByKey() { return this.dag.activeConfigsByKey() }

    activeInputs() { return this.dag.activeInputs() }
    activeInputsByKey() { return this.dag.activeInputsByKey() }

    activeNodes() { return this.dag.activeNodes() }
    activeNodesByKey() { return this.dag.activeNodesByKey() }

    allInputs() { return this.dag.allInputs() }
    allInputsByKey() { return this.dag.allInputsByKey() }

    getConfigObj(key) { return this.dag.getConfigObj(key) }
    getConfigValue(key) { return this.dag.getConfigValue(key) }

    leafNodes() { return this.dag.leafNodes() }
    leafNodesByKey() { return this.dag.leafNodesByKey() }

    nodes() { return this.dag.nodes() }
    nodesByKey() { return this.dag.nodesByKey() }

    nodeRef(refOrKey, caller='Wfms.nodeRef') {  return this.dag.nodeRef(refOrKey, caller) }

    selected() { return this.dag.selected() }
    selectedByKey() { return this.dag.selectedByKey() }

    // Forwarded Dag operations methods
    configure(cfgPairs=[]) { return this.dag.configure(cfgPairs) }

    clearSelect() { return this.dag.clearSelect() }
    select(whatever) { return this.dag.select(whatever) }
    unselect(whatever) { return this.dag.unselect(whatever) }

    get(node) { return this.dag.get(node) }
    set(refOrKey, value, unequalOnly=true) { return this.dag.set(refOrKey, value, unequalOnly) }
    track(fromRefOrKey, leafRefOrKey) { return this.dag.track(fromRefOrKey, leafRefOrKey) }
    updateAll() { return this.dag.updateAll() }
}