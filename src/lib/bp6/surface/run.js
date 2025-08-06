import { Config, fuelBedNodes, fuelStandardModelNodes, linkSurfaceFuel2StandardModel,
    Util } from '../index.js'

/**
 * Returns a Behavejs node Map according to configuration specs.
 * @param {Config} config 
 */
export function configure(config=null) {
    let master = new Map()
    if (!config) config = new Config()
    const {surface} = config

    if (surface.active.value === 'activated') {
        // Loop for 'primary' and 'secondary' fuel beds
        for(let surface of ['surface/primary', /*'surface/secondary'*/]) {
            master = new Map([...master, ...fuelBedNodes(surface)])
            // Add standard fuel model to this primary/secondary fuel bed
            master = new Map([...master, ...fuelStandardModelNodes(surface)])
            // Assign the surface fuel element's values from the standard model
            master = new Map([...master, ...linkSurfaceFuel2StandardModel(surface)])
        }
    }
    Util.checkNodeKeys(master)
    return master
}

function listNodeMap(map) {
    const w = map.values().reduce((w, node) => Math.max(node[0].length, w), 0)
    return map.values().reduce((str, node) => str + node[0].padEnd(w+2) + node[1] + '\n', '')
}

const map = configure()
console.log(listNodeMap(map))
