<script>
    import Card from '$lib/svelte/Card.svelte'
    import P from '$lib/svelte/P.svelte'
    let { p } = $props()
</script>

{#snippet tocRow(route, title, brief)}
    <tr class='px-2 py-2 border border-gray-300'>
        <td class='px-2 py-2 border border-gray-300'>
        <a class='text-xl' href={route}>{title}</a></td>
        <td class='px-2 py-2 border border-gray-300'>{brief}</td>
    </tr>
{/snippet}

<div class="border-2 border-black rounded overflow-hidden mt-4 mb-4 p-4">

<h1 class='text-2xl font-bold'>Wildland Fire Modeling System</h1>
<h2 class='text-lg font-bold>'>{new Date()}</h2>

<div class="border-2 border-black rounded overflow-hidden mt-4 mb-4 p-4">
    <table class='ml-4 table-auto text-sm'>
        <tbody>
            {@render tocRow('/ellipse/catchpole', 'Catchpole Fig 3',
                'Interactive version of Catchpole (1982) Fig 3, Quantites involved in the elliptical fire model.')}
            {@render tocRow('/ellipse/betaPsi', 'Beta v Psi',
                'Comparison of elliptical fire growth using beta v psi.')}
            {@render tocRow('/ellipse/terrasvg', 'Terra SVG',
                'Geographic mapper for creating SVGs.')}
            {@render tocRow('/clock', 'Clock', 'Svelte playground example')}
            {@render tocRow('/wfms', 'WFMS Hierarchy', 'Deprecated WFMS DagNode hierarchy')}
        </tbody>
    </table>
</div>
</div>