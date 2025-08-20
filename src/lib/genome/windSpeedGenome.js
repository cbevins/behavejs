import { Dag, C, P, U } from './index.js'
import { WindEquations as Wind} from './index.js'

/**
 * 
 * @param {string} thisPath 'site/weather/wind/speed/'
 * @param {string} wsrfPath 'site/weather/wind/reduction/'
 */
export function windSpeedGenome(thisPath=P.windSpeed, wsrfPath=P.windReduct) {
    const nodes = [
        [thisPath+'at 20-ft', 0, U.windSpeed, [
            ['at 20-ft', Dag.input, []],
            ['at 10-m', Wind.at20ftFrom10m, [thisPath+'at 10-m']],
            ['at midflame height', Wind.at20ftFromMidflame, [thisPath+'at midflame height', wsrfPath+'factor']],
        ]],
        [thisPath+'at 10-m', 0, U.windSpeed, [
            ['at 10-m', Dag.input, []],
            ['at 20-ft', Wind.at10mFrom20ft, [thisPath+'at 20-ft']],
            ['at midflame height', Wind.at10mFromMidflame, [thisPath+'at midflame height', wsrfPath+'factor']],
        ]],
        [thisPath+'at midflame height', 0, U.windSpeed, [
            ['at midflame height', Dag.input, []],
            ['at 20-ft', Wind.atMidflameFrom20ft, [thisPath+'at 20-ft', wsrfPath+'factor']],
            ['at 10-m', Wind.atMidflameFrom10m, [thisPath+'at 10-m', wsrfPath+'factor']],
        ]],
    ]
    return nodes
}
