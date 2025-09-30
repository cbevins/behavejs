import { WfmsFireEllipse, Util } from '../index.js'
import { SurfaceFireEquations } from '../index.js'

const wfms = new WfmsFireEllipse('Fire Ellipse Debugging')
Util.logDagConfigs(wfms.activeConfigsByKey(), 'Active Configurations')
Util.logDagNodes(wfms.activeInputsByKey(), 'Active Input Node Values')
Util.logDagNodes(wfms.selected(), 'Selected Node Values')
