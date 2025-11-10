import { Units as U } from './Units.js'
import { DagModule, DagNode } from './DagItems.js'

export class CommonNodes {
    // FireCharModule nodes
    static fromHead(p) {return new DagNode(p, 'fromHead', U.compass, 'degrees clockwise from fire head')}
    static fromNorth(p) {return new DagNode(p, 'fromNorth', U.compass, 'degrees clockwise from north')}
    static fromUpslope(p) {return new DagNode(p, 'fromUpslope', U.compass, 'degrees clockwise from up-slope')}
    static taur(p) {return new DagNode(p, 'taur', U.fireTaur, 'residence time')}
    static hpua(p) {return new DagNode(p, 'hpua', U.fireHpua, 'heat per unit area')}
    static lwr(p) {return new DagNode(p, 'lwr', U.ratio, 'length-to-width ratio')}
    static fli(p) {return new DagNode(p, 'fli', U.fireFli, 'fireline intensity')}
    static flame(p) {return new DagNode(p, 'flame', U.fireFlame, 'flame length')}
    static mort(p) {return new DagNode(p, 'mort', U.fraction, 'fire induced tree mortality rate')}
    static ros(p) {return new DagNode(p, 'ros', U.fireRos, 'spread rate')}
    static rxi(p) {return new DagNode(p, 'rxi', U.fireRxi, 'reaction intensity')}
    static midflame(p) {return new DagNode(p, 'midflame', U.windSpeed, 'midflame wind speed')}
    static phiE(p) {return new DagNode(p, 'phiE', U.factor, 'spread rate effective wind coefficient')}
    static scorch(p) {return new DagNode(p, 'scorch', U.fireScorch, 'scorch height')}
    static weff(p) {return new DagNode(p, 'weff', U.windSpeed, 'effective wind speed')}
    static weffLimit(p) {return new DagNode(p, 'weffLimit', U.windSpeed, 'effective wind speed limit')}
    static weffExceeded(p) {return new DagNode(p, 'weffExceeded', U.bool, 'effective wind speed limit exceeded')}
    static wsrf(p) {return new DagNode(p, 'wsrf', U.fraction, 'wind speed reduction factor')}

    // Fuel element and life category nodes
    static area(p) {return new DagNode(p, 'area', U.fuelArea, 'surface area')}
    static dens(p) {return new DagNode(p, 'dens', U.fuelDens, 'fiber density')}
    static diam(p) {return new DagNode(p, 'diam', U.fuelLeng, 'cylindrical diameter')}
    static ehn(p) {return  new DagNode(p, 'ehn', U.fraction, 'effective heating number')}
    static efol(p) {return new DagNode(p, 'efol', U.fuelLoad, 'effective fuel ovendry load')}
    static efwl(p) {return new DagNode(p, 'efwl', U.fuelLoad, 'effective fuel water load')}
    static heat(p) {return new DagNode(p, 'heat', U.fuelHeat, 'heat of combustion')}
    static leng(p) {return new DagNode(p, 'leng', U.fuelLeng, 'cylindrical length')}
    static life(p) {return new DagNode(p, 'life', U.fuelLife, 'life category')}
    static load(p) {return new DagNode(p, 'load', U.fuelLoad, 'ovendry load')}
    static mois(p) {return new DagNode(p, 'mois', U.fuelMois, 'moisture content')}
    static net(p) {return  new DagNode(p, 'net', U.fuelLoad, 'mineral-free ovendry load')}
    static qig(p) {return  new DagNode(p, 'qig', U.fuelQig, 'heat of pre-ignition')}
    static savr(p) {return new DagNode(p, 'savr', U.fuelSavr, 'surface area-to-volume label')}
    static sawf(p) {return new DagNode(p, 'sawf', U.fuelWtg, 'surface area weighting factor')}
    static scwf(p) {return new DagNode(p, 'scwf', U.fuelWtg, 'size class weighting factor')}
    static seff(p) {return new DagNode(p, 'seff', U.fuelSeff, 'silica-free mineral content')}
    static size(p) {return new DagNode(p, 'size', U.fuelSize, 'size class')}
    static stot(p) {return new DagNode(p, 'stot', U.fuelStot, 'total mineral content')}
    static type(p) {return new DagNode(p, 'type', U.fuelType, 'fuel type')}
    static vol(p) {return  new DagNode(p, 'vol', U.fuelVol, 'cylindrical volume')}

