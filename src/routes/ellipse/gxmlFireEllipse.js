import { gxmlStr } from '$lib/gxml/gxmlStr'
import { fireEllipse, ellipseBeta } from './fireEllipse.js'

// Returns an array of Gxml elements to render the axis and ts perimeter
export function gxmlFireEllipse(e, radius=250) {
    const els = []
    gxmlAxis(radius, els)
    gxmlPerimeter(e, els)
    gxmlIgnitionCenterSubtend(e, els)
    return els
}

export function gxmlAxis(radius, els) {
    let fill = 'grey'
    let stroke = 'grey'
    let r = 4
    els.push({el: 'line', x1: -radius, x2: radius, y1: 0, y2: 0, stroke})
    els.push({el: 'line', x1: 0, x2: 0, y1: radius, y2: -radius, stroke})
    els.push({el:'circle', cx: -radius, cy: 0, r, fill})
    els.push({el:'circle', cx: radius, cy: 0, r, fill})
    els.push({el:'circle', cx: 0, cy: radius, r, fill})
    els.push({el:'circle', cx: 0, cy: -radius, r, fill})
}

export function gxmlIgnitionCenterSubtend(e, els) {
    // Ellipse ignition pt, center, and subtending circle
    let fill = 'red'
    let r = 3
    els.push({el:'circle', cx: e.ignX, cy: e.ignY, r, fill})
    els.push({el:'circle', cx: e.cX, cy: e.cY, r, fill})
    els.push({el:'circle', cx: e.cX, cy: e.cY, r: e.fDist,
        fill:'none', stroke:'gray', 'stroke-width': 0.5})
}

export function gxmlPerimeter(e, els) {
    let x1, y1 = 0
    const initialBetaDeg = e.betaDeg
    for(let b=0; b<360; b+=1) {
        ellipseBeta(e, b)
        els.push({el:'line', x1, y1, x2: e.betaX, y2: e.betaY, stroke:'black'})
        x1 = e.betaX
        y1 = e.betaY
    }
    // restore the betaDeg for the remaining drawing
    ellipseBeta(e, initialBetaDeg)
}

// Adds beta, theta, and psi vectors
export function gxmlBetaThetaPsi(e, els) {
    // beta line and perimeter intersection point
    let stroke = 'magenta'
    els.push({el:'line', x1: e.ignX, y1: e.ignY, x2: e.betaX, y2: e.betaY,
        stroke: stroke, 'stroke-width': 2})
    els.push({el:'circle', cx: e.betaX, cy: e.betaY, r: 3, fill:stroke})

    // theta line at this beta and its subtending circle intersection point
    stroke = 'green'
    els.push({el:'line', x1: e.cX, y1: e.cY, x2: e.thetaX, y2: e.thetaY, stroke})
    els.push({el:'line', x1: e.cX, y1: e.cY, x2: e.subtendX, y2: e.subtendY, stroke})
    els.push({el:'line', x1: e.betaX, y1: e.betaY, x2: e.subtendX, y2: e.subtendY, stroke})

    // psi at beta perimeter point
    stroke = 'blue'
    els.push({el: 'line', x1: e.betaX, y1: e.betaY, x2: e.betaX+10, y2:e.betaY, stroke,
        transform: `rotate(${e.psiDeg} ${e.betaX} ${e.betaY})`})
    els.push({el: 'line', x1: e.betaX, y1: e.betaY, x2: e.betaX+100, y2:e.betaY, stroke})
    return els
}

export function gxmlPsiTicks(e, els) {
    let x1, y1 = 0
    const initialBetaDeg = e.betaDeg
    for(let b=0; b<360; b+=1) {
        ellipseBeta(e, b)
        els.push({el: 'line', x1: e.betaX, y1: e.betaY, x2: e.betaX+10, y2:e.betaY, stroke:'blue',
            transform: `rotate(${e.psiDeg} ${e.betaX} ${e.betaY})`})
        x1 = e.betaX
        y1 = e.betaY
    }
    // restore the betaDeg for the remaining drawing
    ellipseBeta(e, initialBetaDeg)
}

export function gxmlFireEllipseSvg(radius, els) {
    return gxmlStr({el:'svg', viewBox: `${-radius} ${-radius} ${2*radius} ${2*radius}`,
        height: 500, width: 500, els: [els]})
}
