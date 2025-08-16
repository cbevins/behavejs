import { Compass, Dag, L, U } from '../index.js'
import { WindEquations as Wind} from '../index.js'
/**
 * @param {string} path Module pathway prefixed to all the returned nodes' keys
 * @param {Config} cfg Wind is input at '20-ft' or '10-m'.
 * @returns Array of wind speed module node definitions
 */
export function windSpeedNodes(path, wscfg) {
    const ws20inp =  path+'wind/speed/at 20-ft/input'
    const ws20est =  path+'wind/speed/at 20-ft/estimated'
    const ws20    =  path+'wind/speed/at 20-ft'
    const ws10inp =  path+'wind/speed/at 10-m/input'
    const ws10est =  path+'wind/speed/at 10-m/estimated'
    const ws10    =  path+'wind/speed/at 10-m'

    const meta = [
        [path+L.mmod, 'wind speed', U.text, Dag.constant, []],
        [path+L.mver, '1', U.text, Dag.constant, []],
        [path+L.mcfg, 'input '+wscfg, U.text, Dag.constant, []],
    ]
    const nodes = [
        [ws20inp, 0, U.wspd, Dag.input, []],
        [ws20est, 0, U.wspd, Wind.at20ftFrom10m, [ws10inp]],
        [ws10inp, 0, U.wspd, Dag.input, []],
        [ws10est, 0, U.wspd, Wind.at10mFrom20ft, [ws10inp]],
    ]
    const input10 = [
        [ws10, 0, U.wspd, Dag.assign, [ws10inp]],
        [ws20, 0, U.wspd, Dag.assign, [ws20est]],
    ]
    const input20 = [
        [ws10, 0, U.wspd, Dag.assign, [ws10est]],
        [ws20, 0, U.wspd, Dag.assign, [ws20inp]],
    ]
    const speed = (wscfg === "10-m") ? input10 : input20
    return [...meta, ...nodes, ...speed].sort()
}
