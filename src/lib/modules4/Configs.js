function makeConfig(key, prompt, prompts=[]) {
    const cfg = {key, prompt, prompts, options: []}
    for(let [prop, text] of prompts) {
        cfg[prop] = prop
        cfg.options.push(prop)
    }
    cfg.value = prompts[0][0]
    return cfg
}

export const canopyHeight = makeConfig('canopyHeight',
    'canopy height parameters are entered for', [
        ['baseHeight', 'total and crown base heights'],
        ['ratioHeight', 'total height and crown ratio'],
        ['lengthHeight', 'total height and crown length'],
        ['ratioBase', 'crown base height and crown ratio'],
        ['ratioLength', 'crown length and crown ratio'],
        ['lengthBase', 'crown length and base height']])

export const fireEffWindLimit = makeConfig('effwindLimit',
    'effective wind speed limit is', [
        ['applied', 'applied'],
        ['notApplied', 'not applied']])

export const fireVectors = makeConfig('fireVectors',
    'ellipse fire vector angles are degrees clockwise from', [
        ['fromNorth', 'North'],
        ['fromHead', 'fire heading direction'],
        ['fromUpslope', 'from upslope direction']])

export const firelineIntensity = makeConfig('firelineIntensity',
    'when required as an input, fireline intensity is input as', [
        ['fli', 'fireline intensity'],
        ['flame', 'flame length']])

export const fuelCuring = makeConfig('fuelCuring',
    'live fuel curing fraction is', [
        ['estimated', 'estimated from live herb moisture content'],
        ['input', 'an input parameter']])

export const fuelDomain = makeConfig('fuelDomain',
    ' fuel parameters are provided by entering', [
        ['catalog', 'a key to the catalog of Albini (1976) and Scott & Burgan (2005) "standard" fire behavior fuel models'],
        ['custom', 'all parameters for a "custom" standard fuel model'],
        ['chaparral', 'parameters for the Rothermel and Philpot (1973) chaparral fuel model'],
        ['palmetto', 'parameters for the Hough and Albini (1978) palmetto-gallberry fuel model'],
        ['aspen', 'parameters for the Brown and Simmerman (1986) western aspen fuel model']])

export const fuelDomainCrown = {...fuelDomain, key: 'fuelDomainCrown',
    options: [fuelDomain.standard], value: fuelDomain.standard}

export const fuelDomainPrimary = {...fuelDomain, key: 'fuelDomainPrimary',
    prompt: 'primary fuel parameters are provided by the'}

export const fuelDomainSecondary = {...fuelDomain, key: 'fuelDomainSecondary',
    prompt: 'secondary fuel parameters are provided by the'}

export const fuelMoistureDead = makeConfig('fuelMoistureDead',
    'dead fuel moisture content is entered', [
        ['element', 'individually for the herb and stem fuels'],
        ['category', 'collectively for the dead category as a whole']])

export const fuelMoistureLive = makeConfig('fuelMoistureLive',
    'live fuel moisture content is entered', [
        ['element', 'individually for the 1-h, 10-h, and 100-h time-lag fuels'],
        ['category', 'collectively for the dead category as a whole']])

export const midflameWindSpeed = makeConfig('midflameWindSpeed',
    'midflame wind speed is', [
        ['input', 'entered as an input parameter'],
        ['wsrf', 'calculated from an input wind speed reduction factor applied to the 20-ft wind speed'],
        ['fuelbed', 'calculated from the fuel bed no-canopy wind speed reduction factor applied to the 20-ft wind speed'],
        ['canopy', 'calculated from the canopy wind speed reduction factor applied to the 20-ft wind speed']])

// Replaced by terrainAspect
export const slopeDirection = makeConfig('slopeDirection',
    'slope direction is specified as', [
        ['aspect', 'down-slope direction (aspect)'],
        ['upslope', 'up-slope direction']])
// Replaced by terrainSlope
export const slopeSteepness = makeConfig('slopeSteepness',
    'slope steepness is specified as', [
        ['ratio', 'ratio of vertical rise to horizontal reach'],
        ['degrees', 'degrees above horizontal'],
        ['map', 'estimated from map parameters']])

export const surfaceFire = makeConfig('surfaceFire',
    'surface fire behavior is calculated for', [
        ['onefuel', 'a single fuel model only'],
        ['harmonic', 'two fuel models with a harmonic mean spread rate'],
        ['arithmetic', 'two fuel models with an arithmetic mean spread rate']])

// Replaces slope
export const terrainAspect = makeConfig('terrainAspect',
    'terrain aspect is specified as the ', [
        ['aspect', 'down-slope direction from north'],
        ['upslope', 'up-slope direction from north']])

export const terrainSlope = makeConfig('terrainSlope',
    'terrain slope steepness is specified as', [
        ['ratio', 'ratio of vertical rise to horizontal reach'],
        ['degrees', 'degrees of incline above horizontal'],
        ['map', 'estimated from map measurements']])

export const windDirection = makeConfig('windDirection',
    'the wind direction is specified as', [
        ['originWrtNo', 'source degrees from north'],
        ['headingWrtUp', 'heading degrees from up-slope'],
        ['upslope', 'always blows up-slope']])

export const windSpeed = makeConfig('windSpeed',
    'the open wind speed is measured at', [
        ['at20ft', '20-ft height'],
        ['at10m', '10-m height]']])

