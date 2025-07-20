/*
Following code is from https://www.geeksforgeeks.org/dsa/topological-sorting/
 */
// Function to perform DFS and topological sorting
function topologicalSortUtil(v, adj, visited, st)
{
    // Mark the current node as visited
    visited[v] = true;

    // Recur for all adjacent vertices
    for (let i of adj[v]) {
        if (!visited[i])
            topologicalSortUtil(i, adj, visited, st);
    }

    // Push current vertex to stack which stores the result
    st.push(v);
}

function constructadj(V, edges)
{
    let adj = Array.from(
        {length : V},
        () => []); // Fixed the adjacency list declaration

    for (let it of edges) {
        adj[it[0]].push(
            it[1]); // Fixed adjacency list access
    }
    return adj;
}

// Function to perform Topological Sort
function topologicalSort(V, edges)
{
    // Stack to store the result
    let st = [];
    let visited = new Array(V).fill(false);

    let adj = constructadj(V, edges);

    // Call the recursive helper function to store
    // Topological Sort starting from all vertices one by
    // one
    for (let i = 0; i < V; i++) {
        if (!visited[i])
            topologicalSortUtil(i, adj, visited, st);
    }

    let ans = [];

    // Append contents of stack
    while (st.length > 0) {
        ans.push(st.pop());
    }

    return ans;
}

// Main function
let v = 6;
let edges = [
    [2, 3], [3, 1], [4, 0], [4, 1], [5, 0],
    [5, 2]
];

let ans = topologicalSort(v, edges);

console.log(ans.join(" ") + " ");