import { describe, it, expect } from 'vitest'
import { sig } from './matchers.js'
import { Wfms, WfmsFireEllipse, Util } from '../index.js'

expect.extend({ sig })
const wfms = new WfmsFireEllipse()
const dag  = wfms.dag

// If interested in these ...
Util.logDagNodes(dag.selected(), 'Selected Node Values')
Util.logDagConfigs(dag.activeConfigsByKey(), 'Active Configurations')
Util.logDagNodes(dag.activeInputsByKey(), 'Active Inputs')

describe('Fire Ellipse', () => {
    // The final RoS is bound to the harmonic mean RoS
    it('primary, secondary, and weighted RoS agrees with BehavePlus V6', () => {
        expect(123).sig(EFC_3424_1592913036, 5)
    })
})
