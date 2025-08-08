/**
 * @file Behavejs key hierarchy and leaf abbreviations.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
*/

//------------------------------------------------------------------------------
// Surface node name/key hierarchy structure
// The variables that allow the client to conveniently specify just the lowest
// level in the naming hierarchy
//------------------------------------------------------------------------------
export const surf = 'surface/'
// surface/fire contains the weighted bed/fire values
export const surffire = surf+'fire/'              // ros, rosa, rosh, rxi, fl, hpua, dir, ...
// primary and secondary fuel prefixes
export const s1 = surf+'fuel/1/'                // leafs: covr
export const s2 = surf+'fuel/2/'                // leafs: covr
// sub-keys that, when used by the client, must be prefixed with s1 or s2
    export const bed = 'bed/'                   // leafs: depth, bulk, qig, waf, load, beta, bopt, brat, xi, rxve, rxvm, rxvo, sa, savr, savr15
        export const dead = bed+'dead/'         // mext, efwl, efmc, drxi, etam, etas, mois, ... sa, sawf, etam, etas, heat, load, efol, mois, vol, qig, rxi. drxi, savr, seff, scar, net
            export const de = dead+'element/'   // placeholder, only used here to reduce redundancy and errors
            export const dead1 = de+'1/'        // type, load, savr, heat, dens, seff, stot, mois, life ... ehn, efol, qig, net, size, scwf, sa, sawf, vol, efwl, diam, leng
            export const dead2 = de+'2/'
            export const dead3 = de+'3/'
            export const dead4 = de+'4/'
            export const dead5 = de+'5/'
        export const live = bed+'live/'         // mext, mextf, efwl, efmc, drxi, etam, etas, mois, ... sa, sawf, etam, etas, heat, load, efol, mois, vol, qig, rxi. drxi, savr, seff, scar, net
            export const le = live+'element/'   // placeholder, only used here to reduce redundancy and errors
            export const live1 = le+'1/'        // type, life, load, savr, dens, heat, seff, stot, mois, ...
            export const live2 = le+'2/'
            export const live3 = le+'3/'
            export const live4 = le+'4/'
            export const live5 = le+'5/'
    export const fuelfire = 'fire/'             // source, sink, rxi, ros0, ros, hpua, ...
    export const M = 'model/'                   // placeholder only to avoid name conflict with surface/moisture/ 'm'
        export const aspen = M+'aspen/'         // input and output parameters
        export const chaparral = M+'chaparral/' // age, height, ...
        export const rough = M+'rough/'         // age, height, ...
        export const fm = M+'standard/'         // fmkey, fmnumber, fmcode, fmlabel, fmcured, depth, mext
            export const fmdead = fm+'dead/'
                export const fmh1 = fmdead+'1-h/'          // load, savr
                export const fmh10 = fmdead+'10-h/'        // load
                export const fmh100 = fmdead+'100-h/'      // load
                export const fmdeadherb = fmdead+'cured herb/'// load
            export const fmlive = fm+'live/'
                export const fmherbtot = fmlive+'total herb/' // load, savr
                export const fmliveherb = fmlive+'herb/'// load
                export const fmlivestem = fmlive+'stem/'        // load, savr
    // following are local fuel/1/ and fuel/2/ nodes that are Dag.assign to
    // the overall surface moisture (sm), terrain (st), and wind (sw) nodes
    export const fuelmois = 'moisture/'
        export const fuelmoisdead = fuelmois+'dead/' // 1-h, 10-h, 100-h
        export const fuelmoislive = fuelmois+'live/' // herb, stem
    export const fuelterr = 'terrain/'
        export const fuelslope = fuelterr+'slope/'  // steepness, aspect, upslope
    export const fuelwind = 'wind/'
        export const fuelwindspeed = fuelwind+'speed/'  // midflame, 10-m, 20-ft
        export const fuelwinddir = fuelwind+'direction/'// heading, source

// the following are overall surface mooisture (sm), terrain (st), and wind (sm) names
// that are referenced from within the local fuel1 terrain (s1t), wind (s1w), and moisture (swx) nodes
export const surfmois = surf+'moisture/'            // currently provides source of fuel1 and fuel2 moistures
    export const surfmoisdead = surfmois+'dead/'    // 1-h, 10-h, 100-h
    export const surfmoislive = surfmois+'live/'    // herb, stem
export const surfterr = surf+'terrain/'             // currently provides source of fuel1 and fuel2 terrain
    export const surfslope = surfterr+'slope/'      // steepness, aspect, upslope
export const surfwind = surf+'wind/'                // currently provides source of fuel1 and fuel2 wind
    export const surfwindspeed = surfwind+'speed/'  // midflame, 10-m, 20-ft
    export const surfwinddir = surfwind+'direction/'// heading, source

export const h1 = '1-h'
export const h10 = '10-h'
export const h100 = '100-h'
export const herb = 'herb'
export const stem = 'stem'