    // Additional fuel life category nodes
    static drxi(p) {return new DagNode(p, 'drxi', U.fireRxi, 'dry reaction intensity')}
    static efmc(p) {return new DagNode(p, 'efmc', U.fuelMois, 'effective fuel moisture content')}
    static etam(p) {return new DagNode(p, 'etam', U.fraction, 'moisture damping coefficient')}
    static etas(p) {return new DagNode(p, 'etas', U.fraction, 'mineral damping coefficient')}
    static mext(p) {return new DagNode(p, 'mext', U.fuelMois, 'extinction moisture conet')}
    static mextf(p) {return new DagNode(p, 'mextf', U.factor, 'extinction moisture content factor')}
    static scar(p) {return new DagNode(p, 'scar', U.fuelWtg, 'size class weighting array')}

    // Additional FuelCellModule nodes
    static bulk(p) {return new DagNode(p, 'bulk', U.fuelBulk, 'bulk density')}
    static depth(p) {return new DagNode(p, 'depth', U.fuelDepth, 'fuel depth')}
    static beta(p) {return new DagNode(p, 'beta', U.ratio, 'packing ratio')}
    static bopt(p) {return new DagNode(p, 'bopt', U.ratio, 'optimum packing ratio')}
    static brat(p) {return new DagNode(p, 'brat', U.ratio, 'beta-to-optimum ratio')}
    static rxve(p) {return new DagNode(p, 'rxve', U.factor, 'reaction velocity exponent')}
    static rxvm(p) {return new DagNode(p, 'rxvm', U.fuelRxv, 'maximum reaction velocity')}
    static rxvo(p) {return new DagNode(p, 'rxvo', U.fuelRxv, 'optimum reaction velocity')}
    static savr15(p) {return new DagNode(p, 'savr15', U.fuelSavr, 'savr**1.5')}
    static sink(p) {return new DagNode(p, 'sink', U.fuelSink, 'fuel bed heat sink')}
    static source(p) {return new DagNode(p, 'source', U.fireRxi, 'fuel bed heat source')}
    static fuelWsrf(p) {return new DagNode(p, 'fuelWsrf', U.fraction, 'open canopy wind speed reduction factor', '')}
    static xi(p) {return new DagNode(p, 'xi', U.ratio, 'propagating flux ratio')}

    //
    static fuelKey(p) {return new DagNode(p, 'fuelKey', U.fuelKey, 'fuel model key')}
    static cured(p) {return new DagNode(p, 'cured', U.fraction, 'cured herb applied')}
    static curedEst(p) {return new DagNode(p, 'curedEst', U.fraction, 'cured herb estimated')}
    static curedInp(p) {return new DagNode(p, 'curedInp', U.fraction, 'cured herb input')}

    // Additional FireCellModule nodes
    static phiS(p) {return new DagNode(p, 'phiS', U.factor, 'spread rate slope coefficient')}
    static phiW(p) {return new DagNode(p, 'phiW', U.factor, 'spread rate wind coefficient')}
    static rosSlope(p) {return new DagNode(p, 'rosSlope', U.fireRos, 'slope-only spread rate')}
    static rosWind(p) {return new DagNode(p, 'rosWind', U.fireRos, 'wind-only spread rate')}
    static rosXcomp(p) {return new DagNode(p, 'rosXcomp', U.factor, 'spread rate x component')}
    static rosYcomp(p) {return new DagNode(p, 'rosYcomp', U.factor, 'spread rate y component')}
    static slopeK(p) {return new DagNode(p, 'slopeK', U.factor, 'slope factor')}
    static windB(p) {return new DagNode(p, 'windB', U.factor, 'wind factor B')}
    static windC(p) {return new DagNode(p, 'windC', U.factor, 'wind factor C')}
    static windE(p) {return new DagNode(p, 'windE', U.factor, 'wind exponent E')}
    static windI(p) {return new DagNode(p, 'windI', U.factor, 'wind factor K inverse')}
    static windK(p) {return new DagNode(p, 'windK', U.factor, 'wind factor K')}

    // WeightedFireModule
    static cover1(p) {return new DagNode(p, 'cover1', U.fraction, 'primary fuel cover')}
    static cover2(p) {return new DagNode(p, 'cover2', U.fraction, 'secondary fuel cover')}
    static rosArith(p) {return new DagNode(p, 'rosArith', U.fireRos, 'arithmetic mean spread rate')}
    static rosHarm(p) {return new DagNode(p, 'rosHarm', U.fireRos, 'harmonic mean spread rate')}

