import { describe, it, expect } from 'vitest'
import { sig } from './matchers.js'
import { Wfms, WfmsFireEllipse, Util } from '../index.js'
import { SurfaceFireEquations } from '../index.js'

expect.extend({ sig })

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

const surfaceRos = { fm010: 18.551680325448835, fm124: 48.47042599399056,  prec: 12 }
const surfaceLwr = { fm010: 3.5015680219321221, fm124: 3.501581941,        prec: 12 }
const surfaceDir = { fm010: 87.573367385837855, fm124: 87.613728665173383, prec: 12 }

const eccent = { fm010: 0.95835298387126711, fm124: 0.95835332217217739, prec: 13 }
const lwr = { fm010: 3.5015680219321221, fm124: 3.5015819412846603, prec: 12 }
const majorRos = { fm010: 0.39452649041938642 + 18.551680325448835, fm124: 1.0307803973340242 + 48.47042599399056, prec: 10 }
const minorRos = { fm010: 2 * 2.7053889424963877, fm124: 2 * 7.0684061120619655, prec: 12 }
const fRos = { fm010: 9.4731034079341114, fm124: 1485.0361917397374 / 60.0, prec: 10 }
const gRos = { fm010: 9.0785769175147255, fm124: 1423.189367899696 / 60.0, prec: 12 }
const hRos = { fm010: 2.7053889424963877, fm124: 424.10436672371787 / 60.0, prec: 11 }

const headRos = { fm010: 18.551680325448835, fm124: 48.47042599399056, prec: 12 }
const headFli = { fm010: 389.95413667947145, fm124: 2467.9286450361865, prec: 11 }
const headFlame = { fm010: 6.9996889013229229, fm124: 16.35631663317114, prec: 12 }
const headDist = { fm010: 1113.1008195269301, fm124: 2908.2255596394334, prec: 12 }
const headMapDist = { fm010: 1113.1008195269301/scale, fm124: 2908.2255596394334/scale,  prec: 11}
const headScorch = { fm010: 39.580181786322299, fm124: 215.6827714, prec: 12 }

const backRos = { fm010: 0.39452649041938642, fm124: 1.0307803973340242, prec: 13 }
const backFli = { fm010: 8.2929003879841954, fm124: 52.483394093499705, prec: 12 }
const backFlame =  { fm010: 1.1907414731175683, fm124: 2.7824194067294856, prec: 14 }
const backDist = { fm010: 23.671589425163184, fm124: 61.846823840041452, prec: 13 }
const backMapDist = { fm010: 23.671589425163184/scale, fm124: 61.846823840041452/scale, prec: 12 }
const backScorch = { fm010: 0.52018662032054752, fm124: 4.3824121071933915, prec: 12 }

const flankRos = { fm010: 2.7053889424963877, fm124: 7.0684061120619655, prec: 11 }
const flankFli = { fm010: 56.866957074505869, fm124: 359.89619544220318, prec:9 }
const flankFlame = { fm010: 2.8870088099013929, fm124: 6.7461198324614715, prec: 9 }
const flankDist = { fm010: 162.32333654978328, fm124: 424.10436672371793, prec: 11 }
const flankMapDist = { fm010: 162.32333654978328/scale, fm124: 424.10436672371793/scale, prec: 12 }
const flankScorch = { fm010: 4.8023644521509334, fm124: 36.440372402518008, prec: 12 }

const betaRos = { fm010: 2.6256648650882601, fm124: 6.8494531181657319, prec: 11 }
const betaFli = { fm010: 22.809320529051977, fm124: 144.22374220988746, prec: 10 }
const betaFlame = { fm010: 1.896462213587117, fm124: 4.4296501098298906, prec: 10 }
const betaDist = { fm010: et * 2.6256648650882601, fm124: et * 6.8494531181657319, prec: 11 }
const betaMapDist = { fm010: (et * 2.6256648650882601)/scale, fm124: (et * 6.8494531181657319)/scale, prec: 10 }
const betaScorch = { fm010: 1.6814949065754006, fm124: 13.669401441568459, prec: 12 } // to do
const betaTheta = { fm010: 138.95912883244358, fm124: 138.998426267168, prec: 12 }  // to do
const betaPsi = { fm010: 108.16241745554537, fm124: 108.185867694348, prec: 12 } // to do

const beta5Ros = { fm010: 2.6256648650882601, fm124: 6.8494531181657319, prec: 11 }
const beta5Fli = { fm010: beta5fli010, fm124: beta5fli124, prec: 9 }
const beta5Flame = { fm010: beta5fl010, fm124: beta5fl124, prec: 10 }
const beta5Dist = { fm010: et * 2.6256648650882601, fm124: et * 6.8494531181657319, prec: 11 }
const beta5MapDist = { fm010: (et * 2.6256648650882601)/scale, fm124: (et * 6.8494531181657319)/scale, prec: 10 }
const beta5Scorch = { fm010: beta5scht010, fm124: beta5scht124, prec: 12 }

