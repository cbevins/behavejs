import { Config, Dag, Util, configurator } from '../index.js'
import { fuelBedNodes, fuelStandardModelNodes, linkSurfaceFuel2StandardModel } from '../index.js'

function listNodeMap(map) {
    const w = map.values().reduce((w, node) => Math.max(node[0].length, w), 0)
    const str = map.values().reduce((str, node) => str + node[0].padEnd(w+2) + node[1] + '\n', '')
    return str + map.size + ' nodes'
}

// function logNode(map, key) {console.log(map.get(key))}
function logNode(map, key) {
    const [k, v, u, m, a] = map.get(key)
    console.log(k, v, m)
}


const cfg = new Config()
cfg.surface.fuels.value = 'two fuels'
console.log('surface.fuels', cfg.surface.fuels.value)
const map = configurator(cfg)
console.log(listNodeMap(map))
// let d = 'surface/primary/fuel/dead/'
// let l = 'surface/primary/fuel/live/'
// logNode(map, d+'element 1/moisture content')
// logNode(map, d+'element 2/moisture content')
// logNode(map, d+'element 3/moisture content')
// logNode(map, d+'element 4/moisture content')
// logNode(map, d+'element 5/moisture content')
// logNode(map, l+'element 1/moisture content')
// logNode(map, l+'element 2/moisture content')
logNode(map, 'surface/primary/fuel/bed/coverage')
logNode(map, 'surface/secondary/fuel/bed/coverage')