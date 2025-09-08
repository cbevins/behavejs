import { Dag, ModuleBase, L, U } from './index.js'
import { StandardFuelModelCatalog as Cat } from './index.js'

// LiveCuringModule extends the FuelBedModule (named in arg1)
// by linking live herb moisture content (arg 2)
// to estimate the fuel bed fraction of cured live fuel.
export class StandardFuelModelModule extends ModuleBase {
    /**
     * 
     * @param {string} path Prefix for this module's fully qualified node names
     *  ('site/surface/{primary|secondary}/model/standard/')
     * @param {string} mois1h Fully qualified path to dead 1-h moisture content node
     * @param {string} mois10h Fully qualified path to dead 10-h moisture content node
     * @param {string} mois100h Fully qualified path to dead 100-h moisture content node
     * @param {string} moisHerb Fully qualified path to live herb moisture content node
     * @param {string} moisStem Fully qualified path to live stem moisture content node
     * @param {string} curedFraction Fully qualified path to cured herb fraction node
     */
    constructor(path, mois1h, mois10h, mois100h, moisHerb, moisStem, curedFraction) {
        super(path)

        // fully qualified node keys
        this.key = path + L.fuelKey
        this.code = path + L.fuelCode
        this.curedFraction = curedFraction
        this.depth = path + L.fuelDepth
        this.deadMext = path + 'dead/' + L.fuelMext
        this.label = path + L.fuelLabel
        this.number = path + L.fuelNumber
        this.dens = path + L.fuelDens
        this.seff = path + L.fuelSeff
        this.stot = path + L.fuelStot
        this.mois1h = mois1h
        this.mois10h = mois10h
        this.mois100h = mois100h
        this.moisHerb = moisHerb
        this.moisStem = moisStem

        this.deadHeat = path + 'dead/' + L.fuelHeat
        this.liveHeat = path + 'live/' + L.fuelHeat

        this.dead1Load = path + 'dead/1-h/' + L.fuelLoad
        this.dead1Mois = path + 'dead/1-h/' + L.fuelMois
        this.dead1Savr = path + 'dead/1-h/' + L.fuelSavr
        this.dead1Type = path + 'dead/1-h/' + L.fuelType

        this.dead10Load = path + 'dead/10-h/' + L.fuelLoad
        this.dead10Mois = path + 'dead/10-h/' + L.fuelMois
        this.dead10Savr = path + 'dead/10-h/' + L.fuelSavr
        this.dead10Type = path + 'dead/10-h/' + L.fuelType

        this.dead100Load = path + 'dead/100-h/' + L.fuelLoad
        this.dead100Mois = path + 'dead/100-h/' + L.fuelMois
        this.dead100Savr = path + 'dead/100-h/' + L.fuelSavr
        this.dead100Type = path + 'dead/100-h/' + L.fuelType

        this.deadHerbLoad = path + 'dead/herb/' + L.fuelLoad
        this.deadHerbMois = path + 'dead/herb/' + L.fuelMois
        this.deadHerbSavr = path + 'dead/herb/' + L.fuelSavr
        this.deadHerbType = path + 'dead/herb/' + L.fuelType
        
        this.liveHerbLoad = path + 'live/herb/' + L.fuelLoad
        this.liveHerbMois = path + 'live/herb/' + L.fuelMois
        this.liveHerbSavr = path + 'live/herb/' + L.fuelSavr
        this.liveHerbType = path + 'live/herb/' + L.fuelType

        this.liveStemLoad = path + 'live/stem/' + L.fuelLoad
        this.liveStemMois = path + 'live/stem/' + L.fuelMois
        this.liveStemSavr = path + 'live/stem/' + L.fuelSavr
        this.liveStemType = path + 'live/stem/' + L.fuelType

        this.totalHerbLoad = path + 'total/herb/' + L.fuelLoad
        this.totalHerbSavr = path + 'total/herb/' + L.fuelSavr
        this.totalHerbType = path + 'total/herb/' + L.fuelType
        
        // config keys
        this.config = 'fuel source'
        this.catalog = 'catalog'
        this.custom = 'custom'
        this.options = [this.catalog, this.custom]

        this.nodes = [
            [this.key, '', U.fuelKey, 0, [
                [this.catalog, Dag.input, []],
                [this.custom, Dag.constant, []],
            ]],
            [this.number, 0, U.fuelKey, 0, [
                [this.catalog, Cat.number, [this.key]],
                [this.custom, Dag.input, []],
            ]],
            [this.code, '', U.fuelCode, 0, [
                [this.catalog, Cat.code, [this.key]],
                [this.custom, Dag.input, []],
            ]],
            [this.label, '', U.fuelKey, 0, [
                [this.catalog, Cat.label, [this.key]],
                [this.custom, Dag.input, []],
            ]],
            [this.depth, 1, U.fuelDepth, 0, [
                [this.catalog, Cat.depth, [this.key]],
                [this.custom, Dag.input, []],
            ]],
            [this.deadMext, 0.25, U.fuelMois, 0, [
                [this.catalog, Cat.mext, [this.key]],
                [this.custom, Dag.input, []],
            ]],
            [this.deadHeat, 0, U.fuelHeat, 0, [
                [this.any, Cat.heatDead, [this.key]],
            ]],
            [this.liveHeat, 0, U.fuelHeat, 0, [
                [this.any, Cat.heatLive, [this.key]],
            ]],
            // common to all particles (this.key arg is ignored)
            [this.dens, 0, U.fuelDens, 0, [
                [this.any, Cat.dens, [this.key]],
            ]],
            [this.seff, 0, U.fuelSeff, 0, [
                [this.any, Cat.seff, [this.key]],
            ]],
            [this.stot, 0, U.fuelStot, 0, [
                [this.any, Cat.stot, [this.key]],
            ]],
            // 1-h dead
            [this.dead1Load, 0, U.fuelLoad, 0, [
                [this.catalog, Cat.load1, [this.key]],
                [this.custom, Dag.input, []],
            ]],
            [this.dead1Mois, 0, U.fuelMois, 0, [
                [this.any, Dag.assign, [this.mois1h]],
            ]],
            [this.dead1Savr, 1, U.fuelSavr, 0, [
                [this.catalog, Cat.savr1, [this.key]],
                [this.custom, Dag.input, []],
            ]],
            [this.dead1Type, Cat.type1(), U.fuelType, 0, [
                [this.any, Dag.constant(), []],
            ]],
            // 10-h dead
            [this.dead10Load, 0, U.fuelLoad, 0, [
                [this.catalog, Cat.load10, [this.key]],
                [this.custom, Dag.input, []],
            ]],
            [this.dead10Mois, 0, U.fuelMois, 0, [
                [this.any, Dag.assign, [this.mois10h]],
            ]],
            [this.dead10Savr, 1, U.fuelSavr, 0, [
                [this.any, Cat.savr10, []],
            ]],
            [this.dead10Type, Cat.type10(), U.fuelType, 0, [
                [this.any, Dag.constant, []],
            ]],
            // 100-h dead
            [this.dead100Load, 0, U.fuelLoad, 0, [
                [this.catalog, Cat.load100, [this.key]],
                [this.custom, Dag.input, []],
            ]],
            [this.dead100Mois, 0, U.fuelMois, 0, [
                [this.any, Dag.assign, [this.mois100h]],
            ]],
            [this.dead100Savr, 1, U.fuelSavr, 0, [
                [this.any, Cat.savr100, []],
            ]],
            [this.dead100Type, Cat.type100(), U.fuelType, 0, [
                [this.any, Dag.constant(), []],
            ]],
            // cured portion of total herb load
            [this.deadHerbLoad, 0, U.fuelLoad, 0, [
                [this.any, Cat.loadCured, [this.key, this.curedFraction]],
            ]],
            [this.deadHerbMois, 0, U.fuelMois, 0, [
                [this.any, Dag.assign, [this.mois1h]],
            ]],
            [this.deadHerbSavr, 1, U.fuelSavr, 0, [
                [this.any, Dag.assign, [this.totalHerbSavr]],
            ]],
            [this.deadHerbType, Cat.typeCured(), U.fuelType, 0, [
                [this.any, Dag.constant, []],
            ]],
            // uncured portion of total herb load
            [this.liveHerbLoad, 0, U.fuelLoad, 0, [
                [this.any, Cat.loadUncured, [this.key, this.curedFraction]],
            ]],
            [this.liveHerbMois, 0, U.fuelMois, 0, [
                [this.any, Dag.assign, [this.moisHerb]],
            ]],
            [this.liveHerbSavr, 1, U.fuelSavr, 0, [
                [this.any, Dag.assign, [this.totalHerbSavr]],
            ]],
            [this.liveHerbType, Cat.typeUncured(), U.fuelType, 0, [
                [this.any, Dag.constant, []],
            ]],
            // total (cured and uncured) herb load
            [this.totalHerbLoad, 0, U.fuelLoad, 0, [
                [this.catalog, Cat.loadHerb, [this.key]],
                [this.custom, Dag.input, []],
            ]],
            [this.totalHerbSavr, 1, U.fuelSavr, 0, [
                [this.catalog, Cat.savrHerb, [this.key]],
                [this.custom, Dag.input, []],
            ]],
            [this.totalHerbType, Cat.typeHerb(), U.fuelType, 0, [
                [this.any, Dag.constant, []],
            ]],
            // live stem
            [this.liveStemLoad, 0, U.fuelLoad, 0, [
                [this.catalog, Cat.loadStem, [this.key]],
                [this.custom, Dag.input, []],
            ]],
            [this.liveStemMois, 0, U.fuelMois, 0, [
                [this.any, Dag.assign, [this.moisStem]],
            ]],
            [this.liveStemSavr, 1, U.fuelSavr, 0, [
                [this.catalog, Cat.savrStem, [this.key]],
                [this.custom, Dag.input, []],
            ]],
            [this.liveStemType, Cat.typeStem(), U.fuelType, 0, [
                [this.any, Dag.constant, []],
            ]],
        ]
    }
}
