function degrees(radians) {return radians * 180 / Math.PI}
function radians(degrees) {return degrees * Math.PI / 180 }

function bp(rosHead, lwr, t) {
    const eccent = Math.sqrt(lwr * lwr - 1) / lwr
    const rosBack = rosHead * (1 - eccent) / (1 + eccent)
    const rosMajor = rosHead + rosBack
    const rosMinor = rosMajor / lwr
    const f = 0.5 * rosMajor
    const h = 0.5 * rosMinor
    const g = f - rosBack
    // The following is Catchpole & Alexander Eq 10, which produces same result as BP
    // but requires knowing 'f' (half the major axis ros) in advance 
    const g2 = f * Math.sqrt(1-Math.pow(lwr, -2))
    return {rosHead, lwr, eccent, rosBack, rosMajor, rosMinor, f, h, g, g2}
}

//------------------------------------------------------------------------------
// Equation 5
//------------------------------------------------------------------------------

/**
   * Given the polar angle 'beta' from the fire ignition point to any point on the perimeter,
   * this function determines the angle 'theta' from the fire ellipse center to that point.
   * This is Catchpole et.al. (1982) Equation 5.
   * @param {float} beta Polar angle from fire ignition point to some point on the
   *    fire ellipse perimeter (degrees from fire head)
   * @param {float} f half the major axis' expansion rate
   * @param {float} g "speed at which the center of the fire is moving downwind",
   * @param {float} h half the minor axis' expansion rate
   * Note that the backing spread rate 'c' = f - g
   * @returns 
   */
function thetaFromBeta(beta, f, g, h) {
    if (f <= 0 || h <= 0) return 0
    const b = beta * Math.PI / 180      // polar angle 'beta' in radians
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
    let theta = Math.acos(cosTheta) // theta in radians when beta radians < PI
    if (b >= Math.PI) theta = 2 * Math.PI - theta   // theta in radians when beta >= PI
    // Convert theta radians to degrees
    let thetaHead = theta * 180 / Math.PI
    if (beta > 180) thetaHead = 360 - thetaHead
    return thetaHead
}

//------------------------------------------------------------------------------
// Equation 6
//------------------------------------------------------------------------------

/**
 * Catchpole et.al. (1982) Eq 6
 * @param {*} thetaDeg
 * @param {float} f half the major axis' expansion rate
 * @param {float} h half the minor axis' expansion rate
 * Note that the backing spread rate 'c' = f - g
 * @returns 
 */
function psiFromTheta(thetaDeg, f, h) {
    if (f * h * thetaDeg <= 0) return 0
    const theta = radians(thetaDeg)
    const tanPsi = (Math.tan(theta) * f) / h
    let psi = Math.atan(tanPsi)
    // psi += ( psi < 0) ? pi : 0
    // psi += ( theta > pi) ? pi : 0
    // Quadrant adjustment
    if (theta <= 0.5 * Math.PI) {
      // no adjustment
    } else if (theta > 0.5 * Math.PI && theta <= 1.5 * Math.PI) {
        psi += Math.PI
    } else if (thetaRadians > 1.5 * Math.PI) {
        psi += 2 * Math.PI
    }
    // Convert psi radians to degrees
    return degrees(psi)
}

//------------------------------------------------------------------------------
// Equation 7
//------------------------------------------------------------------------------

/**
 * Spread rate at angle 'psi' between the wind diretion and the normal to the fire front
 * as a fraction of the maximum spread rate ate the fire head.
 * This is Catchpole et.al. (1982) Equation 7.
 * @param {*} psiDeg Angle between the wind direction and the normal to the fire front.
 * @param {float} f half the major axis' expansion rate
 * @param {float} g "speed at which the center of the fire is moving downwind",
 * @param {float} h half the minor axis' expansion rate
 * Note that the backing spread rate 'c' = f - g
 * @returns 
 */
function psiFactor(psiDeg, f, g, h) {
    if (f * g * h <= 0) return 0
    const psi = radians(psiDeg)      // 'psi' in radians
    const cosPsi = Math.cos(psi)
    const cos2Psi = cosPsi * cosPsi
    const sin2Psi = 1 - cos2Psi
    const factor = g * cosPsi + Math.sqrt((f * f * cos2Psi) + (h * h * sin2Psi))
    return factor
}

//------------------------------------------------------------------------------
// Following are unused in BP or Catchpole
//------------------------------------------------------------------------------

/**
 * Calculate the degrees from the fire ignition point given the degrees
 * from the ellipse center and some ellipse paramaters.
 *
 * @param theta Azimuth from the ellipse center wrt the fire head
 * @param {float} f half the major axis' expansion rate
 * @param {float} g "speed at which the center of the fire is moving downwind",
 * @param {float} h half the minor axis' expansion rate
 * Note that the backing spread rate 'c' = f - g
 * @returns The azimuth from the fire ignition point.
 */
function betaFromTheta(thetaDeg, f, g, h) {
  const theta = radians(thetaDeg)     // 'theta' in radians
  const num = h * Math.sin( theta)
  const denom = g + f * Math.cos(theta)
  let beta = ( denom <= 0 ) ? 0 : Math.atan(num / denom)  // radians
  // Quandrant adjustment
  const boundary1 = 150
  const boundary2 = 210
  if (theta <= boundary1) {
    // no adjustment required
  } else if (theta > boundary1 && theta <= boundary2) {
    beta += Math.PI
  } else if (theta > boundary2) {
    beta += 2.0 * Math.PI
  }
  // Convert beta radians to degrees
  return degrees(beta)
}

/**
 * 
 * @param {float} Angle 'psi' from fire head in radians
 * @param {float} f half the major axis' expansion rate
 * @param {float} h half the minor axis' expansion rate
 * @returns 
 */
function thetaFromPsi(psiHead, f, h) {
  if ( f <= 0 ) return 0
  const tanTheta = Math.tan(psiHead) * h / f
  let theta = Math.atan(tanTheta)
  // Quadrant adjustment
  if (psi <= 0.5 * Math.PI) {
    // no adjustment
  } else if (psi > 0.5 * Math.PI && psi <= 1.5 * Math.PI ) {
    theta += Math.PI
  } else if (psi > 1.5 * Math.PI ) {
    theta += 2 * Math.PI
  }
  //theta += (theta < 0. || psi > pi ) ? pi : 0.
  // Convert theta radians to degrees
  return degrees(theta)
}

console.log(bp(10, 4, 1))