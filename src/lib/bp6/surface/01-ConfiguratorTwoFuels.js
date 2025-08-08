import { Assert, Config, Dag, K, FuelBedEquations, StandardFuelModels, Util } from '../index.js'
import { configurator } from '../index.js'
import { fuelBedNodes } from '../index.js'

const get = Util.getNode    // short-hand access

console.log(new Date())
const cfg = new Config()

// Test surface fire two fuel model configuration
cfg.surface.fuels.value = 'two fuels'
let map = configurator(cfg)
// console.log(listNodeMap(map))

let fmkey1 = K.s1 + K.fm + K.fmkey
let covr1 = K.s1 + K.covr
let depth1 = K.s1 + K.bed + K.depth
let fm1 = K.s1 + K.fm
let mext1 = K.s1 + K.dead + K.mext
let fmh1load1 = K.s1 + K.fmh1 + K.load
let fmh1savr1 = K.s1 + K.fmh1 + K.load

let fmkey2 = K.s2 + K.fm + K.fmkey
let covr2 = K.s2 + K.covr
let depth2 = K.s2 + K.bed + K.depth
let fm2 = K.s2 + K.fm
let mext2 = K.s2 + K.dead + K.mext
let fmh1load2 = K.s2 + K.fmh1 + K.load
let fmh1savr2 = K.s2 + K.fmh1 + K.load

const assert = new Assert('Behavejs Configurator: Surface Two Fuel Models')
// fuel1 fuel model key is input
.that(fmkey1+' method', get(map,fmkey1).method).equals(Dag.input)
.that(fmkey1+' value', get(map,fmkey1).value).equals('')
// fuel1 coverage is input
.that(covr1+' value', get(map,covr1).value).equals(1)
.that(covr1+' method', get(map,covr1).method).equals(Dag.input)
// fuel1 bed depth is assigned from the fuel model depth
.that(depth1+' value', get(map,depth1).value).equals(1)
.that(depth1+' method', get(map,depth1).method).equals(Dag.assign)
.that(depth1+' args', get(map,depth1).args).equals([fm1+K.depth])
// fuel1 bed dead mext is assigned from the fuel model dead mext
.that(mext1+' value', get(map,mext1).value).equals(1)
.that(mext1+' method', get(map,mext1).method).equals(Dag.assign)
.that(mext1+' args', get(map,mext1).args).equals([fm1+K.mext])
// fuel1 fuel model 1-h load is fetched from the fuel catalog using key1
.that(fmh1load1+' value', get(map,fmh1load1).value).equals(0)
.that(fmh1load1+' method', get(map,fmh1load1).method).equals(StandardFuelModels.load1)
.that(fmh1load1+' args', get(map,fmh1load1).args).equals([fmkey1])
// fuel1 fuel model 1-h savr is fetched from the fuel catalog using key1
.that(fmh1savr1+' value', get(map,fmh1savr1).value).equals(0)
.that(fmh1savr1+' method', get(map,fmh1savr1).method).equals(StandardFuelModels.load1)
.that(fmh1savr1+' args', get(map,fmh1savr1).args).equals([fmkey1])

// fuel2 fuel model key is input
.that(fmkey2+' method', get(map,fmkey2).method).equals(Dag.input)
.that(fmkey2+' value', get(map,fmkey2).value).equals('')
// fuel2 coverage is derived from fuel1 coverage
.that(covr2+' value', get(map,covr2).value).equals(0)
.that(covr2+' method', get(map,covr2).method).equals(FuelBedEquations.secondaryCoverage)
.that(covr2+' args', get(map,covr2).args).equals([covr1])
// fuel2 bed depth is assigned from the fuel model depth
.that(depth2+' value', get(map,depth2).value).equals(1)
.that(depth2+' method', get(map,depth2).method).equals(Dag.assign)
.that(depth2+' args', get(map,depth2).args).equals([fm2+K.depth])
// fuel2 bed dead mext is assigned from the fuel model dead mext
.that(mext2+' value', get(map,mext2).value).equals(1)
.that(mext2+' method', get(map,mext2).method).equals(Dag.assign)
.that(mext2+' args', get(map,mext2).args).equals([fm2+K.mext])
// fuel2 fuel model 1-h load is fetched from the fuel catalog using key2
.that(fmh1load2+' value', get(map,fmh1load2).value).equals(0)
.that(fmh1load2+' method', get(map,fmh1load2).method).equals(StandardFuelModels.load1)
.that(fmh1load2+' args', get(map,fmh1load2).args).equals([fmkey2])
.report().summary()

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
