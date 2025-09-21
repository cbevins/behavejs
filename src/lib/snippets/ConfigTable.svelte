<script module>
    export {configTable}
</script>

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