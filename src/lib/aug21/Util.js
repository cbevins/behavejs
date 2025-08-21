import { Dag } from './index.js'

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

    static listNodes(nodes, cols=4) {
        const map = Util.nodesToMap(nodes)
        return Util.listNodeMap(map, cols)
    }

    static listNodeMap(map,cols=4) {
        const w0 = map.values().reduce((w, node) => Math.max(node[0].length, w), 0)
        const w1 = map.values().reduce((w, node) => Math.max((''+node[1]).length, w), 0)
        let str = ''
        for(let node of map.values()) {
            const [key, value, units, method, args] = node
            let m = method.name
            str += key.padEnd(w0+2)
            if (cols>1) str += (''+value).padEnd(w1+2)
            if (cols>2) str += m.padEnd()
            if (cols>3) str += '(' + args.join(', ') + ')'
            str += '\n'
        }
        return str + map.size + ' nodes'
    }

    static logNodes(nodes, title='', cols=4) {
        const dashes = ''.padStart(title.length, '-')
        console.log(`${dashes}\n${title}\n${dashes}`)
        console.log(Util.listNodes(nodes, cols))
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