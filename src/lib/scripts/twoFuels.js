import { WfmsTwoFuels, Util } from '../index.js'

const wfms = new WfmsTwoFuels()

// We can change the WfmsTwoFuels default inputs      
wfms.set(wfms.primary.fuel, '10')
wfms.set(wfms.secondary.fuel, '124')
wfms.set(wfms.primary.cover, 0.6)
wfms.set(wfms.primary.midflame, 880)
wfms.set(wfms.secondary.midflame, 880)
wfms.set(wfms.mois.tl1, 0.05)
wfms.set(wfms.mois.tl10, 0.07)
wfms.set(wfms.mois.tl100, 0.09)
wfms.set(wfms.mois.herb, 0.5)
wfms.set(wfms.mois.stem, 1.5)
wfms.set(wfms.slope.ratio, 0.25)
wfms.set(wfms.slope.aspect, 180)
wfms.set(wfms.wind.source, 270)

wfms.updateAll()

Util.logDagNodes(wfms.selected(), 'Selected Node Values')
Util.logDagConfigs(wfms.activeConfigsByKey(), 'Active Configurations')
