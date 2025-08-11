/**
 * @file Fuel element (particle) equations as implemented by BehavePlus v6.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 */
import {Calc} from '../index.js'

export class SurfaceElementEquations {
    
    static curedHerbLoad(totalLoad, curedFraction) {
        return totalLoad * curedFraction
    }
    
    static uncuredHerbLoad(totalLoad, curedFraction) {
        return totalLoad * (1 - curedFraction)
    }

  /**
   * Calculate and return a fuel particle diameter (ft+1)
   * from a surface area-to-volume ratio (ft-1).
   *
   * The diameter is derived using Rothermel (1972) equation 32 (p 14).
   *
   * @param {float} savr Fuel particle surface area-to-volume ratio (ft-1).
   *
   * @return Fuel particle diameter (ft+1).
   */
  static cylindricalDiameter (savr) {
    return Calc.divide(4, savr)
  }

  /**
   * Calculate and return the length (ft+1) of a hypothetical cylindrical
   * fuel particle given its diameter (ft+1) and volume (ft+3).
   *
   * @param {float} diam Fuel particle diameter (ft+1).
   * @param {float} volm Fuel particle volume (ft+3).
   *
   * @return Fuel particle length (ft+1).
   */
  static cylindricalLength (diam, volm) {
    const radius = diam / 2
    const area = Math.PI * radius * radius
    return Calc.divide(volm, area)
  }

  /**
   * Calculate and return a fuel particle effective heating number (fraction)
   * from a surface area-to-volume ratio (ft-1).
   *
   * The effective heating number is derived from Rothermel (1972) equation 14
   * (p 8, 26) and 77 (p 32).
   *
   * @param {float} savr Fuel particle surface area-to-volume ratio (ft-1).
   *
   * @return Fuel particle effective heating number (fraction).
   */
  static effectiveHeatingNumber (savr) {
    return savr <= 0 ? 0 : Math.exp(-138 / savr)
  }

  /**
   * Calculate and return the dead fuel particle `fine fuel load`.
   *
   * The `fine fuel load` is the portion of the fuel particle
   * load used to determine the life category fine fuel,
   * which in turn is used to determine the live category
   * moisture content of extinction.
   *
   * See Rothermel (1972) equation 88 on page 35.
   *
   * @param string life The fuel particle life category: 'dead' or 'live'.
   * @param {float} savr The fuel particle surface area-to-volume ratio (ft-1).
   * @param {float} load The fuel particle load (lb/ft2).
   *
   * @return Fuel particle ignition fuel load (lb/ft2).
   */

  static effectiveFuelLoad (savr, load, life) {
    return life === 'dead'
      ? Equations.effectiveFuelLoadDead(savr, load)
      : Equations.effectiveFuelLoadLive(savr, load)
  }

  static effectiveFuelLoadDead (savr, load) {
    return savr <= 0 ? 0 : load * Math.exp(-138 / savr)
  }

  // Calculate and return the live fuel particle `fine fuel load`.
  static effectiveFuelLoadLive(savr, load) {
    return savr <= 0 ? 0 : load * Math.exp(-500 / savr)
  }

  // Calculate and return the ignition fuel water load (lb water + 1 lb fuel -1)
  static effectiveFuelWaterLoad(effectiveFuelOvendryLoad, moistureContent) {
    return effectiveFuelOvendryLoad * moistureContent
  }

  /**
   * Calculate the fuel particle heat of pre-ignition.
   * @return real The fuel particle heat of pre-ignition (btu+1 lb-1).
   */
  static heatOfPreignition(mc, efhn) {
    const qig = 250.0 + 1116.0 * mc
    return qig * efhn
  }

  static netOvendryLoad(ovendryFuelLoad, totalMineralContent) {
    return (1 - totalMineralContent) * ovendryFuelLoad
  }

  // static selectByDomain (domain, behave, chaparral, palmetto, waspen) {
  //   if (domain === 'behave') {
  //     return behave
  //   } else if (domain === 'chaparral') {
  //     return chaparral
  //   } else if (domain === 'palmettoGallberry') {
  //     return palmetto
  //   } else if (domain === 'westernAspen') {
  //     return waspen
  //   }
  //   throw new Error(`Unknown domain '${domain}'`)
  // }

  /**
   * Calculate and return the fuel particle size class [0-5]
   * given its surface area-to-volume ratio (ft-1).
   *
   * The Rothermel fire spread model groups dead and down fuel particles into
   * one of 6 size classes based upon its diameter (or surface area-to-volume ratio)
   * as follows:
   *
   *<table>
  *<tr><td>Size Class</td><td>Diameter (in)</td><td>Surface Area-to-Vol</td><td>Time-lag</td></tr>
  *  <tr><td>0</td><td>0.00 - 0.04</td><td>&gt 1200</td><td>1</td></tr>
  *  <tr><td>1</td><td>0.04 - 0.25</td><td>192 - 1200</td><td>1</td></tr>
  *  <tr><td>2</td><td>0.25 - 0.50</td><td>96 - 192</td><td>10</td></tr>
  *  <tr><td>3</td><td>0.50 - 1.00</td><td>48 - 96</td><td>10</td></tr>
  *  <tr><td>4</td><td>1.00 - 3.00</td><td>16 - 48</td><td>100</td></tr>
  *  <tr><td>5</td><td>&gt 3.00</td><td>&lt 16</td><td>1000</td></tr>
  * </table>
  *
  * @param {number} savr Fuel particle surface area-to-volume ratio (ft-1).
  *
  * @return {integer} Fuel particle size class [0..5].
  */
  static sizeClass (savr) {
    let size = 5 // 3.00+ "
    if (savr >= 1200.0) {
      // 0.00 - 0.04"
      size = 0
    } else if (savr >= 192.0) {
      // 0.04 - 0.25"
      size = 1
    } else if (savr >= 96.0) {
      // 0.25 - 0.50"
      size = 2
    } else if (savr >= 48.0) {
      // 0.50 - 1.00"
      size = 3
    } else if (savr >= 16.0) {
      // 1.00 - 3.00"
      size = 4
    }
    return size
  }

  static sizeClassWeightingFactor (size, swtgArray) {
    return swtgArray[size]
  }

  /**
   * Calculate and return the fuel particle surface area (ft+2)
   * given its load (lb+1 ft-2), surface area-to-volume ratio (ft-1),
   * and fiber density (lb+1 ft-3).
   *
   * @param {float} load Fuel particle load (lb+1 ft-2).
   * @param {float} savr Fuel particle surface area-to-volume ratio (ft-1).
   * @param {float} density Fuel particle fiber density (lb+1 ft-3).
   *
   * @return float Fuel particle surface area (ft+2).
   */
  static surfaceArea (load, savr, dens) {
    return Calc.divide(load * savr, dens)
  }

  static surfaceAreaWeightingFactor (area, catArea) {
    return Calc.fraction(Calc.divide(area, catArea))
  }

  /**
   * Calculate and return the fuel particle volume (ft3/ft2)
   * given its a load (lb/ft2) and fiber density (lb/ft3).
   *
   * @param {number} load Fuel particle ovendry load (lb/ft2).
   * @param {number} dens Fuel particle fiber density (lb/ft3).
   *
   * @return float Fuel particle volume per square foot of fuel bed (ft3/ft2).
   */
  static volume (load, dens) {
    return Calc.divide(load, dens)
  }
}