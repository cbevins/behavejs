import { WfmsFireEllipse, Util } from '../index.js'
import { SurfaceFireEquations } from '../index.js'

//------------------------------------------------------------------------------
// Results from fireEllipse.bp6.results.js
//------------------------------------------------------------------------------
const scale = 24000
const et = 60

const beta5fli010 = (389.95413667947145 * 2.6256648650882601) / 18.551680325448835
const beta5fl010 = 0.45 * Math.pow(beta5fli010, 0.46)
const beta5scht010 = SurfaceFireEquations.scorchHeight(beta5fli010, 880, 95)

const beta5fli124 = (2467.9286450361865 * 6.8494531181657319) / 48.47042599399056
const beta5fl124 = 0.45 * Math.pow(beta5fli124, 0.46)
const beta5scht124 = SurfaceFireEquations.scorchHeight(beta5fli124, 880, 95)

const m = scale
const m2 = m * m

const surfaceRos = { fm010: 18.551680325448835, fm124: 48.47042599399056,  prec: 10 }
const surfaceLwr = { fm010: 3.5015680219321221, fm124: 3.501581941,        prec: 10 }
const surfaceDir = { fm010: 87.573367385837855, fm124: 87.613728665173383, prec: 10 }

const eccent = { fm010: 0.95835298387126711, fm124: 0.95835332217217739, prec: 10 }
const lwr = { fm010: 3.5015680219321221, fm124: 3.5015819412846603, prec: 10 }
const majorRos = { fm010: 0.39452649041938642 + 18.551680325448835, fm124: 1.0307803973340242 + 48.47042599399056, prec: 10 }
const minorRos = { fm010: 2 * 2.7053889424963877, fm124: 2 * 7.0684061120619655, prec: 10 }
const fRos = { fm010: 9.4731034079341114, fm124: 1485.0361917397374 / 60.0, prec: 9 }
const gRos = { fm010: 9.0785769175147255, fm124: 1423.189367899696 / 60.0, prec: 9 }
const hRos = { fm010: 2.7053889424963877, fm124: 424.10436672371787 / 60.0, prec: 8 }

const headRos = { fm010: 18.551680325448835, fm124: 48.47042599399056, prec: 9 }
const headFli = { fm010: 389.95413667947145, fm124: 2467.9286450361865, prec: 10 }
const headFlame = { fm010: 6.9996889013229229, fm124: 16.35631663317114, prec: 10 }
const headDist = { fm010: 1113.1008195269301, fm124: 2908.2255596394334, prec: 10 }
const headMapDist = { fm010: 1113.1008195269301/scale, fm124: 2908.2255596394334/scale,  prec: 10}
const headSCorch = { fm010: 39.580181786322299, fm124: 215.6827714, prec: 10 }

const backRos = { fm010: 0.39452649041938642, fm124: 1.0307803973340242, prec: 10 }
const backFli = { fm010: 8.2929003879841954, fm124: 52.483394093499705, prec: 10 }
const backFlame =  { fm010: 1.1907414731175683, fm124: 2.7824194067294856, prec: 10 }
const backDist = { fm010: 23.671589425163184, fm124: 61.846823840041452, prec: 10 }
const backMapDist = { fm010: 23.671589425163184/scale, fm124: 61.846823840041452/scale, prec: 10 }
const backScorch = { fm010: 0.52018662032054752, fm124: 4.3824121071933915, prec: 10 }

const flankRos = { fm010: 2.7053889424963877, fm124: 7.0684061120619655, prec: 8 }
const flankFli = { fm010: 56.866957074505869, fm124: 359.89619544220318, prec: 8 }
const flankFlame = { fm010: 2.8870088099013929, fm124: 6.7461198324614715, prec: 9 }
const flankDist = { fm010: 162.32333654978328, fm124: 424.10436672371793, prec: 9 }
const flankMapDist = { fm010: 162.32333654978328/scale, fm124: 424.10436672371793/scale, prec: 9 }
const flankScorch = { fm010: 4.8023644521509334, fm124: 36.440372402518008, prec: 8 }

