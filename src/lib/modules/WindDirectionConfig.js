import { ConfigBase } from './ConfigBase.js'
import {Paths} from './Paths.js'

export class WindDirectionConfig extends ConfigBase {
    constructor(key=Paths.cfgWindDir) {
        super(key)
        // keys for outside reference
        this.headingFromUpslope = 'heading from up-slope'
        this.sourceFromNorth = 'source from north'
        this.upslope = 'up-slope'
        this.options = [this.sourceFromNorth, this.headingFromUpslope, this.upslope]
        this.prompt = 'the wind direction is specified as'
        this.prompts = [
            [this.sourceFromNorth, 'source degrees from north'],
            [this.headingFromUpslope, 'heading degrees from up-slope'],
            [this.upslope, 'always blows up-slope'],
        ]
        this.value = this.options[0]
    }
}