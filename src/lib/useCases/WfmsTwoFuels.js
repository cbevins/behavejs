import { Paths as P } from '../index.js'
import { WfmsUseCases } from '../index.js'

export class WfmsTwoFuels extends WfmsUseCases {
    constructor(name='Two Fuel Models Test') {
        super(name)
        this._assignTwoFuelsNodes()
        this._setConfiguration()
        this._setSelected()
        this._setInputs()
    }
    
    _assignTwoFuelsNodes() {
        const dag = this.dag

        // SurfaceFireModule and SurfaceFireWtgModule
        this.cover2   = dag.nodeRef('weighted/fire/cover/secondary')
        this.ros1 = dag.nodeRef('primary/fire/heading/spread rate')
        this.ros2 = dag.nodeRef('secondary/fire/heading/spread rate')
        this.rosH = dag.nodeRef('weighted/fire/spread rate/harmonic mean')
        this.rosA = dag.nodeRef('weighted/fire/spread rate/arithmetic mean')
        this.rosW = dag.nodeRef('weighted/fire/heading/spread rate')
        
        this.dirNo1 = dag.nodeRef('primary/fire/heading/degrees/from north')
        this.dirNo2 = dag.nodeRef('secondary/fire/heading/degrees/from north')
        this.dirNoW = dag.nodeRef('weighted/fire/heading/degrees/from north')
        
        this.dirUp1 = dag.nodeRef('primary/fire/heading/degrees/from up-slope')
        this.dirUp2 = dag.nodeRef('secondary/fire/heading/degrees/from up-slope')
        this.dirUpW = dag.nodeRef('weighted/fire/heading/degrees/from up-slope')

        this.lwr1 = dag.nodeRef('primary/fire/length-to-width ratio')
        this.lwr2 = dag.nodeRef('secondary/fire/length-to-width ratio')
        this.lwrW = dag.nodeRef('weighted/fire/length-to-width ratio')

        this.mid1 = dag.nodeRef('primary/fire/wind/speed/midflame')
        this.mid2 = dag.nodeRef('secondary/fire/wind/speed/midflame')
        this.midW = dag.nodeRef('weighted/fire/wind/speed/midflame')

        this.rxi1 = dag.nodeRef('primary/fire/reaction intensity')
        this.rxi2 = dag.nodeRef('secondary/fire/reaction intensity')
        this.rxiW = dag.nodeRef('weighted/fire/reaction intensity')

        this.ews1 = dag.nodeRef('primary/fire/effective wind/speed')
        this.ews2 = dag.nodeRef('secondary/fire/effective wind/speed')
        this.ewsW = dag.nodeRef('weighted/fire/effective wind/speed')

        this.ewsl1 = dag.nodeRef('primary/fire/effective wind/speed/limit')
        this.ewsl2 = dag.nodeRef('secondary/fire/effective wind/speed/limit')
        this.ewslW = dag.nodeRef('weighted/fire/effective wind/speed/limit')

        this.ewsx2 = dag.nodeRef('primary/fire/effective wind/speed/exceeded')
        this.ewsx1 = dag.nodeRef('secondary/fire/effective wind/speed/exceeded')
        this.ewsxW = dag.nodeRef('weighted/fire/effective wind/speed/exceeded')
        
        this.hpua1 = dag.nodeRef('primary/fire/heat per unit area')
        this.hpua2 = dag.nodeRef('secondary/fire/heat per unit area')
        this.hpuaW = dag.nodeRef('weighted/fire/heat per unit area')

        this.fli1 = dag.nodeRef('primary/fire/heading/fireline intensity')
        this.fli2 = dag.nodeRef('secondary/fire/heading/fireline intensity')
        this.fliW = dag.nodeRef('weighted/fire/heading/fireline intensity')

        this.fl1 = dag.nodeRef('primary/fire/heading/flame length')
        this.fl2 = dag.nodeRef('secondary/fire/heading/flame length')
        this.flW = dag.nodeRef('weighted/fire/heading/flame length')
    }


    _setConfiguration() {
        this.wfms.setConfig([
            [P.cfgSurfWtg,      ['primary', 'harmonic', 'arithmetic'][1]],
            [P.cfgCanopy,       ["height-base","ratio-height","height-length",
                                "ratio-base","ratio-length","length-base"][0]],
            [P.cfgEffWind,      ["applied","not applied"][0]],
            [P.cfgCured,        ["input","estimated"][1]],
            [P.cfgWsrf,         ["input","estimated"][0]],
            [P.cfgMidflame,     ["input","estimated"][0]],
            [P.cfgMoisDead,     ["particle","category"][0]],
            [P.cfgMoisLive,     ["particle","category"][0]],
            [P.cfgStdInput1,    ["catalog","custom"][0]],
            [P.cfgStdInput2,    ["catalog","custom"][0]],
            [P.cfgFuelDomain1,  ["standard","chaparral","palmetto","aspen"][0]],
            [P.cfgFuelDomain2,  ["standard","chaparral","palmetto","aspen"][0]],
            [P.cfgSlopeDir,     ["up-slope","down-slope"][1]],
            [P.cfgSlopeSteep,   ["ratio","degrees","map"][0]],
            [P.cfgWindSpeed,    ["at 20-ft","at 10-m"][0]],
            [P.cfgWindDir,      ["source from north","heading from up-slope","up-slope"][0]],
        ])
    }

    _setSelected() {
        // Can mix and match node keys and references, as scalars or arrays
        this.dag.select(
            this.ros1,
            this.ros2,
            this.rosA,
            this.rosH,
            this.rosW,
            this.dirUp1,
            this.dirUp2,
            this.dirUpW,
            this.ews1,
            this.ews2,
            this.ewsW,
            this.lwr1,
            this.lwr2,
            this.lwrW,
            this.fli1,
            this.fli2,
            this.fliW,
            this.ewsl1,
            this.ewsl2,
            this.ewslW,
            this.ewsx1,
            this.ewsx2,
            this.ewsxW,
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
