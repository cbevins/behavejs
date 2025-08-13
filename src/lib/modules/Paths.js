import {K} from './index.js'

export class P {
    // Module names
    static canopy   = 'Canopy/'
    static crown    = 'Crown Fire'
    static curing   = 'Curing/'
    // static fire     = 'Fire/'
    static growth   = 'Growth/'
    static moisture = 'Moisture/'
    static slope    = 'Slope/'
    static surface  = 'Surface/'
    static wind     = 'Wind/'
    static windadj  = 'Wind Speed Adjustment/'
    static windmid  = 'Wind at Midflame/'

    // Surface
    static s1 = P.surface+'primary/'
    static s2 = P.surface+'secondary/'

    static bed1 = P.s1+'Bed/'
    static bed2 = P.s2+'Bed/'
    static fire1 = P.s1+'Fire/'
    static fire2 = P.s2+'Fire/'
    static fuel1 = P.s1+'Model/'
    static fuel2 = P.s2+'Model/'
    static dead1 = P.bed1+'dead/'
    static dead2 = P.bed2+'dead/'
    static live1 = P.bed1+'live/'
    static live1 = P.bed2+'live/'
    static windadj1 = P.bed1+P.windadj
    static windadj2 = P.bed2+P.windadj
    static windmid1 = P.bed1+P.windmid
    static windmid2 = P.bed2+P.windmid
    static fireWtg  = P.s+'Weighted Fire/'

    // Moisture
    static mois1 = P.moisture + 'dead/1-h/'
    static mois10 = P.moisture + 'dead/10-h/'
    static mois100 = P.moisture + 'dead/100-h/'
    static moisherb = P.moisture + 'live/herb/'
    static moisstem = P.moisture + 'live/stem/'
    static moisdead = P.moisture + 'dead/cat'
}

// Names that, when appended to a Path, define a unique node
export class L {
    // Module meta data to append to any module path
    static meta = '_meta/'
    static mmod = L.meta+'module'
    static mcfg = L.meta+'config/'  // followed by a config.value
    static mver = L.meta+'version'
    
    // Canopy Module leafs to append to P.canopy
    static cbulk = 'bulk density'
    static ccov  =  'coverage'
    static cfill = 'crown fill'
    static cheat = K.heat
    static chpua = K.hpua
    static ctht  = 'total height'
    static cbht  = 'base height'
    static clen  = 'crown length'
    static crat  = 'crown ratio'
    static cload = K.load
    static cshelters = 'shelters fuel from wind'
    static cwaf  = 'canopy-induced ' + K.waf

    // Moisture Module leafs to append to P.moisture
    static m1 = 'dead/1-h/' + K.mois
    static m10 = 'dead/10-h/' + K.mois
    static m100 = 'dead/100-h/' + K.mois
    static mherb = 'live/herb/' + K.mois
    static mstem = 'live/stem/' + K.mois
    static mdead = 'dead/category/' + K.mois
    static mlive = 'live/category/' + K.mois

    // Slope Module leafs to append to P.slope
    static sasp = 'direction/aspect (downslope)'
    static sups = 'direction/upslope'
    static srat = 'steepness/ratio'
    static sdeg = 'steepness/degrees'

    // Standard fuel model Module leaf nodes
    static fmalias    = 'alias'
    static fmkey      = 'key'
    static fmnumb     = 'number'
    static fmcode     = 'code'
    static fmlabel    = 'label'
    static fmcured    = 'cured herb fraction'
    static fmdepth    = K.depth
    static fmmext     = K.mext
    static fmheatdead = 'dead/'+K.heat
    static fmheatlive = 'live/'+K.heat
    static fmload1    = 'dead/1-h/'+K.load
    static fmload10   = 'dead/10-h/'+K.load
    static fmload100  = 'dead/100-h/'+K.load
    static fmloadherb = 'live/herb/'+K.load
    static fmloadstem = 'live/stem/'+K.load
    static fmsavr1    = 'dead/1-h/'+K.savr
    static fmsavrherb = 'live/herb/'+K.savr
    static fmsavrstem = 'live/stem/'+K.savr

    // Surface Element Module leaf nodes
    static diam = 'cylindrical diameter'
    static dead = 'dead'
    static dens = 'fiber density'
    static depth = 'depth'
    static efol = 'effective fuel/ovendry load'
    static efmc = 'effective fuel/moisture content'
    static efwl = 'effective fuel/water load'
    static ehn  = 'effective heating number'
    static heat = 'heat of combustion'
    static leng = 'cylindrical length'
    static life = 'life category'
    static live = 'live'
    static load = 'ovendry load'
    static mext = 'extinction moisture content'
    static mois = 'moisture content'
    static net  = 'net ovendry load'
    static sa   = 'surface area'
    static savr = 'surface area to volume ratio'
    static sawf = 'surface area weighting factor'
    static scwf = 'size class weighting factor'
    static scar = 'size class weighting factor array'
    static seff = 'effective mineral content'
    static size = 'size class'
    static stot = 'total mineral content'
    static type = 'type'
    static vol  = 'volume'

    // Surface Bed Module leafs
    static bulk = 'bulk density'
    static cured = 'cured fraction'
    static beta = 'packing ratio'
    static bopt = K.beta+'/optimum'
    static bratio = K.beta+'/ratio'
    static dfrxi = 'dry fuel reaction intensity'
    static etam = 'moisture damping coefficient'
    static etas = 'mineral damping coefficient'
    static hpua = 'heat per unit area'
    static hsink = 'heat sink'
    static hsrc = 'heat source'
    static mextf = L.mext + '/factor'
    static owaf = 'open-canopy wind speed adjustment factor'
    static phie = 'spread rate coefficient/effective wind'
    static phis = 'spread rate coefficient/slope'
    static phiw = 'spread rate coefficient/wind'
    static qig  = 'heat of pre-ignition'
    static ros  = 'spread rate'
    static ros0   = 'no-wind no-slope ' + K.ros
    static roseff = 'effective wind limited ' + K.ros
    static rosmax = 'up-wind up-slope ' + K.ros
    static rxi    = 'reaction intensity'
    static rxv  = 'reaction velocity'
    static rxve  = K.rxv + '/exponent'
    static rxvm  = K.rxv + '/maximum'
    static rxvo  = K.rxv + '/optimum'
    static savr15 = K.savr + '/1.5'
    static slpk = 'slope/K'
    static slpr = 'slope rise to reach ratio'
    static taur = 'residence time'
    static waf  = 'wind speed adjustment factor'
    static weff = 'effective wind speed'
    static weffl= 'effective wind speed limit'
    static wlim = 'wind limit applied'
    static wndb = 'wind/B'
    static wndc = 'wind/C'
    static wnde = 'wind/E'
    static wndk = 'wind/K'
    static wndi = 'wind/I'
    static xi   = 'propagating flux ratio'
    
    // Wind (and Midflame) Module leafs to append to P.wind (or P.windmid)
    static whead = 'direction/heading'
    static wfrom = 'direction/source'
    static w10m = 'speed/10-m'
    static w20f = 'speed/20-ft'
    static wmid = 'midflame wind speed'
}