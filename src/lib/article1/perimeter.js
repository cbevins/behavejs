/**
 * Compares the FireEllipse and catchpole equation results
 */
import { FireEllipse, radians} from './FireEllipse.js'
import { Compass } from './Compass.js'

function ellipse(headRos, lwr, betaDeg, minutes) {
    const e = {}
    e.headRos = headRos
    e.lwr = lwr
    e.minutes = minutes
    e.betaDeg = betaDeg
    e.headDeg = 0

    e.eccent = FireEllipse.eccent(e.lwr)
    e.backRos = FireEllipse.backRos(e.headRos, e.lwr)
    e.majorRos = FireEllipse.majorRos(e.headRos, e.lwr)
    e.minorRos = FireEllipse.minorRos(e.headRos, e.lwr)
    e.fRos = FireEllipse.fRos(e.headRos, e.lwr)
    e.gRos = FireEllipse.gRos(e.headRos, e.lwr)
    e.hRos = FireEllipse.hRos(e.headRos, e.lwr)
    
    e.length = FireEllipse.length(e.headRos, e.lwr, e.minutes)
    e.width = FireEllipse.width(e.headRos, e.lwr, e.minutes)

    // Forward: betaDeg -> thetaDeg -> psiDeg -> psiRos
    e.thetaDeg = FireEllipse.thetaFromBeta(e.betaDeg, e.fRos, e.gRos, e.hRos)
    e.betaRos = FireEllipse.betaRos(e.headRos, e.lwr, e.betaDeg)
    e.psiDeg = FireEllipse.psiFromTheta(e.thetaDeg, e.fRos, e.hRos)
    e.psiRos = FireEllipse.psiRos(e.psiDeg, e.fRos, e.gRos, e.hRos)

    // Reverse: psiDeg -> thetaDeg -> betaDeg
    e.thetaFromPsi = FireEllipse.thetaFromPsi(e.psiDeg, e.fRos, e.hRos)
    e.betaFromTheta = FireEllipse.betaFromTheta(e.thetaFromPsi, e.fRos, e.gRos, e.hRos)

    const [x,y] = FireEllipse.betaPoint(e.headRos, e.lwr, e.betaDeg, e.minutes)
    e.x = x
    e.y = y
    return e
}

const headRos = 115.31 // 10
const lwr = 3.2 // 4
const minutes = 1
const betaDeg = 45
const e = ellipse(headRos, lwr, betaDeg, minutes)

const results = []
for(let key of Object.keys(e)) results.push({key, value: e[key]})
console.log('Fire Ellipse Properties')
console.table(results)

//-----------------------------------------------------

const points = []
console.log('Comparison of Beta and Psi with Andrews (9/21/2012) Spreadsheet')
for(let deg=0; deg<181; deg+=30) {
    const e = ellipse(headRos, lwr, deg, minutes)
    points.push({
        beta: deg,
        psi: e.psiDeg.toFixed(2),
        betaRos: e.betaRos.toFixed(2),
        psiRos: e.psiRos.toFixed(2),
        x: e.x.toFixed(2),
        y: e.y.toFixed(2)})
}
console.table(points)

//-----------------------------------------------------
// degrees from north and their euclidian equivalents

const n2e = []
for(let n=0; n<=380; n+=5) n2e.push({northing: n, easting: Compass.easting(n)})
console.log('northing to easting')
console.table(n2e)

const e2n = []
for(let e=0; e<=380; e+=5) e2n.push({easting: e, northing: Compass.northing(e)})
console.log('easting to northing')
console.table(e2n)
