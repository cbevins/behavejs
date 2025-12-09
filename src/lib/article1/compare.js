/**
 * Compares the FireEllipse and catchpole equation results
 */
import { FireEllipse } from './FireEllipse.js'
import { FireEllipseEquations as Behave } from '../core.js'

function behave(headRos, lwr, t, betaDeg) {
    const e = {}
    e.headRos = headRos
    e.lwr = lwr
    e.t = t
    e.betaDeg = betaDeg
    e.headDeg = 0

    e.eccent = Behave.eccentricity (e.lwr)
    e.backRos = Behave.backingSpreadRate(e.headRos, e.eccent)
    e.majorRos = Behave.majorSpreadRate (e.headRos, e.backRos)
    e.minorRos = Behave.minorSpreadRate (e.majorRos, e.lwr)
    e.fRos = Behave.fSpreadRate(e.majorRos)
    e.gRos = Behave.gSpreadRate(e.majorRos, e.backRos)
    e.hRos = Behave.hSpreadRate(e.minorRos)

    // Forward: betaDeg -> thetaDeg -> psiDeg -> psiRos
    e.betaRos = Behave.betaSpreadRate (e.betaDeg, e.headRos, e.eccent)
    e.thetaDeg = Behave.thetaFromBeta(e.betaDeg, e.fRos, e.gRos, e.hRos)
    e.psiDeg = Behave.psiFromTheta(e.thetaDeg, e.fRos, e.hRos)
    e.psiRos = Behave.psiSpreadRate(e.psiDeg, e.fRos, e.gRos, e.hRos)

    // Reverse: psiDeg -> thetaDeg -> betaDeg
    e.thetaFromPsi = Behave.thetaFromPsi(e.psiDeg, e.fRos, e.hRos)
    e.betaFromTheta = Behave.betaFromTheta(e.thetaFromPsi, e.fRos, e.gRos, e.hRos)
    return e
    // Behave.fRosliAtAzimuth (fliHead, headRos, rosAz)
    // Behave.mapArea (area, mapScale)
    // Behave.perimeter (len, wid)
    // Behave.spreadDistance (rate, time) {
    // spreadDistance (rate, time) 
}

function catchpole(headRos, lwr, t, betaDeg) {
    const e = {}
    e.headRos = headRos
    e.lwr = lwr
    e.t = t
    e.betaDeg = betaDeg
    e.headDeg = 0

    e.eccent = FireEllipse.eccent(e.lwr)
    e.backRos = FireEllipse.backRos(e.headRos, e.lwr)
    e.majorRos = FireEllipse.majorRos(e.headRos, e.lwr)
    e.minorRos = FireEllipse.minorRos(e.headRos, e.lwr)
    e.fRos = FireEllipse.fRos(e.headRos, e.lwr)
    e.gRos = FireEllipse.gRos(e.headRos, e.lwr)
    e.hRos = FireEllipse.hRos(e.headRos, e.lwr)

    // Forward: betaDeg -> thetaDeg -> psiDeg -> psiRos
    e.thetaDeg = FireEllipse.thetaFromBeta(e.betaDeg, e.fRos, e.gRos, e.hRos)
    e.betaRos = FireEllipse.betaRos(e.headRos, e.lwr, e.betaDeg)
    e.psiDeg = FireEllipse.psiFromTheta(e.thetaDeg, e.fRos, e.hRos)
    e.psiRos = FireEllipse.psiRos(e.psiDeg, e.fRos, e.gRos, e.hRos)

    // Reverse: psiDeg -> thetaDeg -> betaDeg
    e.thetaFromPsi = FireEllipse.thetaFromPsi(e.psiDeg, e.fRos, e.hRos)
    e.betaFromTheta = FireEllipse.betaFromTheta(e.thetaFromPsi, e.fRos, e.gRos, e.hRos)
    return e
}

const ros = 10
const lwr = 4
const t = 1
const beta = 45

const b = behave(ros, lwr, t, beta)
const c = catchpole(ros, lwr, t, beta)

const results = []
for(let key of Object.keys(b)) {
    const diff = b[key] - c[key]
    results.push({key, behave: b[key], catchpole: c[key], diff})
}
console.table(results)