import { Dag, C, P, U } from './index.js'
import { WindEquations as Wind} from './index.js'

/**
 * 
 * @param {string} thisPath 'site/weather/wind/reduction/'
 * @param {string} bedPath 'site/surface/primary/bed/'
 * @param {string} canopyPath 'site/canopy/'
 */
export function windReductionFactorGenome(thisPath=P.windReduct, bedPath=P.bed1, canopyPath=P.canopy) {
    const nodes = [
        [thisPath+'factor', 0, U.fraction, [
            ['input', Dag.input, []],
            ['estimated', Wind.windSpeedAdjustmentFactor, [
                canopyPath+'shelters fuel from wind',
                canopyPath+'wind reduction factor',
                bedPath+'unsheltered wind reduction factor']],
        ]],
    ]
    return nodes
}
