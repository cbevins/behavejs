<script>
    import { gxmlStr } from '$lib/gxml/gxmlStr'
    import { gxmlFireEllipse, gxmlBetaThetaPsi, gxmlFireEllipseSvg } from './gxmlFireEllipse.js'
    
    let {ellipse, radius='250'} = $props()
    radius = parseFloat(radius)

    // Get gxml array with the fire ellipse axis and perimeter
    // and the beta-theta-psi vectors
    const els = gxmlFireEllipse(ellipse, radius)
    gxmlBetaThetaPsi(ellipse, els)
</script>
{@html gxmlFireEllipseSvg(radius, els)}
