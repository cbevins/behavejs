export class P {
    static canopy    = 'canopy/'
    static constants = 'constants/'
    static terrain   = 'terrain/'
    static weather   = 'weather/'

    // static slope     = 'terrain/slope/'    // ratio, degrees
    // static slopeDegrees= 'terrain/slope/steepness/degrees'
    // static slopeRatio= 'terrain/slope/steepness/ratio'
    // static aspect    = 'terrain/aspect/'   // up-slope, downslope
    // static moisture  = 'weather/moisture/'
    // static deadmois  = 'weather/moisture/dead/'    // tl1h, tl10h, tl100h
    // static livemois  = 'weather/moisture/live/'    // herb, stem
    // static windDir   = 'weather/wind/direction/'
    // static windHead  = 'weather/wind/direction/heading/'
    // static windSource= 'weather/wind/direction/source/'
    // static windSpeed = 'weather/wind/speed/'       // at20ft, at10m
    
    static cfire     = 'crown/fire'
    static sfire     = 'weighted/surface/fire'  // 'spread rate', 'fireline intensity', 'effective wind/speed', 'effective wind/coefficient'
    
    static surf1     = 'primary/surface/'
    static bed1      = 'primary/surface/bed/'
    // static dead1     = 'primary/surface/bed/dead/'
    // static live1     = 'primary/surface/bed/live/'
    static model1    = 'primary/surface/model/'
    // static standard1 = `primary/surface/model/standard/`
    // static standard1dead = `primary/surface/model/standard/dead`
    // static standard1live = `primary/surface/model/standard/live`
    // static curing1   = `primary/surface/model/standard/curing/` // 'fraction/estimated', 'fraction/observed', 'fraction/applied'
    // static chaparral1= `primary/surface/model/chaparral/`
    // static palmetto1 = `primary/surface/model/palmetto/`
    // static aspen1    = `primary/surface/model/aspen/`
    // static fire1     = 'primary/surface/fire/'

    // Sub path below 'primary/surface/' or 'secondary/surface'
    static firep1    = 'fire/1 no-wind no-slope/'       // 'spread rate',
    static firep2    = 'fire/2 wind-slope additional/'  // 'spread rate', 'spread rate/slope only', '.../wind only', '.../x component', '.../y component'
    static firep3    = 'fire/3 cross-slope wind/'       // 'spread rate', 'effective wind/speed', 'effective wind/coefficient'
    static firep4    = 'fire/4 effective limit/'        // 'spread rate', 'effective wind/speed', 'effective wind/coefficient'
    static firep5    = 'fire/5 eff wind limit applied/' // 'spread rate', 'effective wind/speed', 'effective wind/coefficient'
    static firep6    = 'fire/6 ros limit applied/'      // 'spread rate', 'effective wind/speed', 'effective wind/coefficient'
    static firep7    = 'fire/7 both limits applied/'
    static fire      = 'fire/'                          // final, applied values

    // static wind1     = 'primary/surface/wind/speed'
    // static wsrf1     = 'primary/surface/wind/speed/reduction'
    // static midflame1 = 'primary/surface/wind/speed/midflame'

    //--------------------------------------------------------------------------
    // Module Node Names
    //--------------------------------------------------------------------------

    // CanopyModule
    static canopyCover    = 'canopy/coverage'
    static canopyBase     = 'canopy/crown/base height'
    static canopyLength   = 'canopy/crown/length'
    static canopyRatio    = 'canopy/crown/ratio'
    static canopyHeight   = 'canopy/crown/total height'
    static canopyBulk     = 'canopy/fuel/bulk density'
    static canopyLoad     = 'canopy/fuel/ovendry load'
    static canopyVol      = 'canopy/fuel/volumetric fill ratio'
    static canopyHeat     = 'canopy/fire/heat of combustion'
    static canopyHpua     = 'canopy/fire/heat per unit area'
    static canopyShelters = 'canopy/shelters fuel from wind'
    static canopyWsrf     = 'canopy/wind/speed/reduction/factor'

    // LiveFuelCuringModule
    static curing          = 'curing/'
    static curingFraction  = 'curing/fraction/'
    static curingApplied   = 'curing/fraction/applied'
    static curingEstimated = 'curing/fraction/estimated'
    static curingObserved  = 'curing/fraction/observed'

    // DeadFuelMoistureModule
    static moisDead    = 'moisture/dead/'
    static moisDeadCat = 'moisture/dead/category'
    static moisDead1   = 'moisture/dead/1-h'
    static moisDead10  = 'moisture/dead/10-h'
    static moisDead100 = 'moisture/dead/100-h'

    // LiveFuelMoistureModule
    static moisLive     = 'moisture/live'
    static moisLiveCat  = 'moisture/live/category'
    static moisLiveHerb = 'moisture/live/herb'
    static moisLiveStem = 'moisture/live/stem'

    // MidflameWindSpeedModule
    static mfws         = 'wind/speed/'
    static midflame     = 'wind/speed/midflame'

    // SlopeSteepnessModule
    static slopeSteep   = 'slope/steepness'
    static slopeDegrees = 'slope/steepness/degrees'
    static slopeRatio   = 'slope/steepness/ratio'

    // SlopeDirectionModule nodes
    static slopeDir     = 'slope/direction'
    static slopeUp      = 'slope/direction/up-slope'
    static slopeDown    = 'slope/direction/down-slope'

    // StandardFuelModelModule
    static standard         = 'standard'
    static stdCode          = 'standard/info/code'
    static stdNumb          = 'standard/info/number'
    static stdLabel         = 'standard/info/label'
    static stdAuth          = 'standard/info/author'
    static stdDens          = 'standard/fiber density'
    static stdDepth         = 'standard/depth'
    static stdKey           = 'standard/key'
    static stdSeff          = 'standard/mineral content/silica-free'
    static stdStot          = 'standard/mineral content/total'
    static stdDeadHeat      = 'standard/dead/heat of combustion'
    static stdDeadMext      = 'standard/dead/extinction moisture content'
    static stdLiveHeat      = 'standard/live/heat of combustion'
    
    static stdDead1Load     = 'standard/dead/1-h/ovendry fuel load'
    static stdDead1Mois     = 'standard/dead/1-h/moisture content'
    static stdDead1Savr     = 'standard/dead/1-h/surface area-to-volume ratio'
    static stdDead1Type     = 'standard/dead/1-h/fuel type'

    static stdDead10Load    = 'standard/dead/10-h/ovendry fuel load'
    static stdDead10Mois    = 'standard/dead/10-h/moisture content'
    static stdDead10Savr    = 'standard/dead/10-h/surface area-to-volume ratio'
    static stdDead10Type    = 'standard/dead/10-h/fuel type'
    
    static stdDead100Load   = 'standard/dead/100-h/ovendry fuel load'
    static stdDead100Mois   = 'standard/dead/100-h/moisture content'
    static stdDead100Savr   = 'standard/dead/100-h/surface area-to-volume ratio'
    static stdDead100Type   = 'standard/dead/100-h/fuel type'

    static stdDeadHerbLoad  = 'standard/dead/herb/ovendry fuel load'
    static stdDeadHerbMois  = 'standard/dead/herb/moisture content'
    static stdDeadHerbSavr  = 'standard/dead/herb/surface area-to-volume ratio'
    static stdDeadHerbType  = 'standard/dead/herb/fuel type'

    static stdLiveHerbLoad  = 'standard/live/herb/ovendry fuel load'
    static stdLiveHerbMois  = 'standard/live/herb/moisture content'
    static stdLiveHerbSavr  = 'standard/live/herb/surface area-to-volume ratio'
    static stdLiveHerbType  = 'standard/live/herb/fuel type'

    static stdLiveStemLoad  = 'standard/live/stem/ovendry fuel load'
    static stdLiveStemMois  = 'standard/live/stem/moisture content'
    static stdLiveStemSavr  = 'standard/live/stem/surface area-to-volume ratio'
    static stdLiveStemType  = 'standard/live/stem/fuel type'

    static stdTotalHerbLoad = 'standard/total/herb/ovendry fuel load'
    static stdTotalHerbSavr = 'standard/total/herb/surface area-to-volume ratio'
    static stdTotalHerbType = 'standard/total/herb/fuel type'

    // SurfaceFuelModule
    static bedPhiS     = 'bed/spread rate coefficient/slope'
    static bedPhiW     = 'bed/spread rate coefficient/wind'
    static bedWsrfFuel = 'bed/' + P.wsrfFuel

    // WindDirectionModule
    static wdir       = 'wind/direction/'
    static wdirHeadUp = 'wind/direction/heading/from up-slope'
    static wdirFromUp = 'wind/direction/source/from up-slope'
    static wdirHeadNo = 'wind/direction/heading/from north'
    static wdirFromNo = 'wind/direction/source/from north'

    // WindSpeedModule
    static wspd     = 'wind/speed/'
    static wspd20ft = 'wind/speed/at 20-ft'
    static wspd10m  = 'wind/speed/at 10-m'

    // WindSpeedReductionModule
    static wsrf         = 'wind speed reduction factor/'
    static wsrfCanopy   = 'wind speed reduction factor/canopy'
    static wsrfFuel     = 'wind speed reduction factor/fuel bed'
    static wsrfMidflame = 'wind speed reduction factor/midflame'
}

