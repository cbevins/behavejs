<script>
    // Draws a fire ellipse with psi tic marks
    import { onMount } from 'svelte'
	import { fireEllipse, ellipseHeadDeg } from '../fireEllipse.js';
    import { gxmlStr } from '$lib/gxml/gxmlStr'
    import { gxmlFireEllipse, gxmlPsiTicks, gxmlText, gxmlFireEllipseSvg } from '../gxmlFireEllipse.js'
    
    let {radius='250', headRos='115.31', lwr='3.2', ignX='0', ignY='0', headDeg='0', minutes='1'} = $props()
    radius = parseFloat(radius)
    headRos= parseFloat(headRos)
    lwr = parseFloat(lwr)
    ignX = parseFloat(ignX )
    ignY = parseFloat(ignY)
    headDeg = parseFloat(headDeg)
    minutes = parseFloat(minutes)

    let betaEls = $state([])
    let thetaEls = $state([])
	let beta = $state(0)
    let actual = fireEllipse(headRos, lwr, ignX, ignY, headDeg, minutes, beta) 
    // Clone the ellipse scaled with an elapsed time to fill 90% the axis length
    let tscale = minutes * 0.9 * radius / actual.fDist / 2

    onMount( () => {
        const interval = setInterval(() => {
            headDeg = headDeg + 5
            if (headDeg >= 360) headDeg = 0

            // Create a new ellipse from scratch
            actual = fireEllipse(headRos, lwr, ignX, ignY, headDeg, minutes, beta) 
            // Clone the ellipse scaled with an elapsed time to fill 90% the axis length
            tscale = minutes * 0.9 * radius / actual.fDist / 2
            let ellipse = fireEllipse(headRos, lwr, ignX, ignY, headDeg, tscale, beta) 

            // Get gxml array with the fire ellipse axis and perimeter and the psi angle ticks
            // This drawing uses regular beta angle increments, which are very widely
            // spaced at the fire head and densly spaces at the fire back
            betaEls = gxmlFireEllipse(ellipse, radius)
            betaEls = gxmlPsiTicks(ellipse, betaEls, false)
            thetaEls = gxmlFireEllipse(ellipse, radius)
            gxmlPsiTicks(ellipse, thetaEls, true)
            
            let x1 = 10
            let x2 = 60
            for(let els of [betaEls, thetaEls]) {
                els.push(gxmlText(x1, -200, 'black',`Heading ${headDeg} &deg;`))
                els.push(gxmlText(x1, -180, 'black', `Head at [${ellipse.headX.toFixed(2)}, ${ellipse.headY.toFixed(2)}]`))
            }
		}, 1000)
	})

    // svg built-in ellipse
    // els.push({el:'ellipse', cx: g.gDist, cy: 0, rx: g.fDist, ry: g.hDist,
    //     stroke:'black', fill: 'none', transform: `rotate(${headDeg})`})
</script>
{@html gxmlFireEllipseSvg(radius, betaEls)}
{@html gxmlFireEllipseSvg(radius, thetaEls)}