import { C, Dag, L, P } from './index.js'
import { CanopyModule } from './index.js'
import { ConstantsModule } from './index.js'
import { DeadFuelMoistureModule } from './index.js'
import { LiveFuelCuringModule } from './index.js'
import { LiveFuelMoistureModule } from './index.js'
import { MidflameWindSpeedModule } from './index.js'
import { SlopeDirectionModule } from './index.js'
import { SlopeSteepnessModule } from './index.js'
import { StandardFuelModelModule } from './index.js'
import { SurfaceFireModule } from './index.js'
import { SurfaceFuelModule } from './index.js'
import { WindDirectionModule } from './index.js'
import { WindSpeedModule } from './index.js'
import { WindSpeedReductionModule } from './index.js'
import { Util } from './index.js'

console.log(new Date())

//------------------------------------------------------------------------------
// Step 1 - construct an array of *definitions* of all possible nodes
// including all possible configuration updaters for each node.
// (Note: only used string keys in this section to avoid circular dependencies)
//------------------------------------------------------------------------------

const constants = new ConstantsModule(P.constants)
const canopy = new CanopyModule('')

// Need wind speed and slope for surface fire model
const slopesteep = new SlopeSteepnessModule(P.terrain)
const slopedir = new SlopeDirectionModule(P.terrain)
const winddir = new WindDirectionModule(P.weather, P.terrain+P.slopeUp)
const windspeed = new WindSpeedModule(P.weather)

// Need fuel particle moisture contents for surface fuel models
const deadmois = new DeadFuelMoistureModule(P.weather)
const livemois = new LiveFuelMoistureModule(P.weather)

// Need a LiveFuelCuringModule for the StandardFuelModelModule
const curing1 = new LiveFuelCuringModule(
    P.standard1,                // module's parent path
    P.weather+P.moisLiveHerb)   // live herb moisture node key
const standard1 = new StandardFuelModelModule(
    P.model1,                   // path to module's parent
    P.weather+P.moisDead1,      // dead 1-h fuel moisture node key
    P.weather+P.moisDead10,
    P.weather+P.moisDead100,
    P.weather+P.moisLiveHerb,
    P.weather+P.moisLiveStem,
    P.standard1+P.curingApplied)

// Need a WindSpeedReductionModule and a MidflameWindSpeedModule for surface fire
const wsrf1 = new WindSpeedReductionModule(
    P.surf1,                    // module's parent path
    P.canopyWsrf,               // canopy wind speed reduction factor node key
    P.surf1+P.wsrfFuel)         // fuel bed wind speed reduction node key
const midflame1 = new MidflameWindSpeedModule(
    P.surf1,                    // module's parent path
    P.weather+P.wspd20ft,       // wind speed at 20-ft node key
    P.surf1+P.wsrfMidflame)     // wind speed reduction at midflame node key
const bed1 = new SurfaceFuelModule(
    P.surf1,                    // module's parent path
    P.model1,                   // path to a StandardFuelModelModule
    P.chaparral1, P.palmetto1, P.aspen1)
const fire1 = new SurfaceFireModule(
    P.surf1,
    P.terrain+P.slopeRatio,     // slope steepness ratio node key
    P.terrain+P.slopeUp,        // upslope direction node key
    P.surf1+P.midflame,         // midflame wind speed node key
    P.weather+P.wdirHeadFromUp  // wind heading degrees from upslope node key
)
//------------------------------------------------------------------------------
// Step 2 - Configure node definitions into an array of Dag nodes
// that only have a single updater method.
//------------------------------------------------------------------------------

const nodes = [
    ...constants.configure(),
    ...canopy.configure(C.heightLength),
    ...deadmois.configure(C.moisParticle),
    ...livemois.configure(C.moisParticle),
    ...slopedir.configure(C.sdirUp),
    ...slopesteep.configure(C.slopeRatio),
    ...windspeed.configure(C.wspd20ft),
    ...winddir.configure(C.wdirHeadFromUp),

    ...curing1.configure(C.curingEstimated),
    ...standard1.configure(C.stdCatalog),
    ...wsrf1.configure(C.wsrfObserved),
    ...midflame1.configure(C.midflameObserved),
    ...bed1.configure(C.fuelStd),
    ...fire1.configure(C.fireLimitYes)
].sort()
// Util.logNodeDefs(nodes)

