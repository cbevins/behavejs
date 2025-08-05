import { fuelBedNodes } from "./fuelBedNodes.js"
import { fuelLifeNodes } from "./fuelLifeNodes.js"
import { fuelElementNodes } from "./fuelElementNodes.js"

for(let [key, value, units, method, suppliers] of fuelBedNodes('surface/primary')) {
    console.log(key)
}

for(let [key, value, units, method, suppliers] of fuelLifeNodes('surface/primary', 'dead')) {
    console.log(key)
}

for(let [key, value, units, method, suppliers] of fuelElementNodes('surface/primary', 'dead', 1)) {
    console.log(key)
}