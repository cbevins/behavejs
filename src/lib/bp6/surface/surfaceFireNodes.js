/**
 * Returns a Map of all surface fire module nodes defining a minimally complete
 * and internally consistent DAG for predicting surface fire spread.
 * All constant and derived nodes are fully defined and need no further updates.
 * But the root
 * 
 * The Map should be updated by submodule
 * defining a closed system with default empty or zero values.
 *  object of surface fire and fuel bed, life, and element nodes
 * with default initial values for primary and secondary surface fuels.
 * 
 * Since the raw surface fire module has over 100 fuel cover, depth, mext, element,
 * moisture, wind, and slope nodes as input, they must be updated with links to submodules
 * - fuel model nodes, such as standard fuel models, chaparral, aspen, or rough, or client input
 * - fuel moisture nodes, such as client input or some other source
 * - wind speed nodes
 * - terrain slope node
 * 
 * @param {string} prefix  'surface/primary', 'surface/secondary'
 * @returns 
 */
import { fuelBedNodes, fuelLifeNodes, fuelElementNodes, fuelStandardModelNodes,
    linkSurfaceFuel2StandardModel } from "../index.js"

export function surfaceFireNodes() {
    let master = new Map()
    // Loop for 'primary' and 'secondary' fuel beds
    for(let surface of ['surface/primary', 'surface/secondary']) {
        master = new Map([...master, ...fuelBedNodes(surface)])

        // Loop for 'dead' and 'live' fuel arrays within the fuel bed
        for(let life of ['dead', 'live']) {
            master = new Map([...master, ...fuelLifeNodes(surface, life)])

            // Add fuel elements with default 'unused' values to be subsequently overwritten
            for(let el of ['1', '2', '3', '4', '5']) {
                master = new Map([...master, ...fuelElementNodes(surface, life, el)])
            }
        }
    }

    // We now have a
        // Add standard fuel model to this primary/secondary fuel bed
        master = new Map([...master, ...fuelStandardModelNodes(surface)])
        // Assign the primary/secondary element's values from the standard model
        master = new Map([...master, ...linkSurfaceFuel2StandardModel(surface)])
    }
    return master
}
