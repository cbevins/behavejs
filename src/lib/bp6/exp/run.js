import { Dag, Util} from '../index.js'
import { moistureNodes } from './moistureNodes.js'
import { surfaceBedNodes } from './surfaceBedNodes.js'
import { surfaceLifeNodes } from './surfaceLifeNodes.js'
import { surfaceElementNodesFromStandard } from './surfaceElementNodesFromStandard.js'
import { standardModelCatalogNodes } from './standardModelCatalogNodes.js'

console.log(new Date())
const p      = 'surface/'
const bedId  = 'bed/'
const fireId = 'fire/'
const fuelId = 'fuel/standard catalog/'   // or 'fuel/standard input/', 'fuel/chaparral'
const moisId = 'moisture/input/'
const windId = 'wind/input/'
const cfg = {
    surface: {fuel: 'standard catalog'}
}
const catalogNodes = standardModelCatalogNodes(fuelId)
const moisNodes = moistureNodes(moisId)
const bedNodes = surfaceBedNodes(fireId, bedId)
const deadNodes = surfaceLifeNodes(bedId, 'dead', fuelId, moisId)
const liveNodes = surfaceLifeNodes(bedId, 'live', fuelId, moisId)
let elNodes = []

if (cfg.surface.fuel==='standard catalog') {
    elNodes = surfaceElementNodesFromStandard(bedId, fuelId, moisId)
} else if (cfg.surface.fuel==='standard input') {
} else if (cfg.surface.fuel==='chaparral') {
} else if (cfg.surface.fuel==='southern rough') {
} else if (cfg.surface.fuel==='western aspen') {
}

const nodes = [...bedNodes, ...deadNodes, ...liveNodes, ...elNodes,
    ...catalogNodes,
    ...moisNodes
].sort()
// for(let node of nodes) console.log(node[0], node[1], node[2], node[3], node[4])

const map = Util.nodesToMap(nodes)
Util.checkNodeKeys(map)
