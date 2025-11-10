# Notes

1 Convert Units as U usage to CommonNodes in Canopy.js, FuelModelModule.js, etc

2 Create ellipse/ demo with tests

3 Create fuel model table with following o help with effective wind speed estimation
- wtg av savr
- packing ratio, optimum, ratio
- bulk density
- dry reaction intensity (total, dead, live)
- net fuel load
- slopeK
- wind factors

# Modules

Terrain--------
              |---- Surface
Weather-------
              |---- Canopy
FuelMoisture--- 

## FuelCellModule

FuelCell takes a FuelModelModule and a FuelMoistureModule. It performs all the
fuel life and element weighting and computation to produce a savr, beta,
heat sink, heat source, and reaction intensity to a FireCell.

## FuelModelModule

The FuelModelModule base class provides 5 dead and 5 live FuelElements, a FuelDepth,
and a dead mext to a FuelCellModule.  Its base class config() is for no fuel,
and must be extended by FuelModelCatalogModule, FuelModelCustomModule,
FuelModelChaparralModule, and FuelModelAspenModule, who may add their own
specific nodes (such as catalog key, age, basal area, etc) and must config()
their 5 dead and 5 live the FuelModel elements, fuel depth, and dead mext.

## FireCharModule

The FireCharModule base class stores a FireCellModule's spread rate, direction, and intensity and
calculates flame length, hpua, scorch height, and tree mortality.

## FireCellModule

FireCell takes a FuelCellModule, WeatherModule, TerrainModule, and CanopyModule
to produce a spread rate, direction, fireline inetnsity, midflame wind speed,
and length-to-width ratio.

## FireEllipse

FireEllipse extends FireBehavior with elliptical length, width, area, and
perimeter properties.  FireEllipseMap extends it further to a Map scale.

## FirePoint

FirePoint extends FireBehavior with spatial and temporal parameters by adding
beginning and ending x,y,t triplets at some angle from the fire head (or from
upslope or north).  It also adds an ignition point and time.

FirePoint is further extended for the Head (0 degrees), Right (90 degrees),
Back (180 degrees), Left (270 degrees) vectors, as well as for
any arbitrary angle from the ignition