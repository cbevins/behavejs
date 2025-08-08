import { Assert, configurator, Config, Dag, K, Util } from '../index.js'

console.log(new Date())
const cfg = new Config()
let map = configurator(cfg)
const dag = new Dag(map, 'Surface Module')
console.log(`Dag.nodeMap has ${dag.nodeMap.size} nodes`)
console.log(`Dag.nodes has ${dag.nodes.length} nodes`)
