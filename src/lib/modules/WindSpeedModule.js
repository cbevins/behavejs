import { Dag, P, ModuleBase, U } from '../index.js'
import { WindEquations as Wind } from '../index.js'

export class WindSpeedModule extends ModuleBase {
    /**
     * Creates the wind speed module nodes.
     * @param {string} path Prefix for this module instance's fully qualified node names
     * (something like 'weather/' or '') to prefix this module's 'wind/speed/<node>' keys.
     */
    constructor(path){
        super(path, 'WindSpeedModule')
        const cfg = this.setConfig()
        this.nodes = [
            [path+P.wspd20ft, 0, U.windSpeed, 0, [
                [cfg.at20ft, Dag.input, []],
                [cfg.at10m, Wind.windSpeedAt20ftFrom10m, [path+P.wspd10m]]]],
            [path+P.wspd10m, 0, U.windSpeed, 0, [
                [cfg.at20ft, Dag.input, []],
                [cfg.at10m, Wind.windSpeedAt10mFrom20ft, [path+P.wspd20ft]]]],
        ]
    }
    setConfig() {
        const at20ft = 'at 20-ft'
        const at10m  = 'at 10-m'
        this.config = {
            at20ft, at10m,    // individual key for outside reference
            options: [at20ft, at10m],
            prompt: 'the open wind speed is measured at',
            prompts: [
                [at20ft, '20-ft height'],
                [at10m, '10-m height]']
            ],
        }
        return this.config
    }
}
