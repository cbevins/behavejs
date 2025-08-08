import { Dag, Util} from '../index.js'
import { moistureNodes } from './moistureNodes.js'
import { surfaceBedNodes } from './surfaceBedNodes.js'
import { surfaceLifeNodes } from './surfaceLifeNodes.js'
import { surfaceElementNodesFromStandard } from './surfaceElementNodesFromStandard.js'
import { standardModelCatalogNodes, standardModelInputNodes } from './standardModelCatalogNodes.js'

console.log(new Date())
const p      = 'surface/'
const bedId  = 'bed/'
const fireId = 'fire/'
const moisId = 'moisture/input/'
const windId = 'wind/input/'

const cfg = {
    surface: {fuel: 'standard catalog'}
}

const moisNodes = moistureNodes(moisId)
const bedNodes = surfaceBedNodes(fireId, bedId)
let nodes = [...moisNodes, ...bedNodes]

if (cfg.surface.fuel==='standard catalog') {
    const fuelId = 'fuel/standard catalog/'
    const fuelNodes = standardModelCatalogNodes(fuelId)
    const deadNodes = surfaceLifeNodes(bedId, 'dead', fuelId, moisId)
    const liveNodes = surfaceLifeNodes(bedId, 'live', fuelId, moisId)
    const elNodes = surfaceElementNodesFromStandard(bedId, fuelId, moisId)
    nodes = [...nodes, ...fuelNodes, ...deadNodes, ...liveNodes, ...elNodes]
} else if (cfg.surface.fuel==='standard input') {
    const fuelId = 'fuel/standard input/'
    const fuelNodes = standardModelInputNodes(fuelId)
    const deadNodes = surfaceLifeNodes(bedId, 'dead', fuelId, moisId)
    const liveNodes = surfaceLifeNodes(bedId, 'live', fuelId, moisId)
    const elNodes = surfaceElementNodesFromStandard(bedId, fuelId, moisId)
    nodes = [...nodes, ...fuelNodes, ...deadNodes, ...liveNodes, ...elNodes]
} else if (cfg.surface.fuel==='chaparral') {
} else if (cfg.surface.fuel==='southern rough') {
} else if (cfg.surface.fuel==='western aspen') {
}
nodes.sort()
// for(let node of nodes) console.log(node[0], node[1], node[2], node[3], node[4])

const map = Util.nodesToMap(nodes)
Util.checkNodeKeys(map)
