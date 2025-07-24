/**
 * Sorts an array of DagNodes in topological order using depth-first search algorithm
 * @param {array} nodes Array of DagNode references in arbitrary order
 * @returns Array of DagNodes in topological order
 */
    export function dfsSort(nodes) {
        this.dfsOrder = []
        // use DagNode.visited to store 'visited' flag
        for (let node of nodes) node.visited = false
        // Topological sort starting from each unvisited node
        for (let node of nodes) if (!node.visited) this._dfsSortNext(node)
        this.dfsOrder.reverse()
        return this.dfsOrder
    }

    function _dfsSortNext(node) {
        node.visited = true // Mark the current node as tmp
        for (let output of node.outputs) if (!output.visited) this._dfsSortNext(output)
        this.dfsOrder.push(node) // Push current node to stack which stores the result
    }

/**
 * Sorts an array of DagNodes in topological order using Kahn algorithm
 * @param {array} nodes Array of DagNode references in arbitrary order
 * @returns Array whose elements are an array of DagNodes in topological order,
 * and whose element 0 DagNodes must be updated first.
 */
    export function kahnSort(nodes) {
        this.topoLevels = []
        // calculate indegrees for each node and store in node.visited 
        for (let node of nodes) node.visited = node.inputs.length
        // create Set of remaining nodes to be sorted
        const todo = new Set(nodes.values())
        while (todo.size) {
            const found = []    // holds 0 in-degrees nodes found at this depth
            // first remove all nodes with 0 remaining indegrees
            for (let node of todo) {
                if (!node.visited) {
                    found.push(node)
                    todo.delete(node)
                }
            }
            // for each found node, decrement indegrees of its output nodes
            for (let node of found) {
                for(let output of node.outputs) {
                    output.visited--
                }
            }
            // store found nodes at this depth
            this.topoLevels.push(found)
        }
    }
