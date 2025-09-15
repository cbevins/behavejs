/**
 * @file Wind functions as implemented by BehavePlus v6.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 */
import {Calc} from './Calc.js'

export class WindEquations {
    static windSpeedAt10mFrom20ft (at20ft) {
        return 1.13 * at20ft
    }

    static windSpeedAt10mFromMidflame (atMidflame, midflameTo20ftRatio) {
        const at20ft = WindEquations.at20ftFromMidflame(atMidflame, midflameTo20ftRatio)
        return at10mFrom20ft(at20ft)
    }

    static windSpeedAt20ftFrom10m (at10m) {
        return at10m / 1.13
    }

    static windSpeedAt20ftFromMidflame (atMidflame, midflameTo20ftRatio) {
        return Calc.divide(atMidflame, midflameTo20ftRatio)
    }

    static windSpeedAtMidflameFrom10m (at10m, midflameTo20ftRatio) {
        const at20ft = WindEquations.at20ftFrom10m(at10m)
        return WindEquations.atMidflameFrom20ft(at20ft, midflameTo20ftRatio)
    }

    static windSpeedAtMidflameFrom20ft (at20ft, midflameTo20ftRatio) {
        return at20ft * midflameTo20ftRatio
    }

    static midflameTo20ftRatio (isSheltered, shelteredRatio, unshelteredRatio) {
        return isSheltered ? shelteredRatio : unshelteredRatio
    }

    static shelteredMidflameTo20ftRatio (canopyTotalHeight, canopyFillFraction) {
        return (canopyTotalHeight > 0 && canopyFillFraction > 0)
        ? Calc.fraction(0.555 / (Math.sqrt(canopyFillFraction * canopyTotalHeight) *
            Math.log((20 + 0.36 * canopyTotalHeight) / (0.13 * canopyTotalHeight))))
        : 1
    }

    static unshelteredMidflameTo20ftRatio (fuelDepth) {
        const depth = Math.min(6, Math.max(fuelDepth, 0.1))
        return 1.83 / Math.log((20 + 0.36 * depth) / (0.13 * depth))
    }
}
