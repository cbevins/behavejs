import { StandardFuelModels } from '../index.js'
export class Base {
    constructor(key, value) {
        this.key = key
        this.value = value

        this.isBool = false
        this.isNumeric = false
        this.isQuantity = false
        this.isReal = false
        this.isInteger = false
        this.isString = false
    }
}

export class Bool extends Base {
    constructor(key, value=false) {
        super(key, value)
        this.isBool = true
    }
}

export class Numeric extends Base {
    constructor(key, value=0) {
        super(key, value)
        this.isNumeric = true
    }
}

export class Integer extends Numeric {
    constructor(key, value=0) {
        super(key, value)
        this.isInteger = true
        this.min = Number.MIN_SAFE_INTEGER
        this.max = Number.MAX_SAFE_INTEGER
    }
}

export class FuelSizeClass extends Integer {
    constructor(key='fuel size class', value=5) {
        super(key, value)
        this.isInteger = true
        this.min = 0
        this.max = 5
    }
}

export class Real extends Numeric {
    constructor(key, value=0) {
        super(key, value)
        this.isReal = true
        this.min = Number.NEGATIVE_INFINITY
        this.max = Number.POSITIVE_INFINITY
    }
}

export class BaseString extends Base {
    constructor(key, value='') {
        super(key, value)
        this.isString = true
        this.minLength = 0
        this.maxLength = 2**16 - 1
    }
}

//------------------------------------------------------------------------------
// Non-quantity Factor Derived classes
//------------------------------------------------------------------------------

export class Factor extends Real {
    constructor(key='factor', value=1) {super(key, value)}
}

export class MapScale extends Factor {
    constructor(key='map scale', value=1) {super(key, value)}
}

export class Ratio extends Real {
    constructor(key='ratio', value=1) {super(key, value)}
}

//------------------------------------------------------------------------------
// Non-quantity Fraction Derived classes
//------------------------------------------------------------------------------

export class Fraction extends Real {
    constructor(key='fraction', value=0) {
        super(key, value)
        this.units = ['ratio', 'percent']
        this.min = 0
        this.max = 1
    }
}

export class EffectiveMineralContent extends Fraction {
    constructor(key='effective mineral content', value=0) {
        super(key, value)
    }
}

export class TotalMineralContent extends Fraction {
    constructor(key='total mineral content', value=0) {
        super(key, value)
    }
}

export class MoistureContent extends Fraction {
    constructor(key='moisture content', value=0) {
        super(key, value)
    }
}

export class WeightingFactor extends Fraction {
    constructor(key='weighting factor', value=0) {
        super(key, value)
    }
}

//------------------------------------------------------------------------------
// Simple Quantity Derived classes
//------------------------------------------------------------------------------

export class Quantity extends Real {
    constructor(key='quantity', value=0) {
        super(key, value)
        this.isQuantity = true
        this.units = []
        this.min = 0
    }
}

//------------------------------------------------------------------------------
// Arc - Angles and its specializations
//------------------------------------------------------------------------------

export class Angle extends Quantity {
    constructor(key='angle', value=0) {
        super(key, value)
        this.units = ['deg', 'rad']
        this.min = -360
        this.max = 360
    }
}

export class Compass extends Angle {
    constructor(key='compass', value=0) {
        super(key, value)
    }
}

//------------------------------------------------------------------------------
// Area and its specializations
//------------------------------------------------------------------------------

export class Area extends Quantity {
    constructor(key='area', value=0) {
        super(key, value)
        this.units = ['ft2', 'm2', 'ac', 'ha', 'in2', 'cm2', 'yd2', 'mi2', 'km2']
    }
}

export class FireArea extends Area {
    constructor(key='fire area', value=0) {
        super(key, value)
        this.units = ['ft2', 'm2', 'ac', 'ha', 'mi2', 'km2']
    }
}

export class FuelArea extends Area {
    constructor(key='surface area', value=0) {
        super(key, value)
        this.units = ['ft2', 'm2']
    }
}

export class MapArea extends Area {
    constructor(key='map area', value=0) {
        super(key, value)
        this.units = ['in2', 'cm2']
    }
}

//------------------------------------------------------------------------------
// Density and its specializations
//------------------------------------------------------------------------------

