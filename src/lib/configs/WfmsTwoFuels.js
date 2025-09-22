import { Paths as P } from '../index.js'
import { WfmsConfig } from '../index.js'

export class WfmsTwoFuels extends WfmsConfig {
    constructor(name='Two Fuel Models Test') {
        super(name)
        this._setConfiguration()
        this._setSelected()
        this._setInputs()
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
        this.dag.set(this.key1, '10')
        this.dag.set(this.key2, '124')
        this.dag.set(this.cover1, 0.6)
        this.dag.set(this.midflame1, 880)
        this.dag.set(this.midflame2, 880)
        this.dag.set(this.mois1, 0.05)
        this.dag.set(this.mois10, 0.07)
        this.dag.set(this.mois100, 0.09)
        this.dag.set(this.moisHerb, 0.5)
        this.dag.set(this.moisStem, 1.5)
        this.dag.set(this.slopeRatio, 0.25)
        this.dag.set(this.aspect, 180)
        this.dag.set(this.windFromNorth, 270)
        this.dag.updateAll()
    }
}
