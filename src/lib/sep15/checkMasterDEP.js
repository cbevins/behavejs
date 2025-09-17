import {BehaveMaster} from './BehaveMasterDEP.js'
function checkNodeKeys(map) {
    console.log(`BehaveMaster has ${map.size} nodes.`)
    let unknowns = 0
    for(let node of [...map.values()]) {
        const {key, value, units, cfgkey, options} = node
        for(let option of options) {
            const {cfgval, updater, args} = option
            for(let arg of args) {
                if(!map.has(arg)) {
                    unknowns++
                    let str = `Node "${key}" opt "${cfgval}" has unknown arg "${arg}".`
                    console.log(str)
                }
            }
        }
    }
    console.log(`BehaveMaster has ${unknowns} unknown arg keys.`)
}

checkNodeKeys(BehaveMaster)