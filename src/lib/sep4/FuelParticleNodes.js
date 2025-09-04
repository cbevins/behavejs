import {Dag, K, L, ModuleBase, U, StandardFuelModelCatalog as S} from './index.js'

export class FuelParticleNodes extends ModuleBase {
    /**
     * 
     * @param {string} fuelBedPath Something like 'surface/primary/bed/'
     * @param {string} moisDead1 Fully qualified path to dead 1-h moisture content node
     * @param {string} moisDead10 Fully qualified path to dead 10-h moisture content node
     * @param {string} moisDead100 Fully qualified path to dead 100-h moisture content node
     * @param {string} moisLiveHerb Fully qualified path to live herb moisture content node
     * @param {string} moisLiveStem Fully qualified path to live stem moisture content node
     * @param {string} stdModelKey Fully qualified path to standard fuel model key node
     * @param {string} curedFraction Fully qualified path to cured herb fraction node
     */
    constructor(fuelBedPath, moisDead1, moisDead10, moisDead100, moisLiveHerb, moisLiveStem,
        stdModelKey, curedFraction) {
        super(fuelBedPath)

        // configs
        this.config = 'fuel source'
        // config options
        const cat = 'standard-catalog'
        const inp = 'standard-input'
        const ch = 'chaparral'
        const pg = 'palmetto-gallberry'
        const wa = 'western aspen'
        this.options = [cat, inp, ch, pg, wa]

        const d1 = this.path + 'dead/1/'
        const d1Nodes = [
            [d1+L.fuelLife, K.fuelDeadCat, U.fuelLife, 0, [
                [this.all, Dag.assign, K.fuelDeadCat]
            ]],
            [d1+L.fuelType, K.fuelDeadDown, U.fuelType, 0, [
                [cat, Dag.assign, K.fuelDeadDown],
                [inp, Dag.assign, K.fuelDeadDown],
            ]],
            [d1+L.fuelMois, 1, U.fuelMois, 0, [
                [cat, Dag.assign, [moisDead1]],
                [inp, Dag.assign, [moisDead1]],
            ]]
            [d1+L.fuelLoad, K.fuelLoad, U.fuelLoad, 0, [
                [cat, S.load1, [stdModelKey]],
                [inp, Dag.input, []],
            ]],
            [d1+L.fuelSavr, K.fuelSavr, U.fuelSavr, 0, [
                [cat, S.savr1, [stdModelKey]],
                [inp, Dag.input, []],
            ]],
            [d1+L.fuelHeat, K.fuelHeat, U.fuelHeat, 0, [
                [cat, S.heatDead, [stdModelKey]],
                [inp, Dag.input, []],
            ]],
            [d1+L.fuelDens, K.fuelDens, U.fuelDens, 0, [
                [cat, S.dens, []],
                [inp, S.dens, []],
            ]],
            [d1+L.fuelStot, K.fuelStot, U.fuelStot, 0, [
                [cat, S.stot, []],
                [inp, S.stot, []],
            ]],
            [d1+L.fuelSeff, K.fuelSeff, U.fuelSeff, 0, [
                [cat, S.seff, []],
                [inp, S.seff, []],
            ]],
        ]
    }
}