const psiRos = { fm010: 13.8977795836636, fm124: 36.2892704981354, prec: 11 }
const psiFli = { fm010: 292.129690908633, fm124: 1847.71081196849, prec: 11 }
const psiFlame = { fm010: 6.12882661647451, fm124: 14.3173998471815, prec: 11 }
const psiDist = { fm010: et * 13.8977795836636, fm124: et * 36.2892704981354, prec: 11 }
const psiMapDist = { fm010: (et * 13.8977795836636)/scale, fm124: (et * 36.2892704981354)/scale, prec: 10 }
const psiScorch = { fm010: 29.307635864149884, fm124: 169.80644998818718, prec: 12 }

const vectorNorth = { fm010: 45, fm124: 45, prec: 15 }
const vectorUpslope = { fm010: 45, fm124: 45, prec: 15 }
const vectorHead = { fm010: 360 - 42.573367385837855, fm124: 360 - 42.613728665173383, prec: 13 }

const sizeArea = { fm010: 289850.691417, fm124: 45.422576205218135 * (66.0 * 660.0), prec: 7 }
const sizeLength = { fm010: 1136.7724089520932, fm124: 2970.0723834794749, prec: 12 }
const sizePerim = { fm010: 2476.2400999186934, fm124: 6469.7282289420209, prec: 11 }
const sizeWidth = { fm010: 324.64667309956644, fm124: 848.20873344743575, prec: 10 }
const mapArea = { fm010: 289850.691417/m2, fm124: (45.422576205218135 * (66 * 660))/m2, prec: 8 }
const mapLength = { fm010: 1136.7724089520932/scale, fm124: 2970.0723834794749/scale, prec: 10 }
const mapPerim = { fm010: 2476.2400999186934/scale, fm124: 6469.7282289420209/scale, prec: 11 }
const mapWidth = { fm010: 324.64667309956644/scale, fm124: 848.20873344743575/scale, prec: 12 }

const wfms = new WfmsFireEllipse()
// Node references for convenience
const {canopy, ellipse, map, moisture, slope, surface, wind} = wfms.nodeRefs
const {primary, secondary, weighted} = surface
const {axis, back, beta, beta5, direction, flank, head, map:emap,
    psi, size, temp, time, vector } = ellipse

wfms.set(vector.north, 45)
wfms.set(time, 60)
wfms.set(map.scale, 24000)
wfms.set(temp, 95)
wfms.set(primary.fuel.key, '10')
wfms.set(primary.midflame, 880)
wfms.set(slope.aspect, 180)
wfms.set(slope.ratio, 0.25)
wfms.set(moisture.tl1, 0.05)
wfms.set(moisture.tl10, 0.07)
wfms.set(moisture.tl100, 0.09)
wfms.set(moisture.herb, 0.5)
wfms.set(moisture.stem, 1.5)
wfms.set(wind.source, 270)
wfms.updateAll()

// If interested in these ...
// Util.logDagNodes(wfms.selected(), 'Selected Node Values')
Util.logDagConfigs(wfms.activeConfigsByKey(), 'Active Configurations')
// Util.logDagNodes(wfms.activeInputsByKey(), 'Active Inputs')

