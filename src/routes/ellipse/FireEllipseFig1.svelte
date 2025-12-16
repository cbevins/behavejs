<script>
    import { onMount } from 'svelte';
    import { gxmlStr } from '$lib/gxml/gxmlStr'
	import { ellipseBeta } from './fireEllipse.js';
    import { gxmlFireEllipse, gxmlBetaThetaPsi, gxmlFireEllipseSvgQtr } from './gxmlFireEllipse.js'
    
    let {ellipse, radius='250'} = $props()
    radius = parseFloat(radius)
    let els = $state([])
	let beta = $state(0)

    function gxmlText(x, y, stroke, str) {
        return {el: 'text', x, y, stroke,
            'text-anchor': 'start',
            'font-family': 'sans-serif',
            'font-weight': 'normal',
            'font-size': 14,
            els: [{el: 'inner', content: str}]
        }
    }

	onMount( () => {
		const interval = setInterval(() => {
	        beta = beta + 5
            if (beta >= 360) beta = 0
            ellipseBeta(ellipse, beta)
            // Get gxml array with the fire ellipse axis and perimeter
            els = gxmlFireEllipse(ellipse, radius)
            // and the beta-theta-psi vectors
            gxmlBetaThetaPsi(ellipse, els)
            els.push(gxmlText(10, -200, 'magenta',`Beta ${beta} deg`))
            els.push(gxmlText(10, -180, 'green', `Theta ${ellipse.thetaDeg.toFixed(2)} deg`))
            els.push(gxmlText(10, -160, 'blue', `Psi ${ellipse.psiDeg.toFixed(2)} deg`))
		}, 1000)
	})

</script>
{@html gxmlFireEllipseSvgQtr(radius, els)}
