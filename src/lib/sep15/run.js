import fs from 'fs'
import {BehaveModule} from './BehaveModule.js'

function jstr(str) { return JSON.stringify(str) }

function createMaster(nodes) {
    let str = 'import { BehaveLibrary as Lib } from "../modules/BehaveLibrary.js"\n'
    str += 'export const ModuleMaster = [\n'
    for(let node of nodes) {
        const [key, value, units, cfgkey, options] = node
        str += `    {key: ${jstr(key)}, `
        str += `value: ${jstr(value)}, `
        str += `units: ${jstr(units)}, `
        str += `cfgkey: ${jstr(cfgkey)}, `
        str += `options: [\n`
        for(let option of options) {
            const [cfgval, method, args] = option
            str += `        {cfgval: ${jstr(cfgval)}, updater: Lib.${method.name}, args: ${jstr(args)}},\n`
        }
        str += `    ]},\n`
    }
    str += ']\n'
    fs.writeFile('./ModuleMaster.js', str, function (err) {
        if (err) throw err
    })
    
    return str
}
const behave = new BehaveModule()
createMaster(behave.nodes)
