/**
 * Temporary functions to create and update a fire ellipse object
 * using the local FireEllipseEquations.js function library.
 * 
 * Use:
 * 1 fireEllipse() returns a new fire ellipse object.
 * 2 invoke ellipseSize() to update distance properties whenever the elapsed time changes
 * 3 invoke ellipseBeta() to update beta-theta-psi angles and points for a new beta angle
 */
import { FireEllipseEquations as FE, radians} from './FireEllipseEquations.js'
import { CompassEquations as Compass } from './CompassEquations.js'

export function fireEllipse(headRos=1, lwr=1, ignX=0, ignY=0, headDeg=0,
        minutes=1, betaDeg=0) {
    // Initialize all input parameters
    const e = {headRos, lwr, ignX, ignY, headDeg, minutes, betaDeg}
    ellipseShape(e)
    ellipseSize(e, e.minutes)
    ellipseBeta(e, e.betaDeg)
    return e
}

// Adds basic axis & shape properties
export function ellipseShape(e) {
    e.eccent = FE.eccent(e.lwr)
    e.backRos = FE.backRos(e.headRos, e.eccent)
    e.majorRos = FE.majorRos(e.headRos, e.backRos)
    e.minorRos = FE.minorRos(e.majorRos, e.lwr)
    e.fRos = FE.fRos(e.majorRos)
    e.gRos = FE.gRos(e.fRos, e.backRos)
    e.hRos = FE.hRos(e.minorRos)
    return e
}

// Updates all size properties, which depend upon elapsed time
export function ellipseSize(e, minutes) {
    e.minutes = minutes
    e.headDist = FE.distance(e.headRos, e.minutes)
    e.backDist = FE.distance(e.backRos, e.minutes)
    e.fDist = FE.distance(e.fRos, e.minutes)
    e.gDist = FE.distance(e.gRos, e.minutes)
    e.hDist = FE.distance(e.hRos, e.minutes)
    e.length = FE.distance(e.majorRos, e.minutes)
    e.width = FE.distance(e.minorRos, e.minutes)
    // Following needs to be adjusted for headDeg!!
    e.cX = e.gDist
    e.cY = 0
    return e
}

export function ellipseBeta(e, betaDeg) {
    // Forward: betaDeg -> thetaDeg -> psiDeg -> psiRos
    e.betaDeg = betaDeg
    e.thetaDeg = FE.thetaFromBeta(e.betaDeg, e.fRos, e.gRos, e.hRos)
    e.betaRos = FE.betaRos(e.headRos, e.lwr, e.betaDeg)
    e.betaDist = FE.distance(e.betaRos, e.minutes)
    e.psiDeg = FE.psiFromTheta(e.thetaDeg, e.fRos, e.hRos)
    e.psiRos = FE.psiRos(e.psiDeg, e.fRos, e.gRos, e.hRos)
    e.psiDist = FE.distance(e.psiRos, e.minutes)

    // Reverse: psiDeg -> thetaDeg -> betaDeg
    e.thetaFromPsi = FE.thetaFromPsi(e.psiDeg, e.fRos, e.hRos)
    e.betaFromTheta = FE.betaFromTheta(e.thetaFromPsi, e.fRos, e.gRos, e.hRos)

    // const [x,y] = FE._betaPoint(e.headRos, e.lwr, e.betaDeg, e.minutes)
    let [x,y] = FE.betaPerimeterPoint(e.betaDeg, e.betaRos, e.minutes, e.ignX, e.ignY)
    e.betaX = x
    e.betaY = y

    let [tx,ty] = FE.thetaPerimeterPoint(e.thetaDeg, e.fDist, e.hDist, e.cX, e.cY)
    e.thetaX = tx
    e.thetaY = ty

    e.subtendX = e.betaX
    e.subtendY = e.cY + e.fDist * Math.sin(radians(e.thetaDeg))

    return e
}
