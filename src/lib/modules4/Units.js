import * as V from './Variants.js'
export class Units {
    
    // Basic node types
    static bool         = new V.Bool()
    static factor       = new V.Factor()
    static fraction     = new V.Fraction()
    static integer      = new V.Integer()
    static ratio        = new V.Ratio()
    static real         = new V.Real()
    static string       = new V.BaseString()

    // Quantity base units
    static angle        = new V.Angle()         // deg [arc]
    static area         = new V.Area()          // ft2 [distance2]
    static density      = new V.Density()       // lb/ft3 [mass/vol]
    static distance     = new V.Distance()      // ft [distance]
    static load         = new V.Load()          // lb/ft2 [mass/area]
    static mass         = new V.Mass()          // lb [mass]
    static temperature  = new V.Temperature()   // F [temperature]
    static time         = new V.Time()          // min [time]
    static volume       = new V.Volume()        // ft3 [distance3]

    // Quantity derived units
    static compass      = new V.Compass()
    static elevation    = new V.Elevation()

    static fireArea     = new V.FireArea()
    static fireDist     = new V.FireDistance()
    static fireFlame    = new V.FlameLength()
    static fireHpua     = new V.HeatPerUnitArea()
    static firePoint    = new V.FirePoint()
    static fireRos      = new V.FireRos()
    static fireRxi      = new V.ReactionIntensity()
    static fireFli      = new V.FirelineIntensity()
    static firePower    = new V.PowerOfFire()
    static fireScorch   = new V.ScorchHeight()
    static fireTaur     = new V.FireResidenceTime()
    static fireTime     = new V.FireTime()

    static fuelArea     = new V.FuelArea()
    static fuelDens     = new V.FuelDensity()
    static fuelDepth    = new V.FuelDepth()
    static fuelBulk     = new V.BulkDensity()
    static fuelHeat     = new V.HeatCombustion()
    static fuelLeng     = new V.FuelLength()
    static fuelLife     = new V.FuelLife()
    static fuelLoad     = new V.FuelLoad()
    static fuelKey      = new V.FuelKey()
    static fuelMois     = new V.MoistureContent()
    static fuelQig      = new V.HeatPreIgnition()
    static fuelRxv      = new V.ReactionVelocity()
    static fuelSavr     = new V.SAVR()
    static fuelSeff     = new V.EffectiveMineralContent()
    static fuelSink     = new V.HeatSink()
    static fuelSize     = new V.FuelSizeClass()
    static fuelStot     = new V.TotalMineralContent()
    static fuelType     = new V.FuelType()
    static fuelVol      = new V.FuelVolume()
    static fuelWtg      = new V.WeightingFactor()

    static mapArea      = new V.MapArea()
    static mapDist      = new V.MapDistance()
    static mapScale     = new V.MapScale()

    static treeHeight   = new V.TreeHeight()
    static velocity     = new V.Velocity()
    static windSpeed    = new V.WindSpeed()
}
