<script module>
    export {wfmsConfigTable}
</script>

{#snippet wfmsConfigRow(content)}
    <td class='px-2 py-2 border border-gray-300'>{content}</td>
{/snippet}

{#snippet wfmsConfigHeader(content)}
    <td class='font-bold px-2 py-2 border border-gray-300'>{content}</td>
{/snippet}

{#snippet wfmsConfigTable(title, configArray)}
    <h2 class='mt-4 text-base font-bold'>{title} ({configArray.length})</h2>
    <table class='table-auto text-sm'>
        <thead>
            <tr>
                {@render wfmsConfigHeader('Numb')}
                {@render wfmsConfigHeader('Key')}
                {@render wfmsConfigHeader('Value')}
                {@render wfmsConfigHeader('Options')}
            </tr>
        </thead>
        <tbody>
            {#each configArray as cfg, n}
            <tr>
                {@render wfmsConfigRow(n+1)}
                {@render wfmsConfigRow(cfg.key)}
                {@render wfmsConfigRow(cfg.value)}
                {@render wfmsConfigRow(cfg.options.join(', '))}
            </tr>
            {/each}
        </tbody>
    </table>
{/snippet}