function topoSort(node, st) {
    node.visited = true // Mark the current node as visited
    for (let i=0; i<node.outputs.length; i++) {
        const output = node.outputs[i]
        if (! output.visited) {
            topoSort(output, st)
        }
    }
    st.push(node) // Push current node to stack which stores the result
}

// Create nodes
const node0 = {key: 'node0', value: 0, inputs: [], outputs: [], visited: false}
const node1 = {key: 'node1', value: 1, inputs: [], outputs: [], visited: false}
const node2 = {key: 'node2', value: 2, inputs: [], outputs: [], visited: false}
const node3 = {key: 'node3', value: 3, inputs: [], outputs: [], visited: false}
const node4 = {key: 'node4', value: 4, inputs: [], outputs: [], visited: false}
const node5 = {key: 'node5', value: 5, inputs: [], outputs: [], visited: false}
const nodes = [node0, node1, node2, node3, node4, node5]

// Set inputs for each node
// let edges = [[2, 3], [3, 1], [4, 0], [4, 1], [5, 0], [5, 2]]
node0.inputs = [node4, node5]
node1.inputs = [node4]
node2.inputs = [node5]
node3.inputs = [node2]
node4.inputs = []
node5.inputs = []

// Set outputs for each node (adjacency array)
for (let i=0; i<nodes.length; i++) {
    const target = nodes[i]
    for (let j=0; j<target.inputs.length; j++) {
        const source = target.inputs[j]
        source.outputs.push(target)
    }
}

// Stack to store the result
const st = []

// Topological Sort starting from each node
for (let i=0; i < nodes.length; i++) {
    if (! nodes[i].visited)
        topoSort(nodes[i], st)
}
st.reverse()

// 5 4 2 3 1 0
for(let i=0; i<st.length; i++)
    console.log(st[i].value)