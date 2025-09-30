/**
 * @file Customized Jest test match functions
 * @copyright 2021 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
*/

/**
  A Jest matcher specifically for Dag Node value testing

  Use as follows:
  import * as DagJest from '../jest/matchers.js'
  const value = DagJest.value
  expect.extend({ value })
  expect(nodeRef).value(expected, significantDigits)
  expect(dag.nodeValue(nodeIdxOrKey)).value(expected, significantDigits)
*/
export const sig = function (received, expected, precision, msg = '') {
  if (typeof expected === 'number' && typeof received === 'number') {
    const exp = (''+expected.toExponential(precision+1))
    const rec = (''+received.toExponential(precision+1)).substring(0, precision)
    const places = '1.2345678901234567890'.substring(0, precision) // Number bar for showing decimals places
    const bar = '        : ' + places

    const pass = (exp.substring(0, precision) === rec.substring(0, precision))
    if (pass) {
      return {
        message: () =>
          `${msg} should NOT agree to ${precision} significant digits:\nexpected: ${exp}\nreceived: ${rec}\n${bar}`,
        pass: true
      }
    } else {
      return {
        message: () =>
          `${msg} should agree to ${precision} significant digits\nexpected: ${exp}\nreceived: ${rec}\n${bar}`,
        pass: false
      }
    }
  } else {
    const pass = expected === received
    if (pass) {
      return {
        message: () =>
          `${msg} should NOT be equal\nexpected: ${expected}\nreceived: ${received}\n${bar}`,
        pass: true
      }
    } else {
      return {
        message: () =>
          `${msg} should be equal\nexpected: ${expected}\nreceived: ${received}\n${bar}`,
        pass: false
      }
    }
  }
}
