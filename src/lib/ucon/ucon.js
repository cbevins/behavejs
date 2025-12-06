const baseUnits = [
  'm',  // distance, length (m)
  'kg', // mass (kg)
  's',  // time (s)
  'oC', // thermodynamic temperature (oC)
  'J',  // energy (J)
  'A',  // electric current (A)
  'c',  // luminous intensity (c)
  'mole', // amount of substance (mole)
  'dl',  // ratio, dimensionless
]
const sigTemplate = {factor: 1, m: 0, kg: 0, s: 0, J: 0, oC: 0, A: 0, c: 0}
const unitTypes = [
    {type: 'distance', base: 'm', label: 'distance, length', units: [
            ['m', 1, 'm'],
            ['dm', 0.1, 'm'],
            ['cm', 0.01, 'm'],
            ['mm', 0.001, 'm'],
            ['km', 1000, 'm'],
            ['ft', 0.3048, 'm'] ,     // by definition in 1959
            ['in', 1/12, 'ft'],
            ['yd', 3, 'ft'],
            ['mi', 5280, 'ft'],
            ['ch', 66, 'ft'],
    ]},
    {type: 'area', base: 'm2', label: 'area', units: [
            ['ac', 66*660, 'ft2'],
            ['ha', 100*100, 'm2'],
    ]},
    // electric current = ampere [A]
    {type: 'current', base: 'A', label: 'electric current', units: [
        ['A', 1, 'A'],
    ]},
    // energy = joule [J] = 1 watt - second
    {type: 'energy', base: 'J', label: 'energy', units: [
            ['J', 1, 'J'],
            ['btu(IT)', 1055.05585262, 'J'],  // (IT)
            ['btu', 1054.3499999744, 'J'], // th
    ]},
    // area density, surface density (load) = mass/area
    {type: 'mass', base: 'kg', label: 'mass', units: [
            ['kg', 1, 'kg'],
            ['gm', 0.0001, 'kg'],
            ['T', 1000, 'kg'],
            ['lb', 0.45359237, 'kg'],
            ['t', 2000, 'lb'],
            ['oz', 1/16, 'lb'],
    ]},
    
    // acceleration = distance/time2 = m/s2
    // density = mass/volume = kg/m3
    // force = energy/distance = newton [N] = 1 J/m
    // fuel efficiency - mass = energy/mass = J / kg
    // fuel efficiency - volume = energy/volume = J/m3
    // heat density = energy/area = J/m2
    // heat flux density = watt/area = J/m2-s = W/m2
    // pressure = force/area = pascal [Pa] = 1 newton/square meter
    // specific heat capacity = joule/kilogram/K [J/(kg*K)]

    // power = energy/time = watt [W] = 1 J/s = 1 volt ampere [V*A]
    {type: 'power', base: 'W', label: 'power', units: [
        ['W', 1, 'J/s'],
        ['kW', 1000, 'W'],
    ]},
    {type: 'ratio', base: '1', label: 'ratio, dimensionless', units: [
        ['1', 1, '1'],
        ['%', 100, '1'],
    ]},
    {type: 'temperature', base: 'C', label: 'thermodynamic temperature', units: [
        ['oC', 1, 'oC'],
        ['oK', 1, 'oC'],  // same ratio, 0 degrees C is 273.15 K
        ['oF', 5/9, 'oC']
    ]},
    {type: 'time', base: 's', label: 'time', units: [
        ['s', 1, 's'],
        ['min', 60, 's'],
        ['hr', 60, 'min'],
        ['day', 24, 'hr'],
    ]},
]

const map = new Map()
for(let unitType of unitTypes) {
    const {type, base, label, units} = unitType
    for(let unit of units) {
        const [key, factor, into] = unit
        map.set(key, {key, type, base, factor, into})
    }
}

//------------------------------------------------------------------------------

function sigUom(sig) {
    let num = []
    let den = []
    for(let u of ['m', 'kg', 's', 'J', 'oC', 'A', 'c']) {
        if (sig[u] > 0) {
            if (sig[u]===1) num.push(u)
            else num.push(u+sig[u])
        } else if (sig[u]<0) {
            if (sig[u] === -1) den.push(u)
            else den.push(u+Math.abs(sig[u]))
        }
    }
    let str = num.length ? num.join(' ') : 1
    if (den.length) {
        str += '/' + den.join(' ')
    }
    return str
}