    // FuelMoistureModule
    static tl1(p) {return new DagNode(p, 'tl1', U.fuelMois, '1-h time-lag')}
    static tl10(p) {return new DagNode(p, 'tl10', U.fuelMois, '10-h time-lag')}
    static tl100(p) {return new DagNode(p, 'tl100', U.fuelMois, '100-h time-lag')}
    static mcat(p) {return new DagNode(p, 'category', U.fuelMois, 'category')}
    static herb(p) {return new DagNode(p, 'herb', U.fuelMois, 'herbaceous')}
    static stem(p) {return new DagNode(p, 'stem', U.fuelMois, 'stem wood')}

    // TerrainModule
    static aspect(p) {return new DagNode(p, 'aspect', U.compass, 'aspect')}
    static elevation(p) {return new DagNode(p, 'elevation', U.elevation, 'elevation')}
    static upslope(p) {return new DagNode(p, 'upslope', U.compass, 'upslope direction from north')}
    static slopeDegrees(p) {return new DagNode(p, 'degrees', U.compass, 'incline above horizontal')}
    static slopeRatio(p) {return new DagNode(p, 'ratio', U.ratio, 'rise-to-reach ratio')}

    // FireEllipseModule
    static angle(p) {return new DagNode(p, 'angle', U.fireDist, 'angle')}
    static angleCenter(p) {return new DagNode(p, 'center', U.fireDist, 'angle from ellipse center')}
    static angleIgnPt(p) {return new DagNode(p, 'igntPt', U.fireDist, 'angle from ignition point')}
    static beta6Psi(p) {return new DagNode(p, 'psi', U.compass, 'ellipse psi')}
    static beta6PsiRos(p) {return new DagNode(p, 'psiRos', U.fireRos, 'ellipse spread rate at psi')}
    static beta6Theta(p) {return new DagNode(p, 'theta', U.compass, 'ellipse theta')}
    static eccentricity(p) {return new DagNode(p, 'eccentricity', U.real, 'eccentricity')}
    static fireDistCenter(p) {return new DagNode(p, 'distCenter', U.fireDist, 'distance from center')}
    static fireDistIgnPt(p) {return new DagNode(p, 'distIgnPt', U.fireDist, 'distance from ignition pt')}
    
    static fireArea(p) {return new DagNode(p, 'area', U.fuelArea, 'area')}
    static fireDist(p) {return new DagNode(p, 'dist', U.fireDist, 'distance')}
    static fireLength(p) {return new DagNode(p, 'length', U.fireDist, 'length')}
    static firePerimeter(p) {return new DagNode(p, 'perimeter', U.fireDist, 'perimeter')}
    static fireWidth(p) {return new DagNode(p, 'width', U.fireDist, 'width')}

    // static elapsed(p) {return new DagNode(p, 'elapsed', U.fireTime, 'elapsed')}
    static t(p) {return new DagNode(p, 't', U.fireTime, 'elapsed time')}
    static x(p) {return new DagNode(p, 'x', U.firePoint, 'x-coordinate')}
    static y(p) {return new DagNode(p, 'y', U.firePoint, 'y-coordinate')}
    static dx(p) {return new DagNode(p, 'dx', U.firePoint, 'delta-x')}
    static dy(p) {return new DagNode(p, 'dy', U.firePoint, 'delta-y')}

    // MapModule
    static mapArea(p) {return new DagNode(p, 'mapArea', U.fuelArea, 'map area')}
    static mapContours(p) {return new DagNode(p, 'contours', U.integer, 'number of contours')}
    static mapDist(p) {return new DagNode(p, 'dist', U.mapDist, 'map distance')}
    static mapFactor(p) {return new DagNode(p, 'factor', U.factor, 'map scale factor')}
    static mapInterval(p) {return new DagNode(p, 'interval', U.fireDist, 'contour interval')}
    static mapLength(p) {return new DagNode(p, 'mapLength', U.fireDist, 'map length')}
    static mapPerimeter(p) {return new DagNode(p, 'mapPerimeter', U.fireDist, 'map perimeter')}
    static mapReach(p) {return new DagNode(p, 'reach', U.fireDist, 'slope reach')}
    static mapRise(p) {return new DagNode(p, 'rise', U.fireDist, 'slope rise')}
    static mapScale(p) {return new DagNode(p, 'scale', U.mapScale, 'map scale')}
    static mapWidth(p) {return new DagNode(p, 'mapWidth', U.fireDist, 'map width')}

    // WeatherModule
    static at10m(p) {return new DagNode(p, 'at10m', U.windSpeed, 'at 10-m')}
    static at20ft(p) {return new DagNode(p, 'at20ft', U.windSpeed, 'at 20-ft')}
    static rh(p) {return new DagNode(p, 'rh', U.fraction, 'relative humidity')}
    static temp(p) {return new DagNode(p, 'temp', U.temperature, 'temperature')}
}
