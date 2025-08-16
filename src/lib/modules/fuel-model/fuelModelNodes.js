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
export const FuelModelOptions = ['standard catalog', 'standard input', 'chaparral',
    'southern rough', 'western aspen', 'none']

/**
 * 
 * @param {string} path Module pathway prefixed to all the returned nodes' keys
 * @param {string} model One of the FuelModelOptions
 * @returns Returns nodes for a fuel model defined by the model value
 */
export function fuelModelNodes(path, model) {
    if (!FuelModelOptions.includes(model))
        throw new Error(`fuelModelNodes() received unknown configuration option "${model}"`)

    if (model === 'standard catalog' || model === 'standard input') {
        return standardFuelModelNodes(path, model)
    } else if (model === 'chaparral') {
        // return chaparralModelNodes(path)
    } else if (model === 'southern rough') {
        // return roughModelNodes(path)
    } else if (model === 'western aspen') {
        // return aspenModelNodes(path)
    }
    return []
}