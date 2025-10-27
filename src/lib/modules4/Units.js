export class Units {
    // Base units that define the 'type' prop of all other units
    static area     = {key: 'area',     type: 'area',       value: 0,       units: ['ft2', 'ac', 'in2', 'yd2', 'mi2', 'm2', 'ha', 'cm2', 'km2']}
    static bool     = {key: 'boolean',  type: 'boolean',    value: false,   units: []}
    static compass  = {key: 'compass',  type: 'compass',    value: 0,       units: ['degrees', 'radians']} // real number in range [0..360]
    static degrees  = {key: 'degrees',  type: 'compass',    value: 0,       units: ['degrees', 'radians']} // real number in range [0..360]
    static factor   = {key: 'factor',   type: 'real',       value: 1,       units: []} // any number
    static density  = {key: 'density',  type: 'density',    value: 0,       units: ['lb/ft3', 'kg/m3']}
    static distance = {key: 'distance', type: 'distance',   value: 0,       units: ['ft',  'in', 'yd', 'mi', 'ch', 'm', 'cm', 'km']}
    static fraction = {key: 'fraction', type: 'fraction',   value: 0,       units: ['ratio', 'percent']} // real in range [0..1]
    static geocoord = {key: 'geocoord', type: 'geocoord',   value: 0,       units: []}
    static integer  = {key: 'integer',  type: 'integer',    value: 0,       units: []}
    static load     = {key: 'load',     type: 'load',       value: 0,       units: ['lb/ft2', 't/ac', 'kg/m2', 'T/ha']}
    static ratio    = {key: 'ratio',    type: 'ratio',      value: 1,       units: ['ratio']} // any rational number, no percent option
    static set      = {key: 'set',      type: 'set',        value: '',      units: []} // must be defined by each derived type
    static temperature = {key: 'temperature', type: 'temperature',value: 0, units: ['F', 'C']}
    static time     = {key: 'time',     type: 'time',       value: 0,       units: ['min', 's', 'h', 'd', 'ms']}
    static velocity = {key: 'velocity', type: 'velocity',   value: 0,       units: ['ft/min', 'ch/h', 'mi/h', 'm/min', 'km/h']}

    // Derived units-of-measure.  These may specify a subset of their parent's units
    static fireArea   = {key: 'fire area',              type: 'area',       value: 0, units: ['ft2', 'ac', 'mi2', 'm2', 'ha', 'km2']}
    static fireDist   = {key: 'fire distance',          type: 'distance',   value: 0, units: ['ft', 'm', 'mi', 'km']}
    static fireFlame  = {key: 'fire flame length',      type: 'distance',   value: 0, units: ['ft', 'm']}
    static fireHpua   = {key: 'fire heat per unit area',type: 'quantity',   value: 0, units: ['BTU/ft2']}
    static fireRos    = {key: 'fire spread rate',       type: 'velocity',   value: 0, units: ['ft/min', 'ch/h', 'mi/h', 'm/min', 'km/h']}     
    static fireRxi    = {key: 'fire reaction intensity',type: 'quantity',   value: 0, units: ['BTU/ft2-min']}
    static fireFli    = {key: 'fireline intensity',     type: 'quantity',   value: 0, units: ['BTU/ft-s']}
    static firePower  = {key: 'power of the fire',      type: 'quantity',   value: 0, units: [['kg m2 s-3', 'W', 'J/s']]}
    static fireScorch = {key: 'fire scorch height',     type: 'distance',   value: 0, units: ['ft', 'm']}
    static fireTaur   = {key: 'fire residence time',    type: 'time',       value: 0, units: ['min']}
    static fireTime   = {key: 'fire elapsed time',      type: 'time',       value: 0, units: ['min', 'h']}

    static fuelArea = {key: 'fuel surface area',        type: 'area',       value: 0, units: ['ft2', 'm2']}
    static fuelDens = {key: 'fuel fiber density',       type: 'density',    value: 32, units: ['lb/ft3', 'kg/m3']}
    static fuelDepth= {key: 'fuel bed depth',           type: 'distance',   value: 0, units: ['ft', 'in', 'm', 'cm']}
    static fuelBulk = {key: 'fuel bulk density',        type: 'density',    value: 0, units: ['lb/ft3', 'kg/m3']}
    static fuelHeat = {key: 'fuel heat of combustion',  type: 'heat content',value: 8000, units: ['BTU/lb']}
    static fuelLeng = {key: 'fuel cylindrical length',  type: 'distance',   value: 0, units: ['ft', 'm', 'cm', 'in']}
    static fuelLife = {key: 'fuel life category',       type: 'set',        value: 'dead', units: ['dead', 'live']}
    static fuelLoad = {key: 'fuel ovendry load',        type: 'load',       value: 0}
    static fuelKey  = {key: 'fuel catalog key',         type: 'set',        value: '10', units: ['10', '124']}
    static fuelMois = {key: 'fuel moisture content',    type: 'fraction',   value: 0}
    static fuelQig  = {key: 'fuel heat of pre-ignition',type: 'heat content',value: 0, units: ['BTU/lb']}
    static fuelRxv  = {key: 'fuel reaction velocity',   type: 'herz',       value: 0,   units: ['1/min']}
    static fuelSavr = {key: 'fuel surface area-to-volume ratio', type: 'ratio', value: 1}
    static fuelSeff = {key: 'fuel effective mineral content', type: 'fraction', value: 0.01}
    static fuelSink = {key: 'fuel heat sink',           type: 'heat volume',value: 0,   units: ['BTU/ft3']}
    static fuelSize = {key: 'fuel size class',          type: 'integer',    value: 5,   range: [0,5]}
    static fuelStot = {key: 'fuel total mineral content', type: 'fraction', value: 0.0555}
    static fuelType = {key: 'fuel type',                type: 'set',        value: 'unused', units: ['unused', 'dead-down', 'herb', 'stem', 'duff']}
    static fuelVol  = {key: 'fuel volume',              type: 'volume',     value: 0,   units: ['ft3', 'm3']}
    static fuelWtg  = {key: 'fuel weighting factor',    type: 'fraction',   value: 0}

    static mapArea  = {key: 'map area',                 type: 'area',       units: ['in2', 'cm2']}
    static mapDist  = {key: 'map distance',             type: 'distance',   units: ['in', 'cm']}
    static mapScale = {key: 'map scale',                type: 'factor',     units: [] }

    static treeLeng = {key: 'tree length',              type: 'distance',   value: 0, units: ['ft', 'm']}

    static windSpeed= {key: 'wind speed',               type: 'velocity',   value: 0, units: ['ft/min', 'mi/h', 'm/s', 'km/h']}
}