export const fmkey = 'key'
export const fmnumb = 'number'
export const fmcode = 'code'
export const fmlabel = 'label'
export const fmcured = 'cured herb fraction'

//------------------------------------------------------------------------------
// Surface leaf node names/keys
//------------------------------------------------------------------------------

// Node keys
export const beta = 'packing ratio'
export const bulk = 'bulk density'
export const covr = 'coverage'
export const dens = 'fiber density'
export const depth = 'depth'
export const efol = 'effective fuel/ovendry load'
export const efmc = 'effective fuel/moisture content'
export const efwl = 'effective fuel/water load'
export const ehn  = 'effective heating number'
export const etam = 'moisture damping coefficient'
export const etas = 'mineral damping coefficient'
export const heat = 'heat of combustion'
export const hpua = 'heat per unit area'
export const qig  = 'heat of pre-ignition'
export const load = 'ovendry load'
export const mext = 'extinction moisture content'
export const mextf= 'extinction moisture content/factor'
export const mois = 'moisture content'
export const net  = 'net ovendry load'
export const nwns = 'no-wind no-slope/'
export const owaf = 'open wind speed adjustment factor'
export const ros  = 'spread rate'
export const rxi  = 'reaction intensity'
export const rxv  = 'reaction velocity'
export const rxvo  = rxv+'/optimum'
export const sa   = 'surface area'
export const savr = 'surface area to volume ratio'
export const sawf = 'surface area weighting factor'
export const scwf = 'size class weighting factor'
export const size = 'size class'
export const scar = 'size class weighting factor array'
export const seff = 'effective mineral content'
export const stot = 'total mineral content'
export const taur = 'residence time'
export const vol  = 'volume'
export const xi   = 'propagating fulx ratio'

// more fuelBedNodes
export const bopt = beta+'/optimum'
export const brat = beta+'/ratio'
export const dfrxi = 'dry fuel reaction intensity'
export const hsink = 'heat sink'
export const hsrc = 'heat source'
export const ros0 = 'no-wind no-slope ' + ros
export const rxve  = rxv + '/exponent'
export const rxvm  = rxv + '/maximum'
export const savr15 = savr + '/1.5'
export const slpk = 'slope/K'
export const slpr = 'slope rise to reach ratio'
export const wndb = 'wind/B'
export const wndc = 'wind/C'
export const wnde = 'wind/E'
export const wndk = 'wind/K'
export const wndi = 'wind/I'

export const diam = 'cylindrical diameter'
export const leng = 'cylindrical length'
export const type = 'type'
export const life = 'life'

// Units of measure keys
export const _factor = 'factor'                 // dl exponent, power, coeff, etc
export const _fraction = 'fraction'             // dl portion of whole [0..1]
export const _minr = 'fuel/mineral content'     // fraction [0..1]
export const _ratio = 'ratio'
export const _wf   = 'fuel/weighting factor'    // fraction [0..1]

export const _beta = 'fuel/packing ratio'       // fraction [0..1]
export const _bulk = 'fuel/bulk density'        // lb/ft3
export const _dens = 'fuel/fiber density'       // lb/ft3
export const _depth = 'fuel/depth'              // ft
export const _efmc = 'fuel/moisture content'
export const _efwl = 'fuel/water load'          // lb/ft2
export const _ehn  = _wf
export const _heat = 'fuel/heat of combustion'  // btu/lb
export const _hsink = 'fuel/heat sink'          // btu/ft3
export const _hpua = 'fire/heat per unit area'  // btu/ft3
export const _load = 'fuel/ovendry load'        // lb/ft2
export const _efol = _load
export const _net  = _load
export const _mois = 'fuel/moisture content'    // ratio
export const _owaf = 'wind/factor'              // ratio
export const _qig  = 'fuel/heat of pre-ignition'// btu/lb
export const _ros  = 'fire/spread rate'         // ft/min
export const _rxi  = 'fire/reaction intensity'  // btu/ft2-min
export const _rxv  = 'fire/reaction velocity'   // 1/min
export const _sa   = 'fuel/surface area'        // ft2
export const _savr = 'fuel/surface area to volume ratio'    // ft2/ft3
export const _sawf = _wf
export const _scwf = _wf
export const _seff = _minr
export const _size = 'fuel/size class'          // [0, 1, 2, 3, 4, 5]
export const _stot = _minr
export const _taur = 'fire/residence time'      // min
export const _vol  = 'fuel/volume'              // ft3
export const _wnds = 'wind/velocity'            // ft/min

export const _diam = 'fuel/diameter'            // ft
export const _leng = 'fuel/length'             // ft
export const _type = 'fuel/type'
export const _life = 'fuel/life'
export const _fmkey = 'fuel/model/key'
export const _fmnumb = 'fuel/model/number'
export const _fmcode = 'fuel/model/code'
export const _fmlabel = 'fuel/model/label'
