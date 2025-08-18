<script>
	import { rxi } from '$lib/bp6/standardKeys';
    import { Dag, L, P, Util } from '$lib/modules/index.js'
    import { surfaceNodes } from '$lib/modules/index.js'
    const configFm010Fm124 = [
        ['configure.fire.effectiveWindSpeedLimit', ['applied', 'ignored'][0]],
        ['configure.fire.firelineIntensity', ['firelineIntensity', 'flameLength'][1]],
        ['configure.fire.lengthToWidthRatio', ['lengthToWidthRatio', 'effectiveWindSpeed'][0]],
        ['configure.fire.weightingMethod', ['arithmetic', 'expected', 'harmonic'][2]],
        ['configure.fire.vector', ['fromHead', 'fromUpslope', 'fromNorth'][2]],
        ['configure.fuel.chaparralTotalLoad', ['input', 'estimated'][0]],
        ['configure.fuel.curedHerbFraction', ['input', 'estimated'][1]],
        ['configure.fuel.moisture', ['individual', 'liveCategory', 'category', 'catalog'][0]],
        ['configure.fuel.primary', ['catalog', 'behave', 'chaparral', 'palmettoGallberry', 'westernAspen'][0]],
        ['configure.fuel.secondary', ['none', 'catalog', 'behave', 'chaparral', 'palmettoGallberry', 'westernAspen'][1]],
        ['configure.fuel.windSpeedAdjustmentFactor', ['input', 'estimated'][0]],
        ['configure.slope.steepness', ['ratio', 'degrees', 'map'][0]],
        ['configure.wind.direction', ['sourceFromNorth', 'headingFromUpslope', 'upslope'][0]],
        ['configure.wind.speed', ['at10m', 'at20ft', 'atMidflame'][2]]
    ]

    const inputFm010Fm124 = [
        ['site.fire.time.sinceIgnition', [60]],
        ['site.fire.vector.fromNorth', [45]],
        ['site.map.scale', [24000]],
        ['site.moisture.dead.tl1h', [0.05]],
        ['site.moisture.dead.tl10h', [0.07]],
        ['site.moisture.dead.tl100h', [0.09]],
        ['site.moisture.dead.category', [0.05]],
        ['site.moisture.live.herb', [0.5]],
        ['site.moisture.live.stem', [1.5]],
        ['site.moisture.live.category', [1.5]],
        ['site.slope.direction.aspect', [180]],
        ['site.slope.steepness.ratio', [0.25]],
        ['site.temperature.air', [95]],
        ['site.terrain.spotSourceLocation', ['ridgeTop']],
        ['site.terrain.ridgeValleyDistance', [5000]],
        ['site.terrain.ridgeValleyElevation', [1000]],
        ['site.wind.direction.source.fromNorth', [270]],
        ['site.windSpeedAdjustmentFactor', [0.5]],
        ['site.wind.speed.atMidflame', [880]],
        ['surface.primary.fuel.model.catalogKey', ['10']],
        ['surface.secondary.fuel.model.catalogKey', ['124']],
        ['surface.weighted.fire.primaryCover', [0.6]]
    ]

    const nodeDefs = surfaceNodes()
    const nodeDefsMap = Util.nodesToMap(nodeDefs)
    const dag = new Dag(nodeDefsMap)

    const selected= [
        P.fuel1+L.fmdepth,
        P.bed1+L.load,
        P.bed1+L.savr,
        P.bed1+L.bulk,
        P.bed1+L.beta,
        P.bed1+L.bopt,
        P.bed1+L.bratio,
        P.bed1+L.ehn,
        P.bed1+L.qig,
        P.bed1+L.rxve,
        P.bed1+L.rxvm,
        P.bed1+L.rxvo,
        P.bed1+L.xi,
        P.dead1+L.etam,
        P.dead1+L.etas,
        P.fire1+L.rxi,
        P.fire1+L.hsink,
        P.fire1+L.hsrc,
        P.fire1+L.ros0,
        P.bed1+L.wmid,
        P.bed1+L.wndb,
        P.bed1+L.wndc,
        P.bed1+L.wnde,
        P.bed1+L.wndk,
        P.bed1+L.phiw,
        P.bed1+L.phis,
        P.bed1+L.phie,
        P.bed1+L.weff,
        P.fire1+L.rosmax]
    dag.select(selected)

    const alias = '10'
    dag.set(P.fuel1+L.fmalias, alias)
    dag.set(P.moisture+L.m1, 0.05)
    dag.set(P.moisture+L.m10, 0.07)
    dag.set(P.moisture+L.m100, 0.09)
    dag.set(P.moisture+L.mherb, 0.5)
    dag.set(P.moisture+L.mstem, 1.5)
    dag.set(P.slope+L.srat, 0.25)
    dag.set(P.windmid1+L.wmid, 10*88)


    const depth = dag.get(P.fuel1+L.fmdepth)
    const rosmax = dag.get(P.fire1+L.rosmax)
</script>

<div class='mx-4 my-4'>
<h1 class='text-2xl font-bold>'>BehaveJS - {new Date()}</h1>

{#snippet nodeTable(title, nodeArray)}
<h2 class='mt-4 text-base font-bold'>{title} ({nodeArray.length})</h2>
<table class='table-auto text-sm'>
    <thead>
        <tr>
            <td class='font-bold px-2 py-2 border border-gray-300'>Key</td>
            <td class='font-bold px-2 py-2 border border-gray-300'>Value</td>
            <td class='font-bold px-2 py-2 border border-gray-300'>Status</td>
            <td class='font-bold px-2 py-2 border border-gray-300'>Dirty</td>
            <td class='font-bold px-2 py-2 border border-gray-300'>Updater</td>
        </tr>
    </thead>
    <tbody>
        {#each nodeArray as node}
        <tr>
            <td class='px-2 py-2 border border-gray-300'>{node.key}</td>
            <td class='px-2 py-2 border border-gray-300'>{node.value}</td>
            <td class='px-2 py-2 border border-gray-300'>{node.status}</td>
            <td class='px-2 py-2 border border-gray-300'>{node.dirty}</td>
            <td class='px-2 py-2 border border-gray-300'>{node.updater.name}</td>
        </tr>
        {/each}
    </tbody>
</table>
{/snippet}

{@render nodeTable('Selected Nodes', dag.selected())}
{@render nodeTable('Active Input Nodes', dag.activeInputs())}
{@render nodeTable('All Nodes', dag.nodes)}
</div>