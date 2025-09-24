// import { describe, it, expect } from 'vitest'
import { Wfms, WfmsFireEllipse, Util } from '../index.js'

const wfms = new WfmsFireEllipse()
const dag  = wfms.dag

// If interested in these ...
Util.logDagNodes(dag.selected(), 'Selected Node Values')
Util.logDagConfigs(dag.activeConfigsByKey(), 'Active Configurations')
Util.logDagNodes(dag.activeInputsByKey(), 'Active Inputs')
