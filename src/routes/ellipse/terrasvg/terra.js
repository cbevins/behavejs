export class Terra {
    constructor(width, height, easting, northing, scale) {
        this.width = width
        this.height = height
        this.easting = easting
        this.northing = northing
    }
    updateBoundaries() {
        this.north = this.northing + this.scale * this.height/2
        this.south = this.northing - this.scale * this.height/2
        this.west = this.easting - this.scale * this.width/2
        this.east = this.easting + this.scale * this.width/2
    }
    x(easting) { return this.scale*(easting - this.west) }
    y(northing) { return this.scale*(this.north - northing) }
    xy(easting, northing) { return [this.x(easting), this.y(northing)]}
}
