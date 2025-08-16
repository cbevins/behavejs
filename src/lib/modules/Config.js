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
            curing: {
                prompt: 'Cured herb fuel fraction is',
                options: [
                    {value: 'input', desc: 'directly entered as input'},
                    {value: 'estimated', desc: 'estimated from live herb moisture content'}],
                value: 'input'
            },
            fuel1: {
                prompt: 'The primary surface fuel is derived from',
                options: [
                    {value: 'standard catalog', desc: 'standard fuel model catalog'},
                    {value: 'standard input', desc: 'standard fuel model parameters directly entered as input'},
                    {value: 'chaparral', desc: 'dynamic chaparral fuel model (Albini and)'},
                    {value: 'southern rough', desc: 'dynamic southern rough fuel model'},
                    {value: 'western aspen', desc: 'dynamic western aspen fuel model (Brown and Simmerman)'}],
                value: 'standard catalog',
            },
            fuel2: {
                prompt: 'The secondary surface fuel ',
                options: [
                    {value: 'none', desc: 'does not exist'},
                    {value: 'standard catalog', desc: 'is derived from standard fuel model catalog'},
                    {value: 'standard input', desc: 'is derived from standard fuel model parameters directly entered as input'},
                    {value: 'chaparral', desc: 'is derived from dynamic chaparral fuel model (Albini and)'},
                    {value: 'southern rough', desc: 'is derived from dynamic southern rough fuel model'},
                    {value: 'western aspen', desc: 'is derived from dynamic western aspen fuel model (Brown and Simmerman)'}],
                value: 'standard catalog',
            },
            // must configure as it changes the input Set
            midflame: {
                prompt: 'Midflame windspeed is',
                options: [
                    {value: 'input', desc: 'entered directly as input'},
                    {value: 'estimated', desc: 'estimated from wind speed and adjustment factor'}
                ],
                value: 'input',
            },
            // must configure as it changes the input Set
            waf: {
                prompt: 'The below-canopy wind speed reduction factor is',
                options: [
                    {value: 'input', desc: 'directly entered as input'},
                    {value: 'estimated', desc: 'estimated from fuel and canopy parameters'}],
                value: 'input'
            },
            // MAKE THIS A NODE since it does not alter node topog or input Set
            rosWeighting: {
                prompt: 'Final fire spread rate when when applying two surface fuels is the',
                options: [
                    {value: 'arithmetic', desc: 'arithmetic mean'},
                    {value: 'harmonic', desc: 'harmonic mean'},
                    {value: 'expected', desc: 'expected value'},
                    {value: 'maximum', desc: 'maximum value'},],
                value: 'arithmetic'
            },
            // MAKE THIS A NODE since it does not alter node topog or input Set
            windLimit: {
                prompt: 'Fire spread rate "effective wind speed limit" is',
                options: [
                    {value: 'applied', desc: 'applied'},
                    {value: 'ignored', desc: 'ignored'}],
                value: 'applied'
            },
        },

        this.fire = {
            intensity: {
                prompt: 'Fireline intensity inputs are entered as',
                options: [
                    {value: 'flame length', desc: 'flame length'},
                    {value: 'fireline intensity', desc: 'fireline intensity'},],
                value: 'flame length'
            },
        }

        this.moisture = {
                prompt: 'Fuel moisture inputs are entered for',
                options: [
                    {value: '5', desc: '3 dead class and 2 live class values'},
                    {value: '4', desc: '3 dead class and 1 live category values'},
                    {value: '2', desc: '1 dead category and 1 live category values'},
                ],
                value: '5'
        },

        this.slope = {
            steepness: {
                prompt: 'Slope steepness inputs are entered as',
                options: [
                    {value: 'ratio', desc: 'ratio of vertical rise to horizontal reach'},
                    {value: 'degrees', desc: 'degrees above the horizontal'},],
                value: 'ratio'
            },
            direction: {
                prompt: 'Slope direction inputs are for',
                options: [
                    {value: 'aspect', desc: 'aspect (downslope) degreees from north'},
                    {value: 'upslope', desc: 'upslope degreees from north'},
                ],
                value: 'aspect'
            }
        }

        this.wind = {
            speed: {
                prompt: 'Wind speed inputs are for height at',
                options: [
                    {value: '20-ft', desc: '20-ft'},
                    {value: '10-m', desc: '10-m'},
                ],
                value: '20-ft',
            },
            direction: {
                prompt: 'Wind direction inputs are',
                options: [
                    {value: 'heading', desc: 'heading degrees from north'},
                    {value: 'source', desc: 'source degrees from north'},
                ],
                value: 'heading'
            }
        }
        this.crown = {}
        this.growth = {}
        this.spotting = {}
        this.mortality = {}
        this.ignition = {}
    }
}
