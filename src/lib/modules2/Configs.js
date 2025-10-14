function makeConfig(key, prompt, prompts=[]) {
    const cfg = {key, prompt, prompts, options: []}
    for(let [prop, text] of prompts) {
        cfg[prop] = prop
        cfg.options.push(prop)
    }
    cfg.value = prompts[0][0]
    return cfg
}

export const fireEffWindLimit = makeConfig('effwindLimit',
    'effective wind speed limit is', [
        ['applied', 'applied'],
        ['notApplied', 'not applied']])

export const fireWeighting = makeConfig('effwindLimit',
    'surface fire results are', [
        ['primary', 'for the primary fuel only'],
        ['harmonic', 'harmonic mean of primary and secondary fuels'],
        ['arithmetic', 'arithmetic mean of primary and secondary fuels']])

export const fuelCuring = makeConfig('fuelCuring',
    'live fuel curing fraction is', [
        ['input', 'an input parameter'],
        ['estimated', 'estimated from live herb moisture content']])

export const fuelDomain = makeConfig('fuelDomain',
        ' fuel parameters are provided by the', [
            ['standard', 'Albini (1976) and Scott and Burgan (2005) "standard" fire behavior fuel models'],
            ['chaparral', 'Rothermel and Philpot (1973) chaparral fuel model'],
            ['palmetto', 'Hough and Albini (1978) palmetto-gallberry fuel model'],
            ['aspen', 'Brown and Simmerman (1986) western aspen fuel model']])

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

export const slopeDirection = makeConfig('slopeDirection',
    'slope direction is specified as', [
        ['upslope', 'up-slope direction'],
        ['downslope', 'down-slope direction (aspect)']])

export const slopeSteepness = makeConfig('slopeSteepness',
    'slope steepness is specified as', [
        ['ratio', 'ratio of vertical rise to horizontal reach'],
        ['degrees', 'degrees above horizontal'],
        ['map', 'estimated from map parameters']])

export const windDirection = makeConfig('windDirection',
    'the wind direction is specified as', [
        ['originWrtNo', 'source degrees from north'],
        ['headingWrtUp', 'heading degrees from up-slope'],
        ['upslope', 'always blows up-slope']])

export const windSpeed = makeConfig('windSpeed',
    'the open wind speed is measured at', [
        ['at20ft', '20-ft height'],
        ['at10m', '10-m height]']])

