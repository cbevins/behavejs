import { StandardFuelModels } from '../index.js'

export class StandardFuelModelCatalog {
    static fuelMap = new Map()

    // Returns the fuel model data **array**
    static standardGetData(alias) {
        const key = (typeof alias === 'string') ? alias.toLowerCase() : alias
        const map = StandardFuelModelCatalog.standardGetMap() // ensure it exists!
        return map.get(key)
    }

    // Returns a fuel model data **object**
    static standardGetObj(alias) {
        const [number, code, label, depth, mext, load1, load10, load100,
            loadHerb, loadStem, savr1, savrHerb, savrStem, heatDead, heatLive]
        = StandardFuelModelCatalog.standardGetData(alias)
        return {number, code, label, depth, mext, load1, load10, load100,
            loadHerb, loadStem, savr1, savrHerb, savrStem, heatDead, heatLive}
    }

    // Returns the fuel map, *after* first building it if necessary
    // Always called by this.standardGetData() and this.standardGetObj()
    static standardGetMap() {
        if (! StandardFuelModelCatalog.fuelMap.size) {
            for(let m of StandardFuelModels) {
                StandardFuelModelCatalog.fuelMap.set(m[0], m)      // numeric key
                StandardFuelModelCatalog.fuelMap.set(''+m[0], m)   // number string key
                StandardFuelModelCatalog.fuelMap.set(m[1], m)      // code key
            }
        }
        return StandardFuelModelCatalog.fuelMap
    }

    // Returns TRUE if the fuel model number or code exists in the map
    static standardHas(alias) {
        const key = (typeof alias === 'string') ? alias.toLowerCase() : alias
        const map = StandardFuelModelCatalog.standardGetMap() // ensure it exists!
        return map.has(key)
    }

    static standardCode(alias) { return StandardFuelModelCatalog.standardGetObj(alias).code }
    static standardDepth(alias) { return StandardFuelModelCatalog.standardGetObj(alias).depth }
    static standardDens() { return 32 }
    static standardHeatDead(alias) { return StandardFuelModelCatalog.standardGetObj(alias).heatDead }
    static standardHeatLive(alias) { return StandardFuelModelCatalog.standardGetObj(alias).heatLive }
    static standardKey(alias) { return StandardFuelModelCatalog.standardGetObj(alias).key }
    static standardLabel(alias) { return StandardFuelModelCatalog.standardGetObj(alias).label }
    static standardLoad1(alias) { return StandardFuelModelCatalog.standardGetObj(alias).load1 }
    static standardLoad10(alias) { return StandardFuelModelCatalog.standardGetObj(alias).load10 }
    static standardLoad100(alias) { return StandardFuelModelCatalog.standardGetObj(alias).load100 }
    static standardLoadHerb(alias) { return StandardFuelModelCatalog.standardGetObj(alias).loadHerb }
    static standardLoadStem(alias) { return StandardFuelModelCatalog.standardGetObj(alias).loadStem }
    static standardLoadCured(alias, curedFraction) { return StandardFuelModelCatalog.standardGetObj(alias).loadHerb * curedFraction}
    static standardLoadUncured(alias, curedFraction) { return StandardFuelModelCatalog.standardGetObj(alias).loadHerb * (1-curedFraction) }
    static standardMext(alias) { return StandardFuelModelCatalog.standardGetObj(alias).mext }
    static standardNumber(alias) { return StandardFuelModelCatalog.standardGetObj(alias).number }
    static standardSavr1(alias) { return StandardFuelModelCatalog.standardGetObj(alias).savr1 }
    static standardSavr10() { return 109 }
    static standardSavr100() { return 30 }
    static standardSavrHerb(alias) { return StandardFuelModelCatalog.standardGetObj(alias).savrHerb }
    static standardSavrStem(alias) { return StandardFuelModelCatalog.standardGetObj(alias).savrStem }
    static standardSeff() { return 0.01 }
    static standardStot() { return 0.0555 }
    static standardType1() { return 'dead & down' }
    static standardType10() { return 'dead & down' }
    static standardType100() { return 'dead & down' }
    static standardTypeCured() { return 'cured herb' }
    static standardTypeHerb() { return 'herb' }
    static standardTypeStem() { return 'stem' }
    static standardTypeUncured() { return 'uncured herb' }
}
