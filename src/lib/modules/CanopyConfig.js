import { ConfigBase } from './ConfigBase.js'
import {Paths} from './Paths.js'
export class CanopyConfig extends ConfigBase {
    constructor(key=Paths.cfgCanopy) {
        super(key)
        // keys for outside reference
        this.baseHeight   = 'height-base'
        this.heightBase   = this.baseHeight
        this.ratioHeight  = 'ratio-height'
        this.heightRatio  = this.ratioHeight
        this.lengthHeight = 'height-length'
        this.heightLength = this.lengthHeight
        this.ratioBase    = 'ratio-base'
        this.baseRatio    = this.ratioBase
        this.ratioLength  = 'ratio-length'
        this.lengthRatio  = this.ratioLength
        this.lengthBase   = 'length-base'
        this.baseLength   = this.lengthBase

        this.options = [this.baseHeight, this.ratioHeight, this.lengthHeight,
                        this.ratioBase, this.ratioLength, this.lengthBase]
        this.prompt = 'canopy height parameters are entered for'
        this.prompts = [
            [this.baseHeight, 'total and crown base heights'],
            [this.ratioHeight, 'total height and crown ratio'],
            [this.lengthHeight, 'total height and crown length'],
            [this.ratioBase, 'crown base height and crown ratio'],
            [this.ratioLength, 'crown length and crown ratio'],
            [this.lengthBase, 'crown length and base height'],
        ]
        this.value = this.options[0]
    }
}