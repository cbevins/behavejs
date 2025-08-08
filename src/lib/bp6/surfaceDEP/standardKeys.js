/**
 * @file Surface module standard key text used to consistently define
 * node keys and units across more than 1 node definitions file.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 */
export const surface = 'surface/'
export const primary = surface+'primary/'
export const secondary = surface+'secondary/'

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
