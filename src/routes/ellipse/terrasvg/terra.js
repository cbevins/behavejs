export class Terra {
    constructor(easting, northing, width=1000, height=1000, scale=1) {
        this.width = width
        this.height = height
        this.easting = easting
        this.northing = northing
        this.scale = scale
        this.updateBoundaries()
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