//------------------------------------------------------------------------------
// Configuration option keys
//------------------------------------------------------------------------------
export class C {
    // CanopyModule
    static baseHeight = 'height-base'
    static heightBase = C.baseHeight
    static ratioHeight = 'ratio-height'
    static heightRatio = C.ratioHeight
    static lengthHeight = 'height-length'
    static heightLength = C.lengthHeight
    static ratioBase = 'ratio-base'
    static baseRatio = C.ratioBase
    static ratioLength = 'ratio-length'
    static lengthRatio = C.ratioLength
    static lengthBase = 'length-base'

    // DeadFuelMoistureModule, LiveFuelMoistureModule
    static moisCategory = 'category'
    static moisParticle = 'particle'
    // LiveFuelCuringModule
    static curingEstimated = 'estimated'
    static curingObserved  = 'observed'
    // MidflameWindSpeedModule
    static midflameEstimated = 'estimated'
    static midflameObserved  = 'observed'
    // SlopeSteepnessModule
    static slopeDegrees = 'observed degrees'
    static slopeRatio   = 'observed ratio of rise-to-reach'
    static slopeMap     = 'estimated from map'
    // StandardFuelModelModule
    static stdCatalog = 'catalog'
    static stdCustom  = 'custom'
    // SurfaceFuelModule
    static fuelStd = 'standard'
    static fuelCh = 'chaparral'
    static fuelPg = 'palmetto'
    static fuelWa = 'aspen'
    // SurfaceFireModule
    static fireLimitYes = 'applied'
    static fireLimitNo = 'not applied'
    // WindDirectionModule
    static wdirHeadUp = 'heading from up-slope'
    static wdirFromUp = 'source from up-slope'
    static wdirHeadNo = 'heading from north'
    static wdirFromNo = 'source from  north'
    // WindSpeedModule
    static wspd20ft = 'at 20-ft'
    static wspd10m  = 'at 10-m'
    // WindSpeedReductionModule
    static wsrfEstimated = 'estimated'
    static wsrfObserved  = 'observed'
}

