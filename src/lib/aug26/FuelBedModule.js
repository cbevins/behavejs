import { Dag, ModuleBase, U } from './index.js'
import { Calc } from '../index.js'
import { FuelBedEquations as Bed } from '../index.js'
import { FuelElementEquations as Fuel } from '../index.js'
import { SurfaceFireEquations as Fire } from '../index.js'

export class FuelBedModule extends ModuleBase {
    /**
     * Creates the fire fuel bed module nodes.
     * @param {string} path Prefix for this module's fully qualified node names ('site/surface/{primary|secondary}/bed/')
     */
    constructor(path){
        super(path)

        // fully qualified node keys
        this.depth = path + 'depth'
        this.bulk = path + 'bulk density'
        this.qig = path + 'heat of pre-ignition'
        this.load = path + 'ovendry fuel load'
        this.beta = path + 'packing ratio'
        this.bopt = path + 'packing ratio/optimum'
        this.bratio = path + 'packing ratio/ratio'
        this.ehn = path + 'effective heating number'
        this.xi = path + 'propagating flux ratio'
        this.rxve = path + 'reaction velocity/exponent'
        this.rxvm = path + 'reaction velocity/maximum'
        this.rxvo = path + 'reaction velocity/optimum'
        this.slpk = path + 'slope/factor'
        this.sa = path + 'surface area'
        this.savr = path + 'surface area-to-volume ratio'
        this.savr15 = path + 'savr power'
        this.wndb = path + 'wind/factor B'
        this.wndc = path + 'wind/factor C'
        this.wnde = path + 'wind/factor E'
        this.wndi = path + 'wind/factor I'
        this.wndk = path + 'wind/factor K'
        this.phiw = path + 'wind coefficitent'
        this.phis = path + 'slope coefficient'
        this.phie = path + 'effective wind coefficient'
        this.weff = path + 'effective wind speed'
        this.wsrf  = path + 'wind speed reduction factor'

        // Defined by the LiveCuringModule extension
        this.cured = path + 'cured live fuel fraction'
        // Defined by the WindSpeedReductionModule extension
        this.mwsrf = path + 'midflame wind speed reduction factor'
        // Defined by the MidflameWindSpeedModule extension
        this.wsmid = path + 'wind speed at midflame'
        // Defined by the SlopeModule extension
        this.slopeRatio = 'slope ratio'

        const dead = {
            load: path + 'dead/ovendry fuel load',
            qig: path + 'dead/heat of pre-ignition',
            sa: path + 'dead/surface area',
            savr: path + 'dead/surface area-to-volume ratio',
            sawf: path + 'dead/surface area weighting factor',
            vol: path + 'dead/volume',
        }
        const live = {
            load: path + 'live/ovendry fuel load',
            qig: path + 'live/heat of pre-ignition',
            sa: path + 'live/surface area',
            savr: path + 'live/surface area-to-volume ratio',
            sawf: path + 'live/surface area weighting factor',
            vol: path + 'live/volume',
        }

    /**
     * Note that:
     * - 'midflame wind speed reduction factor' is added to this path by the WindSpeedReductionModule
     * - 'wind speed at midflame' is added to this path by the MidflameWindSpeedModule
     * - 'cured live fuel fraction' is added to this path by LiveCuringModule
     * - 'slope ratio' is added to this path by SlopeModule
     */
    this.genome = [
            [this.depth, 1, U.fuelDepth, 0, [
                [this.any, Dag.input, []]]],
            [this.bulk,   0, U.bulk, 0, [
                [this.any, Bed.bulkDensity, [this.load, this.depth]]]],
            // [this.qig,    0, U.qig, 0, [
            //     [this.any, Bed.weightedHeatOfPreIgnition, [dead.sawf, dead.qig, live.sawf, live.qig]]]],
            [this.load,   0, U.load, 0, [
                [this.any, Calc.sum, [dead.load, live.load]]]],
            // [this.beta,   0, U.ratio, 0, [
            //     [this.any, Bed.packingRatio, [dead.vol, live.vol, this.depth]]]],
            [this.bopt,   0, U.ratio, 0, [
                [this.any, Bed.optimumPackingRatio, [this.savr]]]],
            [this.bratio, 0, U.ratio, 0, [
                [this.any, Bed.packingRatioRatio, [this.beta, this.bopt]]]],
            [this.ehn,    0, U.ratio, 0, [
                [this.any, Fuel.effectiveHeatingNumber, [this.savr]]]],
            [this.xi,     0, U.ratio, 0, [
                [this.any, Bed.propagatingFluxRatio, [this.savr, this.beta]]]],
            [this.rxve,   0, U.factor, 0, [
                [this.any, Bed.reactionVelocityExponent, [this.savr]]]],
            [this.rxvm,   0, U.rxv, 0, [
                [this.any, Bed.reactionVelocityMaximum, [this.savr15]]]],
            [this.rxvo,   0, U.rxv, 0, [
                [this.any, Bed.reactionVelocityOptimum, [this.bratio, this.rxvm, this.rxve]]]],
            [this.slpk,   0, U.factor, 0, [
                [this.any, Bed.slopeK, [this.beta]]]],
            [this.sa,     0, U.sa, 0, [
                [this.any, Calc.sum, [dead.sa, live.sa]]]],
            // [this.savr,   1, U.savr, 0, [
            //     [this.any, Bed.weightedSavr, [dead.sawf, dead.savr, live.sawf, live.savr]]]],
            [this.savr15, 1, U.savr, 0, [
                [this.any, Bed.savr15, [this.savr]]]],
            [this.wndb,   1, U.factor, 0, [
                [this.any, Bed.windB, [this.savr]]]],
            [this.wndc,   0, U.factor, 0, [
                [this.any, Bed.windC, [this.savr]]]],
            [this.wnde,   1, U.factor, 0, [
                [this.any, Bed.windE, [this.savr]]]],
            [this.wndi,   0, U.factor, 0, [
                [this.any, Bed.windI, [this.bratio, this.wnde, this.wndc]]]],
            [this.wndk,   0, U.factor, 0, [
                [this.any, Bed.windK, [this.bratio, this.wnde, this.wndc]]]],
            [this.phiw,   0, U.factor, 0, [
                [this.any, Bed.phiWind, [this.wmid, this.wndb, this.wndk]]]],
            [this.phis,   0, U.factor, 0, [
                [this.any, Bed.phiSlope, [this.slopeRatio, this.slpk]]]],
            [this.phie,   0, U.factor, 0, [
                [this.any, Fire.phiEffectiveWind, [this.phiw, this.phis]]]],
            [this.weff,   0, U.wspd, 0, [
                [this.any, Fire.effectiveWindSpeed, [this.phie, this.wndb, this.wndi]]]],
            [this.wsrf, 1, U.factor, 0, [
                [this.any, Bed.openWindSpeedAdjustmentFactor, [this.depth]]]]
        ]
    }
}
