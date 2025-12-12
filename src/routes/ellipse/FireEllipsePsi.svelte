<script>
    import { gxmlStr } from '$lib/gxml/gxmlStr'
    import { gxmlFireEllipse, gxmlPsiTicks, gxmlFireEllipseSvg } from './gxmlFireEllipse.js'
    
    let {ellipse, radius='250'} = $props()
    radius = parseFloat(radius)

    // Get gxml array with the fire ellipse axis and perimeter
    // and the psi angle ticks
    const els = gxmlFireEllipse(ellipse, radius)
    gxmlPsiTicks(ellipse, els)

    // svg built-in ellipse
    // els.push({el:'ellipse', cx: g.gDist, cy: 0, rx: g.fDist, ry: g.hDist,
    //     stroke:'black', fill: 'none', transform: `rotate(${headDeg})`})
</script>
{@html gxmlFireEllipseSvg(radius, els)}