//------------------------------------------------------------------------------
// Step 3 - construct the directed acyclical graph
//------------------------------------------------------------------------------

const dag = new Dag(nodes)

//------------------------------------------------------------------------------
// Step 4 - select nodes of interest
//------------------------------------------------------------------------------

const select = [
    // P.surf1+P.firep1+L.fireRos,    // no-wind, no-slope
    // P.surf1+P.bedPhiS,
    // P.surf1+P.bedPhiW,
    // P.surf1+P.firep1+L.firePhiE,
    // P.surf1+P.firep1+L.fireWeff,

    // P.surf1+P.firep2+L.rosWind,
    // P.surf1+P.firep2+L.rosSlope,
    // P.surf1+P.firep2+L.rosXcomp,
    // P.surf1+P.firep2+L.rosYcomp,
    // P.surf1+P.firep2+L.fireRos,

    // P.surf1+P.firep3+L.firePhiE,
    // P.surf1+P.firep3+L.fireWeff,
    // P.surf1+P.firep3+L.fireRos,

    // P.surf1+P.firep4+L.fireWeff,
    // P.surf1+P.firep4+L.firePhiE,
    // P.surf1+P.firep4+L.fireRos,

    // P.surf1+P.firep5+L.firePhiE,
    // P.surf1+P.firep5+L.fireWeff,
    // P.surf1+P.firep5+L.fireRos,

    // P.surf1+P.firep6+L.firePhiE,
    // P.surf1+P.firep6+L.fireWeff,
    // P.surf1+P.firep6+L.fireRos,

    // P.surf1+P.firep7+L.firePhiE,
    // P.surf1+P.firep7+L.fireWeff,
    // P.surf1+P.firep7+L.fireRos,

    P.surf1+P.fire+L.firePhiE,
    P.surf1+P.fire+L.fireWeff,
    P.surf1+P.fire+L.fireHeadRos,
    P.surf1+P.fire+L.fireHeadDirUp, // 'primary/surface/fire/heading/direction/from upslope',
    P.surf1+P.fire+L.fireLwr,
    P.surf1+P.fire+L.fireHeadFli,
    P.surf1+P.fire+L.fireHeadFlame,
]
dag.select(select)
// Util.logDagNodes(dag.selected(), 'Selected Nodes')

//------------------------------------------------------------------------------
// Step 5 - determine/confirm active configurations (informational)
//------------------------------------------------------------------------------

Util.listActiveConfigs(dag)

// RECONFIGURE HERE?

//------------------------------------------------------------------------------
// Step 6 - determine/confirm active inputs (informational)
//------------------------------------------------------------------------------

const inputs = dag.activeInputs()

//------------------------------------------------------------------------------
// Step 7 - Set input values
//------------------------------------------------------------------------------

dag.set(P.model1+P.stdKey, '10')
dag.set(P.weather+P.moisDead1, 0.05)
dag.set(P.weather+P.moisDead10, 0.07)
dag.set(P.weather+P.moisDead100, 0.09)
dag.set(P.weather+P.moisLiveHerb, 0.5)
dag.set(P.weather+P.moisLiveStem, 1.5)
dag.set(P.terrain+P.slopeRatio, 0.25)
dag.set(P.surf1+P.midflame, 10*88)
dag.set(P.weather+P.wdirHeadFromUp, 90)
Util.logDagNodes(dag.activeInputs(), 'Active Input Values')

//------------------------------------------------------------------------------
// Step 8 - Get output values
//------------------------------------------------------------------------------

dag.updateAll()
Util.logDagNodes(dag.selected(), 'Selected Node Values')
// Util.logDagNodes(dag.nodes(), 'All Nodes')
