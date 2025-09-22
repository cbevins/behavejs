import { Wfms, Paths as P, Util } from '../index.js'

// Step 1 - create Wfms and its Dag
const wfms = new Wfms()
const dag  = wfms.dag

// Step 2 - configure input choices and computational options
wfms.setConfig([
    [P.cfgSurfWtg,      ['primary', 'harmonic', 'arithmetic'][0]],
    [P.cfgCanopy,       ["height-base","ratio-height","height-length",
                        "ratio-base","ratio-length","length-base"][0]],
    [P.cfgEffWind,      ["applied","not applied"][0]],
    [P.cfgCured,        ["input","estimated"][1]],
    [P.cfgWsrf,         ["input","estimated"][0]],
    [P.cfgMidflame,     ["input","estimated"][0]],
    [P.cfgMoisDead,     ["particle","category"][0]],
    [P.cfgMoisLive,     ["particle","category"][0]],
    [P.cfgStdInput1,    ["catalog","custom"][0]],
    [P.cfgStdInput2,    ["catalog","custom"][0]],
    [P.cfgFuelDomain1,  ["standard","chaparral","palmetto","aspen"][0]],
    [P.cfgFuelDomain2,  ["standard","chaparral","palmetto","aspen"][0]],
    [P.cfgSlopeDir,     ["up-slope","down-slope"][0]],
    [P.cfgSlopeSteep,   ["ratio","degrees","map"][0]],
    [P.cfgWindSpeed,    ["at 20-ft","at 10-m"][0]],
    [P.cfgWindDir,      ["source from north","heading from up-slope","up-slope"][1]],
])

// Step 3 - specify the fire behavior variables to be produced
const ros = dag.nodeRef('surface/fire/heading/spread rate')
const dirUp = dag.nodeRef('surface/fire/heading/direction/from up-slope')
const hpua = dag.nodeRef('surface/fire/heat per unit area')
const fli = dag.nodeRef('surface/fire/heading/fireline intensity')
const ews = dag.nodeRef('surface/fire/effective wind/speed')
const lwr = dag.nodeRef('surface/fire/length-to-width ratio')
dag.select(ros, dirUp, hpua, fli, ews, lwr)

// If interested in these ...
// Util.logDagNodes(dag.selected(), 'Selected Node Values')
// Util.logDagConfigs(dag.activeConfigsByKey(), 'Active Configurations')
// Util.logDagNodes(dag.activeInputsByKey(), 'Active Inputs')

// Step 4 - set the input ranges to be iterated
const fuels = ['1', '4', '6', '10', 'gr9', 'gs4', 'sh9', 'tu5', 'tl9', 'sb4']
const windSpeeds = []; for (let i = 0; i < 10; i++) { windSpeeds.push(i * 88 * 2) } // [0, 18, 2] mi/h
const windDirs = []; for (let i = 0; i < 10; i++) { windDirs.push(i * 30) } // [0, 270, 30] degrees
const tl1hs = []; for (let i = 2; i <= 20; i += 2) { tl1hs.push(i * 0.01) } // [2, 20, 2] %
const tl10h = [0.07]
const tl100h = [0.09]
const herbs = []; for (let i = 50; i <= 140; i += 10) { herbs.push(i * 0.01) } // [50, 140, 10] %
const stem = [1.5]
const slopes = []; for (let i = 0; i <= 180; i += 20) { slopes.push(i) } // [0, 180, 20] %

// Step 5 - iterate through 6 of the 9 input combinations in the most effeicient manner
dag.set('weather/moisture/dead/10-h', tl10h)
dag.set('weather/moisture/dead/100-h', tl100h)
dag.set('weather/moisture/live/stem', stem)

const start = new Date()
let n = 0
// Fuel model affects all other inputs, so it the deepest
for(let fuel of fuels) {
    dag.set('primary/model/standard/key', fuel)
    // Herb moisture affects fuel loads, so it is next
    for(let herb of herbs) {
        dag.set('weather/moisture/live/herb', herb)
        // Dead moisture alters some of the fuel particle properties, so it is next
        for(let tl1h of tl1hs) {
            dag.set('weather/moisture/dead/1-h', tl1h)
            // Wind speed and direction are next
            for(let wspd of windSpeeds) {
                dag.set('primary/wind/speed/midflame', wspd)
                for(let windDir of windDirs) {
                    dag.set('weather/wind/direction/heading/from up-slope', windDir)
                    for(let slope of slopes) {
                        dag.set('terrain/slope/steepness/ratio', slope)
                        dag.updateAll()
                        n++
                    }
                }
            }
        }
    }
}

const elapsed = new Date() - start
console.log(`${n} iterations in ${elapsed} msecs`)

// Run 1: 2,151
// Run 2: 2,251
// Run 3: 2,314

// Util.logDagNodes(dag.activeInputsByKey(), 'Active Inputs')
// Util.logDagNodes(dag.selected(), 'Final Results')
