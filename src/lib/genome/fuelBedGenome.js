import { Dag, C, P, U } from './index.js'
import { FuelBedEquations as Bed} from './index.js'

export function fuelBedGenome(path=P.bed1) {
    const nodes = [
        [path+'depth', 1, U.fuelDepth, [['*', Dag.input, []]]],
        [path+'unsheltered wind reduction factor', 1, U.factor, [
            ['*', Bed.openWindSpeedAdjustmentFactor, [path+'depth']]]]
    ]
    return nodes
}