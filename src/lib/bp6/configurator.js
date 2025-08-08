import { Config, Dag, K, Util } from './index.js'
import { fuelStandardModelNodes, useStandardFuelModels } from './index.js'
import { fuelBedNodes, FuelBedEquations } from './index.js'

// Modifies the node properties store in map
function modify(map, key, value, method=null, args=null) {
    let [k, v, u, m, a] = map.get(key)
    map.set(k, [k, value ?? v, u, method ?? m, args ?? a])
}

/**
 * Returns a Behavejs node Map according to configuration specs.
 * @param {Config} config 
 */
export function configurator(config=null) {
    let master = new Map()
    if (!config) config = new Config()
    const {surface} = config

    if (surface.active.value === 'activated') {
        // Start with 2 constant, unlinked surface fuel beds
        master = new Map([...master,
            ...fuelBedNodes(K.s1),
            ...fuelBedNodes(K.s2)])
            
        if (surface.fuels.value === 'one fuel') {
            master = new Map([...master,
                ...fuelStandardModelNodes(K.s1),
                ...useStandardFuelModels(K.s1),
                ...fuelStandardModelNodes(K.s2, Dag.constant)]) // make all nodes Dag.constant
            modify(master, K.s1+K.covr, 1, Dag.constant, [])
        }

        if (surface.fuels.value === 'two fuels') {
            master = new Map([...master,
                ...fuelStandardModelNodes(K.s1),
                ...useStandardFuelModels(K.s1),
                ...fuelStandardModelNodes(K.s2),
                ...useStandardFuelModels(K.s2)])
            modify(master, K.s1+K.covr, 1, Dag.input, [])
            modify(master, K.s2+K.covr, 0, FuelBedEquations.secondaryCoverage, [K.s1+K.covr])
        }

        if (surface.fuels.value === 'input') {
            modify(master, K.s1+K.covr, 1, Dag.constant, [])
            master = new Map([...master,
                ...fuelStandardModelNodes(K.s1, Dag.input), // make all nodes Dag.input
                ...useStandardFuelModels(K.s1),
                ...fuelStandardModelNodes(K.s2, Dag.constant)]) // make all nodes Dag.constant
        }
    }
    Util.checkNodeKeys(master)
    return master
}
