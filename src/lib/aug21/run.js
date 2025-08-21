import { Dag, C, P, U, Util } from './index.js'
import { CanopyModuleFactory } from './index.js'
import { FuelBedModuleFactory } from './FuelBedModuleFactory.js'
import { WindSpeedModuleFactory } from './index.js'

const canopyNodes = CanopyModuleFactory.configure(P.canopy)
const windSpeedNodes = WindSpeedModuleFactory.configure(P.windSpeed,
    [['wind speed input', 'at 20-ft']],
    [['canopy reduction factor', P.canopy+'wind reduction factor'],
    [['fuel bed reduction factor', P.bed1]]]
)
const fuelBed1Nodes = FuelBedModuleFactory.configure(P.bed1)


Util.logNodes(canopyNodes, 'Canopy Module')
Util.logNodes(windSpeedNodes, 'Wind Speed Module')
Util.logNodes(fuelBed1Nodes, 'Primary Fuel Bed Module')
