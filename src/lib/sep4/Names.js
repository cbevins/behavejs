// Defines all the units-of-measure keys
export class U {
    static bulkDens = 'bulk density'                // lb/ft3
    static curedLive = 'cured live fraction'        // fraction
    static fuelDens = 'fiber density'               // lb/ft3
    static fuelDiam = 'cylindrical diameter'        // ft
    static fuelEhn  = 'effective heating number'    // fraction
    static fuelHeat = 'heat of combustion'          // BTU/lb
    static fuelKey  = 'fuel key'
    static fuelLife = 'fuel life'                   // 'dead' or 'live'
    static fuelLoad = 'ovendry fuel load'           // lb/ft2
    static fuelModel= 'fuel model'                  // 'standard', 'chaparral', 'western aspen', 'palmetto-gallberry'
    static fuelMois = 'moisture content'            // fraction
    static fuelQig  = 'heat of pre-ignition'
    static fuelSa   = 'surface area'                //ft2
    static fuelSavr = 'surface area-to-volume ratio'// ft2/ft3
    static fuelScwf = 'size class weighting factor' // fraction
    static fuelSeff = 'mineral content'             // fraction
    static fuelStot = 'mineral content'             // fraction
    static fuelType = 'fuel type'                   // 'dead-down', 'herb', 'stem', 'duff'
    static fuelVol  = 'volume'                      // ft3
}

// Defines common leaf segment keys
export class L {
    static bulkDens = 'bulk density'
    static fuelDens = 'fiber density'
    static fuelDepth = 'depth'
    static fuelDiam = 'cylindrical diameter'
    static fuelEfol = 'effective fuel/ovendry load'
    static fuelEfwl = 'effective fuel/water load'
    static fuelEhn  = 'effective heating number'
    static fuelHeat = 'heat of combustion'      // BTU/lb
    static fuelLeng = 'cylindrical length'
    static fuelLife = 'life category'           // lb/ft2
    static fuelLoad = 'ovendry fuel load'       // lb/ft2
    static fuelNet  = 'net ovendry load'
    static fuelMext = 'extinction moisture content'
    static fuelMois = 'moisture content'
    static fuelQig  = 'heat of pre-ignition'
    static fuelSa   = 'surface area'
    static fuelSavr = 'surface area-to-volume ratio'
    static fuelSawf = 'surface area weighting factor'
    static fuelScar = 'size class weighting array'
    static fuelScwf = 'size class weighting factor'
    static fuelSeff = 'silica-free mineral content'     // fraction
    static fuelSize = 'size class'
    static fuelStot = 'total mineral content'     // fraction
    static fuelType = 'fuel type'
    static fuelVol  = 'volume'
}

export class P {
    static canopy    = 'site/canopy/'
    static constants = 'constants/'
    static terrain   = 'site/terrain/'
    static slope     = 'site/terrain/slope/'
    static moisture  = 'site/weather/moisture/'
    static deadmois  = 'site/weather/moisture/dead/'
    static livemois  = 'site/weather/moisture/live/'
    static windDir   = 'site/weather/wind/direction/'
    static windSpeed = 'site/weather/wind/speed/'

    static sfire = 'site/surface/fire'
    static cfire = 'site/crown/fire'

    static curing1   = 'site/surface/primary/curing/'
    static bed1      = `site/surface/primary/bed/`
    static dead1     = `site/surface/primary/bed/dead/`
    static live1     = `site/surface/primary/bed/live/`
    static model1    = `site/surface/primary/model/`
    static standard1 = `site/surface/primary/model/standard/`
    static fire1     = `site/surface/primary/fire/`
}

// Fuel constant node keys
export class K {
    static fuelDeadCat = 'constants/fuel/life/dead category'
    static fuelLiveCat = 'constants/fuel/life/live category'

    static fuelStandard = 'constants/fuel/model/standard'
    static fuelChaparral ='constants/fuel/model/chaparral'
    static fuelAspen = 'constants/fuel/model/western aspen'
    static fuelPg = 'constants/fuel/model/palmetto-gallberry'

    static fuelDeadDown = 'constants/fuel/type/dead-down'
    static fuelGrass = 'constants/fuel/type/grass'
    static fuelDuff = 'constants/fuel/type/duff'
    static fuelHerb = 'constants/fuel/type/herb'
    static fuelStem = 'constants/fuel/type/stem'
    static fuelCured = 'constants/fuel/type/cured'
    static fuelUnused = 'constants/fuel/type/unused'

    static fuelDens = 'constants/fuel/fiber density'
    static fuelHeat = 'constants/fuel/heat of combustion'      // BTU/lb
    static fuelLife = 'constants/fuel/life category'           // lb/ft2
    static fuelLoad = 'constants/fuel/ovendry fuel load'       // lb/ft2
    static fuelSavr = 'constants/fuel/surface area-to-volume ratio'
    static fuelSeff = 'constants/fuel/silica-free mineral content'     // fraction
    static fuelStot = 'constants/fuel/total mineral content'     // fraction
    static fuelType = 'constants/fuel/fuel type'

    static zero = 'constants/zero'
    static one = 'constants/one'
}