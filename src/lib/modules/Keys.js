export class Keys {
    static meta = '_meta/'
    static mmod = Keys.meta+'module'
    static mcfg = Keys.meta+'config/'
    static mver = Keys.meta+'version'

    // Fuel Module properties
    static dens = 'fiber density'
    static depth = 'depth'
    static efol = 'effective fuel/ovendry load'
    static efmc = 'effective fuel/moisture content'
    static efwl = 'effective fuel/water load'
    static ehn  = 'effective heating number'
    static heat = 'heat of combustion'
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
    static vol  = 'volume'

    // Standard fuel model properties
    static fmalias    = 'alias'
    static fmkey      = 'key'
    static fmnumb     = 'number'
    static fmcode     = 'code'
    static fmlabel    = 'label'
    static fmcured    = 'cured herb fraction'
    static fmdepth    = 'depth'
    static fmmext     = 'extinction moisture content'
    static fmheatdead = 'dead/'+Keys.heat
    static fmheatlive = 'live/'+Keys.heat
    static fmload1    = 'dead/1-h/'+Keys.load
    static fmload10   = 'dead/10-h/'+Keys.load
    static fmload100  = 'dead/100-h/'+Keys.load
    static fmloadherb = 'live/total herb/'+Keys.load
    static fmloadstem = 'live/stem/'+Keys.load
    static fmsavr1    = 'dead/1-h/'+Keys.savr
    static fmsavrherb = 'live/herb/'+Keys.savr
    static fmsavrstem = 'live/stem/'+Keys.savr
    
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