import {Calc, Dag, L, U } from '../../modules/index.js'
import { FuelLife } from './FuelLife.js'
import { NodeDef } from './NodeDef.js'

import { SurfaceBedEquations as Bed } from '../../modules/index.js'
import { SurfaceElementEquations as Fuel } from '../../modules/index.js'
import { SurfaceFireEquations as Fire } from '../../modules/index.js'

export class FuelBed extends NodeDef {
    constructor(prefix) {
        super(prefix)
    }
    common(fuel, moisture, wind, slope, curing) {
        this.dead = new FuelLife(prefix+'dead/', 'dead', this, fuel, moisture)
        this.live = new FuelLife(prefix+'live/', 'live', this, fuel, moisture, this.dead)

        // assigned nodes
        this.cured = [0, U.fraction, Dag.assign, [curing.cured]],
        this.wmid = [0, U.wspd, Dag.assign, [wind.midflame]]

        this.bulk = [ 0, U.bulk, Bed.bulkDensity, [this.load, this.depth]]
        this.qig  = [ 0, U.qig, Bed.weightedHeatOfPreIgnition, [this.dead.sawf, this.dead.qig, this.live.sawf, this.live.qig]]
        this.owaf = [ 1, U.fraction, Bed.openWindSpeedAdjustmentFactor, [this.depth]]
        this.load = [ 0, U.load, Calc.sum, [this.dead.load, this.live.load]]
        this.beta = [ 0, U.ratio, Bed.packingRatio, [this.dead.vol, this.live.vol, this.depth]]
        this.bopt = [ 0, U.ratio, Bed.optimumPackingRatio, [this.savr]]
        this.bratio = [0, U.ratio, Bed.packingRatioRatio, [this.beta, this.bopt]]
        this.ehn  = [ 0, U.ratio, Fuel.effectiveHeatingNumber, [this.savr]]
        this.xi   = [ 0, U.ratio, Bed.propagatingFluxRatio, [this.savr, this.beta]]
        this.rxve = [ 0, U.factor, Bed.reactionVelocityExponent, [this.savr]]
        this.rxvm = [ 0, U.rxv, Bed.reactionVelocityMaximum, [this.savr15]]
        this.rxvo = [ 0, U.rxv, Bed.reactionVelocityOptimum, [this.bratio, this.rxvm, this.rxve]]
        this.slpk = [ 0, U.factor, Bed.slopeK, [this.beta]]
        this.sa   = [ 0, U.sa, Calc.sum, [this.dead.sa, this.live.sa]]
        this.savr = [ 1, U.savr, Bed.weightedSavr, [this.dead.sawf, this.dead.savr, this.live.sawf, this.live.savr]]
        this.savr15 = [1, U.savr, Bed.savr15, [this.savr]]
        this.wndb = [ 1, U.factor, Bed.windB, [this.savr]]
        this.wndc = [ 0, U.factor, Bed.windC, [this.savr]]
        this.wnde = [ 1, U.factor, Bed.windE, [this.savr]]
        this.wndi = [ 0, U.factor, Bed.windI, [this.bratio, this.wnde, this.wndc]]
        this.wndk = [ 0, U.factor, Bed.windK, [this.bratio, this.wnde, this.wndc]]
        this.phiw = [ 0, U.factor, Bed.phiWind, [this.wmid, this.wndb, this.wndk]]
        this.phis = [ 0, U.factor, Bed.phiSlope, [slope.ratio, this.slpk]]
        this.phie = [ 0, U.factor, Fire.phiEffectiveWind, [this.phiw, this.phis]]
        this.weff = [ 0, U.wspd, Fire.effectiveWindSpeed, [this.phie, this.wndb, this.wndi]]
        return this.nodes()
    }
}
