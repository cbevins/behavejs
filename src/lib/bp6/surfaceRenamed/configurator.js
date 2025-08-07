import { Config, Dag, K, Util } from '../index.js'
import { fuelBedNodes } from './fuelBedNodes.js'
import { fuelStandardModelNodes, linkSurfaceFuel2StandardModel } from './fuelStandardModelNodes.js'
import { FuelBedEquations } from './index.js'
import { covr, depth, mext } from './surface/standardKeys.js'

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

    const primary = 'surface/primary'
    const secondary = 'surface/secondary'
    const fm = '/fuel model/'
    const bed = '/fuel/bed/'
    const dead = '/fuel/dead/'
    if (surface.active.value === 'activated') {
        // Start with 2 constant, unlinked fuel beds
        master = new Map([...master,
            ...fuelBedNodes(primary),
            ...fuelBedNodes(secondary)])
            
        if (surface.fuels.value === 'one fuel') {
            master = new Map([...master,
                ...fuelStandardModelNodes(primary),
                ...linkSurfaceFuel2StandardModel(primary),
                ...fuelStandardModelNodes(secondary, Dag.constant)]) // make all nodes Dag.constant
            modify(master, primary+bed+covr, 1, Dag.constant, [])
        }

        if (surface.fuels.value === 'two fuels') {
            master = new Map([...master,
                ...fuelStandardModelNodes(primary),
                ...linkSurfaceFuel2StandardModel(primary),
                ...fuelStandardModelNodes(secondary),
                ...linkSurfaceFuel2StandardModel(secondary)])
            modify(master, primary+bed+covr, 1, Dag.input, [])
            modify(master, secondary+bed+covr, 0, FuelBedEquations.secondaryCoverage, [primary+bed+covr])
        }
        if (surface.fuels.value === 'input') {
            modify(master, primary+bed+covr, 1, Dag.constant, [])
            master = new Map([...master,
                ...fuelStandardModelNodes(primary, Dag.input), // make all nodes Dag.input
                ...linkSurfaceFuel2StandardModel(primary),
                ...fuelStandardModelNodes(secondary, Dag.constant)]) // make all nodes Dag.constant
        }
    }
    Util.checkNodeKeys(master)
    return master
}
