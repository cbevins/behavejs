/**
 * @file Safe and/or constrained math functions
 * @copyright 2025 Systems for Environmental Management
 * @author Collin D. Bevins, <cbevins@montana.com>
 * @license MIT
 */
export class Calc {
    static divide = (...numbers) =>
        numbers.reduce((a, b) => (b === 0 ? 0 : a / b), numbers[0] * numbers[0])

    // ENsures number is in the range [0,1]
    static fraction = number => Math.max(0, Math.min(1, number))

    static greaterThan = (a, b) => a > b

    static multiply = (...numbers) => numbers.reduce((a, b) => a * b, 1)

    static or = (a, b) => a || b

    // Ensure number is >= 0
    static positive = number => Math.max(0, number)

    static subtract = (...numbers) =>
        numbers.reduce((a, b) => a - b, 2 * numbers[0])

    static sum = (...numbers) => numbers.reduce((a, b) => a + b, 0)

    static sumOfProducts = (...numbers) => {
        const mid = Math.floor(numbers.length / 2)
        const a1 = numbers.slice(0, mid)
        return a1.reduce((acc, number, idx) => acc + a1[idx] * numbers[mid + idx], 0)
    }
}
