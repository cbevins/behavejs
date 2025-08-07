
//------------------------------------------------------------------------------
// Surface node name/key map of abbrev - name
//------------------------------------------------------------------------------

// Defines the entire surface module naming hierarchy
export const standardNamesMap = new Map([
    ['s1', s+'fuel/1,/'],
    ['s1b', s1+'bed/'],               // covr, depth, bulk, beta, qig, phiw, phis, waf, taur, ...
        ['s1bd', s1b+'dead/'],        // mext, drxi, etam, etas, mois, ...
            ['s1bde', s1bd+'element/'],   // placeholder, only used here to reduce redundancy and errors
            ['s1bd1', s1bde+'1/'],    // type, life, load, savr, dens, heat, seff, stot, mois, ...
            ['s1bd2', s1bde+'2/'],
            ['s1bd3', s1bde+'3/'],
            ['s1bd4', s1bde+'4/'],
            ['s1bd5', s1bde+'5/'],
        ['s1bl', s1b+'live/'],        // mext, drxi, etam, etas, mois, ...
            ['s1ble', s1bl+'element/'],   // placeholder, only used here to reduce redundancy and errors
            ['s1bl1', s1ble+'1/'],    // type, life, load, savr, dens, heat, seff, stot, mois, ...
            ['s1bl2', s1ble+'2/'],
            ['s1bl3', s1ble+'3/'],
            ['s1bl4', s1ble+'4/'],
            ['s1bl5', s1ble+'5/'],
    ['s1f', s1+'fire/'],              // source, sink, rxi, ros0, ros, hpua, ...
    ['s1m', s1+'model'],
        ['s1ma', s1m+'aspen'],        // input and output parameters
        ['s1mc', s1m+'chaparral'],    // age, height, ...
        ['s1mr', s1m+'rough'],        // age, height, ...
        ['s1ms', s1m+'standard'],     // number, code, label, depth, mext
            ['s1msd', s1ms+'dead'],
                ['s1msd1', s1msd+'1-h'],          // load, savr
                ['s1msd10', s1msd+'10-h'],        // load
                ['s1msd100', s1msd+'100-h'],      // load
                ['s1msdh', s1msd+'cured herb'],   // load
            ['s1msl', s1ms+'live'],
                ['s1mslt', s1msl+'total herb'],    // load, savr
                ['s1mslh', s1msl+'uncured herb']  // load
                ['s1msls', s1msl+'stem'],          // load, savr
    // following are local fuel1 and fuel1 nodes that are Dag.assign to
    // the overall surface moisture (sm), terrain (st), and wind (sw) nodes
    ['s1t', s1+'terrain/'],
        ['s1ts', s1t+'slope/'],       // steepness, aspect, upslope
    ['s1w', s1+'wind/'],
        ['s1ws', s1w+'speed/'],       // midflame, 10-m, 20-ft
        ['s1wd', s1w+'direction/'],   // heading, source
    ['s1x', s1+'moisture/'],
        ['s1xd', s1x+'dead/'],        // 1-h, 10-h, 100-h
        ['s1xl', s1x+'live/'],       // herb, stem

// secondary fuel bed
['s2', s+'fuel/2'],
    ['s2b', s2+'bed/'],               // covr, depth, bulk, beta, qig, phiw, phis, waf, taur, ...
        ['s2bd', s2b+'dead/'],        // mext, drxi, etam, etas, mois, ...
            ['s2bde', s2bd+'element/'],   // placeholder, only used here to reduce redundancy and errors
            ['s2bd1', s2bde+'1/'],    // type, life, load, savr, dens, heat, seff, stot, mois, ...
            ['s2bd2', s2bde+'2/'],
            ['s2bd3', s2bde+'3/'],
            ['s2bd4', s2bde+'4/'],
            ['s2bd5', s2bde+'5/'],
        ['s2bl', s2b+'live/'],        // mext, drxi, etam, etas, mois, ...
            ['s2ble', s2bl+'element/'],   // placeholder, only used here to reduce redundancy and errors
            ['s2bl1', s2ble+'1/'],    // type, life, load, savr, dens, heat, seff, stot, mois, ...
            ['s2bl2', s2ble+'2/'],
            ['s2bl3', s2ble+'3/'],
            ['s2bl4', s2ble+'4/'],
            ['s2bl5', s2ble+'5/'],
    ['s2f', s2+'fire/'],              // source, sink, rxi, ros0, ros, hpua, ...
    ['s2m', s2+'model'],
        ['s2ma', s2m+'aspen'],        // input and output parameters
        ['s2mc', s2m+'chaparral'],    // age, height, ...
        ['s2mr', s2m+'rough'],        // age, height, ...
        ['s2ms', s2m+'standard'],     // number, code, label, depth, mext
            ['s2msd', s2ms+'dead'],
                ['s2msd1', s2msd+'1-h'],          // load, savr
                ['s2msd10', s2msd+'10-h'],        // load
                ['s2msd100', s2msd+'100-h'],      // load
                ['s2msdh', s2msd+'cured herb'],   // load
            ['s2msl', s2ms+'live'],
                ['s2mslt', s2msl+'total herb'],    // load, savr
                ['s2mslh', s2msl+'uncured herb'],  // load
                ['s2msls', s2msl+'stem'],          // load, savr
    // following are local fuel1 and fuel2 nodes that are Dag.assign to
    // the overall surface moisture (sm), terrain (st), and wind (sw) nodes
    ['s2t', s2+'terrain/'],
        ['s2ts', s2t+'slope/'],       // steepness, aspect, upslope
    ['s2w', s2+'wind/'],
        ['s2ws', s2w+'speed/'],       // midflame, 10-m, 20-ft
        ['s2wd', s2w+'direction/'],   // heading, source
    ['s2x', s2+'moisture/'],
        ['s2xd', s2x+'dead/'],        // 1-h, 10-h, 100-h
        ['s2xl', s2x+'live/'],       // herb, stem

// the following are overall surface mooisture (sm), terrain (st), and wind (sm) names
// that are referenced from within the local fuel1 terrain (s1t), wind (s1w), and moisture (swx) nodes
['sm', s+'moisture/'],               // currently provides source of fuel1 and fuel2 moistures
    ['smd', sm+'dead/'],              // 1-h, 10-h, 100-h
    ['sml', sm+'live/'],              // herb, stem
['st', s+'terrain/'],                 // currently provides source of fuel1 and fuel2 terrain
    ['sts', st+'slope/'],             // steepness, aspect, upslope
['sw', s+'wind/'],                    // currently provides source of fuel1 and fuel2 wind
    ['sws', sw+'speed/'],             // midflame, 10-m, 20-ft
    ['swd', sw+'direction/'],         // heading, source

    // Node keys
    ['beta',  ['packing ratio']],
    ['bulk',  ['bulk density']],
    ['covr',  ['coverage']],
    ['dens',  ['fiber density']],
    ['depth',  ['depth']],
    ['efol',  ['effective fuel/ovendry load']],
    ['efmc',  ['effective fuel/moisture content']],
    ['efwl',  ['effective fuel/water load']],
    ['ehn',   ['effective heating number']],
    ['etam',  ['moisture damping coefficient']],
    ['etas',  ['mineral damping coefficient']],
    ['heat',  ['heat of combustion']],
    ['hpua',  ['heat per unit area']],
    ['qig',   ['heat of pre-ignition']],
    ['load',  ['ovendry load']],
    ['mext',  ['extinction moisture content']],
    ['mextf', ['extinction moisture content/factor']],
    ['mois',  ['moisture content']],
    ['net',   ['net ovendry load']],
    ['nwns',  ['no-wind no-slope/']],
    ['owaf',  ['open wind speed adjustment factor']],
    ['ros',   ['spread rate']],
    ['rxi',   ['reaction intensity']],
    ['rxv',   ['reaction velocity']],
    ['rxvo',  [rxv+'/optimum']],
    ['sa',    ['surface area']],
    ['savr',  ['surface area to volume ratio']],
    ['sawf',  ['surface area weighting factor']],
    ['scwf',  ['size class weighting factor']],
    ['size',  ['size class']],
    ['scar',  ['size class weighting factor array']],
    ['seff',  ['effective mineral content']],
    ['stot',  ['total mineral content']],
    ['taur',  ['residence time']],
    ['vol',   ['volume']],
    ['xi',    ['propagating fulx ratio']],

    ['_fraction',  ['fraction']],            // dl portion of whole [0..1]]],
    ['_minr',  ['fuel/mineral content']],     // fraction [0..1]]],
    ['_ratio',  ['ratio']],
    ['_wf',    ['fuel/weighting factor']],    // fraction [0..1]
    ['_beta',  ['fuel/packing ratio']],       // fraction [0..1]
    ['_bulk',  ['fuel/bulk density']],        // lb/ft3
    ['_dens',  ['fuel/fiber density']],       // lb/ft3
    ['_depth',  ['fuel/depth']],              // ft
    ['_efmc',  ['fuel/moisture content']],
    ['_efwl',  ['fuel/water load']],          // lb/ft2
    ['_ehn',   [_wf]],
    ['_heat',  ['fuel/heat of combustion']],  // btu/lb
    ['_hsink',  ['fuel/heat sink']],          // btu/ft3
    ['_hpua',  ['fire/heat per unit area']],  // btu/ft3
    ['_load',  ['fuel/ovendry load']],        // lb/ft2
    ['_efol',  [_load]],
    ['_net',   [_load]],
    ['_mois',  ['fuel/moisture content']],    // ratio
    ['_owaf',  ['wind/factor']],              // ratio
    ['_qig',   ['fuel/heat of pre-ignition']],// btu/lb
    ['_ros',   ['fire/spread rate']],         // ft/min
    ['_rxi',   ['fire/reaction intensity']],  // btu/ft2-min
    ['_rxv',   ['fire/reaction velocity']],   // 1/min
    ['_sa',    ['fuel/surface area']],        // ft2
    ['_savr',  ['fuel/surface area to volume ratio']],    // ft2/ft3
    ['_sawf',  [_wf]],
    ['_scwf',  [_wf]],
    ['_seff',  [_minr]],
    ['_size',  ['fuel/size class']],          // [0, 1, 2, 3, 4, 5]]],
    ['_stot',  [_minr]],
    ['_taur',  ['fire/residence time']],      // min
    ['_vol',   ['fuel/volume']],              // ft3
    ['_wnds',  ['wind/velocity']],            // ft/min
])
