	import { Paths as P } from '../index.js'
    import { Wfms, Util } from '../index.js'

    // Step 1 - create the Behave Dag
    const wfms = new Wfms()
    const dag = wfms.dag
    console.log('REFRESHED :', new Date())

    // Step 2 - configure the DAG
    wfms.setConfig([
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

    // Step 3 - select outputs
    // const bulk     = dag.nodeRef('primary/bed/bulk density')
    const cured    = dag.nodeRef('weather/curing/fraction/applied')

    const cover2   = dag.nodeRef('surface/fire/cover/secondary')
    const ros1 = dag.nodeRef('primary/fire/heading/spread rate')
    const ros2 = dag.nodeRef('secondary/fire/heading/spread rate')
    const rosH = dag.nodeRef('surface/fire/spread rate/harmonic mean')
    const rosA = dag.nodeRef('surface/fire/spread rate/arithmetic mean')
    const rosW = dag.nodeRef('surface/fire/heading/spread rate')
    
    const dirNo1 = dag.nodeRef('primary/fire/heading/direction/from north')
    const dirNo2 = dag.nodeRef('secondary/fire/heading/direction/from north')
    const dirNoW = dag.nodeRef('surface/fire/heading/direction/from north')
    
    const dirUp1 = dag.nodeRef('primary/fire/heading/direction/from up-slope')
    const dirUp2 = dag.nodeRef('primary/fire/heading/direction/from up-slope')
    const dirUpW = dag.nodeRef('surface/fire/heading/direction/from up-slope')

    const lwr1 = dag.nodeRef('primary/fire/length-to-width ratio')
    const lwr2 = dag.nodeRef('secondary/fire/length-to-width ratio')
    const lwrW = dag.nodeRef('surface/fire/length-to-width ratio')

    const mid1 = dag.nodeRef('primary/fire/wind/speed/midflame')
    const mid2 = dag.nodeRef('secondary/fire/wind/speed/midflame')
    const midW = dag.nodeRef('surface/fire/wind/speed/midflame')

    const rxi1 = dag.nodeRef('primary/fire/reaction intensity')
    const rxi2 = dag.nodeRef('secondary/fire/reaction intensity')
    const rxiW = dag.nodeRef('surface/fire/reaction intensity')

    const ews1 = dag.nodeRef('primary/fire/effective wind/speed')
    const ews2 = dag.nodeRef('secondary/fire/effective wind/speed')
    const ewsW = dag.nodeRef('surface/fire/effective wind/speed')

    const ewsl1 = dag.nodeRef('primary/fire/effective wind/speed/limit')
    const ewsl2 = dag.nodeRef('secondary/fire/effective wind/speed/limit')
    const ewslW = dag.nodeRef('surface/fire/effective wind/speed/limit')

    const ewsx2 = dag.nodeRef('primary/fire/effective wind/speed/exceeded')
    const ewsx1 = dag.nodeRef('secondary/fire/effective wind/speed/exceeded')
    const ewsxW = dag.nodeRef('surface/fire/effective wind/speed/exceeded')
    
    const hpua1 = dag.nodeRef('primary/fire/heat per unit area')
    const hpua2 = dag.nodeRef('secondary/fire/heat per unit area')
    const houaW = dag.nodeRef('surface/fire/heat per unit area')

    const fli1 = dag.nodeRef('primary/fire/heading/fireline intensity')
    const fli2 = dag.nodeRef('secondary/fire/heading/fireline intensity')
    const fliW = dag.nodeRef('surface/fire/heading/fireline intensity')

    const fl1 = dag.nodeRef('primary/fire/heading/flame length')
    const fl2 = dag.nodeRef('secondary/fire/heading/flame length')
    const flW = dag.nodeRef('surface/fire/heading/flame length')

    // Can mix and match node keys and references, as scalars or arrays
    dag.select(ros1, ros2, rosA, rosH, rosW)
    // Util.logDagNodes(dag.selected(), 'Selected Nodes')

    // Step 3 - get active configurations and inputs
    const activeConfigs = dag.activeConfigsByKey()
    Util.listActiveConfigs(dag)

    const inputs = dag.activeInputs()

    // Step 3 - set inputs
    const key1       = dag.nodeRef('primary/model/standard/key')
    const key2       = dag.nodeRef('secondary/model/standard/key')
    const cover1     = dag.nodeRef('surface/fire/cover/primary')
    const midflame1  = dag.nodeRef('primary/wind/speed/midflame')
    const midflame2  = dag.nodeRef('secondary/wind/speed/midflame')
    const aspect     = dag.nodeRef('terrain/slope/direction/down-slope')
    const upslope    = dag.nodeRef('terrain/slope/direction/up-slope')
    const slopeRatio = dag.nodeRef('terrain/slope/steepness/ratio')
    const mois1      = dag.nodeRef('weather/moisture/dead/1-h')
    const mois10     = dag.nodeRef('weather/moisture/dead/10-h')
    const mois100    = dag.nodeRef('weather/moisture/dead/100-h')
    const moisHerb   = dag.nodeRef('weather/moisture/live/herb')
    const moisStem   = dag.nodeRef('weather/moisture/live/stem')
    const windFromNorth = dag.nodeRef('weather/wind/direction/source/from north')
    // const windHeadUpslp = dag.nodeRef('weather/wind/direction/heading/from up-slope')
    dag.set(key1, '10')
    dag.set(key2, '124')
    dag.set(cover1, 0.6)
    dag.set(midflame1, 880)
    dag.set(midflame2, 880)
    dag.set(mois1, 0.05)
    dag.set(mois10, 0.07)
    dag.set(mois100, 0.09)
    dag.set(moisHerb, 0.5)
    dag.set(moisStem, 1.5)
    dag.set(slopeRatio, 0.25)
    dag.set(aspect, 180)
    dag.set(windFromNorth, 270)

    Util.logDagNodes(dag.activeInputs(), 'Active Input Values')

// Step 8 - Get output values
dag.updateAll() // or call get(nodeKey) on a selected node
Util.logDagNodes(dag.selected(), 'Selected Node Values')
// Util.logDagNodes(dag.nodes(), 'All Nodes')
