const baseUnits = [
  'm',  // distance, length (m)
  'kg', // mass (kg)
  's',  // time (s)
  'oC', // thermodynamic temperature (oC)
  'J',  // energy (J)
  'A',  // electric current (A)
  'c',  // luminous intensity (c)
  'mole', // amount of substance (mole)
  'dl',  // ratio, dimensionless
]
export const yukonUnits = [
    {type: 'distance', base: 'm', label: 'distance, length', units: [
            ['m', 1, 'm'],
            ['dm', 0.1, 'm'],
            ['cm', 0.01, 'm'],
            ['mm', 0.001, 'm'],
            ['km', 1000, 'm'],
            ['ft', 0.3048, 'm'] ,     // by definition in 1959
            ['in', 1/12, 'ft'],
            ['yd', 3, 'ft'],
            ['mi', 5280, 'ft'],
            ['ch', 66, 'ft'],
    ]},
    {type: 'area', base: 'm2', label: 'area', units: [
            ['ac', 66*660, 'ft2'],
            ['ha', 100*100, 'm2'],
    ]},
    // electric current = ampere [A]
    {type: 'current', base: 'A', label: 'electric current', units: [
        ['A', 1, 'A'],
    ]},
    // energy = joule [J] = 1 watt - second
    // From https://lambda.gsfc.nasa.gov/product/websites/AMI/mrao.cam.ac.uk/
    // Put simply, one British Thermal Unit [Btu] is the amount of heat required to raise the temperature of 1 pound [ lb.] of water 1 degree Fahrenheit.
    // The Fifth International Conference on the Properties of Steam (London, July 1956) defined the International Table calorie as 4.1868 joule.
    // Therefore the exact conversion factor for the International Table British thermal unit (Btu) is 1.05505585262 kJ.
    // The thermochemical Btu is based on the thermochemical calorie which equals 4.184 kJ exactly.
    {type: 'energy', base: 'J', label: 'energy', units: [
            ['J', 1, 'J'],
            ['btu',     1055.87, 'J'],  // applied
            ['btu(BP)', 1055.87, 'J'], // used by BehavePlus
            ['btu(X)',  1055.87, 'J'], // mean BTU
            ['btu(39)', 1059.67, 'J'], // BTU at 39 oF
            ['btu(59)', 1054.80, 'J'], // BTU at 59 oF
            ['btu(60)', 1054.68, 'J'], // BTU at 60 oF
            ['btu(tc)', 1054.35, 'J'], // thermochemical BTU
            // from unitconverters.net
            ['btu(it)', 1055.05585262, 'J'], // also https://lambda.gsfc.nasa.gov/product/websites/AMI/mrao.cam.ac.uk/
            ['btu(th)', 1054.3499999744, 'J'],

    ]},
    // area density, surface density (load) = mass/area
    {type: 'mass', base: 'kg', label: 'mass', units: [
            ['kg', 1, 'kg'],
            ['gm', 0.0001, 'kg'],
            ['T', 1000, 'kg'],
            ['lb', 0.45359237, 'kg'],
            ['t', 2000, 'lb'],
            ['oz', 1/16, 'lb'],
    ]},
    
    // acceleration = distance/time2 = m/s2
    // density = mass/volume = kg/m3
    // force = energy/distance = newton [N] = 1 J/m
    // fuel efficiency - mass = energy/mass = J / kg
    // fuel efficiency - volume = energy/volume = J/m3

    // heat of combustion, heat density = energy/area = J/m2
    
    // heat flux density = watt/area = J/m2-s = W/m2
    // pressure = force/area = pascal [Pa] = 1 newton/square meter
    // specific heat capacity = joule/kilogram/K [J/(kg*K)]

    // power = energy/time = watt [W] = 1 J/s = 1 volt ampere [V*A]
    {type: 'power', base: 'W', label: 'power', units: [
        ['W', 1, 'J/s'],
        ['kW', 1000, 'W'],
    ]},
    {type: 'ratio', base: '1', label: 'ratio, dimensionless', units: [
        ['1', 1, '1'],
        ['%', 100, '1'],
    ]},
    {type: 'temperature', base: 'C', label: 'thermodynamic temperature', units: [
        ['oC', 1, 'oC'],
        ['oK', 1, 'oC'],  // same ratio, 0 degrees C is 273.15 K
        ['oF', 5/9, 'oC']
    ]},
    {type: 'time', base: 's', label: 'time', units: [
        ['s', 1, 's'],
        ['min', 60, 's'],
        ['hr', 60, 'min'],
        ['day', 24, 'hr'],
    ]},
]
