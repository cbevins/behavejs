<script>
    // Each node must at a minimum have {id: <n>, label: <string>, children: []}
    import { createEventDispatcher } from 'svelte'

    export let node; // The node object for this component
    export let depth = 0; // Current depth for styling/indentation

    let expanded = false; // State to control expansion/collapse

    const dispatch = createEventDispatcher()

    function toggleExpand() {
        expanded = !expanded
        dispatch('toggle', node.id) // Optional: dispatch an event on toggle
    }

    function handleNodeClick() {
        dispatch('select', node.id) // Optional: dispatch an event on node selection
    }
</script>

<div class='text-lg font-bold mb-1 mx-auto' style="padding-left: {depth * 15}px;">
    <div class="">
        {#if node.children && node.children.length > 0}
            <button class='mr-2' on:click={toggleExpand}>{expanded ? '▼' : '▶'}</button>
        {:else}
            <span class='ml-4'>--</span>
        {/if}
        <button class='mr-2' on:click={handleNodeClick}>{node.label}</button>
    </div>

    {#if expanded && node.children && node.children.length > 0}
    <div class="mt-2 mr-2">
        {#each node.children as childNode (childNode.id)}
            <svelte:self node={childNode} depth={depth + 1} on:toggle on:select />
        {/each}
        </div>
    {/if}
</div>

<style>
</style>