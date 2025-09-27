import { describe, it, expect } from 'vitest'
import { WfmsUseCases } from '../index.js'

const wfms = new WfmsUseCases()
const dag = wfms.dag
const {primary, secondary, weighted} = wfms.nodeRefs.surface

describe('Test 1: Wfms Initialization', () => {
    it('1.1 - Wfms has access to all the configuration variables', () => {
        expect(wfms.config.surface.weighting.primary).toBe('primary')
        expect(wfms.config.surface.weighting.value).toBe('primary')
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
