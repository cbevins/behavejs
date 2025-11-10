import { describe, it, expect } from 'vitest'
import { SurfaceFireEquations as SF } from '../../core.js'

const test = it
describe('SurfaceFireEquations.js tests', () => {

test('1: SurfaceFireEquations.spreadRateWithRosLimitApplied()', () => {
  expect(SF.spreadRateWithRosLimitApplied(100, 880)).toEqual(100)
  expect(SF.spreadRateWithRosLimitApplied(100, 90)).toEqual(90)
  expect(SF.spreadRateWithRosLimitApplied(100, 80)).toEqual(100)
})

test('2: SurfaceFireEquations.effectiveWindSpeedCoefficient()', () => {
  expect(SF.effectiveWindSpeedCoefficient(1, 2)).toEqual(3)
})

test('3: SurfaceFireEquations.spreadDirectionFromUpslope()', () => {
  const comp = [-1, 0, 1]
  const pi = Math.PI
  comp.forEach(xComp => {
    comp.forEach(yComp => {
      ;[0, Math.PI / 2, Math.PI, -Math.PI].forEach(rosv => {
        const al = rosv <= 0 ? 0 : Math.asin(Math.abs(yComp) / rosv)
        const rad =
          xComp >= 0
            ? yComp >= 0
              ? al
              : pi + pi - al
            : yComp >= 0
              ? pi - al
              : pi + al
        const deg = (rad * 180) / Math.PI
        // console.log(`${xComp},${yComp},${rosv}: ${al}, ${rad}, ${deg}`)
        expect(SF.spreadDirectionFromUpslope(xComp, yComp, rosv)).toEqual(deg)
      })
    })
  })
})

test('4: SurfaceFireEquations.harmonicMeanSpreadRate(cover1, ros1, ros2) edge cases', () => {
  expect(SF.harmonicMeanSpreadRate(0, 1, 2)).toEqual(2)
  expect(SF.harmonicMeanSpreadRate(50, 0, 2)).toEqual(2)
  expect(SF.harmonicMeanSpreadRate(50, 1, 0)).toEqual(1)

  expect(SF.firelineIntensityFromFlameLength(0)).toEqual(0)
  expect(SF.firelineIntensityFromFlameLength(-1)).toEqual(0)

  expect(SF.flameLength(0)).toEqual(0)
  expect(SF.flameLength(-1)).toEqual(0)
})
})
