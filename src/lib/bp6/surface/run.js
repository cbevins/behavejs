import { fuelBedNodes } from "./fuelBedNodes.js"
import { fuelLifeNodes } from "./fuelLifeNodes.js"

function checkNodeKeys(map) {
    for(let node of map.values()) {
        const [key, value, units, method, supkeys] = node
        for(let supkey of supkeys) {
            if(!map.has(supkey)) {
                console.log(`*** "${key}" supplier "${supkey}" undefined`)
            }
        }
    }
}

let master = new Map()
// Loop for 'primary' and 'secondary' fuel beds
for(let surface of ['surface/primary', /*'surface/secondary'*/]) {
    master = new Map([...master, ...fuelBedNodes(surface)])
    // // Loop for 'dead' and 'live' fuel arrays within the fuel bed
    // for(let life of ['dead', 'live']) {
    //     master = new Map([...master, ...fuelLifeNodes(surface, life)])
    //     // Add no-load fuel elements with default values to be subsequently overwritten
    //     for(let el of ['1', '2', '3', '4', '5']) {
    //         master = new Map([...master, ...fuelElementNodes(surface, life, el)])
    //     }
    // }
    // // Add standard fuel model to this primary/secondary fuel bed
    // master = new Map([...master, ...fuelStandardModelNodes(surface)])
    // // Assign the primary/secondary element's values from the standard model
    // master = new Map([...master, ...linkSurfaceFuel2StandardModel(surface)])
}
let l = 0
for(let node of master.values()) l = Math.max(node[0].length, l)
for(let node of master.values()) console.log(node[0].padEnd(70), node[1])
console.log(master.size, 'nodes')
// checkNodeKeys(master)

