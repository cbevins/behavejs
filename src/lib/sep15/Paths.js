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
    static moisLiveSelf = 'moisture/live'
    static moisLiveCat  = 'category'
    static moisLiveHerb = 'herb'
    static moisLiveStem = 'stem'

    // MidflameWindSpeedModule
    static midflameSelf  = 'wind/speed/'
    static midflame      = 'midflame'

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

}