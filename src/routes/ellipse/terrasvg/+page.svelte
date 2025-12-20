<script>
    import { gxmlStr } from '$lib/gxml/gxmlStr'

    function label(easting, northing, str, stroke='black') {
        const x = terra.x(easting)
        const y = terra.y(northing)
        els.push({el: 'text', x, y, stroke,
            'text-anchor': 'middle', 'font-family': 'sans-serif',
            'font-weight': 'light','font-size': terra.scale*24,
        els: [{el: 'inner', content: str}]})
    }
    function tic(easting, northing, str, anchor='middle', stroke='black') {
        const x = terra.x(easting)
        const y = terra.y(northing)
        els.push({el: 'text', x, y, stroke,
            'text-anchor': anchor, 'font-family': 'sans-serif',
            'font-weight': 'light','font-size': terra.scale*12,
        els: [{el: 'inner', content: str}]})
    }

    // Define a viewport with a center point [easting, northing], a width and height,
    // and a scale factor, all in map units (i.e., feet, meters, etc)
    const terra = {width: 1000, height: 1000, easting: 1500, northing: 8500, scale: 1}
    // Viewport boundaries depend entirely upon the current center and scale
    terra.north = terra.northing + terra.height/2/terra.scale
    terra.south = terra.northing - terra.height/2/terra.scale
    terra.west = terra.easting - terra.width/2/terra.scale
    terra.east = terra.easting + terra.width/2/terra.scale
    terra.x = function(easting) { return this.scale*(easting - this.west) }
    terra.y = function(northing) { return this.scale*(this.north - northing) }
    terra.xy = function(easting, northing) { return [this.x(easting), this.y(northing)]}

    function grid(els, t) {
        let x = t.x(t.easting)
        els.push({el:'line', x1:x, y1: t.y(t.north), x2:x, y2: t.y(t.south), stroke: 'black'})
        for(x=t.west; x<=t.east; x+=t.width/20) {
            els.push({el:'line', x1: t.x(x), y1: t.y(t.north), x2: t.x(x), y2: t.y(t.south), stroke: 'grey'})
            tic(x, t.north-10, x.toFixed(0))
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

    // SVG
    const els = []
    // Background field
    els.push({el:'rect', x:0, y:0, width:terra.width, height:terra.height, stroke: 'black', fill:'green'})
    grid(els, terra)
    // Directions
    let fs = 24 // font size
    label(terra.easting, terra.north-fs, 'N')
    label(terra.east+fs, terra.northing, 'W')
    label(terra.west-fs, terra.northing, 'E')
    label(terra.easting, terra.south+fs, 'S')
    label(terra.west+fs, terra.north-fs, 'NW')
    label(terra.east-fs, terra.north-fs, 'NE')
    label(terra.west+fs, terra.south+fs, 'SW')
    label(terra.east-fs, terra.south+fs, 'SE')
    let svg = {el:'svg', width: 1000, height: 1000, els:els}
</script>
Terra SVG
<div class='border mx-4 my-4 px-4 py-4'>
    {@html gxmlStr(svg)}
</div>
