export function configureNodeDefs(nodeDefs, cfgOpt='*') {
    const result = []
    for(let node of nodeDefs) {
        const [key, value, units, options] = node
        for (let option of options) {
            const [cfgValue, method, args] = option
            if (cfgOpt === cfgValue || cfgValue === '*')
                result.push([key, value, units, method, args])
        }
    }
    if (result.length !== nodeDefs.length)
        throw new Error(`***configureNodeDefs() option "${cfgOpt}" matched ${result.length} instead of ${nodeDefs.length} nodes`)
    return result
}
