import { Dag, U } from '../index.js'
import { Paths as P} from './Paths.js'
import { ModuleBase } from './ModuleBase.js'
import { StandardFuelModelCatalog as Cat } from '../index.js'

export class StandardFuelModelModule extends ModuleBase {
    /**
     * 
     * @param {string} prefix Prefix for this module instance's fully qualified node names
     * (something like 'primary/surface/model/') to prefix this module's 'standard/<node>' keys.
     * @param {Config} cfg Config reference
     * @param {string} mois1h Fully qualified path to dead 1-h moisture content node
     * @param {string} mois10h Fully qualified path to dead 10-h moisture content node
     * @param {string} mois100h Fully qualified path to dead 100-h moisture content node
     * @param {string} moisHerb Fully qualified path to live herb moisture content node
     * @param {string} moisStem Fully qualified path to live stem moisture content node
     * @param {string} curedFraction Fully qualified path to cured herb fraction node
     */
    constructor(prefix, cfg, mois1h, mois10h, mois100h, moisHerb, moisStem, curedFraction) {
        super(prefix,  P.standardSelf, 'StandardFuelModelModule', cfg)
        const path = this.path
        this.nodes = [
            [path+P.stdKey, '', U.fuelKey, cfg.key, [
                [cfg.catalog, Dag.input, []],
                [cfg.custom, Dag.constant, []],
            ]],
            [path+P.stdNumb, 0, U.fuelNumb, cfg.key, [
                [cfg.catalog, Cat.standardNumber, [path+P.stdKey]],
                [cfg.custom, Dag.input, []],
            ]],
            [path+P.stdCode, '', U.fuelCode, cfg.key, [
                [cfg.catalog, Cat.standardCode, [path+P.stdKey]],
                [cfg.custom, Dag.input, []],
            ]],
            [path+P.stdLabel, '', U.fuelLabel, cfg.key, [
                [cfg.catalog, Cat.standardLabel, [path+P.stdKey]],
                [cfg.custom, Dag.input, []],
            ]],
            [path+P.stdDepth, 1, U.fuelDepth, cfg.key, [
                [cfg.catalog, Cat.standardDepth, [path+P.stdKey]],
                [cfg.custom, Dag.input, []],
            ]],
            [path+P.stdDeadMext, 0.25, U.fuelMois, cfg.key, [
                [cfg.catalog, Cat.standardMext, [path+P.stdKey]],
                [cfg.custom, Dag.input, []],
            ]],
            [path+P.stdDeadHeat, 0, U.fuelHeat, '', [
                ['', Cat.standardHeatDead, [path+P.stdKey]],
            ]],
            [path+P.stdLiveHeat, 0, U.fuelHeat, '', [
                ['', Cat.standardHeatLive, [path+P.stdKey]],
            ]],
            // common to all particles (path+P.stdKey arg is ignored)
            [path+P.stdDens, 0, U.fuelDens, '', [
                ['', Cat.standardDens, [path+P.stdKey]],
            ]],
            [path+P.stdSeff, 0, U.fuelSeff, '', [
                ['', Cat.standardSeff, [path+P.stdKey]],
            ]],
            [path+P.stdStot, 0, U.fuelStot, '', [
                ['', Cat.standardStot, [path+P.stdKey]],
            ]],
            // 1-h dead
            [path+P.stdDead1Load, 0, U.fuelLoad, cfg.key, [
                [cfg.catalog, Cat.standardLoad1, [path+P.stdKey]],
                [cfg.custom, Dag.input, []],
            ]],
            [path+P.stdDead1Mois, 0, U.fuelMois, '', [
                ['', Dag.assign, [mois1h]],
            ]],
            [path+P.stdDead1Savr, 1, U.fuelSavr, cfg.key, [
                [cfg.catalog, Cat.standardSavr1, [path+P.stdKey]],
                [cfg.custom, Dag.input, []],
            ]],
            [path+P.stdDead1Type, Cat.standardType1(), U.fuelType, '', [
                ['', Dag.constant, []],
            ]],
            // 10-h dead
            [path+P.stdDead10Load, 0, U.fuelLoad, cfg.key, [
                [cfg.catalog, Cat.standardLoad10, [path+P.stdKey]],
                [cfg.custom, Dag.input, []],
            ]],
            [path+P.stdDead10Mois, 0, U.fuelMois, '', [
                ['', Dag.assign, [mois10h]],
            ]],
            [path+P.stdDead10Savr, 1, U.fuelSavr, '', [
                ['', Cat.standardSavr10, []],
            ]],
            [path+P.stdDead10Type, Cat.standardType10(), U.fuelType, '', [
                ['', Dag.constant, []],
            ]],
            // 100-h dead
            [path+P.stdDead100Load, 0, U.fuelLoad, cfg.key, [
                [cfg.catalog, Cat.standardLoad100, [path+P.stdKey]],
                [cfg.custom, Dag.input, []],
            ]],
            [path+P.stdDead100Mois, 0, U.fuelMois, '', [
                ['', Dag.assign, [mois100h]],
            ]],
            [path+P.stdDead100Savr, 1, U.fuelSavr, '', [
                ['', Cat.standardSavr100, []],
            ]],
            [path+P.stdDead100Type, Cat.standardType100(), U.fuelType, '', [
                ['', Dag.constant, []],
            ]],
            // cured portion of total herb load
            [path+P.stdDeadHerbLoad, 0, U.fuelLoad, '', [
                ['', Cat.standardLoadCured, [path+P.stdKey, curedFraction]],
            ]],
            [path+P.stdDeadHerbMois, 0, U.fuelMois, '', [
                ['', Dag.assign, [mois1h]],
            ]],
            [path+P.stdDeadHerbSavr, 1, U.fuelSavr, '', [
                ['', Dag.assign, [path+P.stdTotalHerbSavr]],
            ]],
            [path+P.stdDeadHerbType, Cat.standardTypeCured(), U.fuelType, '', [
                ['', Dag.constant, []],
            ]],
            // uncured portion of total herb load
            [path+P.stdLiveHerbLoad, 0, U.fuelLoad, '', [
                ['', Cat.standardLoadUncured, [path+P.stdKey, curedFraction]],
            ]],
            [path+P.stdLiveHerbMois, 0, U.fuelMois, '', [
                ['', Dag.assign, [moisHerb]],
            ]],
            [path+P.stdLiveHerbSavr, 1, U.fuelSavr, '', [
                ['', Dag.assign, [path+P.stdTotalHerbSavr]],
            ]],
            [path+P.stdLiveHerbType, Cat.standardTypeUncured(), U.fuelType, '', [
                ['', Dag.constant, []],
            ]],
            // total (cured and uncured) herb load
            [path+P.stdTotalHerbLoad, 0, U.fuelLoad, cfg.key, [
                [cfg.catalog, Cat.standardLoadHerb, [path+P.stdKey]],
                [cfg.custom, Dag.input, []],
            ]],
            [path+P.stdTotalHerbSavr, 1, U.fuelSavr, cfg.key, [
                [cfg.catalog, Cat.standardSavrHerb, [path+P.stdKey]],
                [cfg.custom, Dag.input, []],
            ]],
            [path+P.stdTotalHerbType, Cat.standardTypeHerb(), U.fuelType, '', [
                ['', Dag.constant, []],
            ]],
            // live stem
            [path+P.stdLiveStemLoad, 0, U.fuelLoad, cfg.key, [
                [cfg.catalog, Cat.standardLoadStem, [path+P.stdKey]],
                [cfg.custom, Dag.input, []],
            ]],
            [path+P.stdLiveStemMois, 0, U.fuelMois, '', [
                ['', Dag.assign, [moisStem]],
            ]],
            [path+P.stdLiveStemSavr, 1, U.fuelSavr, cfg.key, [
                [cfg.catalog, Cat.standardSavrStem, [path+P.stdKey]],
                [cfg.custom, Dag.input, []],
            ]],
            [path+P.stdLiveStemType, Cat.standardTypeStem(), U.fuelType, '', [
                ['', Dag.constant, []],
            ]],
        ]
    }
}
