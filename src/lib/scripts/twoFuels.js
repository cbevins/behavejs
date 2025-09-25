import { WfmsTwoFuels, Util } from '../index.js'

const wfms = new WfmsTwoFuels()

// The following were already set by WfmsTwoFuels, but you can change them here if you want
const dag = wfms.dag
const {canopy, moisture, slope, surface, wind} = wfms.nodeRefs
const {primary, secondary} = surface

dag.set(primary.cover, 0.6)
dag.set(primary.fuel.key, '10')
dag.set(secondary.fuel.key, '124')
dag.set(primary.midflame, 880)
dag.set(secondary.midflame, 880)
dag.set(moisture.tl1, 0.05)
dag.set(moisture.tl10, 0.07)
dag.set(moisture.tl100, 0.09)
dag.set(moisture.herb, 0.5)
dag.set(moisture.stem, 1.5)
dag.set(slope.ratio, 0.25)
dag.set(slope.aspect, 180)
dag.set(wind.source, 270)

wfms.updateAll()

Util.logDagNodes(wfms.activeInputsByKey(), 'Active Input Node Values')
Util.logDagNodes(wfms.selected(), 'Selected Node Values')
Util.logDagConfigs(wfms.activeConfigsByKey(), 'Active Configurations')
