import { describe, it, expect } from 'vitest'
import { WfmsUseCases } from '../index.js'

const wfms = new WfmsUseCases()
const dag = wfms.dag
const {primary, secondary, weighted} = wfms.nodeRefs.surface

describe('Test 1: Wfms Initialization', () => {
    it('1.1 - Wfms has access to the configuration via configObj and configMap', () => {
        const weighting = wfms.configObj.surface.weighting
        expect(weighting.primary).toBe('primary')
        expect(weighting.harmonic).toBe('harmonic')
        expect(weighting.value).toBe('primary')
        expect(weighting.key).toBe('surface/weighting/method')
        expect(wfms.getConfigValue('surface/weighting/method')).toBe('primary')
    })
    it('1.2 - Wfms has no selected nodes', () => {
        expect(dag.selectSet.size).toBe(0)
        expect(dag.activeInputsSet.size).toBe(0)
        expect(dag.allInputsSet.size).toBeGreaterThan(0)
        expect(dag.nodeMap.size).toBeGreaterThan(100)
        expect(dag.selected().length).toBe(0)
    })
})

describe('Test 2: - Wfms node selection', () => {
    it('2.1 Wfms has 1 selected nodes', () => {
        expect(dag.selectSet.size).toBe(0)
        expect(dag.selected().length).toBe(0)
        wfms.select(primary.ros)
        expect(dag.selectSet.size).toBe(1)
        expect(dag.selected().length).toBe(1)
    })
})

describe('Test 3: - Reconfiguration', () => {
    it('3.1 Wfms has 1 selected nodes', () => {
        const weighting = wfms.configObj.surface.weighting
        expect(weighting.key).toBe('surface/weighting/method')
        expect(weighting.value).toBe('primary')
        expect(wfms.getConfigValue(weighting.key)).toBe('primary')
        // Not change the config
        wfms.configure([[weighting.key, weighting.harmonic]])
        expect(wfms.getConfigValue(weighting.key)).toBe('harmonic')
    })
})
