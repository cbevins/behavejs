<script>
    import { WfmsTwoFuels } from '$lib/index.js'
    import { wfmsConfigTable } from '$lib/snippets/WfmsConfigTable.svelte'
    import { wfmsNodeTable } from '$lib/snippets/WfmsNodeTable.svelte'
    let { wfms } = $props()   // Array of nested TreeNode instances
</script>

<div class='mx-4 my-4'>
    {@render wfmsConfigTable('Active Configurations', wfms.activeConfigsByKey())}
    {@render wfmsNodeTable('Selected Nodes', wfms.selectedByKey())}
    {@render wfmsNodeTable('Active Inputs Nodes', wfms.activeInputsByKey())}
    <!-- {@render wfmsNodeTable('Active Nodes', wfms.activeNodesByKey())} -->
    {@render wfmsNodeTable('All Nodes', wfms.nodesByKey())}
</div>