import { StandardFuelModels } from "./StandardFuelModels.js"
import {Expect} from '../index.js'

const tu1 =[161, "tu1", "Light load, dry climate timber-grass-shrub", 0.6, 0.2,
    0.009182736455463728, 0.04132231404958678, 0.06887052341597796, 0.009182736455463728, 0.04132231404958678,
    2000, 1800, 1600, 8000, 8000]

const expect = new Expect('StandardFuelModel.js Tests')
expect.equal('Standard fuel model map size', 148, StandardFuelModels.getMap().size)
.equal('Fuel map has numerical key 1', true, StandardFuelModels.has(1))
.equal('Fuel map has string numerical key "1"', true, StandardFuelModels.has("1"))
.equal('Fuel map has lower case key "tu1"', true, StandardFuelModels.has("tu1"))
.equal('Fuel map has upper case key "TU1"', true, StandardFuelModels.has("TU1"))
.equal('getData() returns fuel array', tu1, StandardFuelModels.getData("TU1"))
.equal('getObj returns fuel object', {}, StandardFuelModels.getObj("TU1"))
.equal('load1("TU1")', tu1[5], StandardFuelModels.load1("TU1"))
.equal('load10("TU1")', tu1[6], StandardFuelModels.load10("TU1"))
.equal('load100("TU1")', tu1[7], StandardFuelModels.load100("TU1"))
.equal('loadHerb("TU1")', tu1[8], StandardFuelModels.loadHerb("TU1"))
.equal('loadStem("TU1")', tu1[9], StandardFuelModels.loadStem("TU1"))
.equal('loadCured("TU1")', tu1[8]*0.5, StandardFuelModels.loadCured("TU1", 0.5))
.equal('loadUncured("TU1")', tu1[8]*0.5, StandardFuelModels.loadUncured("TU1", 0.5))
.equal('savr1("TU1")', tu1[10], StandardFuelModels.savr1("TU1"))
.equal('savrHerb("TU1")', tu1[11], StandardFuelModels.savrHerb("TU1"))
.equal('savrStem("TU1")', tu1[12], StandardFuelModels.savrStem("TU1"))

// These tests fail on purpose
// .equal('not an array', [1,2,3], 4)
// .equal('array not equal', [1,2,3], [3,2,1])
// .alike('array are alike', [1,2,3], [3,2,1])
// .alike('array not same length', [1,2,3], [3,2,1,0])
// .equal('not an object', {a: 1, b:2}, {})
// .equal('object missing key', {a: 1, b:2}, {a: 2})
// .equal('object key unequal', {a: 1, b:2}, {a: 2, b:2})