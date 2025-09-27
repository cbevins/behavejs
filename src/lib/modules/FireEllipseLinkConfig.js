import { ConfigBase } from './ConfigBase.js'
import {Paths} from './Paths.js'

export class FireEllipseLinkConfig extends ConfigBase {
    constructor(key=Paths.cfgEllipse) {
        super(key)
        // keys for outside reference
        this.surface  = 'surface'
        this.observed = 'observed'
        this.input = 'observed'
        this.options = [this.surface, this.observed]
        this.prompt = 'the required 5 fire behavior inputs are'
        this.prompts = [
            [this.surface, 'estimated using the Surface Fire Module'],
            [this.observed, 'input parameters'],
        ]
        this.value = this.options[0]
        this.notes = [
            'The required input parameters are:',
            '- fire spread rate at head',
            '- direction of maximum fire spread from up-slope',
            '- fire ellipse length-to-width ratio',
            '- flame length at fire head',
            '- midflame wind speed'
        ]
    }
}
