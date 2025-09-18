import fs from 'fs'
import {Dag} from '../index.js'
import {Calc} from '../index.js'
import {CanopyEquations} from '../index.js'
import {CompassEquations} from '../index.js'
import {FuelBedEquations} from '../index.js'
import {FuelElementEquations} from '../index.js'
import {StandardFuelModelCatalog} from '../index.js'
import {SurfaceFireEquations} from '../index.js'
import {WindEquations} from '../index.js'

const equations = [
    [Dag, 'Dag', 'Dag'],
    [Calc, 'Calc', 'Calc'],
    [CanopyEquations, 'CanopyEquations', 'Canopy'],
    [CompassEquations, 'CompassEquations', 'Compass'],
    [FuelBedEquations, 'FuelBedEquations', 'FuelBed'],
    [FuelElementEquations, 'FuelElementEquations', 'FuelElement'],
    [StandardFuelModelCatalog, 'StandardFuelModelCatalog', 'Standard'],
    [SurfaceFireEquations, 'SurfaceFireEquations', 'SurfaceFire'],
    [WindEquations, 'WindEquations', 'Wind'],
]

function createLibrary() {
    // Create a Set of all methods
    const libSet = new Set()
    for(let eq of equations) {
        const [lib, file, tag] = eq
        const funcs = Object.getOwnPropertyNames(lib).filter(function (p) { return typeof lib[p] === 'function'})
        for(let func of funcs) libSet.add([func, tag])
    }
    // Create the new static library class
    let str = ''
    for(let eq of equations) {
        const [lib, file, tag] = eq
        str += `import { ${file} as ${tag} } from '../index.js'\n`
    }
    str += '\nexport class BehaveLibrary {\n'
    for(let entry of [...libSet].sort()) {
        const [func, tag] = entry
        str += `    static ${func} = ${tag}.${func}\n`
    }
    str += '}\n'
    // Write it
    fs.writeFile('./BehaveLibrary.js', str, function (err) {
        if (err) throw err
    })
}
createLibrary()
