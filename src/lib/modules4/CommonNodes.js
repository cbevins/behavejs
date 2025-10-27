import { Units as U } from './Units.js'
import { DagModule, DagNode } from './DagItems.js'

export class CommonNodes {
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
    static rxi (p) {return new DagNode(p, 'rxi', U.fireRxi, 'reaction intensity')}
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
    static wsrf(p) {return new DagNode(p, 'wsrf', U.fraction, 'open canopy wind speed reduction factor', '')}
    static xi(p) {return new DagNode(p, 'xi', U.ratio, 'propagating flux ratio')}
}
