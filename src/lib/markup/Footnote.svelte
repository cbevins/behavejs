<script>
    export let chapter = 'footnote'
    export let num = 1
    const href = '#' + ['footnote', chapter, num].join('-')
</script>

<span class='text-xs'>
[<a href={href}>Note {num}</a>]
</span>