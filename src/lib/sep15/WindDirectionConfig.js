export class WindDirectionConfig {
    constructor(key) {
        this.key = key
        // keys for outside reference
        this.headingFromUpslope = 'heading from up-slope'
        this.sourceFromNorth = 'source from north'
        this.upslope = 'upslope'
        this.options = [this.upslope, this.headingFromUpslope, this.sourceFromNorth]
        this.prompt = 'the wind direction is specified as'
        this.prompts = [
            [this.upslope, 'always up-slope'],
            [this.headingFromUpslope, 'heading degrees from up-slope'],
            [this.sourceFromNorth, 'source degrees from north'],
        ]
        this.value = this.options[0]
    }
}