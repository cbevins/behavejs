import { WfmsUseCases } from '../index.js'

const wfms = new WfmsUseCases()
const dag = wfms.dag
const {primary, secondary, weighted} = wfms.nodeRefs.surface

const weighting = wfms.configObj.surface.weighting

console.log(`${weighting.key} should equal "primary", got "${weighting.value}"`)
// Not change the config
wfms.configure([[weighting.key, weighting.harmonic]])
const value = wfms.getConfigValue(weighting.key)
console.log(`${weighting.key} should now equal "harmonic", got "${value}"`)
