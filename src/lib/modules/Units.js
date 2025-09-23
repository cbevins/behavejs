// Defines all the units-of-measure keys
export class Units {
    // Base units that define the 'type' prop of all other units
    static bool     = {key: 'boolean',  type: 'boolean',  units: []}
    static compass  = {key: 'compass',  type: 'compass',  units: ['degrees', 'radians']} // real number in range [0..360]
    static degrees  = {key: 'degrees',  type: 'compass',  units: ['degrees', 'radians']} // real number in range [0..360]
    static factor   = {key: 'factor',   type: 'real',     units: []} // any number
    static fraction = {key: 'fraction', type: 'fraction', units: ['ratio', 'percent']} // real in range [0..1]
    static integer  = {key: 'integer',  type: 'integer',  units: []} // any integer
    static posint   = {key: 'posint',   type: 'posint',   units: []}  // any non-negative integer
    static posratio = {key: 'posratio', type: 'posratio', units: []} // any non-negative rational number
    static posreal  = {key: 'posreal',  type: 'posreal',  units: []} // any non-negative real
    static real     = {key: 'real',     type: 'real',     units: []}  // any real value
    static quantity = {key: 'quantity', type: 'posreal',  units: []}
    static ratio    = {key: 'ratio',    type: 'ratio',    units: ['ratio']} // any rational number, no percent option
    static select   = {key: 'select',   type: 'select',   units: []}    // array of valid strings
    static temp     = {key: 'temp',     type: 'real',     units: ['F', 'C']}
    static text     = {key: 'text',     type: 'text',     units: [0,16]}  // takes min and max length args
    static time     = {key: 'time',     type: 'time',     units: []}

    static fireArea   = {key: 'fire area', type: 'quantity', units: ['ft2', 'm2']}
    static fireDist   = {key: 'fire distance', type: 'quantity', units: ['ft', 'm', 'mi', 'km']}
    static fireFlame  = {key: 'fire flame length', type: 'quantity', units: ['ft', 'm']}
    static fireHpua   = {key: 'fire heat per unit area', type: 'quantity', units: ['BTU/ft2']}
    static fireRos    = {key: 'fire spread rate', type: 'quantity', units: ['ft/min']}
    static fireRxi    = {key: 'fire reaction intensity', type: 'quantity', units: ['BTU/ft2-min']}
    static fireFli    = {key: 'fireline intensity', type: 'quantity', units: ['BTU/ft-s']}
    static fireScorch = {key: 'fire scorch height', type: 'quantity', units: ['ft', 'm']}
    static fireTaur   = {key: 'fire residence time', type: 'time', units: ['min']}
    static fireTime   = {key: 'fire elapsed time', type: 'time', units: ['min', 'h']}

    static fuelBulk = {key: 'fuel bulk density'}                       // lb/ft3
    static fuelCode = {key: 'standard fuel model code'}
    static fuelDepth= {key: 'fuel depth'}                        // ft
    static fuelDens = {key: 'fuel bulk and particle density'}    // lb/ft3
    static fuelHeat = {key: 'fuel heat of combustion'}           // BTU/lb
    static fuelKey  = {key: 'standard fuel model key'}
    static fuelLabel= {key: 'standard fuel model label'}
    static fuelLeng = {key: 'fuel diameter, depth, and length'}  // ft
    static fuelLife = {key: 'fuel life categories', type: 'select', units: ['dead', 'live']}
    static fuelLoad = {key: 'fuel load', type: 'quantity', units: ['lb/ft2']}
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

    static fuelKey  = {key: 'fuel key', type: 'string', units: ['10', '124']} // fuel model code or number
    static fuelModel= {key: 'fuel model', type: 'select', units: ['standard', 'chaparral', 'western aspen', 'palmetto-gallberry']}
    static fuelSawf = {key: 'surface area weighting factor', type: 'fraction', units: []}
    static fuelScwf = {key: 'size class weighting factor', type: 'fraction', units: []}
    static fuelSeff = {key: 'mineral content', type: 'fraction', units: []} // units defer to 'fraction'
    static fuelStot = {key: 'mineral content', type: 'fraction', units: []}
    static fuelType = {key: 'fuel type', type: 'select', units: ['dead-down', 'herb', 'stem', 'duff']}

    static mapArea  = {key: 'map area', type: 'quantity', units: ['in2', 'cm2']}
    static mapDist  = {key: 'map distance', type: 'quantity', units: ['in', 'cm']}
    static mapScale = {key: 'map scale', type: 'posreal', units: [] }

    static treeLeng = {key: 'tree lengths', type: 'quantity', units: ['ft', 'm']}

    static windSpeed = {key: 'wind speed', type: 'quantity', units: ['ft/min', 'mi/h', 'm/s', 'km/h']}

    static yesno = {key: 'yes or no', type: 'select', units: ['yes', 'no']}
}
