/**
 * @file Customized Jest test match functions
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
*/
/**
 * NOTE: For literacy reasons, this function inverts the usual expect() argument order
 * instead of expect(expected).test(value)
 * its expect(node).value(value)
 * @param {DagNode} node 
 * @param {any} expected Expected value, whether real, integer, string, bool
 * @param {string} msg Additional message on failure
 * @returns 
 */
export const value = function (node, expected, msg = '') {
  const received = node.value
  console.log()
  if (typeof expected === 'number' && typeof received === 'number') {
    const ppb = (expected === 0 ) 
      ? Math.abs(received - expected)
      : Math.abs((received - expected)/expected)

    if (ppb < 0.000000001) {
      return {
        message: () =>
          `${msg} difference SHOULD exceed 1 part per billion\nexpected: ${expected}\nreceived: ${received}\n`,
        pass: true
      }
    } else {
      return {
        message: () =>
          `${msg} difference exceeds 1 part per billion\nexpected: ${expected}\nreceived: ${received}\n`,
        pass: false
      }
    }
  }
  // Boolean
  else if (typeof expected === 'boolean' && typeof received === 'boolean') {
    if (received === expected) {
      return {
        message: () => `${msg} expected: ${expected}\nreceived: ${received}\n`,
        pass: true
      }
    } else {
      return {
        message: () => `${msg} expected: ${expected}\nreceived: ${received}\n`,
        pass: false
      }
    }
  }
  // String
  else if (typeof expected === 'string' && typeof received === 'string') {
    if (received === expected) {
      return {
        message: () => `${msg} expected: ${expected}\nreceived: ${received}\n`,
        pass: true
      }
    } else {
      return {
        message: () => `${msg} expected: ${expected}\nreceived: ${received}\n`,
        pass: false
      }
    }
  }
  throw new Error('Attempt to run value() matcher on mismatched types:\n'
    + `expected is '${typeof expected}'\n`
    + `received is '${typeof received}'`)
}
