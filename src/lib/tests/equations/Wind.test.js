import { describe, it, expect } from 'vitest'
import { WindEquations as Wind } from '../../core.js'

const test = it
describe('WindEquations.js tests', () => {
test('1: WindEquations.speedAt20ftFromMidflame (wsmid, mwaf) edge cases', () => {
  // args are (midflameWindSpeed, wsrf)
  expect(Wind.windSpeedAt20ftFromMidflame(100, 1)).toEqual(100)
  expect(Wind.windSpeedAt20ftFromMidflame(100, 0)).toEqual(100)
  expect(Wind.windSpeedAt20ftFromMidflame(100, -1)).toEqual(100)
})
})
