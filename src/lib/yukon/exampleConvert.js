import { Yukon } from './Yukon.js'
import { yukonUnits } from "./WfbmUom.js"
import {text} from './nodeConsole.js'

const yukon = new Yukon(yukonUnits)

function run(quant, fromUom, intoUom, expVal=null) {
    const val = yukon.convert(quant, fromUom, intoUom)

    // Perform any error testing
    let err = ''
    if (expVal !== null) {  // if an expected value was provided...
        const diff = Math.abs(expVal-val)
        if (diff > 1.0e-10) err += `[Expected value is ${expVal}, diff = ${diff}]`
    }

    // Display quantuty, fromUom, equivalent, intoUom
    let str = `${quant} ${fromUom} = ${val} ${intoUom} ${text.magenta}${err}${text.normal}`
    console.log(str)
}

// heat flux - we are using BehavePlus Btu of 1 Btu = 1055.87 J
const btu = 1055.87
const btutc = 1054.3499999744

run(1, 'ft', 'in', 12)
run(1.23, 'm', 'ft', 1.23 / 0.3048)
run(1.23, 'ft', 'm', 1.23 * 0.3048)
run(1, 'btu/ft2-s', 'J/m2-s', btu /(0.3048*0.3048), )
run(1, 'btu/ft2-min', 'J/m2-s', btu /(60*0.3048*0.3048))
run(1, 'lb/ft2', 'kg/m2', 4.882427636383041)