const betaRos = { fm010: 2.6256648650882601, fm124: 6.8494531181657319, prec: 9 }
const betaFli = { fm010: 22.809320529051977, fm124: 144.22374220988746, prec: 8 }
const betaFlame = { fm010: 1.896462213587117, fm124: 4.4296501098298906, prec: 9 }
const betaDist = { fm010: et * 2.6256648650882601, fm124: et * 6.8494531181657319, prec: 9 }
const betaMapDist = { fm010: (et * 2.6256648650882601)/scale, fm124: (et * 6.8494531181657319)/scale, prec: 9 }
const betaScorch = { fm010: 1.6814949065754006, fm124: 13.669401441568459, prec: 8 }
const betaTheta = { fm010: 138.95912883244358, fm124: 138.998426267168, prec: 9 }
const betaPsi = { fm010: 108.16241745554537, fm124: 108.185867694348, prec: 9 }

const beta5Ros = { fm010: 2.6256648650882601, fm124: 6.8494531181657319, prec: 9 }
const beta5Fli = { fm010: beta5fli010, fm124: beta5fli124, prec: 9 }
const beta5Flame = { fm010: beta5fl010, fm124: beta5fl124, prec: 9 }
const beta5Dist = { fm010: et * 2.6256648650882601, fm124: et * 6.8494531181657319, prec: 9 }
const beta5MapDist = { fm010: (et * 2.6256648650882601)/scale, fm124: (et * 6.8494531181657319)/scale, prec: 9 }
const beta5Scorch = { fm010: beta5scht010, fm124: beta5scht124, prec: 9 }

const psiRos = { fm010: 13.8977795836636, fm124: 36.2892704981354, prec: 9 }
const psiFli = { fm010: 292.129690908633, fm124: 1847.71081196849, prec: 9 }
const psiFlame = { fm010: 6.12882661647451, fm124: 14.3173998471815, prec: 9 }
const psiDist = { fm010: et * 13.8977795836636, fm124: et * 36.2892704981354, prec: 9 }
const psiMapDist = { fm010: (et * 13.8977795836636)/scale, fm124: (et * 36.2892704981354)/scale, prec: 8 }
const psiScorch = { fm010: 29.307635864149884, fm124: 169.80644998818718, prec: 9 }

const vectorNorth = { fm010: 45, fm124: 45, prec: 10 }
const vectorUpslope = { fm010: 45, fm124: 45, prec: 10 }
const vectorHead = { fm010: 360 - 42.573367385837855, fm124: 360 - 42.613728665173383, prec: 10 }

const sizeArea = { fm010: 289850.691417, fm124: 45.422576205218135 * (66.0 * 660.0), prec: 6 }
const sizeLength = { fm010: 1136.7724089520932, fm124: 2970.0723834794749, prec: 9 }
const sizePerim = { fm010: 2476.2400999186934, fm124: 6469.7282289420209, prec: 9 }
const sizeWidth = { fm010: 324.64667309956644, fm124: 848.20873344743575, prec: 9 }
const mapArea = { fm010: 289850.691417/m2, fm124: (45.422576205218135 * (66 * 660))/m2, prec: 6 }
const mapLength = { fm010: 1136.7724089520932/scale, fm124: 2970.0723834794749/scale, prec: 9 }
const mapPerim = { fm010: 2476.2400999186934/scale, fm124: 6469.7282289420209/scale, prec: 9 }
const mapWidth = { fm010: 324.64667309956644/scale, fm124: 848.20873344743575/scale, prec: 9 }

//------------------------------------------------------------------------------
// Create 
//------------------------------------------------------------------------------
const wfms = new WfmsFireEllipse('Fire Ellipse Debugging')

Util.logDagNodes(wfms.activeInputsByKey(), 'Active Input Node Values')
Util.logDagNodes(wfms.selected(), 'Selected Node Values')
Util.logDagConfigs(wfms.activeConfigsByKey(), 'Active Configurations')
