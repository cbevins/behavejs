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

export class P {
    static canopy    = 'site/canopy/'
    static constants = 'constants/'
    static terrain   = 'site/terrain/'
    static slope     = 'site/terrain/slope/'    // ratio, degrees
    static slopeDegrees= 'site/terrain/slope/steepness/degrees'
    static slopeRatio= 'site/terrain/slope/steepness/ratio'
    static aspect    = 'site/terrain/aspect/'   // upslope, downslope
    static moisture  = 'site/weather/moisture/'
    static deadmois  = 'site/weather/moisture/dead/'    // tl1h, tl10h, tl100h
    static livemois  = 'site/weather/moisture/live/'    // herb, stem
    static windDir   = 'site/weather/wind/direction/'   // source, heading, upslope
    static windSpeed = 'site/weather/wind/speed/'       // at20ft, at10m

    static sfire     = 'site/surface/fire'
    static cfire     = 'site/crown/fire'

    static curing1   = 'site/surface/primary/curing/'
    static bed1      = `site/surface/primary/bed/`
    static dead1     = `site/surface/primary/bed/dead/`
    static live1     = `site/surface/primary/bed/live/`
    static model1    = `site/surface/primary/model/`
    static standard1 = `site/surface/primary/model/standard/`
    static chaparral1= `site/surface/primary/model/chaparral/`
    static palmetto1 = `site/surface/primary/model/palmetto/`
    static aspen1    = `site/surface/primary/model/aspen/`
    static wsrf1     = 'site/surface/primary/wind/speed/reduction'
    // the following are Leafs, not Paths
    static midflame1 = 'site/surface/primary/wind/midflame'
    // static wsrf1     = 'site/surface/primary/wind/reduction/factor'
    // static wsrfbed1  = 'site/surface/primary/wind/reduction/fuel bed'
    // static wsrfcan1  = 'site/surface/primary/wind/reduction/canopy'
    static fire1     = `site/surface/primary/fire/`
}

// Defines common leaf segment keys
export class L {
    static fireFlame = 'flame length'
    static fireFli  = 'fireline intensity'
    static fireHpua = 'heat per unit area'
    static fireLwr  = 'length-to-with ratio'
    static fireRxi  = 'reaction intensity'
    static fireTaur = 'residence time'

    static fuelBulk = 'bulk density'
    static fuelBeta = 'packing ratio'
    static fuelBopt = L.fuelBeta+'/optimum'
    static fuelBrat = L.fuelBeta+'/ratio'
    static fuelDens = 'fiber density'
    static fuelDepth = 'depth'
    static fuelDiam = 'cylindrical diameter'
    static fuelDrxi = 'dry reaction intensity'
    static fuelEfol = 'effective fuel/ovendry load'
    static fuelEfmc = 'effective fuel/moisture content'
    static fuelEfwl = 'effective fuel/water load'
    static fuelEhn  = 'effective heating number'
    static fuelEtam = 'moisture damping coefficient'
    static fuelEtas = 'mineral damping coefficient'
    static fuelHeat = 'heat of combustion'
    static fuelLeng = 'cylindrical length'
    static fuelLife = 'life category'
    static fuelLoad = 'ovendry fuel load'
    static fuelNet  = 'net ovendry load'
    static fuelMext = 'extinction moisture content'
    static fuelMextf= 'extinction moisture content/factor'
    static fuelMois = 'moisture content'
    static fuelPhiE = 'spread rate coefficient/effective wind'
    static fuelPhiS = 'spread rate coefficient/slope'
    static fuelPhiW = 'spread rate coefficient/wind'
    static fuelQig  = 'heat of pre-ignition'
    static fuelRxv  = 'reaction velocity'
    static fuelRxve  = L.fuelRxv + '/exponent'
    static fuelRxvm  = L.fuelRxv + '/maximum'
    static fuelRxvo  = L.fuelRxv + '/optimum'
    static fuelSa   = 'surface area'
    static fuelSavr = 'surface area-to-volume ratio'
    static fuelSavr15 = L.fuelSavr + '/**1.5'
    static fuelSawf = 'surface area weighting factor'
    static fuelScar = 'size class weighting array'
    static fuelScwf = 'size class weighting factor'
    static fuelSeff = 'silica-free mineral content'
    static fuelSink = 'heat sink'
    static fuelSize = 'size class'
    static fuelSlpk  = 'slope/factor K'
    static fuelSource = 'heat source'
    static fuelStot = 'total mineral content'
    static fuelType = 'fuel type'
    static fuelVol  = 'volume'
    static fuelXi   = 'propagating flux ratio'

    static windB = 'wind/factor B'
    static windC = 'wind/factor C'
    static windE = 'wind/factor E'
    static windK = 'wind/factor K'
    static windI = 'wind/factor I'

    // Surface Bed Module properties
    static fuelWsrf = 'open-canopy wind speed reduction factor'
    static taur = 'residence time'
    static waf  = 'wind speed adjustment factor'
    
    static ros  = 'spread rate/'
    static rosNwns = L.ros + 'no-wind no-slope'
    static rosUpsl = L.ros + 'upslope wind'

    static weff = 'effective wind speed/'
    static weffUpsl  = L.weff + 'upslope wind'
    static weffLimit = L.weff + 'limit'
    static weffAppl  = L.weff + 'limit/applied'

    static slopeDeg = 'steepness/degrees from horizontal'
    static slopeRat = 'steepness/rise-to-reach ratio'
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