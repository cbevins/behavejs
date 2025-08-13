import { standardFuelModelNodes } from '../index.js'
// import { chaparralFuelModelNodes } from '../index.js'
// import { southernRoughFuelModelNodes } from '../index.js'
// import { westernAspenFuelModelNodes } from '../index.js'

export const FuelModelConfig = {
    model: {
        prompt: 'The surface fuel parameters are derived from',
        options: [
            {value: 'standard catalog', desc: 'standard fuel model catalog'},
            {value: 'standard input', desc: 'standard fuel model parameters directly entered as input'},
            {value: 'chaparral', desc: 'dynamic chaparral fuel model (Albini and)'},
            {value: 'southern rough', desc: 'dynamic southern rough fuel model'},
            {value: 'western aspen', desc: 'dynamic western aspen fuel model (Brown and Simmerman)'},
            {value: 'none', desc: 'none, rock, water, etc'}],
        value: 'standard catalog',
    }
}
/**
 * 
 * @param {string} path Module pathway prefixed to all the returned nodes' keys
 * @param {object} cfg Object with cfg.model.value as defined above by FuelModelConfig
 * @returns Returns nodes for a fuel model defined by the cfg.model.value
 */
export function fuelModelNodes(modId, cfg) {
    const cfgModel = cfg.model.value

    if (cfgModel === 'standard catalog' || cfgModel === 'standard input') {
        return standardFuelModelNodes(modId, cfg)
    } else if (cfgModel === 'chaparral') {
        // const chaparral = chaparralModelNodes(chaparralId)
    } else if (cfgModel === 'southern rough') {
        // const rough = roughModelNodes(roughId)
    } else if (cfgModel === 'western aspen') {
        // const aspen = aspenModelNodes(aspenId)
    }
    return []
}