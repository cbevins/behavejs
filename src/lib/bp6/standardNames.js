/**
 * @file Behavejs key hierarchy and lef abbreviations.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 * 
 * Client files should import this file as:
 *  - import {* as K} from '..index.js'
 * and use as
 *  - [K.s1bd1+K.load, 0, K._load, Dag.input, []]
*/

//------------------------------------------------------------------------------
// Surface node name/key hierarchy structure
//------------------------------------------------------------------------------
export const s = 'surface/'
// surface/fire contains the weighted bed/fire values
export const sf = s+'fire/'              // ros, rosa, rosh, rxi, fl, hpua, dir, ...
// primary fuel bed
export const s1 = s+'fuel/1/'                   // covr
    export const s1b = s1+'bed/'                // depth, bulk, beta, qig, phiw, phis, waf, taur, ...
        export const s1bd = s1b+'dead/'         // mext, drxi, etam, etas, mois, ...
            export const s1bde = s1bd+'element/'// placeholder, only used here to reduce redundancy and errors
            export const s1bd1 = s1bde+'1/'     // type, life, load, savr, dens, heat, seff, stot, mois, ...
            export const s1bd2 = s1bde+'2/'
            export const s1bd3 = s1bde+'3/'
            export const s1bd4 = s1bde+'4/'
            export const s1bd5 = s1bde+'5/'
        export const s1bl = s1b+'live/'        // mext, drxi, etam, etas, mois, ...
            export const s1ble = s1bl+'element/'   // placeholder, only used here to reduce redundancy and errors
            export const s1bl1 = s1ble+'1/'    // type, life, load, savr, dens, heat, seff, stot, mois, ...
            export const s1bl2 = s1ble+'2/'
            export const s1bl3 = s1ble+'3/'
            export const s1bl4 = s1ble+'4/'
            export const s1bl5 = s1ble+'5/'
    export const s1f = s1+'fire/'              // source, sink, rxi, ros0, ros, hpua, ...
    export const s1M = s1+'model'              // placeholder only to avoid name conflict with moisture
        export const s1ma = s1M+'aspen'        // input and output parameters
        export const s1mc = s1M+'chaparral'    // age, height, ...
        export const s1mr = s1M+'rough'        // age, height, ...
        export const s1ms = s1M+'standard'     // number, code, label, depth, mext
            export const s1msd = s1ms+'dead'
                export const s1msd1 = s1msd+'1-h'          // load, savr
                export const s1msd10 = s1msd+'10-h'        // load
                export const s1msd100 = s1msd+'100-h'      // load
                export const s1msdh = s1msd+'cured herb'   // load
            export const s1msl = s1ms+'live'
                export const s1mslt = s1msl+'total herb'    // load, savr
                export const s1mslh = s1msl+'uncured herb'  // load
                export const s1msls = s1msl+'stem'          // load, savr
    // following are local fuel1 and fuel1 nodes that are Dag.assign to
    // the overall surface moisture (sm), terrain (st), and wind (sw) nodes
    export const s1t = s1+'terrain/'
        export const s1ts = s1t+'slope/'       // steepness, aspect, upslope
    export const s1w = s1+'wind/'
        export const s1ws = s1w+'speed/'       // midflame, 10-m, 20-ft
        export const s1wd = s1w+'direction/'   // heading, source
    export const s1x = s1+'moisture/'
        export const s1xd = s1x+'dead/'        // 1-h, 10-h, 100-h
        export const s1xl = s1x+'live/'       // herb, stem

// secondary fuel bed
export const s2 = s+'fuel/2/'
    export const s2b = s2+'bed/'               // covr, depth, bulk, beta, qig, phiw, phis, waf, taur, ...
        export const s2bd = s2b+'dead/'        // mext, drxi, etam, etas, mois, ...
            export const s2bde = s2bd+'element/'   // placeholder, only used here to reduce redundancy and errors
            export const s2bd1 = s2bde+'1/'    // type, life, load, savr, dens, heat, seff, stot, mois, ...
            export const s2bd2 = s2bde+'2/'
            export const s2bd3 = s2bde+'3/'
            export const s2bd4 = s2bde+'4/'
            export const s2bd5 = s2bde+'5/'
        export const s2bl = s2b+'live/'        // mext, drxi, etam, etas, mois, ...
            export const s2ble = s2bl+'element/'   // placeholder, only used here to reduce redundancy and errors
            export const s2bl1 = s2ble+'1/'    // type, life, load, savr, dens, heat, seff, stot, mois, ...
            export const s2bl2 = s2ble+'2/'
            export const s2bl3 = s2ble+'3/'
            export const s2bl4 = s2ble+'4/'
            export const s2bl5 = s2ble+'5/'
    export const s2f = s2+'fire/'              // source, sink, rxi, ros0, ros, hpua, ...
    export const s2M = s2+'model'              // placeholder only to avoid name conflict with moisture
        export const s2ma = s2M+'aspen'        // input and output parameters
        export const s2mc = s2M+'chaparral'    // age, height, ...
        export const s2mr = s2M+'rough'        // age, height, ...
        export const s2ms = s2M+'standard'     // number, code, label, depth, mext
            export const s2msd = s2ms+'dead'
                export const s2msd1 = s2msd+'1-h'          // load, savr
                export const s2msd10 = s2msd+'10-h'        // load
                export const s2msd100 = s2msd+'100-h'      // load
                export const s2msdh = s2msd+'cured herb'   // load
            export const s2msl = s2ms+'live'
                export const s2mslt = s2msl+'total herb'    // load, savr
                export const s2mslh = s2msl+'uncured herb'  // load
                export const s2msls = s2msl+'stem'          // load, savr
    // following are local fuel1 and fuel2 nodes that are Dag.assign to
    // the overall surface moisture (sm), terrain (st), and wind (sw) nodes
    export const s2t = s2+'terrain/'
        export const s2ts = s2t+'slope/'       // steepness, aspect, upslope
    export const s2w = s2+'wind/'
        export const s2ws = s2w+'speed/'       // midflame, 10-m, 20-ft
        export const s2wd = s2w+'direction/'   // heading, source
    export const s2x = s2+'moisture/'
        export const s2xd = s2x+'dead/'        // 1-h, 10-h, 100-h
        export const s2xl = s2x+'live/'       // herb, stem

// the following are overall surface mooisture (sm), terrain (st), and wind (sm) names
// that are referenced from within the local fuel1 terrain (s1t), wind (s1w), and moisture (swx) nodes
export const sm = s+'moisture/'               // currently provides source of fuel1 and fuel2 moistures
    export const smd = sm+'dead/'              // 1-h, 10-h, 100-h
    export const sml = sm+'live/'              // herb, stem
export const st = s+'terrain/'                 // currently provides source of fuel1 and fuel2 terrain
    export const sts = st+'slope/'             // steepness, aspect, upslope
export const sw = s+'wind/'                    // currently provides source of fuel1 and fuel2 wind
    export const sws = sw+'speed/'             // midflame, 10-m, 20-ft
    export const swd = sw+'direction/'         // heading, source

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
