export class Util {
            
    // Converts an array of Dag nodes into a Map
    static nodesToMap(nodes) {
        const map = new Map()
        for (let node of nodes) map.set(node[0], node)
        return map
    }
}