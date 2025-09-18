export class ConfigsCatalog {
    // inputs: midflame wind speed, wind from north, upslope dir, steepness ratio,
    // all 5 moistures and a fuel catalog key
    static classic = [
        ['canopy/height/inputs', [['height-base','ratio-height','height-length','ratio-base','ratio-length','length-base']][0]],
        ['deadFuelMoistureInputs',      'particle'],
        ['effectiveWindSpeedLimit',     'applied'],
        ['liveFuelCuringInputs',        'estimated'],
        ['liveFuelMoistureInputs',      'particle'],
        ['midflameInputs',              'observed'],
        ['primaryStandardModelInputs',  'catalog'],
        ['primarySurfaceFuelDomain',    'standard'],
        ['slopeDirectionInputs',        'up-slope'],
        ['moisture/dead/inputs', [['particle'],['category']][0]],
        ['windDirectionInputs',         'source from north'],
    ]

    static renamed = [
        ['fuel/curing fraction/parameter', [['input', 'estimated']][0]],
        ['moisture/live/inputs', [['particle'],['category']][0]],
        ['wind/direction/input', [['source from north', 'heading from up-slope', 'up-slope']][0]],
        ['wind/speed/input', [['at 20-ft', 'at 10-m']][0]],
    ]
}