<script>
    import { WfmsTwoFuels } from '$lib/index.js'
    import ConfigView from './ConfigView.svelte'
    import TwoFuelsView from './TwoFuelsView.svelte'
    const wfms = new WfmsTwoFuels()
</script>

<h1 class='text-2xl font-bold'>Wildland Fire Modeling System</h1>
<h2 class='text-lg font-bold>'>{new Date()}</h2>

<ConfigView {wfms}/>
<TwoFuelsView {wfms}/>