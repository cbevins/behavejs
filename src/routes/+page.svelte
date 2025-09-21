<script>
    import { WfmsTwoFuels } from '$lib/index.js'
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

<!-- nodeTable Snippet -->
{#snippet nodeRow(content)}
    <td class='px-2 py-2 border border-gray-300'>{content}</td>
{/snippet}
{#snippet nodeHeader(content)}
    <td class='font-bold px-2 py-2 border border-gray-300'>{content}</td>
{/snippet}
{#snippet nodeTable(title, nodeArray)}
<h2 class='mt-4 text-base font-bold'>{title} ({nodeArray.length})</h2>
<table class='table-auto text-sm'>
    <thead>
        <tr>
            {@render nodeHeader('Numb')}
            {@render nodeHeader('Key')}
            {@render nodeHeader('Value')}
            {@render nodeHeader('Status')}
            {@render nodeHeader('Dirty')}
            {@render nodeHeader('Updater')}
        </tr>
    </thead>
    <tbody>
        {#each nodeArray as node, n}
        <tr>
            {@render nodeRow(n+1)}
            {@render nodeRow(node.key)}
            {@render nodeRow(node.value)}
            {@render nodeRow(node.status)}
            {@render nodeRow(node.dirty)}
            {@render nodeRow(node.updater.name)}
        </tr>
        {/each}
    </tbody>
</table>
{/snippet}
<!-- END nodeTable Snippet -->


<!-- configTable Snippet -->
{#snippet configRow(content)}
    <td class='px-2 py-2 border border-gray-300'>{content}</td>
{/snippet}
{#snippet configHeader(content)}
    <td class='font-bold px-2 py-2 border border-gray-300'>{content}</td>
{/snippet}
{#snippet configTable(title, configArray)}
<h2 class='mt-4 text-base font-bold'>{title} ({configArray.length})</h2>
<table class='table-auto text-sm'>
    <thead>
        <tr>
            {@render configHeader('Numb')}
            {@render configHeader('Key')}
            {@render configHeader('Value')}
            {@render configHeader('Options')}
        </tr>
    </thead>
    <tbody>
        {#each configArray as cfg, n}
        <tr>
            {@render configRow(n+1)}
            {@render configRow(cfg.key)}
            {@render configRow(cfg.value)}
            {@render configRow(cfg.options.join(', '))}
        </tr>
        {/each}
    </tbody>
</table>
{/snippet}
<!-- END configTable Snippet -->

</div>