export class Density extends Quantity {
    constructor(key='density', value=0) {
        super(key, value)
        this.units = ['lb/ft3', 'kg/m3']
    }
}

export class BulkDensity extends Density {
    constructor(key='fuel bed bulk density', value=0) {
        super(key, value)
        this.units = ['lb/ft3', 'kg/m3']
    }
}

export class FuelDensity extends Density {
    constructor(key='fuel fiber density', value=0) {
        super(key, value)
        this.units = ['lb/ft3', 'kg/m3']
    }
}

//------------------------------------------------------------------------------
// Distance (ft) and its specializations
//------------------------------------------------------------------------------

export class Distance extends Quantity {
    constructor(key='distance', value=0) {
        super(key, value)
        this.units = ['ft', 'm', 'in', 'cm', 'yd', 'mi', 'km']
    }
}

export class Elevation extends Distance {
    constructor(key='elevation', value=0) {
        super(key, value)
        this.units = ['ft', 'm']
    }
}

export class FireDistance extends Distance {
    constructor(key='fire distance', value=0) {
        super(key, value)
        this.units = ['ft', 'm', 'ch', 'mi', 'km']
    }
}

export class FlameLength extends Distance {
    constructor(key='flame length', value=0) {
        super(key, value)
        this.units = ['ft', 'm']
    }
}

export class FuelDepth extends Distance {
    constructor(key='fuel depth', value=0) {
        super(key, value)
        this.units = ['ft', 'm', 'in', 'cm']
    }
}

export class FuelLength extends Distance {
    constructor(key='fuel length', value=0) {
        super(key, value)
        this.units = ['ft', 'm', 'in', 'cm']
    }
}

export class FirePoint extends FireDistance {
    constructor(key='fire pont x-, y-coordinate', value=0) {
        super(key, value)
    }
}

export class MapDistance extends Distance {
    constructor(key='map distance', value=0) {
        super(key, value)
        this.units = ['in', 'cm', 'ft', 'm']
    }
}

export class ScorchHeight extends Distance {
    constructor(key='scorch height', value=0) {
        super(key, value)
        this.units = ['ft', 'm']
    }
}

export class TreeHeight extends Distance {
    constructor(key='tree height', value=0) {
        super(key, value)
        this.units = ['ft', 'm']
    }
}

//------------------------------------------------------------------------------
// Heat (BTU) content and its specializations
//------------------------------------------------------------------------------

// BTU/lb
export class HeatContent extends Quantity {
    constructor(key='heat content', value=0) {
        super(key, value)
        this.units = ['BTU/lb', 'mJ/kg']
    }
}

export class HeatPreIgnition extends HeatContent {
    constructor(key='heat of pre-ignition', value=0) {
        super(key, value)
    }
}

export class HeatCombustion extends HeatContent {
    constructor(key='heat of combustion', value=0) {
        super(key, value)
    }
}

// BTU/ft2
export class HeatPerUnitArea extends Quantity {
    constructor(key='heat per unit area', value=0) {
        super(key, value)
        this.units = ['BTU/ft2', 'mJ/m2']
    }
}
// BTU/ft3
export class HeatDensity extends Quantity {
    constructor(key='heat density', value=0) {
        super(key, value)
        this.units = ['BTU/ft3', 'mJ/m3']
    }
}

export class HeatSink extends HeatDensity {
    constructor(key='heat sink', value=0) {
        super(key, value)
    }
}
// BTU/ft2/min
export class ReactionIntensity extends Quantity {
    constructor(key='fire reaction intensity', value=0) {
        super(key, value)
        this.units = ['BTU/ft2/min']
    }
}
// BTU/ft/s
export class FirelineIntensity extends Quantity {
    constructor(key='fireline intensity', value=0) {
        super(key, value)
        this.units = ['BTU/ft/s']
    }
}

//------------------------------------------------------------------------------
// Hertz (1/min) and its specializations
//------------------------------------------------------------------------------

export class Hertz extends Quantity {
    constructor(key='hertz', value=0) {
        super(key, value)
        this.units = ['1/min']
    }
}

export class ReactionVelocity extends Hertz {
    constructor(key='reaction velocity', value=0) {
        super(key, value)
    }
}

//------------------------------------------------------------------------------
// Load (lb/ft2) and its specializations
//------------------------------------------------------------------------------

