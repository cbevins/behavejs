/**
 * @file Canopy functions as implemented by BehavePlus v6.
 * @copyright 2021 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 */
import {Calc} from './Calc.js'

export class CanopyEquations {
    // Canopy volumetric fill ratio the volume under the canopy top that
    // is filled with tree crowns (division by 3 assumes conical crown shapes).
    static crownFill (cover, cratio) {
      return (Calc.fraction(cratio) * Calc.fraction(cover)) / 3
    }

    // Canopy base height
    static baseFromRatioHeight(ratio, height) {
      return height * Calc.positive((1 - ratio))
    }
    static baseFromRatioLength(ratio, length) {
      return Calc.positive(Calc.divide(length, ratio) - length)
    }
    static baseFromHeightLength(height, length) {
      return Calc.positive(height - length)
    }

    // Canopy fuel load
    static fuelLoad (bulk, length) {
      return Calc.positive(bulk * length)
    }

    // Canopy heat per unit area
    static heatPerUnitArea (load, heat) {
      return Calc.positive(load * heat)
    }

    // Canopy total height
    static heightFromLengthBase(length, base) {
      return length + base
    }
    static heightFromRatioBase(ratio, base) {
      return Calc.divide(base, Calc.positive((1 - ratio))) // OK
    }
    static heightFromRatioLength(ratio, length) {
      return Calc.divide(length, ratio)
    }

    // Canopy crown length
    static lengthFromRatioHeight(ratio, height) {
      return Calc.positive(ratio * height)
    }
    static lengthFromRatioBase(ratio, base) {
      const height = Calc.divide(base, Calc.positive((1 - ratio)))
      return Calc.positive(height - base)
    }
    static lengthFromHeightBase(height, base) {
      return Calc.positive(height - base)
    }

    // Canopy ratio
    static ratioFromHeightLength(height, length) {
      return Calc.fraction(Calc.divide(length, height))
    }
    static ratioFromHeightBase(height, base) {
      return Calc.fraction(Calc.divide(Calc.positive((height-base)), height))
    }
    static ratioFromLengthBase(length, base) {
      return Calc.fraction(Calc.divide(length, (length+base)))
    } 

    // Returns true if canopy effectively shelters the fuel from wind
    static sheltersFuelFromWind (canopyCoverFraction, canopyTotalHeight, canopyFillFraction) {
      return canopyCoverFraction >= 0.01 && canopyFillFraction >= 0.05 && canopyTotalHeight >= 6
    }

    // Canopy-induced midflame windspeed adjustment factor
    static windSpeedAdjustmentFactor (cover, ht, fill) {
      const waf = (CanopyEquations.sheltersFuelFromWind(cover, ht, fill))
        ? 0.555 / (Math.sqrt(fill * ht) * Math.log((20 + 0.36 * ht) / (0.13 * ht)))
        : 1
      return Calc.fraction(waf)
    }
  }
