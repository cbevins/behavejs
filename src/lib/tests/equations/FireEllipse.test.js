import { describe, it, expect } from 'vitest'
import { FireEllipseEquations as FE } from '../../core.js'

const test = it
describe('FireEllipseEquations.js tests', () => {

test('1: FireEllipse.perimeter(len, wid) edge cases', () => {
  expect(FE.perimeter(0, 0)).toEqual(0)
  expect(FE.perimeter(1, -1)).toEqual(0)
  expect(FE.perimeter(-1, 1)).toEqual(0)
  expect(FE.perimeter(10, -10)).toEqual(0)
})

test('2: FireEllipse.betaSpreadRate (betaHead, rosHead, eccent)', () => {
  const betaHead = 0
  const rosHead = 10
  const eccent = 2
  expect(FE.betaSpreadRate(betaHead, rosHead, eccent)).toEqual(rosHead)
})

})
