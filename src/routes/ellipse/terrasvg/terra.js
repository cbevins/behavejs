export class Terra {
    constructor(easting, northing, scale=1, width=1000, height=1000, 
        svgWidth=1000, svgHeight=1000) {
        this.width = width          // field width in user units when scale = 1
        this.height = height        // field height in user units when scale = 1
        this.easting = easting      // field center easting (x) in user units
        this.northing = northing    // field center northing (y) in user units
        this.scale = scale          // SVG pixel-to-user units
        this.svgWidth = svgWidth    // SVG width
        this.svgHeight = svgHeight  // SVG height
        this.els = []
        this.svg = {el:'svg', width: this.svgWidth, height: this.svgHeight, els: this.els}
        this._update()
    }

    recenter(easting, northing) {
        this.easting = easting
        this.northing = northing
        this._update()
        return this
    }

    rescale(scale) {
        this.scale = scale
        this._update()
        return this
    }

    // Returns x and/or y in SVG coordinates
    x(easting) { return this.scale * (easting - this.west) }
    y(northing) { return this.scale * (this.north - northing) }
    xy(easting, northing) { return [this.x(easting), this.y(northing)]}

    //--------------------------------------------------------------------------
    // Private methods
    //--------------------------------------------------------------------------

    _update() {
        this._setBounds()
        this._setSvg()
    }

    _setBounds() {
        this.north = this.northing + this.scale * this.height/2
        this.south = this.northing - this.scale * this.height/2
        this.west = this.easting - this.scale * this.width/2
        this.east = this.easting + this.scale * this.width/2
    }

    _setSvg() {
        this.els = []
        this.els.push({el:'rect', x:0, y:0, width:this.width, height:this.height,
            stroke: 'black', fill:'green'})
        this._addGrid()
        this._addCompass()
        this.svg = {el:'svg', width: this.svgWidth, height: this.svgHeight, els: this.els}
    }

    _addCompass() {
        let fs = 24 / this.scale // font size
        this._addLabel(this.easting, this.north-fs, 'N')
        this._addLabel(this.east-fs, this.northing, 'E')
        this._addLabel(this.west+fs, this.northing, 'W')
        this._addLabel(this.easting, this.south+fs, 'S')
        this._addLabel(this.west+fs, this.north-fs, 'NW')
        this._addLabel(this.east-fs, this.north-fs, 'NE')
        this._addLabel(this.west+fs, this.south+fs, 'SW')
        this._addLabel(this.east-fs, this.south+fs, 'SE')
    }

    _addGrid() {
        let x = this.x(this.easting)
        this.els.push({el:'line', stroke: 'black',
            x1:x, y1: this.y(this.north),
            x2:x, y2: this.y(this.south)})
        for(x=this.west; x<=this.east; x+=this.width/20) {
            this.els.push({el:'line', stroke: 'grey',
                x1: this.x(x), y1: this.y(this.north),
                x2: this.x(x), y2: this.y(this.south)})
            this._addTic(x, this.north-5, x.toFixed(0))
            this._addTic(x, this.south+5, x.toFixed(0))
        }
        let y = this.y(this.northing)
        this.els.push({el:'line', stroke: 'black',
            x1: this.x(this.west), y1:y,
            x2: this.x(this.east), y2:y})
        for(y=this.south; y<=this.north; y+=this.height/20) {
            this.els.push({el:'line', stroke: 'grey',
                x1: this.x(this.west), y1: this.y(y),
                x2: this.x(this.east), y2: this.y(y)})
            this._addTic(this.west+5, y, y.toFixed(0), 'start')
            this._addTic(this.east-5, y, y.toFixed(0), 'end')
        }
    }

    _addLabel(easting, northing, str, stroke='black') {
        const x = this.x(easting)
        const y = this.y(northing)
        this.els.push({el: 'text', x, y, stroke,
            'text-anchor': 'middle', 'font-family': 'sans-serif',
            'font-weight': 'light','font-size': 24,
            els: [{el: 'inner', content: str}]
        })
    }

    _addTic(easting, northing, str, anchor='middle', stroke='grey') {
        const x = this.x(easting)
        const y = this.y(northing)
        this.els.push({el: 'text', x, y, stroke,
            'text-anchor': anchor, 'font-family': 'sans-serif',
            'font-weight': 'light','font-size': 12,
            els: [{el: 'inner', content: str}]
        })
    }
}
