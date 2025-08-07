import { Assert, Config, Dag, configurator, StandardFuelModels } from '../index.js'
import { FuelBedEquations } from '../index.js'

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

function get(map, nodeKey) {
    const [key, value, units, method, args] = map.get(nodeKey)
    return {key, value, units, method, args}
}

//------------------------------------------------------------------------------
console.log(new Date())
const cfg = new Config()

// Nodes that are modified by the configuration
const pfm = 'surface/primary/fuel model/'
const sfm = 'surface/secondary/fuel model/'

let pkey = 'surface/primary/fuel model/key'
let pcovr = 'surface/primary/fuel/bed/coverage'
let pdepth = 'surface/primary/fuel/bed/depth'
let pmext = 'surface/primary/fuel/dead/extinction moisture content'
let pd1h = 'surface/primary/fuel model/dead/1-h/ovendry load'   // example
let pd1savr = 'surface/primary/fuel/dead/element 1/surface area to volume ratio'   // example
let skey = 'surface/secondary/fuel model/key'
let scovr = 'surface/secondary/fuel/bed/coverage'
let sdepth = 'surface/secondary/fuel/bed/depth'
let smext = 'surface/secondary/fuel/dead/extinction moisture content'
let sd1h = 'surface/secondary/fuel model/dead/1-h/ovendry load'
let sd1savr = 'surface/secondary/fuel/dead/element 1/surface area to volume ratio'   // example

// Test surface fire two fuel model configuration
cfg.surface.fuels.value = 'two fuels'
let map = configurator(cfg)

const assert = new Assert('Behavejs Configurator: Surface Two Fuel Models')
// primary key is input; coverage is input; depth and mext are assigned from fuel model,
// and fuel model nodes are derived from StandardFuelModels using model key
.that(pkey+' method', get(map,pkey).method).equals(Dag.input)
.that(pkey+' value', get(map,pkey).value).equals('')
.that(pcovr+' value', get(map,pcovr).value).equals(1)
.that(pcovr+' method', get(map,pcovr).method).equals(Dag.input)
.that(pdepth+' value', get(map,pdepth).value).equals(1)
.that(pdepth+' method', get(map,pdepth).method).equals(Dag.assign)
.that(pdepth+' args', get(map,pdepth).args).equals([pfm+'depth'])
.that(pmext+' value', get(map,pmext).value).equals(1)
.that(pmext+' method', get(map,pmext).method).equals(Dag.assign)
.that(pmext+' args', get(map,pmext).args).equals([pfm+'extinction moisture content'])
.that(pd1h+' value', get(map,pd1h).value).equals(0)
.that(pd1h+' method', get(map,pd1h).method).equals(StandardFuelModels.load1)
.that(pd1h+' args', get(map,pd1h).args).equals([pkey])
.that(pd1savr+' value', get(map,pd1savr).value).equals(1)
.that(pd1savr+' method', get(map,pd1savr).method).equals(Dag.assign)
.that(pd1savr+' args', get(map,pd1savr).args).equals(['surface/primary/fuel model/dead/1-h/surface area to volume ratio'])
// secondary key is input; coverage is derived; depth and mext are assigned from fuel model,
// and fuel model nodes are derived from StandardFuelModels using model key
.that(skey+' method', get(map,skey).method).equals(Dag.input)
.that(skey+' value', get(map,skey).value).equals('')
.that(scovr+' value', get(map,scovr).value).equals(0)
.that(scovr+' method', get(map,scovr).method).equals(FuelBedEquations.secondaryCoverage)
.that(scovr+' args', get(map,scovr).args).equals([pcovr])
.that(sdepth+' value', get(map,sdepth).value).equals(1)
.that(sdepth+' method', get(map,sdepth).method).equals(Dag.assign)
.that(sdepth+' args', get(map,sdepth).args).equals(['surface/secondary/fuel model/depth'])
.that(smext+' value', get(map,smext).value).equals(1)
.that(smext+' method', get(map,smext).method).equals(Dag.assign)
.that(smext+' args', get(map,smext).args).equals(['surface/secondary/fuel model/extinction moisture content'])
.that(sd1h+' value', get(map,sd1h).value).equals(0)
.that(sd1h+' method', get(map,sd1h).method).equals(StandardFuelModels.load1)
.that(sd1h+' args', get(map,sd1h).args).equals([skey])
.report().summary()


logNode(map, pd1savr)

// cfg.surface.fuels.value = 'one fuel'
// map = configurator(cfg)
// console.log(`\nsurface.fuels = '${cfg.surface.fuels.value}'`)
// logNode(map, 'surface/primary/fuel model/key')
// logNode(map, 'surface/primary/fuel/bed/coverage')
// logNode(map, 'surface/primary/fuel/bed/depth')
// logNode(map, 'surface/primary/fuel/dead/extinction moisture content')
// logNode(map, 'surface/primary/fuel model/dead/1-h/ovendry load')
// logNode(map, 'surface/secondary/fuel model/key')
// logNode(map, 'surface/secondary/fuel/bed/coverage')
// logNode(map, 'surface/secondary/fuel/bed/depth')
// logNode(map, 'surface/secondary/fuel/dead/extinction moisture content')
// logNode(map, 'surface/secondary/fuel model/dead/1-h/ovendry load')

// cfg.surface.fuels.value = 'input'
// map = configurator(cfg)
// console.log(`\nsurface.fuels = '${cfg.surface.fuels.value}'`)
// logNode(map, 'surface/primary/fuel model/key')
// logNode(map, 'surface/primary/fuel/bed/coverage')
// logNode(map, 'surface/primary/fuel/bed/depth')
// logNode(map, 'surface/primary/fuel/dead/extinction moisture content')
// logNode(map, 'surface/primary/fuel/dead/element 1/ovendry load')
// logNode(map, 'surface/primary/fuel/dead/element 2/ovendry load')
// logNode(map, 'surface/primary/fuel/dead/element 3/ovendry load')
// logNode(map, 'surface/primary/fuel/dead/element 4/ovendry load')
// logNode(map, 'surface/primary/fuel model/dead/1-h/ovendry load')
// logNode(map, 'surface/secondary/fuel model/key')
// logNode(map, 'surface/secondary/fuel/bed/coverage')
// logNode(map, 'surface/secondary/fuel/bed/depth')
// logNode(map, 'surface/secondary/fuel/dead/extinction moisture content')
// logNode(map, 'surface/secondary/fuel/dead/element 1/ovendry load')

// let d = 'surface/primary/fuel/dead/'
// let l = 'surface/primary/fuel/live/'
// logNode(map, d+'element 1/moisture content')
// logNode(map, d+'element 2/moisture content')
// logNode(map, d+'element 3/moisture content')
// logNode(map, d+'element 4/moisture content')
// logNode(map, d+'element 5/moisture content')
// logNode(map, l+'element 1/moisture content')
// logNode(map, l+'element 2/moisture content')
