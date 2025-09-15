/**
 * @file Compass functions as implemented by BehavePlus v6.
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 */

export class CompassEquations {
    
  /**
   * Constrain compass degrees to the azimuth range [0 <= degrees < 360].
   *
   * @param {float} degrees The compass azimuth (degrees).
   * @return float The compass azimuth compassConstrained to the range [0 <= azimuth < 360] degrees.
   */
  static compassConstrain (degrees) {
    while (degrees >= 360) {
      degrees -= 360
    }
    while (degrees < 0) {
      degrees += 360
    }
    return degrees
  }

  /**
   * Calculate compass degrees (azimuth, clockwise from north) from radians.
   *
   * @param {float} radians Compass azimuth expressed in radians.
   * @return float Compass azimuth expressed in degrees.
   */
  static compassDegreesFromRadians (radians) {
    return (radians * 180) / Math.PI
  }

  static compassDiff (x, y) {
    return CompassEquations.compassConstrain(x - y)
  }

  /**
   * Get the opposite azimuth from degrees.
   *
   * @param {float} deg A compass azimuth (degrees).
   * @return float The opposite compass azimuth from dgrees.
   */
  static compassOpposite (degrees) {
    return CompassEquations.compassConstrain(degrees - 180)
  }

  /**
   * Calculate the radians of the compass azimuth (clockwise from north).
   *
   * @param {float} degrees  Compass azimuth (degrees clockwise from north).
   * @return float The compass azimuth expressed in radians.
   */
  static compassRadiansFromDegrees (degrees) {
    return (degrees * Math.PI) / 180
  }

  /**
   * Calculate the slope steepness in degrees from the slope vertical rise / horizontal reach ratio.
   *
   * @param {float} ratio Ratio of the slope vertical rise / horizontal reach (fraction).
   * @return float Slope steepness expressed in degrees.
   */
  static compassSlopeDegrees (ratio) {
    const radians = Math.atan(ratio)
    return CompassEquations.compassDegreesFromRadians(radians)
  }

  /**
   * Calculate slope steepness degrees from map measurements.
   *
   * @param {float} mapScale Map scale factor (Greater than 1, i.e., 24000)
   * @param {float} contourInterval Map contour interval (in same units-of-measure as distance)
   * @param {float} contours Number of contours crossed in the measurement
   * @param {float} mapDistance Map distance covered in the measurement
   * @return float Slope steepness degrees
   */
  static compassSlopeDegreesMap (mapScale, contourInterval, contours, mapDistance) {
    const ratio = CompassEquations.slopeRatioMap(mapScale, contourInterval, contours, mapDistance)
    return CompassEquations.compassSlopeDegrees(ratio)
  }

  /**
   * Calculate the slope vertical rise / horizontal reach ratio from its steepness in degrees.
   *
   * @param {float} degrees  Slope steepness in degrees.
   * @return float Slope vertical rise / horizontal reach ratio (fraction).
   */
  static compassSlopeRatio (degrees) {
    const rad = CompassEquations.compassRadiansFromDegrees(CompassEquations.compassConstrain(degrees))
    return Math.tan(rad)
  }

  /**
   * Calculate slope steepness ratio from map measurements.
   *
   * @param {float} mapScale Map sacle factor (Greater than 1, i.e., 24000)
   * @param {float} contourInterval Map contour interval (in same units-of-measure as distance)
   * @param {float} contours Number of contours crossed in the measurement
   * @param {float} mapDistance Map distance covered in the measurement
   *
   * @return float Slope steepness ratio
   */
  static compassSlopeRatioMap (mapScale, contourInterval, contours, mapDistance) {
    const reach = Math.max(0, mapScale * mapDistance)
    const rise = Math.max(0, contours * contourInterval)
    return reach <= 0 ? 0 : rise / reach
  }

  static compassSum (x, y) {
    return CompassEquations.compassConstrain(x + y)
  }
}