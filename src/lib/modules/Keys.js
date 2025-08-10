export class Keys {
    static meta = '_meta/'
    static mmod = Keys.meta+'module'
    static mcfg = Keys.meta+'config/'
    static mver = Keys.meta+'version'

    // Generic
    static mois = 'moisture content'

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