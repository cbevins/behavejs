<script>
    import { fireEllipse, ellipseBeta } from './fireEllipse.js'

    let { ellipse, interval='30', title='Fire Ellipse Angles' } = $props()
    interval = parseFloat(interval)
    const eArray = []
    const e = ellipse
    for(let b=0; b<=360; b+=interval) {
        // const e2 = fireEllipse(e.headRos, e.lwr, e.ignX, e.ignY, e.headDeg, e.minutes, e.betaDeg) 
        ellipseBeta(e, b)
        eArray.push({...e})
    }
</script>

{@render ellipseTable(title, eArray)}

{#snippet fmt(content)}
    <td class='px-2 py-2 border border-gray-300'>{content.toFixed(2)}</td>
{/snippet}

{#snippet header(content)}
    <td class='font-bold px-2 py-2 border border-gray-300'>{content}</td>
{/snippet}

{#snippet ellipseTable(title, eArray)}
<h2 class='ml-4 mt-4 text-base font-bold'>{title}</h2>
<table class='ml-4 table-auto text-sm'>
    <thead>
        <tr>
            {@render header('betaDeg')}
            {@render header('betaRos')}
            {@render header('betaX')}
            {@render header('betaY')}
            {@render header('thetaDeg')}
            {@render header('thetaX')}
            {@render header('thetaY')}
            {@render header('subtendX')}
            {@render header('subtendY')}
            {@render header('psiDeg')}
            {@render header('psiRos')}
        </tr>
    </thead>
    <tbody>
        {#each eArray as e, n}
        <tr>
            {@render fmt(e.betaDeg)}
            {@render fmt(e.betaRos)}
            {@render fmt(e.betaX)}
            {@render fmt(e.betaY)}
            {@render fmt(e.thetaDeg)}
            {@render fmt(e.thetaX)}
            {@render fmt(e.thetaY)}
            {@render fmt(e.subtendX)}
            {@render fmt(e.subtendY)}
            {@render fmt(e.psiDeg)}
            {@render fmt(e.psiRos)}
        </tr>
        {/each}
    </tbody>
</table>
{/snippet}

