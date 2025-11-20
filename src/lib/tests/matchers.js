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
 * @param {DagNode} node A DagNode instance or some other value
 * @param {any} expected Expected value, whether real, integer, string, bool
 * @param {string} msg Additional message on failure
 * @returns 
 */
export const value = function (recvd, expected, msg='', diffParts=1.0e-9) {
  let received = recvd
  if (typeof recvd === 'object' && recvd.constructor.name==='DagNode') {
    received = recvd.value
    msg = `DagNode ${recvd.key()}:${msg}`
  }

  // console.log(node.constructor.name, node.key())
  if (typeof expected === 'number' && typeof received === 'number')
    return numericValue(received, expected, msg, diffParts)

  else if (typeof expected === 'boolean' && typeof received === 'boolean')
    return booleanValue(received, expected, msg)

  else if (typeof expected === 'string' && typeof received === 'string') 
    return stringValue(received, expected, msg)

  throw new Error('Attempt to test value() matcher on unsupported type pairs:\n'
    + `expected is '${typeof expected}'\n`
    + `received is '${typeof received}'`)
}

// Numeric
const numericValue = function (received, expected, msg='', diffParts=1.0e-9) {
    const ppb = (expected === 0 ) 
      ? Math.abs(received - expected)
      : Math.abs((received - expected)/expected)
    return {
      message: () =>
        `${msg} value differs by more than 1 part per ${(1/diffParts).toFixed(0)}\nexpected value = ${expected}\nDagNode.value  = ${received}\n`,
      pass: (ppb < diffParts)
    }
}

// Boolean
const booleanValue = function (received, expected, msg) {
  return {
    message: () => `${msg} expected: ${expected}\nreceived: ${received}\n`,
    pass: (received === expected)
  }
}

// String
const stringValue = function (received, expected, msg) {
  return {
    message: () => `${msg} expected: ${expected}\nreceived: ${received}\n`,
    pass: (received === expected)
  }
}
