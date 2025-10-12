export const fireEffWindLimit = {
    key: 'effwindLimit',
    applied: 'applied',
    notApplied: 'not applied',
    options: ['applied', 'notApplied'],
    value: 'applied'
}

export const fireWeighting = {
    key: 'fireWeighting',
    primary: 'primary',
    harmonic: 'harmonic',
    arithmetic: 'arithmetic',
    options: ['primary', 'harmonic', 'arithmetic'],
    value: 'primary'
}

export const fuelCuring = {
    key: 'fuelCuring',
    estimated: 'estimated',
    input: 'input',
    options: ['estimated', 'input'],
    value: 'estimated'
}

export const fuelDomain = {
    key: 'fuelDomain',
    standard: 'standard',
    chaparral: 'chaparral',
    palmetto: 'palmetto',
    aspen: 'aspen',
    custom: 'custom',
    options: ['standard', 'chaparral', 'palmetto', 'aspen', 'custom'],
    value: 'standard'
}
export const fuelDomainCrown = {...fuelDomain, key: 'fuelDomainCrown',
    options: [fuelDomain.standard], value: fuelDomain.standard}
export const fuelDomainPrimary = {...fuelDomain, key: 'fuelDomainPrimary'}
export const fuelDomainSecondary = {...fuelDomain, key: 'fuelDomainSecondary'}

export const fuelMoistureDead = {
    key: 'fuelMoistureDead',
    category: 'category',
    element: 'element',
    options: ['element', 'category'],
    value: 'element'}
export const fuelMoistureLive = {...fuelMoistureDead, key: 'fuelMoistureLive'}