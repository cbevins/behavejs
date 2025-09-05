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
        this.key = path + 'key'
        this.code = path + 'code'
        this.curedFraction = curedFraction
        this.depth = path + 'depth'
        this.deadMext = path + 'dead/' + L.fuelMext
        this.label = path + 'label'
        this.number = path + 'number'
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
            // common to all particles
            [this.deadHeat, 0, U.fuelHeat, 0, [
                [this.any, Cat.heatDead, []],
            ]],
            [this.dens, 0, U.fuelDens, 0, [
                [this.any, Cat.dens, []],
            ]],
            [this.liveHeat, 0, U.fuelHeat, 0, [
                [this.any, Cat.heatLive, []],
            ]],
            [this.seff, 0, U.fuelSeff, 0, [
                [this.any, Cat.seff, []],
            ]],
            [this.stot, 0, U.fuelStot, 0, [
                [this.any, Cat.stot, []],
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
            [this.dead1Type, '', U.fuelType, 0, [
                [this.any, Cat.type1, []],
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
            [this.dead10Type, '', U.fuelType, 0, [
                [this.any, Cat.type10, []],
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
            [this.dead100Type, '', U.fuelType, 0, [
                [this.any, Cat.type100, []],
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
            [this.deadHerbType, '', U.fuelType, 0, [
                [this.any, Cat.typeCured, []],
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
            [this.liveHerbType, '', U.fuelType, 0, [
                [this.any, Cat.typeUncured, []],
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
            [this.totalHerbType, '', U.fuelType, 0, [
                [this.any, Cat.typeHerb, []],
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
            [this.liveStemType, '', U.fuelType, 0, [
                [this.any, Cat.typeStem, []],
            ]],
        ]
    }
}
