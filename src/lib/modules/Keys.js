export class Keys {
    static meta = '_meta/'
    static mmod = Keys.meta+'module'
    static mcfg = Keys.meta+'config/'
    static mver = Keys.meta+'version'

    // Surface Element Module properties
    static dead = 'dead'
    static dens = 'fiber density'
    static depth = 'depth'
    static efol = 'effective fuel/ovendry load'
    static efmc = 'effective fuel/moisture content'
    static efwl = 'effective fuel/water load'
    static ehn  = 'effective heating number'
    static heat = 'heat of combustion'
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
    static ftype= 'fuel type'
    static vol  = 'volume'

    // Surface Bed Module properties
    static bulk = 'bulk density'
    static cured = 'cured fraction'
    static beta = 'packing ratio'
    static bopt = Keys.beta+'/optimum'
    static brat = Keys.beta+'/ratio'
    static dfrxi = 'dry fuel reaction intensity'
    static hpua = 'heat per unit area'
    static hsink = 'heat sink'
    static hsrc = 'heat source'
    static nwns = 'no-wind no-slope/'
    static owaf = 'open wind speed adjustment factor'
    static phie = 'spread rate coefficient/effective wind'
    static phis = 'spread rate coefficient/slope'
    static phiw = 'spread rate coefficient/wind'
    static qig  = 'heat of pre-ignition'
    static ros  = 'spread rate'
    static ros0 = 'no-wind no-slope ' + Keys.ros
    static rosl = 'effective wind limited ' + Keys.ros
    static rosx = 'maximum ' + Keys.ros
    static rxv  = 'reaction velocity'
    static rxve  = Keys.rxv + '/exponent'
    static rxvm  = Keys.rxv + '/maximum'
    static rxvo  = Keys.rxv + '/optimum'
    static savr15 = Keys.savr + '/1.5'
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
    static wmid = 'midflame wind speed'
    static xi   = 'propagating flux ratio'

    // Standard fuel model properties
    static fmalias    = 'alias'
    static fmkey      = 'key'
    static fmnumb     = 'number'
    static fmcode     = 'code'
    static fmlabel    = 'label'
    static fmcured    = 'cured herb fraction'
    static fmdepth    = Keys.depth
    static fmmext     = Keys.mext
    static fmheatdead = 'dead/'+Keys.heat
    static fmheatlive = 'live/'+Keys.heat
    static fmload1    = 'dead/1-h/'+Keys.load
    static fmload10   = 'dead/10-h/'+Keys.load
    static fmload100  = 'dead/100-h/'+Keys.load
    static fmloadherb = 'live/herb/'+Keys.load
    static fmloadstem = 'live/stem/'+Keys.load
    static fmsavr1    = 'dead/1-h/'+Keys.savr
    static fmsavrherb = 'live/herb/'+Keys.savr
    static fmsavrstem = 'live/stem/'+Keys.savr
    
    // Canopy Module
    static bulk = 'bulk density'
    static ccov =  'coverage'
    static cfill = 'crown fill'
    static cheat = 'canopy ' + Keys.heat
    static chpua = 'canopy ' + Keys.hpua
    static ctht = 'canopy height'
    static cbht = 'base height'
    static clen = 'crown length'
    static crat = 'crown ratio'
    static cload = 'load'
    static cshelters = 'shelters fuel from wind'
    static cwaf = 'canopy-induced' + Keys.waf

    // Moisture Module properties
    static md1   = 'dead/1-h/' + Keys.mois
    static md10  = 'dead/10-h/' + Keys.mois
    static md100 = 'dead/100-h/' + Keys.mois
    static mherb = 'live/herb/' + Keys.mois
    static mstem = 'live/stem/' + Keys.mois
    static mlive = 'live/category/' + Keys.mois
    static mdead = 'dead/category/' + Keys.mois

    // Slope Module properties
    static sasp = 'direction/aspect (downslope)'
    static sups = 'direction/upslope'
    static srat = 'steepness/ratio'
    static sdeg = 'steepness/degrees'

    // Wind Module properties
    static whead = 'direction/heading'
    static wfrom = 'direction/source'
    static w10m = 'speed/10-m'
    static w20f = 'speed/20-ft'
}