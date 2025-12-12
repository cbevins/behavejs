<script>
    import Card from '$lib/svelte/Card.svelte'
    import P from '$lib/svelte/P.svelte'
    import FireEllipse from './FireEllipse.svelte'
    let { p } = $props()
</script>
<Card>
    <h1 class='text-2xl font-bold'>Fire Ellipse</h1>
    <h2 class='text-lg font-bold>'>{new Date()}</h2>
</Card>
<FireEllipse/>
