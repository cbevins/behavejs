import { gxmlStr } from '$lib/gxml/gxmlStr'
import { fireEllipse, ellipseBeta, ellipseTheta } from './fireEllipse.js'

// Returns an array of Gxml elements to render the axis and ts perimeter
export function gxmlFireEllipse(e, radius=250) {
    const els = []
    gxmlAxis(radius, els)
    gxmlPerimeter(e, els)
    gxmlIgnitionCenterSubtend(e, els)
    return els
}

// Adds Gxml elements for a Cartesian coordinate system
// whose x and y axis are length 2*radius
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
    return els
}

// Adds Gxml elements for the fire ignition point, fire ellipse center,
// and the subtending circle of the ellipse
export function gxmlIgnitionCenterSubtend(e, els) {
    els.push({el:'circle', cx: e.ignX, cy: e.ignY, r: 3, fill: 'red'})
    els.push({el:'circle', cx: e.cX, cy: e.cY, r: 3, fill: 'red'})
    els.push({el:'circle', cx: e.cX, cy: e.cY, r: e.fDist,
        fill:'none', stroke:'gray','stroke-dasharray': "4 2", 'stroke-width': 0.5})
    return els
}

export function gxmlPerimeter(e, els, useTheta=true) {
    const method = useTheta ? ellipseTheta : ellipseBeta
    let x1, y1 = 0
    const initialBetaDeg = e.betaDeg
    for(let b=0; b<=360; b+=1) {
        method(e, b)
        // if (b) els.push({el:'line', x1, y1, x2: e.betaX, y2: e.betaY, stroke:'black'})
        if (b) els.push({el:'circle', cx: x1, cy: y1, r: 1, stroke: 'black', fill:'black'})
        x1 = e.betaX
        y1 = e.betaY
    }
    // restore the betaDeg for the remaining drawing
    ellipseBeta(e, initialBetaDeg)
    return els
}

// Adds beta, theta, and psi vectors
export function gxmlBetaThetaPsi(e, els) {
    // beta line and perimeter intersection point
    let stroke = 'magenta'
    els.push({el:'line', x1: e.ignX, y1: e.ignY, x2: e.betaX, y2: e.betaY,
        stroke: stroke, 'stroke-width': 2})
    els.push({el:'circle', cx: e.betaX, cy: e.betaY, r: 3, fill: 'cyan'})

    // theta line at this beta and its subtending circle intersection point
    stroke = 'green'
    // els.push({el:'line', x1: e.cX, y1: e.cY, x2: e.thetaX, y2: e.thetaY, stroke})
    els.push({el:'line', x1: e.cX, y1: e.cY, x2: e.subtendX, y2: e.subtendY, stroke,
        'stroke-dasharray': "4 2"})
    els.push({el:'line', x1: e.betaX, y1: e.betaY, x2: e.subtendX, y2: e.subtendY, stroke,
        'stroke-dasharray': "4 2"})

    // psi at beta perimeter point
    stroke = 'blue'
    els.push({el: 'line', x1: e.betaX, y1: e.betaY, x2: e.betaX+100, y2:e.betaY, stroke,
        transform: `rotate(${e.psiDeg+e.headDeg} ${e.betaX} ${e.betaY})`})
    els.push({el: 'line', x1: e.betaX, y1: e.betaY, x2: e.betaX+100, y2:e.betaY, stroke,
        transform: `rotate(${e.headDeg} ${e.betaX} ${e.betaY})`})
    return els
}

// Adds psi tic marks to edge of ellipse perimeter
// When useTheta is TRUE, the regular theta interval produces a more uniform distribution
// of points around the ellipse perimeter than using beta angle intervals,
// which are heavily concentrated at the back of the fire and sparse at the fire head
export function gxmlPsiTicks(e, els, useTheta=true) {
    const method = useTheta ? ellipseTheta : ellipseBeta
    let x1, y1 = 0
    const initialBetaDeg = e.betaDeg
    for(let b=0; b<360; b+=5) {
        method(e, b)
        els.push({el: 'line', x1: e.betaX, y1: e.betaY, x2: e.betaX+10, y2:e.betaY, stroke:'blue',
            transform: `rotate(${e.psiDeg+e.headDeg} ${e.betaX} ${e.betaY})`})
        x1 = e.betaX
        y1 = e.betaY
    }
    // restore the betaDeg for the remaining drawing
    ellipseBeta(e, initialBetaDeg)
    return els
}

export function gxmlFireEllipseSvg(radius, els) {
    return gxmlStr({el:'svg',
        viewBox: `${-radius} ${-radius} ${2*radius} ${2*radius}`,
        height: 2*radius, width: 2*radius, els: [els]})
}

export function gxmlFireEllipseSvgQtr(radius, els) {
    return gxmlStr({el:'svg',
        viewBox: `${-radius/4} ${-radius} ${1.25*radius} ${1.5*radius}`,
        height: 2*radius, width: 2*radius, els: [els]})
}

export function gxmlText(x, y, stroke, str) {
    return {el: 'text', x, y, stroke,
        'text-anchor': 'start',
        'font-family': 'sans-serif',
        'font-weight': 'normal',
        'font-size': 14,
        els: [{el: 'inner', content: str}]
    }
}
