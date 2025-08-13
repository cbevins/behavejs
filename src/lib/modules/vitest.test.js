import { expect, test } from 'vitest'
/**
 * Run test files by entering the following at terminal in top project folder
 * npx vitest --browser=chromium
 * -or-
 * npx vitest
 */
function sum(a, b) {
    return a + b
}

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
    expect(sum(1, 2), 'WTF?').toBe(4)
})