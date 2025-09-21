import { describe, it, expect } from 'vitest'
import { Calc } from '../index.js'

describe('add function', () => {
    it('should add two numbers', () => {
        expect(Calc.sum(1, 2)).toBe(3)
    });
})