export class Load extends Quantity {
    constructor(key='load', value=0) {
        super(key, value)
        this.units = ['lb/ft2', 'kg/m2', 't/ac', 'T/ha']
    }
}

export class FuelLoad extends Load {
    constructor(key='fuel load', value=0) {
        super(key, value)
    }
}

//------------------------------------------------------------------------------
// Mass (lb) and its specializations
//------------------------------------------------------------------------------

export class Mass extends Quantity {
    constructor(key='mass', value=0) {
        super(key, value)
        this.units = ['lb', 'kg', 't', 'T']
    }
}

//------------------------------------------------------------------------------
// Power and its specializations
//------------------------------------------------------------------------------

// The power of the fire is the rate at which energy is released (ft lb/s),
// and is calculated on a unit area basis, ft lb/(s ft2), which reduces to lb/ft/s
export class PowerOfFire extends Quantity {
    constructor(key='power of the fire', value=0) {
        super(key, value)
        this.units =  ['ft lb/ft2/s'] //, 'kg m2 s-3', 'W', 'J/s']
    }
}

//------------------------------------------------------------------------------
// String and its specializations
//------------------------------------------------------------------------------

export class FuelKey extends BaseString {
    constructor(key='fuel model key', value='10') {
        super(key, value)
        this.members = []
        for(let mod of StandardFuelModels) {
            const [num, key] = mod
            const numkey = ''+num
            this.members.push(key)
            if (numkey !== key) this.members.push(numkey)
        }
    }
}

export class FuelLife extends BaseString {
    constructor(key='fuel life category', value='dead') {
        super(key, value)
        this.members = ['dead', 'live']
    }
}

export class FuelType extends BaseString {
    constructor(key='fuel type', value='unused') {
        super(key, value)
        this.members = ['unused', 'dead-down', 'herb', 'stem', 'duff']
    }
}

//------------------------------------------------------------------------------
// Surface area-to-volume ratio (ft2/ft3) and its specializations
//------------------------------------------------------------------------------

export class SAVR extends Quantity {
    constructor(key='surface area-to-volume ratio', value=0) {
        super(key, value)
        this.units = ['ft2/ft3', 'm2/m3']
    }
}

//------------------------------------------------------------------------------
// Temperature (F) and its specializations
//------------------------------------------------------------------------------

export class Temperature extends Quantity {
    constructor(key='temperature', value=0) {
        super(key, value)
        this.units = ['F', 'C', 'K']
    }
}

//------------------------------------------------------------------------------
// Time (min) and its specializations
//------------------------------------------------------------------------------

export class Time extends Quantity {
    constructor(key='time', value=0) {
        super(key, value)
        this.units = ['min', 's', 'h', 'd', 'ms']
    }
}

export class FireResidenceTime extends Time {
    constructor(key='fire residence time', value=0) {
        super(key, value)
        this.units = ['min']
    }
}

export class FireTime extends Time {
    constructor(key='elapsed fire time', value=0) {
        super(key, value)
        this.units = ['min', 'h']
    }
}

//------------------------------------------------------------------------------
// Velocity (ft/min) and its specializations
//------------------------------------------------------------------------------

export class Velocity extends Quantity {
    constructor(key='velocity', value=0) {
        super(key, value)
        this.units = ['ft/min', 'm/min', 'ft/s', 'm/s', 'mi/h', 'km/h']
    }
}

export class FireRos extends Velocity {
    constructor(key='fire spread rate', value=0) {
        super(key, value)
        this.units = ['ft/min', 'm/min', 'ch/h', 'mi/h', 'km/h']
    }
}

export class WindSpeed extends Velocity {
    constructor(key='wind speed', value=0) {
        super(key, value)
        this.units = ['ft/min', 'm/min', 'mi/h', 'km/h']
    }
}

//------------------------------------------------------------------------------
// Volume (ft3) and its specializations
//------------------------------------------------------------------------------

export class Volume extends Quantity {
    constructor(key='volume', value=0) {
        super(key, value)
        this.units = ['ft3', 'm3']
    }
}

export class FuelVolume extends Volume {
    constructor(key='fuel volume', value=0) {
        super(key, value)
        this.units = ['ft3', 'm3']
    }
}
