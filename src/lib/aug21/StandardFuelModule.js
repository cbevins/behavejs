import { Dag, StandardFuelModelCatalog as Eq } from '../index.js'
import { ModuleBase, U } from './index.js'

export class StandardFuelModule extends ModuleBase {
    /**
     * Creates the standard fuel model module nodes for a fuel bed.
     * @param {string} path Prefix for this module's fully qualified node names ('site/surface/{primary|secondary}/model/')
     */
    constructor(path){
        super(path)
        // fully qualified node keys
        this.alias = path + 'alias'
        this.key = path + 'key'
        this.number = path + 'number'
        this.code = path + 'code'
        this.label = path + 'label'
        this.depth = path + 'depth'
        this.mext = path + 'mext'
        this.heatdead = path + 'heatdead'
        this.heatlive = path + 'heatlive'
        this.load1 = path + 'load1'
        this.load10 = path + 'load10'
        this.load100 = path + 'load100'
        this.loadherb = path + 'loadherb'
        this.loadstem = path + 'loadstem'
        this.savr1 = path + 'savr1'
        this.savrherb = path + 'savrherb'
        this.savrstem = path + 'savrstem'
        // config keys
        this.config = 'standard fuel parameter source'
        this.catalog = 'catalog'
        this.input = 'input'
        this.options = [this.catalog, this.input]
    }
    genome() {
        const key = this.key
        return [
            [this.alias,      '', U.fmkey, [
                [this.config, this.catalog, Dag.input, []]],
                [this.config, this.input, Dag.constant, []]],
            [this.key,        '', U.fmkey, [
                [this.config, this.catalog, Eq.key, [key]]],
                [this.config, this.input, Dag.input, []]],
            [this.number,        0, U.fmnumb,[
                [this.config, this.catalog, Eq.number, [key]]],
                [this.config, this.input, Dag.input, []]],
            [this.code,   'none', U.fmcode,[
                [this.config, this.catalog, Eq.code, [key]]],
                [this.config, this.input, Dag.input, []]],
            [this.label,      '', U.fmlabel, [
                [this.config, this.catalog, Eq.label, [key]]],
                [this.config, this.input, Dag.input, []]],
            [this.depth,       1, U.depth, [
                [this.config, this.catalog, Eq.depth, [key]]],
                [this.config, this.input, Dag.input, []]],
            [this.mext,     0.25, U.mois, [
                [this.config, this.catalog, Eq.mext, [key]]],
                [this.config, this.input, Dag.input, []]],
            [this.heatdead, 8000, U.heat,[
                [this.config, this.catalog, Eq.heatDead, [key]]],
                [this.config, this.input, Dag.input, []]],
            [this.heatlive, 8000, U.heat, [
                [this.config, this.catalog, Eq.heatLive, [key]]],
                [this.config, this.input, Dag.input, []]],
            [this.load1,       0, U.load, [
                [this.config, this.catalog, Eq.load1, [key]]],
                [this.config, this.input, Dag.input, []]],
            [this.load10,      0, U.load, [
                [this.config, this.catalog, Eq.load10, [key]]],
                [this.config, this.input, Dag.input, []]],
            [this.load100,     0, U.load, [
                [this.config, this.catalog, Eq.load100, [key]]],
                [this.config, this.input, Dag.input, []]],
            [this.loadherb,    0, U.load, [
                [this.config, this.catalog, Eq.loadHerb, [key]]],
                [this.config, this.input, Dag.input, []]],
            [this.loadstem,    0, U.load, [
                [this.config, this.catalog, Eq.loadStem, [key]]],
                [this.config, this.input, Dag.input, []]],
            [this.savr1,       1, U.savr, [
                [this.config, this.catalog, Eq.savr1, [key]]],
                [this.config, this.input, Dag.input, []]],
            [this.savrherb,    1, U.savr, [
                [this.config, this.catalog, Eq.savrHerb, [key]]],
                [this.config, this.input, Dag.input, []]],
            [this.savrstem,    1, U.savr, [
                [this.config, this.catalog, Eq.savrStem, [key]]],
                [this.config, this.input, Dag.input, []]],
        ]
    }
}
