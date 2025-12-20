<script>
    import { onMount } from 'svelte'
    import { gxmlStr } from '$lib/gxml/gxmlStr'
	import { fireEllipse, ellipseBeta } from '../fireEllipse.js';
    import { gxmlFireEllipse, gxmlBetaThetaPsi, gxmlText, gxmlFireEllipseSvgQtr } from '../gxmlFireEllipse.js'
    import { FireEllipseEquations as FE, radians } from '../FireEllipseEquations.js'
    import FireEllipseTable from '../FireEllipseTable.svelte'
    
    let {radius='250', headRos='115.31', lwr='3.2', ignX='0', ignY='0', headDeg='0', minutes='1'} = $props()
    radius = parseFloat(radius)
    headRos= parseFloat(headRos)
    lwr = parseFloat(lwr)
    ignX = parseFloat(ignX )
    ignY = parseFloat(ignY)
    headDeg = parseFloat(headDeg)
    minutes = parseFloat(minutes)

    let els = $state([])
	let beta = $state(0)
    let runState = $state(true)
    let runLabel = $state('Pause')
    let dirState = $state(true)
    let dirLabel = $state('Backward')

    let actual = fireEllipse(headRos, lwr, ignX, ignY, headDeg, minutes, beta) 
    // Clone the ellipse scaled with an elapsed time to fill 90% the axis length
    let tscale = minutes * 0.9 * radius / actual.fDist / 2
    let ellipse = fireEllipse(headRos, lwr, ignX, ignY, headDeg, tscale, beta) 

    function dirControl() {
        dirState = !dirState
        dirLabel = dirState ? 'Backward' : 'Forward'
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
    function docLine(y, stroke, str1, str2){
        els.push(gxmlText(10, y, stroke, str1))
        els.push(gxmlText(60, y, stroke, str2))
    }
    function label(x, y, str, stroke='black') {
        els.push({el: 'text', x, y, stroke,
            'text-anchor': 'start', 'font-family': 'sans-serif',
            'font-weight': 'light','font-size': 12,
        els: [{el: 'inner', content: str}]})
    }

	onMount( () => {
		const interval = setInterval(() => {
            if(!runState) return
            let step = dirState ? 5 : -5
	        beta = beta + step
            if (beta >= 360) beta = 0
            if (beta < 0) beta = 360 + beta

            // Create a new ellipse from scratch
            actual = fireEllipse(headRos, lwr, ignX, ignY, headDeg, minutes, beta) 
            // Clone the ellipse scaled with an elapsed time to fill 90% the axis length
            tscale = minutes * 0.9 * radius / actual.fDist / 2
            ellipse = fireEllipse(headRos, lwr, ignX, ignY, headDeg, tscale, beta) 
            // Get gxml array with the fire ellipse axis and perimeter
            els = gxmlFireEllipse(ellipse, radius)
            // and add the beta-theta-psi vectors
            gxmlBetaThetaPsi(ellipse, els)

            // Labels
            label(-40, 0, 'Back')
            label(230, 0, 'Head')
            label(80, -40, 'Flank')
            label(110, 10, '&Theta;', 'green')
            els.push({el:'circle', cx: ellipse.cX, cy: ellipse.cY, r: 20,
                stroke: 'green', fill: 'none', pathlength: 360,
                'stroke-dasharray': `${ellipse.thetaDeg} ${360-ellipse.thetaDeg}`})

            // Beta label and arc
            label(5, 10, '&beta;', 'magenta')
            els.push({el:'circle', cx: ellipse.ignX, cy: ellipse.ignY, r: 20,
                stroke: 'magenta', fill: 'none', pathlength: 360,
                'stroke-dasharray': `${ellipse.betaDeg} ${360-ellipse.betaDeg}`})

            // Psi label and arc
            const px = ellipse.betaX + 5// + 10 * Math.cos(radians(ellipse.psiDeg))
            const py = ellipse.betaY + 10 //* Math.sin(radians(ellipse.psiDeg))
            label(px, py, '&psi;', 'blue')
            els.push({el:'circle', cx: ellipse.betaX, cy: ellipse.betaY, r: 20,
                stroke: 'blue', fill: 'none', pathlength: 360,
                'stroke-dasharray': `${ellipse.psiDeg} ${360-ellipse.psiDeg}`})
            
            docLine(-220, 'black', 'L/W', `${lwr.toFixed(2)}`)
            docLine(-200, 'magenta', 'Beta', `${beta} &deg;`)
            docLine(-180, 'green', 'Theta', `${ellipse.thetaDeg.toFixed(2)} &deg;`)
            docLine(-160, 'blue', 'Psi', `${ellipse.psiDeg.toFixed(2)} &deg;`)
            docLine(-140, 'cyan', 'Perim', `[${ellipse.betaX.toFixed(2)}, ${ellipse.betaY.toFixed(2)}]`)
            docLine(-120, 'black', 'Head', `[${ellipse.headX.toFixed(2)}, ${ellipse.headY.toFixed(2)}]`)
		}, 1000)
	})
</script>

<div class="ml-4 border pt-1">
    <div class='ml-4 mt-2 mb-2'>
        <button onclick={runControl}  type="button"
            class="border-2 border-green-500 rounded px-1 py-1">
            {runLabel}
        </button>
        <button onclick={dirControl}  type="button"
            class="border-2 border-green-500 rounded px-1 py-1">
            {dirLabel}
        </button>
        <button onclick={lwrUp}  type="button"
            class="border-2 border-green-500 rounded px-1 py-1">
            L/W +0.2
        </button>
        <button onclick={lwrDown}  type="button"
            class="border-2 border-green-500 rounded px-1 py-1">
            L/W -0.2
        </button>
    </div>

    <div class="border px-1 py-1">
        {@html gxmlFireEllipseSvgQtr(radius, els)}
    </div>

    <div class="border px-1 py-1">
        <div>
            Catchpole (1982) Fig 3: 'Quantites involved in the elliptical fire model.'
        </div>
    </div>
</div>
<FireEllipseTable {ellipse}/>
