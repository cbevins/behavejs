import fs from 'fs'
import {BehaveModule} from '../index.js'
import {Calc} from '../index.js'
import {CanopyEquations} from '../index.js'
import {CompassEquations} from '../index.js'
import {FuelBedEquations} from '../index.js'
import {FuelElementEquations} from '../index.js'
import {StandardFuelModelCatalog} from '../index.js'
import {SurfaceFireEquations} from '../index.js'
import {WindEquations} from '../index.js'


const equations = [
    [Calc, 'Calc', 'Calc'],
    [CanopyEquations, 'CanopyEquations', 'Canopy'],
    [CompassEquations, 'CompassEquations', 'Compass'],
    [FuelBedEquations, 'FuelBedEquations', 'FuelBed'],
    [FuelElementEquations, 'FuelElementEquations', 'FuelElement'],
    [StandardFuelModelCatalog, 'StandardFuelModelCatalog', 'Standard'],
    [SurfaceFireEquations, 'SurfaceFireEquations', 'SurfaceFire'],
    [WindEquations, 'WindEquations', 'Wind'],
]

function jstr(str) { return JSON.stringify(str) }

function createMap() {
    const libSet = new Set()
    const behave = new BehaveModule()
    let str = ''
    for(let eq of equations) str += `import { ${eq[1]} as ${eq[2]} } from '../index.js'\n`
    str = 'export const BehaveMap = new Map([\n'
    str += '    static assign = Dag.assign\n'
    str += '    static bind = Dag.assign\n'
    str += '    static constant = Dag.constant\n'
    str += '    static input = Dag.input\n'
    for(let node of behave.nodes) {
        const [key, value, units, opt, options] = node
        str += `[${jstr(key)}, {key: ${jstr(key)}, `
        str += `value: ${jstr(value)}, `
        str += `units: ${jstr(units)}, `
        str += `opt: ${jstr(opt)}, `
        str += `options: [\n`
        for(let option of options) {
            const [cfg, method, args] = option
            libSet.add(method.name)
            str += `    {cfg: ${jstr(cfg)}, updater: ${method.constructor.name}.${method.name}, args: []},\n`
        }
        str += `    ]}],\n`
    }
    str += '])\n'
    fs.writeFile('./behaveMap.js', str, function (err) {
        if (err) throw err
    })
}
// createMap()

function createLibrary() {
    const libSet = new Set()
    for(let eq of equations) {
        const [lib, long, short] = eq
        const funcs = Object.getOwnPropertyNames(lib).filter(function (p) { return typeof lib[p] === 'function'})
        for(let func of funcs) libSet.add([func, short])
    }
    let str = ''
    for(let eq of equations) str += `import { ${eq[1]} as ${eq[2]} } from '../index.js'\n`
    str += 'export class BehaveEquations  {\n'
    for(let f of [...libSet].sort()) {
        const [func, short] = f
        str += `    static ${func} = ${short}.${func}\n`
    }
    str += '}\n'
    fs.writeFile('./BehaveLibrary.js', str, function (err) {
        if (err) throw err
    })
}
createLibrary()
