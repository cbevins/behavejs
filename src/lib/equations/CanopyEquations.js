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
    static canopyBaseFromRatioHeight(ratio, height) {
      return height * Calc.positive((1 - ratio))
    }
    static canopyBaseFromRatioLength(ratio, length) {
      return Calc.positive(Calc.divide(length, ratio) - length)
    }
    static canopyBaseFromHeightLength(height, length) {
      return Calc.positive(height - length)
    }

    // Canopy fuel load
    static canopyFuelLoad (bulk, length) {
      return Calc.positive(bulk * length)
    }

    // Canopy heat per unit area
    static canopyHeatPerUnitArea (load, heat) {
      return Calc.positive(load * heat)
    }

    // Canopy total height
    static canopyHeightFromLengthBase(length, base) {
      return length + base
    }
    static canopyHeightFromRatioBase(ratio, base) {
      return Calc.divide(base, Calc.positive((1 - ratio))) // OK
    }
    static canopyHeightFromRatioLength(ratio, length) {
      return Calc.divide(length, ratio)
    }

    // Canopy crown length
    static crownLengthFromRatioHeight(ratio, height) {
      return Calc.positive(ratio * height)
    }
    static crownLengthFromRatioBase(ratio, base) {
      const height = Calc.divide(base, Calc.positive((1 - ratio)))
      return Calc.positive(height - base)
    }
    static crownLengthFromHeightBase(height, base) {
      return Calc.positive(height - base)
    }

    // Canopy ratio
    static crownRatioFromHeightLength(height, length) {
      return Calc.fraction(Calc.divide(length, height))
    }
    static crownRatioFromHeightBase(height, base) {
      return Calc.fraction(Calc.divide(Calc.positive((height-base)), height))
    }
    static crownRatioFromLengthBase(length, base) {
      return Calc.fraction(Calc.divide(length, (length+base)))
    } 

    // Returns true if canopy effectively shelters the fuel from wind
    static canopySheltersFuelFromWind (canopyCoverFraction, canopyTotalHeight, canopyFillFraction) {
      return canopyCoverFraction >= 0.01 && canopyFillFraction >= 0.05 && canopyTotalHeight >= 6
    }

    // Canopy-induced midflame windspeed adjustment factor
    static canopyWindSpeedAdjustmentFactor (cover, ht, fill) {
      const waf = (CanopyEquations.sheltersFuelFromWind(cover, ht, fill))
        ? 0.555 / (Math.sqrt(fill * ht) * Math.log((20 + 0.36 * ht) / (0.13 * ht)))
        : 1
      return Calc.fraction(waf)
    }
  }
