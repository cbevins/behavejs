import fs from 'fs'
import {BehaveModule} from '../index.js'
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

function createMaster() {
    const behave = new BehaveModule()
    let str = 'import { BehaveLibrary as Lib } from "./BehaveLibrary.js"\n'
    str += 'export const BehaveMap = new Map([\n'
    for(let node of behave.nodes) {
        const [key, value, units, opt, options] = node
        str += `[${jstr(key)}, {key: ${jstr(key)}, `
        str += `value: ${jstr(value)}, `
        str += `units: ${jstr(units)}, `
        str += `opt: ${jstr(opt)}, `
        str += `options: [\n`
        for(let option of options) {
            const [cfg, method, args] = option
            str += `    {cfg: ${jstr(cfg)}, updater: Lib.${method.name}, args: []},\n`
        }
        str += `    ]}],\n`
    }
    str += '])\n'
    fs.writeFile('./Genome.js', str, function (err) {
        if (err) throw err
    })
}
createMaster()
