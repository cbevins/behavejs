import { Compass, Dag, L, U } from '../index.js'
import { WindEquations as Wind} from '../index.js'
/**
 * @param {string} path Module pathway prefixed to all the returned nodes' keys
 * @param {Config} cfg Wind direction is input as 'heading' or 'source' compass degrees.
 * @returns Array of wind direction module node definitions
 */
export function windDirectionNodes(path, wdcfg) {
    const wdheadinp =  path+'wind/direction/heading/input'
    const wdheadest =  path+'wind/direction/heading/estimated'
    const wdhead    =  path+'wind/direction/heading'
    const wdfrominp =  path+'wind/direction/source/input'
    const wdfromest =  path+'wind/direction/source/estimated'
    const wdfrom    =  path+'wind/direction/source'

    IN PROGRESS
    
    const meta = [
        [path+L.mmod, 'wind direction', U.text, Dag.constant, []],
        [path+L.mver, '1', U.text, Dag.constant, []],
        [path+L.mcfg, 'input '+wdcfg, U.text, Dag.constant, []],
    ]
    const nodes = [
        [wdheadinp,   0, U.wdir, Dag.input, []],
        [wdheadest, 180, U.wdir, Compass.opposite, [wdfrominp]],
        [wdfrominp, 180, U.wdir, Dag.input, []],
        [wdfromest,   0, U.wdir, Compass.opposite, [wdheadinp]],
    ]

    const dir = (wdcfg === 'source') ? inputFrom : inputHead
    return [...meta, ...speed, ...dir].sort()
}
