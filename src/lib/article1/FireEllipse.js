export function degrees(radians) {return radians * 180 / Math.PI}
export function radians(degrees) {return degrees * Math.PI / 180 }

/**
 * All function arguments and return values are documented here:
 * @param {float} fRos half the major axis' expansion rate
 * @param {float} gRos "speed at which the center of the fire is moving downwind"
 * @param {float} hRos half the minor axis' expansion rate
 * @param {float} betaDeg polar angle at the *fire ignition point*
 *  between the fire heading vector and some point on the fire ellipse perimeter
 * @param {float} psiDeg angle between some point on the fire ellipse perimeter
 *  between the wind vector and the normal to the fire ellipse front.
 * @param {float} thetaDeg polar angle at the *fire ellipse center*
 *  between the fire heading vector and some point on the fire ellipse perimeter
 * Note that the backing spread rate 'c' = f - g
 */
export class FireEllipse {

    //--------------------------------------------------------------------------
    // Ellipse shape functions
    //--------------------------------------------------------------------------

    static eccent(lwr) { return Math.sqrt(lwr * lwr - 1) / lwr }

    // BehavePlus method
    static backRos(headRos, lwr) {
        const eccent = FireEllipse.eccent(lwr)
        return headRos * (1 - eccent) / (1 + eccent)
    }
    
    static majorRos(headRos, lwr) {
        return headRos + FireEllipse.backRos(headRos, lwr)
    }

    static minorRos(headRos, lwr) {
        return FireEllipse.majorRos(headRos, lwr) / lwr
    }

    static fRos(headRos, lwr) {
        return 0.5 * FireEllipse.majorRos(headRos, lwr)
    }

    static hRos(headRos, lwr) {
        return 0.5 * FireEllipse.minorRos(headRos, lwr)
    }

    static gRos(headRos, lwr) {
        return FireEllipse.fRos(headRos, lwr) - FireEllipse.backRos(headRos, lwr)
    }

    // The following is Catchpole & Alexander Eq 10, which produces same result as BP
    // but requires knowing 'f' (half the major axis ros) in advance 
    static gRos2(lwr) {
        return FireEllipse.f(headRos, lwr) * Math.sqrt(1-Math.pow(lwr, -2))
    }

    static length(headRos, lwr, minutes) {
        return minutes * FireEllipse.majorRos(headRos, lwr)
    }

    static width(headRos, lwr, minutes) {
        return minutes * FireEllipse.minorRos(headRos, lwr)
    }

    //--------------------------------------------------------------------------
    // Fire behavior at beta and psi
    //--------------------------------------------------------------------------

    static betaDist(headRos, lwr, betaDeg, t) {
        return FireEllipse.betaRos(headRos, lwr, betaDeg) * t
    }

    static betaPoint(headRos, lwr, betaDeg, t) {
        const beta = radians(betaDeg)
        const fRos = FireEllipse.fRos(headRos, lwr)
        const gRos = FireEllipse.gRos(headRos, lwr)
        const hRos = FireEllipse.hRos(headRos, lwr)
        const x = t * (gRos + fRos * Math.cos(beta))
        const y = t * hRos * Math.sin(beta)
        return [x,y]
    }

    static betaRos(headRos, lwr, betaDeg) {
        if (betaDeg === 0) return headRos
        const beta = radians(betaDeg)
        const eccent = FireEllipse.eccent(lwr)
        return (headRos * (1 - eccent)) / (1 - eccent * Math.cos(beta))
    }

    /**
     * Catchpole et.al. (1982) Eq 7
     */
    static psiRos(psiDeg, f, g, h) {
        if (f * g * h <= 0) return 0
        const psi = radians(psiDeg)
        const cosPsi = Math.cos(psi)
        const cos2Psi = cosPsi * cosPsi
        const sin2Psi = 1 - cos2Psi
        const ros = g * cosPsi + Math.sqrt((f * f * cos2Psi) + (h * h * sin2Psi))
        return ros
    }

    //--------------------------------------------------------------------------
    // Angle computation functions for beta, theta, and psi    
    //--------------------------------------------------------------------------

