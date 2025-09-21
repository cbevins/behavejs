<script>
    import { WfmsTwoFuels } from '$lib/index.js'
    import { configTable } from '$lib/snippets/ConfigTable.svelte'
    import { nodeTable } from '$lib/snippets/NodeTable.svelte'
    const wfms = new WfmsTwoFuels()
</script>

<div class='mx-4 my-4'>
<h1 class='text-2xl font-bold>'>Wildland Fire Modeling System</h1>
<h2 class='text-lg font-bold>'>{new Date()}</h2>

{@render nodeTable('Selected Nodes', wfms.selectedByKey())}
{@render nodeTable('Active Inputs Nodes', wfms.activeInputsByKey())}
<!-- {@render nodeTable('Active Nodes', wfms.activeNodesByKey())} -->
{@render nodeTable('All Input Nodes', wfms.activeInputsByKey())}
{@render configTable('Active Configurations', wfms.activeConfigsByKey())}
{@render nodeTable('All Nodes', wfms.nodesByKey())}

</div>