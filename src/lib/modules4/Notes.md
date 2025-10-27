# Modules

## FuelCell

FuelCell takes a FuelModel and a FuelMoisture. It performs all the weighting and
computation to produce a heat sink and heat source to the FireCell.

## FuelModel

FuelModel provides 5 dead and 5 live FuelElements, a FuelDepth, and a dead mext
to the FuelCell.  It is a base class whose config() is for no fuel, and must be
extended by FuelModelStandard, FuelModelChaparral, etc, who may add their
own nodes (catalog key, age, basal area, etc) and config the FuelModel elements.

## FireCell

FireCell takes a FuelCell, FuelSlope, and FuelWind to produce a spread rate,
directions, fireline inetnsity, midflame wind speed, and length-to-width ratio.

## FuelWind

FuelWind provides a FireCell with a midflame wind speed and direction.
It takes a FuelCell (to get the open-canopy wsrf), Canopy (to get the canopy
wsrf), and a Wind (to get the 20-ft wind speed and direction).

## FireBehavior

FireBehavior stores a FireCell's spread rate, direction, and intensity and
calculates flame length, hpua, scorch height, and tree mortality.

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