    // Returns beta degrees at fire ellipse ignition point given the psi degrees
    static betaFromPsi(psiDeg, f, g, h) {
        const thetaDeg = FireEllipse.thetaFromPsi(psiDeg, f, h)
        const betaDeg = FireEllipse.betaFromTheta(thetaDeg, f, g, h)
        return betaDeg
    }
    
    /**
     * Catchpole et.al. (1982) Equation 5.
     * Used only by psiFromBeta()
     */
    static thetaFromBeta(betaDeg, f, g, h) {
        if (f <= 0 || h <= 0) return 0
        const b = radians(betaDeg)
        const cosB = Math.cos(b)
        const cos2B = cosB * cosB
        const sin2B = 1 - cos2B
        const f2 = f * f
        const g2 = g * g
        const h2 = h * h
        const term = Math.sqrt(h2 * cos2B + (f2 - g2) * sin2B)  // term used in numerator
        const num = h * cosB * term - f * g * sin2B
        const denom = h2 * cos2B + f2 * sin2B
        const cosTheta = num / denom
        let theta = Math.acos(cosTheta)               // theta in radians when beta radians < PI
        if (b >= Math.PI) theta = 2 * Math.PI - theta // theta in radians when beta >= PI
        // Convert theta radians to degrees
        let thetaDeg = degrees(theta)
        if (betaDeg > 180) thetaDeg = 360 - thetaDeg
        return thetaDeg
    }

    /**
     * Catchpole et.al. (1982) Eq 6
     * Used only by psiFromBeta()
     */
    static psiFromTheta(thetaDeg, f, h) {
        if (f * h * thetaDeg <= 0) return 0
        const theta = radians(thetaDeg)
        const tanPsi = (Math.tan(theta) * f) / h
        let psi = Math.atan(tanPsi)
        // psi += ( psi < 0) ? pi : 0
        // psi += ( theta > pi) ? pi : 0
        // Quadrant adjustment
        // 1st quadrant needs no adjustment
        if (theta <= 0.5 * Math.PI) {}
        // 2nd and 3rd quadrants
        else if (theta > 0.5 * Math.PI && theta <= 1.5 * Math.PI) { psi += Math.PI }
        // 4th quadrant
        else if (thetaRadians > 1.5 * Math.PI) { psi += 2 * Math.PI }
        const psiDeg = degrees(psi)
        return psiDeg
    }

    // Returns psi degrees given beta degrees
    static psiFromBeta(betaDeg, f, g, h) {
        const thetaDeg = FireEllipse.thetaFromBeta(betaDeg, f, g, h)
        const psiDeg = FireEllipse.psiFromTheta(thetaDeg, f, h)
        return psiDeg
    }

    // Used only by betaFromPsi()
    static betaFromTheta(thetaDeg, f, g, h) {
        const theta = radians(thetaDeg)
        const num = h * Math.sin( theta)
        const denom = g + f * Math.cos(theta)
        let beta = ( denom <= 0 ) ? 0 : Math.atan(num / denom)
        // Quandrant adjustment
        const boundary1 = 150
        const boundary2 = 210
        if (theta <= boundary1) {}
        else if (theta > boundary1 && theta <= boundary2) { beta += Math.PI }
        else if (theta > boundary2) { beta += 2.0 * Math.PI }
        return degrees(beta)
    }

    // Used only by betaFromPsi()
    static thetaFromPsi(psiDeg, f, h) {
        if ( f <= 0 ) return 0
        const psi = radians(psiDeg)
        const tanTheta = Math.tan(psi) * h / f
        let theta = Math.atan(tanTheta)
        // Quadrant adjustment
        if (psi <= 0.5 * Math.PI) {}
        else if (psi > 0.5 * Math.PI && psi <= 1.5 * Math.PI ) { theta += Math.PI }
        else if (psi > 1.5 * Math.PI ) { theta += 2 * Math.PI }
        //theta += (theta < 0. || psi > pi ) ? pi : 0.
        // Convert theta radians to degrees
        return degrees(theta)
    }
}
