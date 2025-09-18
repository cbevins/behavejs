import { Dag, L, ModuleBase, P } from '../index.js'
import { CanopyModule } from '../index.js'
import { ConstantsModule } from '../index.js'
import { DeadFuelMoistureModule } from '../index.js'
import { LiveFuelCuringModule } from '../index.js'
import { LiveFuelMoistureModule } from '../index.js'
import { MidflameWindSpeedModule } from '../index.js'
import { SlopeDirectionModule } from '../index.js'
import { SlopeSteepnessModule } from '../index.js'
import { StandardFuelModelModule } from '../index.js'
import { SurfaceFireModule } from '../index.js'
import { SurfaceFuelModule } from '../index.js'
import { WindDirectionModule } from '../index.js'
import { WindSpeedModule } from '../index.js'
import { WindSpeedReductionModule } from '../index.js'

export class BehaveModule extends ModuleBase {
    constructor() {
        super('', 'BehaveModule')
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
            P.canopyShelters,           // canopy shelters fuel bed from wind
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
        
        this.nodes = [
            ...constants.configure(),
            ...canopy.configure(canopy.config.heightLength),
            ...deadmois.configure(deadmois.config.particle),
            ...livemois.configure(livemois.config.particle),
            ...slopedir.configure(slopedir.config.upslope),
            ...slopesteep.configure(slopesteep.config.ratio),
            ...windspeed.configure(windspeed.config.at20ft),
            ...winddir.configure(winddir.config.headingFromUpslope),
        
            ...curing1.configure(curing1.config.estimated),
            ...standard1.configure(standard1.config.catalog),
            ...wsrf1.configure(wsrf1.config.observed),
            ...midflame1.configure(midflame1.config.observed),
            ...bed1.configure(bed1.config.standard),
            ...fire1.configure(fire1.config.applied)
        ].sort()
    }
}