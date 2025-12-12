<script>
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
    export let betaDeg = 350
    const actual = fireEllipse(headRos, lwr, ignX, ignY, headDeg, minutes, betaDeg) 

    // Clone the ellipse scaled with an elapsed time to fill 90% the axis length
    const scale = minutes * 0.9 * radius / actual.fDist / 2
    let ellipse = fireEllipse(headRos, lwr, ignX, ignY, headDeg, scale, betaDeg) 
</script>
<FireEllipseFig1 {ellipse}/>
<FireEllipsePsi {ellipse}/>
<FireEllipseTable {ellipse}/>
