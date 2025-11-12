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
  const received = (typeof node === 'object') ? node.value : node
  if (typeof expected === 'number' && typeof received === 'number')
    return numericValue(node.value, expected, msg)
  else if (typeof expected === 'boolean' && typeof received === 'boolean')
    return booleanValue(node.value, expected, msg)
  else if (typeof expected === 'string' && typeof received === 'string') 
    return stringValue(node.value, expected, msg)
  throw new Error('Attempt to test value() matcher on unsupported type pairs:\n'
    + `expected is '${typeof expected}'\n`
    + `received is '${typeof received}'`)
}
// Numeric
const numericValue = function (received, expected, msg = '') {
    const ppb = (expected === 0 ) 
      ? Math.abs(received - expected)
      : Math.abs((received - expected)/expected)
    return {
      message: () =>
        `${msg} difference exceeds 1 part per billion\nexpected: ${expected}\nreceived: ${received}\n`,
      pass: (ppb < 0.000000001)
    }
}
// Boolean
const booleanValue = function (received, expected, msg = '') {
  return {
    message: () => `${msg} expected: ${expected}\nreceived: ${received}\n`,
    pass: (received === expected)
  }
}
// String
const stringValue = function (received, expected, msg = '') {
  return {
    message: () => `${msg} expected: ${expected}\nreceived: ${received}\n`,
    pass: (received === expected)
  }
}
