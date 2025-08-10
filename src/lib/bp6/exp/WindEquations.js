/**
 * @file Wind functions as implemented by BehavePlus v6.
 * @copyright 2021 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 */
import {Calc} from '../index.js'

export class WindEquations {
  static speedAt10m (ws20ft) {
    return 1.13 * ws20ft
  }

  static speedAt20ft (ws10m) {
    return ws10m / 1.13
  }

  static speedAt20ftFromMidflame (wsmid, mwaf) {
    return mwaf > 0 ? Calc.divide(wsmid, mwaf) : wsmid
  }

  static speedAtMidflame (ws20ft, mwaf) {
    return mwaf * ws20ft
  }

  //----------------------------------------------------------------------------
  
  static at10mFrom20ft (at20ft) {
    return 1.13 * at20ft
  }

  static at10mFromMidflame (atMidflame, midflameTo20ftRatio) {
    const at20ft = WindEquations.at20ftFromMidflame(atMidflame, midflameTo20ftRatio)
    return at10mFrom20ft(at20ft)
  }

  static at20ftFrom10m (at10m) {
    return at10m / 1.13
  }

  static at20ftFromMidflame (atMidflame, midflameTo20ftRatio) {
    return Calc.divide(atMidflame, midflameTo20ftRatio)
  }

  static atMidflameFrom10m (at10m, midflameTo20ftRatio) {
    const at20ft = WindEquations.at20ftFrom10m(at10m)
    return WindEquations.atMidflameFrom20ft(at20ft, midflameTo20ftRatio)
  }

  static atMidflameFrom20ft (at20ft, midflameTo20ftRatio) {
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

  //----------------------------------------------------------------------------
  
  // Returns true if canopy effectively shelters the fuel from wind
  static sheltersFuelFromWind (cover, ht, fill) {
    return cover >= 0.01 && fill >= 0.05 && ht >= 6
  }

  // Canopy induced midflame windspeed adjustment factor
  static windSpeedAdjustmentFactor (cover, ht, fill) {
    let waf = 1
    if (WindEquations.sheltersFuelFromWind(cover, ht, fill)) {
      waf = 0.555 / (Math.sqrt(fill * ht) * Math.log((20 + 0.36 * ht) / (0.13 * ht)))
    }
    return Calc.fraction(waf)
  }
}
