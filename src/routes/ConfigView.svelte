<script>
    import TreeView from '$lib/svelte/TreeView.svelte'
    let { wfms } = $props()

    const treeData = [
        {id: '1', label: 'Surface', children: [
            { id: '1.1', label: 'Primary', children: [
                { id: '1.1.1', label: 'Fuel Domain' },
                { id: '1.1.2', label: 'Standard' }]
            },
            { id: '1.2', label: 'Secondary', children: [
                { id: '1.2.1', label: 'Fuel Domain' },
                { id: '1.2.2', label: 'Standard' }]
            },
            { id: '1.3', label: 'Curing Fraction'},
            { id: '1.4', label: 'Midflame Wind Speed'},
            { id: '1.5', label: 'Weighting'},
            { id: '1.6', label: 'Wind Limit'},
            { id: '1.7', label: 'Wind Speed Reduction Factor'},
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
         // this.configObj = {
        //     canopy: {
        //         height: this._set(new CanopyHeightConfig()),
        //     },
        //     ellipse: {
        //         link: this._set(new FireEllipseLinkConfig()),
        //         vector: this._set(new FireEllipseVectorConfig()),
        //     },
        //     moisture: {
        //         dead: this._set(new DeadFuelMoistureConfig()),
        //         live: this._set(new LiveFuelMoistureConfig()),
        //     },
        //     slope: {
        //         direction: this._set(new SlopeDirectionConfig()),
        //         steepness: this._set(new SlopeSteepnessConfig()),
        //     },
        //     surface: {
        //         curing: this._set(new LiveFuelCuringConfig()),
        //         midflame: this._set(new MidflameWindSpeedConfig()),
        //         primary: {
        //             fuel: this._set(new SurfacePrimaryFuelConfig()),
        //             standard: this._set(new SurfacePrimaryStandardConfig()),
        //         },
        //         secondary: {
        //             fuel: this._set(new SurfaceSecondaryFuelConfig()),
        //             standard: this._set(new SurfaceSecondaryStandardConfig()),
        //         },
        //         weighting: this._set(new SurfaceFireWtgConfig()),
        //         windLimit: this._set(new FireEffectiveWindLimitConfig()),
        //         wsrf: this._set(new WindSpeedReductionConfig()),
        //     },
        //     wind: {
        //         direction: this._set(new WindDirectionConfig()),
        //         speed: this._set(new WindSpeedConfig()),
        //     }
        // }

    function handleNodeToggle(event) {
        console.log('Node toggled:', event.detail);
    }

    function handleNodeSelect(event) {
        console.log('Node selected:', event.detail);
    }
</script>

<div class='mx-4 my-4'>
    <TreeView data={treeData} on:toggle={handleNodeToggle} on:select={handleNodeSelect} />
</div>