<script>
    export let id
    export let depth
    export let newpage = false  // true if section at top of a new page
    export let title = ''
</script>

<!-- Add more space before this title -->
{#if ! newpage}
<div class="mt-4"></div>
{/if}

<div class='font-serif font-semibold'>
    {#if depth <= 1}
        <div id={id} class="text-2xl mt-3">{title}</div>
    {:else if depth === 2}
        <div id={id} class="text-xl mt-3">{title}</div>
    {:else if depth === 3}
        <div id={id} class="text-lg mt-3">{title}</div>
    {:else}
        <div id={id} class="text-lg mt-3 font-normal">{title}</div>
    {/if}
</div>