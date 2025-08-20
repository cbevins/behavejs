import { Curing } from './Curing.js'
import { FuelMoisture } from './FuelMoisture.js'
import { MidflameWind } from './MidflameWind.js'
import { SlopeSteepness } from './SlopeSteepness.js'
import { StandardFuel } from './StandardFuel.js'

const slope = new SlopeSteepness('site/slope/steepness/')
console.log(slope.prefix, slope.inputRatio())

const moisture = new FuelMoisture('site/moisture/')
console.log(moisture.individual())

const curing = new Curing('site/curing/')
console.log(curing.input())

const fuel = new StandardFuel('site/surface/primary/fuel/model/')
console.log(fuel.catalog())

const midflame = new MidflameWind('site/surface/wind')
console.log(midflame.input())
