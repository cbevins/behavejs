import { WfmsTwoFuels, Util } from '../index.js'

const wfms = new WfmsTwoFuels()
const activeConfigs = wfms.activeConfigsByKey()

// We can change the WfmsTwoFuels default inputs      
wfms.set(wfms.key1, '10')
wfms.set(wfms.key2, '124')
wfms.set(wfms.cover1, 0.6)
wfms.set(wfms.midflame1, 880)
wfms.set(wfms.midflame2, 880)
wfms.set(wfms.mois1, 0.05)
wfms.set(wfms.mois10, 0.07)
wfms.set(wfms.mois100, 0.09)
wfms.set(wfms.moisHerb, 0.5)
wfms.set(wfms.moisStem, 1.5)
wfms.set(wfms.slopeRatio, 0.25)
wfms.set(wfms.aspect, 180)
wfms.set(wfms.windFromNorth, 270)

wfms.updateAll()

Util.logDagNodes(wfms.selected(), 'Selected Node Values')
Util.logDagConfigs(wfms.activeConfigsByKey(), 'Active Configurations')
