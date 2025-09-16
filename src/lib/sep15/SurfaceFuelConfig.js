export class SurfaceFuelConfig {
    constructor(key) {
        this.key = key
        // keys for outside reference
        this.standard  = 'standard'
        this.chaparral = 'chaparral'
        this.palmetto  = 'palmetto'
        this.aspen     = 'aspen'
        this.options = [this.standard, this.chaparral, this.palmetto, this.aspen]
        this.prompt = 'fuel parametrs are provided by the'
        this.prompts = [
            [this.standard, 'standard fire behavior fuel models'],
            [this.chaparral, 'Philpot & Rothermel chaparral fuel model'],
            [this.palmetto, 'Albini and Hough palmetto-gallberry fuel model'],
            [this.aspen, 'the Brown and Simmerman western aspen fuel model']
        ]
        this.value = this.options[0]
    }
}
