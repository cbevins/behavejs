import { Dag, C, P, ModuleBase, U } from './index.js'
import { StandardFuelModelCatalog as Cat } from './index.js'

export class StandardFuelModelModule extends ModuleBase {
    /**
     * 
     * @param {string} path Prefix for this module instance's fully qualified node names
     * (something like 'primary/surface/model/') to prefix this module's 'standard/<node>' keys.
     * @param {string} mois1h Fully qualified path to dead 1-h moisture content node
     * @param {string} mois10h Fully qualified path to dead 10-h moisture content node
     * @param {string} mois100h Fully qualified path to dead 100-h moisture content node
     * @param {string} moisHerb Fully qualified path to live herb moisture content node
     * @param {string} moisStem Fully qualified path to live stem moisture content node
     * @param {string} curedFraction Fully qualified path to cured herb fraction node
     */
    constructor(path, mois1h, mois10h, mois100h, moisHerb, moisStem, curedFraction) {
        super(path, 'StandardFuelModelModule')
        
        // config keys
        this.config = 'fuel source'
        this.options = [C.stdCatalog, C.stdCustom]
        this.nodes = [
            [path+P.stdKey, '', U.fuelKey, 0, [
                [C.stdCatalog, Dag.input, []],
                [C.stdCustom, Dag.constant, []],
            ]],
            [path+P.stdNumb, 0, U.fuelKey, 0, [
                [C.stdCatalog, Cat.number, [path+P.stdKey]],
                [C.stdCustom, Dag.input, []],
            ]],
            [path+P.stdCode, '', U.fuelCode, 0, [
                [C.stdCatalog, Cat.code, [path+P.stdKey]],
                [C.stdCustom, Dag.input, []],
            ]],
            [path+P.stdLabel, '', U.fuelKey, 0, [
                [C.stdCatalog, Cat.label, [path+P.stdKey]],
                [C.stdCustom, Dag.input, []],
            ]],
            [path+P.stdDepth, 1, U.fuelDepth, 0, [
                [C.stdCatalog, Cat.depth, [path+P.stdKey]],
                [C.stdCustom, Dag.input, []],
            ]],
            [path+P.stdDeadMext, 0.25, U.fuelMois, 0, [
                [C.stdCatalog, Cat.mext, [path+P.stdKey]],
                [C.stdCustom, Dag.input, []],
            ]],
            [path+P.stdDeadHeat, 0, U.fuelHeat, 0, [
                [this.any, Cat.heatDead, [path+P.stdKey]],
            ]],
            [path+P.stdLiveHeat, 0, U.fuelHeat, 0, [
                [this.any, Cat.heatLive, [path+P.stdKey]],
            ]],
            // common to all particles (path+P.stdKey arg is ignored)
            [path+P.stdDens, 0, U.fuelDens, 0, [
                [this.any, Cat.dens, [path+P.stdKey]],
            ]],
            [path+P.stdSeff, 0, U.fuelSeff, 0, [
                [this.any, Cat.seff, [path+P.stdKey]],
            ]],
            [path+P.stdStot, 0, U.fuelStot, 0, [
                [this.any, Cat.stot, [path+P.stdKey]],
            ]],
            // 1-h dead
            [path+P.stdDead1Load, 0, U.fuelLoad, 0, [
                [C.stdCatalog, Cat.load1, [path+P.stdKey]],
                [C.stdCustom, Dag.input, []],
            ]],
            [path+P.stdDead1Mois, 0, U.fuelMois, 0, [
                [this.any, Dag.assign, [mois1h]],
            ]],
            [path+P.stdDead1Savr, 1, U.fuelSavr, 0, [
                [C.stdCatalog, Cat.savr1, [path+P.stdKey]],
                [C.stdCustom, Dag.input, []],
            ]],
            [path+P.stdDead1Type, Cat.type1(), U.fuelType, 0, [
                [this.any, Dag.constant(), []],
            ]],
            // 10-h dead
            [path+P.stdDead10Load, 0, U.fuelLoad, 0, [
                [C.stdCatalog, Cat.load10, [path+P.stdKey]],
                [C.stdCustom, Dag.input, []],
            ]],
            [path+P.stdDead10Mois, 0, U.fuelMois, 0, [
                [this.any, Dag.assign, [mois10h]],
            ]],
            [path+P.stdDead10Savr, 1, U.fuelSavr, 0, [
                [this.any, Cat.savr10, []],
            ]],
            [path+P.stdDead10Type, Cat.type10(), U.fuelType, 0, [
                [this.any, Dag.constant, []],
            ]],
            // 100-h dead
            [path+P.stdDead100Load, 0, U.fuelLoad, 0, [
                [C.stdCatalog, Cat.load100, [path+P.stdKey]],
                [C.stdCustom, Dag.input, []],
            ]],
            [path+P.stdDead100Mois, 0, U.fuelMois, 0, [
                [this.any, Dag.assign, [mois100h]],
            ]],
            [path+P.stdDead100Savr, 1, U.fuelSavr, 0, [
                [this.any, Cat.savr100, []],
            ]],
            [path+P.stdDead100Type, Cat.type100(), U.fuelType, 0, [
                [this.any, Dag.constant(), []],
            ]],
            // cured portion of total herb load
            [path+P.stdDeadHerbLoad, 0, U.fuelLoad, 0, [
                [this.any, Cat.loadCured, [path+P.stdKey, curedFraction]],
            ]],
            [path+P.stdDeadHerbMois, 0, U.fuelMois, 0, [
                [this.any, Dag.assign, [mois1h]],
            ]],
            [path+P.stdDeadHerbSavr, 1, U.fuelSavr, 0, [
                [this.any, Dag.assign, [path+P.stdTotalHerbSavr]],
            ]],
            [path+P.stdDeadHerbType, Cat.typeCured(), U.fuelType, 0, [
                [this.any, Dag.constant, []],
            ]],
            // uncured portion of total herb load
            [path+P.stdLiveHerbLoad, 0, U.fuelLoad, 0, [
                [this.any, Cat.loadUncured, [path+P.stdKey, curedFraction]],
            ]],
            [path+P.stdLiveHerbMois, 0, U.fuelMois, 0, [
                [this.any, Dag.assign, [moisHerb]],
            ]],
            [path+P.stdLiveHerbSavr, 1, U.fuelSavr, 0, [
                [this.any, Dag.assign, [path+P.stdTotalHerbSavr]],
            ]],
            [path+P.stdLiveHerbType, Cat.typeUncured(), U.fuelType, 0, [
                [this.any, Dag.constant, []],
            ]],
            // total (cured and uncured) herb load
            [path+P.stdTotalHerbLoad, 0, U.fuelLoad, 0, [
                [C.stdCatalog, Cat.loadHerb, [path+P.stdKey]],
                [C.stdCustom, Dag.input, []],
            ]],
            [path+P.stdTotalHerbSavr, 1, U.fuelSavr, 0, [
                [C.stdCatalog, Cat.savrHerb, [path+P.stdKey]],
                [C.stdCustom, Dag.input, []],
            ]],
            [path+P.stdTotalHerbType, Cat.typeHerb(), U.fuelType, 0, [
                [this.any, Dag.constant, []],
            ]],
            // live stem
            [path+P.stdLiveStemLoad, 0, U.fuelLoad, 0, [
                [C.stdCatalog, Cat.loadStem, [path+P.stdKey]],
                [C.stdCustom, Dag.input, []],
            ]],
            [path+P.stdLiveStemMois, 0, U.fuelMois, 0, [
                [this.any, Dag.assign, [moisStem]],
            ]],
            [path+P.stdLiveStemSavr, 1, U.fuelSavr, 0, [
                [C.stdCatalog, Cat.savrStem, [path+P.stdKey]],
                [C.stdCustom, Dag.input, []],
            ]],
            [path+P.stdLiveStemType, Cat.typeStem(), U.fuelType, 0, [
                [this.any, Dag.constant, []],
            ]],
        ]
    }
}