/**
 * Recognizes numerator/denomination, uom keys, and powers
 * @param {string} expression 
 * @param {bool} div If true, then starting in denominator, otherwise starting in numerator
 * @returns  Array of {key, dim, div, val} objects
 */
function parse(expression, div) {
    const terms = []
    const tokens = tokenize(expression)
    for(let token of tokens) {
        // Each expression has only 1 num and 1 denom, regardless of number of '/' or 'per'
        if (token === '/' || token === 'per') {
            div = !div
        } else if (['1',' ', '.', '-', '*', '^', ''].includes(token)) {
            // ignore separators, the '1' catches expressions like '1/s'
        } else {
            let key = token
            let dim = 1
            const last = token.charAt(token.length - 1)
            if (last === '1' || last === '2' || last === '3' || last==='4') {
                key = token.slice(0, -1)
                dim = parseInt(last)
            }
            const term = {key, dim, div, val: 1}
            terms.push(term)
        }
    }
    return terms
}

function compile(expression, sig, div=false, depth=0, log=false) {
    const pad = ''.padStart(4*depth) + depth + ': '
    if(log) console.log(pad, `parse('${expression}', ${depth}) sig:`, sig)
    const terms = parse(expression, div)
    for(let term of terms) {
        if(log) console.log(pad, '  term:', term)
        if (!map.has(term.key)) throw new Error(`Map does not have a key '${term.key}'`)
        const units = map.get(term.key)
        if (term.key === units.into) { // if this term key is a base units key
            sig[term.key] += term.div ? -term.dim : term.dim
        } else {
            for(let d=1; d<=term.dim; d++) {
                sig.factor *= term.div ? (1/units.factor) : units.factor
                compile(units.into, sig, term.div, depth+1, log)
            }
        }
    }
    return sig
}

// Uses regex where '\b\w+\b' matches a word characters and '[^\s]' matches whitespace
function tokenize(expression) { return expression.match(/(\b\w+\b|[^\s])/g) }

function run(expression, expVal=null, expUom=null, log=false) {
    let str = `'${expression}' -> `
    const sig = {factor: 1, m: 0, kg: 0, s: 0, J: 0, C: 0}
    compile(expression, sig, 0, log)
    const label = sigUom(sig)
    str += sig.factor + ' ' + label
    let err = false
    if (expVal !== null) {
        const diff = Math.abs(expVal-sig.factor)
        if (diff > 1.0e-10) {
            err = true
            str += `\x1b[35m  [Expected factor=${expVal}, diff = ${diff}]\x1b[0m`
        }
    }
    if (expUom !== null) {
        if (expUom !== label) {
            err = true
            str += `\x1b[35m  [Expected UoM '${expUom}', but got '${label}']\x1b[0m`
        }
    }
    if (err) console.log('\n----------------------------------')
    console.log(str, sig)
    if (err) console.log('----------------------------------\n')
}

function header(str) { console.log(`\n\x1b[34m${str}\x1b[0m`)}
console.log(new Date(), '-------------------------------------')

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
run('m', 1, 'm')
run('km', 1000, 'm')

// energy
header('energy')
run('btu', 1054.3499999744, 'J')
run('J', 1, 'J')

// mass
header('mass')
run('lb', 0.45359237, 'kg')
run('t', 2000*0.45359237, 'kg')
run('T', 1000, 'kg')

// power
header('power')
run('btu/s', 1054.3499999744, 'J/s')   // 1 Btu (th)/second [Btu (th)/s] = 1054.3499999744 watt [W]
run('btu/min', 17.5724999996, 'J/s') // 1 Btu (th)/minute = 17.5724999996 watt [W]
run('W', 1, 'J/s')

// time
header('time')
run('day', 24*3600, 's')
run('hr', 3600, 's')
run('min', 60, 's')
run('s', 1, 's')


// Velocity
header('velocity')
run('ft/min', 0.00508, 'm/s')
run('km/hr', 0.2777777778, 'm/s')
run('m/s', 1, 'm/s')
run('m/min', 1/60, 'm/s')
run('mi/hr', 26.8224/60, 'm/s')
run('mi/min', 26.8224, 'm/s')
run('yd/hr',  0.000254, 'm/s')

// others
header('misc')

run('1/ft2', 1/(0.3048*0.3048), '1/m2')

// heat flux
header('heat flux')
run('btu/ft2-s', 1054.3499999744/(0.3048*0.3048), 'J/m2 s')
// run('btu/ft2-min', 17.5724999996/(0.3048*0.3048), 'J/m2 s')

