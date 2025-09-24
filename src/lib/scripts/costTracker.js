import { Wfms, Paths as P, Util } from '../index.js'

// Step 1 - create Wfms and its Dag
const wfms = new Wfms()
const dag  = wfms.dag

// Step 2 - configured for maximum 13 inputs for cost analysis
// (EXCEPT just primary fuel, not two fuels and coverage)
// - a single surface standard fuel model key
// - all 5 fuel moisture inputs
// - midflame wind speed is derived from 20-ft wind and wsrf
// - wsrf is estimated from fuel and canopy parameters
// - slope direction is aspect
// - wind direction is heading from up-slope (no wind direction needed)
// - live curing fraction is estimated from herb moisture (no input required)

wfms.setConfig([
    [P.cfgSurfWtg,      ['primary', 'harmonic', 'arithmetic'][0]],
    [P.cfgCanopy,       ["height-base","ratio-height","height-length",
                        "ratio-base","ratio-length","length-base"][0]],
    [P.cfgEffWind,      ["applied","not applied"][0]],
    [P.cfgCured,        ["input","estimated"][1]],
    [P.cfgWsrf,         ["input","estimated"][1]],
    [P.cfgMidflame,     ["input","estimated"][1]],
    [P.cfgMoisDead,     ["particle","category"][0]],
    [P.cfgMoisLive,     ["particle","category"][0]],
    [P.cfgStdInput1,    ["catalog","custom"][0]],
    [P.cfgStdInput2,    ["catalog","custom"][0]],
    [P.cfgFuelDomain1,  ["standard","chaparral","palmetto","aspen"][0]],
    [P.cfgFuelDomain2,  ["standard","chaparral","palmetto","aspen"][0]],
    [P.cfgSlopeDir,     ["up-slope","down-slope"][1]],
    [P.cfgSlopeSteep,   ["ratio","degrees","map"][0]],
    [P.cfgWindSpeed,    ["at 20-ft","at 10-m"][0]],
    [P.cfgWindDir,      ["source from north","heading from up-slope","up-slope"][0]],
])

// Step 3 - specify the fire behavior variables to be produced
const ros = dag.nodeRef('weighted/fire/heading/spread rate')
const dirUp = dag.nodeRef('weighted/fire/heading/degrees/from up-slope')
const hpua = dag.nodeRef('weighted/fire/heat per unit area')
const fli = dag.nodeRef('weighted/fire/heading/fireline intensity')
const ews = dag.nodeRef('weighted/fire/effective wind/speed')
const lwr = dag.nodeRef('weighted/fire/length-to-width ratio')
dag.select(ros, dirUp, hpua, fli, ews, lwr)

dag.set('primary/model/standard/key', '124')
dag.set('weather/moisture/dead/1-h', 0.05)
dag.set('weather/moisture/dead/10-h', 0.07)
dag.set('weather/moisture/dead/100-h', 0.09)
dag.set('weather/moisture/live/herb', 0.5)
dag.set('weather/moisture/live/stem', 1.5)
dag.set('terrain/slope/direction/down-slope/degrees/from north', 180)
dag.set('terrain/slope/steepness/ratio/rise-to-reach', 0.25)
dag.set('weather/wind/direction/source/degrees/from north', 270)
dag.set('weather/wind/speed/at 20-ft', 20*88)
dag.set('canopy/coverage', 0.9)
dag.set('canopy/crown/base height', 10)
dag.set('canopy/crown/total height', 40)
dag.updateAll()

// If interested in these ...
// Util.logDagNodes(dag.selected(), 'Selected Node Values')
// Util.logDagConfigs(dag.activeConfigsByKey(), 'Active Configurations')
// Util.logDagNodes(dag.activeInputsByKey(), 'Active Inputs')
// Util.logDagNodes(dag.leafNodesByKey(), 'Leaf Nodes')

const leafNodes = dag.leafNodesByKey()

function track(input, value, leafNodes) {
    const tracks = []
    dag.set(input, value)
    for(let leaf of leafNodes) {
        dag.track(input, leaf)
        tracks.push(dag.tracker)
    }
    const total = tracks[0]
    for(let i=1; i<tracks.length; i++) {
        const track = tracks[i]
        total.clean    += track.clean
        total.constant += track.constant
        total.input    += track.input
        total.assign   += track.assign
        total.calc     += track.calc
        total.total = total.clean+total.constant+total.input+total.assign+total.calc
        // constant, input, and clean require no assignment or updater, so cost = 0
        // assign requires 1 assignment and no updater, so cost = 1
        // calc requires 1 assignment, 1 updater, and some operations in the updater: try cost = 4
        total.estcost = total.assign + 4 * total.calc
    }
    return total
} 
function pad(n,  w=5) { return (''+n).padStart(w) }

// Track cost of changing each input value for all leaf nodes
const costs = []
costs.push(track('primary/model/standard/key', '10', leafNodes))
costs.push(track('weather/moisture/live/herb', 0.6, leafNodes))
costs.push(track('weather/moisture/dead/1-h', 0.06, leafNodes))
costs.push(track('weather/moisture/dead/10-h', 0.08, leafNodes))
costs.push(track('weather/moisture/dead/100-h', 0.10, leafNodes))
costs.push(track('weather/moisture/live/stem', 1.6, leafNodes))
costs.push(track('canopy/coverage', 0.89, leafNodes))
costs.push(track('canopy/crown/base height', 11, leafNodes))
costs.push(track('canopy/crown/total height', 41, leafNodes))
costs.push(track('weather/wind/speed/at 20-ft', 10*88, leafNodes))
costs.push(track('terrain/slope/direction/down-slope/degrees/from north', 181, leafNodes))
costs.push(track('weather/wind/direction/source/degrees/from north', 90, leafNodes))
costs.push(track('terrain/slope/steepness/ratio/rise-to-reach', 0.20, leafNodes))

// Display summary
const wid = 54
let str = `\n${'Dag.get() calls Required'.padEnd(wid)} ---------- get() Method Results ---------\n`
str += `${'by changing just this parameter:'.padEnd(wid)} Clean Const Input Assig Calcs Total Costs\n`
for(let cost of costs) {
    const {from, clean, constant, input, assign, calc, total, estcost} = cost
    str += `${from.key.padEnd(wid, ' .')} ${pad(clean)} ${pad(constant)} ${pad(input)}`
        + ` ${pad(assign)} ${pad(calc)} ${pad(total)} ${pad(estcost)}\n`
}
console.log(str)