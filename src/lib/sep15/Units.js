// Defines all the units-of-measure keys
export class Units {
    static bool     = {key: 'boolean',  type: 'boolean', units:[]}
    static compass  = {key: 'degrees',  type: 'compass', units:['degrees']} // real number in range [0..360]
    static degrees  = {key: 'degrees',  type: 'compass', units:['degrees']} // real number in range [0..360]
    static factor   = {key: 'factor',   type: 'real', units:[]} // any number
    static fraction = {key: 'fraction', type: 'fraction', units:[]} // real in range [0..1]
    static integer  = {key: 'integer',  type: 'integer', units:[]} // any integer
    static posint   = {key: 'posint',   type: 'posint', units:[]}  // any non-negative integer
    static posratio = {key: 'posratio', type: 'posratio', units:[]} // any non-negative rational number
    static posreal  = {key: 'posreal',  type: 'posreal', units:[]} // any non-negative real
    static ratio    = {key: 'ratio',    type: 'ratio', units:[]} // any rational number

    static fireFlame= {key: 'fire flame length', type: 'posreal', units:['ft']}
    static fireHpua = {key: 'fire heat per unit area', type: 'posreal', units:['BTU/ft2']}
    static fireRos  = {key: 'fire spread rate'}                  // ft/min
    static fireRxi  = {key: 'fire reaction intensity'}           // BTU/ft2-min
    static fireFli  = {key: 'fireline intensity'}
    static fireTaur = {key: 'fire residence time'}               // min

    static fuelBulk = {key: 'fuel bulk density'}                       // lb/ft3
    static fuelCode = {key: 'standard fuel model code'}
    static fuelDepth= {key: 'fuel depth'}                        // ft
    static fuelDens = {key: 'fuel bulk and particle density'}    // lb/ft3
    static fuelHeat = {key: 'fuel heat of combustion'}           // BTU/lb
    static fuelKey  = {key: 'standard fuel model key'}
    static fuelLabel= {key: 'standard fuel model label'}
    static fuelLeng = {key: 'fuel diameter, depth, and length'}  // ft
    static fuelLife = {key: 'fuel life categories'}                    // 'dead' or 'live'
    static fuelLoad = {key: 'fuel load'}                         // lb/ft2
    static fuelMois = {key: 'fuel moisture content'}             // fraction
    static fuelNumb = {key: 'standard fuel model number'}
    static fuelQig  = {key: 'fuel heat of pre-ignition'}         // BTU/lb
    static fuelRxv  = {key: 'reaction velocity'}                 // 1/min
    static fuelSa   = {key: 'fuel surface area'}                 // ft2
    static fuelSavr = {key: 'fuel surface area-to-volume ratio'} // ft2/ft3
    static fuelSink = {key: 'fuel heat sink'}                          // BTU/ft3
    static fuelSize = {key: 'fuel size class'}                         // [0..5]
    static fuelWtg  = {key: 'fuel weighting factor'}             // fraction, percent
    static fuelFrac = {key: 'fuel portion units [0..1]'}               // fraction, percent
    static fuelVol  = {key: 'fuel volume'}                       // ft3

    static fuelKey  = {key: 'fuel key'}                    // fuel model code or number
    static fuelModel= {key: 'fuel model'}                  // 'standard', 'chaparral', 'western aspen', 'palmetto-gallberry'
    static fuelSawf = {key: 'surface area weighting factor'}// fraction
    static fuelScwf = {key: 'size class weighting factor'} // fraction
    static fuelSeff = {key: 'mineral content'}             // fraction
    static fuelStot = {key: 'mineral content'}             // fraction
    static fuelType = {key: 'fuel type'}                   // 'dead-down', 'herb', 'stem', 'duff'

    static treeLeng = {key: 'tree length dimensions'}      // ft

    static windSpeed = {key: 'wind speed'}

    static yesno = {key: 'yes or no'}
}
