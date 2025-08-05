/**
 * @file BehavePlus6 standard key text used to define all node keys and units
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 */
export const surface = 'surface/'
export const primary = surface+'primary/'
export const secondary = surface+'secondary/'

export const dead = 'dead'
export const dfel = dead+'/element'
export const live = 'live'
export const lfel = live+'/element'

export const beta = 'packing ratio'
export const bulk = 'bulk density'
export const dens = 'fiber density'
export const depth = 'depth'
export const diam = 'cylindrical diameter'
export const efol = 'effective fuel/ovendry load'
export const efwl = 'effective fuel/water load'
export const ehn  = 'effective heating number'
export const heat = 'heat of combustion'
export const qig  = 'heat of pre-ignition'
export const load = 'ovendry load'
export const mois = 'moisture content'
export const net  = 'net ovendry load'
export const nwns = 'no-wind no-slope/'
export const owaf = 'open wind speed adjustment factor'
export const ros  = 'fire/spread rate'
export const rxi  = 'fire/reaction intensity'
export const rxv  = 'fire/reaction velocity'
export const sa   = 'surface area'
export const savr = 'surface area to volume ratio'
export const sawf = 'surface area weighting factor'
export const scwf = 'size class weighting factor'
export const size = 'size class'
export const seff = 'effective mineral content'
export const stot = 'total mineral content'
export const vol  = 'volume'
export const xi   = 'propagating fulx ratio'

export const _factor = 'factor'                 // dl exponent, power, coeff, etc
export const _fraction = 'fraction'             // dl portion of whole [0..1]
export const _minr = 'fuel/mineral content'     // fraction [0..1]
export const _ratio = 'ratio'
export const _wf   = 'fuel/weighting factor'    // fraction [0..1]

export const _beta = 'fuel/packing ratio'       // fraction [0..1]
export const _bulk = 'fuel/bulk density'        // lb/ft3
export const _dens = 'fuel/fiber density'       // lb/ft3
export const _depth = 'fuel/depth'              // ft
export const _diam = 'fuel/diameter'            // ft
export const _efwl = 'fuel/water load'          // lb/ft2
export const _ehn  = _wf
export const _heat = 'fuel/heat of combustion'  // btu/lb
export const _hsink = 'fuel/heat sink'          // btu/ft3
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
export const _vol  = 'fuel/volume'              // ft3
