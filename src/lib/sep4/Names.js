export class P {
    static canopy    = 'canopy/'
    static constants = 'constants/'
    static terrain   = 'terrain/'
    static slope     = 'terrain/slope/'    // ratio, degrees
    static slopeDegrees= 'terrain/slope/steepness/degrees'
    static slopeRatio= 'terrain/slope/steepness/ratio'
    static aspect    = 'terrain/aspect/'   // upslope, downslope
    static moisture  = 'weather/moisture/'
    static deadmois  = 'weather/moisture/dead/'    // tl1h, tl10h, tl100h
    static livemois  = 'weather/moisture/live/'    // herb, stem
    static windDir   = 'weather/wind/direction/'
    static windHead  = 'weather/wind/direction/heading/'
    static windSource= 'weather/wind/direction/source/'
    static windSpeed = 'weather/wind/speed/'       // at20ft, at10m
    
    static sfire     = 'surface/fire'
    static cfire     = 'crown/fire'

    static curing1   = 'surface/primary/curing/'
    static bed1      = `surface/primary/bed/`
    static dead1     = `surface/primary/bed/dead/`
    static live1     = `surface/primary/bed/live/`
    static model1    = `surface/primary/model/`
    static standard1 = `surface/primary/model/standard/`
    static chaparral1= `surface/primary/model/chaparral/`
    static palmetto1 = `surface/primary/model/palmetto/`
    static aspen1    = `surface/primary/model/aspen/`
    static wsrf1     = 'surface/primary/wind/speed/reduction'
    static midflame1 = 'surface/primary/wind/midflame'
    static fire1     = `surface/primary/fire/`
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
    static fuelCode = 'code'
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
    static fuelKey  = 'key'
    static fuelLabel = 'label'
    static fuelLeng = 'cylindrical length'
    static fuelLife = 'life category'
    static fuelLoad = 'ovendry fuel load'
    static fuelNet  = 'net ovendry load'
    static fuelNumber = 'number'
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

    static tl1h     = '1-h'
    static tl10h    = '10-h'
    static tl100h   = '100-h'
    static dead1h   = 'dead/1-h'
    static dead10h  = 'dead/10-h'
    static dead100h = 'dead/100-h'
    static herb     = 'herb'
    static stem     = 'stem'
    static liveHerb = 'live/herb'
    static liveStem = 'live/stem'

    static applied = 'applied'
    static estimated = 'estimated'
    static observed = 'observed'

    static at20ft = 'at 20-ft'
    static at10m  = 'at 10-m'

    static windB = 'wind/factor B'
    static windC = 'wind/factor C'
    static windE = 'wind/factor E'
    static windK = 'wind/factor K'
    static windI = 'wind/factor I'

    // Surface Bed Module properties
    static wsrfCanopy  = 'wind speed reduction factor/fuel bed'
    static wsrfFuel = 'wind speed reduction factor/fuel'
    static wsrfMidf = 'wind speed reduction factor/midflame'
    static taur = 'residence time'
    
    static ros  = 'spread rate/'
    static rosHead = L.ros + 'at head'
    static rosNwns = L.ros + 'no-wind no-slope'
    static rosUpsl = L.ros + 'upslope wind'
    static rosSlope = L.ros + 'slope only'
    static rosWind = L.ros + 'wind only'
    static rosXcomp = L.ros + 'x component'
    static rosYcomp = L.ros + 'y component'

    static weff = 'effective wind speed/'
    static weffUpsl  = L.weff + 'upslope wind'
    static weffLimit = L.weff + 'limit'
    static weffAppl  = L.weff + 'limit/applied'
    static midflame = 'wind speed at midflame'
    static windHeadUpsl = 'from upslope'

    // LiveFuelCuringModule leaf nodes
    static curedObs = 'cured fraction/observed'
    static curedEst = 'cured fraction/estimated'
    static curedApp = 'cured fraction/applied'

    // SLopeModule leaf nodes
    static slopeDeg = 'steepness/degrees from horizontal'
    static slopeRat = 'steepness/rise-to-reach ratio'
}

// Fuel constant node keys
export class K {
    static fuelDeadCat = 'constants/fuel/life/dead category'
    static fuelLiveCat = 'constants/fuel/life/live category'

    // static fuelStandard = 'constants/fuel/model/standard'
    // static fuelChaparral ='constants/fuel/model/chaparral'
    // static fuelAspen = 'constants/fuel/model/western aspen'
    // static fuelPg = 'constants/fuel/model/palmetto-gallberry'

    // static fuelDeadDown = 'constants/fuel/type/dead-down'
    // static fuelGrass = 'constants/fuel/type/grass'
    // static fuelDuff = 'constants/fuel/type/duff'
    // static fuelHerb = 'constants/fuel/type/herb'
    // static fuelStem = 'constants/fuel/type/stem'
    // static fuelCured = 'constants/fuel/type/cured'
    static fuelUnused = 'constants/fuel/type/unused'

    // static fuelDens = 'constants/fuel/fiber density'
    // static fuelHeat = 'constants/fuel/heat of combustion'      // BTU/lb
    // static fuelLife = 'constants/fuel/life category'           // lb/ft2
    // static fuelLoad = 'constants/fuel/ovendry fuel load'       // lb/ft2
    // static fuelSavr = 'constants/fuel/surface area-to-volume ratio'
    // static fuelSeff = 'constants/fuel/silica-free mineral content'     // fraction
    // static fuelStot = 'constants/fuel/total mineral content'     // fraction
    // static fuelType = 'constants/fuel/fuel type'

    static zero = 'constants/zero'
    static one = 'constants/one'
}