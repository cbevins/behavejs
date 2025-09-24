import { describe, it, expect } from 'vitest'
import { WfmsTwoFuels } from '../index.js'

expect.extend({
    precision(received, expected, n) {
        const { isNot } = this
        let e = (''+expected)
        const chars = Math.min(n, e.length)
        e = e.substring(0, chars)
        const r = (''+received).substring(0, chars)
        return {
            // do not alter your "pass" based on isNot. Vitest does it for you
            pass: r === e,
            message: () => `"${received}" ${isNot ? ' matches' : ' does not match'} "${e}" to ${chars} places`
        }
    }
})

// Results from BehavePlus V6
const ros   = { fm010: 18.551680325448835, fm124: 48.47042599399056, prec: 11 }
const dirUp = { fm010: 87.573367385837855, fm124: 87.613728665173383, prec: 11 }
const lwr   = { fm010: 3.5015680219321221, fm124: 3.501581941, prec: 10 }
const rxi   = { fm010: 5794.6954002291168, fm124: 12976.692888496578, prec: 12 }
const ews   = { fm010: 880.55194372010692, fm124: 880.5568433322004, prec: 12 }
const ewsl  = { fm010: 5215.2258602062057, fm124: 11679.02359964692, prec: 12 }
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
// was wfms.set(wfms.windFromNorth, 270)
wfms.set(wfms.wind.source, 270)
wfms.updateAll()

describe('Two fuel models', () => {

    // The final RoS is bound to the harmonic mean RoS
    it('primary, secondary, and weighted RoS agrees with BehavePlus V6', () => {
        expect(wfms.ros1.value).precision(ros.fm010, ros.prec)
        expect(wfms.ros2.value).precision(ros.fm124, ros.prec)
        expect(wfms.rosH.value).precision(ros.harm, ros.prec)
        expect(wfms.rosA.value).precision(ros.arith, ros.prec)
        expect(wfms.rosW.value).precision(ros.harm, ros.prec)
    })

    // The heading from upslope, effective wind speed, length-to-width ratio,
    // midflame wind speed, and wsrf are all bound to the PRIMARY FUEL.
    // In this case, its fm010:
    it('primary, secondary, and weighted heading driection from upslope agrees with BehavePlus V6', () => {
        expect(wfms.dirUp1.value).precision(dirUp.fm010, dirUp.prec)
        expect(wfms.dirUp2.value).precision(dirUp.fm124, dirUp.prec)
        expect(wfms.dirUpW.value).precision(dirUp.fm010, dirUp.prec)
    })
    it('primary, secondary, and weighted length-to-width ratio agrees with BehavePlus V6', () => {
        expect(wfms.lwr1.value).precision(lwr.fm010, lwr.prec)
        expect(wfms.lwr2.value).precision(lwr.fm124, lwr.prec)
        expect(wfms.lwrW.value).precision(lwr.fm010, lwr.prec)
    })
    it('primary, secondary, and weighted effective wind speed agrees with BehavePlus V6', () => {
        expect(wfms.ews1.value).precision(ews.fm010, ews.prec)
        expect(wfms.ews2.value).precision(ews.fm124, ews.prec)
        expect(wfms.ewsW.value).precision(ews.fm010, ews.prec)
    })

    // The fireline intensity, reaction itensity, flame length, and heat per unit area
    // are all bound to the MAXIMUM of the two fuels,
    // In this case, its fm124:
    it('primary, secondary, and weighted fireline intensity agrees with BehavePlus V6', () => {
        expect(wfms.fli1.value).precision(fli.fm010, fli.prec)
        expect(wfms.fli2.value).precision(fli.fm124, fli.prec)
        expect(wfms.fliW.value).precision(fli.fm124, fli.prec)
    })

    // The effective wind speed limit is bound to the MINIMUM of the two fuels.
    // In this case, its fm010
    it('primary, secondary, and weighted effective wind speed limit agrees with BehavePlus V6', () => {
        expect(wfms.ewsl1.value).precision(ewsl.fm010, ewsl.prec)
        expect(wfms.ewsl2.value).precision(ewsl.fm124, ewsl.prec)
        expect(wfms.ewslW.value).precision(ewsl.fm010, ewsl.prec)
    })

    // The effective wind speed limit exceeded is TRUE if EITHER fuel's limit is exceeded
    // In this case, its FALSE for both fuels
    it('primary, secondary, and weighted effective wind speed limit agrees with BehavePlus V6', () => {
        expect(wfms.ewsx1.value).toBe(ewsx.fm010)
        expect(wfms.ewsx2.value).toBe(ewsx.fm124)
        expect(wfms.ewsxW.value).toBe(ewsx.fm010 || ewsx.fm124)
    })
})