describe('Test 1: Fire Ellipse agrees with BehavePlus V6 tests', () => {
    it('1.1 - ensure the surface results are as expected', () => {
        expect(wfms.getConfigValue('ellipse/fire/inputs')).toBe('surface')
        expect(weighted.heading.fromUpslope.value).sig(surfaceDir.fm010, surfaceDir.prec)
        expect(weighted.heading.fromNorth.value).sig(surfaceDir.fm010, surfaceDir.prec)
        expect(weighted.ros.value).sig(surfaceRos.fm010, surfaceDir.prec)
        expect(weighted.lwr.value).sig(surfaceLwr.fm010, surfaceDir.prec)
    })
    it('1.2 - axis values', () => {
        expect(ellipse.eccent.value).sig(eccent.fm010, eccent.prec)
        expect(axis.lwr.value).sig(lwr.fm010, lwr.prec)
        expect(axis.f.value).sig(fRos.fm010, fRos.prec)
        expect(axis.g.value).sig(gRos.fm010, gRos.prec)
        expect(axis.h.value).sig(hRos.fm010, hRos.prec)
        expect(axis.major.value).sig(majorRos.fm010, majorRos.prec)
        expect(axis.minor.value).sig(minorRos.fm010, majorRos.prec)
    })
    it('1.3a - fire size and dimensions', () => {
        expect(time.value).sig(et, 11)
        expect(size.length.value).sig(sizeLength.fm010, sizeLength.prec)
        expect(size.width.value).sig(sizeWidth.fm010, sizeWidth.prec)
        expect(size.area.value).sig(sizeArea.fm010, sizeArea.prec)
        expect(size.perim.value).sig(sizePerim.fm010, sizePerim.prec)
    })
    it('1.3b - fire map size and dimensions', () => {
        expect(map.scale.value).sig(scale, 11)
        expect(emap.length.value).sig(mapLength.fm010, mapLength.prec)
        expect(emap.width.value).sig(mapWidth.fm010, mapWidth.prec)
        expect(emap.area.value).sig(mapArea.fm010, mapArea.prec)
        expect(emap.perim.value).sig(mapPerim.fm010, mapPerim.prec)
    })
    it('1.4 - spread frates for head, back, flank, beta, beta5, and psi', () => {
        expect(head.ros.value).sig(headRos.fm010, headRos.prec)
        expect(back.ros.value).sig(backRos.fm010, backRos.prec)
        expect(flank.ros.value).sig(flankRos.fm010, flankRos.prec)
        expect(beta.ros.value).sig(betaRos.fm010, betaRos.prec)
        expect(beta5.ros.value).sig(beta5Ros.fm010, beta5Ros.prec)
        expect(psi.ros.value).sig(psiRos.fm010, psiRos.prec)
    })
    it('1.5 - fireline intensity for head, back, flank, beta, beta5, and psi', () => {
        expect(head.fli.value).sig(headFli.fm010, headFli.prec)
        expect(back.fli.value).sig(backFli.fm010, backFli.prec)
        expect(flank.fli.value).sig(flankFli.fm010, flankFli.prec)
        expect(beta.fli.value).sig(betaFli.fm010, betaFli.prec)
        expect(beta5.fli.value).sig(beta5Fli.fm010, beta5Fli.prec)
        expect(psi.fli.value).sig(psiFli.fm010, psiFli.prec)
    })
    it('1.6 - flame length for head, back, flank, beta, beta5, and psi', () => {
        expect(head.flame.value).sig(headFlame.fm010, headFlame.prec)
        expect(back.flame.value).sig(backFlame.fm010, backFlame.prec)
        expect(flank.flame.value).sig(flankFlame.fm010, flankFlame.prec)
        expect(beta.flame.value).sig(betaFlame.fm010, betaFlame.prec)
        expect(beta5.flame.value).sig(beta5Flame.fm010, beta5Flame.prec)
        expect(psi.flame.value).sig(psiFlame.fm010, psiFlame.prec)
    })
    it('1.7 - distance for head, back, flank, beta, beta5, and psi', () => {
        expect(head.dist.value).sig(headDist.fm010, headDist.prec)
        expect(back.dist.value).sig(backDist.fm010, backDist.prec)
        expect(flank.dist.value).sig(flankDist.fm010, flankDist.prec)
        expect(beta.dist.value).sig(betaDist.fm010, betaDist.prec)
        expect(beta5.dist.value).sig(beta5Dist.fm010, beta5Dist.prec)
        expect(psi.dist.value).sig(psiDist.fm010, psiDist.prec)
    })
    it('1.8 - map distance for head, back, flank, beta, beta5, and psi', () => {
        expect(head.mapdist.value).sig(headMapDist.fm010, headMapDist.prec)
        expect(back.mapdist.value).sig(backMapDist.fm010, backMapDist.prec)
        expect(flank.mapdist.value).sig(flankMapDist.fm010, flankMapDist.prec)
        expect(beta.mapdist.value).sig(betaMapDist.fm010, betaMapDist.prec)
        expect(beta5.mapdist.value).sig(beta5MapDist.fm010, beta5MapDist.prec)
        expect(psi.mapdist.value).sig(psiMapDist.fm010, psiMapDist.prec)
    })
    it('1.5 - ellipse should link to surface for its inputs', () => {
        expect(vector.north.value).sig(vectorNorth.fm010, vectorNorth.prec)
        expect(vector.upslope.value).sig(vectorUpslope.fm010, vectorUpslope.prec)
        expect(vector.head.value).sig(vectorHead.fm010, vectorHead.prec)
        // expect(direction.north.value).sig(0, 11)
        // expect(direction.north.value).sig(dirMaxRosUp.fm010, dirMaxRosUp.prec)
        expect(weighted.heading.fromNorth.value).sig(surfaceDir.fm010, surfaceDir.prec)
        expect(weighted.heading.fromUpslope.value).sig(surfaceDir.fm010, surfaceDir.prec)
    })
})
