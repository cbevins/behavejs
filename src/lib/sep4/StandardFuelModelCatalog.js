import { StandardFuelModels } from './index.js'

export class StandardFuelModelCatalog {
    static fuelMap = new Map()

    // Returns the fuel model data **array**
    static getData(alias) {
        const key = (typeof alias === 'string') ? alias.toLowerCase() : alias
        const map = StandardFuelModelCatalog.getMap() // ensure it exists!
        return map.get(key)
    }

    // Returns a fuel model data **object**
    static getObj(alias) {
        const [number, code, label, depth, mext, load1, load10, load100,
            loadHerb, loadStem, savr1, savrHerb, savrStem, heatDead, heatLive]
        = StandardFuelModelCatalog.getData(alias)
        return {number, code, label, depth, mext, load1, load10, load100,
            loadHerb, loadStem, savr1, savrHerb, savrStem, heatDead, heatLive}
    }

    // Returns the fuel map, *after* first building it if necessary
    // Always called by this.getData() and this.getObj()
    static getMap() {
        if (! StandardFuelModelCatalog.fuelMap.size) {
            for(let m of StandardFuelModels.fuelData) {
                StandardFuelModelCatalog.fuelMap.set(m[0], m)      // numeric key
                StandardFuelModelCatalog.fuelMap.set(''+m[0], m)   // number string key
                StandardFuelModelCatalog.fuelMap.set(m[1], m)      // code key
            }
        }
        return StandardFuelModelCatalog.fuelMap
    }

    // Returns TRUE if the fuel model number or code exists in the map
    static has(alias) {
        const key = (typeof alias === 'string') ? alias.toLowerCase() : alias
        const map = StandardFuelModelCatalog.getMap() // ensure it exists!
        return map.has(key)
    }

    static code(alias) { return StandardFuelModelCatalog.getObj(alias).code }
    static depth(alias) { return StandardFuelModelCatalog.getObj(alias).depth }
    static dens() { return 32 }
    static heatDead(alias) { return StandardFuelModelCatalog.getObj(alias).heatDead }
    static heatLive(alias) { return StandardFuelModelCatalog.getObj(alias).heatLive }
    static key(alias) { return StandardFuelModelCatalog.getObj(alias).key }
    static label(alias) { return StandardFuelModelCatalog.getObj(alias).label }
    static load1(alias) { return StandardFuelModelCatalog.getObj(alias).load1 }
    static load10(alias) { return StandardFuelModelCatalog.getObj(alias).load10 }
    static load100(alias) { return StandardFuelModelCatalog.getObj(alias).load100 }
    static loadHerb(alias) { return StandardFuelModelCatalog.getObj(alias).loadHerb }
    static loadStem(alias) { return StandardFuelModelCatalog.getObj(alias).loadStem }
    static loadCured(alias, curedFraction) { return StandardFuelModelCatalog.getObj(alias).loadHerb * curedFraction}
    static loadUncured(alias, curedFraction) { return StandardFuelModelCatalog.getObj(alias).loadHerb * (1-curedFraction) }
    static mext(alias) { return StandardFuelModelCatalog.getObj(alias).mext }
    static number(alias) { return StandardFuelModelCatalog.getObj(alias).number }
    static savr1(alias) { return StandardFuelModelCatalog.getObj(alias).savr1 }
    static savr10() { return 109 }
    static savr100() { return 30 }
    static savrHerb(alias) { return StandardFuelModelCatalog.getObj(alias).savrHerb }
    static savrStem(alias) { return StandardFuelModelCatalog.getObj(alias).savrStem }
    static seff() { return 0.01 }
    static stot() { return 0.0555 }
}
