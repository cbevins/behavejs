<script>
    // Draws a fire ellipse with psi tic marks
    import { gxmlStr } from '$lib/gxml/gxmlStr'
    import { gxmlFireEllipse, gxmlPsiTicks, gxmlFireEllipseSvg } from './gxmlFireEllipse.js'
    
    let {ellipse, radius='250'} = $props()
    radius = parseFloat(radius)

    // Get gxml array with the fire ellipse axis and perimeter and the psi angle ticks

    // This drawing uses regular beta angle increments, which are very widely
    // spaced at the fire head and densly spaces at the fire back
    const betaEls = gxmlFireEllipse(ellipse, radius)
    gxmlPsiTicks(ellipse, betaEls, false)

    const thetaEls = gxmlFireEllipse(ellipse, radius)
    gxmlPsiTicks(ellipse, thetaEls, true)

    // svg built-in ellipse
    // els.push({el:'ellipse', cx: g.gDist, cy: 0, rx: g.fDist, ry: g.hDist,
    //     stroke:'black', fill: 'none', transform: `rotate(${headDeg})`})
</script>
{@html gxmlFireEllipseSvg(radius, betaEls)}
{@html gxmlFireEllipseSvg(radius, thetaEls)}