// Defines common leaf segment keys
export class L {
    static fireFlame = 'flame length'
    static fireFli  = 'fireline intensity'
    static fireHeadFlame = 'heading/flame length'
    static fireHeadFli = 'heading/fireline intensity'
    static fireHeadRos = 'heading/spread rate'
    static fireHeadDirUp = 'heading/direction/from up-slope'
    static fireHeadDirNo = 'heading/direction/from north'
    static fireHpua = 'heat per unit area'
    static fireLwr  = 'length-to-with ratio'
    static firePhiE = 'spread rate coefficient/effective wind'
    static firePhiS = 'spread rate coefficient/slope'
    static firePhiW = 'spread rate coefficient/wind'
    static fireRxi  = 'reaction intensity'
    static fireTaur = 'residence time'
    static fireRos  = 'spread rate'
    static firePhiE = 'effective wind/coefficient'
    static fireWeff = 'effective wind/speed'

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
    
    // Surfac
    static ros  = 'spread rate/'
    static rosHead = L.ros + 'at head'
    static rosNwns = L.ros + 'no-wind no-slope'
    static rosUpsl = L.ros + 'up-slope wind'
    static rosXcomp = L.ros + 'x component'
    static rosYcomp = L.ros + 'y component'
    static rosSlope = L.ros + 'slope only'
    static rosWind  = L.ros + 'wind only'

    static weff = 'effective wind speed/'
    static weffUpsl  = L.weff + 'up-slope wind'
    static weffLimit = L.weff + 'limit'
    static weffAppl  = L.weff + 'limit/applied'
    static midflame = 'wind speed at midflame'
    static windHeadUpsl = 'from up-slope'

    // LiveFuelCuringModule leaf nodes
    static curedObs = 'cured fraction/observed'
    static curedEst = 'cured fraction/estimated'
    static curedApp = 'cured fraction/applied'

    // SlopeSteepnessModule leaf nodes
    static slopeDeg = 'steepness/degrees from horizontal'
    static slopeRat = 'steepness/rise-to-reach ratio'
}

// Fuel constant node keys
export class K {
    static fuelDeadCat = 'constants/fuel/life/dead category'
    static fuelLiveCat = 'constants/fuel/life/live category'
    static fuelUnused = 'constants/fuel/type/unused'
    static zero = 'constants/zero'
    static one = 'constants/one'
}