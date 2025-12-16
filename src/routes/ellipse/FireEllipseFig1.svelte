<script>
    import { onMount } from 'svelte'
    import { gxmlStr } from '$lib/gxml/gxmlStr'
	import { ellipseBeta } from './fireEllipse.js';
    import { gxmlFireEllipse, gxmlBetaThetaPsi, gxmlText, gxmlFireEllipseSvgQtr } from './gxmlFireEllipse.js'
    
    let {ellipse, radius='250'} = $props()
    radius = parseFloat(radius)
    let els = $state([])
	let beta = $state(0)

	onMount( () => {
		const interval = setInterval(() => {
	        beta = beta + 5
            if (beta >= 360) beta = 0
            ellipseBeta(ellipse, beta)
            // Get gxml array with the fire ellipse axis and perimeter
            els = gxmlFireEllipse(ellipse, radius)
            // and the beta-theta-psi vectors
            gxmlBetaThetaPsi(ellipse, els)
            let x1 = 10
            let x2 = 60
            els.push(gxmlText(x1, -200, 'magenta',`Beta`))
            els.push(gxmlText(x2, -200, 'magenta',`${beta} &deg;`))
            els.push(gxmlText(x1, -180, 'green', `Theta`))
            els.push(gxmlText(x2, -180, 'green', `${ellipse.thetaDeg.toFixed(2)} &deg;`))
            els.push(gxmlText(x1, -160, 'blue', `Psi`))
            els.push(gxmlText(x2, -160, 'blue', `${ellipse.psiDeg.toFixed(2)} &deg;`))
            els.push(gxmlText(x1, -140, 'cyan', `Perim`))
            els.push(gxmlText(x2, -140, 'cyan', `[${ellipse.betaX.toFixed(2)}, ${ellipse.betaY.toFixed(2)}]`))
            els.push(gxmlText(x1, -120, 'black', `Head`))
            els.push(gxmlText(x2, -120, 'black', `[${ellipse.headX.toFixed(2)}, ${ellipse.headY.toFixed(2)}]`))
		}, 1000)
	})

</script>
{@html gxmlFireEllipseSvgQtr(radius, els)}
