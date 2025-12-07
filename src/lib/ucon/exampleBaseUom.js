import { Yukon } from './Yukon.js'
import { yukonUnits } from "./WfbmUom.js"
import {text} from './nodeConsole.js'

const yukon = new Yukon(yukonUnits)

function run(expression, expVal=null, expUom=null, log=false) {
    // Give Yukon a units-of-measure (uom) expression and it returns a 
    // and returns a UoM signature object like
    // {factor: 1, m: 0, kg: 0, s: 0, J: 0, oC: 0, A: 0, c: 0}
    const sig = yukon.compile(expression)
    
    // Get the expression's base units of measure as a string
    const dot = '·'
    const dash = '-' // other possible unit key separators are dot '·', space ' ', etc
    const baseUom = yukon.sigUom(sig, dash)

    // Perform any error testing
    let err = ''
    if (expVal !== null) {  // if an expected value was provided...
        const diff = Math.abs(expVal-sig.factor)
        if (diff > 1.0e-10) err += `[Expected factor=${expVal}, diff = ${diff}]`
    }
    if (expUom !== null && expUom !== baseUom)  // if an expected UoM label was provided...
        str += `[Expected UoM '${expUom}', but got '${label}']`

    // Display expression, base conversion factor, base uom, and any error message
    let str = `${expression.padEnd(16)} ${(sig.factor+' ').padEnd(24)} ${baseUom} ${text.magenta}${err}${text.normal}`
    console.log(str, /*sig*/)
}

function header(str) { console.log(`${text.blue}${str}${text.normal}`)}
console.log(new Date(), '-------------------------------------')

function runAll() {
    // heat flux - we are using BehavePlus Btu of 1 Btu = 1055.87 J
    const btu = 1055.87
    const btutc = 1054.3499999744

    // area
    header('area')
    run('ac', 4046.8564224, 'm2')
    run('ft2', 0.3048*0.3048, 'm2')
    run('ha', 10000, 'm2')

    // area density, load
    header('area density, load')
    run('lb/ft2', 0.45359237/(0.3048*0.3048), 'kg/m2')
    run('t/ac', (2000*0.45359237)/(66*660*0.3048*0.3048), 'kg/m2')
    run('kg/m2', 1, 'kg/m2')
    run('T/ha', 0.1, 'kg/m2')

    // distance
    header('distance')
    run('ft', 0.3048, 'm')
    run('mi', 5280*0.3048, 'm')
    run('yd', 3*0.3048, 'm')
    run('in', 0.3048/12, 'm')
    run('m', 1, 'm')
    run('cm', 0.01, 'm')
    run('mm', 0.001, 'm')
    run('km', 1000, 'm')

    // energy
    header('energy')
    run('btu', btu, 'J')
    run('J', 1, 'J')

    // heat flux - we are using BehavePlus Btu of 1 Btu = 1055.87 J
    header('heat flux')
    run('btu/ft2-s', btu /(0.3048*0.3048), 'J/m2-s')
    run('btu/ft2-min', btu /(60*0.3048*0.3048), 'J/m2-s')
    run('J/m2-s', 1, 'J/m2-s')
    run('W/m2', 1, 'J/m2-s')

    // intensity, power density, flux
    header('power density, intensity, flux')
    run('btu/ft-s', btu/0.3048, 'J/m-s')
    run('J/m-s', 1, 'J/m-s')
    run('W/m', 1, 'J/m-s')

    // mass
    header('mass')
    run('lb', 0.45359237, 'kg')
    run('t', 2000*0.45359237, 'kg')
    run('T', 1000, 'kg')

    // power
    header('power')
    run('btu/s', btu, 'J/s')
    run('btu/min',btu/60, 'J/s')
    run('W', 1, 'J/s')

    // time
    header('time')
    run('day', 24*3600, 's')
    run('hr', 3600, 's')
    run('min', 60, 's')
    run('s', 1, 's')

    // velocity
    header('velocity')
    run('ft/min', 0.00508, 'm/s')
    run('km/hr', 1000/3600, 'm/s')
    run('m/s', 1, 'm/s')
    run('m/min', 1/60, 'm/s')
    run('mi/hr', 26.8224/60, 'm/s')
    run('mi/min', 26.8224, 'm/s')
    run('yd/hr',  0.000254, 'm/s')

    // misc
    header('misc')
    run('1/s', 1, '1/s')
    run('1/ft2', 1/(0.3048*0.3048), '1/m2')
}
runAll()
