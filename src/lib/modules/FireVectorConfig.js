import { ConfigBase } from './ConfigBase.js'
import {Paths} from './Paths.js'

export class FireVectorConfig extends ConfigBase {
    constructor(key=Paths.cfgVectors) {
        super(key)
        // keys for outside reference
        this.fromHead = 'fire head'
        this.fromUpslope  = 'up-slope'
        this.fromNorth = 'north'
        this.options = [this.fromHead, this.fromUpslope, this.fromNorth]
        this.prompt = 'fire vectors are entered as degrees clockwise from'
        this.prompts = [
            [this.fromHead, 'from head'],
            [this.fromUpslope, 'from upslope'],
            [this.fromNorth, 'from north']
        ]
        this.value = this.options[0]
    }
}
