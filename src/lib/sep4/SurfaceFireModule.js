import { Dag, K, L, ModuleBase, U } from './index.js'
import { FuelBedEquations as Bed } from '../index.js'
import { SurfaceFireEquations as Fire } from '../index.js'

export class SurfaceFireModule extends ModuleBase {
    /**
     * 
     * @param {string} path Prefix for this module's fully qualified node kets,
     *        something like `site/surface/primary/bed/`
     * @param {string} slope Fully qualified path to slope steepness ratio node,
     *        something like 'site/terrain/slope/steepness/ratio'
     * @param {string} midflame Fully qualified path to the midflame wind speed,
     *        something like 'site/surface/primary/wind/midflame'
    */
    constructor(path, bedRos0, bedRxi, bedSavr, bedBeta, slope, midflame) {
        super(path)

        this.nodes = [
            // Store inputs locally
            [path+L.rosNwns, 0, U.fireRos, 0, [
                [this.any, Dag.assign, [bedRos0]]]],
            [path+L.fireRxi, 0, U.fireRxi, 0, [
                [this.any, Dag.assign, [bedRxi]]]],
            [path+L.fuelSavr, 0, U.fuelSavr, 0, [
                [this.any, Dag.assign, [bedSavr]]]],
            [path+L.fuelBeta, 0, U.fuelBeta, 0, [
                [this.any, Dag.assign, [bedBeta]]]],
            [path+'slope/steepness/ratio', 0, U.ratio, 0, [
                [this.any, Dag.assign, [slope]]]],
            [path+'wind/speed/midflame', 0, U.windSpeed, 0, [
                [this.any, Dag.assign, [midflame]]]],

            [path+L.windB,      1, U.factor, 0, [
                [this.any, Bed.windB, [path+L.fuelSavr]]]],
            [path+L.windC,      0, U.factor, 0, [
                [this.any, Bed.windC, [path+L.fuelSavr]]]],
            [path+L.windE,      1, U.factor, 0, [
                [this.any, Bed.windE, [path+L.fuelSavr]]]],
            [path+L.windI,      0, U.factor, 0, [
                [this.any, Bed.windI, [path+L.fuelBrat, path+L.windE, path+L.windC]]]],
            [path+L.windK,      0, U.factor, 0, [
                [this.any, Bed.windK, [path+L.fuelBrat, path+L.windE, path+L.windC]]]],
            
            [path+L.fuelPhiW,   0, U.factor, 0, [
                [this.any, Bed.phiWind, [midflame, path+L.windB, path+L.windK]]]],
            [path+L.fuelPhiS,   0, U.factor, 0, [
                [this.any, Bed.phiSlope, [slope, path+L.fuelSlpk]]]],
            [path+L.fuelPhiE,   0, U.factor, 0, [
                [this.any, Fire.phiEffectiveWind, [path+L.fuelPhiW, path+L.fuelPhiS]]]],
            // The following apply only to upslope wind conditions
            [path+L.weffUpsl,   0, U.windSpeed, 0, [
                [this.any, Fire.effectiveWindSpeed, [path+L.fuelPhiE, path+L.windB, path+L.windI]]]],
            [path+L.rosUpsl,    0, U.fireRos, 0, [
                [this.any, Fire.maximumSpreadRate, [path+L.rosNwns, path+L.fuelPhiE]]]],
            [path+L.fireTaur,   0, U.taur, 0, [
                [this.any, Bed.fireResidenceTime, [path+L.fuelSavr]]]],
            [path+L.fireHpua,   0, U.hpua, 0, [
                [this.any, Bed.heatPerUnitArea, [path+L.fireRxi, path+L.fireTaur]]]],
            [path+L.fireLwr,    1, U.ratio, 0, [
                [this.any, Fire.lengthToWidthRatio, [path+L.weffUpsl]]]],
            [path+L.fireFli,    0, U.fireFli, 0, [
                [this.any, Fire.firelineIntensity, [path+L.rosUpsl, path+L.fireRxi, path+L.fireTaur]]]],
            [path+L.fireFlame,   0, U.flamelen, 0, [
                [this.any, Fire.flameLength, [path+L.fireFli]]]],
        ]
    }
}