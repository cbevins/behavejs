export class Paths {
    
    // CanopyModule
    static canopySelf     = 'canopy/'
    static canopyCover    = 'coverage'
    static canopyBase     = 'crown/base height'
    static canopyLength   = 'crown/length'
    static canopyRatio    = 'crown/ratio'
    static canopyHeight   = 'crown/total height'
    static canopyBulk     = 'fuel/bulk density'
    static canopyLoad     = 'fuel/ovendry load'
    static canopyVol      = 'fuel/volumetric fill ratio'
    static canopyHeat     = 'fire/heat of combustion'
    static canopyHpua     = 'fire/heat per unit area'
    static canopyShelters = 'shelters fuel from wind'
    static canopyWsrf     = 'wind/speed/reduction/factor'

    // ConstantsModule
    static constantsSelf = 'constants/'
    static fuelDeadCat   = 'fuel/life/dead category'
    static fuelLiveCat   = 'fuel/life/live category'
    static fuelUnused    = 'fuel/type/unused'
    static zero          = 'zero'
    static one           = 'one'

    // DeadFuelMoistureModule
    static moisDeadSelf = 'moisture/dead/'
    static moisDeadCat  = 'category'
    static moisDead1    = '1-h'
    static moisDead10   = '10-h'
    static moisDead100  = '100-h'

    // LiveFuelCuringModule
    static curingSelf      = 'curing/'
    static curingFraction  = 'fraction/'
    static curingApplied   = 'fraction/applied'
    static curingEstimated = 'fraction/estimated'
    static curingObserved  = 'fraction/observed'

    // LiveFuelMoistureModule
    static moisLiveSelf = 'moisture/live/'
    static moisLiveCat  = 'category'
    static moisLiveHerb = 'herb'
    static moisLiveStem = 'stem'

    // MidflameWindSpeedModule
    static midflameSelf  = 'wind/speed/'
    static midflame      = 'midflame'

    // SlopeDirectionModule
    static slopeDirSelf = 'slope/direction/'
    static slopeUp      = 'up-slope'
    static slopeDown    = 'down-slope'

    // SlopeSteepnessModule
    static slopeSteepSelf = 'slope/steepness/'
    static slopeDegrees   = 'degrees'
    static slopeRatio     = 'ratio'

    // StandardFuelModelModule
    static standardSelf     = 'standard/'
    static stdCode          = 'info/code'
    static stdNumb          = 'info/number'
    static stdLabel         = 'info/label'
    static stdAuth          = 'info/author'
    
    static stdDens          = 'fiber density'
    static stdDepth         = 'depth'
    static stdKey           = 'key'
    static stdSeff          = 'mineral content/silica-free'
    static stdStot          = 'mineral content/total'
    static stdDeadHeat      = 'dead/heat of combustion'
    static stdDeadMext      = 'dead/extinction moisture content'
    static stdLiveHeat      = 'live/heat of combustion'
    
    static stdDead1Load     = 'dead/1-h/ovendry fuel load'
    static stdDead1Mois     = 'dead/1-h/moisture content'
    static stdDead1Savr     = 'dead/1-h/surface area-to-volume ratio'
    static stdDead1Type     = 'dead/1-h/fuel type'

    static stdDead10Load    = 'dead/10-h/ovendry fuel load'
    static stdDead10Mois    = 'dead/10-h/moisture content'
    static stdDead10Savr    = 'dead/10-h/surface area-to-volume ratio'
    static stdDead10Type    = 'dead/10-h/fuel type'
    
    static stdDead100Load   = 'dead/100-h/ovendry fuel load'
    static stdDead100Mois   = 'dead/100-h/moisture content'
    static stdDead100Savr   = 'dead/100-h/surface area-to-volume ratio'
    static stdDead100Type   = 'dead/100-h/fuel type'

    static stdDeadHerbLoad  = 'dead/herb/ovendry fuel load'
    static stdDeadHerbMois  = 'dead/herb/moisture content'
    static stdDeadHerbSavr  = 'dead/herb/surface area-to-volume ratio'
    static stdDeadHerbType  = 'dead/herb/fuel type'

    static stdLiveHerbLoad  = 'live/herb/ovendry fuel load'
    static stdLiveHerbMois  = 'live/herb/moisture content'
    static stdLiveHerbSavr  = 'live/herb/surface area-to-volume ratio'
    static stdLiveHerbType  = 'live/herb/fuel type'

    static stdLiveStemLoad  = 'live/stem/ovendry fuel load'
    static stdLiveStemMois  = 'live/stem/moisture content'
    static stdLiveStemSavr  = 'live/stem/surface area-to-volume ratio'
    static stdLiveStemType  = 'live/stem/fuel type'

    static stdTotalHerbLoad = 'total/herb/ovendry fuel load'
    static stdTotalHerbSavr = 'total/herb/surface area-to-volume ratio'
    static stdTotalHerbType = 'total/herb/fuel type'

    // WindDirectionModule
    static wdirSelf         = 'wind/direction/'
    static wdirHeadFromUp   = 'heading/from up-slope'
    static wdirSourceFromUp = 'source/from up-slope'
    static wdirHeadFromNo   = 'heading/from north'
    static wdirSourceFromNo = 'source/from north'

    // WindSpeedModule
    static wspdSelf = 'wind/speed/'
    static wspd20ft = 'at 20-ft'
    static wspd10m  = 'at 10-m'

    // WindSpeedReductionModule
    static wsrfSelf     = 'wind/speed/reduction factor/'
    static wsrfCanopy   = 'canopy'
    static wsrfFuel     = 'fuel bed'
    static wsrfMidflame = 'midflame'
}