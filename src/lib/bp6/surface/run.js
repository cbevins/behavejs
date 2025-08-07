import { Config, configurator } from '../index.js'
import {Assert} from '../Assert.js'

function listNodeMap(map) {
    const w = map.values().reduce((w, node) => Math.max(node[0].length, w), 0)
    const str = map.values().reduce((str, node) => str + node[0].padEnd(w+2) + node[1] + '\n', '')
    return str + map.size + ' nodes'
}

// function logNode(map, key) {console.log(map.get(key))}
function logNode(map, key) {
    const [k, v, u, m, a] = map.get(key)
    console.log(k, v, m, a)
}

console.log(new Date())
const cfg = new Config()

cfg.surface.fuels.value = 'two fuels'
let map = configurator(cfg)
// console.log(listNodeMap(map))
console.log(`\nsurface.fuels = '${cfg.surface.fuels.value}'`)
logNode(map, 'surface/primary/fuel model/key')
logNode(map, 'surface/primary/fuel/bed/coverage')
logNode(map, 'surface/primary/fuel/bed/depth')
logNode(map, 'surface/primary/fuel/dead/extinction moisture content')
logNode(map, 'surface/primary/fuel model/dead/1-h/ovendry load')
logNode(map, 'surface/secondary/fuel model/key')
logNode(map, 'surface/secondary/fuel/bed/coverage')
logNode(map, 'surface/secondary/fuel/bed/depth')
logNode(map, 'surface/secondary/fuel/dead/extinction moisture content')
logNode(map, 'surface/secondary/fuel model/dead/1-h/ovendry load')

cfg.surface.fuels.value = 'one fuel'
map = configurator(cfg)
console.log(`\nsurface.fuels = '${cfg.surface.fuels.value}'`)
logNode(map, 'surface/primary/fuel model/key')
logNode(map, 'surface/primary/fuel/bed/coverage')
logNode(map, 'surface/primary/fuel/bed/depth')
logNode(map, 'surface/primary/fuel/dead/extinction moisture content')
logNode(map, 'surface/primary/fuel model/dead/1-h/ovendry load')
logNode(map, 'surface/secondary/fuel model/key')
logNode(map, 'surface/secondary/fuel/bed/coverage')
logNode(map, 'surface/secondary/fuel/bed/depth')
logNode(map, 'surface/secondary/fuel/dead/extinction moisture content')
logNode(map, 'surface/secondary/fuel model/dead/1-h/ovendry load')

cfg.surface.fuels.value = 'input'
map = configurator(cfg)
console.log(`\nsurface.fuels = '${cfg.surface.fuels.value}'`)
logNode(map, 'surface/primary/fuel model/key')
logNode(map, 'surface/primary/fuel/bed/coverage')
logNode(map, 'surface/primary/fuel/bed/depth')
logNode(map, 'surface/primary/fuel/dead/extinction moisture content')
logNode(map, 'surface/primary/fuel/dead/element 1/ovendry load')
logNode(map, 'surface/primary/fuel/dead/element 2/ovendry load')
logNode(map, 'surface/primary/fuel/dead/element 3/ovendry load')
logNode(map, 'surface/primary/fuel/dead/element 4/ovendry load')
logNode(map, 'surface/primary/fuel model/dead/1-h/ovendry load')
logNode(map, 'surface/secondary/fuel model/key')
logNode(map, 'surface/secondary/fuel/bed/coverage')
logNode(map, 'surface/secondary/fuel/bed/depth')
logNode(map, 'surface/secondary/fuel/dead/extinction moisture content')
logNode(map, 'surface/secondary/fuel/dead/element 1/ovendry load')

// let d = 'surface/primary/fuel/dead/'
// let l = 'surface/primary/fuel/live/'
// logNode(map, d+'element 1/moisture content')
// logNode(map, d+'element 2/moisture content')
// logNode(map, d+'element 3/moisture content')
// logNode(map, d+'element 4/moisture content')
// logNode(map, d+'element 5/moisture content')
// logNode(map, l+'element 1/moisture content')
// logNode(map, l+'element 2/moisture content')

const assert = new Assert('Behavejs Configurator')
.that('assert equals', 123).equals(1234)
console.log(assert.tests)