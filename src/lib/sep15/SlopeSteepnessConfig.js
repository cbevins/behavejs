export class SlopeSteepnessConfig {
    constructor(key) {
        this.key = key
        // keys for outside reference
        this.ratio = 'observed ratio of rise-to-reach'
        this.degrees = 'degrees'
        this.map = 'map'
        this.options = [this.ratio, this.degrees, this.map]
        this.prompt = 'slope steepness is specified as'
        this.prompts = [
            [this.ratio, 'ratio of vertical rise to horizontal reach'],
            [this.degrees, 'degrees'],
            [this.map, 'estimated from map parameters']
        ]
    }
}
