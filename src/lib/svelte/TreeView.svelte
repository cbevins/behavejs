<script>
    import TreeNode from './TreeNode.svelte';
    let { data } = $props()   // Array of nested TreeNode instances
</script>

<div class='text-2xl font-bold'>
    {#each data as node (node.id)}
        <TreeNode {node} on:toggle on:select />
    {/each}
</div>
