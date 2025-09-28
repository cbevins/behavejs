<script module>
    export {wfmsNodeTable}
</script>

{#snippet wfmsNodeRow(content)}
    <td class='px-2 py-2 border border-gray-300'>{content}</td>
{/snippet}

{#snippet wfmsNodeHeader(content)}
    <td class='font-bold px-2 py-2 border border-gray-300'>{content}</td>
{/snippet}

{#snippet wfmsNodeTable(title, nodeArray)}
<h2 class='mt-4 text-base font-bold'>{title} ({nodeArray.length})</h2>
<table class='table-auto text-sm'>
    <thead>
        <tr>
            {@render wfmsNodeHeader('Numb')}
            {@render wfmsNodeHeader('Key')}
            {@render wfmsNodeHeader('Value')}
            {@render wfmsNodeHeader('Status')}
            {@render wfmsNodeHeader('Dirty')}
            {@render wfmsNodeHeader('Updater')}
        </tr>
    </thead>
    <tbody>
        {#each nodeArray as node, n}
        <tr>
            {@render wfmsNodeRow(n+1)}
            {@render wfmsNodeRow(node.key)}
            {@render wfmsNodeRow(node.value)}
            {@render wfmsNodeRow(node.status)}
            {@render wfmsNodeRow(node.dirty)}
            {@render wfmsNodeRow(node.current.updater.name)}
        </tr>
        {/each}
    </tbody>
</table>
{/snippet}
