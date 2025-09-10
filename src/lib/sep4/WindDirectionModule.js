import { Dag, C, P, ModuleBase, U } from './index.js'
import { WindEquations as Wind } from './index.js'

export class WindDirectionModule extends ModuleBase {
    /**
     * @param {string} path Prefix for this module's fully qualified node names
     * (something like 'weather/' or '') to preface this module's 'wind/direction/<node>' keys.
     */
    constructor(path){
        super(path, 'WindDirectionModule')

        // configs
        this.config = 'wind direction input'
        this.options = [C.wdirHeadUp] //, C.wdirHeadNo, C.wdirFromUp, C.wdirFromNo]

        this.nodes = [
            [path+P.wdirHeadUp, 0, U.compass, 0, [
                [C.wdirHeadUp, Dag.input, []],
            ]],
        ]
    }
}
