<script>
	import { Paths as P } from '$lib/index.js'
    import { Wfms } from '$lib/index.js'

    // Step 1 - create the Behave Dag
    const wfms = new Wfms()
    const dag = wfms.dag
    console.log('REFRESHED :', new Date())

    // Step 2 - configure the DAG
    wfms.setConfig([
        [P.cfgCanopy,       ["height-base","ratio-height","height-length",
                            "ratio-base","ratio-length","length-base"][0]],
        [P.cfgEffWind,      ["applied","not applied"][0]],
        [P.cfgCured,        ["input","estimated"][1]],
        [P.cfgWsrf,         ["input","estimated"][0]],
        [P.cfgWindSpeed,    ["input","estimated"][0]],
        [P.cfgMoisDead,     ["particle","category"][0]],
        [P.cfgMoisLive,     ["particle","category"][0]],
        [P.cfgStdInput1,    ["catalog","custom"][0]],
        [P.cfgFuelDomain1,  ["standard","chaparral","palmetto","aspen"][0]],
        [P.cfgSlopeDir,     ["up-slope","down-slope"][1]],
        [P.cfgSlopeSteep,   ["ratio","degrees","map"][0]],
        [P.cfgWindSpeed,    ["at 20-ft","at 10-m"][0]],
        [P.cfgWindDir,      ["source from north","heading from up-slope","up-slope"][0]],
    ])

    // Step 3 - select outputs
    const bulk    = dag.nodeRef('primary/bed/bulk density')
    const cured   = dag.nodeRef('weather/curing/fraction/applied')
    const rosHead = dag.nodeRef('primary/fire/heading/spread rate')
    const rosDirUp  = dag.nodeRef('primary/fire/heading/direction/from up-slope')
    const rosDirNo  = dag.nodeRef('primary/fire/heading/direction/from north')
    // Can mix and match node keys and references, as scalaras or arrays
    dag.select(bulk, [cured, 'primary/fire/heading/spread rate'], rosDirUp, rosDirNo)

    // Step 3 - get active configurations and inputs
    const activeConfigs = dag.activeConfigsByKey()

    // Step 3 - set inputs
    const key        = dag.nodeRef('primary/model/standard/key')
    const midflame   = dag.nodeRef('primary/wind/speed/midflame')
    const aspect     = dag.nodeRef('terrain/slope/direction/down-slope')
    const upslope    = dag.nodeRef('terrain/slope/direction/up-slope')
    const slopeRatio = dag.nodeRef('terrain/slope/steepness/ratio')
    const mois1      = dag.nodeRef('weather/moisture/dead/1-h')
    const mois10     = dag.nodeRef('weather/moisture/dead/10-h')
    const mois100    = dag.nodeRef('weather/moisture/dead/100-h')
    const moisHerb   = dag.nodeRef('weather/moisture/live/herb')
    const moisStem   = dag.nodeRef('weather/moisture/live/stem')
    const windFromNorth = dag.nodeRef('weather/wind/direction/source/from north')
    const windHeadUpslp = dag.nodeRef('weather/wind/direction/heading/from up-slope')
    dag.set(key, '10')
    dag.set(midflame, 880)
    dag.set(mois1, 0.05)
    dag.set(mois10, 0.07)
    dag.set(mois100, 0.09)
    dag.set(moisHerb, 0.5)
    dag.set(moisStem, 1.5)
    dag.set(slopeRatio, 0.25)
    dag.set(aspect, 180)
    dag.set(windFromNorth, 270)

    // Step 4 - get updated values of selected nodes
    dag.updateAll()
</script>

<div class='mx-4 my-4'>
<h1 class='text-2xl font-bold>'>Wildland Fire Modeling System</h1>
<h1 class='text-lg font-bold>'>{new Date()}</h1>

{@render nodeTable('Selected Nodes', dag.selectedByKey())}
{@render nodeTable('Active Inputs Nodes', dag.activeInputsByKey())}
<!-- {@render nodeTable('Active Nodes', dag.activeNodesByKey())} -->
{@render nodeTable('All Input Nodes', dag.activeInputsByKey())}
{@render configTable('Active Configurations', dag.activeConfigsByKey())}
{@render nodeTable('All Nodes', dag.nodesByKey())}

<!-- nodeTable Snippet -->
{#snippet nodeRow(content)}
    <td class='px-2 py-2 border border-gray-300'>{content}</td>
{/snippet}
{#snippet nodeHeader(content)}
    <td class='font-bold px-2 py-2 border border-gray-300'>{content}</td>
{/snippet}
{#snippet nodeTable(title, nodeArray)}
<h2 class='mt-4 text-base font-bold'>{title} ({nodeArray.length})</h2>
<table class='table-auto text-sm'>
    <thead>
        <tr>
            {@render nodeHeader('Numb')}
            {@render nodeHeader('Key')}
            {@render nodeHeader('Value')}
            {@render nodeHeader('Status')}
            {@render nodeHeader('Dirty')}
            {@render nodeHeader('Updater')}
        </tr>
    </thead>
    <tbody>
        {#each nodeArray as node, n}
        <tr>
            {@render nodeRow(n+1)}
            {@render nodeRow(node.key)}
            {@render nodeRow(node.value)}
            {@render nodeRow(node.status)}
            {@render nodeRow(node.dirty)}
            {@render nodeRow(node.updater.name)}
        </tr>
        {/each}
    </tbody>
</table>
{/snippet}
<!-- END nodeTable Snippet -->


<!-- configTable Snippet -->
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
<!-- END configTable Snippet -->

</div>