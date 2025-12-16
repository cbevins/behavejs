<script>
    import { CompassEquations as Compass } from './CompassEquations.js';
    import { fireEllipse, ellipseBeta } from './fireEllipse.js'
    import FireEllipseFig1 from './FireEllipseFig1.svelte'
    import FireEllipseTable from './FireEllipseTable.svelte'
    import FireEllipsePsi from './FireEllipsePsi.svelte'

    // Set the axis radius in pixels (half length of the x and y axis)
    const radius = 250

    // Create a fire ellipse object with desired parameters
    export let headRos = 115.31 // 115.31
    export let lwr = 3.2 // 3.2
    export let ignX = 0
    export let ignY = 0
    export let headDeg = 0
    export let minutes = 1
    export let betaDeg = 10

    const actual = fireEllipse(headRos, lwr, ignX, ignY, headDeg, minutes, betaDeg) 
    const headX = actual.headX
    const headY = actual.headY
    const betaX = actual.betaX
    const betaY = actual.betaY 
    // Clone the ellipse scaled with an elapsed time to fill 90% the axis length
    const tscale = minutes * 0.9 * radius / actual.fDist / 2
    let ellipse = fireEllipse(headRos, lwr, ignX, ignY, headDeg, tscale, betaDeg) 
</script>

<p>Head at {headDeg} deg, x={headX.toFixed(2)} y={headY.toFixed(2)} </p>
<p>Beta at {betaDeg} deg, x={betaX.toFixed(2)} y={betaY.toFixed(2)} </p>

<FireEllipseFig1 {ellipse}/>
<FireEllipsePsi {ellipse}/>
<FireEllipseTable {ellipse}/>
