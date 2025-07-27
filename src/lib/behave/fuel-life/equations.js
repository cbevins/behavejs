/**
 * @file 'fuel/dead' and 'fuel/live' equations as described by Rothermel (1972) and as implemented by BehavePlus V6.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
*/

import {Calc} from '../Calc.js'
import { bed } from '../fuel-bed/oldGenome.js'

export class Equations {

    static surfaceArea(sa1, sa2, sa3, sa4, sa5) {
        return sa1 + sa2 + sa3 + sa4 + sa5
    }
    static surfaceAreaWeightingFactor(lifeSurfaceArea, otherSurfaceArea) {
        return Calc.divide(lifeSurfaceArea, (lifeSurfaceArea + otherSurfaceArea))
    }
}
