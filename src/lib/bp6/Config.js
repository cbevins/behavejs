// Note that the first option is the default
export class Config {
    constructor() {
        // 10 options
        this.surface = {
            active: {
                prompt: 'Surface fire spread model is',
                options: [
                    {value: 'activated', desc: 'actived'},
                    {value: 'inactive', desc: 'inactive'}],
                value: 'activated'
            },
            curedFuel: {
                prompt: 'Cured herb fuel fraction is',
                options: [
                    {value: 'input', desc: 'directly entered as input'},
                    {value: 'estimated', desc: 'estimated from live herb moisture content'}],
                value: 'input'
            },
            fuels: {
                prompt: 'Surface fuels are derived from',
                options: [
                    {value: 'one fuel', desc: 'one standard fuel model'},
                    {value: 'two fuels', desc: 'two standard fuel models'},
                    {value: 'input', desc: 'directly entered fuel model parameters'},
                    {value: 'chaparral', desc: 'dynamic chaparral fuel model (Albini and)'},
                    {value: 'wetsern aspen', desc: 'dynamic western aspen fuel model (Brown and Simmerman)'},
                    {value: 'southern rough', desc: 'dynamic southern rough fuel model'},],
                value: 'one fuel',
            },
            moisture: {
                prompt: 'Fuel moisture inputs are entered for',
                options: [
                    {value: '5', desc: '3 dead class and 2 live class values'},
                    {value: '4', desc: '3 dead class and 1 live category values'},
                    {value: '2', desc: '1 dead category and 1 live category values'},
                ],
                value: '5'
            },
            rxi: {
                prompt: 'Fireline intensity inputs are',
                options: [
                    {value: 'flame length', desc: 'estimated from flame length'},
                    {value: 'fireline intensity', desc: 'entered directly as input'},],
                value: 'flame length'
            },
            slope: {
                prompt: 'Slope steepness inputs are entered as',
                options: [
                    {value: 'ratio', desc: 'ratio of vertical rise to horizontal reach'},
                    {value: 'degrees', desc: 'degrees above the horizontal'},],
                value: 'ratio'
            },
            waf: {
                prompt: 'The below-canopy wind speed reduction factor is',
                options: [
                    {value: 'input', desc: 'directly entered as input'},
                    {value: 'estimated', desc: 'estimated from fuel and canopy parameters'}],
                value: 'input'
            },
            weightedRos: {
                prompt: 'Final fire spread when when applying two fuel models is the',
                options: [
                    {value: 'arithmetic', desc: 'arithmetic mean'},
                    {value: 'harmonic', desc: 'harmonic mean'},
                    {value: 'expected', desc: 'expected value'},
                    {value: 'maximum', desc: 'maximum value'},],
                value: 'arithmetic'
            },
            windLimit: {
                prompt: 'Fire spread rate "effective wind speed limit" is',
                options: [
                    {value: 'applied', desc: 'applied'},
                    {value: 'ignored', desc: 'ignored'}],
                value: 'applied'
            },
            windSpeed: {
                prompt: 'Wind speed input values are taken at',
                options: [
                    {value: 'midflame height', desc: 'midflame height'},
                    {value: '20-ft height', desc: '20-ft height'},
                    {value: '10-m height', desc: '10-m height'},
                ],
                value: 'midflame height',
            },
        }
        this.crown = {}
        this.growth = {}
        this.spotting = {}
        this.mortality = {}
        this.ignition = {}
    }
}
