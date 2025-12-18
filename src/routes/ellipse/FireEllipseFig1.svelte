<script>
    import { onMount } from 'svelte'
    import { gxmlStr } from '$lib/gxml/gxmlStr'
	import { fireEllipse, ellipseBeta } from './fireEllipse.js';
    import { gxmlFireEllipse, gxmlBetaThetaPsi, gxmlText, gxmlFireEllipseSvgQtr } from './gxmlFireEllipse.js'
    
    let {radius='250'} = $props()
    radius = parseFloat(radius)
    let els = $state([])
	let beta = $state(0)
    let count = $state(0)
    let runState = $state(true)
    let runLabel = $state('Pause')
    let dirState = $state(true)
    let dirLabel = $state('Backward')
    let lwr = $state(3.2)

    // Create a fire ellipse object with desired parameters
    let headRos = 115.31 // 115.31
    let ignX = 0
    let ignY = 0
    let headDeg = 0
    let minutes = 1
    let betaDeg = 10

    let actual = fireEllipse(headRos, lwr, ignX, ignY, headDeg, minutes, betaDeg) 
   // Clone the ellipse scaled with an elapsed time to fill 90% the axis length
    let tscale = minutes * 0.9 * radius / actual.fDist / 2

    function dirControl() {
        dirState = !dirState
        dirLabel = dirState ? 'Reverse' : 'Forward'
    }
    function runControl() {
        runState = !runState
        runLabel = runState ? 'Pause' : 'Run'
    }
    function lwrUp() {
        lwr = Math.max(1, lwr + 0.2)
        ellipse = {...ellipse, lwr}
    }
    function lwrDown() {
        lwr = Math.max(1, lwr - 0.2)
        ellipse = {...ellipse, lwr}
    }
	onMount( () => {
		const interval = setInterval(() => {
            if(!runState) return
            let step = dirState ? 5 : -5
	        beta = beta + step
            if (beta >= 360) beta = 0
            if (beta < 0) beta = 360
            // Clone the ellipse scaled with an elapsed time to fill 90% the axis length
            actual = fireEllipse(headRos, lwr, ignX, ignY, headDeg, minutes, beta) 
            tscale = minutes * 0.9 * radius / actual.fDist / 2
            let ellipse = fireEllipse(headRos, lwr, ignX, ignY, headDeg, tscale, beta) 
            // Get gxml array with the fire ellipse axis and perimeter
            els = gxmlFireEllipse(ellipse, radius)
            // and the beta-theta-psi vectors
            gxmlBetaThetaPsi(ellipse, els)
            let x1 = 10
            let x2 = 60
            els.push(gxmlText(x1, -220, 'black',`L/W`))
            els.push(gxmlText(x2, -220, 'black',`${lwr.toFixed(2)}`))
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
<div class='ml-4'>
    <button onclick={runControl}  type="button"
        class="border-2 border-green-500 rounded px-1 py-1 outline-2 outline-offset-2 outline-blue-500">
        {runLabel}
    </button>
    <button onclick={dirControl}  type="button"
        class="border-2 border-green-500 rounded px-1 py-1 outline-2 outline-offset-2 outline-blue-500">
        {dirLabel}
    </button>
    <button onclick={lwrUp}  type="button"
        class="border-2 border-green-500 rounded px-1 py-1 outline-2 outline-offset-2 outline-blue-500">
        L/W +0.2
    </button>
    <button onclick={lwrDown}  type="button"
        class="border-2 border-green-500 rounded px-1 py-1 outline-2 outline-offset-2 outline-blue-500">
        L/W -0.2
    </button>
</div>
{@html gxmlFireEllipseSvgQtr(radius, els)}
