// Defines all the units-of-measure keys
export class U {
    static degrees  = 'degrees'
    static factor   = 'factor units'                      // any number
    static fraction = 'fraction units'                    // number [0..1]
    static ratio    = 'ratio units'                       // any rational number

    static fireRos  = 'fire spread rate units'                  // ft/min
    static fireRxi  = 'fire reaction intensity units'           // BTU/ft2-min
    static fireFli  = 'fireline intensity units'

    static fuelLeng = 'fuel diameter, depth, and length units'  // ft
    static fuelDens = 'fuel bulk and particle density units'    // lb/ft3
    static fuelHeat = 'fuel heat of combustion units'           // BTU/lb
    static fuelLife = 'fuel life categories'                    // 'dead' or 'live'
    static fuelLoad = 'fuel load units'                         // lb/ft2
    static fuelMois = 'fuel moisture content units'             // fraction
    static fuelQig  = 'fuel heat of pre-ignition units'         // BTU/lb
    static fuelRxv  = 'reaction velocity units'                 // 1/min
    static fuelSa   = 'fuel surface area units'                 // ft2
    static fuelSavr = 'fuel surface area-to-volume ratio units' // ft2/ft3
    static fuelSink = 'fuel heat sink'                          // BTU/ft3
    static fuelWtg  = 'fuel weighting factor units'             // fraction, percent
    static fuelFrac = 'fuel portion units [0..1]'               // fraction, percent
    static fuelVol  = 'fuel volume units'                       // ft3

    static fuelKey  = 'fuel key'                    // fuel model code or number
    static fuelModel= 'fuel model'                  // 'standard', 'chaparral', 'western aspen', 'palmetto-gallberry'
    static fuelSawf = 'surface area weighting factor'// fraction
    static fuelScwf = 'size class weighting factor' // fraction
    static fuelSeff = 'mineral content'             // fraction
    static fuelStot = 'mineral content'             // fraction
    static fuelType = 'fuel type'                   // 'dead-down', 'herb', 'stem', 'duff'

    static treeLeng = 'tree length dimensions'      // ft

    static windSpeed = 'wind speed units'
}
