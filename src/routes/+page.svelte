<script>
    import Card from '$lib/svelte/Card.svelte'
    import P from '$lib/svelte/P.svelte'
    let { p } = $props()
</script>

<div class="border-2 border-black rounded overflow-hidden mt-4 mb-4 p-4">

<h1 class='text-2xl font-bold'>Wildland Fire Modeling System</h1>
<h2 class='text-lg font-bold>'>{new Date()}</h2>

<div class="border-2 border-black rounded overflow-hidden mt-4 mb-4 p-4">
    <a href="/ellipse"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-xlg text-sm px-5 py-2.5 focus:outline-none">
        Fire Ellipse</a>
    <a href="/clock"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-xlg text-sm px-5 py-2.5 focus:outline-none">
        Clock</a>
    <a href="/wfms"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-xlg text-sm px-5 py-2.5 focus:outline-none">
        WFMS Hierarchy</a>
</div>
</div>