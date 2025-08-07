export class Assert {
    constructor(name='Assert') {
        this.name = name
        this.desc = null
        this.actual = null
        this.major = 0
        this.minor = 0
        this.test = {}
        this.tests = []
    }

    that(desc, actual) {
        this.desc = desc
        this.actual = actual
        this.major++
        this.minor = 0
        return this
    }
    
    _makeTest(name, expected) {
        this.test = {
            major: this.major,
            minor: ++this.minor,
            desc: this.desc,
            actual: this.actual,
            test: name,
            expected: expected,
            result: 'OK'
        }
    }

    equals(expected) {
        this._makeTest('equals', expected)
        if (this._isObject(expected)) this._testObject()
        else if (Array.isArray(expected)) this._testArray()
        else this._testEqual()
        this.tests.push(this.test)
        return this
    }

    _isObject(value) {
        return typeof value === 'object' && value !== null && !Array.isArray(value)
    }

    _testArray() {
        const {desc, actual, expected} = this.test
        if (! Array.isArray(actual)) {
            this.test.result = 'ACTUAL IS NOT AN ARRAY'
        } else {
            for(let i=0; i<expected.length; i++) {
                if (expected[i] !== actual[i]) {
                    this.test.result = `EXPECTED ELEMENT "${i}" TO BE "${expected[i]}", BUT ACTUAL WAS "${actual[i]}"`
                    break
                }
            }
        }
    }

    _testEqual() {
        const {desc, actual, expected} = this.test
        this.test.result = (expected === actual) ? 'OK' : `EXPECTED "${expected}", BUT ACTUAL WAS "${actual}"`
    }

    _testObject() {
        const {desc, actual, expected} = this.test
        if (! this._isObject(actual)) {
            this.test.result = 'ACTUAL IS NOT AN OBJECT'
        } else {
            for (const key of Object.keys(expected)) {
                if (! actual.hasOwnProperty(key)) {
                    this.test.result = `ACTUAL IS MISSING PROP "${key}"`
                } else if (actual[key] !== expected[key]) {
                    this.test.result = `EXPECTED PROP "${key}" TO BE "${expected[key]}", BUT ACTUAL WAS "${actual[key]}"`
                }
            }
        }
    }
}
