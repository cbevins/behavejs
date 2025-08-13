import { Compass, Dag, L, U } from '../index.js'
import { WindEquations as Wind} from './WindEquations.js'

export const WindConfig = {
    speed: {
        prompt: 'Wind speed inputs are for height at',
        options: [
            {value: '20-ft', desc: '20-ft'},
            {value: '10-m', desc: '10-m'},
        ],
        value: '20-ft',
    },
    direction: {
        prompt: 'Wind direction inputs are',
        options: [
            {value: 'heading', desc: 'heading degrees from north'},
            {value: 'source', desc: 'source degrees from north'},
        ],
        value: 'heading'
    }
}
/**
 * @param {string} path Module pathway prefixed to all the returned nodes' keys
 * @param {Config} cfg cfg.speed.value of '20-ft' or '10-m'
 *  and a cfg.direction.value of 'heading' or 'source'
 * @returns Array of wind module speed and direction node definitions
 */
export function windNodes(path, cfg) {
    const w10m = path+L.w10m
    const w20f = path+L.w20f
    const head = path+L.whead
    const from = path+L.wfrom
    const cfgDir = cfg.direction.value
    const cfgSpeed = cfg.speed.value

    const meta = [
        [path+L.mmod, 'wind', U.text, Dag.constant, []],
        [path+L.mver, '1', U.text, Dag.constant, []],
        [path+L.mcfg+'direction', cfgDir, U.text, Dag.constant, []],
        [path+L.mcfg+'speed', cfgSpeed, U.text, Dag.constant, []],
    ]
    const input20ft = [
        [w20f, 0, U.wspd, Dag.input, []],
        [w10m, 0, U.wspd, Wind.at10mFrom20ft, [w20f]],
    ]
    const input10m = [
        [w20f, 0, U.wspd, Wind.at20ftFrom10m, [w10m]],
        [w10m, 0, U.wspd, Dag.input, []],
    ]
    const inputHead = [
        [head, 0, U.wdir, Dag.input, []],
        [from, 180, U.wdir, Compass.opposite, [head]],
    ]
    const inputFrom = [
        [head, 0, U.wdir, Compass.opposite, [from]],
        [from, 180, U.wdir, Dag.input, []],
    ]
    const speed = (cfgSpeed === '10-m') ? input10m : input20ft
    const dir = (cfgDir === 'source') ? inputFrom : inputHead
    return [...meta, ...speed, ...dir].sort()
}
