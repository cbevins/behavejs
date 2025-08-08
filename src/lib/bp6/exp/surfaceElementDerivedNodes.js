/**
 * @file Behave '/particle/' DagNode definitions and creator method.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 */
import {Calc, Dag, FuelElementEquations as Eq, K} from '../index.js'

export function surfaceElementDerivedNodes(bedId, elId, life) {
    const id = elId
    const lifeId = bedId + life + '/'
    return [
        // 1 constant node
        [id+K.life, life, K._life, Dag.constant, []],

        // 12 derived characteristics
        [id+K.ehn, 0, K._ehn, Eq.effectiveHeatingNumber, [id+K.savr]],

        [id+K.efol, 0, K._load, Eq.effectiveFuelLoad, [id+K.savr, id+K.load, id+K.life]],

        [id+K.qig, 0, K._qig, Eq.heatOfPreignition, [id+K.mois, id+K.ehn]],

        [id+K.net, 0, K._load, Eq.netOvendryLoad, [id+K.load, id+K.stot]],

        [id+K.size, 0, K._size, Eq.sizeClass, [id+K.savr]],

        [id+K.scwf, 0, K._scwf, Eq.sizeClassWeightingFactor, [
                id+K.size,              // element's size class index
                lifeId+K.scar]], // into this size class weighting array

        [id+K.sa, 0, K._sa, Eq.surfaceArea, [id+K.load, id+K.savr, id+K.dens]],

        [id+K.sawf, 0, K._sawf, Eq.surfaceAreaWeightingFactor, [id+K.sa, lifeId+K.sa]],

        [id+K.vol, 0, K._vol, Eq.volume, [id+K.load, id+K.dens]],

        [id+K.efwl, 0, K._efwl, Eq.effectiveFuelWaterLoad, [id+K.efol, id+K.mois]],

        [id+K.diam, 0, K._diam, Eq.cylindricalDiameter, [id+K.savr]],

        [id+K.leng, 0, K._leng, Eq.cylindricalLength, [id+K.diam, id+K.vol]],
    ]
}
