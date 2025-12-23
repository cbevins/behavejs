<script>
    import { gxmlStr } from '$lib/gxml/gxmlStr'
    import {Terra} from './Terra.js'

    let {easting='1500', northing='8500', width='1000', height='1000', scale='1',
        svgWidth='1000', svgHeight='1000'} = $props()
    easting = parseFloat(easting)
    northing = parseFloat(northing)
    width = parseFloat(width)
    height = parseFloat(height)
    scale = parseFloat(scale)
    svgHeight = parseFloat(svgHeight)
    svgWidth = parseFloat(svgWidth)

    let terra = $state(new Terra(easting, northing, scale, width, height,
        svgWidth, svgHeight))
    let svg = $state(terra.svg)

    function scaleUp() {
        scale = scale + 0.25
        terra = terra.rescale(scale)
        svg = terra.svg
    }

    function scaleDown() {
        if (scale > 0.25) {
            scale -= 0.25
            terra = terra.rescale(scale)
            svg = terra.svg
        }
    }
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
        Scale={scale}, Width={width}, Height={height}
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
