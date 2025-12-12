<script>
    export let ggp = null   // '1', '2', ...
    export let sup = null
    export let life = null

    function ord(n) {
        if (n === '1') return 'st'
        if (n === '2') return 'nd'
        if (n === '3') return 'rd'
        return 'th'
    }
</script>

<span class='font-bold'>
    <slot></slot>
    {#if ggp}
        <sup>{ggp}<sup>{ord(ggp)}</sup></sup>
    {/if}
    {#if sup}
        <sup>{sup}</sup>
    {/if}
    {#if life}
        ({life})
    {/if}
</span>