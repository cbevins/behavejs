<script>
    import TreeView from '$lib/svelte/TreeView.svelte'
    let { wfms } = $props()
    console.clear()
    console.log(wfms.configObj)

    // This automates building the tree data structure
    const items = []
    traverse(wfms.configObj, items)
    function traverse(obj, items, pid='', depth=0) {
        for(let key of Object.keys(obj)) {
            console.log('traverse', depth, key)
            const prop = obj[key]
            const id = pid + key + '/'
            if (prop.key) {  // if this is a leaf object
                const item = {id, label: key, config: prop}
                items.push(item)
            } else { // this is a branch object
                const item = {id, label: key, children: []}
                traverse(prop, item.children, id, depth+1)
                items.push(item)
            }
        }
    }
    console.log('Items=', items)

    // This builds a customized tree data structure
    function ucfirst(str) {
        if (typeof str !== 'string' || str.length === 0) return str
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    const {canopy, ellipse, moisture, slope, surface, terrain, wind} = wfms.configObj
    const {primary, secondary} = surface
    const treeData = [
        {id: 'a', label: 'Surface', children: [
            { id: 'b', label: 'Primary', children: [
                { id: 'c', label: ucfirst(primary.fuel.prompt)},
                { id: 'd', label: ucfirst(primary.standard.prompt) }]
            },
            { id: 'e', label: 'Secondary', children: [
                { id: 'f', label: 'Fuel Domain' },
                { id: 'g', label: 'Standard' }]
            },
            { id: 'h', label: 'Curing Fraction'},
            { id: 'i', label: 'Midflame Wind Speed'},
            { id: 'j', label: 'Weighting'},
            { id: 'k', label: 'Wind Limit'},
            { id: 'l', label: 'Wind Speed Reduction Factor'},
        ]},
        { id: '2', label: 'Ellipse', children: [
            { id: '2.1', label: 'Link'},
            { id: '2.2', label: 'Vector'}],
        },
        { id: '3', label: 'Wind', children: [
            { id: '3.1', label: 'Direction'},
            { id: '3.2', label: 'Speed'}],
        },
        { id: '4', label: 'Slope', children: [
            { id: '4.1', label: 'Direction'},
            { id: '4.2', label: 'Steepness'}],
        },
        { id: '5', label: 'Moisture', children: [
            { id: '5.1', label: 'Dead Fuel'},
            { id: '5.2', label: 'Live Fuel'}],
        },
        { id: '6', label: 'Canopy', children: [
            { id: '6.1', label: 'Height'}],
        },
    ]

    function handleNodeToggle(event) {
        console.log('Node toggled:', event.detail);
    }

    function handleNodeSelect(event) {
        console.log('Node selected:', event.detail);
    }
</script>

<div class='mx-4 my-4'>
    <TreeView data={items} on:toggle={handleNodeToggle} on:select={handleNodeSelect} />
</div>