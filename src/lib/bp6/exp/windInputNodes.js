import { Dag, K } from '../index.js'
import { CompassEquations as Compass } from './CompassEquations.js'
import { WindEquations as Wind} from './WindEquations.js'

export function windInputNodes(id, cfgSpeed, cfgDir) {
    const speed10m = id+'speed/10-m'
    const speed20ft = id+'speed/20-ft'
    const heading = id+'direction/heading'
    const source = id+'direction/source'

    const input20ft = [
        [speed20ft, 0, K._wspd, Dag.input, []],
        [speed10m, 0, K._wspd, Wind.speedAt10m, [speed20ft]],
    ]
    const input10m = [
        [speed20ft, 0, K._wspd, Wind.speedAt20ft, [speed10m]],
        [speed10m, 0, K._wspd, Dag.input, []],
    ]
    const inputHeading = [
        [heading, 0, K._degn, Dag.input, []],
        [source, 180, K._degn, Compass.opposite, [heading]],
    ]
    const inputSource = [
        [heading, 0, K._degn, Compass.opposite, [source]],
        [source, 180, K._degn, Dag.input, []],
    ]
    const module = [
        [id+'_module/', 'wind input', K._text, Dag.constant, []],
        [id+'_version/', '1', K._text, Dag.constant, []],
    ]
    const speed = (cfgSpeed === '10-m') ? input10m : input20ft
    const dir = (cfgDir === 'source') ? inputSource : inputHeading
    return [...module, ...speed, ...dir]
}
