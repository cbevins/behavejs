import { Config, Dag, Util} from '../index.js'
import { moistureInputNodes } from './moistureInputNodes.js'
import { surfaceNodes } from './surfaceNodes.js'
import { slopeInputNodes } from './slopeInputNodes.js'
import { windInputNodes } from './windInputNodes.js'

console.log(new Date())
const moisId  = 'moisture/input/'
const slopeId = 'slope/input/'
const windId  = 'wind/input/'

const cfg = new Config()

// Both surface fuel beds share a common set of moisture, wind, and slope inputs
const mois = moistureInputNodes(moisId, cfg.moisture.value)
const slope = slopeInputNodes(slopeId, cfg.slope.steepness.value, cfg.slope.direction.value)
const wind = windInputNodes(windId, cfg.wind.speed.value, cfg.wind.direction.value)

const bed1 = surfaceNodes('surface/fire1/', moisId, windId, slopeId, cfg.surface.fuel1.value)
const bed2 = surfaceNodes('surface/fire2/', moisId, windId, slopeId, cfg.surface.fuel2.value)
const nodes = [...mois, ...wind, ...slope, ...bed1, ...bed2]
nodes.sort()
// for(let node of nodes) console.log(node[0], node[1], node[2], node[3], node[4])

const map = Util.nodesToMap(nodes)
Util.checkNodeKeys(map)
