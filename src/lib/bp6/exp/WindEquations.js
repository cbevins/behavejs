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
}
