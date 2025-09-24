import { Paths as P } from '../index.js'
import { WfmsUseCases } from '../index.js'

export class WfmsFireEllipse extends WfmsUseCases {
    constructor(name='Fire Ellipse Test') {
        super(name)
        this._assignFireEllipseNodes()
        this._setConfiguration()
        this._setSelected()
        this._setInputs()
    }
    
    _assignFireEllipseNodes() {
        const dag = this.dag

        // SurfaceFireModule and SurfaceFireWtgModule
        // this.head.lwr = dag.nodeRef('ellipse/axis/length-to-width ratio')
        // this.head.ros = dag.nodeRef('ellipse/heading/spread rate')
    }


    _setConfiguration() {
        const old = [
  ['configure.fire.firelineIntensity', ['firelineIntensity', 'flameLength'][0]],
  ['configure.fire.lengthToWidthRatio', ['lengthToWidthRatio', 'effectiveWindSpeed'][0]],
]
// Configuration replicates the fireEllipse.bp6.results.js file
// which used linked modules, one fuel  model, and midflame input
        this.wfms.setConfig([
            [P.cfgSurfWtg,      ['primary', 'harmonic', 'arithmetic'][0]],
            [P.cfgCanopy,       ["height-base","ratio-height","height-length",
                                "ratio-base","ratio-length","length-base"][0]],
            [P.cfgEffWind,      ["applied","not applied"][0]],
            [P.cfgEllipse,      ['surface', 'observed'][0]],    // important
            [P.cfgVectors,      ['fire head','up-slope','north'][2]],   //important change

            [P.cfgCured,        ["input","estimated"][1]],
            [P.cfgWsrf,         ["input","estimated"][1]],      // inactive, midflame is input
            [P.cfgMidflame,     ["input","estimated"][1]],      // important  
            [P.cfgMoisDead,     ["particle","category"][0]],
            [P.cfgMoisLive,     ["particle","category"][0]],
            [P.cfgStdInput1,    ["catalog","custom"][0]],
            [P.cfgStdInput2,    ["catalog","custom"][0]],
            [P.cfgFuelDomain1,  ["standard","chaparral","palmetto","aspen"][0]],
            [P.cfgFuelDomain2,  ["standard","chaparral","palmetto","aspen"][0]],
            [P.cfgSlopeDir,     ["up-slope","down-slope"][1]],
            [P.cfgSlopeSteep,   ["ratio","degrees","map"][0]],
            [P.cfgWindSpeed,    ["at 20-ft","at 10-m"][0]],     // inactive, midflame is input
            [P.cfgWindDir,      ["source from north","heading from up-slope","up-slope"][0]],
        ])
    }

    _setSelected() {
        // Can mix and match node keys and references, as scalars or arrays
        this.dag.select(
            this.head.ros,
        )
    }

    _setInputs() {
        this.dag.set(this.primary.cover, 0.6)
        this.dag.set(this.primary.fuel, '10')
        this.dag.set(this.secondary.fuel, '124')
        this.dag.set(this.primary.midflame, 880)
        this.dag.set(this.secondary.midflame, 880)
        this.dag.set(this.mois.tl1, 0.05)
        this.dag.set(this.mois.tl10, 0.07)
        this.dag.set(this.mois.tl100, 0.09)
        this.dag.set(this.mois.herb, 0.5)
        this.dag.set(this.mois.stem, 1.5)
        this.dag.set(this.slope.ratio, 0.25)
        this.dag.set(this.slope.aspect, 180)
        this.dag.set(this.wind.source, 270)
        this.dag.updateAll()
    }
}
