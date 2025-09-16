export class SlopeDirectionConfig {
    constructor(key) {
        this.key = key
        // keys for outside reference
        this.upslope = 'up-slope'
        this.downslope = 'down-slope'
        this.options = [this.upslope, this.downslope]
        this.prompt = 'slope direction is specified as'
        this.prompts = [
            [this.upslope, 'up-slope direction'],
            [this.downslope, 'down-slope direction (aspect)'],
        ]
        this.value = this.options[0]
    }
}
