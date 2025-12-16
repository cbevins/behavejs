<script>
    // Draws a fire ellipse with psi tic marks
    import { onMount } from 'svelte'
	import { ellipseHeadDeg } from './fireEllipse.js';
    import { gxmlStr } from '$lib/gxml/gxmlStr'
    import { gxmlFireEllipse, gxmlPsiTicks, gxmlText, gxmlFireEllipseSvg } from './gxmlFireEllipse.js'
    
    let {ellipse, radius='250'} = $props()
    radius = parseFloat(radius)
    let betaEls = $state([])
    let thetaEls = $state([])
	let headDeg = $state(30)
    let e = $state({...ellipse})

    onMount( () => {
        const interval = setInterval(() => {
            headDeg = headDeg + 5
            if (headDeg >= 360) headDeg = 0
            ellipseHeadDeg(e, headDeg)
             // Get gxml array with the fire ellipse axis and perimeter and the psi angle ticks
            // This drawing uses regular beta angle increments, which are very widely
            // spaced at the fire head and densly spaces at the fire back
            betaEls = gxmlFireEllipse(e, radius)
            betaEls = gxmlPsiTicks(e, betaEls, false)
            thetaEls = gxmlFireEllipse(e, radius)
            gxmlPsiTicks(e, thetaEls, true)
            
            let x1 = 10
            let x2 = 60
            for(let els of [betaEls, thetaEls]) {
                els.push(gxmlText(x1, -200, 'black',`Heading ${headDeg} &deg;`))
                els.push(gxmlText(x1, -180, 'black', `Head at [${e.headX.toFixed(2)}, ${e.headY.toFixed(2)}]`))
            }
		}, 1000)
	})

    // svg built-in ellipse
    // els.push({el:'ellipse', cx: g.gDist, cy: 0, rx: g.fDist, ry: g.hDist,
    //     stroke:'black', fill: 'none', transform: `rotate(${headDeg})`})
</script>
{@html gxmlFireEllipseSvg(radius, betaEls)}
{@html gxmlFireEllipseSvg(radius, thetaEls)}
