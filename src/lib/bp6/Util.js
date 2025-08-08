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
        console.log('Dag of', map.size, 'nodes has', n,'undefined supplier keys.')
    }

    static getNode(map, nodeKey) {
        console.log('get', nodeKey)
        const [key, value, units, method, args] = map.get(nodeKey)
        return {key, value, units, method, args}
    }

    static listNodeMap(map) {
        const w = map.values().reduce((w, node) => Math.max(node[0].length, w), 0)
        const str = map.values().reduce((str, node) => str + node[0].padEnd(w+2) + node[1] + '\n', '')
        return str + map.size + ' nodes'
    }

    static logNode(map, key) {
        const [k, v, u, m, a] = map.get(key)
        console.log(k, v, m, a)
    }

    // Converts an array of Dag nodes into a Map
    static nodesToMap(nodes) {
        const map = new Map()
        for (let node of nodes) map.set(node[0], node)
        return map
    }
}