import { describe, it, expect } from 'vitest'
import { sig } from './matchers.js'
import { WfmsTwoFuels } from '../../index.js'

expect.extend({ sig })

// Results from BehavePlus V6
const ros   = { fm010: 18.551680325448835, fm124: 48.47042599399056,  prec: 10 }
const dirUp = { fm010: 87.573367385837855, fm124: 87.613728665173383, prec: 11 }
const dirNo = { fm010: 87.573367385837855, fm124: 87.613728665173383, prec: 11 }
const lwr   = { fm010: 3.5015680219321221, fm124: 3.501581941,        prec: 10 }
const rxi   = { fm010: 5794.6954002291168, fm124: 12976.692888496578, prec: 12 }
const ews   = { fm010: 880.55194372010692, fm124: 880.5568433322004,  prec: 12 }
const ewsl  = { fm010: 5215.2258602062057, fm124: 11679.02359964692,  prec: 12 }
const ewsx  = { fm010: false,              fm124: false }
const hpua  = { fm010: 1261.1929372603729, fm124: 12976.692888496578 * 0.23541979977677915, prec: 12}
const fli   = { fm010: 389.95413667947145, fm124: 2467.928645, prec: 11 }
const flame = { fm010: 6.9996889013229229, fm124: 16.35631663, prec: 11 }
// const scorch = { fm010: 39.580182, fm124: 215.682771, prec: 8 }

const cover1 = 0.6
const ros1 = ros.fm010
const ros2 = ros.fm124
ros.harm = 1 / (cover1 / ros1 + (1 - cover1) / ros2)
ros.arith = cover1 * ros1 + (1 - cover1) * ros2

// Get our results
const wfms = new WfmsTwoFuels()
const {canopy, moisture, slope, surface, wind} = wfms.nodeRefs
const {primary, secondary} = surface

wfms.set(primary.cover, 0.6)
    .set(primary.fuel.key, '10')
    .set(secondary.fuel.key, '124')
    .set(primary.midflame, 880)
    .set(secondary.midflame, 880)
    .set(moisture.tl1, 0.05)
    .set(moisture.tl10, 0.07)
    .set(moisture.tl100, 0.09)
    .set(moisture.herb, 0.5)
    .set(moisture.stem, 1.5)
    .set(slope.ratio, 0.25)
    .set(slope.aspect, 180)
    .set(wind.source, 270)
    .updateAll()

const {primary:p, secondary:s, weighted:w} = wfms.nodeRefs.surface

describe('Two fuel models', () => {

    // The final RoS is bound to the harmonic mean RoS
    it('primary, secondary, and weighted RoS agrees with BehavePlus V6', () => {
        expect(p.ros.value).sig(ros.fm010, ros.prec)
        expect(s.ros.value).sig(ros.fm124, ros.prec)
        expect(w.harmonic.value).sig(ros.harm, ros.prec)
        expect(w.arithmetic.value).sig(ros.arith, ros.prec)
        expect(w.ros.value).sig(ros.harm, ros.prec)
    })

    // The heading from upslope, effective wind speed, length-to-width ratio,
    // midflame wind speed, and wsrf are all bound to the PRIMARY FUEL.
    // In this case, its fm010:
    it('primary, secondary, and weighted heading driection from upslope agrees with BehavePlus V6', () => {
        expect(p.heading.fromUpslope.value).sig(dirUp.fm010, dirUp.prec)
        expect(s.heading.fromUpslope.value).sig(dirUp.fm124, dirUp.prec)
        expect(w.heading.fromUpslope.value).sig(dirUp.fm010, dirUp.prec)
    })

    it('primary, secondary, and weighted length-to-width ratio agrees with BehavePlus V6', () => {
        expect(p.lwr.value).sig(lwr.fm010, lwr.prec)
        expect(s.lwr.value).sig(lwr.fm124, lwr.prec)
        expect(w.lwr.value).sig(lwr.fm010, lwr.prec)
    })
    
    it('primary, secondary, and weighted effective wind speed agrees with BehavePlus V6', () => {
        expect(p.ewind.speed.value).sig(ews.fm010, ews.prec)
        expect(s.ewind.speed.value).sig(ews.fm124, ews.prec)
        expect(w.ewind.speed.value).sig(ews.fm010, ews.prec)
    })

    // The fireline intensity, reaction itensity, flame length, and heat per unit area
    // are all bound to the MAXIMUM of the two fuels,
    // In this case, its fm124:
    it('primary, secondary, and weighted fireline intensity agrees with BehavePlus V6', () => {
        expect(p.fli.value).sig(fli.fm010, fli.prec)
        expect(s.fli.value).sig(fli.fm124, fli.prec)
        expect(w.fli.value).sig(fli.fm124, fli.prec)
    })

    // The effective wind speed limit is bound to the MINIMUM of the two fuels.
    // In this case, its fm010
    it('primary, secondary, and weighted effective wind speed limit agrees with BehavePlus V6', () => {
        expect(p.ewind.limit.value).sig(ewsl.fm010, ewsl.prec)
        expect(s.ewind.limit.value).sig(ewsl.fm124, ewsl.prec)
        expect(w.ewind.limit.value).sig(ewsl.fm010, ewsl.prec)
    })

    // The effective wind speed limit exceeded is TRUE if EITHER fuel's limit is exceeded
    // In this case, its FALSE for both fuels
    it('primary, secondary, and weighted effective wind speed limit exceeded agrees with BehavePlus V6', () => {
        expect(p.ewind.exceeded.value).toBe(ewsx.fm010)
        expect(s.ewind.exceeded.value).toBe(ewsx.fm124)
        expect(w.ewind.exceeded.value).toBe(ewsx.fm010 || ewsx.fm124)
    })
})