export class Units {
    static text = 'text'
    static cdeg = 'compass degrees from north'
    static ratio = 'ratio'
    static fraction = 'fraction'
    static factor = 'factor'
    static length = 'length'                        // ft
    static yesno = 'yes or no'                      //

    // Fuel Module units
    static bulk = 'bulk density'                    // lb/ft3
    static dens = 'fiber density'                   // lb/ft3
    static depth = 'depth'
    static diam = 'diameter'
    static efwl = 'water load'                      // lb/ft2
    static ehn   = 'effective heating number'       // fraction
    static fleng = 'fuel length, diameter'          // ft
    static fmcode = 'fuel model code'
    static fmkey = 'fuel model key'                 // text 1-4 chars
    static fmlabel = 'fuel model label'
    static fmnumb = 'fuel model number'
    static ftype = 'fuel type'                      // text
    static heat = 'heat of combustion'              // BTU/lb
    static hpua = 'heat per unit area'              // BTU/ft2
    static life = 'fuel life'                       // 'dead' or 'live'
    static load = 'ovendry fuel load'               // lb/ft2
    static mois = 'moisture content'                // ratio
    static qig  = 'heat of pre-ignition'            // BTU/lb
    static rxi  = 'reaction intensity'              // BTU/ft2/min
    static rxv  = 'reaction  velocity'              // 1/min 
    static sa   = 'surface area'                    // ft2
    static savr = 'surface area to volume ratio'    // ft2/ft3
    static sawf = 'surface area weighting factor'   // ratio
    static scwf = 'size class weighting factor'     // ratio
    static seff = 'mineral content'                 // fraction
    static size = 'size class'                      // 1-6
    static stot = 'mineral content'                 // fraction
    static vol  = 'volume'                          // ft3
    
    // Canopy module
    static clen = 'canopy length, height'           // ft

    // Surface Module
    static wlim = 'wind limit applied'              // 'yes', 'no'
    
    // Slope Module units
    static srat = 'vertical rise to horizontal reach'
    static sdeg = 'degrees above horizontal'

    // Wind Module units
    static wdir = 'wind/direction'
    static wspd = 'wind/speed'                      // ft/min
}