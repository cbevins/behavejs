export class Util {

    static checkNodeKeys(map) {
        let n = 0
        for(let node of map.values()) {
            const [key, value, units, method, supkeys] = node
            for(let supkey of supkeys) {
                if(!map.has(supkey)) {
                    console.log(`*** "${key}" supplier "${supkey}" undefined`)
                    n++
                }
            }
        }
        console.log('Dag of', map.size, 'nodes has',n,'undefined supplier keys.')
    }
    
    // Converts an array of Dag nodes into a Map
    static nodesToMap(nodes) {
        const map = new Map()
        for (let node of nodes) map.set(node[0], node)
        return map
    }
}