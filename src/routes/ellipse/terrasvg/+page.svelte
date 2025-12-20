<script>
    import { onMount } from 'svelte'
    import { gxmlStr } from '$lib/gxml/gxmlStr'
    import {Terra} from './terra.js'

    function label(easting, northing, str, stroke='black') {
        const x = terra.x(easting)
        const y = terra.y(northing)
        els.push({el: 'text', x, y, stroke,
            'text-anchor': 'middle', 'font-family': 'sans-serif',
            'font-weight': 'light','font-size': 24,
        els: [{el: 'inner', content: str}]})
    }
    function tic(easting, northing, str, anchor='middle', stroke='grey') {
        const x = terra.x(easting)
        const y = terra.y(northing)
        els.push({el: 'text', x, y, stroke,
            'text-anchor': anchor, 'font-family': 'sans-serif',
            'font-weight': 'light','font-size': 12,
        els: [{el: 'inner', content: str}]})
    }

    // Define a viewport with a center point [easting, northing], a width and height,
    // and a scale factor, all in map units (i.e., feet, meters, etc)
    let easting = $state(1500)
    let northing = $state(8500)
    let width = $state(1000)
    let height = $state(1000)
    let scale = $state(1)
    let svg = $state({el:'svg', width: 1000, height: 1000, els:[]})
    let els = $state([])

    let terra = $state(new Terra(easting, northing, width, height, scale))

    function grid(els, t) {
        let x = t.x(t.easting)
        els.push({el:'line', x1:x, y1: t.y(t.north), x2:x, y2: t.y(t.south), stroke: 'black'})
        for(x=t.west; x<=t.east; x+=t.width/20) {
            els.push({el:'line', x1: t.x(x), y1: t.y(t.north), x2: t.x(x), y2: t.y(t.south), stroke: 'grey'})
            tic(x, t.north-5, x.toFixed(0))
            tic(x, t.south+5, x.toFixed(0))
        }
        let y = t.y(t.northing)
        els.push({el:'line', x1: t.x(t.west), y1:y, x2: t.x(t.east), y2:y, stroke: 'black'})
        for(y=t.south; y<=t.north; y+=t.height/20) {
            els.push({el:'line', x1: t.x(t.west), y1: t.y(y), x2: t.x(t.east), y2: t.y(y), stroke: 'grey'})
            tic(t.west+5, y, y.toFixed(0), 'start')
            tic(t.east-5, y, y.toFixed(0), 'end')
        }
    }
    function directions() {
        let fs = 24 / terra.scale // font size
        label(terra.easting, terra.north-fs, 'N')
        label(terra.east-fs, terra.northing, 'E')
        label(terra.west+fs, terra.northing, 'W')
        label(terra.easting, terra.south+fs, 'S')
        label(terra.west+fs, terra.north-fs, 'NW')
        label(terra.east-fs, terra.north-fs, 'NE')
        label(terra.west+fs, terra.south+fs, 'SW')
        label(terra.east-fs, terra.south+fs, 'SE')
    }
    function scaleUp() {
        scale = scale + 0.5
        update()
    }
    function scaleDown() {
        scale = Math.max(0.5, scale - 0.5)
        update()
    }

    function update() {
        terra = new Terra(easting, northing, width, height, scale)
        // Background field
        els = []
        els.push({el:'rect', x:0, y:0, width:terra.width, height:terra.height, stroke: 'black', fill:'green'})
        grid(els, terra)
        directions()
        svg = {el:'svg', width: 1000, height: 1000, els:els}

    }
    // SVG
	onMount( () => { update() })
</script>
<div class='border mx-4 my-4 px-4 py-4'>
    <div class='ml-4 mt-2 mb-2'>
        <button onclick={scaleUp}  type="button"
            class="border-2 border-green-500 rounded px-1 py-1">
            Scale Up
        </button>
        <button onclick={scaleDown}  type="button"
            class="border-2 border-green-500 rounded px-1 py-1">
            Scale Down
        </button>
    </div>

    <div>
        Scale={terra.scale}, Width={terra.width}, Height={terra.height}
    </div>
    <div>
        West={terra.west}, East={terra.east}, North={terra.north}, South={terra.south}
    </div>
    <div>
        Center=[{terra.easting}, {terra.northing}]
    </div>
    <div class='border mx-4 my-4 px-4 py-4'>
    {@html gxmlStr(svg)}
    </div>
</div>
