export class Compass {

    // Returns degrees constrained to 0 <= deg < 360
    static constrain(deg) {
        while(deg >= 360) deg -= 360
        while(deg < 0) deg += 360
        return deg
    }

    static degrees(radians) {return radians * 180 / Math.PI}
    
    // Returns degrees counter-clockwise from from east (horizontal)
    // given degrees clockwise from north (vertical)
    static easting(northing) { return Compass.constrain(450 - northing) }

    // Returns degrees clockwise from north (vertical)
    // given degrees counter-clockwise from east (horizontal)
    static northing(easting) { return Compass.constrain(450 - easting) }

    static radians(degrees) {return degrees * Math.PI / 180 }
}