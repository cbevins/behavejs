import { Config, Dag, K, Util } from '../index.js'
import { fuelBedNodes } from './fuelBedNodes.js'

function listNodeMap(map) {
    const w = map.values().reduce((w, node) => Math.max(node[0].length, w), 0)
    const str = map.values().reduce((str, node) => str + node[0].padEnd(w+2) + node[1] + '\n', '')
    return str + map.size + ' nodes'
}

console.log(new Date())
const cfg = new Config()

const map = fuelBedNodes(K.s1)
console.log(listNodeMap(map))
Util.checkNodeKeys(map)
// for(let node of map.values()) console.log(node[0], node[1], node[2])
// console.log('bed', K.s1+K.bed)
// console.log('dead', K.s1+K.dead)
// console.log('dead1', K.s1+K.dead1)
// console.log('live', K.s1+K.live)

