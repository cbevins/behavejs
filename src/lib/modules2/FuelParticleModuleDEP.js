import {Dag, Units as U} from '../index.js'
import {DagModule, DagConfig, DagOption, DagNode} from './DagItems.js'
import { StandardFuelModelCatalog as Cat } from '../index.js'

export const configFuelDomain = new DagConfig('Fuel/Domain', ['standard', 'chaparral', 'palmetto', 'aspen'])
configFuelDomain.standard = 'standard'
configFuelDomain.chaparral = 'chaparral'
configFuelDomain.palmetto = 'palmetto'
configFuelDomain.aspen = 'aspen'

export const configFuelModelStandard = new DagConfig('Fuel/Model/Standard', ['catalog', 'custom'])
configStandardFuel.catalog = 'catalog'
configStandardFuel.custom = 'custom'

export class FuelBed extends DagModule {
    constructor(parent, key, configDomain) {
        super(parent, key)
        this.dead = new FuelBedDead(this, 'dead', configDomain)
        this.live = new FuelBedLive(this, 'live', configDomain)
    }
}

export class FuelBedDead extends DagModule {
    constructor(parent, key, configDomain) {
        super(parent, key)
        if (configDomain.value === configDomain.standard) {
            this.d1 = new FuelBedParticleStandard(this, 'd1', configStd)
            this.d2 = new FuelBedParticleStandard(this, 'd2', configStd)
            this.d3 = new FuelBedParticleStandard(this, 'd3', configStd)
            this.d4 = new FuelBedParticleStandard(this, 'd4', configStd)
            this.d5 = new FuelBedParticleStandard(this, 'd5', configStd)
        } else if (configDomain.value === configDomain.chaparral) {
        } else if (configDomain.value === configDomain.palmetto) {
        } else if (configDomain.value === configDomain.aspen) {
        }
    }
}

export class FuelParticleDeadStandard extends DagModule {
    constructor(parent, key, configStd) {
        this.d1 = new FuelParticleStandardDeadElement(this, 'd1', configStandardFuel)
    }
}
export class FuelParticleDefault extends DagModule {
    constructor(parent, key, life, n, moisRef, load=0, savr=1, heat=8000, dens=32, stot=0.0555, seff=0.01) {
        super(parent, key)
            this.life = new DagNode(this, 'life', life, U.fuelLife, null, [
                new DagOption('', Dag.constant, [])])
            this.particle = new DagNode(this, 'particle', n, U.integer, null, [
                new DagOption('', Dag.constant, [])])
            this.type = new DagNode(this, 'type', 'unused', U.fuelType, null, [
                new DagOption('', Dag.constant, [])])
            this.moisture = new DagNode(this, 'moisture', 0, U.fuelMois, null, [
                new DagOption('', Dag.constant, [])])
            this.load = new DagNode(this, 'load', 0, U.fuelLoad, null, [
                new DagOption('', Dag.constant, [])])
            this.savr = new DagNode(this, 'savr', savr, U.fuelSavr, null, [
                new DagOption('', Dag.constant, [])])
            this.heat = new DagNode(this, 'heat', heat, U.fuelHeat, null, [
                new DagOption('', Dag.constant, [])])
            this.dens = new DagNode(this, 'dens', dens, U.fuelDens, null, [
                new DagOption('', Dag.constant, [])])
            this.stot = new DagNode(this, 'stot', stot, U.fuelStot, null, [
                new DagOption('', Dag.constant, [])])
            this.seff = new DagNode(this, 'seff', seff, U.fuelSeff, null, [
                new DagOption('', Dag.constant, [])])
    }
}

export class FuelBedParticleStandard extends DagModule {
    constructor(parent, key, configStd) {
        super(parent, key)

        const life = ['d1', 'd2', 'd3', 'd4', 'd5'].includes(key) ? 'dead' : 'live'

        this.life = new DagNode(this, 'life', life, U.fuelLife, null, [
            new DagOption('', Dag.constant, [])])
        this.particle = new DagNode(this, 'particle', key, U.integer, null, [
            new DagOption('', Dag.constant, [])])

        this.stdKey = new DagNode(this, 'fuelKey', 'none', U.fuelKey, configStd, [
            new DagOption(configStd.catalog, Dag.input, []),
            new DagOption(configStd.custom, Dag.constant, [])])


        this.type = new DagNode(this, 'type', 'unused', U.fuelType, null, [
            new DagOption('', Dag.constant, [])])
        this.moisture = new DagNode(this, 'moisture', 0, U.fuelMois, null, [
            new DagOption('', Dag.constant, [])])
        this.load = new DagNode(this, 'load', 0, U.fuelLoad, null, [
            new DagOption('', Dag.constant, [])])
        this.savr = new DagNode(this, 'savr', savr, U.fuelSavr, null, [
            new DagOption('', Dag.constant, [])])

        // Common to all standard fuel particles within a life category
        const heatUpdater = (life==='dead') ? Cat.standardHeatDead : Cat.standardHeatLive
        this.heat = new DagNode(this, 'heat', heat, U.fuelHeat, null, [
            new DagOption('', heatUpdater, [])])

        // Common to all standard fuel  model particles
        this.dens = new DagNode(this, 'dens', dens, U.fuelDens, null, [
            new DagOption('', Cat.standardDens, [])])
        this.stot = new DagNode(this, 'stot', stot, U.fuelStot, null, [
            new DagOption('', Cat.standardSeff, [])])
        this.seff = new DagNode(this, 'seff', seff, U.fuelSeff, null, [
            new DagOption('', Cat.standardStot, [])])
    }
}