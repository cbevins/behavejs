import { AllModules, Util, StandardFuelModels } from "../core.js"
import * as Config from '../core.js'
console.log('Lists fuel model variables at cured herb levels of 0% and 100%')

//------------------------------------------------------------------------------
// AllModules 'site' construction and configuration
//------------------------------------------------------------------------------

Config.surfaceFire.value = Config.surfaceFire.onefuel
Config.fuelCuring.value = Config.fuelCuring.estimated

const modules = new AllModules(Config, 'site')
const site = modules.root
// console.log(Util.moduleTreeStr(root))

//------------------------------------------------------------------------------
// Site destructuring
//------------------------------------------------------------------------------

const {canopy, ignition, map, moisture, surface, terrain, weather} = site
const {primary} = surface
const {fire, fuel, model} = primary 
const {cured, fuelKey} = model.catalog
const {area, bulk, depth, qig, beta, bopt, brat, load, rxi,
    rxve, rxvm, rxvo, savr, sink, source, fuelWsrf, xi, dead, live} = fuel

// 'site.moisture' FuelMoistureModule destructuring
const {tl1, tl10, tl100} = moisture.dead
const {herb, stem} = moisture.live

//------------------------------------------------------------------------------
// DagNode selection, input, update, and results
//------------------------------------------------------------------------------

const dag = modules.dag

function curingMoistureImpact() {
    dag.select(beta, bulk, depth, savr, rxvo, xi,
        dead.drxi, live.drxi, dead.etas, live.etas,
        dead.etam, live.etam, qig, cured)
    dag.set(tl1, 0.05)
    dag.set(tl10, 0.07)
    dag.set(tl100, 0.09)
    dag.set(stem, 1.5)

    const herbmc = [1.21, 0.3]
    for(let fmod of StandardFuelModels) {
        const fm = fmod[1]
        dag.set(fuelKey, fm)
        console.log(fuelKey.value)
        for(let node of [savr, beta, bulk, rxvo, xi,
            dead.drxi, live.drxi, dead.etas, live.etas,
            // these *should* be different
            cured, dead.etam, live.etam, qig]) {
            const result = []
            for (let i=0; i<2; i++) {
                dag.set(herb, herbmc[i])
                dag.set(tl1, 0.05 + i*0.05)
                dag.set(tl10, 0.07 + i*0.05)
                dag.set(tl100, 0.09 + i*0.05)
                dag.set(stem, 1.5 + i*0.5)
                dag.updateAll()
                result.push(node.value)
            }
            result[2] = result[0] - result[1]
            console.log('    ', node.key(), result)
            // if (result[2] !== 0) throw Error(`Curing level has impact on ${node.key()}`)
        }
    }
}

function savrValues() {
    dag.select(savr, beta)
    let minBeta = 9999
    let maxBeta = 0
    let minSavr = 9999
    let maxSavr = 0
    for(let fmod of StandardFuelModels) {
        const fm = fmod[1]
        dag.set(fuelKey, fm)
        dag.updateAll()
        console.log(fm, savr.value, beta.value)
        if (beta.value > 0 && beta.value < minBeta) minBeta = beta.value
        if (beta.value > maxBeta) maxBeta = beta.value
        if (savr.value > 0 && savr.value < minSavr) minSavr = savr.value
        if (savr.value > maxSavr) maxSavr = savr.value
    }
    console.log('SAVR range', minSavr, maxSavr)
    console.log('Beta range', minBeta, maxBeta)
}
curingMoistureImpact()
savrValues()
