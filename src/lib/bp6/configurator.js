import { Config, Dag, Util } from './index.js'
import { fuelBedNodes, fuelStandardModelNodes, linkSurfaceFuel2StandardModel } from './index.js'
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
        if (surface.fuels.value === 'one fuel' || surface.fuels.value === 'two fuels') {
            modify(master, primary+bed+covr, 1, Dag.constant, [])
            modify(master, primary+bed+depth, 1, Dag.assign, [primary+fm+depth])
            modify(master, primary+dead+mext, 1, Dag.assign, [primary+fm+mext])
            master = new Map([...master,
                ...fuelStandardModelNodes(primary),
                ...linkSurfaceFuel2StandardModel(primary)])
        }
        if (surface.fuels.value === 'two fuels') {
            modify(master, primary+bed+covr, 1, Dag.input, [])
            modify(master, secondary+bed+covr, 0, Dag.input, [])
            modify(master, secondary+bed+depth, 1, Dag.assign, [secondary+fm+depth])
            modify(master, secondary+dead+mext, 1, Dag.assign, [secondary+fm+mext])
            master = new Map([...master,
                ...fuelStandardModelNodes(secondary),
                ...linkSurfaceFuel2StandardModel(secondary)])
        }
        if (surface.fuels.value === 'input') {
            modify(master, primary+bed+covr, 1, Dag.constant, [])
            master = new Map([...master,
                ...fuelStandardModelNodes(primary, true),   // 'true' make all nodes Dag.input
                ...linkSurfaceFuel2StandardModel(primary)])
        }
    }
    Util.checkNodeKeys(master)
    return master
}
